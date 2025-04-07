import { Typography, Paper } from "@mui/material";
import { FC } from "react";
import { SalaryData } from "../types/statisticsTypes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ResultDisplayProps {
  salaryData: SalaryData | null;
  summary: string;
}

const ResultDisplay: FC<ResultDisplayProps> = ({ salaryData, summary }) => {
  if (!salaryData) return null;

  const values = salaryData.value;
  const periods = salaryData.dimension["Vaatlusperiood"].category.index;
  const labelMap = salaryData.dimension["Vaatlusperiood"].category.label;

  const yearOrder = Object.entries(periods)
    .sort(([, a], [, b]) => a - b)
    .map(([key]) => key);

  const chartData = yearOrder.map((year, idx) => ({
    year: labelMap[year],
    salary: values[idx],
  }));

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Palgatrend
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis unit="€" />
          <Tooltip formatter={(value: number) => [`${value} €`, "Keskmine palk"]} />
          <Line type="monotone" dataKey="salary" label="p" stroke="#1976d2" />
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Kokkuvõte
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {summary}
      </Typography>
    </Paper>
  );
};

export default ResultDisplay;
