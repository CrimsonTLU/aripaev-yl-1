import type { NextApiRequest, NextApiResponse } from "next";
import { handleSalaryRequest } from "../../services/salary-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await handleSalaryRequest(req.body);
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
