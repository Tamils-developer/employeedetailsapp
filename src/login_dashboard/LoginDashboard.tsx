import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import DashboardHeader from "../dashboard_header/DashboardHeader";
import "./LoginDashboard.css";

const LoginDashboard = () => {
  return (
    <div className="main">
      <Grid container stackable>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment
              style={{
                backgroundColor: "#2a2a72",
                backgroundImage:
                  "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
              }}
              size="massive"
              className="seg-width"
              inverted
              as={NavLink}
              to="/employeedatabase"
            >
              Employee Data Base
            </Segment>
            {/* <Link to={''}>Employee Data Base</Link> */}
          </Grid.Column>
          <Grid.Column>
            <Segment
              style={{
                backgroundColor: "#2a2a72",
                backgroundImage:
                  "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
              }}
              size="massive"
              className="seg-width"
              inverted
            >
              Reimbursement Tracking
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment
              style={{
                backgroundColor: "#2a2a72",
                backgroundImage:
                  "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
              }}
              size="massive"
              className="seg-width"
              inverted
            >
              Check Your Pay
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment
              style={{
                backgroundColor: "#2a2a72",
                backgroundImage:
                  "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
              }}
              size="massive"
              className="seg-width"
              inverted
            >
              HR System
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment
              style={{
                backgroundColor: "#2a2a72",
                backgroundImage:
                  "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
              }}
              size="massive"
              className="seg-width"
              inverted
            >
              Finance System
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment
              style={{
                backgroundColor: "#2a2a72",
                backgroundImage:
                  "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
              }}
              size="massive"
              className="seg-width"
              inverted
              as={NavLink}
              to="/timeSheet"
            >
              Time Sheet and vacation
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default LoginDashboard;
