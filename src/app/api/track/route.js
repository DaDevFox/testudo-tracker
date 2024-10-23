import { HttpStatusCode } from "axios";
import { MongoClient } from "mongodb";

/**
 * appends a record of a user watching a course section to a user-major collection/index
 * @param {*} database
 * @param {*} course_id
 * @param {*} user_email
 * @returns
 */
export async function appendToUserIndex(database, course_id, user_email) {
  const collection = database.collection("dedicated-users");

  if (!course_id || !user_email)
    return new Response(
      "Requires course_id and user_email search parameter with string values"
    );

  // find the user-keyed (by email) item record
  var user_record = await collection.findOne({
    email: user_email,
  });

  if (!user_record)
    return new Response(`User ${user_email} could not be located`, {
      status: HttpStatusCode.Unauthorized,
    });

  // duplicate their watches and append one
  var updated_watches = user_record.watches;
  if (!updated_watches.includes(course_id)) updated_watches.push(course_id);
  else
    return new Response(
      `User ${user_email} already tracking course ${course_id}`,
      { status: HttpStatusCode.Conflict }
    );

  // update the item record
  const result = await collection.updateOne(
    { email: user_email },
    { $set: { watches: updated_watches } },
    { upsert: true }
  );

  if (result.acknowledged) return null;
  else
    return new Response("Result not acknowledged; error?", {
      status: HttpStatusCode.ImATeapot,
    });
}

/**
 * appends a record of a user watching a section to a 'fast' (course-major for fast notification distrtibution) database
 * @param {*} database
 * @param {*} course_id
 * @param {*} user_email
 * @returns
 */
export async function appendToFastIndex(database, course_id, user_email) {
  // TODO: thresholds
  // var threshold_min = request.nextUrl.searchParams?.get("threshold_min");
  const collection = database.collection("user-watches");

  if (!course_id || !user_email)
    return new Response(
      "Requires course_id and user_email search parameter with string values"
    );

  // get the course_id-keyed item record
  var section_watches = await collection.findOne({
    course_id: course_id,
  });

  // user watch row on course doesn't exist; create the record
  if (!section_watches) {
    var section_index_entry = await database
      .collection("section-index")
      .findOne({
        course_id: course_id,
      });

    // pull course data from the detailed information index
    if (!section_index_entry)
      return new Response(
        `Course section with id ${course_id} could not be located; aborting`,
        { status: HttpStatusCode.NotFound }
      );

    section_watches = {
      course_id: course_id,
      professor: section_index_entry.professor,
      emails: [],
    };
  }

  // copy course record user email array and append a value
  var updated_emails = section_watches.emails;
  if (!updated_emails.includes(user_email)) updated_emails.push(user_email);
  else
    return new Response(
      `User ${user_email} already tracking course ${course_id}`,
      { status: HttpStatusCode.Conflict }
    );

  // and update course record with larger array
  const result = await collection.updateOne(
    { course_id: course_id },
    {
      $set: {
        emails: updated_emails,
        professor: section_watches.professor,
      },
    },
    { upsert: true }
  );

  if (result.acknowledged) return null;
  else
    return new Response("Result not acknowledged; error?", {
      status: HttpStatusCode.ImATeapot,
    });
}

/**
 * adds a user watch to two symmetric database collections for fast notification service
 * @param {*} request
 * @returns
 */
export async function POST(request) {
  if (!process.env.MONGODB_URI)
    return new Response("", { status: HttpStatusCode.ServiceUnavailable });
  const client = new MongoClient(process.env.MONGODB_URI, {});
  // performs a search with Atlas autocomplete query
  try {
    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    const database = client.db("testudo-index");

    const course_id = request.nextUrl.searchParams?.get("course_id");
    var user_email = request.nextUrl.searchParams?.get("user_email");

    var response = await appendToFastIndex(database, course_id, user_email);
    if (response) return response;

    response = await appendToUserIndex(database, course_id, user_email);
    if (response) return response;

    return new Response(`created!`, { status: HttpStatusCode.Created });
  } catch (ex) {
    console.log(ex);
    return new Response(`error: ${ex}`, {
      status: HttpStatusCode.InternalServerError,
    });
  } finally {
    await client.close();
  }
}

/**
 * gets all user watches for a given user
 * @param {*} request
 * @returns
 */
export async function GET(request) {
  if (!process.env.MONGODB_URI)
    return new Response("", { status: HttpStatusCode.ServiceUnavailable });

  const client = new MongoClient(process.env.MONGODB_URI, {});
  var resultJson = [];

  try {
    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    const email = request.nextUrl.searchParams?.get("user_email");
    // TODO: pagination
    const page_size = request.nextUrl.searchParams?.get("page_size") || 999;
    const page = request.nextUrl.searchParams?.get("page");
    if (!email)
      return new Response("Requires email request parameter with string value");

    // set namespace
    const database = client.db("testudo-index");
    const coll = database.collection("dedicated-users");

    const user = await coll.findOne({ email: email });
    if (!user)
      return new Response(`User ${email} could not be located`, {
        status: HttpStatusCode.NotFound,
      });

    user.watches.forEach((item) => resultJson.push(item));
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();

    // send results
    return new Response(JSON.stringify(resultJson), {
      status: HttpStatusCode.Ok,
    });
  }
}

export async function DELETE(request) {
  if (!process.env.MONGODB_URI)
    return new Response("", { status: HttpStatusCode.ServiceUnavailable });

  const client = new MongoClient(process.env.MONGODB_URI, {});

  var resultJson = [];

  try {
    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    const email = request.nextUrl.searchParams?.get("user_email");
    const course_id = request.nextUrl.searchParams?.get("course_id");
    if (!email)
      return new Response("Requires email request parameter with string value");
    if (!course_id)
      return new Response(
        "Requires remove course request parameter with string value"
      );

    const database = client.db("testudo-index");
    const dedicated = database.collection("dedicated-users");
    const userWatches = database.collection("user-watches");

    const user = await dedicated.findOne({ email: email });
    const course = await userWatches.findOne({ course_id: course_id });
    if (!user)
      return new Response(`User ${email} could not be located`, {
        status: HttpStatusCode.NotFound,
      });
    if (!course)
      return new Response(`User ${course} could not be found`, {
        status: HttpStatusCode.NotFound,
      });

    var new_ded_array = user.watches.filter((item) => item != course_id);
    var new_user_array = course.emails.filter((item) => item != email);

    await dedicated.updateOne(
      { email: email },
      {
        $set: {
          watches: new_ded_array,
        },
      }
    );

    if (new_user_array.length != 0) {
      await userWatches.updateOne(
        { course_id: course_id },
        {
          $set: {
            emails: new_user_array,
          },
        }
      );
    } else {
      await userWatches.deleteOne({ course_id: course_id });
    }

    new_ded_array.forEach((item) => resultJson.push(item));
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
    return new Response(JSON.stringify(resultJson), {
      status: HttpStatusCode.Ok,
    });
  }
}
