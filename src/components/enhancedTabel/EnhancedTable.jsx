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
import { FaRegEdit } from "react-icons/fa";
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
import useBlockUser from "../../hooks/useBlockUser";
import useUnBlockUser from "../../hooks/useUnBlockUser";
import useDeleteUser from "../../hooks/useDeleteUser";

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
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
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
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ color: "#fff", textAlign: "left" }}
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              iconPosition="end" // حطيناها عشان السهم الي جنب كل عمود يصير بعد اسم العمود مش قبله
              sx={{
                color: "#fff !important",
                "&:hover": {
                  color: "#fff",
                },
                "&.Mui-active": {
                  color: "#fff",
                },
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
        ))}
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
          bgcolor: "var(--table-color)",
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
          sx={{ flex: "1 1 auto", marginTop: "20px", fontSize: "25px" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All users
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
      rows
        .filter(
          // هون فلترت التيبل لتيبل تحوي فقط المستخدم الي بكون طالب او سوبر فايزر لعرضهم لداش بورد الادمن
          (user) => user.roleName !== "Admin" && user.roleName !== "SuperAdmin",
        )
        .filter((user) =>
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

  // Avoid a layout jump when reaching the last page with empty rows.
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
          bgcolor: "rgba(2, 1, 1, 0.7)",
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
              width: "10px",
              height: "10px",
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
                borderBottom: "1px solid rgba(97, 89, 89, 0.6)",
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          color: "var(--secondary-color)", // لون البوردر قبل التحديد
                          "&.Mui-checked": {
                            color: "var(--primary-color)", // لون المربع بعد التحديد
                          },
                        }}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ color: "#fff", textAlign: "left" }}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.fullName}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", textAlign: "left" }}
                    >
                      {row.userName}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: "var(--secondary-color)",
                        textAlign: "left",
                      }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", textAlign: "left" }}
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
                            border: "1px solid #ef4444",
                            width: "fit-content",
                            paddingX: "20px",
                            paddingY: "5px",
                            borderRadius: "20px",
                            backgroundColor: "rgba(246, 56, 56, 0.12)",
                            fontSize: "12px",
                          }}
                        >
                          Verified
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            border: "1px solid  #ef4444",
                            width: "fit-content",
                            paddingX: "20px",
                            paddingY: "5px",
                            borderRadius: "20px",
                            backgroundColor: "rgba(239, 68, 68)",
                            fontSize: "12px",
                          }}
                        >
                          Not Verified
                        </Typography>
                      )}
                    </TableCell>
                    {/*لو كانت true أو false أحيانًا تظهر كأنها فارغة في الجدول. */}
                    <TableCell
                      align="right"
                      sx={{ color: "#fff", textAlign: "left" }}
                    >
                      {row.isBlocked ? (
                        <RxCrossCircled
                          size={24}
                          style={{ marginLeft: "5px", color: "#ef4444" }}
                        />
                      ) : (
                        <IoCheckmarkCircleOutline
                          style={{ marginLeft: "5px", color: "#898a89" }}
                          size={25}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "#fff", textAlign: "left" }}>
                      <IconButton size="small">
                        {row.isBlocked ? (
                          <TbLockFilled
                            onClick={(e) => {
                              handelUnBlock(row.id);
                              e.stopPropagation();
                            }} //الثانية عشان لما يضغط الايقونة ما يتحدد كل السطر
                            fill="#ef2e2e"
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
                      <IconButton size="small">
                        <FaRegEdit
                          size={20}
                          color={"#5d5f5e"}
                          onClick={(e) => {
                            e.stopPropagation(); // يمنع الضغط على الصف
                            handleOpen(row); // فتح المودال وارسال بيانات المستخدم
                          }}
                        />
                      </IconButton>
                    </TableCell>
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
        <TablePagination
          sx={{ bgcolor: "var(--table-color)", color: "#fff" }}
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
      </Paper>
    </Box>
  );
}