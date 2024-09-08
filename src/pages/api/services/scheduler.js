import { NextResponse } from "next/server";
import axios from "axios";

var cron = require("node-cron");

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      cron.schedule("* * * * *", async () => {
        var currPage = 0;
        var pageSize = 50;
        var currAmount = pageSize;

        console.log("");
        console.log("##################################");
        console.log("#                                #");
        console.log("# Running scheduler every minute #");
        console.log("#                                #");
        console.log("##################################");
        console.log("");

        // loop through pages, always at first to check if anything and until we hit the end
        while (currPage == 0 || currAmount == pageSize) {
          const response = await fetch(
            `http://api.umd.io/v1/courses/sections?page=${currPage}&per_page=${30}`
          );

          console.log(`test`);
          if (!response.ok) {
            console.log(`Response status: ${response.status}`);
            break;
          }

          const json = await response.json();
          currAmount = json.length;

          for (var i = 0; i < json.length; i++) {
            var item = json[i];
            console.log(`${item.section_id} --- checking`);
            const response = await axios.get(
              `${process.env.SERVER_URL}/api/section?course_id=${item.section_id}`
            );
            console.log(response.status);
          }
        }
      });

      res.status(200);
    } catch (error) {
      console.log(error);

      res.status(500, `Something went wrong: ${error}`);
    }
  }
}
