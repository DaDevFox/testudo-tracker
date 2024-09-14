import { HttpStatusCode } from "axios";
import { MongoClient } from "mongodb";

const SearchResultsMax = 100;

export async function GET(request) {
  const client = new MongoClient(process.env.MONGODB_URI, {});
  // performs a search with Atlas autocomplete query
  try {
    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    // set namespace
    const database = client.db("testudo-index");
    const coll = database.collection("section-index");

    const query_string = request.nextUrl.searchParams?.get("query_string");
    var query_limit = request.nextUrl.searchParams?.get("query_limit");

    if (!query_string)
      return new Response(
        "Requires query_string search parameter with string value"
      );

    console.log(query_string);
    query_limit = query_limit || 10;
    query_limit = Math.min(query_limit, SearchResultsMax);

    // define pipeline
    const agg = [
      {
        $search: {
          index: "default",
          autocomplete: {
            query: query_string,
            path: "course_id",
            fuzzy: { maxEdits: 2, prefixLength: 0, maxExpansions: 50 },
          },
        },
      },
      { $limit: query_limit },
      { $project: { _id: 0, course_id: 1, professor: 2 } },
    ];

    // run pipeline
    const result = await coll.aggregate(agg);
    var resultJson = [];

    await result.forEach((document) => {
      resultJson.push(document);
    });

    // send results
    return new Response(JSON.stringify(resultJson), {
      status: HttpStatusCode.Found,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
