import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Container, Form, Label, Segment } from "semantic-ui-react";
import {
  fetchContactDetails,
  id,
  nextMenu,
  postContactDetails,
  putContactDetails,
} from "../../reduxComp/slice";
import ErrorMessage from "../../interface/ErrorMessage";

const errorstyle = ErrorMessage;

const familyDetails = {
  id: "",
  relation: "",
  name: "",
  dob: "",
  aadhar: "",
  mobile: "",

};

const data = {
  fatherName: false,
  fatherDob: false,
  fatherAadhar: false,
  fatherMobile: false,
  motherName: false,
  motherDob: false,
  motherAadhar: false,
  motherMobile: false,
  spouseName: false,
  spouseDob: false,
  spouseAadhar: false,
  spouseMobile: false,

};
// error styles

const inputValue = {
  employeeId: null,
  familydetails: [] as any,
};

// regx---------------------

const firstNamePattern = /^[a-zA-Z '.-]*$/;
const aadharRegx = /^[0-9]{0,12}$/;
const mobRegex = /[6-9]{1}[0-9]{9}/;

const ContactDetailsComponent = () => {
  const [details, setDetails] = useState(inputValue);
  const [errors, setErrors] = useState(data) as any;
  const [read, setRead] = useState(false);
  const [messageSpaceStyle, setMessageSpaceStyle] = useState() as any;
  const [errorMessage, setErrorMessage] = useState() as any;
  const [onCheck, setOnCheck] = useState(false);
  const [disable, setDisable] = useState(false);
  const [nextPage, setNextPage] = useState(true);
  const [backPage, setBackPage] = useState(true);
  const [spouseDetails, setSpouseDetails] = useState({
    ...familyDetails,
    relation: "spouse",
  });
  const [fatherDetails, setFatherDetails] = useState({
    ...familyDetails,
    relation: "father",
  });
  const [motherDetails, setMotherDetails] = useState({
    ...familyDetails,
    relation: "mother",
  });
  let selection = {};
  const employeeId = useSelector(id);
  const dispatch = useDispatch<any>();

  useEffect(() => {


    if (employeeId !== null && employeeId !== undefined) {
      dispatch(fetchContactDetails(employeeId)).then((res: any) => {
        if (res.payload !== undefined && res.type === "fetchContactDetails/fulfilled") {
          setDetails(res.payload);
          let dataValues = res.payload.familydetails;
          dataValues.map((val: any) => {
            if (val.relation === "mother") {
              setMotherDetails(val);
            }
            if (val.relation === "father") {
              setFatherDetails(val);
            }
            if (val.relation === "spouse") {
              setSpouseDetails(val);
            }
          });
          setNextPage(true);
          setBackPage(true);
        } else {
          setNextPage(false);
          setBackPage(true);
        }
      });
    }
    window.scrollTo(0, 0);
  }, []);

  const edit = (e: any) => {
    setDisable(!disable);
    e.preventDefault();
    dispatch(fetchContactDetails(employeeId)).then((res: any) => {
      setDisable(false);
      setDetails(res.payload);
      let dataValues = res.payload.familydetails;
      dataValues.map((val: any) => {
        if (val.relation === "mother") {
          setMotherDetails(val);
        }
        if (val.relation === "father") {
          setFatherDetails(val);
        }
        if (val.relation === "spouse") {
          setSpouseDetails(val);
        }
      });
    });
  };

  const spouseEventHandler = (event: any, { name, value }: any) => {
    setNextPage(false);
    setBackPage(false);
    setSpouseDetails({ ...spouseDetails, [name]: value });
    let obj = { ...details.familydetails[2], relation: "spouse" };
    obj = { ...obj, [name]: value };
    let arr = [...details.familydetails];
    arr.splice(2, 1, obj);
    setDetails({ ...details, familydetails: arr });
    let key = name;
    switch (key) {
      case "name":
        setErrors({ ...errors, spouseName: !firstNamePattern.test(value) });
        break;
      case "dob":
        if (String(event.target.value).length > 1) {
          setErrors({ ...errors, spouseDob: false });
        } else {
          setErrors({ ...errors, spouseDob: true });
        }
        break;
      case "aadhar":
        if (!aadharRegx.test(value) || value.length !== 12) {
          setErrors({ ...errors, spouseAadhar: true });
        } else {
          setErrors({ ...errors, spouseAadhar: false });
        }
        break;
      case "mobile":
        if (!mobRegex.test(value) || value.length !== 10) {
          setErrors({ ...errors, spouseMobile: true });
        } else {
          setErrors({ ...errors, spouseMobile: false });
        }
        break;
      default:
        break;
    }
  };

  const fatherchangeValue = (event: any, { name, value }: any) => {
    setBackPage(false);
    setNextPage(false);
    setFatherDetails({ ...fatherDetails, [name]: value });
    let obj = { ...details.familydetails[0], relation: "father" };
    obj = { ...obj, [name]: value };
    let arr = [...details.familydetails];
    arr.splice(0, 1, obj);
    setDetails({ ...details, familydetails: arr });
    let key = name;
    switch (key) {
      case "name":
        setErrors({ ...errors, fatherName: !firstNamePattern.test(value) });
        break;
      case "dob":
        if (String(event.target.value).length > 1) {
          setErrors({ ...errors, fatherDob: false });
        } else {
          setErrors({ ...errors, fatherDob: true });
        }
        break;
      case "aadhar":
        if (!aadharRegx.test(value) || value.length !== 12) {
          setErrors({ ...errors, fatherAadhar: true });
        } else {
          setErrors({ ...errors, fatherAadhar: false });
        }
        break;
      case "mobile":
        if (!mobRegex.test(value) || value.length !== 10) {
          setErrors({ ...errors, fatherMobile: true });
        } else {
          setErrors({ ...errors, fatherMobile: false });
        }
        break;
      default:
        break;
    }
  };

  const motherchangeValue = (event: any, { name, value }: any) => {
    setBackPage(false);
    setNextPage(false);
    setMotherDetails({ ...motherDetails, [name]: value });
    let obj = { ...details.familydetails[1], relation: "mother" };
    obj = { ...obj, [name]: value };
    let arr = [...details.familydetails];
    arr.splice(1, 1, obj);
    setDetails({ ...details, familydetails: arr });
    let key = name;
    switch (key) {
      case "name":
        setErrors({ ...errors, motherName: !firstNamePattern.test(value) });
        break;
      case "dob":
        if (String(event.target.value).length > 1) {
          setErrors({ ...errors, motherDob: false });
        } else {
          setErrors({ ...errors, motherDob: true });
        }
        break;
      case "aadhar":
        if (!aadharRegx.test(value) || value.length !== 12) {
          setErrors({ ...errors, motherAadhar: true });
        } else {
          setErrors({ ...errors, motherAadhar: false });
        }
        break;
      case "mobile":
        if (!mobRegex.test(value) || value.length !== 10) {
          setErrors({ ...errors, motherMobile: true });
        } else {
          setErrors({ ...errors, motherMobile: false });
        }
        break;
      default:
        break;
    }
  };

  const isValid = () => {
    for (let i = 0; i < details.familydetails.length; i++) {
      const element = details.familydetails[i];
      for (const key in element) {
        if (element[key] === "") {
          return false;
        }
      }
    }

    for (const key in errors) {
      if (errors[key] === true) {
        return false;
      }
    }
    return true;
  };

  let timeOut = () => {
    setErrorMessage("");
    setMessageSpaceStyle({});
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (details.familydetails.length > 2) {
      if (
        spouseDetails.name.length === 0 ||
        spouseDetails.dob.length === 0 ||
        spouseDetails.aadhar.length === 0 ||
        spouseDetails.mobile.length === 0
      ) {
        details.familydetails.pop();
      }
    }

    if (isValid()) {
      if (details.employeeId === null) {
        dispatch(
          postContactDetails({
            empId: employeeId,
            formFields: details,
          })
        ).then((res: any) => {
          if (res.type === "postContactDetails/fulfilled") {
            setDisable(true);
            setErrorMessage(errorstyle.formUpdated);
            setMessageSpaceStyle(errorstyle.formStyleSuccess);
            setNextPage(true);
            setTimeout(timeOut, 4000);
            window.scroll(0, 0);
          } else if (res.type === "postContactDetails/rejected") {
            setNextPage(false);
            setErrorMessage(
              errorstyle.formConnectionFailure + "...!   Try Again"
            );
            setMessageSpaceStyle(errorstyle.formStyleFailure);
            setTimeout(timeOut, 4000);
            window.scroll(0, 0);
          }
        });
      } else {
        dispatch(
          putContactDetails({
            empId: employeeId,
            formFields: details,
          })
        ).then((res: any) => {
          setDisable(true);
          if (res.type === "patchContactDetails/fulfilled") {
            setNextPage(true);
            setErrorMessage(errorstyle.formUpdated);
            setMessageSpaceStyle(errorstyle.formStyleSuccess);
            setTimeout(timeOut, 4000);
            window.scroll(0, 0);
          } else if (res.type === "patchContactDetails/rejected") {
            setErrorMessage(
              errorstyle.formConnectionFailure + "...!   Try Again"
            );
            setMessageSpaceStyle(errorstyle.formStyleFailure);
            setTimeout(timeOut, 4000);
          }
          window.scroll(0, 0);
        });
      }
    } else {
      setErrorMessage(errorstyle.formInputFailure + "...!");
      setMessageSpaceStyle(errorstyle.formStyleFailure);
      setTimeout(() => {
        setErrorMessage("");
        setMessageSpaceStyle({});
      }, 4000);
      window.scroll(0, 0);
    }
  };
  const moveNext = (e: any) => {
    e.preventDefault();
    // if (nextPage) {
      dispatch(nextMenu("Education Details"));
    // }

  };

  const moveBack = (e: any) => {
    e.preventDefault();
    if (backPage) {
      dispatch(nextMenu("Basic Details"));
    }

  };

  return (
    <div style={{ marginBottom: "5%" }}>
      <Container>
        <div style={messageSpaceStyle} id="forError">
          {errorMessage === "" ? "" : errorMessage}
        </div>
        <Segment>
          <div style={{ marginBottom: "2%", padding: "0px" }}>
            <h2 className="ui header" style={{ color: "#2d7cfa" }}>
              <div className="content">
                Contact Detials
                <div className="sub header">
                  Please Enter the given information below
                </div>
              </div>
            </h2>
          </div>

          <Form
            id="form emp"
            onSubmit={submit}
            onKeyPress={(e: any) => {
              e.key === "Enter" && e.preventDefault();
            }}
          >
            <Form.Group>
              <Form.Input
                required
                id={"name"}
                label="Father Name"
                placeholder="Enter Father Name"
                type="text"
                value={fatherDetails.name || ""}
                name="name"
                width={6}
                disabled={disable}
                onChange={fatherchangeValue}
                error={
                  !firstNamePattern.test(fatherDetails.name)
                    ? {
                      content: "Only alphabets are allowed",
                    }
                    : false
                }
              />
              <Form.Input
                required
                id={"fatherDob"}
                label="Father DOB"
                type="date"
                value={fatherDetails.dob || ""}
                name="dob"
                onChange={fatherchangeValue}
                width={5}
                disabled={disable}
                error={
                  errors.fatherDob
                    ? {
                      content: "This is required field",
                    }
                    : false
                }
              />
              <Form.Input
                required
                id={"fatherAadhar"}
                label="Father Aadhar Number"
                placeholder="Enter Father Aadhar Number"
                width={6}
                disabled={disable}
                type="text"
                value={fatherDetails.aadhar || ""}
                maxLength="12"
                name="aadhar"
                onChange={fatherchangeValue}
                error={
                  !aadharRegx.test(fatherDetails.aadhar) ||
                    (fatherDetails.aadhar.length !== 0 &&
                      fatherDetails.aadhar.length !== 12)
                    ? {
                      content: "Entered Aadhar number is  not valid",
                    }
                    : false
                }
              />

              <Form.Input

                id={"fatherMobile"}
                label="Father Mobile Number"
                placeholder="Enter Father Aadhar Number"
                width={6}
                disabled={disable}
                type="text"
                value={fatherDetails.mobile || ""}
                maxLength="10"
                name="mobile"
                onChange={fatherchangeValue}
              // error={
              // !mobRegex.test(fatherDetails.mobile) ||
              //   (
              //     fatherDetails.mobile.length !== 10)
              //   ? {
              //     content: "Entered valid number is  not valid",
              //   }
              //   : false
              // }
              />

            </Form.Group>
            <Form.Group>
              <Form.Input
                required
                id={"motherName"}
                label="Mother Name"
                placeholder="Enter Mother Name"
                type="text"
                width={6}
                disabled={disable}
                value={motherDetails.name || ""}
                name="name"
                onChange={motherchangeValue}
                error={
                  !firstNamePattern.test(motherDetails.name)
                    ? {
                      content: "Only alphabets are allowed",
                    }
                    : false
                }
              />
              <Form.Input
                required
                id={"motherDob"}
                label="Mother DOB"
                type="date"
                value={motherDetails.dob || ""}
                width={5}
                name="dob"
                disabled={disable}
                onChange={motherchangeValue}
              />
              <Form.Input
                required
                id={"motherAadhar"}
                label="Mother Aadhar Number"
                placeholder="Enter Mother Aadhar Number"
                type="text"
                maxLength="12"
                disabled={disable}
                value={motherDetails.aadhar || ""}
                width={6}
                name="aadhar"
                onChange={motherchangeValue}
                error={
                  !aadharRegx.test(motherDetails.aadhar) ||
                    (motherDetails.aadhar.length !== 0 &&
                      motherDetails.aadhar.length !== 12)
                    ? {
                      content: "Entered Aadhar number is  not valid",
                    }
                    : false
                }
              />
              <Form.Input

                id={"motherMobile"}
                label="Mother Mobile Number"
                placeholder="Enter Mother Aadhar Number"
                width={6}
                disabled={disable}
                type="text"
                value={motherDetails.mobile || ""}
                maxLength="10"
                name="mobile"
                onChange={motherchangeValue}
              // error={
              // !mobRegex.test(fatherDetails.mobile) ||
              //   (
              //     fatherDetails.mobile.length !== 10)
              //   ? {
              //     content: "Entered valid number is  not valid",
              //   }
              //   : false
              // }
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Spouse Name"
                id={"spouseName"}
                placeholder="Enter Spouse Name"
                type="text"
                disabled={disable}
                defaultValue={spouseDetails.name || ""}
                width={6}
                name="name"
                error={
                  !firstNamePattern.test(spouseDetails.name)
                    ? {
                      content: "Only alphabets are allowed",
                    }
                    : false
                }
                onChange={spouseEventHandler}
              />
              <Form.Input
                label="Spouse DOB"
                id={"spouseDob"}
                type="date"
                width={5}
                disabled={disable}
                defaultValue={spouseDetails.dob || ""}
                name="dob"
                onChange={spouseEventHandler}
              />
              <Form.Input
                label="Spouse Aadhar Number"
                id={"spouseAadhar"}
                defaultValue={spouseDetails.aadhar || ""}
                placeholder="Enter Spouse Aadhar Number"
                type="text"
                maxLength="12"
                width={6}
                disabled={disable}
                name="aadhar"
                onChange={spouseEventHandler}
                error={
                  !aadharRegx.test(spouseDetails.aadhar) ||
                    (spouseDetails.aadhar.length !== 0 &&
                      spouseDetails.aadhar.length !== 12)
                    ? {
                      content: "Entered Aadhar number is  not valid",
                    }
                    : false
                }
              />

              <Form.Input

                id={"spouseMobile"}
                label="Spouse Mobile Number"
                placeholder="Enter Spouse Aadhar Number"
                width={6}
                disabled={disable}
                type="text"
                value={spouseDetails.mobile || ""}
                maxLength="10"
                name="mobile"
                onChange={spouseEventHandler}
              // error={
              // !mobRegex.test(fatherDetails.mobile) ||
              //   (
              //     fatherDetails.mobile.length !== 10)
              //   ? {
              //     content: "Entered valid number is  not valid",
              //   }
              //   : false
              // }
              />

            </Form.Group>
            <div  className="btns">
              <Form.Button color="vk" onClick={moveBack}>
                Back
              </Form.Button>
              <Form.Button disabled={!disable} color="vk" onClick={edit}>
                Edit
              </Form.Button>
              <Form.Button disabled={disable} color="vk" type="submit">
                submit
              </Form.Button>
              <Form.Button color="vk" onClick={moveNext}>
                Next
              </Form.Button>
            </div>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};
export default ContactDetailsComponent;
