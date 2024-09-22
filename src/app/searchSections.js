"use server";
import { MongoClient } from "mongodb";
import { requestAutocompletes } from "./api/section/search/route";

export async function searchSections(query, limit) {
  var client = new MongoClient(process.env.MONGODB_URI, {});
  await client
    .connect()
    .catch((ex) => console.log(`MongoDB connect failure ${ex}`));

  const database = client.db("testudo-index");
  const collection = database.collection("section-index");

  return await requestAutocompletes(collection, query, limit || 10);
}
