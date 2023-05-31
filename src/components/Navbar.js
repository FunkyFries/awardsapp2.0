import React from "react";
import { Redirect } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { getAuth, signOut } from "firebase/auth";

const NavBar = ({ user }) => {
  const auth = getAuth();
  function logoff() {
    signOut(auth)
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
    <Navbar bg="light" expand="lg" sticky="top" className="d-print-none">
      <Navbar.Brand style={{ paddingLeft: "1rem" }} href="/awards">
        CCS Honors Awards
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/awards">Awards</Nav.Link>
          <Nav.Link href="/writeups">Writeups</Nav.Link>
          <Nav.Link href="/displayawards">Awards Table</Nav.Link>
          <Nav.Link href="/charactertraits">Character Traits</Nav.Link>
          {user === "admin" ? (
            <Nav.Link href="/manageusers">Manage Users</Nav.Link>
          ) : null}
          <Nav.Link href="#logout" onClick={logoff}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
