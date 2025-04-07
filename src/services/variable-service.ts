import { fetchStatVariables } from "../lib/stat.ee";

export async function handleVariableRequest() {
  return await fetchStatVariables();
}
