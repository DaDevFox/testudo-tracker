import { HttpStatusCode } from "axios";
import { MongoClient } from "mongodb";

const SearchResultsMax = 100;

// SECTION-INDEX
// -------------

/**
 * given the section-index collection connection, queries the DB for courses and returns [query_limit]
 * results of autocompletion options
 * @param {*} collection
 * @param {*} query_string
 * @param {*} query_limit
 * @returns
 */
export async function requestAutocompletes(
  collection,
  query_string,
  query_limit
) {
  // preprocess the query string so only those matching four uppercase alphanumerics (e.g. CMSC) at least are matched
  // and pull out the department, course code, and section number
  const new_query_match = query_string
    .ToUpperCase()
    .match("([A-Z]{4})([0-9]?[0-9]?[0-9]?)([- ]?)([FCH0-9]{4}[A-Z0-9]?)?");
  var new_query = "";

  new_query = `${new_query_match[1]}${new_query_match[2]}`;

  // configure to search course_ids with a regex match (not an exact match but not fuzzy either) -- matches substrings
  // more cleanly
  const config = [
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
    {
      $project: {
        _id: 0,
        course_id: 1,
        professor: 2,
      },
    },
  ];

  // assemble result json (flat) from returned cursor (iterable)
  var resultJson = [];
  const result = await collection.aggregate(config);

  for await (var document of result) {
    resultJson.push(document);
  }
  return resultJson;
}

/**
 * GETs autocomplete results using the requestAutocompletes function
 */
export async function GET(request) {
  if (!process.env.MONGODB_URI)
    return new Response("", { status: HttpStatusCode.ServiceUnavailable });

  const client = new MongoClient(process.env.MONGODB_URI, {});
  var resultJson = [];

  try {
    // parse params from url search parameters (GET requests won't take a body with axios + should use params)
    const query_string = request.nextUrl.searchParams?.get("query_string");
    var query_limit = request.nextUrl.searchParams?.get("query_limit");

    query_limit = query_limit || 5;
    query_limit = 100;

    if (!query_string)
      return new Response(
        "Requires query_string search parameter with string value"
      );

    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    const database = client.db("testudo-index");
    const coll = database.collection("section-index");

    // performs a search with Atlas autocomplete query
    resultJson = await requestAutocompletes(coll, query_string, query_limit);
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
