import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import FormHeader from "../components/Formheader";
import StudentForm from "../components/StudentForm";
import UserForm from "../components/UserForm";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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
  const [countUser, setCountUser] = useState("");
  const [countName, setCountName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        communityServiceChosenBy: "none",
        ccsWriteup: "",
        terrificKid: false,
        terrificKidChosenBy: "none",
        terrificKidWriteup: "",
        threeR: "none",
        threeRWriteup: "",
        acceleratedReader: false,
        words: 0,
        pastAwards: [""],
        characterTrait: "",
        characterTraitVerse: "",
      });
  }

  function updateStudent(student) {
    firebase
      .database()
      .ref(`classroom/${student.classroom}/${student.id}`)
      .update({ ...student });
  }

  function deleteStudent(teacher, id) {
    firebase.database().ref(`classroom/${teacher}/${id}`).remove();
  }

  function addUser(user) {
    firebase.database().ref(`users/${user.name}`).set({
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

  function deleteUser(name) {
    firebase.database().ref(`users/${name}`).remove();
  }

  function addCount(evt, count, name) {
    evt.preventDefault();
    evt.stopPropagation();
    firebase
      .database()
      .ref(`counts/${count}`)
      .update({
        [name]: 0,
      });
    setCountUser("");
    setCountName("");
  }

  useEffect(() => {
    let students;
    students = firebase.database().ref("classroom");
    students.once("value", function (snapshot) {
      setArrayOfStudents(Object.values(snapshot.val()));
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

  let combinedStudents = Object.assign([], ...arrayOfStudents);
  // let studentRows = combinedStudents
  //   .sort(compare)
  //   .map((student) => (
  //     <StudentForm
  //       key={student.id}
  //       id={student.id}
  //       name={student.name}
  //       teacher={student.classroom}
  //       image={student.imageUrl}
  //       handleDelete={deleteStudent}
  //       updateStudent={updateStudent}
  //     ></StudentForm>
  //   ));

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

  function resetQuarter() {
    let awardStudents = combinedStudents.filter(
      (student) =>
        student.threeR !== "none" ||
        student.spiritualTheme ||
        student.terrificKid ||
        student.outstandingAchievement ||
        student.cougarCommunityService ||
        student.wowAward ||
        student.acceleratedReader
    );

    handleClose();

    awardStudents.map((student) => {
      let newPastAward = student.pastAwards;
      if (student.pastAwards[0] === "") {
        newPastAward = [];
      }

      if (student.threeR !== "none") {
        newPastAward.push(student.threeR);
      } else if (student.spiritualTheme) {
        newPastAward.push("Unshakeable");
      } else if (student.terrificKid) {
        newPastAward.push(
          `Terrific Kid chosen by ${student.terrificKidChosenBy}`
        );
      } else if (student.outstandingAchievement) {
        newPastAward.push("Outstanding Achievement");
      } else if (student.cougarCommunityService) {
        newPastAward.push("Cougar Community Service");
      }

      if (student.wowAward) {
        newPastAward.push("Wow Award");
      }
      if (student.acceleratedReader) {
        newPastAward.push("Reader of the Quarter");
      }
      return firebase
        .database()
        .ref(`classroom/${student.classroom}/${student.id}`)
        .update({
          spiritualTheme: false,
          outstandingAchievement: false,
          wowAward: false,
          cougarCommunityService: false,
          communityServiceChosenBy: "none",
          ccsWriteup: "",
          terrificKid: false,
          terrificKidChosenBy: "none",
          terrificKidWriteup: "",
          threeR: "none",
          threeRWriteup: "",
          acceleratedReader: false,
          words: 0,
          pastAwards: newPastAward,
          characterTrait: "none",
          characterTraitVerse: "none",
        });
    });
  }

  return (
    <>
      <FormHeader
        heading="Students"
        headings={["Name", "Teacher", "Image URL"]}
        add={addStudent}
        sort={setSortedField}
      ></FormHeader>
      {/* {studentRows} */}
      <FormHeader
        heading="Users"
        add={addUser}
        sort={setSortedField}
      ></FormHeader>
      {userRows}

      <Form>
        <Form.Group className="mb-3" controlId="formCountUser">
          <Form.Label>Count User</Form.Label>
          <Form.Control
            type="text"
            value={countUser}
            onChange={(e) => setCountUser(e.target.value)}
            placeholder="Enter Count User"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCountName">
          <Form.Label>Count Name</Form.Label>
          <Form.Control
            type="text"
            value={countName}
            onChange={(e) => setCountName(e.target.value)}
            placeholder="Enter Count Name"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          onClick={(e) => addCount(e, countUser, countName)}
        >
          Submit
        </Button>
      </Form>

      <Button variant="danger" className="mt-5" onClick={handleShow}>
        Reset Quarter
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>This can't be undone!! This is not a drill!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={resetQuarter}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
      <FooterDiv></FooterDiv>
    </>
  );
};

export default ManageUsers;
