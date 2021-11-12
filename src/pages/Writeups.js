import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import firebase from "firebase/app";
import "firebase/database";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import WriteUpForm from "../components/writeUpForm.js";
import {
  BackgroundDiv,
  WriteUpContainer,
  WriteUpHeading,
  SuccessToast,
  ErrorToast,
} from "../styles/writeupstyles";
import { specialists } from "../components/constants";

const WriteUps = ({ userName }) => {
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
        snapshot.forEach(function (childNodes) {
          childNodes.forEach(function (childNode) {
            if (
              childNode.val().cougarCommunityService ||
              childNode.val().terrificKid ||
              childNode.val().spiritualTheme ||
              childNode.val().outstandingAchievement ||
              childNode.val().threeR !== "none"
            ) {
              const newEntry = { ...childNode.val() };
              setArrayOfStudents((prevState) => [...prevState, newEntry]);
            }
          });
        });
      });
    } else {
      students = firebase.database().ref(`classroom/${userName}`);
      students.on("value", function (snapshot) {
        setArrayOfStudents([]);
        snapshot.forEach(function (childNodes) {
          if (
            childNodes.val().threeR !== "none" ||
            childNodes.val().spiritualTheme ||
            childNodes.val().outstandingAchievement
          ) {
            const newEntry = { ...childNodes.val() };
            setArrayOfStudents((prevState) => [...prevState, newEntry]);
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

  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  let message;

  const errMessage = (
    <Toast
      delay={5000}
      autohide
      onClose={() => setShowErr(false)}
      style={{ maxWidth: "25%", position: "fixed", bottom: "0" }}
    >
      <ErrorToast>Error... something broke.</ErrorToast>
    </Toast>
  );

  const successMessage = (
    <Toast
      delay={5000}
      autohide
      onClose={() => setShowSuccess(false)}
      style={{ maxWidth: "25%", position: "fixed", bottom: "0" }}
    >
      <SuccessToast>Successfully updated!</SuccessToast>
    </Toast>
  );

  if (showErr) {
    message = errMessage;
  } else if (showSuccess) {
    message = successMessage;
  } else {
    message = null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].value.length > 0) {
        if (userInfo.role === "teacher") {
          firebase
            .database()
            .ref(`classroom/${userName}/${e.target[i].id}`)
            .update({ threeRWriteup: e.target[i].value }, (error) => {
              if (error) {
                // The write failed...
                setShowErr(true);
              } else {
                // Data saved successfully!
                setShowSuccess(true);
              }
            });
        } else if (userInfo.role === "community") {
          firebase
            .database()
            .ref(`classroom/${e.target[i].teacher}/${e.target[i].id}`)
            .update({ ccsWriteup: e.target[i].value }, (error) => {
              if (error) {
                // The write failed...
                setShowErr(true);
              } else {
                // Data saved successfully!
                setShowSuccess(true);
              }
            });
        } else {
          firebase
            .database()
            .ref(
              `classroom/${e.target[i].getAttribute("teacher")}/${
                e.target[i].id
              }`
            )
            .update({ terrificKidWriteup: e.target[i].value }, (error) => {
              if (error) {
                // The write failed...
                setShowErr(true);
              } else {
                // Data saved successfully!
                setShowSuccess(true);
              }
            });
        }
      }
    }
  };

  let filteredStudents = [];
  let writeUpForm;

  // Filter students assigned to teacher
  if (userInfo.role === "teacher") {
    filteredStudents = arrayOfStudents.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
  } else if (userInfo.role === "community") {
    filteredStudents = arrayOfStudents.filter(
      (student) => student.cougarCommunityService
    );
  } else if (userInfo.role === "specialist") {
    filteredStudents = arrayOfStudents.filter(
      (student) => student.terrificKidChosenBy === userName
    );
  } else if (userInfo.role === "admin") {
    filteredStudents = arrayOfStudents.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
  }

  //Fix this!!! Create additional filters for Outstanding and All In and generate separate Write Up forms

  if (filteredStudents.length > 0) {
    writeUpForm = filteredStudents.map((student) => {
      let writeUp;
      if (userInfo.role === "teacher") {
        writeUp = student.threeRWriteup;
      } else if (userInfo.role === "community") {
        writeUp = student.ccsWriteup;
      } else if (userInfo.role === "admin") {
        if (student.terrificKid) {
          writeUp = student.terrificKidWriteUp;
        } else if (student.cougarCommunityService) {
          writeUp = student.ccsWriteup;
        } else if (student.spiritualTheme) {
          writeUp = student.threeRWriteup;
        } else if (student.outstandingAchievement) {
          writeUp = student.threeRWriteup;
        } else {
          writeUp = student.threeRWriteup;
        }
      } else {
        writeUp = student.terrificKidWriteUp;
      }
      return (
        <WriteUpForm
          {...student}
          writeUp={writeUp}
          role={userInfo.role}
          key={student.id}
        />
      );
    });
  }
  // } else if (role === "admin" && filteredStudents.length > 0) {
  //   writeUpForm = filteredStudents.map((student) => {
  //     let writeUp = student.terrificKid
  //       ? student.terrificKidWriteUp
  //       : student.threeRwriteUp;
  //   return (
  //     <WriteUpForm
  //       {...student}
  //       writeUp={writeUp}
  //       key={student._id}
  //       role={role}
  //     ></WriteUpForm>
  //   );
  // });
  // }

  return (
    <>
      <BackgroundDiv>
        <WriteUpContainer>
          {message}
          <WriteUpHeading>Writeups</WriteUpHeading>
          <Form onSubmit={handleSubmit}>
            {writeUpForm}
            {userInfo.role === "admin" ||
            filteredStudents.length === 0 ? null : (
              <Button
                type="submit"
                size="lg"
                variant="dark"
                style={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
            )}
          </Form>
        </WriteUpContainer>
      </BackgroundDiv>
    </>
  );
};

export default WriteUps;
