import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import ArCertificate from "../components/arcertificate";
import ThreeRCertificate from "../components/threeRcertificate";
import OutstandingCertificate from "../components/outstandingcertificate";
import CommunityServiceCertificate from "../components/communityservicecertificate";
import AllInCertificate from "../components/allincertificate";
import WowCertificate from "../components/wowcertificate";
import TerrificKidCertificate from "../components/terrifickidcertificate";
import Button from "react-bootstrap/Button";
import {
  teachers,
  primaryTeachers,
  intermediateTeachers,
  specialists,
  determineGrade,
  currentQuarter,
} from "../components/constants";
import {
  BackgroundDiv,
  DisplayAwardsContainer,
  StyledTable,
  TopTableHeader,
  TableHeader,
  ArAwardsHeader,
  PageBreak,
  PrintFormContainer,
} from "../styles/displayawardstyles";
import Form from "react-bootstrap/Form";

const DisplayAwards = ({ userName }) => {
  const [printThreeR, setPrintThreeR] = useState(true);
  const [printAllIn, setPrintAllIn] = useState(true);
  const [printOutstanding, setPrintOutstanding] = useState(true);
  const [printWow, setPrintWow] = useState(true);
  const [printCommunityService, setPrintCommunityService] = useState(true);
  const [printTerrific, setPrintTerrific] = useState(true);
  const [printAR, setPrintAR] = useState(true);
  const [printAwardsTable, setPrintAwardsTable] = useState(false);
  const [arrayOfStudents, setArrayOfStudents] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let students;
    students = firebase.database().ref("classroom");
    students.on("value", function (snapshot) {
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

  const compare = (sortProperty) => (a, b) => {
    if (a[sortProperty] < b[sortProperty]) {
      return -1;
    }
    if (a[sortProperty] > b[sortProperty]) {
      return 1;
    }
    return 0;
  };

  const threeRstudents = arrayOfStudents
    .filter((student) => student.threeR !== "none")
    .sort(compare("classroom"));

  const terrificStudents = arrayOfStudents
    .filter((student) => student.terrificKid)
    .sort(compare("terrificKidChosenBy"));

  const ARstudents = arrayOfStudents.filter(
    (student) => student.acceleratedReader
  );

  const spiritualThemeStudents = arrayOfStudents.filter(
    (student) => student.spiritualTheme
  );

  const outstandingStudents = arrayOfStudents.filter(
    (student) => student.outstandingAchievement
  );

  const communityServiceStudents = arrayOfStudents.filter(
    (student) => student.cougarCommunityService
  );

  const wowStudents = arrayOfStudents
    .filter((student) => student.wowAward)
    .sort(compare("teacher"));

  // Create Cougar Awards Table
  const teacherRows = teachers.map((teacher) => {
    let relationshipStudent = threeRstudents.find(
      (student) =>
        student.classroom === teacher &&
        student.threeR === `Relationship - ${currentQuarter()}`
    );
    let relationship;
    if (relationshipStudent) {
      relationship = relationshipStudent.name;
    }

    let respectStudent = threeRstudents.find(
      (student) =>
        student.classroom === teacher &&
        student.threeR === `Respect - ${currentQuarter()}`
    );
    let respect;
    if (respectStudent) {
      respect = respectStudent.name;
    }

    let responsibilityStudent = threeRstudents.find(
      (student) =>
        student.classroom === teacher &&
        student.threeR === `Responsibility - ${currentQuarter()}`
    );
    let responsibility;
    if (responsibilityStudent) {
      responsibility = responsibilityStudent.name;
    }

    let spiritualThemeStudent = spiritualThemeStudents.find(
      (student) => student.classroom === teacher && student.spiritualTheme
    );
    let spiritualTheme;
    if (spiritualThemeStudent) {
      spiritualTheme = spiritualThemeStudent.name;
    }

    let oustandingStudent = outstandingStudents.find(
      (student) =>
        student.classroom === teacher && student.outstandingAchievement
    );
    let outstanding;
    if (oustandingStudent) {
      outstanding = oustandingStudent.name;
    }

    // Add Terrific Kid, Community Service, and AR awards to teacher table for printing

    let terrificKids = terrificStudents.filter(
      (student) => student.classroom === teacher
    );
    let terrific = (
      <>
        <td></td>
        <td></td>
      </>
    );
    if (terrificKids.length === 3) {
      terrific = (
        <>
          <td>{terrificKids[0].name}</td>
          <td>{terrificKids[1].name}</td>
          <td>{terrificKids[2].name}</td>
        </>
      );
    }
    if (terrificKids.length === 2) {
      terrific = (
        <>
          <td>{terrificKids[0].name}</td>
          <td>{terrificKids[1].name}</td>
        </>
      );
    } else if (terrificKids.length === 1) {
      terrific = (
        <>
          <td>{terrificKids[0].name}</td>
          <td></td>
        </>
      );
    }

    let communityKid = communityServiceStudents.find(
      (student) => student.classroom === teacher
    );
    let community;
    if (communityKid) {
      community = communityKid.name;
    }

    let arKid = ARstudents.find((student) => student.classroom === teacher);
    let ar;
    if (arKid) {
      ar = arKid.name;
    }

    return (
      <tr key={teacher}>
        <td>{teacher}</td>
        <td>{relationship}</td>
        <td>{respect}</td>
        <td>{responsibility}</td>
        <td>{spiritualTheme}</td>
        <td>{outstanding}</td>
        {terrific}
        <td>{community}</td>
        <td>{ar}</td>
      </tr>
    );
  });

  // Create Terrific Kid Table
  const specialistRows = specialists.map((specialist) => {
    let terrificKids = terrificStudents.filter(
      (student) => student.terrificKidChosenBy === specialist
    );
    let primary;
    if (terrificKids) {
      primary = terrificKids.filter((student) =>
        primaryTeachers.includes(student.classroom)
      );
    }
    let primaryColumns = (
      <>
        <td></td>
        <td></td>
      </>
    );
    if (primary.length === 2) {
      primaryColumns = (
        <>
          <td>{primary[0].name}</td>
          <td>{primary[1].name}</td>
        </>
      );
    }
    if (primary.length === 1) {
      primaryColumns = (
        <>
          <td>{primary[0].name}</td>
          <td></td>
        </>
      );
    }

    let intermediate;
    if (terrificKids) {
      intermediate = terrificKids.filter((student) =>
        intermediateTeachers.includes(student.classroom)
      );
    }

    let intermediateColumns = (
      <>
        <td></td>
        <td></td>
      </>
    );
    if (intermediate.length === 2) {
      intermediateColumns = (
        <>
          <td>{intermediate[0].name}</td>
          <td>{intermediate[1].name}</td>
        </>
      );
    }
    if (intermediate.length === 1) {
      intermediateColumns = (
        <>
          <td>{intermediate[0].name}</td>
          <td></td>
        </>
      );
    }

    return (
      <tr key={specialist}>
        <td>{specialist}</td>
        {primaryColumns}
        {intermediateColumns}
      </tr>
    );
  });

  // Create Community Service Table
  const communityServiceRows = ["Mrs. Raab & Mrs. Zaharevich"].map(
    (specialist) => {
      let ccsKids = communityServiceStudents.filter(
        (student) => student.communityServiceChosenBy === specialist
      );
      let primary;
      let intermediate;
      if (ccsKids) {
        primary = ccsKids.filter((student) =>
          primaryTeachers.includes(student.classroom)
        );
        intermediate = ccsKids.filter((student) =>
          intermediateTeachers.includes(student.classroom)
        );
      }
      let primaryColumn = (
        <>
          <td></td>
        </>
      );
      if (primary.length === 1) {
        primaryColumn = (
          <>
            <td>{primary[0].name}</td>
          </>
        );
      }

      let intermediateColumn = (
        <>
          <td></td>
        </>
      );
      if (intermediate.length === 1) {
        intermediateColumn = (
          <>
            <td>{intermediate[0].name}</td>
          </>
        );
      }

      return (
        <tr key={specialist}>
          <td>{specialist}</td>
          {primaryColumn}
          {intermediateColumn}
        </tr>
      );
    }
  );

  // Create AR Awards Table
  const ARhonorsRows = teachers.map((teacher) => {
    let ARbyTeacher = ARstudents.filter(
      (student) => student.classroom === teacher
    );
    if (ARbyTeacher.length > 0) {
      let grade = determineGrade(teacher);
      return (
        <tr key={grade}>
          <td>{grade}</td>
          <td>{ARbyTeacher[0].name}</td>
        </tr>
      );
    } else {
      return null;
    }
  });

  // Create Wow Awards Table
  const wowAwardsRows = intermediateTeachers.map((teacher) => {
    let wowAwardsByTeacher = wowStudents.filter(
      (student) => student.classroom === teacher
    );
    let rows = [];
    if (wowAwardsByTeacher.length > 0) {
      let numRows = Math.ceil(wowAwardsByTeacher.length / 4);
      for (let i = 0; i < numRows * 4; i += 4) {
        rows.push(
          <tr key={`${teacher}, ${i}`}>
            <td>{i > 0 ? null : teacher}</td>
            <td>{wowAwardsByTeacher[i].name}</td>
            <td>
              {wowAwardsByTeacher[i + 1]
                ? wowAwardsByTeacher[i + 1].name
                : null}
            </td>
            <td>
              {wowAwardsByTeacher[i + 2]
                ? wowAwardsByTeacher[i + 2].name
                : null}
            </td>
            <td>
              {wowAwardsByTeacher[i + 3]
                ? wowAwardsByTeacher[i + 3].name
                : null}
            </td>
          </tr>
        );
      }
    }
    return rows;
  });
  return (
    <>
      {printThreeR ? (
        <ThreeRCertificate
          currentQuarter={currentQuarter()}
          students={threeRstudents}
        />
      ) : null}
      {printAllIn ? (
        <AllInCertificate
          currentQuarter={currentQuarter()}
          students={spiritualThemeStudents}
        ></AllInCertificate>
      ) : null}
      {printOutstanding ? (
        <OutstandingCertificate
          students={outstandingStudents}
          currentQuarter={currentQuarter()}
        />
      ) : null}
      {printTerrific ? (
        <TerrificKidCertificate
          students={terrificStudents}
          currentQuarter={currentQuarter()}
        ></TerrificKidCertificate>
      ) : null}
      {printCommunityService ? (
        <CommunityServiceCertificate
          students={communityServiceStudents}
          currentQuarter={currentQuarter()}
        />
      ) : null}
      {printWow ? (
        <WowCertificate
          students={wowStudents}
          currentQuarter={currentQuarter()}
        />
      ) : null}
      {printAR ? (
        <ArCertificate
          students={ARstudents}
          currentQuarter={currentQuarter()}
        />
      ) : null}
      <BackgroundDiv className={printAwardsTable ? "" : "d-print-none"}>
        <DisplayAwardsContainer>
          {userInfo.role === "admin" ? (
            <PrintFormContainer>
              <Form
                style={{
                  margin: "1rem auto",
                  textAlign: "left",
                  fontFamily: "Noto Sans",
                }}
                className="d-print-none"
              >
                <Form.Check
                  type="checkbox"
                  label="Three R Certificates"
                  id="printThreeRCertificates"
                  onChange={() => setPrintThreeR(!printThreeR)}
                  checked={printThreeR}
                />
                <Form.Check
                  type="checkbox"
                  label="Spiritual Theme Certificates"
                  id="printAllInCertificates"
                  onChange={() => setPrintAllIn(!printAllIn)}
                  checked={printAllIn}
                />
                <Form.Check
                  type="checkbox"
                  label="Outstanding Certificates"
                  id="printOutstandingCertificates"
                  onChange={() => setPrintOutstanding(!printOutstanding)}
                  checked={printOutstanding}
                />
                {wowStudents.length > 0 ? (
                  <Form.Check
                    type="checkbox"
                    label="Wow Certificates"
                    id="printWowCertificates"
                    onChange={() => setPrintWow(!printWow)}
                    checked={printWow}
                  />
                ) : null}
                <Form.Check
                  type="checkbox"
                  label="Terrific Kid Certificates"
                  id="printTerrificKidCertificates"
                  onChange={() => setPrintTerrific(!printTerrific)}
                  checked={printTerrific}
                />
                <Form.Check
                  type="checkbox"
                  label="Community Service Certificates"
                  id="printCommunityServiceCertificates"
                  onChange={() =>
                    setPrintCommunityService(!printCommunityService)
                  }
                  checked={printCommunityService}
                />
                <Form.Check
                  type="checkbox"
                  label="AR Certificates"
                  id="printArCertificates"
                  onChange={() => setPrintAR(!printAR)}
                  checked={printAR}
                />
                <Form.Check
                  type="checkbox"
                  label="Awards Table"
                  id="printAwardsTable"
                  onChange={() => setPrintAwardsTable(!printAwardsTable)}
                  checked={printAwardsTable}
                />
              </Form>
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
            </PrintFormContainer>
          ) : null}
          <StyledTable striped>
            <thead>
              <tr>
                <TopTableHeader colSpan={10} className="d-print-none">
                  Cougar Awards
                </TopTableHeader>
              </tr>
              <tr>
                <th>Teacher</th>
                <th>Relationship</th>
                <th>Respect</th>
                <th>Responsibility</th>
                <th>Unshakeable</th>
                <th>Oustanding Achievement</th>
                <th colSpan={2}>Terrific Kid</th>
                <th>Community Service</th>
                <th>AR</th>
              </tr>
            </thead>
            <tbody>{teacherRows}</tbody>
          </StyledTable>
          <PageBreak></PageBreak>
          <StyledTable striped className="d-print-none">
            <thead>
              <tr>
                <TableHeader colSpan={5}>Terrific Kid Award</TableHeader>
              </tr>
              <tr>
                <th>Teacher</th>
                <th colSpan={2}>Primary Recipient</th>
                <th colSpan={2}>Intermediate Recipient</th>
              </tr>
            </thead>
            <tbody>{specialistRows}</tbody>
          </StyledTable>
          <StyledTable striped className="d-print-none">
            <thead>
              <tr>
                <TableHeader colSpan={4}>Community Service Award</TableHeader>
              </tr>
              <tr>
                <th>Teacher</th>
                <th colSpan={1}>Primary Recipient</th>
                <th colSpan={2}>Intermediate Recipient</th>
              </tr>
            </thead>
            <tbody>{communityServiceRows}</tbody>
          </StyledTable>
          <StyledTable striped className="d-print-none">
            <thead>
              <tr>
                <TableHeader colSpan={2}>AR Awards</TableHeader>
              </tr>
              <tr>
                <ArAwardsHeader>Grade</ArAwardsHeader>
                <ArAwardsHeader>Recipient</ArAwardsHeader>
              </tr>
            </thead>
            <tbody>{ARhonorsRows}</tbody>
          </StyledTable>
          {wowStudents.length > 0 ? (
            <>
              <PageBreak></PageBreak>
              <StyledTable striped>
                <thead>
                  <tr>
                    <TableHeader colSpan={5}>Wow Awards</TableHeader>
                  </tr>
                  <tr>
                    <th colSpan={1}>Teacher</th>
                    <th colSpan={4}>Recipients</th>
                  </tr>
                </thead>
                <tbody>{wowAwardsRows}</tbody>
              </StyledTable>
            </>
          ) : null}
        </DisplayAwardsContainer>
      </BackgroundDiv>
    </>
  );
};

export default DisplayAwards;
