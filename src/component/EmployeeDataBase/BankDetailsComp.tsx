import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, Form, Segment } from "semantic-ui-react";
import {
  fetchBankDetails,
  fetchBankNameDetails,
  id,
  nextMenu,
  postBankDetail,
  putBankDetails,
} from "../../reduxComp/slice";
import ErrorMessage from "../../interface/ErrorMessage";
import { log } from "console";
import { logDOM } from "@testing-library/react";
import { set } from "immer/dist/internal";

const errorstyle = ErrorMessage;

const accoutDetail = {
  id: null,
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  bankName: "",
  branchName: "",
};

const accName_REGEX = /^[A-Za-z]{0,30}$/;
const accNumber_REGEX = /^[0-9]{0,20}$/;
const accIfsc_REGEX = /^[0-9A-Z]{0,30}$/;

const success = {
  backgroundColor: "lightgreen",
  width: "100%",
  padding: "25px",
  textAlign: "center",
};
const failed = {
  backgroundColor: "red",
  width: "100%",
  padding: "25px",
  textAlign: "center",
};

let send: boolean;
const BankDetailsComp = () => {
  const [input, setInput] = useState(accoutDetail as any);
  const [error, setError] = useState(accoutDetail as any);
  const [btnDisable, setBtnDisable] = useState(false);
  const [value, setValue] = useState({} as any);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch<any>();
  const [sending, setSending] = useState(false);
  const [messageSpaceStyle, setmessageSpaceStyle] = useState() as any;
  const [errorMessage, seterrorMessage] = useState("");
  const employeeId = useSelector(id);
  const [nextPage, setNextPage] = useState(false);
  const [optnArray, setOptnArray] = useState([{ text: "", value: "" }] as any);
  const [backPage, setBackPage] = useState(false);
  // const [visibility,setVisibility] = useState(false);



  useEffect(() => {
    if (employeeId !== null && employeeId !== undefined && employeeId !== "") {
      dispatch(fetchBankDetails(employeeId)).then((res: any) => {
        if (res.payload !== undefined && res.type === "fetchBankDetails/fulfilled") {
          setInput(res.payload);
          setNextPage(true);
          setBackPage(true);
          setSending(false);
        } else {
          setNextPage(false);
          setBackPage(true);
        }
      });
    }
    dispatch(fetchBankNameDetails()).then((res: any) => {
      for (let index = 0; index < res.payload.length; index++) {
        let obj = {
          text: res.payload[index].bankName,
          value: res.payload[index].bankName,
        };
        optnArray[index] = obj;
      }
      const bankNameRef = [...optnArray];
      setOptnArray(bankNameRef)
    });

    // setVisibility(true);
    //  setVisibility(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: any, { name, value }: any) => {
    setNextPage(false);
    setBackPage(false);
    // setVisibility(true);
    setError(accoutDetail);
    send = true;
    let key = name;
    switch (key) {
      case "accountHolderName":
        setError({ ...error, [name]: "" });
        let userName = value.trim();
        var valid = accName_REGEX.test(userName);
        setInput({
          ...input,
          [name]: valid
            ? userName
            : setError({ ...error, [name]: "only alphabets are allowed" }),
        });
        break;
      case "accountNumber":
        setError({ ...error, [name]: "" });
        valid = accNumber_REGEX.test(value);
        setInput({
          ...input,
          [name]: valid
            ? value
            : setError({ ...error, [name]: "only numbers allowed" }),
        });
        break;
      case "ifscCode":
        setError({ ...error, [name]: "" });
        valid = accIfsc_REGEX.test(value);
        setInput({
          ...input,
          [name]: valid
            ? value
            : setError({
              ...error,
              [name]: "Capital letters with numbers only allowed",
            }),
        });
        break;
      case "bankName":
        setError({ ...error, [name]: "" });
        setInput({
          ...input,
          [name]: value ? value : setError({ ...error, [name]: "" }),
        });
        break;
      case "branchName":
        setError({ ...error, [name]: "" });
        valid = accName_REGEX.test(value);
        setInput({
          ...input,
          [name]: valid
            ? value
            : setError({ ...error, [name]: "only alphabets are allowed" }),
        });
        break;
      default:
        break;
    }
  };

  let finalError = false;
  var errorValue = error.bankName;
  const validateError = () => {
    let errorObject = error;
    for (const key in input) {
      if (input[key] === "") {
        finalError = false;
        let keys = key;
        switch (keys) {
          case "accountHolderName":
            errorObject = {
              ...errorObject,
              accountHolderName: "Name not entered",
            };
            break;
          case "accountNumber":
            errorObject = {
              ...errorObject,
              accountNumber: "AccountNumber not entered",
            };
            break;
          case "ifscCode":
            errorObject = { ...errorObject, ifscCode: "IFSC not entered" };
            break;
          case "bankName":
            errorObject = { ...errorObject, bankName: "Bank not selected" };
            break;
          case "branchName":
            errorObject = { ...errorObject, branchName: "Branch not entered" };
            break;
          default:
            break;
        }
      } else {
        finalError = true;
      }
      setError(errorObject);
    }
  };
  const get = () => {
    setSending(true);
    dispatch(fetchBankDetails(employeeId)).then((res: any) => {
      setInput(res.payload);
    });
    setDisable(false);
    setBtnDisable(false);
  };
  const post = () => {
    console.log("inside post " + nextPage);
    send = true;
    for (const key in input) {
      if (`${input[key]}` === "") {
        send = false;
      }
    }
    if (send) {

      dispatch(postBankDetail({ empId: employeeId, accoutDetail: input })).then(
        (res: any) => {
          if (res.type === "postBankDetails/fulfilled") {
            // setVisibility(true);
            setNextPage(true);
            setBackPage(true);
            console.log("inside post dispatch" + nextPage);
            seterrorMessage(errorstyle.formSubmited);
            setmessageSpaceStyle(errorstyle.formStyleSuccess);
            new Promise((resolve) => {
              setTimeout(() => {
                seterrorMessage("");
                setmessageSpaceStyle({});
              }, 4000);
            });
            window.scrollTo(0, 0);
          } else {
            setNextPage(false);
            setBackPage(false);
            seterrorMessage(res.error.message + "...!   Try Again");
            setmessageSpaceStyle(errorstyle.formStyleFailure);
            new Promise((resolve) => {
              setTimeout(() => {
                seterrorMessage("");
                setmessageSpaceStyle({});
              }, 4000);
            });
            window.scrollTo(0, 0);
          }
        }
      );

      setDisable(true);
      setBtnDisable(true);
    }
  };

  const put = () => {
    console.log("inside put " + nextPage);
    console.log(input);

    dispatch(putBankDetails({ empId: employeeId, input: input })).then(
      (res: any) => {
        if (res.type === "putBankDetails/fulfilled") {
          setNextPage(true);
          setBackPage(true);
          setSending(false);
          console.log("inside put dispatch " + nextPage);
          // setVisibility(true);
          seterrorMessage(errorstyle.formUpdated);
          setmessageSpaceStyle(errorstyle.formStyleSuccess);
          new Promise((resolve) => {
            setTimeout(() => {
              seterrorMessage("");
              setmessageSpaceStyle({});
            }, 4000);
          });
          window.scrollTo(0, 0);
        } else {
          setNextPage(false);
          setBackPage(false);
          seterrorMessage(res.error.message + "...!   Try Again");
          setmessageSpaceStyle(errorstyle.formStyleFailure);
          new Promise((resolve) => {
            setTimeout(() => {
              seterrorMessage("");
              setmessageSpaceStyle({});
            }, 4000);
          });
          window.scrollTo(0, 0);
        }
      }
    );
  };

  const eitherPutOrPost = () => {

    if (input.id == null) {
      console.log("inside either post " + nextPage);

      save();
    } else {
      console.log("inside either put  " + nextPage);
      put();
    }
  };

  const save = () => {
    console.log(nextPage);
    validateError();
    post();
  };

  const moveNext = (e: any) => {

    e.preventDefault();
    console.log(nextPage);

    // if (nextPage) {
      dispatch(nextMenu("Documents Upload"));
    // }
  };

  const Prev = (e: any) => {
    e.preventDefault();

    // setBackPage(true);
    console.log(backPage);
    if (backPage) {
      dispatch(nextMenu("Education Details"));
    }
  };


  return (
    <div>
      <Container>
        <Form>
          <div style={messageSpaceStyle} id="forError">
            {errorMessage === "" ? "" : errorMessage}
          </div>
          <Segment>
            <Grid columns={1}>
              {/* <Grid.Column></Grid.Column> */}
              <Grid.Column>
                <div style={{ marginBottom: "1.3%", padding: "0px" }}>
                  <h2 className="ui header" style={{ color: "#2d7cfa" }}>
                    <div className="content">Bank Details</div>{" "}
                    {/* <div className="sub header">
                      Please enter the details given below
                    </div> */}
                  </h2>
                </div>
                <Form.Field>
                  <Form.Input
                    type="text"
                    name="accountHolderName"
                    id="accountHolderName"
                    label="Account Holder Name"
                    placeholder="Account Holder Name"
                    fluid
                    width={16}
                    defaultValue={input.accountHolderName || ""}
                    onChange={handleChange}
                    disabled={disable}
                    error={
                      error.accountHolderName !== ""
                        ? { content: error.accountHolderName }
                        : false
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    label="Account Number"
                    placeholder="Account Number"
                    fluid
                    width={16}
                    defaultValue={input.accountNumber || ""}
                    onChange={handleChange}
                    disabled={disable}
                    error={
                      error.accountNumber !== ""
                        ? { content: error.accountNumber }
                        : false
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    type="text"
                    name="ifscCode"
                    id="ifscCode"
                    label="IFSC Code"
                    placeholder="IFSC Code"
                    fluid
                    width={16}
                    defaultValue={input.ifscCode || ""}
                    onChange={handleChange}
                    disabled={disable}
                    error={
                      error.ifscCode !== ""
                        ? { content: error.ifscCode }
                        : false
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Select
                    label="Bank Name"
                    name="bankName"
                    options={optnArray}
                    width={16}
                    placeholder={"Select Bank"}
                    value={input.bankName || ""}
                    onChange={handleChange}
                    disabled={disable}
                    error={errorValue ? { content: error.bankName } : false}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    type="text"
                    name="branchName"
                    id="branchName"
                    label="Branch"
                    placeholder="branchName"
                    fluid
                    width={16}
                    defaultValue={input.branchName || ""}
                    onChange={handleChange}
                    disabled={disable}
                    error={
                      error.branchName !== ""
                        ? { content: error.branchName }
                        : false
                    }
                  />
                </Form.Field>
              </Grid.Column>
            </Grid>
          </Segment>
          <Grid columns={1}>
            {/* <Grid.Column></Grid.Column> */}
            <Grid.Column>
                <div className="btns">
                <Form.Button color="vk" onClick={Prev}>
                  Back
                </Form.Button>
                <Form.Button
                  color="vk"
                  onClick={eitherPutOrPost}
                  disabled={btnDisable}
                >
                  {sending ? "Save" : "Submit"}
                </Form.Button>
                <Form.Button color="vk" onClick={moveNext}>
                  Next
                </Form.Button>
                </div>
            </Grid.Column>
          </Grid>
        </Form>
      </Container>
    </div>
  );
};
export default BankDetailsComp;
