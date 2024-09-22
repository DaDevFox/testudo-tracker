"use server";
import { MongoClient } from "mongodb";

import { AppendToFastIndex, AppendToUserIndex } from "./api/track/route";

export const trackCourse = async () => {
  const email = "mtahilia@terpmail.umd.edu";
  const course_id = "CMSC216-0101";
  const client = new MongoClient(process.env.MONGODB_URI, {});
  // performs a search with Atlas autocomplete query
  try {
    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    const database = client.db("testudo-index");

    var response = await AppendToFastIndex(database, course_id, email);
    if (response) return response;

    response = await AppendToUserIndex(database, course_id, email);
    if (response) return response;

    console.log(`acknowledged: ${res.acknowledged}`);
    return null;
  } catch (ex) {
    console.log(ex);
  }
};
