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

  const handleToggle = (id, value) => {
    setChecked(value);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: open ? "none" : "1px solid #1e1d1d" } }}>
        <TableCell align="center" sx={{width: "50px",paddingLeft:"0px"}}>
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
                bgcolor: "rgba(229, 226, 226, 0.21)",
              },
            }}
          >
            <MdOutlineEdit size={19} />
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className="inner_content" sx={{color:"#fff", paddingBottom:"30px",paddingTop:"10px",paddingLeft:"70px"}}>
            <Box className="options" sx={{display:"flex",gap:"8px",marginBottom:"20px"}}>
                {row?.type===2 ? 
            row?.options?.map(option=>
            <Typography sx={{width:"fit-content",bgcolor:"rgba(229, 226, 226, 0.21)",borderRadius: "15px",paddingY:"2px",paddingX:"10px",color:"rgb(209, 206, 206)",fontSize:"12px"}}>
                {option}
            </Typography>
            )
            : 
            <Typography sx={{color:"var(--secondary-color)",fontSize:"13px"}}>No options defined.</Typography>
            }
            </Box>
            <Box className="footer" sx={{display:"flex",gap:"20px"}}>
                <Typography sx={{fontSize:"13px",color:"var(--secondary-color)"}}>Status:{" "}
                    {row?.isActive ? 
                    <Typography component={'span'} sx={{color:"#38d479",fontSize:"13px",textShadow: "0 0 6px #38d479"}}>Active</Typography>
                    :
                    <Typography component={'span'} sx={{fontSize:"13px"}}>Inactive</Typography>
                    }
                </Typography>
                <Box sx={{color: "var(--primary-color)",display: "flex",alignItems: "center",gap: "2px",cursor:"pointer",transition: "all 0.3s ease",borderBottom: "1px solid transparent",'&:hover': {borderBottom: "1px solid var(--primary-color)"}}}>
                  <MdOutlineEdit size={15} style={{ transform: "translateY(-1px)" }} />
                  <Typography sx={{ fontSize: "13px" ,textShadow: "0 0 6px var(--primary-color)"}}>Edit inline</Typography>
                </Box>
            </Box>
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