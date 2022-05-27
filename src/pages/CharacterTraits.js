import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
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
  const [userInfo, setUserInfo] = useState({});
  const [teacher, setTeacher] = useState("Angel Martin");

  useEffect(() => {
    let students;
    students = firebase.database().ref("classroom");
    students.once("value", function (snapshot) {
      setArrayOfStudents([]);
      snapshot.forEach(function (childNodes) {
        childNodes.forEach(function (childNode) {
          const newEntry = { ...childNode.val() };
          setArrayOfStudents((prevState) => [...prevState, newEntry]);
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

  const teacherOptions = teachers.map((teacher) => (
    <option value={teacher}>{teacher}</option>
  ));

  const selectedStudents = arrayOfStudents
    .filter((student) => student.classroom === teacher)
    .sort(compare);

  const studentRows = selectedStudents.map((student) => (
    <TraitForm key={`traitForm${student.name}`} name={student.name}></TraitForm>
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
