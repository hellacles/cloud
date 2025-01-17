import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import awsconfig from "./awsconfig";
Amplify.configure(awsconfig);

export default () => {
  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        slot="sign-in"
        headerText="HellaCles 관리자 페이지 입니다"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div slot="secondary-footer-content"></div>
      </AmplifySignIn>

      <div>
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
          <div>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  })}
                />
              );
            })}
          </div>
        </Router>
      </div>
    </AmplifyAuthenticator>
  );

};
