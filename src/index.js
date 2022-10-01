import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "./auth";
import ProtectedRouteHoc from "./components/ProtectedRouteHoc";
import protectedRoutes from "./routes/protectedRoutes";
import Login from "./pages/Login";
import NavBar from "./components/Navbar";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {user !== null ? (
        <NavBar user={user} isLoading={isLoading}></NavBar>
      ) : null}
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login></Login>
            </Route>
            {protectedRoutes.map((route) => (
              <ProtectedRouteHoc
                key={route.path}
                path={route.path}
                component={route.main}
                exact={route.exact}
                public={route.public}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
