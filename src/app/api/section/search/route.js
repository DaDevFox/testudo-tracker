import { HttpStatusCode } from "axios";
import { MongoClient } from "mongodb";

const SearchResultsMax = 100;

export async function POST(request){
  return new Response(200);
}

export async function GET(request) {
  if (!process.env.MONGODB_URI)
    return new Response("", { status: HttpStatusCode.ServiceUnavailable });

  const client = new MongoClient(process.env.MONGODB_URI, {});
  var resultJson = [];

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
    query_limit = query_limit || 5;
    query_limit = Math.min(query_limit, SearchResultsMax);

    const new_query_match = query_string.match(
      "([A-Z]{4})([0-9]?[0-9]?[0-9]?)([- ]?)([FCH0-9]{4}[A-Z0-9]?)?"
    );
    var new_query = "";
    // if (!new_query_match[2])
    console.log(new_query_match);
    new_query = `${new_query_match[1]}${new_query_match[2]}`;
    console.log(`new query: ${new_query}`);
    // TODO: fix later with mongo regex search
    // else
    //   new_query = `${new_query_match[0]}${new_query_match[1]}-${new_query_match[2]}}`;

    // define pipeline
    const agg = [
      {
        $search: {
          index: "default",
          regex: {
            query: `${new_query}[-A-Z0-9]*`,
            path: "course_id",
            allowAnalyzedField: true,
          },
        },
      },
      { $limit: query_limit },
      { $project: { _id: 0, course_id: 1, professor: 2 } },
    ];

    // run pipeline
    const result = await coll.aggregate(agg);

    await result.forEach((document) => {
      resultJson.push(document);
    });
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
