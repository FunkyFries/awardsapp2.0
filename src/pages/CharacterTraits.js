import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import TraitForm from "../components/characterTraitForm";
import { teachers } from "../components/constants";
import {
  BackgroundDiv,
  DisplayAwardsContainer,
  StyledTable,
  TopTableHeader,
  PageBreak,
  PrintFormContainer,
} from "../styles/displayawardstyles";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CharacterTraits = ({ userName }) => {
  const [printAwardsTable, setPrintAwardsTable] = useState(false);
  const [arrayOfStudents, setArrayOfStudents] = useState([]);
  const [arrayOfElcStudents, setArrayOfElcStudents] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    let students;
    let elcStudents;
    students = firebase.database().ref("classroom");
    elcStudents = firebase.database().ref("elc");
    students.once("value", function (snapshot) {
      setArrayOfStudents([]);
      snapshot.forEach(function (childNodes) {
        childNodes.forEach(function (childNode) {
          const newEntry = { ...childNode.val() };
          setArrayOfStudents((prevState) => [...prevState, newEntry]);
        });
      });
    });
    elcStudents.once("value", function (snapshot) {
      setArrayOfElcStudents([]);
      snapshot.forEach(function (childNodes) {
        childNodes.forEach(function (childNode) {
          const newEntry = { ...childNode.val() };
          setArrayOfElcStudents((prevState) => [...prevState, newEntry]);
        });
      });
    });
    let user;
    user = firebase.database().ref(`users/${userName}`);
    user.on("value", function (snapshot) {
      setUserInfo(snapshot.val());
    });
  }, [userName]);

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  let allTeachers = [...teachers, "Omary Velez-Caraballo", "Toni DePoister"];

  const teacherOptions = allTeachers.map((teacher) => (
    <option key={teacher} value={teacher}>
      {teacher}
    </option>
  ));

  let selectedStudents;

  if (teacher !== "Omary Velez-Caraballo" && teacher !== "Toni DePoister") {
    selectedStudents = arrayOfStudents
      .filter((student) => student.classroom === teacher)
      .sort(compare);
  } else {
    selectedStudents = arrayOfElcStudents
      .filter((student) => student.classroom === teacher)
      .sort(compare);
  }

  const studentRows = selectedStudents.map((student) => (
    <TraitForm
      key={`traitForm${student.name}`}
      name={student.name}
      teacher={student.classroom}
      id={student.id}
      dbCharacterTrait={student.characterTrait}
      characterTraitVerse={student.characterTraitVerse}
    ></TraitForm>
  ));

  return (
    <>
      <BackgroundDiv className={printAwardsTable ? "" : "d-print-none"}>
        <DisplayAwardsContainer>
          <StyledTable striped>
            <thead>
              <tr>
                <TopTableHeader colSpan={4} className="d-print-none">
                  <Form.Control
                    as="select"
                    id="TeacherSelected"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                  >
                    <option value="none" defaultChecked></option>
                    {teacherOptions}
                  </Form.Control>
                </TopTableHeader>
              </tr>
            </thead>
          </StyledTable>
          <Button
            style={{
              margin: "0 auto",
              width: "16rem",
              fontFamily: "Calligraffitti",
            }}
            variant="info"
            className="d-print-none"
            onClick={() => window.print()}
          >
            Print
          </Button>
        </DisplayAwardsContainer>
      </BackgroundDiv>
      {studentRows}
    </>
  );
};

export default CharacterTraits;
