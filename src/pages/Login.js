import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "../index";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { StyledLogin, StyledButton } from "../styles/loginStyles/loginStyles";

const Login = () => {
  const Auth = useContext(AuthContext);

  const SignIn = () => {
    if (!Auth.user) {
      // [START createprovider]
      var provider = new firebase.auth.OAuthProvider("microsoft.com");
      provider.setCustomParameters({
        // tenant: process.env.REACT_APP_TENANT_ID,
        tenant: "b8d96d4e-27e8-4137-9356-6641b74d35c1",
      });
      // [END createprovider]

      // [START addscopes]
      provider.addScope("User.Read");
      // [END addscopes]
      // [START signin]
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
              // console.log(result);
            })
            .catch((e) => {
              // console.log(e.message)
            });
        });
      // [END signin]
    }
  };
  return (
    <StyledLogin>
      {Auth.user ? (
        <Redirect to="/awards" />
      ) : (
        <StyledButton onClick={SignIn}>Login</StyledButton>
      )}
    </StyledLogin>
  );
};

export default withRouter(Login);
