/* eslint-disable no-loop-func */
import { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  subWeeks,
  addWeeks,
} from "date-fns";
import "./TimeSheet.css";
import WeekPicker from "./WeekPicker";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { IconButton } from "@material-ui/core";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import dayjs from "dayjs";
import { Segment } from "semantic-ui-react";

const Loading = () => {
    
  return(<div className="body"><div className="loading">
    <div></div>
    <div></div>
  </div></div >)
}

let arr = [false, false, false, false, false, false];

const TimeSheet = (props: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Date());
  const val = props.valArr;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleWeekChange = (value: any) => {
    console.log("calledx");
    
    // setCurrentWeek(getWeek(new Date(value)));
    props.handleWeekChange(getWeek(new Date(value)), value);
    setTimeout(() => {
      setLoading(false);      
      setCurrentMonth(new Date(value));
      // setCurrentMonth(subWeeks(currentMonth, 1));
    }, 1000);
    setLoading(true);  

    setOpen(!open);
  };

  const handleDaysSelection = (e: any, i: any, date: any) => {
    props.getdate(e, i, date);
    let isVacations = [...arr];
    isVacations.splice(i, 1, true);
    setSelectedDate(new Date(date));
  };

  const changeWeekHandle = (btnType: any) => {
    if (btnType === "prev") {

      let week = getWeek(subWeeks(currentMonth, 1));
      // if (week > 1 || week === 1) {
        props.handleWeekChange(week, subWeeks(currentMonth, 1));
        setTimeout(() => {
            setLoading(false);      
          setCurrentMonth(subWeeks(currentMonth, 1));
        }, 1000);
        setLoading(true);  
      // }
    }
    if (btnType === "next") {
      let week = getWeek(addWeeks(currentMonth, 1));
      if (week <= getWeek(new Date()) + 4) {
        props.handleWeekChange(week, addWeeks(currentMonth, 1));
        setTimeout(() => {
          setLoading(false);      

          setCurrentMonth(addWeeks(currentMonth, 1));
        }, 1000);
        setLoading(true);  
      }
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div
        className="header row timeSheetBgs flex-middle"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <IconButton
          className="tooltip"
          style={{ marginTop: "0%", color: "white" }}
          aria-label="expand row"
          size="medium"
          onClick={() => changeWeekHandle("prev")}
        >
          <KeyboardArrowLeftIcon fontSize="small" />
          <span style={{ top: "30%", left: "80%" }} className="tooltiptext">
            Previous Week
          </span>
        </IconButton>
        <div className="col col-center timeSheetBgs">
          <span
            className="circular month "
            style={{ cursor: "default" }}
            onClick={() => setOpen(!open)}
          >
            {format(currentMonth, dateFormat)}
            <CalendarTodayRoundedIcon fontSize="small" />
            <IconButton
              className="tooltip"
              style={{ marginTop: "6%", color: "white" }}
              aria-label="expand row"
              size="medium"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              <span
                style={{
                  top: "30%",
                  left: "80%",
                }}
                className="tooltiptext"
              >
                Calender
              </span>
            </IconButton>
          </span>
        </div>
        <IconButton
          className="tooltip"
          style={{ marginTop: "0%", color: "white" }}
          aria-label="expand row"
          size="medium"
          onClick={() => changeWeekHandle("next")}
        >
          <KeyboardArrowRightIcon fontSize="small" />
          <span className="tooltiptext">Next Week</span>
        </IconButton>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    let day = startDate;
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`col col-center timeSheetBgs ${
            isSameDay(day, selectedDate) ? "selected " : ""
          }`}
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
      day = addDays(day, 1);
    }
    return (
      <div className={`days row timeSheetBgs `} id="dayrow">
        {days}
      </div>
    );
  };

  const renderHours = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        days.push(
          <div
            style={{ backgroundColor: "transparent" }}
            className="col col-center timeSheetBgs"
            key={i}
          >
            0
          </div>
        );
      } else {
        days.push(
          <div
            style={{ backgroundColor: "transparent" }}
            className="col col-center timeSheetBgs"
            key={i}
          >
            {val[i]}
          </div>
        );
      }
    }
    return (
      <div className="days row timeSheetBgs" id="dayrow">
        {days}
      </div>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
    const dateFormat = "d";
    const dateFormats = "yyyy-MM-dd";
    const rows = [];
    let days = [] as any;
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        let currentDate = format(day, dateFormats);
        days.push(
          <div
            style={{
              borderBottom: isSameDay(day, selectedDate)
                ? "3px solid  #ffffff"
                : "",
            }}
            className={`col cell 
             ${isSameDay(day, selectedDate) ? "selected " : "today"}
            ${
              props.holidaysArr.includes(format(day, "yyyy-MM-dd")) ||
              day.getDay() === 0
                ? "holiday"
                : ""
            } timeSheetBgs`}
            key={i}
            onClick={(e: any) => handleDaysSelection(e, i, currentDate)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div key={days}
          style={{ backgroundColor: "transparent" }}
          className="row timeSheetBgs bottom "
          id="dayrow"
        >
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body timeSheetBgs">{rows}</div>;
  };
  const handleSelectedDate = (v: any) => {
    setSelectedDates(v);
  };
  return (
    <Segment className="timeSheetBg">
      <div className="calendar">
        {renderHeader()}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <WeekPicker
            selectedDate={handleSelectedDate}
            setDate={selectedDates}
            holidaysArr={props.holidaysArr}
            selectedWeek={handleWeekChange}
          />
        </Collapse>
        { loading ? (<Loading/>):(<>
          {renderDays()}
          {renderCells()}
          {renderHours()}
        </>)}
      </div>
    </Segment>
  );
};

export default TimeSheet;
