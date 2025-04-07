import type { NextApiRequest, NextApiResponse } from "next";
import { handleSummaryRequest } from "../../services/summary-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const data = await handleSummaryRequest(prompt);
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error generating summary:", error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
