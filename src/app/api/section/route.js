import { HttpStatusCode } from "axios";
import { MongoClient } from "mongodb";

export async function POST(request) {
  const client = new MongoClient(process.env.MONGODB_URI, {});

  return await request.text().then(async (data) => {
    try {
      await client
        .connect()
        .catch((ex) => console.log(`mongodb connect failure ${ex}`));

      const database = client.db("testudo-index");
      const collection = database.collection("section-index");

      const bodyJson = JSON.parse(data);
      console.log(bodyJson);

      if (!(bodyJson?.course_id && bodyJson?.professor))
        return new Response(
          "incorrect input format; body must be json and have course_id and professor fields with string values",
          {
            status: HttpStatusCode.BadRequest,
          }
        );

      const result = await collection.insertOne({
        course_id: data.course_id,
      });

      return new Response(
        `Data saved successfully! Inserted document id: ${result.insertedId}`,
        { status: HttpStatusCode.Accepted }
      );
    } catch (error) {
      return new Response(`Something went wrong: ${error}`, {
        status: HttpStatusCode.InternalServerError,
      });
    } finally {
      await client.close();
    }
  });
}

export async function GET(request) {
  // performs an EXACT match query
  const client = new MongoClient(process.env.MONGODB_URI, {});

  try {
    const course_id = request.nextUrl.searchParams.get("course_id");
    console.log(request.nextUrl.searchParams);

    if (!course_id) {
      return new Response(
        "Request must have course_id param with string body",
        {
          status: HttpStatusCode.BadRequest,
        }
      );
    }

    await client.connect();

    const database = client.db("testudo-index");
    const collection = database.collection("section-index");

    // constricting query to ONLY search course code and section num passed into this API
    console.log("finding");
    var result = await collection.findOne({
      course_id: course_id,
    });

    if (result == null)
      return new Response("No matches", {
        status: HttpStatusCode.NotFound,
      });

    console.log(result);
    return new Response(JSON.stringify(result), {
      status: HttpStatusCode.Accepted,
    });
  } catch (error) {
    return new Response(`Something went wrong! ${error}`, {
      status: HttpStatusCode.InternalServerError,
    });
  } finally {
    await client.close();
  }
}
