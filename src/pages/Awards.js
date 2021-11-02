import AwardForm from "../components/awardform";
import { useEffect, useState } from "react";
import Router from "next/router";
import NavBar from "../components/navbar";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/database";
import {
  primaryTeachers,
  intermediateTeachers,
  teachers,
  bandTeachers,
  specialists,
  recessSpecialists,
} from "../components/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {
  StyledCard,
  CardImg,
  CardBody,
  CardTitle,
  TeacherHeading,
  TeacherHeadingDiv,
  StyledHr,
  BackgroundDiv,
  DueDate,
} from "../styles/awardstyles";

const Awards = ({ userName }) => {
  const [arrayOfStudents, setArrayOfStudents] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  let StudentCards = {};
  let filteredStudents = {};
  let respectStudent = [];
  let responsibilityStudent = [];
  let relationshipStudent = [];
  let spiritualThemeStudent = [];
  let outstandingStudent = [];
  let primaryCommunityServiceStudents = {};
  let intermediateCommunityServiceStudents = {};
  let primaryTerrificStudents = {};
  let intermediateTerrificStudents = [];

  useEffect(() => {
    let students;
    if (
      specialists.includes(userName) ||
      userName === "Annie Pichot" ||
      userName === "Heidi Bekken"
    ) {
      students = firebase.database().ref("classrooms");
      students.on("value", function (snapshot) {
        setArrayOfStudents([]);
        snapshot.forEach(function (childNodes) {
          console.log(childNodes);
        });
      });
    } else {
      students = firebase.database().ref(`classrooms/${userName}`);
      students.on("value", function (snapshot) {
        setArrayOfStudents([]);
        snapshot.forEach(function (childNodes) {
          console.log(childNodes);
        });
      });
    }
    let user;
    user = firebase.database().ref(`users/${userName}`);
    user.on("value", function (snapshot) {
      setUserInfo(snapshot.val());
    });
  }, [userName]);

  // Filter students assigned to teacher
  if (userInfo.role === "teacher" && arrayOfStudents) {
    respectStudent = arrayOfStudents.filter((student) =>
      student.threeR.includes("Respect")
    );
    responsibilityStudent = arrayOfStudents.filter((student) =>
      student.threeR.includes("Responsibility")
    );
    relationshipStudent = arrayOfStudents.filter((student) =>
      student.threeR.includes("Relationship")
    );
    spiritualThemeStudent = arrayOfStudents.filter(
      (student) => student.allInAward
    );
    outstandingStudent = arrayOfStudents.filter(
      (student) => student.outstandingAchievement
    );
  } else if (userInfo.role && arrayOfStudents) {
    recessSpecialists.forEach((specialist) => {
      primaryCommunityServiceStudents[specialist] = arrayOfStudents.filter(
        (student) =>
          student.cougarCommunityService &&
          primaryTeachers.includes(student.classroom) &&
          student.communityServiceChosenBy === specialist
      );
      intermediateCommunityServiceStudents[specialist] = arrayOfStudents.filter(
        (student) =>
          student.cougarCommunityService &&
          intermediateTeachers.includes(student.classroom) &&
          student.communityServiceChosenBy === specialist
      );
    });
    specialists.forEach((specialist) => {
      primaryTerrificStudents[specialist] = arrayOfStudents.filter(
        (student) =>
          student.terrificKid &&
          primaryTeachers.includes(student.classroom) &&
          student.terrificKidChosenBy === specialist
      );

      intermediateTerrificStudents[specialist] = arrayOfStudents.filter(
        (student) =>
          student.terrificKid &&
          primaryTeachers.indexOf(student.classroom) === -1 &&
          student.terrificKidChosenBy === specialist
      );
    });
  }

  const [respectStudents, setRespectStudents] = useState(respectStudent);
  const [disableRespect, setDisableRespect] = useState(
    respectStudents.length > 0
  );

  const [responsibilityStudents, setResponsibilityStudents] = useState(
    responsibilityStudent
  );
  const [disableResponsibility, setDisableResponsibility] = useState(
    responsibilityStudents.length > 0
  );

  const [relationshipStudents, setRelationshipStudents] =
    useState(relationshipStudent);
  const [disableRelationship, setDisableRelationship] = useState(
    relationshipStudents.length > 0
  );

  const [spiritualThemeStudents, setSpiritualThemeStudents] = useState(
    spiritualThemeStudent
  );
  const [disableSpiritualTheme, setDisableSpiritualTheme] = useState(
    spiritualThemeStudents.length > 0
  );

  const [outstandingStudents, setOutstandingStudents] =
    useState(outstandingStudent);
  const [disableOutstanding, setDisableOutstanding] = useState(
    outstandingStudents.length > 0
  );

  const [primaryCommunityStudents, setPrimaryCommunityStudents] = useState(
    primaryCommunityServiceStudents
  );
  const [disablePrimaryCommunity, setDisablePrimaryCommunity] = useState(
    primaryCommunityStudents[userName]
      ? primaryCommunityStudents[userName].length > 0
      : null
  );

  const [intermediateCommunityStudents, setIntermediateCommunityStudents] =
    useState(intermediateCommunityServiceStudents);
  const [disableIntermediateCommunity, setDisableIntermediateCommunity] =
    useState(
      intermediateCommunityStudents[userName]
        ? intermediateCommunityStudents[userName].length > 0
        : null
    );

  const [primaryTerrificKids, setPrimaryTerrificKids] = useState(
    primaryTerrificStudents
  );
  const [disableTerrificPrimary, setDisableTerrificPrimary] = useState(
    primaryTerrificKids[userName]
      ? primaryTerrificKids[userName].length > 1
      : null
  );
  const [intermediateTerrificKids, setIntermediateTerrificKids] = useState(
    intermediateTerrificStudents
  );
  const [disableTerrificIntermediate, setDisableTerrificIntermediate] =
    useState(
      intermediateTerrificKids[userName]
        ? intermediateTerrificKids[userName].length > 1
        : null
    );

  function handleRespectUpdate(id) {
    let array = respectStudents;
    let array2 = responsibilityStudents;
    let array3 = relationshipStudents;
    if (array2.indexOf(id) !== -1) {
      array2.splice(0, 1);
      setDisableResponsibility(false);
      setResponsibilityStudents(array2);
    }
    if (array3.indexOf(id) !== -1) {
      array3.splice(0, 1);
      setDisableRelationship(false);
      setRelationshipStudents(array3);
    }
    array.push(id);
    setDisableRespect(true);
    setRespectStudents(array);
  }

  function handleResponsibilityUpdate(id) {
    let array = responsibilityStudents;
    let array1 = respectStudents;
    let array3 = relationshipStudents;
    if (array1.indexOf(id) !== -1) {
      array1.splice(0, 1);
      setDisableRespect(false);
      setRespectStudents(array1);
    }
    if (array3.indexOf(id) !== -1) {
      array3.splice(0, 1);
      setDisableRelationship(false);
      setRelationshipStudents(array3);
    }
    array.push(id);
    setDisableResponsibility(true);
    setResponsibilityStudents(array);
  }

  function handleRelationshipUpdate(id) {
    let array = relationshipStudents;
    let array1 = respectStudents;
    let array2 = responsibilityStudents;
    if (array1.indexOf(id) !== -1) {
      array1.splice(0, 1);
      setDisableRespect(false);
      setRespectStudents(array1);
    }
    if (array2.indexOf(id) !== -1) {
      array2.splice(0, 1);
      setDisableResponsibility(false);
      setResponsibilityStudents(array2);
    }
    array.push(id);
    setDisableRelationship(true);
    setRelationshipStudents(array);
  }

  function handleNoneUpdate(id) {
    let array1 = respectStudents;
    let array2 = responsibilityStudents;
    let array3 = relationshipStudents;
    if (array1.indexOf(id) !== -1) {
      array1.splice(0, 1);
      setDisableRespect(false);
      setRespectStudents(array1);
    }
    if (array2.indexOf(id) !== -1) {
      array2.splice(0, 1);
      setDisableResponsibility(false);
      setResponsibilityStudents(array2);
    }
    if (array3.indexOf(id) !== -1) {
      array3.splice(0, 1);
      setDisableRelationship(false);
      setRelationshipStudents(array3);
    }
  }

  function handleAllInUpdate(id) {
    let array = spiritualThemeStudents;
    let matchingIndex = array.indexOf(id);
    if (matchingIndex !== -1) {
      array.splice(matchingIndex, 1);
      setDisableSpiritualTheme(false);
      setSpiritualThemeStudents(array);
    } else {
      array.push(id);
      setDisableSpiritualTheme(true);
      setSpiritualThemeStudents(array);
    }
  }

  function handleOutstandingUpdate(id) {
    let array = outstandingStudents;
    let matchingIndex = array.indexOf(id);
    if (matchingIndex !== -1) {
      array.splice(matchingIndex, 1);
      setDisableOutstanding(false);
      setOutstandingStudents(array);
    } else {
      array.push(id);
      setDisableOutstanding(true);
      setOutstandingStudents(array);
    }
  }

  function handlePrimaryCommunityServiceUpdate(id) {
    let obj = primaryCommunityStudents;
    let matchingIndex = obj[userName].indexOf(id);
    if (matchingIndex !== -1) {
      obj[userName].splice(matchingIndex, 1);
      setDisablePrimaryCommunity(false);
      setPrimaryCommunityStudents(obj);
    } else {
      obj[userName].push(id);
      setDisablePrimaryCommunity(true);
      setPrimaryCommunityStudents(obj);
    }
  }

  function handleIntermediateCommunityServiceUpdate(id) {
    let obj = intermediateCommunityStudents;
    let matchingIndex = obj[userName].indexOf(id);
    if (matchingIndex !== -1) {
      obj[userName].splice(matchingIndex, 1);
      setDisableIntermediateCommunity(false);
      setIntermediateCommunityStudents(obj);
    } else {
      obj[userName].push(id);
      setDisableIntermediateCommunity(true);
      setIntermediateCommunityStudents(obj);
    }
  }

  function handlePrimaryTerrificKidUpdate(id) {
    let obj = primaryTerrificKids;
    let matchingIndex = obj[userName].indexOf(id);
    if (matchingIndex !== -1) {
      obj[userName].splice(matchingIndex, 1);
      setDisableTerrificPrimary(false);
      setPrimaryTerrificKids(obj);
    } else if (obj[userName].length > 1) {
      setDisableTerrificPrimary(true);
    } else {
      obj[userName].push(id);
      setPrimaryTerrificKids(obj);
    }
  }

  function handleIntermediateTerrificKidUpdate(id) {
    let obj = intermediateTerrificKids;
    let matchingIndex = obj[user].indexOf(id);
    if (matchingIndex !== -1) {
      obj[user].splice(matchingIndex, 1);
      setDisableTerrificIntermediate(false);
      setIntermediateTerrificKids(obj);
    } else {
      obj[user].push(id);
      obj[user].length > 1 ? setDisableTerrificIntermediate(true) : null;
      setIntermediateTerrificKids(obj);
    }
  }

  // Generate StudentCards for each teacher
  for (const teacher in filteredStudents) {
    StudentCards[teacher] = filteredStudents[teacher].map((student) => {
      return (
        <StyledCard key={student.id}>
          <CardImg src={student.image} />
          <CardBody>
            <CardTitle>{student.name}</CardTitle>
            <AwardForm
              id={student.id}
              setRespectStudents={handleRespectUpdate}
              disableRespect={disableRespect}
              setResponsibilityStudents={handleResponsibilityUpdate}
              disableResponsibility={disableResponsibility}
              setRelationshipStudents={handleRelationshipUpdate}
              disableRelationship={disableRelationship}
              handleNoneUpdate={handleNoneUpdate}
              setAllInStudents={handleAllInUpdate}
              disableAllIn={disableSpiritualTheme}
              setOutstandingStudents={handleOutstandingUpdate}
              disableOutstanding={disableOutstanding}
              teacher={student.classroom}
              allInAward={student.allInAward}
              outstandingAchievement={student.outstandingAchievement}
              wowAward={student.wowAward}
              cougarCommunityService={student.cougarCommunityService}
              communityServiceChosenBy={student.communityServiceChosenBy}
              handlePrimaryCommunityServiceUpdate={
                handlePrimaryCommunityServiceUpdate
              }
              disablePrimaryCommunity={disablePrimaryCommunity}
              handleIntermediateCommunityServiceUpdate={
                handleIntermediateCommunityServiceUpdate
              }
              disableIntermediateCommunity={disableIntermediateCommunity}
              terrificKid={student.terrificKid}
              terrificKidChosenBy={student.terrificKidChosenBy}
              handlePrimaryTerrificKidUpdate={handlePrimaryTerrificKidUpdate}
              disableTerrificPrimary={disableTerrificPrimary}
              handleIntermediateTerrificKidUpdate={
                handleIntermediateTerrificKidUpdate
              }
              disableTerrificIntermediate={disableTerrificIntermediate}
              acceleratedReader={student.acceleratedReader}
              words={student.words}
              threeR={student.threeR}
              userName={userName}
              role={userInfo.role}
              pastAwards={student.pastAwards}
            />
          </CardBody>
        </StyledCard>
      );
    });
  }

  const BandClasses = bandTeachers.map((teacher) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div key={teacher}>
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle
            as={TeacherHeadingDiv}
            eventKey="0"
            onClick={() => setCollapsed(!collapsed)}
          >
            <TeacherHeading>{teacher}</TeacherHeading>
            {collapsed ? (
              <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            )}
          </Accordion.Toggle>
          <StyledHr />
          <Accordion.Collapse eventKey="0">
            <>{StudentCards[teacher]}</>
          </Accordion.Collapse>
        </Accordion>
      </div>
    );
  });

  const AllClasses = teachers.map((teacher) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div key={teacher}>
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle
            as={TeacherHeadingDiv}
            eventKey="0"
            onClick={() => setCollapsed(!collapsed)}
          >
            <TeacherHeading>{teacher}</TeacherHeading>
            {collapsed ? (
              <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            )}
          </Accordion.Toggle>
          <StyledHr />
          <Accordion.Collapse eventKey="0">
            <>{StudentCards[teacher]}</>
          </Accordion.Collapse>
        </Accordion>
      </div>
    );
  });

  const SingleClass = (
    <div>
      <TeacherHeading>{user}</TeacherHeading>
      {StudentCards[user]}
    </div>
  );

  let Classes = role === "teacher" ? SingleClass : AllClasses;

  if (role === "teacher") {
    Classes = SingleClass;
  } else if (user === "Mr. Neptun") {
    Classes = BandClasses;
  } else {
    Classes = AllClasses;
  }

  // if (moment().isBefore("2020-01-27", "day") && role === "teacher") {
  //   Classes = <DueDate>Awards Will Open January 28th</DueDate>;
  // }
  // if (moment().isBefore("2020-01-30", "day") && role === "specialist") {
  //   Classes = <DueDate>Awards Will Open January 31st</DueDate>;
  // }

  return (
    <>
      <NavBar path="/awards" role={role}></NavBar>
      {/* {role === "teacher" && moment().isAfter("2020-01-27") ? (
        <DueDate>Due January 31st</DueDate>
      ) : null}
      {role === "specialist" && moment().isAfter("2020-01-31") ? (
        <DueDate>Due February 3rd</DueDate>
      ) : null} */}
      <BackgroundDiv>{Classes}</BackgroundDiv>
    </>
  );
};

export default Awards;
