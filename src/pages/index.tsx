import { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

import QueryForm, {
  QueryValues,
  QueryOption,
  QueryFormOptions,
} from "../components/query-form";

import ResultDisplay from "../components/result-display";
import MainLayout from "../layout/main-layout";

import { SalaryData, Variable } from "../types/statisticsTypes";

interface HomeProps {
  options: QueryFormOptions;
}

export default function Home({ options }: HomeProps) {
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleQuerySubmit = async (values: QueryValues) => {
    setLoading(true);

    const fixedNaitaja = "GR_W_AVG";
    const vaatlusperioodid = ["2021", "2022", "2023", "2024"];

    const postBody = {
      query: [
        {
          code: "Näitaja",
          selection: { filter: "item", values: [fixedNaitaja] },
        },
        {
          code: "Tegevusala",
          selection: { filter: "item", values: [values.tegevusala] },
        },
        {
          code: "Vaatlusperiood",
          selection: { filter: "item", values: vaatlusperioodid },
        },
      ],
      response: { format: "json-stat2" },
    };

    try {
      const salaryRes = await axios.post<SalaryData>("/api/salary", postBody);
      setSalaryData(salaryRes.data);

      const salaryValues = salaryRes.data.value;
      const periods = salaryRes.data.dimension["Vaatlusperiood"].category.index;
      const labels = salaryRes.data.dimension["Vaatlusperiood"].category.label;

      const sortedYears = Object.entries(periods)
        .sort(([, a], [, b]) => a - b)
        .map(([key]) => key);

      const salaryLines = sortedYears.map((year, idx) => {
        const label = labels[year];
        const salary = salaryValues[idx];
        return `- ${label}: ${salary} €`;
      });

      const fieldLabel =
        salaryRes.data.dimension["Tegevusala"].category.label[
          values.tegevusala
        ];

      const prompt = `
Siin on palgaandmed tegevusala "${fieldLabel}" kohta viimase 4 aasta jooksul:

${salaryLines.join("\n")}

Koosta lihtsas keeles kokkuvõte, mis sisaldab:
1. Palgatrendi selgitus (kas on tõusvas või langustrendis).
2. Prognoos järgmisteks aastateks.
3. Soovitused, kuidas selles valdkonnas võiks palka suurendada (nt oskused või kvalifikatsioonid).

Vastus peaks olema arusaadav tavainimesele.
`;

      try {
        const summaryRes = await axios.post("/api/summary", { prompt });
        setSummary(
          summaryRes.data.choices?.[0]?.message?.content ??
            "No summary returned."
        );
      } catch (summaryError) {
        alert(`Failed to get ChatGPT summary: ${summaryError}`);
        setSummary("Kokkuvõtet ei õnnestunud saada");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <QueryForm
        options={{ tegevusalaOptions: options.tegevusalaOptions }}
        onSubmit={handleQuerySubmit}
      />
      {loading ? (
        <p>Laetakse tulemusi...</p>
      ) : (
        <ResultDisplay salaryData={salaryData} summary={summary} />
      )}
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/variables");
  const variables = await res.json();

  const getOptions = (code: string): QueryOption[] => {
    const variable = variables.variables.find((v: Variable) => v.code === code);
    if (!variable) return [];
    return variable.values.map((value: string, idx: number) => ({
      value,
      label: variable.valueTexts[idx] || value,
    }));
  };

  return {
    props: {
      options: {
        naitajaOptions: [],
        tegevusalaOptions: getOptions("Tegevusala"),
        vaatlusperioodOptions: [],
      },
    },
  };
};
