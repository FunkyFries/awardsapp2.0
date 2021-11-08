import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import firebase from "firebase/app";
import "firebase/database";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const WriteUpForm = (student) => {
  const [textValue, setTextValue] = useState(student.writeUp);
  const handleChange = (e) => {
    setTextValue(e.target.value);
  };
  const [editingWriteup, setEditingWriteup] = useState(false);

  let awardName;
  if (student.terrificKid) {
    awardName = `Terrific Kid chosen by ${student.terrificKidChosenBy}`;
  } else if (student.cougarCommunityService) {
    awardName = `Cougar Community Service chosen by ${student.communityServiceChosenBy}`;
  } else if (student.allInAward) {
    awardName = `Living Free chosen by ${student.classroom}`;
  } else if (student.outstandingAchievement) {
    awardName = `Outstanding Achievement chosen by ${student.classroom}`;
  } else {
    awardName = `${student.threeR.substr(
      0,
      student.threeR.indexOf(" ")
    )} chosen by ${student.classroom}`;
  }

  const updateWriteup = (e) => {
    e.preventDefault();
    if (student.terrificKid) {
      firebase
        .database()
        .ref(`classroom/${student.classroom}/${student.id}`)
        .update({ terrificKidWriteup: textValue });
      setEditingWriteup(false);
    } else if (student.cougarCommunityService) {
      firebase
        .database()
        .ref(`classroom/${student.classroom}/${student.id}`)
        .update({ ccsWriteup: textValue });
      setEditingWriteup(false);
    } else {
      firebase
        .database()
        .ref(`classroom/${student.classroom}/${student.id}`)
        .update({ threeRWriteup: textValue });
      setEditingWriteup(false);
    }
  };

  if (student.role !== "admin") {
    return (
      <Form.Group>
        <Form.Label style={{ color: "#f7eded" }}>
          {student.name}: {awardName}
        </Form.Label>
        <Form.Control
          id={student.id}
          as="textarea"
          rows={3}
          placeholder="Write those super words here!"
          value={textValue}
          onChange={handleChange}
        />
      </Form.Group>
    );
  } else {
    return (
      <Card style={{ padding: "1rem", margin: ".5rem" }}>
        <Modal
          size="lg"
          aria-labelledby="add-new-student-modal"
          centered
          show={editingWriteup}
          onHide={() => setEditingWriteup(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="add-new-student-modal">{student.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Write Up</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={6}
                  value={textValue}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
              <Button onClick={updateWriteup} variant="info">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Card.Title>
          {student.name}{" "}
          <Button
            variant="light"
            onClick={() => setEditingWriteup(true)}
            style={{ position: "absolute", right: "1rem", paddingRight: "0" }}
          >
            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginRight: ".5rem" }}
            ></FontAwesomeIcon>
          </Button>
        </Card.Title>
        <Card.Subtitle>{awardName}</Card.Subtitle>
        <hr />
        <Card.Text>{textValue}</Card.Text>
      </Card>
    );
  }
};

export default WriteUpForm;
