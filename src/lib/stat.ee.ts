import axios from "axios";

export async function fetchStatVariables() {
  const response = await axios.get(
    "https://andmed.stat.ee/api/v1/et/stat/PA103"
  );
  return response.data;
}

export async function fetchSalaryData(queryBody: unknown) {
  const response = await axios.post(
    "https://andmed.stat.ee/api/v1/et/stat/PA103",
    queryBody
  );
  return response.data;
}
