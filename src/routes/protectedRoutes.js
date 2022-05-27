import React from "react";
import Awards from "../pages/Awards";
import Writeups from "../pages/Writeups";
import DisplayAwards from "../pages/DisplayAwards";
import ManageUsers from "../pages/ManageUsers";
import CharacterTraits from "../pages/CharacterTraits";

const protectedRoutes = [
  {
    name: "awards",
    exact: true,
    path: "/awards",
    main: (props) => <Awards {...props} />,
    public: false,
  },
  {
    name: "writeups",
    exact: true,
    path: "/writeups",
    main: (props) => <Writeups {...props} />,
    public: false,
  },
  {
    name: "displayawards",
    exact: true,
    path: "/displayawards",
    main: (props) => <DisplayAwards {...props} />,
    public: false,
  },
  {
    name: "charactertraits",
    exact: true,
    path: "/charactertraits",
    main: (props) => <CharacterTraits {...props} />,
    public: false,
  },
  {
    name: "manageusers",
    exact: true,
    path: "/manageusers",
    main: (props) => <ManageUsers {...props} />,
    public: false,
  },
];

export default protectedRoutes;
