import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import firebase from "firebase/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewStudentForm = ({ addStudent }) => {
  const [creatingStudent, setCreatingStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentClassroom, setNewStudentClassroom] = useState("");
  const [newStudentImage, setNewStudentImage] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [validated, setValidated] = useState(false);

  function newStudentSubmit(evt) {
    if (evt.target.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
    } else {
      evt.preventDefault();
      evt.stopPropagation();
      addStudent({
        id: newStudentId,
        name: newStudentName,
        classroom: newStudentClassroom,
        imageUrl: newStudentImage,
      });
      setValidated(false);
      setNewStudentClassroom("");
      setNewStudentImage("");
      setCreatingStudent(false);
    }
  }

  return (
    <>
      <Button
        variant="light"
        onClick={() => setCreatingStudent(true)}
        style={{ margin: "1rem .5rem 1rem auto" }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginRight: ".5rem" }}
        ></FontAwesomeIcon>
        Add New Student
      </Button>

      <Modal
        size="lg"
        aria-labelledby="add-new-student-modal"
        centered
        show={creatingStudent}
        onHide={() => setCreatingStudent(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-new-student-modal">
            Add A New Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={newStudentSubmit} validated={validated}>
            <Form.Group controlId="newStudentName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Student name required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newStudentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                required
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Student ID required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newStudentTeacher">
              <Form.Label>Teacher</Form.Label>
              <Form.Control
                required
                value={newStudentClassroom}
                onChange={(e) => setNewStudentClassroom(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a teacher.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                id="newStudentImage"
                value={newStudentImage}
                onChange={(e) => setNewStudentImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="info">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewStudentForm;
