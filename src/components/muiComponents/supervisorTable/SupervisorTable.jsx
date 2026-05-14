import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
  Typography,
  useMediaQuery,
  Collapse,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDownloadSupervisorPDF from "../../../hooks/supervisorHooks/useDownloadSupervisorPDF";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, isMobile } = props;

  const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

  const btnSx = {
    color: "#fff",
    "&.Mui-disabled": { color: "#555", opacity: 0.5 },
    padding: isMobile ? "2px" : "8px",
    "& svg": { fontSize: isMobile ? "16px" : "24px" },
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={(e) => onPageChange(e, 0)}
        disabled={page === 0}
        sx={btnSx}
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, page - 1)}
        disabled={page === 0}
        sx={btnSx}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page >= lastPage}
        sx={btnSx}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, lastPage)}
        disabled={page >= lastPage}
        sx={btnSx}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function PredictionBadge({ value }) {
  if (value === "meningioma")
    return (
      <Typography
        sx={{
          width: "fit-content",
          paddingY: "5px",
          paddingX: "10px",
          borderRadius: "20px",
          bgcolor: "rgb(55, 44, 28)",
          color: "rgb(218, 148, 14)",
          fontSize: "13px",
          display: "flex",
          whiteSpace: "nowrap",
          "@media (max-width:353px)": { fontSize: "10px" },
        }}
      >
        ● {value}
      </Typography>
    );
  if (value === "glioma")
    return (
      <Typography
        sx={{
          width: "fit-content",
          paddingY: "5px",
          paddingX: "10px",
          borderRadius: "20px",
          bgcolor: "rgb(51, 26, 32)",
          color: "rgb(196, 36, 38)",
          fontSize: "13px",
          display: "flex",
          whiteSpace: "nowrap",
          "@media (max-width:353px)": { fontSize: "10px" },
        }}
      >
        ● {value}
      </Typography>
    );
  if (value === "notumor")
    return (
      <Typography
        sx={{
          width: "fit-content",
          paddingY: "5px",
          paddingX: "10px",
          borderRadius: "20px",
          bgcolor: "rgb(23, 49, 40)",
          color: "rgb(30, 167, 69)",
          fontSize: "13px",
          display: "flex",
          whiteSpace: "nowrap",
          "@media (max-width:353px)": { fontSize: "10px" },
        }}
      >
        ● {value}
      </Typography>
    );
  if (value === "pituitary")
    return (
      <Typography
        sx={{
          width: "fit-content",
          paddingY: "5px",
          paddingX: "10px",
          borderRadius: "20px",
          backgroundColor: "#23272f",
          color: "#718296",
          fontSize: "13px",
          display: "flex",
          whiteSpace: "nowrap",
          "@media (max-width:353px)": { fontSize: "10px" },
        }}
      >
        ● {value}
      </Typography>
    );
  return null;
}

function FeedbackBadge({ isReviewed }) {
  if (isReviewed)
    return (
      <Typography
        sx={{
          width: "fit-content",
          paddingX: "14px",
          paddingY: "5px",
          borderRadius: "20px",
          backgroundColor: "#173128",
          color: "#1FA143",
          fontSize: "13px",
          display: "flex",
          whiteSpace: "nowrap",
        }}
      >
        Submitted
      </Typography>
    );
  return (
    <Typography
      sx={{
        width: "fit-content",
        paddingX: "10px",
        paddingY: "5px",
        borderRadius: "20px",
        backgroundColor: "#23272f",
        color: "#718296",
        fontSize: "13px",
        display: "flex",
        whiteSpace: "nowrap",
      }}
    >
      No Feedback
    </Typography>
  );
}

function MobileCard({
  row,
  handleOpenModal,
  navigate,
  downloadMutation,
  showActions,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: "#232121b8",
        borderRadius: "12px",
        mb: 1,
        overflow: "hidden",
        border: "1px solid #3b3a3a89",
      }}
    >
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          cursor: "pointer",
          bgcolor: "#484646b7",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ color: "#718296", fontSize: "13px" }}>
            {row.reportCode}{" "}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              wordBreak: "break-all",
              "@media (max-width:353px)": { fontSize: "12px" },
            }}
          >
            {row.studentName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PredictionBadge value={row.predictionResult} />
          {open ? (
            <KeyboardArrowUpIcon sx={{ color: "#fff" }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: "#fff" }} />
          )}
        </Box>
      </Box>

      <Collapse in={open}>
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#718296", fontSize: "12px" }}>
              DATE
            </Typography>
            <Typography sx={{ color: "#718296", fontSize: "13px" }}>
              {new Date(row.reportSubmittedAt).toLocaleString()}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#718296", fontSize: "12px" }}>
              PREDICTION
            </Typography>
            <PredictionBadge value={row.predictionResult} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#718296", fontSize: "12px" }}>
              FEEDBACK
            </Typography>
            <FeedbackBadge isReviewed={row.isReviewed} />
          </Box>
          {showActions && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "#718296", fontSize: "12px" }}>
                ACTIONS
              </Typography>
              <Box
                className="actions_icons"
                sx={{ display: "flex", gap: "5px", color: "#718296" }}
              >
                <MdOutlineRemoveRedEye
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/dashboard/supervisor/report-details/${row.reportId}`,
                    )
                  }
                />
                <BsFileEarmarkArrowDown
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => downloadMutation.mutate(row.reportId)}
                />
                <FiPlus
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenModal(row)}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

export default function CustomPaginationActionsTable({
  rows = [],
  count = 0,
  handleOpenModal,
  showActions = true,
  hidePagination = false,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("studentName");
  const isMobile = useMediaQuery("(max-width: 955px)");
  const navigate = useNavigate();
  const sortedRows = useMemo(() => {
    if (!rows) return [];
    return [...rows].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, order, orderBy]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const paginatedRows = hidePagination
    ? rows
    : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const displayedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const downloadMutation = useDownloadSupervisorPDF();
  return (
    <TableContainer
      component={Paper}
      sx={{
        minWidth: isMobile ? "unset" : "500px",
        bgcolor: "var(--navy-color)",
        borderRadius: "20px",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#2a2a3d",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#777575",
          borderRadius: "10px",
          cursor: "grab"
        },
      }}
    >
      {/* Mobile View */}
      {isMobile ? (
        <Box>
          {displayedRows.length === 0 ? (
            <Typography
              sx={{
                color: "var(--primary-color)",
                fontSize: "16px",
                textAlign: "center",
                py: 3,
              }}
            >
              No Data
            </Typography>
          ) : (
            displayedRows.map((row, index) => (
              <MobileCard
                key={row.caseId}
                row={row}
                index={page * rowsPerPage + index + 1}
                handleOpenModal={handleOpenModal}
                navigate={navigate}
                downloadMutation={downloadMutation}
                showActions={showActions}
              />
            ))
          )}

          {!hidePagination && (
            <Table>
              <TableFooter sx={{ bgcolor: "#232121b8" }}>
                <TableRow>
                  <TablePagination
                    sx={{
                      color: "#fff",
                      borderBottom: "1px solid #3b3a3a89",
                      "& .MuiTablePagination-toolbar": {
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "4px",
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
                        color: "#fff",
                        display: "block",
                        fontSize: "18px",
                      },
                    }}
                    rowsPerPageOptions={[5, 10, 20, 25]}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(0);
                    }}
                    ActionsComponent={(props) => (
                      <TablePaginationActions {...props} isMobile={true} />
                    )}
                    SelectProps={{
                      sx: {
                        color: "#fff",
                        "& .MuiSelect-icon": {
                          color: "#fff",
                        },
                      },
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            bgcolor: "#3b3a3a",
                            color: "#fff",
                            "& .MuiMenuItem-root": {
                              fontSize: "13px",
                              minHeight: "unset",
                            },
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
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </Box>
      ) : (
        /* Desktop View */
        <Table>
          <TableHead sx={{ bgcolor: "#484646b7" }}>
            <TableRow>
              <TableCell
                sx={{ color: "#fff", borderBottom: "1px solid #3b3a3a89" }}
              >
                REPORT
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  borderBottom: "1px solid #3b3a3a89",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOrder(order === "asc" ? "desc" : "asc");
                  setOrderBy("studentName");
                }}
              >
                STUDENT{" "}
                {orderBy === "studentName" ? (order === "asc" ? "↑" : "↓") : ""}
              </TableCell>
              <TableCell
                sx={{ color: "#fff", borderBottom: "1px solid #3b3a3a89" }}
              >
                DATE
              </TableCell>
              <TableCell
                sx={{ color: "#fff", borderBottom: "1px solid #3b3a3a89" }}
              >
                PREDICTION
              </TableCell>

              <TableCell
                sx={{ color: "#fff", borderBottom: "1px solid #3b3a3a89" }}
              >
                FEEDBACK
              </TableCell>

              {showActions && (
                <TableCell
                  sx={{ color: "#fff", borderBottom: "1px solid #3b3a3a89" }}
                >
                  ACTIONS
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody sx={{ bgcolor: "#232121b8" }}>
            {displayedRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ color: "var(--primary-color)", fontSize: "16px" }}
                >
                  No Data
                </TableCell>
              </TableRow>
            ) : (
              displayedRows.map((row, index) => (
                <TableRow
                  key={row.caseId}
                  sx={{
                    transition: "background-color 0.3s",
                    "&:hover": { bgcolor: "#aeacac09" },
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#718296",
                      borderTop: "1px solid #3b3a3a89",
                      borderBottom: "1px solid #3b3a3a89",
                    }}
                  >
                    {row.reportCode}{" "}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#fff",
                      borderTop: "1px solid #3b3a3a89",
                      borderBottom: "1px solid #3b3a3a89",
                    }}
                  >
                    {row.studentName}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#718296",
                      borderTop: "1px solid #3b3a3a89",
                      borderBottom: "1px solid #3b3a3a89",
                    }}
                  >
                    {new Date(row.reportSubmittedAt).toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderTop: "1px solid #3b3a3a89",
                      borderBottom: "1px solid #3b3a3a89",
                    }}
                  >
                    <PredictionBadge value={row.predictionResult} />
                  </TableCell>

                  <TableCell
                    sx={{
                      color: "#fff",
                      borderTop: "1px solid #3b3a3a89",
                      borderBottom: "1px solid #3b3a3a89",
                    }}
                  >
                    <FeedbackBadge isReviewed={row.isReviewed} />
                  </TableCell>

                  {showActions && (
                    <TableCell
                      sx={{
                        color: "#718296",
                        borderTop: "1px solid #3b3a3a89",
                        borderBottom: "1px solid #3b3a3a89",
                      }}
                    >
                      <Box
                        className="actions_icons"
                        sx={{ display: "flex", gap: "5px" }}
                      >
                        <MdOutlineRemoveRedEye
                          size={18}
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(
                              `/dashboard/supervisor/report-details/${row.reportId}`,
                            )
                          }
                        />
                        <BsFileEarmarkArrowDown
                          size={18}
                          style={{ cursor: "pointer" }}
                          onClick={() => downloadMutation.mutate(row.reportId)}
                        />
                        <FiPlus
                          size={18}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpenModal(row)}
                        />
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>

          {!hidePagination && (
            <TableFooter sx={{ bgcolor: "#232121b8" }}>
              <TableRow>
                <TablePagination
                  sx={{ color: "#fff", borderBottom: "1px solid #3b3a3a89" }}
                  rowsPerPageOptions={[5, 10, 20, 25]}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(e, newPage) => setPage(newPage)}
                  onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                  ActionsComponent={TablePaginationActions}
                  SelectProps={{
                    sx: {
                      color: "#fff",
                      "& .MuiSelect-icon": {
                        color: "#fff",
                      },
                    },
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          bgcolor: "#3b3a3a",
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
              </TableRow>
            </TableFooter>
          )}
        </Table>
      )}
    </TableContainer>
  );
}