"use server";
import axios from "axios";

// TODO: add custom server-side MongoDB search code here to reduce api call overhead
export async function searchSections(email) {
  const res = await axios.get(
    `${process.env.SERVER_URL}/api/track?user_email=${email}`
  );

  console.log(`res: ${res.data}`);

  return res.data;
}
