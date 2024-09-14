import { HttpStatusCode } from "axios";
import { MongoClient } from "mongodb";

export async function GET(request, res) {
  if (request.method !== "GET") res.status(501).send();

  // performs a search with Atlas autocomplete query
  try {
    const client = new MongoClient(process.env.MONGODB_URI, {});

    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    // set namespace
    const database = client.db("testudo-index");
    const coll = database.collection("section-index");

    const urlSearchParams = new URLSearchParams(
      request.url.substring(request.url.indexOf("?") + 1)
    );

    if (!urlSearchParams)
      return new Response(
        "Requires query_string search parameter with string value"
      );

    const query_string = urlSearchParams.get("query_string");

    if (!query_string)
      return new Response(
        "Requires query_string search parameter with string value"
      );

    // define pipeline
    const agg = [
      {
        $search: {
          index: "default",
          autocomplete: { query: query_string, path: "course_id" },
        },
      },
      { $limit: 10 },
      { $project: { _id: 0, title: 1 } },
    ];

    // run pipeline
    const result = await coll.aggregate(agg);
    result.forEach((document) => {
      console.log(document);
    });

    // send results
    return Response.json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
