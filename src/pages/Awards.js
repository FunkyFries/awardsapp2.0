import AwardForm from "../components/awardform";
import { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import firebase from "firebase/app";
import "firebase/database";
import {
  primaryTeachers,
  intermediateTeachers,
  teachers,
  bandTeachers,
  specialists,
  currentQuarter,
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
  // DueDate,
} from "../styles/awardstyles";

const Awards = ({ userName }) => {
  if (userName === "Kim Carroll") {
    userName = "Kim Pederson";
  }
  if (userName === "Breanne Jeffries") {
    userName = "Bre Jeffries";
  }
  if (userName === "Kristal Weber") {
    userName = "Michelle Medina";
  }
  const [arrayOfStudents, setArrayOfStudents] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [collapsed, setCollapsed] = useState({
    "Angel Martin": false,
    "Kaitlyn Johnson": false,
    "Jamie Estep": false,
    "Kathy Dilley": false,
    "Annalisa Lang": false,
    "Kellie Terpstra": false,
    "Kim Pederson": false,
    "Trista Haberman": false,
    "Claude Kranik": false,
    "Kabrina Kidd": false,
    "Nathan Lenhart": false,
    "Michelle Medina": false,
    "Kristin Helle": false,
    "Kelly Kidd": false,
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
        setArrayOfStudents([]);
        setIntermediateTerrificCount(0);
        setPrimaryTerrificCount(0);
        setIntermediateCommunityCount(0);
        setPrimaryCommunityCount(0);
        snapshot.forEach(function (childNodes) {
          childNodes.forEach(function (childNode) {
            const newEntry = { ...childNode.val() };
            setArrayOfStudents((prevState) => [...prevState, newEntry]);

            // Set Terrific Kid Counts
            if (childNode.val().terrificKid) {
              if (
                childNode.val().terrificKidChosenBy === userName &&
                intermediateTeachers.includes(childNode.val().classroom)
              ) {
                setIntermediateTerrificCount((prevState) => prevState + 1);
              } else if (
                childNode.val().terrificKidChosenBy === userName &&
                primaryTeachers.includes(childNode.val().classroom)
              ) {
                setPrimaryTerrificCount((prevState) => prevState + 1);
              }
            }

            // Set Community Kid Counts
            if (childNode.val().cougarCommunityService) {
              if (intermediateTeachers.includes(childNode.val().classroom)) {
                setIntermediateCommunityCount((prevState) => prevState + 1);
              } else if (primaryTeachers.includes(childNode.val().classroom)) {
                setPrimaryCommunityCount((prevState) => prevState + 1);
              }
            }
          });
        });
      });
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

  // Generate StudentCards for each teacher
  for (const teacher of teachers) {
    StudentCards[teacher] = arrayOfStudents.map((student) => {
      if (student.classroom === teacher) {
        return (
          <StyledCard key={student.id}>
            <CardImg src={student.imageUrl} />
            <CardBody>
              <CardTitle>{student.name}</CardTitle>
              <AwardForm
                id={student.id}
                disableRespect={disableRespect}
                disableResponsibility={disableResponsibility}
                disableRelationship={disableRelationship}
                disableSpiritualTheme={disableSpiritualTheme}
                disableOutstanding={disableOutstanding}
                teacher={student.classroom}
                spiritualThemeAward={student.spiritualTheme}
                outstandingAchievement={student.outstandingAchievement}
                wowAward={student.wowAward}
                cougarCommunityService={student.cougarCommunityService}
                communityServiceChosenBy={student.communityServiceChosenBy}
                disableCommunityPrimary={disableCommunityPrimary}
                disableCommunityIntermediate={disableCommunityIntermediate}
                terrificKid={student.terrificKid}
                terrificKidChosenBy={student.terrificKidChosenBy}
                disableTerrificPrimary={disableTerrificPrimary}
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
      } else return null;
    });
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
      {StudentCards[userName]}
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
