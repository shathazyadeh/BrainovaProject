import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function UsersPieChart({ students, supervisors, admins }) {
  const data = [
    { id: 0, value: students, label: "Students", color: "#524e4e" },
    {
      id: 1,
      value: supervisors,
      label: "Supervisors",
      color: "rgb(129, 15, 15)",
    },
    { id: 3, value: admins, label: "Admins", color: "rgb(29, 6, 235)" },
  ];

  return (
    <Box
      className="flex_column"
      sx={{
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        paddingBottom: "10px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff", pt: 2 }} gutterBottom>
        Users Distribution
      </Typography>

      <PieChart
        series={[
          {
            data,
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 15,
            highlightScope: { fade: "global", highlight: "item" },
            cornerRadius: 4,
          },
        ]}
        width={300}
        height={200}
        hideLegend
        sx={{
          "& .MuiPieArcLabel-root": {
            fontSize: 13,
            fill: "#fff",
          },
        }}
      />

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          paddingBottom: "10px",
          paddingTop: "12px",
          justifyContent: "center",
        }}
      >
        {data.map((item) => {
          return item.value !== undefined ? (
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  bgcolor: item.color,
                  borderRadius: "50%",
                }}
              />
              <Typography sx={{ color: "#fff", fontSize: 14 }}>
                {item.label}
              </Typography>
            </Box>
          ) : null;
        })}
      </Box>
    </Box>
  );
}