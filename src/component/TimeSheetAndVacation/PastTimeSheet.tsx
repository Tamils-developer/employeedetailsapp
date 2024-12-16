import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button } from "@mui/material";
import axios from "axios";

const PastTimeSheet = (props: any) => {
  const [open, setOpen] = useState(false);
  let empId = "a3ef0883-79f7-45eb-9ef3-ec466cdbc2a2";
  const [pastTimeSheetDetails, setpastTimeSheetDetails] =useState([]) as any;

  useEffect(() => {


    let res=axios.get(
      `http://localhost:8081/empdetailsms/employees/${empId}/attendance-entry/past-request/`,
    ).then((res) => {
      console.log(res.data);
      setpastTimeSheetDetails(res.data)
    })
    console.log(res);
    
  }, [])
    
    function setIcon(str: any) { 
        switch(str){
            case "approved":
                return <CheckCircleIcon color="success" />
            case "rejected":
                return  <CancelIcon color="warning"/>
            case "pending":
                return < HourglassTopIcon color="primary"/>
        }      
    }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table"  sx={{
    [`& .${tableCellClasses.root}`]: {
      borderBottom: "none"
    }
  }}>
    <TableBody>
        <TableRow>
          <TableCell >
           <span><b>Past Requests : </b>{pastTimeSheetDetails.length +` past Requests`}</span>
            </TableCell>
            <TableCell >
          <Button
            aria-label="expand row"
                size="small"
                variant="contained" 
                onClick={() => setOpen(!open)}
                endIcon={open?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon />}
          >
            {open ?"collpase":"expand"}
              </Button>
              </TableCell >
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table>
                  <TableBody>
                    {pastTimeSheetDetails.map((value: any,i:any) => (
                      <TableRow key={i}>
                        <TableCell  align="left" >{value.startDate +" - "+value.endDate}</TableCell>
                        <TableCell align="left">{value.totalWeekHours} Hours</TableCell>
                        <TableCell align="left">{value.approverId}</TableCell>
                        <TableCell align="left">{value.status}</TableCell>
                        <TableCell align="left">
                            <IconButton>
                             {setIcon(value.status)}
                            </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PastTimeSheet;
