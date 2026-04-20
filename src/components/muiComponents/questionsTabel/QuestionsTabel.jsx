import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MdArrowForwardIos, MdOutlineEdit } from "react-icons/md";
import { Switch } from '@mui/material';

function Row(props) {
  const { row } = props;
  console.log("row ", row);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(row?.isActive);
  console.log(row?.isActive);

  React.useEffect(() => {
    setChecked(row?.isActive);
  }, [row?.isActive]);

  const handleToggle = (id, value) => {
    setChecked(value);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowDownIcon sx={{ color: "var(--secondary-color)" }} />
            ) : (
              <MdArrowForwardIos size={"15"} fill={"var(--secondary-color)"} />
            )}
          </IconButton>
        </TableCell>

        <TableCell align="left" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          #{row?.order}
        </TableCell>

        <TableCell component="th" scope="row" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          {row?.code}
        </TableCell>

        <TableCell
          align="left"
          sx={{
            maxWidth: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: checked ? "#fff" : "var(--secondary-color)",
            fontWeight: "600",
            textDecoration: checked ? "none" : "line-through"
          }}
        >
          {row?.text}
        </TableCell>

        <TableCell align="left" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          {row?.type === 1 ? "Free text" : "Multi choice"}
        </TableCell>

        <TableCell align="left" sx={{ color: "var(--secondary-color)", fontWeight: "600" }}>
          {row?.code}
        </TableCell>

        <TableCell
          align="left"
          sx={{
            color: "var(--secondary-color)",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <Switch
            checked={checked}
            onChange={(e) => handleToggle(row.id, e.target.checked)}
            disableRipple
            sx={{
              width: 42,
              height: 24,
              padding: 0,

              '& .MuiSwitch-switchBase': {
                padding: '3px',
                transition: '0.3s',

                '&:hover': {
                  backgroundColor: 'rgba(81, 81, 81, 0.22) !important',
                },

                '&.Mui-checked': {
                  transform: 'translateX(18px)',
                },

                '&.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'var(--primary-color) !important',
                  opacity: 1,
                },
              },

              '& .MuiSwitch-thumb': {
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: 'var(--navy-color)',
              },

              '& .MuiSwitch-track': {
                borderRadius: 12,
                backgroundColor: '#575656 !important',
                opacity: 1,
              },
            }}
          />

          <Box
            sx={{
              backgroundColor: "var(--navy-color)",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all .3s",
              "&:hover": {
                backgroundColor: "rgba(229, 226, 226, 0.21)",
              },
            }}
          >
            <MdOutlineEdit size={19} />
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody></TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.number,
    code: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.number,
    isActive: PropTypes.bool,
  }).isRequired,
};

export default function QuestionsTabel(data) {
  console.log("table ", data?.data);

  return (
    <TableContainer component={Paper}>
      <Table
        aria-label="collapsible table"
        sx={{
          bgcolor: "var(--navy-color)",
          "& .MuiTableCell-root": {
            borderBottomColor: "#1e1d1d",
          }
        }}
      >
        <TableBody>
          {data?.data?.map((row) => (
            <Row key={row?.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}