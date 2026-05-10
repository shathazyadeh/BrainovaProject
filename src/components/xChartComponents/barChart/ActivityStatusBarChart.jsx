import { BarChart } from "@mui/x-charts/BarChart";

export default function ActivityStatusBarChart({ active, blocked, unverified }) {
  return (
    <BarChart
  dataset={[
    { status: "Active", value: active },
    { status: "Blocked", value: blocked },
    { status: "Unverified", value: unverified },
  ]}
  xAxis={[{
    scaleType: "band",
    dataKey: "status",
    colorMap: {
      type: "ordinal",
      colors: ["#4caf50", "#f44336", "#ff9800"],
    },
  }]}
  series={[{ dataKey: "value" }]}
  height={300}
  sx={{
    "& .MuiChartsAxis-line": { stroke: "#fff !important" },
    "& .MuiChartsAxis-tick": { stroke: "#fff !important" },
    "& .MuiChartsAxis-tickLabel": { fill: "#fff !important" },
  }}
/>
  );
}