"use server";
import axios from "axios";

// TODO: add custom server-side MongoDB search code here to reduce api call overhead
export async function searchSections(query) {
  const res = await axios.get(
    `${process.env.SERVER_URL}/api/section/search?query_string=${query}`
  );

  console.log(`res: ${res.data}`);

  return res.data;
}
