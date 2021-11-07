import React from "react";
import { Redirect } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import firebase from "firebase/app";
import "firebase/auth";

const NavBar = ({ user }) => {
  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Signing out");
        return <Redirect to="/" />;
        // Sign-out successful.
      })
      .catch(function (error) {
        console.log("Something broke");
        // An error happened.
      });
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand style={{ paddingLeft: "1rem" }} href="/awards">
        CCS Honors Awards
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/awards">Awards</Nav.Link>
          <Nav.Link href="/writeups">Writeups</Nav.Link>
          <Nav.Link href="/displayawards">Awards Table</Nav.Link>
          {user === "admin" ? (
            <Nav.Link href="/manageusers">Manage Users</Nav.Link>
          ) : null}
          <Nav.Link href="#logout" onClick={signOut}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
