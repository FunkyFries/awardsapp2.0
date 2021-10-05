import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { bool, any, object } from "prop-types";
import { AuthContext } from "../index";

const ProtectedRouteHoc = ({ component: Component, ...rest }) => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) return <div>Loading...</div>;
  return (
    <Route
      {...rest}
      render={(props) =>
        user || rest.public ? (
          <Component userName={user.displayName} {...props}></Component>
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

ProtectedRouteHoc.propTypes = {
  component: any,
  isLoggedIn: bool,
  rest: object,
  props: object,
};

export default withRouter(ProtectedRouteHoc);
