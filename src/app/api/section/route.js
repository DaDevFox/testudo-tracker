import { MongoClient } from "mongodb";

export async function POST(request) {
  const { data } = request.body;

  const client = new MongoClient(process.env.MONGODB_URI, {});

  try {
    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    const database = client.db("testudo-index");
    const collection = database.collection("section-index");

    await collection.insertOne(data);

    return new Response("Data saved successfully!", { status: 201 });
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, { status: 500 });
  } finally {
    await client.close();
  }
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
          status: 400,
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
        status: 400,
      });

    console.log(result);
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Something went wrong! ${error}`, { status: 500 });
  } finally {
    await client.close();
  }
}
