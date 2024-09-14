import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    const res = await fetch("https://api.umd.io/v1/courses/sections");
    console.log(await res.json());

    res.status(200);
  } catch (ex) {
    res.status(500).json({ message: ex });
  }
}
