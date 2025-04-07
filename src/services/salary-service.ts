import { fetchSalaryData } from "../lib/stat.ee";

export async function handleSalaryRequest(body: unknown) {
  return await fetchSalaryData(body);
}
