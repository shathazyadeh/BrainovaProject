import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

function ReportsLineChart({ chartData }) {
  return (
    <LineChart
                  dataset={chartData}
                  xAxis={[{ scaleType: "point", dataKey: "date" }]}
                  series={[
                    {
                      dataKey: "count",
                      label: "Reports",
                      color: "var(--primary-color)",
                      curve: "monotoneX",
                    },
                  ]}
                  height={154}
                  localeText={{
                    noData: "Start submitting reports to see stats",
                  }}
                  margin={{ left: 0 }}
                  sx={{
                    "& .MuiChartsAxis-tickLabel tspan": {
                      fill: "#fff !important",
                      stroke: "none !important",
                    },
                    "& .MuiChartsAxis-line": { stroke: "#fff !important" },
                    "& .MuiChartsAxis-tick": { stroke: "#fff !important" },
                    "& .MuiChartsLegend-label": {
                      color: "#fff !important",
                      fontFamily: "var(--primary-font) !important",
                      fontWeight: "600 !important",
                    },
                    "& .MuiChartsAxisHighlight-root line": {
                      stroke: "#ff0000 !important",
                    },
                    "& .MuiChartsAxisHighlight-root": {
                      stroke: "#fff !important",
                    },
                    "& .MuiChartsNoDataOverlay-root text": {
                      display: "none !important",
                    },
                  }}
                  slotProps={{
                    legend: {
                      position: {
                        vertical: "top",
                        horizontal: "end",
                      },
                    },
                    noDataOverlay: {
                      sx: {
                        fill: "#fff !important",
                        "@media (max-width:500px)": { fontSize: "10px" },
                      },
                    },
                  }}
                />
  );
}

export default ReportsLineChart;