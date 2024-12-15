import { HttpStatusCode } from "axios";
import { MongoClient } from "mongodb";

/**
 * Endpoint to insert an undetailed section record specified by course_id and professor (in JSON body)
 *
 * section details are fetched, validated and updated daily
 * @param {request} request
 * @returns
 */
export async function POST(request) {
  const client = new MongoClient(process.env.MONGODB_URI, {});

  // prepare request body for use
  return await request.text().then(async (data) => {
    try {
      const database = client.db("testudo-index");
      const collection = database.collection("section-index");

      const bodyJson = JSON.parse(data);

      if (!(bodyJson?.course_id && bodyJson?.professor))
        return new Response(
          "incorrect input format; body must be json and have course_id and professor fields with string values",
          {
            status: HttpStatusCode.BadRequest,
          }
        );

      await client
        .connect()
        .catch((ex) => console.log(`mongodb connect failure ${ex}`));

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

/**
 * GETs the detailed section record for an exact match to the course_id encoded in the query search params
 * @param {*} request
 * @returns
 */
export async function GET(request) {
  const client = new MongoClient(process.env.MONGODB_URI, {});

  try {
    const course_id = request.nextUrl.searchParams.get("course_id");

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
