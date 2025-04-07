import type { NextApiRequest, NextApiResponse } from "next";
import { fetchStatVariables } from "../../lib/stat.ee";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchStatVariables();
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("API /variables failed:", error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
