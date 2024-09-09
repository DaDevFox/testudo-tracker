import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import axios from "axios";

var cron = require("node-cron");

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      cron.schedule("0 0 * * *", async () => {
        var currPage = 0;
        var pageSize = 100;
        var currAmount = pageSize;

        console.log("");
        console.log("##################################");
        console.log("#                                #");
        console.log("# Running scheduler every minute #");
        console.log("#                                #");
        console.log("##################################");
        console.log("");

        const startTime = new Date();
        var smallStartTime = new Date();

        const client = new MongoClient(process.env.MONGODB_URI, {});

        // connect to Mongo client for read/write
        await client.connect();
        console.log("test");

        // FIRST retrieve all data from umd.io api

        const database = client.db("testudo-index");
        const collection = database.collection("section-index");

        var coursesToInsert = [];
        var coursesSeen = {};

        // loop through pages, always at first to check if anything and until we hit the end
        while (currPage == 0 || currAmount == pageSize) {
          const response = await fetch(
            `http://api.umd.io/v1/courses/sections?page=${currPage}&per_page=${pageSize}`
          );

          if (!response.ok) {
            console.log(`Response status: ${response.status}`);
            break;
          }

          console.log("received courses, deserializing");
          const json = await response.json();
          currAmount = json.length;

          for (var i = 0; i < json.length; i++) {
            var item = json[i];
            console.log(`${item.section_id} --- checking`);

            // check if in mongo db
            var result = await collection.findOne({
              course_id: item.section_id,
            });

            if (result == null) {
              console.log("inserting");
              coursesToInsert.push({
                course_id: item.section_id,
                professor: item.instructors[0],
              });
            } else {
              console.log("exists");
              coursesSeen[item.section_id] = {
                course_id: item.section_id,
                professor: item.instructors[0],
              };
            }
            console.log("complete");
          }

          var smallEndTime = new Date();

          console.log(
            "retreived " +
              currAmount +
              " in " +
              (smallEndTime - smallStartTime) +
              "ms"
          );

          smallStartTime = smallEndTime;
          currPage++;
        }

        const endTime = new Date();
        console.log(
          `Index api retrieve complete; elapsed: ${endTime - startTime}ms`
        );

        // SECOND update the mongo db persistent store with diff from data retrieved
        if (coursesToInsert.length > 0) {
          var result = await collection.insertMany(coursesToInsert);
          if (
            result == null ||
            result.insertedCount != coursesToInsert.length
          ) {
            console.log(`error; response received:${result}`);
          }
          console.log(`documents inserted; result:${result}`);
        }

        //TODO: loop through sections found and remove sections in db not in api

        client.close();
      });

      res.status(200);
    } catch (error) {
      console.log(error);

      res.status(500, `Something went wrong: ${error}`);
    }
  }
}
