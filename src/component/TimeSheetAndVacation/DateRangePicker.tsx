import React, { useEffect, useState } from "react";
import {
  TextField,
  Popover,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import moment from "moment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format, getWeek } from "date-fns";
import dayjs from "dayjs";
import { Segment } from "semantic-ui-react";
import PastLeaveRequest from "./PastLeaveRequest";
import ButtonComp from "../../reusable_component/ButtonComp";
import getYear from "date-fns/getYear";
import { start } from "repl";
import axios from "axios";
import fi from "date-fns/esm/locale/fi/index.js";

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

let currentDate = new Date();
let answer = 0;

let datas = {
  empId: "",
  approverId: "approverID",
  status: "pending",
  weekDetails: [] as any,
};

let valuesToBePosted = {
  id: "",
  weekNo: 0,
  date: "",
  year: "",
  noOfHoursPerDay: 0,
  onLeave: "A",
  projectName: "EMP-ON-BOARD",
};

const DateRangePicker = (props: any) => {
  let dateFormat = "DD/MM/YYYY";
  let dateFormatss = "yyyy-MM-dd";

  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("" );
  const [anchorEl, setAnchorEl] = useState(null);
  const [fromDate, setFromDate] = useState(new Date()||props.leaveDate);
  const [toDate, setToDate] = useState(new Date()||props.leaveDate);
  // const [values, setValues] = useState([] as any);
  const [countVacationDays, setCountVacationDays] = useState(0);
  // const [selectedDays, setSelectedDays] = useState([] as any);
  // const [totalVacationDays, setTotalVacationDays] = useState([] as any);
  // const [totalDaysCal, setTotalDaysCal] = useState([] as any);
  // const [showApplyLeaveComp, setShowApplyLeaveComp] = useState(true);
  const [showPastLeaveRequest, setShowPastLeaveRequest] = useState(false);
  let empId = "a3ef0883-79f7-45eb-9ef3-ec466cdbc2a2";

  const [first, setfirst] = useState(datas)

  const onAdornmentClick = (e: { currentTarget: any }) => {
    setDisplayCalendar(true);
    setAnchorEl(e.currentTarget);
  };


  useEffect(() => {

    if (props.leaveDate!=undefined) {
      console.log(props.leaveDate);
      
      let valuesToBePosted = {
        id: "",
        weekNo: getWeek(new Date(props.leaveDate)),
        date: format(new Date(props.leaveDate), "yyyy-MM-dd"),
        year: getYear(new Date(props.leaveDate)),
        noOfHoursPerDay: 0,
        onLeave: "A",
        projectName: "EMP-ON-BOARD",
      };
      let arr = [...first.weekDetails]
      arr.push(valuesToBePosted)
      setfirst({ ...first, weekDetails: arr })
      setInputValue( props.leaveDate + " - 1 Day" )
    } 
  }, [])
  
  const calculatePersonalLev = (startDate: any, endDate: any) => {
    answer = 0;
    let diff = dayjs(endDate).diff(startDate, "day");
    let date = startDate;
    setCountVacationDays(0);
    let valueOfIndex = 0;
    console.log(startDate,endDate);
    
    let arr = [...first.weekDetails]
    for (let i = 0; i < diff + 1; i++) {
      if (
        dayjs(date).day() !== 0 &&
        !holidaysArr.includes(format(date, "yyyy-MM-dd"))
      ) {
        // totalVacationDays[valueOfIndex++] = date;
        // setCountVacationDays(countVacationDays + 1);
        answer++;
        console.log(date);
        
        
        let valuesToBePosted = {
          id: "",
          weekNo: getWeek(date),
          date: format(date, "yyyy-MM-dd"),
          year: getYear(date),
          noOfHoursPerDay: 0,
          onLeave: "A",
          projectName: "EMP-ON-BOARD",
        };
        arr[valueOfIndex++]=valuesToBePosted
      }
      setfirst({...first,weekDetails:arr})
      // setTotalDaysCal(totalVacationDays);
      date = dayjs(date).add(1, "d").toDate();
    }
    // setTotalDaysCal([...totalVacationDays]);
  };

  const onPopoverClose = (e: any, reason: any) => {
    setDisplayCalendar(false);
    setAnchorEl(null);
    setFromDate(fromDate);
    setToDate(toDate);
  };

  const onSelectDateRanges = ({ selection }: any) => {
    let { startDate, endDate } = selection;
    // setSelectedDays([]);
    // setTotalVacationDays([]);
    setFromDate(startDate);
    setToDate(endDate);

    console.log(startDate);
    startDate = moment(startDate);

    startDate = startDate.isValid() ? startDate.toDate() : undefined;

    endDate = moment(endDate);
    endDate = endDate.isValid() ? endDate.toDate() : undefined;
    calculatePersonalLev(startDate, endDate);
    let inputValue = "";
    if (startDate) inputValue += moment(startDate).format(dateFormat);
    if (endDate) inputValue += " - " + moment(endDate).format(dateFormat);
    inputValue += `  ${answer}  Days`;
    setInputValue(inputValue);
    setFromDate(startDate);
    setToDate(endDate);
  };

  console.log(first);
  
  const sendDataToBackend = () => {

    // let output = {} as any;

    // for (let index = 0; index < totalDaysCal.length; index++) {
    //   const element = totalDaysCal[index];
    //   let valuesToBePosted = {
    //     id: "",
    //     weekNo: getWeek(element),
    //     date: format(element, "yyyy-MM-dd"),
    //     year: getYear(element),
    //     noOfHoursPerDay: 0,
    //     onLeave: "A",
    //     projectName: "EMP-ON-BOARD",
    //   };
    //   datas.weekDetails[index] = valuesToBePosted;
    // }
    // output = datas;
    axios
      .post(
        `http://localhost:8081/empdetailsms/employees/${empId}/attendance-entry/`,
        first,
        {
          headers: {
            userId: "tamil",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          console.log(res.status);
          console.log("posted");
        }
      });
    // setValues(output);
  };

  return (
    <div style={props.style} id="dateRangePicker">
      <Segment>
        <TextField
          label="PICK YOUR VACATION DAYS"
          fullWidth={true}
          value={inputValue}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onAdornmentClick}>
                  <DateRangeIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Popover
          open={displayCalendar}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={onPopoverClose}
        >
          <div>
            <DateRange
              ranges={[
                {
                  startDate: fromDate,
                  endDate: toDate,
                  key: "selection",
                },
              ]}
              disabledDay={(date: Date) =>
                date.getDay() === 0 ||
                holidaysArr.includes(format(date, dateFormatss)) ||
                false
              }
              className="date"
              onChange={onSelectDateRanges}
              minDate={currentDate}
              maxDate={dayjs().add(1, "M").endOf("month").toDate()}
              showMonthAndYearPickers={true}
              moveRangeOnFirstSelection={false}
              showDateDisplay={true}
            />
          </div>
        </Popover>
      </Segment>
      {showPastLeaveRequest && (
        <div
          className="sixteen wide column"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <PastLeaveRequest style={{ width: "50%" }} />
        </div>
      )}
      <div
        className="sixteen wide column"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      ></div>
      <div
        className="sixteen wide column"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <ButtonComp
          onClick={sendDataToBackend}
          buttonName="SUBMIT FOR APPROVAL"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
