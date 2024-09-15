import { MongoClient } from "mongodb";

// NOTE:
// IMPORTANT:
// ip addresses of servers on which the website is hosted (during development the device on which you execute 'npm run dev')
// must be whitelisted in MongoDB -- rn that's just mehul's dev server [TEMP CHANGE EVENTUALLY]
export default async function handler(req, res) {
  if (req.method == "GET") {
    // TODO: find way to not open new client every time?
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
      const allData = await collection.find({}).toArray();

      res.status(200).json(allData);
    } catch (error) {
      res.status(500).json({ message: `Something went wrong! ${error}` });
    } finally {
      await client.close();
    }
  } else res.status(405, "only GET supported for now");
}
