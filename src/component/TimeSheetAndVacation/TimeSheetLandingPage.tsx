import React, { useEffect, useState } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
import TimeSheetComp from "./TimeSheetComp";
import VacationTimeSheet from "./VacationTimeSheet";
import "./TimeSheet.css";
import "./LandingCss.css";

import FileUpload from "./FileUpload";

const TimeSheetLandingPage = () => {
  const [applyVisible, setApplyVisible] = useState(true);
  const [leaveVisible, setLeaveVisible] = useState(false);
  const [fileVisible, setFileVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("TimeSheet");
  const [leaveDate, setLeaveDate] = useState() as any;

  const menuEnable = (e: any, { name }: any) => {

    console.log(name);
    var selected = name;
    switch (selected) {
      case "TimeSheet":
        setActiveItem(selected)
        setLeaveVisible(false);
        setApplyVisible(true);
        setFileVisible(false);
        break;
      case "Leave/PTO":
        setActiveItem(selected)
        setLeaveVisible(true);
        setApplyVisible(false);
        setFileVisible(false);
        break;
      case "File Upload":
        setActiveItem(selected)
        setLeaveVisible(false);
        setApplyVisible(false);
        setFileVisible(true);
        break;
      default:
        break;
    }
  };

  const hideMenu = () => {
    var navLinks = document.getElementById("navLinks") as HTMLElement;
    navLinks.style.left = "-220px";
  };
  const showMenu = () => {
    var navLinks = document.getElementById("navLinks") as HTMLElement;
    navLinks.style.left = "-20px";
  };

  const leave = (date:any) => {
    setActiveItem("Leave/PTO");
    setLeaveVisible(true);
    setApplyVisible(false);
    setFileVisible(false);
    setLeaveDate(date)

  };

  return (
    <div id="timeSheetBg">
      <Grid stackable={true|| undefined}>
        <Grid.Column reversed stackable="true" width={3} id="rmPad">
          <nav>
            <i className="fa fa-light fa-bars" onClick={showMenu}></i>
          </nav>
          <nav>
            <div className="nav-links" id="navLinks">
              <i className="fa fa-circle-xmark" onClick={hideMenu}></i>
              <ul>
                <li>
                  <Menu.Item
                    className={
                      activeItem === "TimeSheet"
                        ? "timeSheetPgActive"
                        : "timeSheetPg"
                    }
                    name="TimeSheet"
                    active={activeItem === "TimeSheet"}
                    onClick={menuEnable}
                  />
                </li>
                <li>
                  <Menu.Item
                    className={
                      activeItem === "Leave/PTO" ? "pastPgActive" : "pastPg"
                    }
                    name="Leave/PTO"
                    active={activeItem === "Leave/PTO"}
                    onClick={menuEnable}
                  />
                </li>
                <li>
                  <Menu.Item
                    className={
                      activeItem === "File Upload" ? "pastPgActive" : "pastPg"
                    }
                    name="File Upload"
                    active={activeItem === "File Upload"}
                    onClick={menuEnable}
                  />
                </li>
              </ul>
            </div>
          </nav>
        </Grid.Column>
        <Grid.Column width={10}>
          {applyVisible && <TimeSheetComp handleLeave={leave} />}
          <div id="middleTen">{leaveVisible && <VacationTimeSheet leaveDate={leaveDate} />}</div>
          {fileVisible && (
            <FileUpload />
          )}
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid>
    </div>
  );
};

export default TimeSheetLandingPage;
