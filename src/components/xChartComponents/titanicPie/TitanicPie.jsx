import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

export default function TitanicPie({ students, supervisors, admins }) {
  const isBelow1140px = useMediaQuery("(max-width:1140px)");
  const isBelow1024px = useMediaQuery("(max-width:1024px)");
  const isBelow900px = useMediaQuery("(max-width:900px)");
  const isBelow855px = useMediaQuery("(max-width:855px)");
  const isBelow744px = useMediaQuery("(max-width:744px)");
  const isBelow600px = useMediaQuery("(max-width:600px)");

  const data = [
    {
      id: 0,
      value: students,
      label: "Students",
      color: "var(--primary-color)",
    },
    {
      id: 1,
      value: supervisors,
      label: "Supervisors",
      color: "rgb(2, 188, 45)",
    },
    { id: 3, value: admins, label: "Admins", color: "#464646" },
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
        width={
          isBelow600px
            ? 290
            : isBelow744px
              ? 260
              : isBelow855px
                ? 290
                : isBelow900px
                  ? 318
                  : isBelow1024px
                    ? 260
                    : isBelow1140px
                      ? 290
                      : 318
        }
        height={
          isBelow600px
            ? 190
            : isBelow744px
              ? 160
              : isBelow855px
                ? 190
                : isBelow900px
                  ? 218
                  : isBelow1024px
                    ? 160
                    : isBelow1140px
                      ? 190
                      : 218
        }
        hideLegend
        sx={{
          "& .MuiPieArcLabel-root": {
            fontSize: 13,
            fill: "#fff",
            "@media (max-width:1024px)": { fontSize: 11 },
            "@media (max-width:900px)": { fontSize: 13 },
            "@media (max-width:744px)": { fontSize: 11 },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2 },
          pt: "12px",
          pb: "10px",
          justifyContent: "center",
        }}
      >
        {data.map((item) =>
          item.value !== undefined ? (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  bgcolor: item.color,
                  borderRadius: "50%",
                  "@media (max-width:1140px)": { width: 12, height: 12 },
                  "@media (max-width:900px)": { width: 14, height: 14 },
                  "@media (max-width:855px)": { width: 12, height: 12 },
                }}
              />

              <Typography
                sx={{
                  color: "#fff",
                  fontSize: 14,
                  "@media (max-width:1140px)": { fontSize: 12 },
                  "@media (max-width:900px)": { fontSize: 14 },
                  "@media (max-width:855px)": { fontSize: 12 },
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ) : null,
        )}
      </Box>
    </Box>
  );
}