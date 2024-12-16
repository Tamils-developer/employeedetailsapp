import { useRef, useState, useEffect } from "react";
import {
  Container,
  Divider,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Segment,
} from "semantic-ui-react";
import Logo from "../asssets/advento-logo-1.png";
import "./LoginPage.css";
import { useAuth } from "../login_dashboard/AuthProvider";
import { useDispatch } from "react-redux";
import { checkLoginCredentials, nextMenu } from "../reduxComp/slice";
import ErrorMessage from "../interface/ErrorMessage";

const LoginGabu = () => {
  const { login }: any = useAuth();

  const errorstyle = ErrorMessage;
  const [candidateId, setCandidateId] = useState("");

  const [messageSpaceStyle, setmessageSpaceStyle] = useState() as any;
  const [errorMessage, seterrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<any>();

  const loginObj = {
    candidateId: candidateId,
    password: password,
  };
  const [credentials, setCredentials] = useState(loginObj) as any;
  const handleSubmit = () => {
    dispatch(checkLoginCredentials({ candidateId: candidateId, password: password })
    ).then((res: any) => {
      console.log(res.payload,candidateId);
      // if (res.type === "checkLoginCredentials/fulfilled") {
        dispatch(nextMenu("Basic Details"));
        if ("1001"=== candidateId) {      
          seterrorMessage(res.payload);
          setmessageSpaceStyle(errorstyle.formStyleSuccess);
          login({
            role: 'admin',
            username: candidateId,
            password: password
          });
        } else {
          seterrorMessage("Password is incorrect");
          setmessageSpaceStyle(errorstyle.formStyleFailure);
        }
      // } else {
      //   seterrorMessage("No Such username exist");
      //   setmessageSpaceStyle(errorstyle.formStyleFailure);
      // }
    })
    console.log(credentials);
  };


  const handleUserNameChange = (name: any, e: any) => {

    let key = "username";
    if (key === "username") {
      setCandidateId(name);
      let res = credentials;
      res.candidateId = name;
      console.log(res);
    } else {
      console.log("error");
    }
  }
  const handlePasswordChange = (name: any, e: any) => {
    let key = "password";
    if (key === "password") {
      setPassword(name);
      // credentials[key] = name;
      let ans = name;
      console.log(ans);
      // setCredentials(...credentials, credentials[key] = name)
    } else {
      console.log("error");
    }
  };
  return (
    <Container>
      <Segment>
        <section>
          <Grid columns={2} textAlign="center">
            <Grid.Row>
              <Grid.Column>
                <img src="/Advento.png" alt="" />
              </Grid.Column>
              <section
                style={{
                  width: "50%",
                  padding: "5% 5%",
                  paddingLeft: "5%",
                  textAlign: "left",
                }}
              >
                <Grid.Column>
                  <h2 style={{ marginTop: "1em", marginBottom: "1em" }}>
                    Login
                  </h2>
                  <Form>
                    <Form.Input
                      name="username"
                      type="text"
                      width={16}
                      label="Username :"
                      autoComplete="off"

                      onChange={(e) => {
                        let name = e.target.value;
                        handleUserNameChange(name, e);

                      }}
                      placeholder="enter your user name"
                    />
                    <Form.Input
                      type="password"
                      width={16}
                      label="Password :"
                      name="password"
                      onChange={(e) => {
                        let ans = e.target.value;
                        console.log(ans);
                        handlePasswordChange(ans, e);
                      }}
                      placeholder="enter your password"
                    />
                    <Form.Button
                      style={{ marginBottom: "1em" }}
                      onClick={handleSubmit}
                      type="submit"
                      color="vk"
                    >
                      Login
                    </Form.Button>
                  </Form>
                  <div style={messageSpaceStyle} id="forError">
                    {errorMessage === "" ? "" : errorMessage}
                  </div>
                </Grid.Column>
              </section>
            </Grid.Row>
          </Grid>
        </section>
      </Segment>
    </Container>
  );
};

export default LoginGabu;

