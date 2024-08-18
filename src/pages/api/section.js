import { MongoClient } from "mongodb";

// NOTE:
// To be used by backend/server.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();

      // Choose a name for your database
      const database = client.db("testudo-index");

      // Choose a name for your collection
      const collection = database.collection("section-index");

      await collection.insertOne({ data });

      res.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
      res.status(500).json({ message: `Something went wrong! ${error}` });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
