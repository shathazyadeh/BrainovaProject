import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { MdOutlineEdit } from "react-icons/md";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { visuallyHidden } from "@mui/utils";
import { TbLockFilled } from "react-icons/tb";
import { FaUnlockAlt } from "react-icons/fa";
import useBlockUser from "../../../hooks/userManagementHooks/useBlockUser";
import useUnBlockUser from "../../../hooks/userManagementHooks/useUnBlockUser";
import useDeleteUser from "../../../hooks/userManagementHooks/useDeleteUser";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "fullName",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "userName",
    numeric: true,
    disablePadding: false,
    label: "User Name",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "roleName",
    numeric: true,
    disablePadding: false,
    label: "Role Name",
  },
  {
    id: "supervisorName",
    numeric: true,
    disablePadding: false,
    label: "Supervisor Name",
  },
  {
    id: "emailConfirmed",
    numeric: true,
    disablePadding: false,
    label: "Email Verified",
  },
  {
    id: "isBlocked",
    numeric: true,
    disablePadding: false,
    label: "Blocked Status",
  },
  {
    id: "Block",
    numeric: false,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    showActions,
    hideCheckbox,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {!hideCheckbox &&
        <TableCell padding="checkbox">
          <Checkbox
            sx={{
              color: "#fff", // لون البوردر قبل التحديد
              "&.Mui-checked": {
                color: "var(--primary-color)", // لون المربع بعد التحديد
              },
              "&.MuiCheckbox-indeterminate": {
                color: "red", // لون المربع لما يكون نصف محدد (اللون الأزرق اللي تقصده)
              }, 
              transition:"all 0.3s",
              "&:hover": {
      backgroundColor: "#ffffff0e",
    },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
}
        {headCells.map((headCell) => {
  if (!showActions && headCell.id === "Block") return null;

  return (
    <TableCell
      sx={{ color: "#fff", textAlign: "left" , paddingLeft:showActions?"20px":headCell.id === "fullName"?"40px":"" }}
      key={headCell.id}
      align="left"
      padding={headCell.disablePadding ? "none" : "normal"}
      sortDirection={orderBy === headCell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : "asc"}
        onClick={createSortHandler(headCell.id)}
        sx={{
          color: "#fff !important",
          "&:hover": { color: "#fff" },
          "&.Mui-active": { color: "#fff" },
          "& .MuiTableSortLabel-icon": {
            color: "#fff !important",
          },
        }}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
})}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onDelete } = props; //اون ديليت هو بروب يستقبل الفنكشن هاندل ديليت يوزر من تحت تحت بالفنكشن الاساسي للتيبل حيث تم تعريفه
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          bgcolor: "#23212184",
          color: "#fff",
        },
        numSelected > 0 && {
          bgcolor: "var(--table-color)",
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%", bgcolor: "rgba(50, 48, 48, 0)" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 auto", marginTop: "20px", fontSize: "20px", fontFamily: "var(--primary-font)" }}
          id="tableTitle"
          component="div"
        >
          Users Management
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton sx={{ color: "#fff" }} onClick={onDelete}>
            {" "}
            {/*هون بس بنحكيله انه لما ينضغط عليها استعدي اون ديليت الي هي بتساوي هاندل ديليت يوزر */}
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton sx={{ color: "#fff" }}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({
  rows,
  handleOpen,
  defaultRowsPerPage = 5,
  search = "",
  showActions = true,
  hidePagination = false,
  hideCheckbox = false,
}) {
  const { usePatchMutation: blockMutation } = useBlockUser(); //عملنالها اعادة تسمية
  const { usePatchMutation: unBlockMutation } = useUnBlockUser();

  const handelBlock = async (id) => {
    await blockMutation.mutateAsync(id);
  };

  const handelUnBlock = async (id) => {
    await unBlockMutation.mutateAsync(id);
  };
  const { deleteUserMutation } = useDeleteUser();
  const handleDeleteUser = async () => {
    //الفنكشن الي بنادي عالباك للحذف
    await deleteUserMutation.mutateAsync(selected); //هاي الاريه هو معرفها هون بتحوي اي ديز المستخدمين الي انعملهم سيليكت
  };

  const filteredRows = React.useMemo(
    () =>
      rows.filter((user) =>
        (user?.fullName + user?.userName + user?.phoneNumber)
          ?.toLowerCase()
          ?.includes(search?.toLowerCase()),
      ),
    [rows, search],
  );

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("fullName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "25px",
          overflow: "hidden",
          bgcolor: "#232121b8",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={handleDeleteUser}
        />{" "}
        {/*هون بعثنا لتوول بار الي فيها ايقونة الديليت الفنكشن تاع هندلة الحذف الي عرفناه هون */}
        <TableContainer
          sx={{
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "var(--table-color)",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#ffffff55",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#ffffff88",
            },
          }}
        >
          <Table
            sx={{
              minWidth: 750,
              bgcolor: "var(--table-color)",
              "& .MuiTableCell-root": {
                borderBottom: "1px solid rgba(97, 89, 89, 0.29)",
              },
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              showActions={showActions}
              hideCheckbox={hideCheckbox}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "var(--dark-gray-color) !important",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgba(212, 11, 11, 0.04)", // احمر شفاف جدا
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "var(--dark-gray-color) !important",
                      },
                    }}
                  >
                    {!hideCheckbox &&
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          color: "var(--secondary-color)", // لون البوردر قبل التحديد
                          "&.Mui-checked": {
                            color: "var(--primary-color)", // لون المربع بعد التحديد
                          },
                          transition:"all 0.3s",
              "&:hover": {
      backgroundColor: "#ffffff0e",
    },
                        }}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
              }
                    <TableCell 
  sx={{ color: "#fff", textAlign: "left", paddingLeft:showActions?"20px":"40px" }}
  component="th"
  id={labelId}
  scope="row"
  padding="none"
>
  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
    {/* الأفاتار */}
    <Box
      sx={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        bgcolor: "var(--primary-color)",
        boxShadow: "0 0 15px rgba(207, 25, 25, 0.51)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {row.fullName
        ?.split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()}
    </Box>

    {/* الاسم والإيميل */}
    <Box>
      <Typography sx={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>
        {row.fullName}
      </Typography>
      <Typography sx={{ color: "var(--secondary-color)", fontSize: "12px" }}>
        {row.email}
      </Typography>
    </Box>
  </Box>
</TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", textAlign: "left" }}
                    >
                      {row.userName}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "var(--secondary-color)", textAlign: "left" }}
                    >
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", textAlign: "left" }}
                    >
                      {row.roleName}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", textAlign: "left" }}
                    >
                      {row.supervisorName}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", textAlign: "left" }}
                    >
                      {row.emailConfirmed ? (
                        <Typography
                          sx={{
                            width: "fit-content",
                            paddingX: "15px",
                            paddingY: "5px",
                            borderRadius: "20px",
                            backgroundColor: "rgb(23, 49, 40)",
                            color:"#40e148",
                            fontSize: "13px",
                          }}
                        >
                          Verified
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            width: "fit-content",
                            paddingX: "15px",
                            paddingY: "5px",
                            borderRadius: "20px",
                            backgroundColor: "rgb(51, 26, 32)",
                            color:"#ef4444",
                            fontSize: "13px",
                            whiteSpace:"nowrap"
                          }}
                        >
                          Not Verified
                        </Typography>
                      )}
                    </TableCell>
                    {/*لو كانت true أو false أحيانًا تظهر كأنها فارغة في الجدول. */}
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", paddingRight:"80px"}}
                    >
                      {row.isBlocked ? (
                        <RxCrossCircled
                          size={24}
                          style={{ marginLeft: "5px", color: "#d91313" }}
                        />
                      ) : (
                        <IoCheckmarkCircleOutline
                          style={{ marginLeft: "5px", color: "#40e148" }}
                          size={25}
                        />
                      )}
                    </TableCell>
                    {showActions && (
                    <TableCell sx={{ color: "#fff", textAlign: "left" }}>
  <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton size="small">
                        {row.isBlocked ? (
                          <TbLockFilled
                            onClick={(e) => {
                              handelUnBlock(row.id);
                              e.stopPropagation();
                            }} //الثانية عشان لما يضغط الايقونة ما يتحدد كل السطر
                            fill="#d91313"
                            size={24}
                          />
                        ) : (
                          <FaUnlockAlt
                            onClick={(e) => {
                              handelBlock(row.id);
                              e.stopPropagation();
                            }}
                            fill="#5d5f5e"
                            size={19}
                            style={{ width: "25" }}
                          />
                        )}
                      </IconButton>
                      <IconButton size="small" sx={{backgroundColor: "#141414b4",
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor:
                    row?.code === "preliminary assesment"
                      ? "not-allowed"
                      : "pointer",
                  transition: "all .3s",
                  "&:hover": { bgcolor: "rgba(229, 226, 226, 0.21)" },}}>
                        <MdOutlineEdit
                          size={20}
                          color={"#5d5f5e"}
                          onClick={(e) => {
                            e.stopPropagation(); // يمنع الضغط على الصف
                            handleOpen(row); // فتح المودال وارسال بيانات المستخدم
                          }}
                        />
                      </IconButton>
                      </Box>
                    </TableCell>
                    )}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {!hidePagination &&
        <TablePagination
          sx={{ bgcolor: "var(--table-color)", color: "#fff","& .MuiSelect-icon": {color: "#fff"} }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  bgcolor: "var(--table-color)",
                  color: "#fff",

                  // hover على العناصر
                  "& .MuiMenuItem-root:hover": {
                    bgcolor: "var(--dark-gray-color)",
                    color: "#fff",
                  },

                  // العنصر المختار
                  "& .Mui-selected": {
                    bgcolor: "var(--dark-gray-color) !important",
                    color: "#fff",
                  },
                },
              },
            },
          }}
        />
        }
      </Paper>
    </Box>
  );
}