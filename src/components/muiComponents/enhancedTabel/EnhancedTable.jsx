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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useMediaQuery from "@mui/material/useMediaQuery";
import useBlockUser from "../../../hooks/userManagementHooks/useBlockUser";
import useUnBlockUser from "../../../hooks/userManagementHooks/useUnBlockUser";
import useDeleteUser from "../../../hooks/userManagementHooks/useDeleteUser";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "fullName", numeric: false, disablePadding: true, label: "Full Name" },
  { id: "userName", numeric: true, disablePadding: false, label: "User Name" },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  { id: "roleName", numeric: true, disablePadding: false, label: "Role Name" },
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
  { id: "Block", numeric: false, disablePadding: false, label: "Action" },
];

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  showActions,
  hideCheckbox,
}) {
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {!hideCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              sx={{
                color: "#fff",
                "&.Mui-checked": { color: "var(--primary-color)" },
                "&.MuiCheckbox-indeterminate": { color: "red" },
                transition: "all 0.3s",
                "&:hover": { backgroundColor: "#ffffff0e" },
              }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all" }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => {
          if (!showActions && headCell.id === "Block") return null;
          return (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                color: "#fff",
                textAlign: "left",
                paddingLeft: showActions
                  ? "20px"
                  : headCell.id === "fullName"
                    ? "40px"
                    : "",
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  color: "#fff !important",
                  "&:hover": { color: "#fff" },
                  "&.Mui-active": { color: "#fff" },
                  "& .MuiTableSortLabel-icon": { color: "#fff !important" },
                }}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                )}
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

function EnhancedTableToolbar({ numSelected, onDelete, hidePagination }) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          bgcolor: "#1f1e1eaa",
          color: "#fff",
        },
        numSelected > 0 && { bgcolor: "var(--table-color)" },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: "1 1 auto",
            marginTop: "20px",
            fontSize: "20px",
            fontFamily: "var(--primary-font)",
            fontWeight: "600",
          }}
          id="tableTitle"
          component="div"
        >
          {hidePagination ? "Users Management" : "All Users"}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton sx={{ color: "#fff" }} onClick={onDelete}>
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

EnhancedTableToolbar.propTypes = { numSelected: PropTypes.number.isRequired };

function UserAvatar({ row }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          bgcolor: "var(--primary-color)",
          boxShadow: "0 0 15px rgba(207,25,25,0.51)",
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
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "14px",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.fullName}
        </Typography>
        <Typography
          sx={{
            color: "var(--secondary-color)",
            fontSize: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.email}
        </Typography>
      </Box>
    </Box>
  );
}

function EmailBadge({ confirmed }) {
  return confirmed ? (
    <Typography
      sx={{
        width: "fit-content",
        paddingX: "12px",
        paddingY: "3px",
        borderRadius: "20px",
        backgroundColor: "rgb(23,49,40)",
        color: "#40e148",
        fontSize: "12px",
      }}
    >
      Verified
    </Typography>
  ) : (
    <Typography
      sx={{
        width: "fit-content",
        paddingX: "12px",
        paddingY: "3px",
        borderRadius: "20px",
        backgroundColor: "rgb(51,26,32)",
        color: "#ef4444",
        fontSize: "12px",
        whiteSpace: "nowrap",
      }}
    >
      Not Verified
    </Typography>
  );
}

function ActionButtons({
  row,
  handelBlock,
  handelUnBlock,
  handleOpen,
  size = 30,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <IconButton
        size="small"
        sx={{
          bgcolor: "#141414b4",
          height: size,
          width: size,
          borderRadius: "50%",
          "&:hover": { bgcolor: "rgba(229,226,226,0.21)" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          row.isBlocked ? handelUnBlock(row.id) : handelBlock(row.id);
        }}
      >
        {row.isBlocked ? (
          <TbLockFilled fill="#d91313" size={Math.round(size * 0.7)} />
        ) : (
          <FaUnlockAlt fill="#5d5f5e" size={Math.round(size * 0.6)} />
        )}
      </IconButton>
      <IconButton
        size="small"
        sx={{
          bgcolor: "#141414b4",
          height: size,
          width: size,
          borderRadius: "50%",
          "&:hover": { bgcolor: "rgba(229,226,226,0.21)" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen(row);
        }}
      >
        <MdOutlineEdit size={Math.round(size * 0.65)} color="#5d5f5e" />
      </IconButton>
    </Box>
  );
}

function CardRow({
  row,
  showActions,
  hideCheckbox,
  isItemSelected,
  handleClick,
  labelId,
  handelBlock,
  handelUnBlock,
  handleOpen,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      sx={{
        bgcolor: isItemSelected ? "rgba(212,11,11,0.04)" : "transparent",
        borderRadius: "12px",
        border: "1px solid rgba(97,89,89,0.35)",
        overflow: "hidden",
        transition: "border-color 0.25s",
        "&:hover": { borderColor: "rgba(97,89,89,0.6)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          p: "10px 12px",
          cursor: "pointer",
          "&:hover": { bgcolor: "var(--dark-gray-color)" },
        }}
        onClick={() => setOpen((p) => !p)}
      >
        {!hideCheckbox && (
          <Checkbox
            sx={{
              color: "var(--secondary-color)",
              "&.Mui-checked": { color: "var(--primary-color)" },
              transition: "all 0.3s",
              "&:hover": { backgroundColor: "#ffffff0e" },
              p: 0,
              flexShrink: 0,
            }}
            checked={isItemSelected}
            onChange={(e) => {handleClick(e, row.id);}}
            onClick={(e) => e.stopPropagation()}
            inputProps={{ "aria-labelledby": labelId }}
          />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <UserAvatar row={row} />
        </Box>
        <IconButton
          size="small"
          sx={{ color: "#fff", flexShrink: 0, p: "2px" }}
        >
          {open ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {open && (
        <Box
          sx={{
            px: "12px",
            pb: "12px",
            borderTop: "1px solid rgba(97,89,89,0.29)",
          }}
        >
          {[
            { label: "Full Name", value: row.fullName, color: "#fff" },
            { label: "User Name", value: row.userName, color: "#fff" },
            {
              label: "Email",
              value: row.email,
              color: "var(--secondary-color)",
            },
            {
              label: "Phone",
              value: row.phoneNumber,
              color: "var(--secondary-color)",
            },
            { label: "Role", value: row.roleName, color: "#fff" },
            { label: "Supervisor", value: row.supervisorName, color: "#fff" },
          ].map(({ label, value, color }) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
                py: "7px",
                borderBottom: "1px solid rgba(97,89,89,0.15)",
              }}
            >
              <Typography
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "12px",
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  color,
                  fontSize: "13px",
                  textAlign: "right",
                  wordBreak: "break-all",
                  minWidth: 0,
                }}
              >
                {value || "—"}
              </Typography>
            </Box>
          ))}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: "7px",
              borderBottom: "1px solid rgba(97,89,89,0.15)",
            }}
          >
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Email
            </Typography>
            <EmailBadge confirmed={row.emailConfirmed} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: "7px",
              borderBottom: showActions
                ? "1px solid rgba(97,89,89,0.15)"
                : "none",
            }}
          >
            <Typography
              sx={{
                color: "var(--secondary-color)",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Blocked
            </Typography>
            {row.isBlocked ? (
              <RxCrossCircled size={20} style={{ color: "#d91313" }} />
            ) : (
              <IoCheckmarkCircleOutline
                size={20}
                style={{ color: "#40e148" }}
              />
            )}
          </Box>

          {showActions && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: "10px",
              }}
            >
              <Typography
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Action
              </Typography>
              <ActionButtons
                row={row}
                handelBlock={handelBlock}
                handelUnBlock={handelUnBlock}
                handleOpen={handleOpen}
                size={28}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

function CardsGrid({
  visibleRows,
  cols,
  showActions,
  hideCheckbox,
  selected,
  handleClick,
  handelBlock,
  handelUnBlock,
  handleOpen,
}) {
  return (
    <Box
      sx={{
        bgcolor: "var(--table-color)",
        p: "14px",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "10px",
      }}
    >
      {visibleRows.map((row, index) => (
        <CardRow
          key={row.id}
          row={row}
          showActions={showActions}
          hideCheckbox={hideCheckbox}
          isItemSelected={selected.includes(row.id)}
          handleClick={handleClick}
          labelId={`card-checkbox-${index}`}
          handelBlock={handelBlock}
          handelUnBlock={handelUnBlock}
          handleOpen={handleOpen}
        />
      ))}
    </Box>
  );
}

export default function EnhancedTable({
  rows,
  handleOpen,
  defaultRowsPerPage = 5,
  search = "",
  showActions = true,
  hidePagination = false,
  hideCheckbox = false,
}) {
  const { usePatchMutation: blockMutation } = useBlockUser();
  const { usePatchMutation: unBlockMutation } = useUnBlockUser();

  const isDesktop = useMediaQuery("(min-width:1387px)");
  const isTablet = useMediaQuery("(min-width:630px) and (max-width:1386px)");

  const handelBlock = async (id) => await blockMutation.mutateAsync(id);
  const handelUnBlock = async (id) => await unBlockMutation.mutateAsync(id);

  const { deleteUserMutation } = useDeleteUser();
  const handleDeleteUser = async () => {
    await deleteUserMutation.mutateAsync(selected);
    setSelected([]);
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

  React.useEffect(() => {
    setPage(0);
  }, [filteredRows]);

  React.useEffect(() => {
    if (isTablet && !hidePagination) {
      setRowsPerPage(20);
    } else if (isTablet && hidePagination) {
      setRowsPerPage(10);
    } else {
      setRowsPerPage(defaultRowsPerPage);
    }
  }, [isTablet]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(filteredRows.map((n) => n.id));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const idx = selected.indexOf(id);
    let next = [];
    if (idx === -1) next = [...selected, id];
    else if (idx === 0) next = selected.slice(1);
    else if (idx === selected.length - 1) next = selected.slice(0, -1);
    else next = [...selected.slice(0, idx), ...selected.slice(idx + 1)];
    setSelected(next);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
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

  const cardProps = {
    visibleRows,
    showActions,
    hideCheckbox,
    selected,
    handleClick,
    handelBlock,
    handelUnBlock,
    handleOpen,
  };

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
          hidePagination={hidePagination}
        />

        {/* DESKTOP */}
        {isDesktop && (
          <TableContainer
            sx={{
              "&::-webkit-scrollbar": { height: "8px" },
              "&::-webkit-scrollbar-track": {
                background: "var(--table-color)",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ffffff55",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": { background: "#ffffff88",cursor: "grab" },
            }}
          >
            <Table
              sx={{
                minWidth: 750,
                bgcolor: "var(--table-color)",
                "& .MuiTableCell-root": {
                  borderBottom: "1px solid rgba(97,89,89,0.29)",
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
                  const labelId = `desktop-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(e) => {
                        if (!hidePagination) handleClick(e, row.id);
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={!hidePagination && isItemSelected}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "var(--dark-gray-color) !important",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "rgba(212,11,11,0.04)",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "var(--dark-gray-color) !important",
                        },
                      }}
                    >
                      {!hideCheckbox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            sx={{
                              color: "var(--secondary-color)",
                              "&.Mui-checked": {
                                color: "var(--primary-color)",
                              },
                              transition: "all 0.3s",
                              "&:hover": { backgroundColor: "#ffffff0e" },
                            }}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                      )}

                      <TableCell
                        sx={{
                          color: "#fff",
                          textAlign: "left",
                          paddingLeft: showActions ? "20px" : "40px",
                        }}
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <UserAvatar row={row} />
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
                        <EmailBadge confirmed={row.emailConfirmed} />
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{ color: "#fff", paddingRight: "80px" }}
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
                          <ActionButtons
                            row={row}
                            handelBlock={handelBlock}
                            handelUnBlock={handelUnBlock}
                            handleOpen={handleOpen}
                            size={30}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* TABLET 2 cards */}
        {isTablet && (
          <CardsGrid
            {...cardProps}
            cols={2}
            sx={{ "@media (max-width:411px)": { paddingBottom: "100px" } }}
          />
        )}

        {/* MOBILE 1 card */}
        {!isDesktop && !isTablet && <CardsGrid {...cardProps} cols={1} />}

        {!hidePagination && (
          <TablePagination
            sx={{
              bgcolor: "var(--table-color)",
              color: "#fff",

              "& .MuiSelect-icon": {
                color: "#fff",
              },

              "@media (max-width:411px)": {
                "& .MuiTablePagination-toolbar": {
                  flexWrap: "wrap",
                  justifyContent: "center",
                  minHeight: "unset",
                },

                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  {
                    fontSize: "11px",
                  },

                "& .MuiTablePagination-select": {
                  fontSize: "11px",
                },

                "& .MuiSelect-icon": {
                  fontSize: "18px",
                },
                "& .MuiTablePagination-actions button": {
                  padding: "2px",
                },

                "& .MuiTablePagination-actions svg": {
                  fontSize: "16px",
                },
              },
            }}
            rowsPerPageOptions={[5, 10, 20, 25]}
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
                    "& .MuiMenuItem-root:hover": {
                      bgcolor: "var(--dark-gray-color)",
                      color: "#fff",
                    },
                    "& .Mui-selected": {
                      bgcolor: "var(--dark-gray-color) !important",
                      color: "#fff",
                    },
                  },
                },
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
}