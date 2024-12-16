/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */

import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Icon, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Expcss.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkExperienceDetails,
  fetchRoleDetails,
  fetchWorkExperienceDetails,
  id,
  nextMenu,
  patchWorkExperienceDetails,
  postWorkExperienceDetails,
} from "../../reduxComp/slice";
import ErrorMessage from "../../interface/ErrorMessage";
import { current } from "@reduxjs/toolkit";

const errorstyle = ErrorMessage;

let feildObject = {
  id: null,
  nameOfOrganization: "",
  fromDate: "",
  endDate: "",
  role: "",
  esiNumber: "",
  totalYearsOfExperience: 0,
};
const errObj = {
  role: false,
};

const roleDropDown = [] as any;

const ExperienceComp = () => {
  const [formFields, setFormFields] = useState([feildObject] as any);
  const [messageSpaceStyle, setmessageSpaceStyle] = useState() as any;
  const [errorMessage, seterrorMessage] = useState("");
  const [error, setError] = useState([errObj] as any);
  const [disable, setDisable] = useState(false);
  const employeeId = useSelector(id);
  const dispatch = useDispatch<any>();
  const first = useRef();

  useEffect(() => {
    if (employeeId !== null && employeeId !== undefined) {
      dispatch(fetchRoleDetails()).then((res: any) => {
        if (res.payload !== undefined) {
          let details = res.payload;
          for (let i = 0; i < details.length; i++) {
            let obj = {
              text: details[i].role,
              value: details[i].role,
            };
            if (roleDropDown.length < details.length) {
              roleDropDown.push(obj);
            }
          }
        }
      });
      dispatch(fetchWorkExperienceDetails(employeeId)).then((res: any) => {
        if (res.payload !== undefined) {
          setFormFields(res.payload);
          let arr = res.payload.length === undefined ? 1 : res.payload.length;

          for (let i = 0; i < arr - 1; i++) {
            if (formFields[0].id !== null) {
              setDisable(true);
            }
            error.push(errObj);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [])


  let edit = () => {
    setDisable(false);
    dispatch(fetchWorkExperienceDetails(employeeId)).then((res: any) => {
      setDisable(false);
      if (res.payload !== undefined) {
        setFormFields(res.payload);
      }
      let arr = res.payload.length === undefined ? 1 : res.payload.length;
      for (let i = 0; i < arr; i++) {
        error.push(errObj);
      }
    });
  };

  const addFields = () => {
    setFormFields([...formFields, feildObject]);
    setError([...error, errObj]);
  };

  const removeFields = (i: any) => {
    if (confirm("Do you want to delete this Details  ")) {
      if (formFields[i].id !== null) {
        dispatch(
          deleteWorkExperienceDetails({
            empId: employeeId,
            orgId: formFields[i].id,
            userId: "tamils",
          })
        );
      }
      let removeFeild = [...formFields];
      removeFeild.splice(i, 1);
      setFormFields(removeFeild);
      let removeErrorObj = [...error];
      removeErrorObj.splice(i, 1);
      setError(removeErrorObj);
    }
  };

  let handleFormArrayChange = (
    event: any,
    index: any,
    { name, value }: any
  ) => {
    let feilds = [...formFields];
    let newFormValues = feilds[index];
    var val = { ...newFormValues, [name]: value };
    feilds.splice(index, 1, val);
    setFormFields(feilds);
    calExp(index);
    if (name === "role") {
      let errorInRole = [...error];
      errorInRole[index].role = false;
      setError(errorInRole);
    }
  };

  let checkRole = () => {
    let isErr = false;
    var err = [...error];
    for (let i = 0; i < formFields.length; i++) {
      if (formFields[i].role === "") {
        isErr = true;
        var errValue = error[i];
        errValue = {
          ...errValue,
          role: true,
        };
        err.splice(i, 1, errValue);
        setError(err);
      }
    }
    return isErr;
  };

  const isValid = () => {
    let isErr = checkRole();
    for (let i = 0; i < formFields.length; i++) {
      const fields = formFields[i];
      if (
        fields == null ||
        fields.nameOfOrganization == null ||
        fields.nameOfOrganization.trim().length < 3
      ) {
        return false;
      }
      if (
        fields.esiNumber.trim().length !== 17 &&
        fields.esiNumber.trim().length !== 0
      ) {
        return false;
      }
      if (isErr) {
        return false;
      }
      if (i === [...formFields].length - 1) {
        return true;
      }
    }
  };
  let timeOut = () => {
    seterrorMessage("");
    setmessageSpaceStyle({});
  };

  const formValidation = (e: any) => {
    window.scroll(0, 0);

    e.preventDefault();
    if (isValid()) {
      if (formFields[0].id === null) {
        dispatch(
          postWorkExperienceDetails({
            empId: employeeId,
            formFields: formFields,
            userId: "tamils",
          })
        ).then((res: any) => {
          if (res.type === "postWorkExperienceDetails/fulfilled") {
            setDisable(true);
            seterrorMessage(errorstyle.formSubmited);
            setmessageSpaceStyle(errorstyle.formStyleSuccess);
            setTimeout(timeOut, 4000);
          } else {
            seterrorMessage(
              errorstyle.formConnectionFailure + "...!   Try Again"
            );
            setmessageSpaceStyle(errorstyle.formStyleFailure);
            setTimeout(timeOut, 4000);
            window.scroll;
          }
        });
      } else {
        if (window.confirm("Do you want confirm changes")) {
          dispatch(
            patchWorkExperienceDetails({
              empId: employeeId,
              formFields: formFields,
            })
          ).then((res: any) => {
            if (res.type === "patchWorkExperienceDetails/fulfilled") {
              setDisable(true);
              seterrorMessage(errorstyle.formUpdated);
              setmessageSpaceStyle(errorstyle.formStyleSuccess);
              setTimeout(timeOut, 4000);
            } else {
              seterrorMessage(
                errorstyle.formConnectionFailure + "...!   Try Again"
              );
              setmessageSpaceStyle(errorstyle.formStyleFailure);
              setTimeout(timeOut, 4000);
            }
          });
        } else {
          seterrorMessage(errorstyle.formInputFailure);
          setmessageSpaceStyle(errorstyle.formStyleFailure);
          setTimeout(timeOut, 4000);
          return;
        }
      }
    }
  };

  let calExp = (i: number) => {
    let feilds = formFields[i];
    let fDate = new Date(feilds.fromDate);
    let eDate = new Date(feilds.endDate);
    let ExpYear = eDate.getFullYear() - fDate.getFullYear();
    if (ExpYear < 0) {
      ExpYear = 0;
    }
    let Expmo =
      eDate.getMonth() > fDate.getMonth()
        ? eDate.getMonth() - fDate.getMonth()
        : fDate.getMonth() - eDate.getMonth();
    let totalYearsOfExperience = Number(ExpYear + "." + Expmo);
    try {
      formFields.totalYearsOfExperience = totalYearsOfExperience;
    } catch (err) { }
  };

  const moveNext = (e: any) => {
    e.preventDefault();
    dispatch(nextMenu("Nominee Details"));
  };

  const Prev = (e: any) => {
    e.preventDefault();
    dispatch(nextMenu("Documents Upload"));
  };

  let wholeDate = new Date();
  let year = wholeDate.getFullYear();
  let month = wholeDate.getMonth();
  let date = wholeDate.getDate();
  let maxendDate =
    year +
    "-" +
    (month <= 9 ? 0 : "") +
    (month + 1) +
    "-" +
    (date <= 9 ? 0 : "") +
    date;
  let maxfromDate =
    year +
    "-" +
    (month <= 9 ? 0 : "") +
    (month + 1) +
    "-" +
    (date <= 9 ? 0 : "") +
    date;

  return (
    <div className="experienceComponent">
      <Container style={{ width: "90%", marginTop: "-20px" }}>
        <div style={messageSpaceStyle} id="forError">
          {errorMessage === "" ? "" : errorMessage}
        </div>
        <Segment>
          <div style={{ marginBottom: "2%", padding: "0px" }}>
            <h2
              className="ui header"
              style={{ color: "#2d7cfa", bottom: "-40px" }}
            >
              <div className="content">
                Work Experience Detials
                <div className="sub header">
                  Start with your most recent job and work backward
                </div>
              </div>
            </h2>
          </div>
          <Form onSubmit={formValidation}>
            {formFields.map((form: any, i: any) => {
              return (
                <div key={i}>
                  <div className="experienceForm" id={"first"}>
                    <h3 style={{ margin: "0% 5.4%%", width: "70%" }}>
                      {i + 1}. Organization Detials
                    </h3>
                    <Form.Group id="orgaz">
                      <Form.Input
                        focus={true}
                        label="Name Of Organization"
                        name="nameOfOrganization"
                        value={formFields[i].nameOfOrganization || ""}
                        placeholder="Name Of Organization"
                        type="text"
                        disabled={disable}
                        max="date"
                        error={
                          formFields[i].nameOfOrganization.trim().length < 3 &&
                            formFields[i].nameOfOrganization.trim().length !== 0
                            ? {
                              content:
                                "Name Should Not be Empty or less then 3 letters",
                            }
                            : false
                        }
                        width={16}
                        required
                        onChange={(event: any, value: any) => {
                          handleFormArrayChange(event, i, value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        label="From Date"
                        disabled={disable}
                        name="fromDate"
                        max={formFields[i].endDate || maxfromDate}
                        value={formFields[i].fromDate || ""}
                        type="date"
                        onChange={(event: any, value: any) => {
                          handleFormArrayChange(event, i, value);
                        }}
                        width={8}
                        required
                      />
                      <Form.Input
                        label="End Date"
                        disabled={disable}
                        name="endDate"
                        min={formFields[i].fromDate}
                        max={maxendDate}
                        value={formFields[i].endDate || ""}
                        type="Date"
                        onChange={(event: any, value: any) => {
                          handleFormArrayChange(event, i, value);
                        }}
                        width={8}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Dropdown
                        fluid
                        clearable
                        selection
                        floating
                        scrolling
                        search
                        name="role"
                        disabled={disable}
                        value={formFields[i].role || ""}
                        width={8}
                        id={"role" + i}
                        error={
                          error[i].role
                            ? {
                              content: "Select Role of this organization",
                            }
                            : false
                        }
                        label="Role/Designation"
                        placeholder="Role of Your Work"
                        options={roleDropDown}
                        onChange={(event: any, value: any) =>
                          handleFormArrayChange(event, i, value)
                        }
                        required
                      />
                      <Form.Input
                        label="ESI Number"
                        name="esiNumber"
                        type="number"
                        disabled={disable}
                        value={formFields[i].esiNumber || ""}
                        placeholder="Enter Your ESI Number"
                        // min={}
                        onChange={(event: any, value: any) => {
                          handleFormArrayChange(event, i, value);
                        }}
                        width={8}
                        focus
                        error={
                          formFields[i].esiNumber.trim().length !== 17 &&
                            formFields[i].esiNumber.trim().length !== 0
                            ? {
                              content: "ESI number Should be 17 Characters",
                            }
                            : false
                        }
                      />
                    </Form.Group>
                    <button
                      disabled={disable}
                      style={{
                        display: formFields.length === 1 ? "none" : "block",
                      }}
                      type="button"
                      id="removeBtn"
                      onClick={() => removeFields(i)}
                    >
                      <Icon className="delete" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              id="addBtn"
              disabled={disable}
              onClick={addFields}
            >
              <i className="plus icon"></i> Add More detials
            </button>

            <div className="btns">
              <Button
                type="button"
                className="inbtn btn1"
                color="vk"
                onClick={Prev}
              >
                Back
              </Button>
              <Button
                type="button"
                className="inbtn btn1"
                color="vk"
                disabled={!disable}
                onClick={edit}
              >
                Edit
              </Button>
              <Button
                className="inbtn btn2"
                disabled={disable}
                type="submit"
                color="vk"
              >
                {formFields[0].id === null ? "Sumbit" : "Save"}
              </Button>
              <Button
                className="inbtn btn3"
                type="button"
                color="vk"
                onClick={moveNext}
              >
                Next
              </Button>
            </div>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};
export default ExperienceComp;
