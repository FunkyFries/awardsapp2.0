import { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import firebase from "firebase/app";
import "firebase/database";
import {
  teachers,
  bandTeachers,
  specialists,
  currentQuarter,
  generateCard,
} from "../components/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {
  TeacherHeading,
  TeacherHeadingDiv,
  StyledHr,
  BackgroundDiv,
  // DueDate,
} from "../styles/awardstyles";

const Awards = ({ userName }) => {
  if (userName === "Kim Carroll") {
    userName = "Kim Pederson";
  }
  if (userName === "Breanne Jeffries") {
    userName = "Bre Jeffries";
  }
  const [arrayOfStudents, setArrayOfStudents] = useState([]);
  const [objectOfStudents, setObjectOfStudents] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [collapsed, setCollapsed] = useState({
    "Angel Martin": true,
    "Kaitlyn Johnson": true,
    "Jamie Estep": true,
    "Kristal Weber": true,
    "Annalisa Lang": true,
    "Kellie Terpstra": true,
    "Kim Pederson": true,
    "Trista Haberman": true,
    "Claude Kranik": true,
    "Kabrina Kidd": true,
    "Nathan Lenhart": true,
    "Michelle Medina": true,
    "Kristin Helle": true,
    "Kelly Kidd": true,
  });
  let StudentCards = {};
  const [disableRespect, setDisableRespect] = useState(false);
  const [disableResponsibility, setDisableResponsibility] = useState(false);
  const [disableRelationship, setDisableRelationship] = useState(false);
  const [disableSpiritualTheme, setDisableSpiritualTheme] = useState(false);
  const [disableOutstanding, setDisableOutstanding] = useState(false);
  const [intermediateTerrificCount, setIntermediateTerrificCount] = useState(0);
  const [primaryTerrificCount, setPrimaryTerrificCount] = useState(0);
  const [disableTerrificIntermediate, setDisableTerrificIntermediate] =
    useState(false);
  const [disableTerrificPrimary, setDisableTerrificPrimary] = useState(false);
  const [intermediateCommunityCount, setIntermediateCommunityCount] =
    useState(0);
  const [primaryCommunityCount, setPrimaryCommunityCount] = useState(0);
  const [disableCommunityIntermediate, setDisableCommunityIntermediate] =
    useState(false);
  const [disableCommunityPrimary, setDisableCommunityPrimary] = useState(false);

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    let students;
    if (
      specialists.includes(userName) ||
      userName === "Lydia Raab" ||
      userName === "RaeLynn Zaharevich" ||
      userName === "Annie Pichot" ||
      userName === "Heidi Bekken" ||
      userName === "Jamaica Mulhern"
    ) {
      students = firebase.database().ref("classroom");
      students.on("value", function (snapshot) {
        setObjectOfStudents(snapshot.val());
      });
      firebase
        .database()
        .ref("counts/cougarCommunityService")
        .on("value", function (snapshot) {
          setPrimaryCommunityCount(snapshot.val().primary);
          setIntermediateCommunityCount(snapshot.val().intermediate);
        });
      if (specialists.includes(userName)) {
        firebase
          .database()
          .ref(`counts/${userName}`)
          .on("value", function (snapshot) {
            setIntermediateTerrificCount(snapshot.val().intermediateTerrific);
            setPrimaryTerrificCount(snapshot.val().primaryTerrific);
          });
      }
    } else {
      students = firebase.database().ref(`classroom/${userName}`);
      students.on("value", function (snapshot) {
        setArrayOfStudents([]);
        setDisableRespect(false);
        setDisableResponsibility(false);
        setDisableRelationship(false);
        setDisableSpiritualTheme(false);
        setDisableOutstanding(false);
        snapshot.forEach(function (childNodes) {
          const newEntry = { ...childNodes.val() };
          setArrayOfStudents((prevState) => [...prevState, newEntry]);

          // Disable Awards
          if (childNodes.val().threeR === `Respect - ${currentQuarter()}`) {
            setDisableRespect(true);
          }
          if (
            childNodes.val().threeR === `Responsibility - ${currentQuarter()}`
          ) {
            setDisableResponsibility(true);
          }
          if (
            childNodes.val().threeR === `Relationship - ${currentQuarter()}`
          ) {
            setDisableRelationship(true);
          }
          if (childNodes.val().spiritualTheme) {
            setDisableSpiritualTheme(true);
          }
          if (childNodes.val().outstandingAchievement) {
            setDisableOutstanding(true);
          }
        });
      });
    }
    let user;
    user = firebase.database().ref(`users/${userName}`);
    user.on("value", function (snapshot) {
      setUserInfo(snapshot.val());
    });
  }, [userName]);

  useEffect(() => {
    if (intermediateTerrificCount > 1) {
      setDisableTerrificIntermediate(true);
    } else if (intermediateTerrificCount < 2) {
      setDisableTerrificIntermediate(false);
    }

    if (primaryTerrificCount > 1) {
      setDisableTerrificPrimary(true);
    } else if (primaryTerrificCount < 2) {
      setDisableTerrificPrimary(false);
    }

    if (intermediateCommunityCount > 0) {
      setDisableCommunityIntermediate(true);
    } else if (intermediateCommunityCount < 1) {
      setDisableCommunityIntermediate(false);
    }

    if (primaryCommunityCount > 0) {
      setDisableCommunityPrimary(true);
    } else if (primaryCommunityCount < 1) {
      setDisableCommunityPrimary(false);
    }
  }, [
    intermediateTerrificCount,
    primaryTerrificCount,
    intermediateCommunityCount,
    primaryCommunityCount,
  ]);

  if (userInfo.role === "teacher") {
    // Generate StudentCards for Single Teacher
    StudentCards = arrayOfStudents.map((student) =>
      generateCard(
        student,
        disableRespect,
        disableResponsibility,
        disableRelationship,
        disableSpiritualTheme,
        disableOutstanding,
        disableCommunityPrimary,
        disableCommunityIntermediate,
        disableTerrificPrimary,
        disableTerrificIntermediate,
        userName,
        userInfo.role
      )
    );
  } else {
    // Generate StudentCards for each teacher
    for (const teacher in objectOfStudents) {
      let arrayOfStudents = Object.values(objectOfStudents[teacher]);
      arrayOfStudents.sort(compare);
      StudentCards[teacher] = arrayOfStudents.map((student) =>
        generateCard(
          student,
          disableRespect,
          disableResponsibility,
          disableRelationship,
          disableSpiritualTheme,
          disableOutstanding,
          disableCommunityPrimary,
          disableCommunityIntermediate,
          disableTerrificPrimary,
          disableTerrificIntermediate,
          userName,
          userInfo.role
        )
      );
    }
  }

  const BandClasses = bandTeachers.map((teacher) => {
    return (
      <div key={teacher}>
        <TeacherHeadingDiv
          onClick={() =>
            setCollapsed((prevState) => ({
              ...prevState,
              [teacher]: !collapsed[teacher],
            }))
          }
        >
          <TeacherHeading>{teacher}</TeacherHeading>
          {collapsed[teacher] ? (
            <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
          )}
        </TeacherHeadingDiv>
        <StyledHr />
        <Collapse in={collapsed[teacher]}>
          <div>{StudentCards[teacher]}</div>
        </Collapse>
      </div>
    );
  });

  const AllClasses = teachers.map((teacher) => {
    return (
      <div key={teacher}>
        <TeacherHeadingDiv
          onClick={() =>
            setCollapsed((prevState) => ({
              ...prevState,
              [teacher]: !collapsed[teacher],
            }))
          }
        >
          <TeacherHeading>{teacher}</TeacherHeading>
          {collapsed[teacher] ? (
            <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
          )}
        </TeacherHeadingDiv>
        <StyledHr />
        <Collapse in={collapsed[teacher]}>
          <div>{StudentCards[teacher]}</div>
        </Collapse>
      </div>
    );
  });

  const SingleClass = (
    <div>
      <TeacherHeading>{userName}</TeacherHeading>
      {StudentCards}
    </div>
  );

  let Classes = userInfo.role === "teacher" ? SingleClass : AllClasses;

  if (userInfo.role === "teacher") {
    Classes = SingleClass;
  } else if (userName === "Bryan Botka") {
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
