import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function UsersSearch({
  search,
  setSearch,
  label = "Search users...",
}) {
  return (
    <TextField
      size="small"
      placeholder={label}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{
        bgcolor: "#232121b8",
        borderRadius: "15px",
        border: "none",
        input: { color: "#fff" },
        mb: 2,
        width: { xs: "200px", sm: "300px" },
        "& input": {
          "&::placeholder": {
            color: "var(--secondary-color)",
          },
        },
        "& .MuiOutlinedInput-root": {
          height: 55, // ارتفاع الـ box الخارجي
          "& fieldset": {
            borderRadius: "15px", // هنا نشيل البوردر الخارجي
          },
          "&:hover fieldset": {
            border: "1px red solid", // نشيل البوردر عند الهور أيضاً
          },
          "&.Mui-focused fieldset": {
            border: "1px red solid", // نشيل البوردر لما يكون فوكس
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: "var(--secondary-color)" }} />
          </InputAdornment>
        ),
      }}
    />
  );
}