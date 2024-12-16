import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Segment } from 'semantic-ui-react';

let val=[] as any;
const pastLeaveBriefDataMod =[
  { year:"2023",
    yearDetails:[ 
    { month:"january",
      monthDetails :[
        {
        vacationDays :  "12.20.2023-17.02.2023",
        leaveType :"sick/personal leave",
        days : 0.5,
        status: "approved",
        approverName: "Lead name",
        leaveId :"170237",
        approvedDate : "17.02.2023"

      },
      {
        vacationDays :  "12.20.2023-17.02.2023",
        leaveType :"Educational leave",
        days : 0.5,
        status: "canceled",
        approverName: "Lead name",
        leaveId :"170237",
        approvedDate : "17.02.2023"
        
      }]
    },
    { month:"february",
    monthDetails :[
      {
      vacationDays :  "12.20.2023-17.02.2023",
      leaveType :"sick/personal leave",
      days : 0.5,
      status: "approved",
      approverName: "Lead name",
      leaveId :"170237",
      approvedDate : "17.02.2023"

    }]
  },]},
  {year:"2024",
  yearDetails:[
   { month:"january",
   monthDetails:[
    {
      vacationDays :  "12.20.2023-17.02.2023",
      leaveType :"sick/personal leave",
      days : 0.5,
      status: "approved",
      approverName: "Lead name",
      leaveId :"170237",
      approvedDate : "17.02.2023"
    }
   ]
  }
  ]
  }
]

const getBooleanValues =
  [
   {year : false} ,
   {year : false}
  ]

  const  getMonthBooleanValues =
  [{
month1:[
    {
      january:false,
    },
    {
      February:false,
    },
    {
      March:false,
    },
    {
      April:false,
    },
    {
      May:false,
    },
    {
      June:false,
    },
    {
      July:false,
    },{
      August:false,
    },{
      September:false,
    }
    ,{
      October:false,
    },{
      November:false,
    },{
      December:false,
    }
  ]
  },
 { month1:[
    {
      january:false,
    },
    {
      February:false,
    },
    {
      March:false,
    },
    {
      April:false,
    },
    {
      May:false,
    },
    {
      June:false,
    },
    {
      July:false,
    },{
      August:false,
    },{
      September:false,
    }
    ,{
      October:false,
    },{
      November:false,
    },{
      December:false,
    }
  ]
  }
  ]
    
  const modelObj = {year: false,
    month:false,
  day:false}

  
 
  


const PastLeaveRequest = (props:any) => {
    const [open, setOpen] = useState(false);
    const [openYear ,setOpenYear] =useState(false);
    const [openMonth,setOpenMonth] = useState(false);
    const [datas,setDatas] =useState(pastLeaveBriefDataMod) as any;
    const [arrayOfAnswser, setArrayOfAnswser] = useState([] ) as any;
    
    // const [openParticularMonth,setOpenParticularMonth] = useState(specificOpenMonth);

//     useEffect(() => {
    
    
//   //     for(let i=0 ; i<pastLeaveBriefDataMod.length;i++){
//   //      val.push(pastLeaveBriefDataMod[i]);
//   //     val[i].year = false;
//   //     for(let j=0;j<val[i].yearDetails.length;j++){
//   //       val[i].yearDetails[j].month =false;
//   //     } 
//   // }
 
//   for(let i=0 ; i<pastLeaveBriefDataMod.length;i++){
//     val.push(pastLeaveBriefDataMod[i]);
//    val[i].year = false;
//    for(let j=0;j<val[i].yearDetails.length;j++){
//      val[i].yearDetails[j].month =false;
//    } 
//   }
//   setArrayOfAnswser(val);
//   console.log(arrayOfAnswser);
  
 
// },[])


    const pastLeaveData = [
      {leaveType :"Sick/personal leave",
            days : 0.5},
            {leaveType :"Educational leave",
            days : 0.5},
            {leaveType :"Festival leave",
            days : 0.5},
            {leaveType :"Sick/personal leave",
            days : 0.5}
    ]

    const pastLeaveBriefData =[
      {
        month:"January",
        year:"2023",
        vacationDays :  "12.20.2023-17.02.2023",
        leaveType :"sick/personal leave",
        days : 0.5,
        status: "approved",
        approverName: "Lead name",
        leaveId :"170237",
        approvedDate : "17.02.2023"

      },
      { month:"January",
        year:"2023",
        vacationDays :  "12.20.2023-17.02.2023",
        leaveType :"Educational leave",
        days : 0.5,
        status: "canceled",
        approverName: "Lead name",
        leaveId :"170237",
        approvedDate : "17.02.2023"
        
      },
      { month:"February",
        year:"2023",
        vacationDays :  "12.20.2023-17.02.2023",
        leaveType :"Festival leave",
        days : 0.5,
        status: "approved",
        approverName: "Lead name",
        leaveId :"170237",
        approvedDate : "17.02.2023"
      },
      { month:"February",
        year:"2024",
        vacationDays :  "12.20.2023-17.02.2023",
        leaveType :"Sick/personal leave",
        days : 0.5,
        status: "approved",
        approverName: "Lead name",
        leaveId :"170237",
        approvedDate : "17.02.2023"
      },
    ]
   
    
    const doToggle = (value:any,index:any) =>{
          console.log(index);
          getBooleanValues[index].year=!getBooleanValues[index].year;
    } 
    const doMonthToggle =(value:any,index:number) =>{
      console.log(index);
      
      
    }

    return (
      <TableContainer component={Paper} style={props.pastReqStyle} >
        <Table aria-label="collapsible table"  sx={{
      [`& .${tableCellClasses.root}`]: {
        borderBottom: "none"
      }
        }}>
          <TableBody>
          <TableRow>
            <TableCell >
              {/* <span><b>Past Requests : </b>{pastLeaveData.length+` past Requests`}</span> */}
              <Table>
                    <TableBody>
                       <TableRow>
                          <TableCell align="left">Leave Type</TableCell>
                          <TableCell align="left">Days</TableCell>
                        </TableRow>

                      {pastLeaveData.map((value: any,index:any) => (
                        <TableRow key={index}>
                          <TableCell align="left">{value.leaveType}</TableCell>
                          <TableCell align="left">{value.days}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
            </TableCell>
            <TableCell>
            <Button
            aria-label="expand row"
                size="small"
              variant="contained" 
              style={{margin:"-20em 0px  0px 0" }}

                onClick={() => setOpen(!open)}
                endIcon={open?<KeyboardArrowUp />:<KeyboardArrowDown />}
          >
              {open ?"Collapse All":"expand All"  }
            </Button></TableCell>
            </TableRow>
            </TableBody>
            <TableBody>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
                <Box sx={{ margin: 1 }}>
                  <Table>
                      {pastLeaveBriefDataMod.map((value: any,index:number) => (
                         <TableBody key={index}>
                         <Collapse in={open} timeout="auto" unmountOnExit>

                         <Button
                           aria-label="expand row"
                           size="small"
                           variant="contained" 
                          style={{margin:"0px 5px  3px 0" }}
                          onClick={() => {
                        setOpenYear(!openYear);
                         doToggle(value,index);
                        }}
                         endIcon={open?<KeyboardArrowUp />:<KeyboardArrowDown />}  >
                          {getBooleanValues[index].year ?`${value.year}`:`${value.year}`}
                          
                          </Button>
                        {getBooleanValues[index].year && value.yearDetails.map((yearVal :any,index:number)=>(
                             <TableRow key={index}>
                             <Button
                              aria-label="expand row"
                              size="small"
                              style={{margin:"0px 5px  3px 0" }}
                              variant="contained" 
                            >
                              {openMonth ? `${yearVal.month}`: `${yearVal.month}`}
                            </Button>
                            <Collapse in={true} timeout="auto" unmountOnExit>
                              {true && yearVal.monthDetails.map((monthVal:any,i:any)=>(
                                <Segment key={i}>
                                  <TableRow key={i}>
                                  <TableCell align="left">{monthVal.vacationDays}</TableCell>
                                  <TableCell align="left">{monthVal.leaveType}</TableCell>
                                  <TableCell align="left">{monthVal.days}</TableCell>
                                  <TableCell align="left">{monthVal.status}</TableCell>
                                  <TableCell align="left">
                                    {monthVal.status === "approved" ? (
                                      <IconButton><CheckCircle /></IconButton>
                                    ) : (
                                      <IconButton><CancelIcon /></IconButton>
                                    )}
                                  </TableCell>
                                </TableRow><TableRow key={i}>
                                    <TableCell align="left">Approver : </TableCell>
                                    <TableCell align="left">{monthVal.approverName}</TableCell>
                                    <TableCell align="left">Leave Id :</TableCell>
                                    <TableCell align="left">{monthVal.leaveId}</TableCell>
                                    <TableCell align="left">Date :</TableCell>
                                    <TableCell align="left">{monthVal.approvedDate}</TableCell>
                                  </TableRow></Segment>
                              ))}
                              </Collapse></ TableRow>
                          )) }
                        </Collapse><>
                            </></TableBody>
                      ))}
                       
                  </Table>
                </Box>
              {/* </Collapse> */}
            </TableCell>
            </TableRow>
            </TableBody>
        </Table>
      </TableContainer>
    );
}

export default PastLeaveRequest