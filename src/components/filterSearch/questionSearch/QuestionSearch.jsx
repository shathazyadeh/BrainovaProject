import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function QuestionSearch({ search, setSearch }) {
  return (
   <TextField
  size="small"
  variant="filled"
  fullWidth
  placeholder="Filter by text or code..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  sx={{
    bgcolor: "var(--navy-color)",
    marginBottom:"30px",
    input: {
      color: "#fff",
    },
    "& input::placeholder": {
    color: "var(--secondary-color)",
    fontSize:"13px",
    opacity: 1,
  },
    "& .MuiFilledInput-root":{
        height: 40,
        paddingBottom:"30px"
    },
    "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
                          WebkitTextFillColor: "#fff",
                          transition: "background-color 9999s ease-in-out 0s",
                        },

                        "& input:-webkit-autofill:hover": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
                        },

                        "& input:-webkit-autofill:focus": {
                          WebkitBoxShadow: "0 0 0 100px transparent inset",
                        },
    "& .MuiFilledInput-root:before": {
      borderBottom: "1px solid var(--mid-gray-color)",
    },
    "& .MuiFilledInput-root:hover:before": {
      borderBottom: "1px solid rgb(26,26,26)",
    },
    "& .MuiFilledInput-root:after": {
      borderBottom: "2px solid var(--primary-color)",
    },
  }}
  InputProps={{
    disableUnderline: false,
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon style={{ color: "var(--secondary-color)" ,fontSize:"22px"}} />
      </InputAdornment>
    ),
  }}
/>
  );
}