import React, { useEffect, useState } from "react";
import { Dropdown, Grid, Segment } from "semantic-ui-react";
// import "./TimeSheetCheckBox.css";
import "./TimeSheet.css";
import {IconButton } from "@material-ui/core";
import MoreTimeIcon from '@mui/icons-material/MoreTime';


const DaySheet = (props: any) => {
  let { day, index, hours, isHoliday, onLeave, projects ,project} = props;
  let [h, seth] = useState(projects) as any;

  console.log(projects);
  
  useEffect(() => {
    console.log("re render dau shet");
  
    return seth(" ");
  }, []);

  return (
    <div className="col col-center">
      {onLeave && (
        <Segment className="timeSheetBg">
          <div className="col col-center"></div>

          <Grid centered>
            <div
              className="sixteen wide column"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <Dropdown
                  fluid
                  clearable
                  selection
                  floating
                  scrolling
                  search
                  name="half"
                  width={1}
                  text={ projects}
                  placeholder="Select Project"
                  onChange={(event: any, value: any) => {
                    if (!isHoliday) {
                      seth(value)
                      props.handleProject(event, value);
                    }
                  }}
                  options={project}
                />
              </div>
              <div style={{ color: "white" }}>{day}</div>
            </div>
          </Grid>

          <Grid centered>
            <div
              className="sixteen wide column"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

                width: "100%",
              }}
            >
              <div>
                <div style={{ fontSize: "15px", color: "white" }}>
                  PROJECT HOURS
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton
                  style={{ marginTop: "6%", color: "white" }}
                  aria-label="expand row"
                  size="medium"
                  onClick={() => {
                    if (!isHoliday) {
                      props.handleHours();
                    }
                  }}
                ><MoreTimeIcon/>
                  {/* {hours === 4 ? <AddIcon /> : <RemoveIcon />} */}
                </IconButton>
                <div
                  style={{
                    width: "40px",
                    fontSize: "15px",
                    color: "white",
                    textAlign: "center",
                    padding: "2px 5px 2px 5px",
                    background: "rgb(229, 229, 229)",
                    backgroundColor: "#ffffff12",
                  }}
                >
                  {!isHoliday ? hours : 0}
                </div>
                <span style={{ color: "white" }} className="label">
                  HOURS
                </span>
              </div>
            </div>
          </Grid>
        </Segment>)}
    </div>
  );
};

export default DaySheet;
