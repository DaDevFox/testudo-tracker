import { NextResponse } from "next/server";

var cron = require("node-cron");

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      cron.schedule("* * * * *", async () => {
        console.log("");
        console.log("##################################");
        console.log("#                                #");
        console.log("# Running scheduler every minute #");
        console.log("#                                #");
        console.log("##################################");
        console.log("");

        // Perform your action here
        // TODO: link to python script as appropriate
      });

      res.status(200);
    } catch (error) {
      console.log(error);

      res.status(500, `Something went wrong: ${error}`);
    }
  }
}
