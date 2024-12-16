import { useEffect, useState } from "react";
import { Button, Container, Form, Icon, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Expcss.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNomineeDetails,
  fetchDropownDetails,
  fetchNomineeDetails,
  id,
  nextMenu,
  patchNomineeDetails,
} from "../../reduxComp/slice";
import errorstyle from "../../interface/ErrorMessage";
import { log } from "console";

let errStyle = {
  formFailure: "Failed To Submit .....!",
  formSuccess: "Submited Succesfully....",
  formStyleFailure: {
    padding: "10px",
    borderRadius: "5px",
    width: "99%",
    background: "rgb(248, 191, 191,0.700)",
    fontFamily: "system-ui",
  },
  formStyleSuccess: {
    borderRadius: "5px",
    width: "99%",
    color: "#000",
    padding: "10px",
    margin: "5px",
    background: "rgba(141, 241, 158, 0.615)",
    fontFamily: "system-ui",
  },
};

let details = {
  id: "",
  name: "",
  relation: "",
  percentage: 0,
};

let expObject = {
  uanNumber: "",
  nomineeDetailsDtoList: [details],
};

let error = {
  relation: false,
};
let indexValue = [] as any;
// let sss = [] as any;
let selection = [] as any;
let selectedValue = [] as any;
const NomineeComp = () => {
  const [nomineeArr, setNomineeArr] = useState([details]);
  const [formFields, setFormFields] = useState({ ...expObject });
  const [dropDown, setdropDown] = useState([] as any);
  const [dropDownDetails, setdropDownDetails] = useState([] as any);
  const [messageSpaceStyle, setmessageSpaceStyle] = useState() as any;
  const [errorMessage, seterrorMessage] = useState("");
  const [errors, setError] = useState([error]);
  const [mapName, setMapName] = useState([]) as any;
  const [percentageArr, setPercentageErr] = useState(false);
  const [newdropDown, setNewdropDown] = useState([]);
  const [disable, setDisable] = useState(false);
  const employeeId = useSelector(id);
  const dispatch = useDispatch<any>();

  const getIndex = (i: any) => {
    indexValue = i;
  };
  const addFields = () => {
    if (nomineeArr.length < dropDownDetails.length) {
      setNomineeArr([...nomineeArr, details]);
      setError([...errors, error]);
      selectedValue.forEach((select: any) => {
        let optionValue = [];
        for (let i = 0; i < dropDown.length; i++) {
          if (select !== dropDown[i].value) {
            optionValue.push(dropDown[i]);
            getIndex(optionValue);
          }
        }
      });
    }
  };

  useEffect(() => {
    dispatch(fetchDropownDetails(employeeId)).then((res: any) => {
      console.log(res);
      let drop = [] as any;
      setdropDownDetails(res.payload);
      let arr = res.payload;
      for (let i = 0; i < arr.length; i++) {
        let obj = {
          text: arr[i].relation,
          value: arr[i].id,
          name: arr[i].name,
        };
        drop.push(obj);
        setMapName([...mapName, arr[i]]);
        setdropDown(dropDown);
      }
      setdropDown(drop);
      setNewdropDown(drop);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fn = () => {
    dispatch(fetchNomineeDetails(employeeId)).then((res: any) => {
      setFormFields(res.payload);
      setNomineeArr(res.payload.nomineeDetailsDtoList);
      let arr = res.payload.nomineeDetailsDtoList;
      for (let i = 0; i < arr.length; i++) {
        errors.push(error);
      }
    });
  };

  const removeFields = (i: any) => {
    if (i === 0) {
      let aa;
      selectedValue.splice(i, 1);
      for (let i = 0; i < selectedValue.length; i++) {
        aa = dropDown.filter((e: any) => e.value !== selectedValue[i]);
      }
      setNewdropDown(aa);
    } else if (i === 1) {
      let aa;
      selectedValue.splice(i, 1);
      for (let i = 0; i < selectedValue.length; i++) {
        aa = dropDown.filter((e: any) => e.value !== selectedValue[i]);
      }
      setNewdropDown(aa);
    } else if (i === 2) {
      let aa;
      selectedValue.splice(i, 1);
      for (let i = 0; i < selectedValue.length; i++) {
        aa = dropDown.filter((e: any) => e.value !== selectedValue[i]);
      }
      setNewdropDown(aa);
    }

    let confirm = window.confirm("Do you want to delete this Details");
    if (confirm) {
      if (nomineeArr[i].id != null) {
        let removeFeild = [...nomineeArr];
        removeFeild.splice(i, 1);
        setNomineeArr(removeFeild);
        let removeErrFeild = [...errors];
        removeErrFeild.splice(i, 1);
        setError(removeErrFeild);
      }
    }
  };

  const handleChange = (event: any, index: any, { name, value }: any) => {
    let newFormValues = nomineeArr;
    var val = { ...newFormValues[index], percentage: Number(value) };
    newFormValues.splice(index, 1, val);
    setFormFields({ ...formFields, nomineeDetailsDtoList: newFormValues });
  };

  const handleUanNumber = (event: any, { value }: any) => {
    setFormFields({ ...formFields, uanNumber: value });
  };

  const fixName = (e: any, index: any, { name, value }: any) => {
    let err = [...errors];
    err.splice(index, 1, { ...err[index], relation: false });
    setError(err);
    let feilds = [...nomineeArr];
    for (let i = 0; i < dropDown.length; i++) {
      if (dropDown[i].value === value) {
        var val = {
          id: value,
          name: dropDown[i].name,
          relation: dropDown[i].text,
          percentage: 0,
        };
        feilds.splice(index, 1, val);
        setNomineeArr(feilds);
      }
    }
    if (index === 0) {
      let aa;
      selectedValue.splice(index, 1, value);
      for (let i = 0; i < selectedValue.length; i++) {
        aa = dropDown.filter((e: any) => e.value !== selectedValue[i]);
      }
      setNewdropDown(aa);
    } else if (index === 1) {
      let aa: any;
      selectedValue.splice(index, 1, value);
      for (let i = 0; i < selectedValue.length; i++) {
        aa = dropDown.filter((e: any) => e.value !== selectedValue[i]);
      }
      setNewdropDown(aa);
    } else if (index === 3) {
      let aa: any;
      selectedValue.splice(index, 1, value);
      for (let i = 0; i < selectedValue.length; i++) {
        aa = dropDown.filter((e: any) => e.value !== selectedValue[i]);
      }
      setNewdropDown(aa);
    }
    setFormFields({ ...formFields, nomineeDetailsDtoList: feilds });
  };

  let checkDropDown = () => {
    let isErr = false;
    var err = [...errors];
    for (let i = 0; i < nomineeArr.length; i++) {
      if (nomineeArr[i].id === "") {
        isErr = true;
        var errValue = errors[i];
        errValue = {
          ...errValue,
          relation: true,
        };
        err.splice(i, 1, errValue);
        setError(err);
      }
    }
    return isErr;
  };

  const isValid = () => {
    if (formFields.nomineeDetailsDtoList.length === 1) {
      formFields.nomineeDetailsDtoList[0].percentage = 100;
      setFormFields(formFields);
    }

    if (
      formFields.uanNumber.length !== 0 &&
      formFields.uanNumber.length !== 12
    ) {
      return false;
    }

    let checkSelection = checkDropDown();

    for (let i = 0; i < formFields.nomineeDetailsDtoList.length; i++) {
      const fields = formFields.nomineeDetailsDtoList[i];
      if (fields.percentage <= 0 || fields.percentage > 100) {
        return false;
      }

      if (checkSelection) {
        return false;
      }

      if (i === [...formFields.nomineeDetailsDtoList].length - 1) {
        return calExp();
      }
    }
  };

  let timeOut = () => {
    seterrorMessage("");
    setmessageSpaceStyle({});
  };
  const formValidation = (e: any) => {
    e.preventDefault();
    if (isValid()) {
      dispatch(
        patchNomineeDetails({
          empId: employeeId,
          formFields: formFields,
          userId: "nomiUser",
        })
      ).then((res: any) => {
        if (res.type === "patchNomineeDetails/fulfilled") {
          setDisable(true);
          seterrorMessage(errorstyle.formUpdated);
          setmessageSpaceStyle(errorstyle.formStyleSuccess);
          setTimeout(timeOut, 4000);
          window.scrollTo(0, 0);
        } else {
          seterrorMessage(res.error.message + "...!   Try Again");
          setmessageSpaceStyle(errorstyle.formStyleFailure);
          setTimeout(timeOut, 4000);
          window.scrollTo(0, 0);
        }
      });
    }
  };

  let calExp = () => {
    let totalPercentage = 0;
    let percentageArr = formFields.nomineeDetailsDtoList;
    for (let i = 0; i < percentageArr.length; i++) {
      totalPercentage += Number(percentageArr[i].percentage);
    }
    if (totalPercentage !== 100) {
      setPercentageErr(true);
      return false;
    } else {
      setPercentageErr(false);
      return true;
    }
  };

  const Prev = (e: any) => {
    e.preventDefault();
    dispatch(nextMenu("Work Experiece"));
  };

  const moveNext = (e: any) => {
    e.preventDefault();
    dispatch(nextMenu("Submission"));
  };

  return (
    <div className="experienceComponent">
      <Container style={{ width: "90%", marginTop: "-20px" }}>
        <div style={messageSpaceStyle} id="forError">
          {errorMessage === "" ? "" : errorMessage}
        </div>
        <Segment>
          <h2 className="ui header" style={{ color: "#2d7cfa" }}>
            <div className="content">
              Employee's Nominee Detials
            </div>
          </h2>
          <Form onSubmit={formValidation}>
            <Form.Group>
              <Form.Input
                label="UAN Number"
                name="percentage"
                type="number"
                value={formFields.uanNumber || ""}
                placeholder="Enter Your UAN Number"
                onChange={(event, value) => {
                  handleUanNumber(event, value);
                }}
                width={16}
                disabled={disable}
                error={
                  formFields.uanNumber.length !== 12 &&
                    formFields.uanNumber.length !== 0
                    ? {
                      content: "Invalid Input",
                    }
                    : false
                }
              />
            </Form.Group>
            {nomineeArr.map((form, i) => {
              return (
                <div key={i}>
                  <div className="experienceForm" id={"first" + i}>
                    <h3 style={{ margin: "0% 5.4%%", width: "70%" }}>
                      {i + 1}. Nominee Detials
                    </h3>
                    <Form.Group>
                      <Form.Dropdown
                        fluid
                        clearable
                        selection
                        floating
                        scrolling
                        search
                        name={"id"}
                        text={nomineeArr[i].relation || ""}
                        value={nomineeArr[i].relation || ""}
                        width={16}
                        disabled={disable}
                        error={
                          errors[i].relation
                            ? {
                              content: "Select Relation of this Organization",
                            }
                            : false
                        }
                        label="Employee's relation with Nominee"
                        options={newdropDown}
                        onChange={(event: any, value) => {
                          fixName(event, i, value);
                        }}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Input
                        fluid
                        name="name"
                        className="name"
                        value={nomineeArr[i].name}
                        width={10}
                        disabled={disable}
                        label="Name Of Nominee"
                      />
                    </Form.Group>

                    <div
                      style={{
                        display: nomineeArr.length === 1 ? "none" : "block",
                      }}
                    >
                      <Form.Group>
                        <Form.Input
                          fluid
                          label="Percentage"
                          defaultValue={nomineeArr[i].percentage || ""}
                          name="percentage"
                          placeholder="percentage"
                          maxLength={3}
                          width={10}
                          disabled={disable}
                          type="number"
                          onChange={(event: any, value: any) => {
                            handleChange(event, i, value);
                            calExp();
                          }}
                          error={
                            percentageArr ||
                              nomineeArr[i].percentage < 0 ||
                              nomineeArr[i].percentage > 100
                              ? "Invalid Input"
                              : false
                          }
                        />
                        <button
                          type="button"
                          id="removeBtnNominee"
                          disabled={disable}
                          onClick={() => removeFields(i)}
                        >
                          <Icon className="delete" />
                          Delete
                        </button>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              id="addBtn"
              onClick={addFields}
              disabled={disable}
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
              <Button type="button" color="vk" onClick={fn} disabled={!disable}>
                Edit
              </Button>
              <Button
                type="submit"
                color="vk"
              >
                Submit
              </Button>
              <Button type="button" color="vk" onClick={moveNext}>
                Next
              </Button>
            </div>
          </Form>
        </Segment>
      </Container>
    </div>
  );
};
export default NomineeComp;
