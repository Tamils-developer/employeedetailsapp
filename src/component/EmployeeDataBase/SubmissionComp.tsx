import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Label,
  Header,
  Card,
  Form,
  Button,
  Container,
  Icon,
  Step,
  Checkbox,
} from "semantic-ui-react";
import { nextMenu } from "../../reduxComp/slice";

const allMenuDetails = {
  basicDetails: false,
  contactDetails: false,
  educationalDetails: false,
  bankDetails: false,
  documentsUpload: false,
  experienceDetails: false,
  nomineeDetails: false,
  reguestForApproval: false,
  userId: false,
};

const SubmissionComp = () => {
  const dispatch = useDispatch<any>();

  const [filed, setFiled] = useState(allMenuDetails);
  const [onCheck, setOnCheck] = useState(false);

  const saveAndContinue = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const Prev = (e: any) => {
    e.preventDefault();
    dispatch(nextMenu("Nominee Details"));
  };

  return (
    <Container>
      <h2 className="ui header" style={{ color: "#2d7cfa" }}>
        <div className="content">Request for Approval</div>
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <Card.Group>
        <Card fluid raised>
          <Card.Content>
            <Card.Header
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Step.Group
                vertical
                fluid
                style={{ overflow: "auto", innerWidth: "100%" }}
              >
                <Step completed={filed.basicDetails}>
                  <Icon name="info" />
                  <Step.Content>
                    <Step.Title>Basic Details</Step.Title>
                    <Step.Description>Message</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed={filed.contactDetails}>
                  <Icon name="user" />
                  <Step.Content>
                    <Step.Title>Contact Details</Step.Title>
                    <Step.Description>Message</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed={filed.educationalDetails}>
                  <Icon name="book" />
                  <Step.Content>
                    <Step.Title>Educational Details</Step.Title>
                    <Step.Description>Message</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed={filed.bankDetails}>
                  <Icon name="dollar" />
                  <Step.Content>
                    <Step.Title>Bank Details</Step.Title>
                    <Step.Description>Message</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed={filed.documentsUpload}>
                  <Icon name="copy" />
                  <Step.Content>
                    <Step.Title>Document Upload</Step.Title>
                    <Step.Description>Message</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed={filed.experienceDetails}>
                  <Icon name="hourglass" />
                  <Step.Content>
                    <Step.Title>Work Experience</Step.Title>
                    <Step.Description>Message</Step.Description>
                  </Step.Content>
                </Step>

                <Step completed={filed.nomineeDetails}>
                  <Icon name="address card" />
                  <Step.Content>
                    <Step.Title>Nominee Details</Step.Title>
                    <Step.Description>Message</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
            </Card.Header>
          </Card.Content>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1em",
              }}
            >
              <Checkbox
                id={"check"}
                onChange={() => setOnCheck(!onCheck)}
                label="I will filed all the necessary fileds and  the details are given by myselfy"
                checked={onCheck}
              />
            </div>
          </div>

          <Card.Content extra>
            <div className="btns">
              <Button color="vk" onClick={Prev}>
                Back
              </Button>
              <Button color="vk" disabled={!onCheck}>
                Submit{" "}
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  );
};

export default SubmissionComp;
