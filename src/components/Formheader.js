import React from "react";
import NewStudentForm from "./NewStudentForm";
import NewUserForm from "./NewUserForm";
import {
  FormHeaderContainer,
  HeadingRow,
  StudentHeading,
  UserHeading,
} from "../styles/formheaderstyles";

const FormHeader = ({ heading, add, sort }) => {
  return (
    <FormHeaderContainer>
      <HeadingRow>
        {heading === "Students" ? (
          <>
            <StudentHeading>{heading}</StudentHeading>
            <NewStudentForm addStudent={add} />
          </>
        ) : (
          <>
            <UserHeading>{heading}</UserHeading>
            <NewUserForm addUser={add} />
          </>
        )}
      </HeadingRow>
    </FormHeaderContainer>
  );
};

export default FormHeader;
