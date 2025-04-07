import { generateSummary } from "../lib/openai";

export async function handleSummaryRequest(prompt: string) {
  return await generateSummary(prompt);
}
