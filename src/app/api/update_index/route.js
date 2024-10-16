import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// DANGER: FLUSH ONLY IF YOU KNOW WHAT YOU'RE DOING
const flush = false;
// if flushing only
const sort = true;
export const dynamic = "force-dynamic";

export const currSemester = "202501";

export const detailed_scraper_api = (currPage, pageSize) =>
  `${process.env.DETAILED_SCRAPER_URL}/v1/courses/sections?page=${currPage}&per_page=${pageSize}&semester=${currSemester}`;

export async function GET(request) {
  var currPage = 0;
  var pageSize = 100;
  var currAmount = pageSize;

  console.log("");
  console.log("##########################");
  console.log("#                        #");
  console.log("# Updating Testudo Index #");
  console.log("#                        #");
  console.log("##########################");
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

  // DANGER: FLUSH ONLY IF YOU KNOW WHAT YOU'RE DOING
  if (flush) console.log(await collection.deleteMany({}));

  // loop through pages, always at first to check if anything and until we hit the end
  while (currPage == 0 || currAmount == pageSize) {
    console.log(
      `page ${currPage} (${pageSize * currPage}-${pageSize * (currPage + 1)})`
    );
    const response = await fetch(detailed_scraper_api(currPage, pageSize));

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
        semester: currSemester,
      });

      if (result == null) {
        console.log("marking for insertion");
        coursesToInsert.push({
          course_id: item.section_id,
          semester: currSemester,
          professor: item.instructors[0],
        });
      } else {
        console.log("exists");
        coursesSeen[item.section_id] = {
          course_id: item.section_id,
          semester: currSemester,
          professor: item.instructors[0],
        };
      }
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
  console.log(`Index api retrieve complete; elapsed: ${endTime - startTime}ms`);

  if (flush && sort) coursesToInsert.sort((a) => a.course_id);

  // SECOND update the mongo db persistent store with diff from data retrieved
  if (coursesToInsert.length > 0) {
    var result = await collection.insertMany(coursesToInsert);
    if (result == null || result.insertedCount != coursesToInsert.length) {
      console.log(`error; response received:${result}`);
    }
    console.log(`documents inserted;`);
  }

  //TODO: loop through sections found and remove sections in db not in api

  client.close();

  return new Response(`Updated sucessfully`);
}

// var cron = require("node-cron");

// export default async function handler(req, res) {
//   if (req.method == "POST") {
//     try {
//       cron.schedule("0 0 * * *", async () => {});

//       res.status(200);
//     } catch (error) {
//       console.log(error);

//       res.status(500, `Something went wrong: ${error}`);
//     }
//   }
// }
