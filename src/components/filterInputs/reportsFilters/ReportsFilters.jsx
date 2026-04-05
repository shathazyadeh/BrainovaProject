import { Box, FormControl, Select, MenuItem } from "@mui/material";

export default function ReportsFilters({
  feedbackFilter,
  setFeedbackFilter,
  predictionFilter,
  setPredictionFilter,
}) {

  return (
    <Box sx={{ display: { xs: "block", md: "flex" }, gap: 1, mb: 2 }}>
      <FormControl
        size="small"
        sx={{
          minWidth: 150,
          marginRight: { xs: "10px", md: "0" },
          "@media (max-width:391.98px)" :{
              marginBottom: "17px",
          }
        }}
      >
        <Select
          value={feedbackFilter}
          onChange={(e) => setFeedbackFilter(e.target.value)}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#373535",
                color: "#fff",
                borderRadius: "10px",
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    bgcolor: "var(--primary-color)",
                  },
                },
              },
            },
          }}
          sx={{
            color: "#fff",
            bgcolor: "#141414",
            height: "55px",
            borderRadius: "15px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)", // عند hover
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)", // عند focus
            },

            "& .MuiSelect-icon": {
              color: "#fff", // لون السهم
            },
          }}
        >
          <MenuItem value="all">All Reports</MenuItem>
          <MenuItem value="noFeedback">No Feedback</MenuItem>
          <MenuItem value="submitted">Submitted</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <Select
          value={predictionFilter}
          onChange={(e) => setPredictionFilter(e.target.value)}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 48 * 3 + 8,
                bgcolor: "#373535",
                color: "#fff",
                borderRadius: "10px",

                "& .MuiMenuItem-root": {
                  "&:hover": {
                    bgcolor: "var(--primary-color)",
                  },
                },

                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#2a2a2a",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "var(--primary-color)",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#ff4d4d",
                },

                scrollbarWidth: "thin",
                scrollbarColor: "var(--secondary-color) #2a2a2a",
              },
            },
          }}
          sx={{
            color: "#fff",
            bgcolor: "#141414",
            height: "55px",
            borderRadius: "15px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary-color)",
            },
            "& .MuiSelect-icon": {
              color: "#fff",
            },
          }}
        >
          <MenuItem value="all">All Predictions</MenuItem>
          <MenuItem value="meningioma">Meningioma</MenuItem>
          <MenuItem value="glioma">Glioma</MenuItem>
          <MenuItem value="pituitary">Pituitary</MenuItem>
          <MenuItem value="notumor">No Tumor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}