"use server";
import { MongoClient } from "mongodb";

// TODO: add custom server-sideMongoDB search code here to reduce api call overhead
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
