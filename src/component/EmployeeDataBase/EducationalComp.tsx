import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Icon, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEducationalDetails,
  educationalDetails,
  fetchDegreeTypeDetails,
  fetchDepartmentDetails,
  fetchEducationalDetails,
  id,
  nextMenu,
  postEducationalDetails,
  putEducationalDetails,
} from "../../reduxComp/slice";
import ErrorMessage from "../../interface/ErrorMessage";

const errorstyle = ErrorMessage;
let eduObj = {
  id: null,
  degreeType: "",
  collegeName: "",
  nameOfUniversity: "",
  passedOutYear: "",
  department: "",
};

Object.defineProperty(eduObj, "id", {
  value: null,
  writable: true,
  enumerable: false,
});

let errObj = {
  degreeType: false,
  collegeName: false,
  nameOfUniversity: false,
  passedOutYear: false,
  department: false,
};

const EduComp = () => {
  const [flagOfClg, setFlagOfClg] = useState(false);
  const [formFields, setFormFields] = useState([eduObj] as any);
  const [errorFields, setErrorFiels] = useState([errObj]);
  const [messageSpaceStyle, setmessageSpaceStyle] = useState() as any;
  const [errorMessage, seterrorMessage] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const dispatch = useDispatch<any>();
  const [disable, setDisable] = useState(false);
  const [degList, setDegList] = useState([{ text: "", value: "" }] as any);
  const [depList, setDepList] = useState([{ text: "", value: "" }] as any);

  useEffect(() => {
    dispatch(fetchEducationalDetails(empId)).then(
      (res: any) => {
        for (let index = 0; index < res.payload.length - 1; index++) {
          errorFields.push(errObj);
        }
        setFormFields(res.payload);
        setFlagOfClg(true);
      },
      dispatch(fetchDegreeTypeDetails()).then((res: any) => {
        for (let index = 0; index < res.payload.length; index++) {
          let obj = {
            text: res.payload[index].degreeType,
            value: res.payload[index].degreeType,
          };
          degList[index] = obj;
        }
        const degRef = [...degList];
        setDegList(degList);
      }),
      dispatch(fetchDepartmentDetails()).then((res: any) => {
        for (let index = 0; index < res.payload.length; index++) {
          let obj = {
            text: res.payload[index].department,
            value: res.payload[index].department,
          };
          depList[index] = obj;
        }
        const depRef = [...depList];
        setDepList(depRef);
      }),

      setDisable(false)
    );
    setNextPage(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const empId = useSelector(id);

  const [visible, setVisible] = React.useState(false);
  const [responseVisible, setResponseVisible] = React.useState(false);

  const [selected, setSelected] = useState(0);
  const handleChange = (event: any, index: number, { value, name }: any) => {
    setNextPage(false);
    let feilds = [...formFields];
    let newFormValues = feilds[index];
    var val = { ...newFormValues, [name]: value };
    feilds.splice(index, 1, val);
    setFormFields(feilds);
    let key = name;
    setResponseVisible(false);
    switch (key) {
      case "degreeType":
        var errObjects = errorFields[index] as any;
        errObjects = { ...errObjects, degreeType: false };
        errorFields.splice(index, 1, errObjects);
        break;
      case "department":
        // indexValue = formFields[index];
        var errObjects = errorFields[index] as any;
        errObjects = { ...errObjects, department: false };
        errorFields.splice(index, 1, errObjects);
        break;
      case "collegeName":
        var errObjects = errorFields[index] as any;
        errObjects = { ...errObjects, collegeName: false };
        errorFields.splice(index, 1, errObjects);
        setErrorFiels([...errorFields]);
        break;
      case "nameOfUniversity":
        var errObjects = errorFields[index] as any;
        errObjects = { ...errObjects, nameOfUniversity: false };
        errorFields.splice(index, 1, errObjects);
        break;
      case "passedOutYear":
        var errObjects = errorFields[index] as any;
        errObjects = { ...errObjects, passedOutYear: false };
        errorFields.splice(index, 1, errObjects);
        setErrorFiels([...errorFields]);
        break;
      default:
        break;
    }
  };

  const isValid = () => {
    let flag = true;
    for (let index = 0; index < formFields.length; index++) {
      let val = formFields[index] as any;

      for (const key in val) {
        if (val[key].length < 3) {
          flag = false;
          let keys = key;
          switch (keys) {
            case "degreeType":
              var error = errorFields[index];
              var fieldError = { ...error, degreeType: true };
              errorFields.splice(index, 1, fieldError);
              break;
            case "collegeName":
              var error = errorFields[index];
              var fieldError = { ...error, collegeName: true };
              errorFields.splice(index, 1, fieldError);
              break;
            case "nameOfUniversity":
              var error = errorFields[index];
              var fieldError = { ...error, nameOfUniversity: true };
              errorFields.splice(index, 1, fieldError);
              break;
            case "passedOutYear":
              var error = errorFields[index];
              var fieldError = { ...error, passedOutYear: true };
              errorFields.splice(index, 1, fieldError);
              break;
            case "department":
              var error = errorFields[index];
              var fieldError = { ...error, department: true };
              errorFields.splice(index, 1, fieldError);
              break;
            default:
              break;
          }
        }
      }
    }
    return flag;
  };

  const submit = (e: any) => {
    window.scroll(0, 0);

    if (isValid()) {
      eitherPutOrPost();
      setResponseVisible(true);
    } else {
      setResponseVisible(true);
      seterrorMessage(errorstyle.formInputFailure);
      setmessageSpaceStyle(errorstyle.formStyleFailure);
    }
  };

  const addFields = () => {
    setFormFields([...formFields, eduObj]);
    setErrorFiels([...errorFields, errObj]);
    setResponseVisible(false);
  };
  const handleDelete = (index: any) => {
    setSelected(index);
    setVisible(true);
    setResponseVisible(false);
    setNextPage(false);
  };

  const eitherPutOrPost = () => {
    if (formFields[0].id == null) {
      post();
    } else {
      patch();
    }
  };

  const getData = function () {
    // setNextPage(true);
    dispatch(fetchEducationalDetails(empId)).then((res: any) => {
      for (let index = 0; index < res.payload.length - 1; index++) {
        errorFields.push(errObj);
      }
      setFormFields(res.payload);
      setFlagOfClg(true);
    });
    setDisable(false);
  };
  let timeOut = () => {
    seterrorMessage("");
    setmessageSpaceStyle({});
  };
  const post = () => {
    dispatch(
      postEducationalDetails({ formFields: formFields, empId: empId })
    ).then((res: any) => {
      if (res.type === "postEducationalDetails/fulfilled") {
        setDisable(true);
        setNextPage(true);
        seterrorMessage(errorstyle.formSubmited);
        setmessageSpaceStyle(errorstyle.formStyleSuccess);
        setTimeout(timeOut, 4000);
      } else {
        seterrorMessage(res.error.message + "...!   Try Again");
        setmessageSpaceStyle(errorstyle.formStyleFailure);
        setTimeout(timeOut, 4000);
      }
    });
    setDisable(true);
  };
  const patch = () => {
    dispatch(
      putEducationalDetails({ formFields: formFields, empId: empId })
    ).then((res: any) => {
      if (res.type === "putEducationalDetails/fulfilled") {
        setNextPage(true);
        setDisable(true);
        seterrorMessage(errorstyle.formUpdated);
        setmessageSpaceStyle(errorstyle.formStyleSuccess);
        setTimeout(timeOut, 4000);
      } else {
        seterrorMessage(res.error.message + "...!   Try Again");
        setmessageSpaceStyle(errorstyle.formStyleFailure);
        setTimeout(timeOut, 4000);
      }
    });
    setDisable(true);
  };
  const removeFields = async (index: any) => {
    if (formFields[index].id != null) {
      dispatch(
        deleteEducationalDetails({
          empId: empId,
          educationId: formFields[index].id,
        })
      );
    }
    var data = [...formFields];
    var errData = [...errorFields];

    data.splice(index, 1);
    errData.splice(index, 1);
    setFormFields(data);
    // (data);

    setErrorFiels([]);
    setFormFields([]);
    setVisible(false);
    return new Promise((resolve) => {
      setTimeout(() => {
        setErrorFiels(errData);
        resolve(setFormFields(data));
      }, 0);
    });
  };
  const moveNext = () => {
    // if (nextPage) {
      dispatch(nextMenu("Bank Details"));
    // }
  };

  const moveBack = () => {
    if (nextPage) {
      dispatch(nextMenu("Contact Details"));
    }
  };

  return (
    <div style={{ padding: "0px" }}>
      <Container>
        <div style={messageSpaceStyle} id="forError">
          {errorMessage === "" ? "" : errorMessage}
        </div>
        <Segment>
          <h2 className="ui header" style={{ color: "#2d7cfa" }}>
            <div className="content">
              Employee Educational Details
            </div>
          </h2>
          <Form style={{ textAlign: "left" }}>
            {formFields.map((data: any, index: any) => {
              return (
                <div key={index}>
                  <h3>{index + 1}. Educational Qualification</h3>
                  <Form.Group>
                    <Form.Dropdown
                      // required
                      clearable
                      width={16}
                      name="degreeType"
                      label="Degree"
                      options={degList}
                      selection
                      scrolling
                      search
                      fluid
                      value={formFields[index].degreeType || ""}
                      placeholder="degreeType"
                      disabled={disable}
                      error={
                        errorFields[index].degreeType
                          ? { content: "please select any degree" }
                          : false
                      }
                      onChange={(event, value) =>
                        handleChange(event, index, value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      name="collegeName"
                      label="College Name"
                      placeholder="College Name"
                      type="text"
                      width={16}
                      disabled={disable}
                      defaultValue={formFields[index].collegeName || ""}
                      error={
                        errorFields[index].collegeName
                          ? { content: "given college name is not valid " }
                          : false
                      }
                      onChange={(event, value) =>
                        handleChange(event, index, value)
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Input
                      width={16}
                      type="text"
                      name="nameOfUniversity"
                      label="Name Of University"
                      // options={univList}
                      // selection
                      disabled={disable}
                      defaultValue={formFields[index].nameOfUniversity || ""}
                      // scrolling
                      // search
                      placeholder="Name Of University"
                      error={
                        errorFields[index].nameOfUniversity
                          ? { content: "please enter University name" }
                          : false
                      }
                      onChange={(event, value) =>
                        handleChange(event, index, value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      name="passedOutYear"
                      label="Year of Passed Out"
                      placeholder="Year of Passed Out"
                      type="date"
                      disabled={disable}
                      width={16}
                      value={formFields[index].passedOutYear || ""}
                      onChange={(event, value) =>
                        handleChange(event, index, value)
                      }
                      error={
                        errorFields[index].passedOutYear
                          ? { content: "please select date of your passed out" }
                          : false
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Select
                      clearable
                      name="department"
                      width={16}
                      label="Department"
                      disabled={disable}
                      options={depList}
                      selection
                      placeholder="Department"
                      search
                      scrolling
                      value={formFields[index].department || ""}
                      error={
                        errorFields[index].department
                          ? { content: "please select any department" }
                          : false
                      }
                      onChange={(event, value) =>
                        handleChange(event, index, value)
                      }
                    />
                  </Form.Group>
                  <div>
                    {visible && index == selected && (
                      <div
                        style={{
                          position: "relative",
                          top: "0",
                          left: "0",
                          right: "0",
                          bottom: "0",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",

                            padding: "20px",
                            borderRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              borderRadius: "10%",
                              padding: "10px",
                            }}
                          >
                            <p
                              style={{
                                color: "white",
                                fontSize: "16px",
                                padding: "10px",
                              }}
                            >
                              Do you want to delete this Educational Detail?
                            </p>

                            <button
                              style={{
                                display: "flex",
                                alignItems: "center",
                                background: "green",
                                color: "white",
                                padding: "10px",
                                marginLeft: "4px",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "10%",
                              }}
                              onClick={() => setVisible(false)}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => removeFields(index)}
                              style={{
                                background: "red",
                                color: "white",
                                padding: "10px",
                                marginRight: "4px",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "10%",
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    disabled={disable}
                    negative
                    onClick={() => handleDelete(index)}
                    style={{
                      display: formFields.length == 1 ? "none" : "block",
                      width: "20%",
                      margin: " 10px 0% 0%  80%",
                      padding: "9px",
                    }}
                  >
                    <Icon name="remove" /> remove
                  </Button>
                </div>
              );
            })}

            <Button
              primary
              disabled={disable}
              onClick={addFields}
              style={{ margin: "3% 20% 0% 0% ", width: "100%" }}
            >
              <Icon name="add circle" /> Details
            </Button>
            {/* {responseVisible && 
            <div style={messageSpaceStyle} id="forError">
              {errorMessage === "" ? "" : errorMessage}
            </div>} */}
            <div
              style={{
                // display: "flex",
                // justifyContent: "space-between",
                margin: "1%",
                // width: "101%",
                textAlign: "center",
              }}
            >
              <Button
                color="vk"
                // secondary
                onClick={moveBack}
              //  disabled={!disable}
              >
                {/* <Icon name="backward" />  */}
                Back
              </Button>
              <Button
                color="vk"
                // secondary
                onClick={getData}
                disabled={!disable}
              >
                {/* <Icon name="backward" />  */}
                Edit
              </Button>

              <Button
                color="vk"
                // positive
                // style={{ margin: "-1% 1%", width: "15%", height: "3%" }}
                onClick={submit}
                disabled={disable}
              >
                {flagOfClg ? "Save" : "Submit"}
              </Button>
              <Button
                color="vk"
                // primary
                // disabled={nextPage}
                onClick={moveNext}
              >
                next{"  "}
                {/* <span>
                  <Icon name="forward" />
                </span> */}
              </Button>
            </div>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};
export default EduComp;
