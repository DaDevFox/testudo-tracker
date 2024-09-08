// https://medium.com/@farmaan30327/running-a-scheduled-job-in-nextjs-with-node-cron-77f0433a713b

import axios from "axios";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

import { createServer } from "http";
import { parse } from "url";

app.prepare().then(async () => {
  const port = process.env.PORT || 3000;
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // cron trigger scheduler to scrape testudo
  const runScheduler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${port}/api/services/scheduler`, // this server SHOULD always run on the same machine as the api as of rn -- maybe change in future
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  httpServer.listen(port, () => {
    console.log(
      `Testudo Tracker web server is running on http://localhost:${port}.\nWebscraper script is now being queried via the services/scheduler API route every minute.`
    );

    // TODO: uncomment when python script functionality is complete
    runScheduler();
  });
});
