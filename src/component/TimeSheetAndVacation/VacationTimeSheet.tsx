import TextField from '@material-ui/core/TextField'
import { textAlign } from '@mui/system'
import React, { useState } from 'react'
import { Button, Container, Grid, Label, Segment } from 'semantic-ui-react'
import DateRangePicker from './DateRangePicker'
import PastLeaveRequest from './PastLeaveRequest'
import ToggleButton from './ToggleButton'
import "./TimeSheet.css";


const VacationTimeSheet = (props:any) => {
  const [visible, setVisible] = useState(false);

  const handleApplyForLeave=(e:any)=>{
    if (e.target.checked === true) {
      setVisible(!visible);
    }
  }
  const handlePastLevRequest=(e:any)=>{
    if (e.target.checked === true) {
      setVisible(!visible);
    }
  }
  
  return (
    <div>
          <Segment className="timeSheetBg">
                 
                  <Grid >
               <div
                className="sixteen wide column"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <ToggleButton apply="Apply For Leave" past="Past Requests" applyOnChng={handleApplyForLeave} pastOnChng={handlePastLevRequest}  applyChecked={!visible}
          pastChecked={visible}/>
              </div>
              {/* <div  className="two wide column">
              
              </div>
              <div className="eight wide column"
               style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              > */} 
           { !visible &&(
              <div
                className="sixteen wide column"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
 
                  
                   
                   <DateRangePicker style={{marginLeft:"25%"}  } leaveDate={props.leaveDate}/>
                  
                 
                  </div>)
                }
              
                
              
             
                {/* </div> */}
              
              {/* <ToggleButton apply="Apply For Leave" past="Past Requests"  applyOnChng={handleApplyForLeave} pastOnChng={handlePastLevRequest}/> */}
              <div
                className="sixteen wide column"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >   { visible &&
                (
                <PastLeaveRequest  pastReqStyle={{width:"100%"}}/>
               )
              }
              </div>
           
            
            
            </Grid>
        </Segment>
    </div>
  )
}

export default VacationTimeSheet;