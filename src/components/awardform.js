import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import {
  primaryTeachers,
  recessSpecialists,
  currentQuarter,
} from "./constants";
import { ThreeRDiv, ThreeRLabel } from "../styles/awardstyles";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const AwardForm = ({
  id,
  teacher,
  spiritualThemeAward,
  outstandingAchievement,
  wowAward,
  cougarCommunityService,
  communityServiceChosenBy,
  handlePrimaryCommunityServiceUpdate,
  disableCommunityPrimary,
  handleIntermediateCommunityServiceUpdate,
  disableCommunityIntermediate,
  terrificKid,
  disableTerrificPrimary,
  disableTerrificIntermediate,
  acceleratedReader,
  words,
  threeR,
  userName,
  terrificKidChosenBy,
  role,
  pastAwards,
  disableRespect,
  disableResponsibility,
  disableRelationship,
  disableSpiritualTheme,
  disableOutstanding,
}) => {
  const [showARModal, setShowARModal] = useState(false);
  const [arWords, setWords] = useState(words);
  const [disableTerrific, toggleDisableTerrific] = useState(null);

  useEffect(() => {
    if (
      (role !== "teacher" &&
        role !== "community" &&
        terrificKid &&
        userName === terrificKidChosenBy &&
        threeR === "none") ||
      (role !== "teacher" &&
        role !== "community" &&
        !terrificKid &&
        threeR === "none" &&
        !spiritualThemeAward &&
        !outstandingAchievement &&
        !cougarCommunityService)
    ) {
      toggleDisableTerrific(false);
    } else {
      toggleDisableTerrific(true);
    }
  }, [
    role,
    terrificKid,
    terrificKidChosenBy,
    userName,
    spiritualThemeAward,
    outstandingAchievement,
    cougarCommunityService,
    threeR,
  ]);

  function updateWowAward() {
    firebase
      .database()
      .ref(`classroom/${teacher}/${id}`)
      .update({ wowAward: !wowAward });
  }

  function updateSpiritualThemeAward() {
    firebase
      .database()
      .ref(`classroom/${teacher}/${id}`)
      .update({ spiritualTheme: !spiritualThemeAward });
  }

  function updateOutstandingAchievement() {
    firebase
      .database()
      .ref(`classroom/${teacher}/${id}`)
      .update({ outstandingAchievement: !outstandingAchievement });
  }

  function updateThreeR(e) {
    firebase
      .database()
      .ref(`classroom/${teacher}/${id}`)
      .update({ threeR: e.target.value });
  }

  function updateAcceleratedReader() {
    if (acceleratedReader) {
      firebase
        .database()
        .ref(`classroom/${teacher}/${id}`)
        .update({ acceleratedReader: false, words: 0 });
    } else {
      setShowARModal(true);
    }
  }

  function submitARreader() {
    firebase
      .database()
      .ref(`classroom/${teacher}/${id}`)
      .update({ acceleratedReader: true, words: arWords });

    setShowARModal(false);
  }

  function handleChange() {
    if (terrificKidChosenBy === "none") {
      firebase
        .database()
        .ref(`classroom/${teacher}/${id}`)
        .update({ terrificKid: true, terrificKidChosenBy: userName });
      if (primaryTeachers.includes(teacher)) {
        firebase
          .database()
          .ref(`counts/${userName}`)
          .update({
            primaryTerrific: firebase.database.ServerValue.increment(1),
          });
      } else {
        firebase
          .database()
          .ref(`counts/${userName}`)
          .update({
            intermediateTerrific: firebase.database.ServerValue.increment(1),
          });
      }
    } else if (terrificKidChosenBy === userName || role === "admin") {
      firebase
        .database()
        .ref(`classroom/${teacher}/${id}`)
        .update({ terrificKid: false, terrificKidChosenBy: "none" });
      if (primaryTeachers.includes(teacher)) {
        firebase
          .database()
          .ref(`counts/${userName}`)
          .update({
            primaryTerrific: firebase.database.ServerValue.increment(-1),
          });
      } else {
        firebase
          .database()
          .ref(`counts/${userName}`)
          .update({
            intermediateTerrific: firebase.database.ServerValue.increment(-1),
          });
      }
    }
  }

  function handleCommunityChange() {
    if (communityServiceChosenBy === "none") {
      firebase.database().ref(`classroom/${teacher}/${id}`).update({
        cougarCommunityService: true,
        communityServiceChosenBy: recessSpecialists,
      });
    } else if (role === "community" || role === "admin") {
      firebase.database().ref(`classroom/${teacher}/${id}`).update({
        cougarCommunityService: false,
        communityServiceChosenBy: "none",
      });
    }
  }

  const pastAwardsList = pastAwards.map((award, i) => (
    <li key={(award, i)}>{award}</li>
  ));

  return (
    <Form>
      {(currentQuarter() === "Third Quarter" &&
        primaryTeachers.indexOf(teacher) === -1) ||
      (currentQuarter() === "Fourth Quarter" &&
        primaryTeachers.indexOf(teacher) === -1) ? (
        <Form.Check
          type="checkbox"
          label="Wow Award"
          id={`wowAward-${id}`}
          onChange={updateWowAward}
          checked={wowAward}
          disabled={role === "specialist" || role === "community"}
        />
      ) : null}
      <Form.Check
        type="checkbox"
        label="Seeking God Award"
        id={`SpiritualThemeAward-${id}`}
        onChange={updateSpiritualThemeAward}
        checked={spiritualThemeAward}
        disabled={
          role === "specialist" ||
          role === "community" ||
          outstandingAchievement ||
          cougarCommunityService ||
          terrificKid ||
          threeR !== "none" ||
          (disableSpiritualTheme &&
            spiritualThemeAward === false &&
            role !== "admin")
        }
      />
      <Form.Check
        type="checkbox"
        label="Outstanding Achievement"
        id={`OutstandingAchievement-${id}`}
        onChange={updateOutstandingAchievement}
        checked={outstandingAchievement}
        disabled={
          role === "specialist" ||
          role === "community" ||
          spiritualThemeAward ||
          cougarCommunityService ||
          terrificKid ||
          threeR !== "none" ||
          (disableOutstanding &&
            outstandingAchievement === false &&
            role !== "admin")
        }
      />
      <Form.Check
        type="checkbox"
        label="Cougar Community Service"
        id={`cougarCommunityService-${id}`}
        onChange={handleCommunityChange}
        checked={cougarCommunityService}
        disabled={
          (role !== "admin" && role !== "community") ||
          spiritualThemeAward ||
          outstandingAchievement ||
          terrificKid ||
          threeR !== "none" ||
          (primaryTeachers.includes(teacher) &&
            disableCommunityPrimary &&
            cougarCommunityService === false &&
            role !== "admin") ||
          (primaryTeachers.indexOf(teacher) === -1 &&
            disableCommunityIntermediate &&
            cougarCommunityService === false &&
            role !== "admin")
        }
      />

      <Form.Check
        type="checkbox"
        label="Terrific Kid"
        id={`TerrificKid-${id}`}
        onChange={handleChange}
        checked={terrificKid}
        disabled={
          (disableTerrific && role !== "admin") ||
          (primaryTeachers.indexOf(teacher) !== -1 &&
            disableTerrificPrimary &&
            terrificKid === false &&
            role !== "admin") ||
          (primaryTeachers.indexOf(teacher) === -1 &&
            disableTerrificIntermediate &&
            terrificKid === false &&
            role !== "admin")
        }
      />
      <Form.Check
        type="checkbox"
        label="Reader of the Quarter"
        id={`AR-${id}`}
        onChange={updateAcceleratedReader}
        checked={acceleratedReader}
        disabled={userName !== "Angela Tiegs" && role !== "admin"}
      ></Form.Check>
      <Modal
        show={showARModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowARModal(false)}
      >
        <Modal.Header translate="no" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Accelerated Reader Words
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            onChange={(e) => setWords(parseInt(e.target.value))}
            type="number"
            placeholder="Words"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitARreader}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <ThreeRDiv>
        <ThreeRLabel>Three R : </ThreeRLabel>
        <Form.Control
          as="select"
          id={`ThreeR-${id}`}
          value={threeR}
          disabled={
            role === "specialist" ||
            role === "community" ||
            terrificKid ||
            spiritualThemeAward ||
            outstandingAchievement ||
            cougarCommunityService
          }
          onChange={updateThreeR}
        >
          <option value="none" defaultChecked>
            none
          </option>
          <option
            disabled={disableRespect && role !== "admin"}
            value={`Respect - ${currentQuarter()}`}
          >
            Respect
          </option>
          <option
            disabled={disableResponsibility && role !== "admin"}
            value={`Responsibility - ${currentQuarter()}`}
          >
            Responsibility
          </option>
          <option
            disabled={disableRelationship && role !== "admin"}
            value={`Relationship - ${currentQuarter()}`}
          >
            Relationship
          </option>
        </Form.Control>
      </ThreeRDiv>
      {pastAwards.length > 0 && pastAwards[0] !== "" ? (
        <>
          <h6>Past Awards:</h6>
          <ul>{pastAwardsList}</ul>
        </>
      ) : null}
    </Form>
  );
};

export default AwardForm;
