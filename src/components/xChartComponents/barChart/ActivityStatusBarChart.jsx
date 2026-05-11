import { BarChart } from "@mui/x-charts/BarChart";

export default function ActivityStatusBarChart({
  active,
  blocked,
  unverified,
}) {
  return (
    <BarChart
      dataset={[
        { status: "Active", value: active },
        { status: "Blocked", value: blocked },
        { status: "Unverified", value: unverified },
      ]}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "status",
          categoryGapRatio: 0.3,
          colorMap: {
            type: "ordinal",
            colors: ["#00d034", "var(--primary-color)", "#ff7700"],
          },
        },
      ]}
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