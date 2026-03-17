import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function UsersFilters({
  roleFilter,
  setRoleFilter,
  supervisorFilter,
  setSupervisorFilter,
  supervisorsList,
}) {
  return (
    <Box sx={{ display: { xs: "block", md: "flex" }, gap: 2, mb: 2 }}>
      <FormControl
        size="small"
        sx={{
          minWidth: 150,
          marginRight: { xs: "10px", md: "0" },
          marginBottom: { xs: "16px", sm: "0px" },
        }}
      >
        <InputLabel
          sx={{
            color: "#fff",
            "&.Mui-focused": {
              color: "red", // لون الليبل عند التركيز
            },
          }}
        >
          Role
        </InputLabel>
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          label="Role"
          sx={{
            color: "#fff",
            bgcolor: "#141414",
            height: "55px",
            borderRadius: "15px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "red", // عند hover
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "red", // عند focus
            },

            "& .MuiSelect-icon": {
              color: "#fff", // لون السهم
            },
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Supervisor">Supervisor</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel
          shrink={Boolean(supervisorFilter)} // يبقى فوق لو فيه قيمة
          sx={{
            color: "#fff",
            transform: !supervisorFilter
              ? "translate(14px, 15px) scale(1)" // افتراضي أسفل قليلاً
              : "translate(14px, -6px) scale(0.75)", // فوق لو فيه قيمة
            "&.Mui-focused": {
              transform: "translate(14px, -6px) scale(0.75)", // عند التركيز يبقى فوق
              color: "red",
            },
          }}
        >
          Filter by Supervisor
        </InputLabel>
        <Select
          value={supervisorFilter}
          onChange={(e) => setSupervisorFilter(e.target.value)}
          label="Filter by Supervisor"
          sx={{
            color: "#fff",
            bgcolor: "#141414",
            height: "55px",
            borderRadius: "15px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "red", // عند hover
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "red", // عند focus
            },

            "& .MuiSelect-icon": {
              color: "#fff", // لون السهم
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          {supervisorsList.map((sup) => (
            <MenuItem key={sup.id} value={sup.id}>
              {sup.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}