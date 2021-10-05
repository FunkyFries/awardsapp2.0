import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import FormHeader from "../components/Formheader";
import StudentForm from "../components/StudentForm";
import UserForm from "../components/UserForm";
import { FooterDiv } from "../styles/manageusersstyles.js";

const ManageUsers = () => {
  const [sortedField, setSortedField] = useState("name");

  function compare(a, b) {
    if (a[sortedField] < b[sortedField]) {
      return -1;
    }
    if (a[sortedField] > b[sortedField]) {
      return 1;
    }
    return 0;
  }

  const [arrayOfStudents, setArrayOfStudents] = useState([]);
  const [arrayOfUsers, setArrayOfUsers] = useState([]);

  function addStudent(student) {
    firebase
      .database()
      .ref(`classroom/${student.classroom}/${student.id}`)
      .set({
        id: student.id,
        name: student.name,
        classroom: student.classroom,
        imageUrl: student.imageUrl,
        spiritualTheme: false,
        outstandingAchievement: false,
        wowAward: false,
        cougarCommunityService: false,
        communityServiceChosenBy: "",
        ccsWriteup: "",
        terrificKid: false,
        terrificKidChosenBy: "",
        terrificKidWriteup: "",
        threeR: "",
        threeRWriteup: "",
        acceleratedReader: false,
        words: 0,
        pastAwards: [],
      });
  }

  function updateStudent(student) {
    firebase
      .database()
      .ref(`classroom/${student.classroom}/${student.id}`)
      .update({ ...student });
  }

  function deleteStudent() {
    console.log("delete!");
  }

  function addUser(user) {
    firebase.database().ref(`users/${user.userId}`).set({
      name: user.name,
      email: user.email,
      profile_picture: user.imageUrl,
      classroom: user.classroom,
      role: user.role,
      id: user.userId,
    });
  }

  function updateUser(user) {
    firebase
      .database()
      .ref(`users/${user.id}`)
      .update({
        ...user,
      });
  }

  function deleteUser(id) {
    firebase.database().ref(`users/${id}`).remove();
  }

  useEffect(() => {
    let students;
    students = firebase.database().ref("classrooms");
    students.on("value", function (snapshot) {
      setArrayOfStudents([]);
      snapshot.forEach(function (childNodes) {
        console.log(childNodes);
      });
    });
    let users;
    users = firebase.database().ref("users");
    users.on("value", function (snapshot) {
      setArrayOfUsers([]);
      snapshot.forEach(function (childNode) {
        setArrayOfUsers((prevState) => [...prevState, childNode.val()]);
      });
    });
  }, []);

  let studentRows = arrayOfStudents
    .sort(compare)
    .map((student) => (
      <StudentForm
        key={student.id}
        id={student.id}
        name={student.name}
        teacher={student.teacher}
        image={student.image}
        handleDelete={deleteStudent}
        updateStudent={updateStudent}
      ></StudentForm>
    ));

  let userRows = arrayOfUsers.map((user) => (
    <UserForm
      key={user.id}
      id={user.id}
      name={user.name}
      email={user.email}
      role={user.role}
      userImageUrl={user.profile_picture}
      userClassroom={user.classroom}
      handleDelete={deleteUser}
      updateUser={updateUser}
    ></UserForm>
  ));

  return (
    <>
      <FormHeader
        heading="Students"
        headings={["Name", "Teacher", "Image URL"]}
        add={addStudent}
        sort={setSortedField}
      ></FormHeader>
      {studentRows}
      <FormHeader
        heading="Users"
        add={addUser}
        sort={setSortedField}
      ></FormHeader>
      {userRows}
      <FooterDiv></FooterDiv>
    </>
  );
};

export default ManageUsers;
