"use server";
import { MongoClient } from "mongodb";
import { requestAutocompletes } from "./api/section/search/route";
import { appendToFastIndex, appendToUserIndex } from "./api/track/route";

export async function searchSections(query, limit) {
  var client = new MongoClient(process.env.MONGODB_URI, {});
  await client
    .connect()
    .catch((ex) => console.log(`MongoDB connect failure ${ex}`));

  const database = client.db("testudo-index");
  const collection = database.collection("section-index");

  return await requestAutocompletes(collection, query, limit || 10);
}

export async function addUser(email) {
  const client = new MongoClient(process.env.MONGODB_URI, {});
  // performs a search with Atlas autocomplete query
  try {
    await client
      .connect()
      .catch((ex) => console.log(`mongodb connect failure ${ex}`));

    // set namespace
    const database = client.db("testudo-index");

    const collection = database.collection("dedicated-users");
    const res = await collection.insertOne({
      email: email,
      watches: [],
    });

    console.log(`acknowledged: ${res.acknowledged}`);

    return res;
  } catch (ex) {
    console.log(ex);
  }
}

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

    var response = await appendToFastIndex(database, course_id, email);
    if (response) return response;

    response = await appendToUserIndex(database, course_id, email);
    if (response) return response;

    console.log(`acknowledged: ${res.acknowledged}`);
    return null;
  } catch (ex) {
    console.log(ex);
  }
};
