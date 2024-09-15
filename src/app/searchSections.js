"use server";
import axios from "axios";
export async function searchSections(query) {
  const res = await axios.get(
    `${process.env.SERVER_URL}/api/section/search?query_string=${query}`
  );

  console.log(`res: ${res.data}`);

  return res.data;
}
