import { Collapse } from "@material-ui/core";
import { getWeek, isSameDay } from "date-fns";
import React, { useEffect, useState } from "react";
import { Grid, Segment } from "semantic-ui-react";
import ButtonComp from "../../reusable_component/ButtonComp";
import DaySheet from "./DaySheet";
import PastTimeSheet from "./PastTimeSheet";
import TimeSheet from "./TimeSheet";
import "./TimeSheet.css";
import ToggleButton from "./ToggleButton";
import dayjs from "dayjs";
import { format } from "date-fns";
import axios from "axios";
import { setFips } from "crypto";

// const Loading = () => {
//   return (
//     <div className="loading">
//       <div></div>
//       <div></div>
//     </div>
//   );
// };

//week details object
let perDaySheetArr = {
  id: "",
  date: "",
  noOfHoursPerDay: 8,
  onLeave: "",
  year: 0,
  weekNo: getWeek(new Date()),
  projectName: "",
};

let arr = [] as any;
for (let i = 0; i <= 6; i++) {
  if (i === 0) {
    arr.push({ ...perDaySheetArr, noOfHoursPerDay: 0, onLeave: "H" });
  } else {
    arr.push(perDaySheetArr);
  }
}

let holidaysArr = [
  "2023-01-26",
  "2023-03-07",
  "2023-03-22",
  "2023-04-14",
  "2023-05-01",
  "2023-06-02",
  "2023-06-29",
  "2023-08-15",
  "2023-09-19",
  "2023-10-02",
  "2023-10-24",
  "2023-11-01",
  "2023-11-14",
  "2023-12-25",
];

const project = [
  { value: "Project One", text: "Project-One" },
  { value: "Project Two", text: "Project-Two" },
];

let obj = {
  empId: "",
  approverId: "approverID",
  status: "",
  weekDetails: [] as any,
};

let hours = [0, 8, 8, 8, 8, 8, 0];

const TimeSheetComp = (props: any) => {
  const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()));
  const [timeSheet, setTimeSheet] = useState(obj);
  const [dayArr, setdayArr] = useState(arr);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workingHoursArr, setWorkingHoursArr] = useState(hours);
  const [index, setindex] = useState(new Date().getDay());
  const [days, setday] = useState("MONDAY");
  const [isHoliday, setisHoliday] = useState() as any;
  const [totalWeekHrs, settotalWeekHrs] = useState(40);
  const [isApproved, setIsApproved] = useState(false);
  const [isPending, setIsPending] = useState(false);
  let empId = "a3ef0883-79f7-45eb-9ef3-ec466cdbc2a2";

  useEffect(() => {
    console.log("render time Sheet");
    let val = dayjs(selectedDate).startOf("week").toDate();
    val = isSameDay(val, new Date())
      ? dayjs(val).startOf("week").toDate()
      : val;
      
      for (let i = 0; i <= 6; i++) {
      // console.log(val);
      setDayDetails("date", format(val, "yyyy-MM-dd"), i);
      setDayDetails("year", val.getFullYear(), i);
      if (holidaysArr.includes(format(val, "yyyy-MM-dd"))) {
        setDayDetails("noOfHoursPerDay", 0, i);
        setDayDetails("onLeave", "AH", i);
        setHours(0, i);
      } else if (val.getDay() === 0) {
        setHours(0, i);
        setDayDetails("noOfHoursPerDay", 0, i);
        setDayDetails("onLeave", "H", i);
      } else {
        setHours(8, i);
        setDayDetails("onLeave", "P", i);
      }
      val = dayjs(val).add(1, "d").toDate();
    }
  }, [selectedDate, currentWeek]);
  // console.log(timeSheet);
  // console.log(dayArr);

  //function for date that user selected in displayed time sheet
  const handleSelectedDate = (e: any, i: any, dates: any) => {
    setindex(i);
    if (i === 6) {
      let val = workingHoursArr[i] === 0 ? 8 : 0;
      setHours(val, i);
      setDayDetails("noOfHoursPerDay", val, i);
    }
    //checks that date is a holiday or sunday and highlight the holidays in time sheet
    let holiday = holidaysArr.includes(dates);
    let day = new Date(dates).getDay();
    holiday
      ? (day = new Date(dates).getDay())
      : (day = new Date(dates).getDay());
    switch (day) {
      case 0:
        setday("SUNDAY");
        setisHoliday(true);
        break;
      case 6:
        setday("SATURDAY");
        setisHoliday(holiday);
        break;
      case 1:
        setday("MONDAY");
        setisHoliday(holiday);
        break;
      case 2:
        setisHoliday(holiday);
        setday("TUESDAY");
        break;
      case 3:
        setisHoliday(holiday);
        setday("WEDNESDAY");
        break;
      case 4:
        setisHoliday(holiday);
        setday("THURSDAY");
        break;
      case 5:
        setisHoliday(holiday);
        setday("FRIDAY");
        break;

      default:
        break;
    }
  };

  // function that used for set the details in main json for save
  const setDayDetails = (key: string, value: any, i: any) => {
    let obj = dayArr[i];
    obj = { ...obj, [key]: value };
    dayArr.splice(i, 1, obj);
    setdayArr(dayArr);
  };

  // function that apply the leave for seleccted date
  const handleleave = (i: any) => {
    props.handleLeave(dayArr[i].date);
  };

  // function for handling the week changes in calender as well the week changing arrow
  const handleWeekChange = async (value: any, date: any) => {
    let selectDates = dayjs(date).startOf("week").toDate();
    setCurrentWeek(value);
    setSelectedDate(selectDates);
    // setDayDet);
    settotalWeekHrs(40);
    arr.forEach((element:any )=> {
      element.weekNo=value
    });
    console.log(arr);
    
    setdayArr(arr);
    setIsApproved(false);
    setIsPending(false);
    let data = axios.get(
      `http://localhost:8081/empdetailsms/employees/${empId}/attendance-entry/${value}/${date.getFullYear()}`
    );
    let prevWeekData = (await data).data || (timeSheet as any);

    if (
      prevWeekData !== undefined &&
      (prevWeekData.status === "pending" || prevWeekData.status === "approved")
    ) {
      setTimeSheet(prevWeekData);
      let val = prevWeekData.weekDetails;
      let hr = [...hours];
      for (let i = 0; i < 7; i++) {
        hr.splice(i, 1, val[i].noOfHoursPerDay);
        setWorkingHoursArr(hr);
      }
      settotalWeekHrs(hr.reduce((p, c) => p + c));
      setIsApproved(prevWeekData.status === "approved");
      setIsPending(prevWeekData.status === "pending");
    }
  };

  // function for the  setting hours in time sheet
  const setHours = (value: any, i: any) => {
    let workHours = [...workingHoursArr];
    workHours.splice(i, 1, value);
    workingHoursArr.splice(i, 1, value);
    setWorkingHoursArr(workingHoursArr);
    settotalWeekHrs(workHours.reduce((prev, curr) => prev + curr));
  };

  // function that handles the hour of working per day
  const [first, setfirst] = useState(true)
  const handleHours = () => {
    console.log("callled");
    
    if (first) {
      setfirst(!first)
      setHours(4,index);
      setDayDetails("noOfHoursPerDay", 4, index );
    } else {
      setfirst(!first)
      setHours(8,index);
      setDayDetails("noOfHoursPerDay", 8, index );
    }
  };

  // console.log(isPending, isApproved);
  const submitForApprovall = () => {
    
    let weekDetais = [...dayArr];
    timeSheet.weekDetails = weekDetais;
    timeSheet.status = "pending";
    // axios
    //   .post(
    //     `http://localhost:8081/empdetailsms/employees/${empId}/attendance-entry/`,
    //     timeSheet,
    //     {
    //       headers: {
      //         userId: "tamil",
      //       },
    //     }
    //   )
    //   .then((res) => {
      //     console.log(res.status);
      //     if (res.status === 201) {
        //       setIsPending(true);
    //     }
    //   });

        console.log(timeSheet);
    console.log(dayArr);
  };

  const setApplyToggelFunc = (e: any) => {
    if (e.target.checked === true) {
      setVisible(!visible);
    }
  };

  const setPastToggelFunc = (e: any) => {
    if (e.target.checked === true) {
      setVisible(!visible);
    }
  };

  const handleProject = (e: any, { value }:any) => {
    // console.log(value);

    for (let i = index; i < 7; i++) {
      console.log(i,value);
      
      let obj = dayArr[i];
      if (obj.projectName=="") {
        obj = { ...obj, projectName: value };
        
      }
      // setDayDetails("projectName", value, i)
      dayArr.splice(i, 1, obj);
      
    }
    setdayArr(dayArr);
    
  }
console.log(dayArr);
console.log(dayArr[index].projectName);

  return (
    <div>
      <Segment className="timeSheetBg">
        <>
          <div
            className="sixteen wide column"
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <ToggleButton
              apply="Current Time Sheet"
              past="Past Time Sheet"
              applyOnChng={setApplyToggelFunc}
              pastOnChng={setPastToggelFunc}
              applyChecked={!visible}
              pastChecked={visible}
            />
          </div>
          {!visible && (
            <Grid className="timeSheetBg" style={{ marginTop: "2%" }} centered>
              <div
                style={{ borderRadius: "10px" }}
                className="sixteen wide column "
              >
                <TimeSheet
                  valArr={workingHoursArr}
                  handleWeekChange={handleWeekChange}
                  getdate={handleSelectedDate}
                  holidaysArr={holidaysArr}
                />
              </div>
              <div
                className="sixteen wide column"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Collapse in={!isHoliday} timeout="auto" unmountOnExit>
                  <ButtonComp
                    style={
                      isPending || isApproved
                        ? {
                            cursor: "not-allowed",
                            color: "#d7d7d7",
                            backgroundColour: "#c39c9c",
                            minWidth: "15rem",
                            height: "4em",
                            fontSize: "10px",
                          }
                        : { minWidth: "15rem", fontSize: "10px", height: "4em" }
                    }
                    disabled={isPending || isApproved}
                    onClick={(e: any) =>handleleave(index)}
                    buttonName={"  Apply For Leave"}
                  />
                </Collapse>
              </div>
              <div className="sixteen wide column">
                <DaySheet
                  index={index}
                  hours={workingHoursArr[index]}
                  day={days}
                  // handleLeave={handleLeave}
                  handleHours={handleHours}
                  project={project}
                  handleProject={handleProject}
                  projects={dayArr[index].projectName}
                  isHoliday={isHoliday}
                  onLeave={dayArr[index].onLeave}
                />
              </div>
              <div
                className="twelve wide column"
                style={{
                  display: "flex",
                  color: "white",
                  textAlign: "left",
                }}
              >
                TOTAL PROJECT HOURS : {totalWeekHrs}
              </div>
              <div
                className="four wide column"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              ></div>
              <div
                className="sixteen wide column"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonComp
                  style={
                    isPending || isApproved
                      ? {
                          cursor: "not-allowed",
                          color: "#d7d7d7",
                          backgroundColour: "#c39c9c",
                          minWidth: "15rem",
                          fontSize: "10px",
                          height: "4em",
                        }
                      : { minWidth: "15rem", fontSize: "10px", height: "4em" }
                  }
                  disabled={isPending || isApproved}
                  buttonName={
                    isApproved
                      ? "APPROVED"
                      : isPending
                      ? "PENDING APPROVAL"
                      : "SUBMIT FOR APPROVAL"
                  }
                  onClick={submitForApprovall}
                  variant="contained"
                ></ButtonComp>
              </div>
            </Grid>
          )}

          {visible && (
            <Segment className="timeSheetBg">
              <Grid centered>
                <div className="sixteen wide column">
                  <PastTimeSheet />
                </div>
              </Grid>
            </Segment>
          )}
        </>
      </Segment>
    </div>
  );
};

export default TimeSheetComp;
