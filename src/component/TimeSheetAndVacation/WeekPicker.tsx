import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import "./WeekPicker.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { Segment } from "semantic-ui-react";

const WeekPicker = (props: any) => {

  const [value, setValue] = useState<Dayjs>(props.setDate||new Date());

  let wholeDate = new Date();
  let year = wholeDate.getFullYear();
  let month = wholeDate.getMonth() + 1;
  let date = wholeDate.getDate() + 28;
  if (Number(month) > 12) month = 1;
  if (Number(date) > dayjs().daysInMonth()) {
    date = Number(date) - dayjs().daysInMonth();
    month++;
  }
  let dates = date <= 9 ? `0${date}` : date;
  let months = month <= 9 ? `0${month}` : month;
  let maxendDate = year + "-" + months + "-" + dates;

  const onSelectDateRanges = (e: any) => {    
    setValue(dayjs(e.selection.startDate));
    // console.log(e.selection.startDate);
    
    props.selectedDate(e.selection.startDate)
    props.selectedWeek(e.selection.startDate)
  };
  let fromDate = new Date(dayjs(value).startOf("week").format())
  let toDate=new Date(dayjs(value).endOf("week").format())

  return (<Segment>
    <div
    style={{
      color:"white!important",
      width:"100%"
    }}
  >
      <DateRange
      calendarFocus="forwards"
        ranges={[
          {
            startDate:fromDate,
            endDate:toDate ,
            key: "selection",
          },
        ]}
        disabledDay={(date: Date) => date.getDay() === 0 || false}
        disabledDates={props.holidaysArr.map((d:any)=>new Date(d))}
        className="date"
        onChange={onSelectDateRanges}
        maxDate={dayjs(maxendDate).endOf("week").toDate()}
        showMonthAndYearPickers={true}
        moveRangeOnFirstSelection={false}
        minDate={new Date(new Date().getFullYear()-1,new Date().getMonth(),new Date().getDate())}
        showDateDisplay={false}
        scroll={{ enabled: false }}
        dragSelectionEnabled={true}
        
      />
    </div>
    </Segment>
  );
};

export default WeekPicker;
