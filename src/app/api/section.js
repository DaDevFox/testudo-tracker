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
      await client
        .connect()
        .catch((ex) => console.log(`mongodb connect failure ${ex}`));

      const database = client.db("testudo-index");
      const collection = database.collection("section-index");

      await collection.insertOne(data);

      res.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
      res.status(500).json({ message: `Something went wrong! ${error}` });
    } finally {
      await client.close();
    }
  } else if (req.method === "GET") {
    // performs an EXACT match query

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      const course_id = req.query.course_id;

      if (!course_id) {
        res.status(400);
        return;
      }

      await client.connect();

      const database = client.db("testudo-index");
      const collection = database.collection("section-index");

      // constricting query to ONLY search course code and section num passed into this API
      console.log("finding");
      var result = await collection.findOne({
        course_id: course_id,
      });

      if (result == null) res.status(404).send({ result });

      console.log("result: " + result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: `Something went wrong! ${error}` });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
