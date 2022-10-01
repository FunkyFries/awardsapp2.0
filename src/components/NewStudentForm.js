import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getDatabase, ref, set } from "firebase/database";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CSVReader } from "react-papaparse";

const NewStudentForm = ({ addStudent }) => {
  const [creatingStudent, setCreatingStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentClassroom, setNewStudentClassroom] = useState("");
  const [newStudentImage, setNewStudentImage] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [validated, setValidated] = useState(false);
  const [studentUploadData, setStudentUploadData] = useState([]);
  const [creatingStudents, setCreatingStudents] = useState(false);

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

  const handleOnDrop = (data) => {
    setStudentUploadData(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log("Removed");
  };

  const db = getDatabase();

  const handleUpload = () => {
    if (studentUploadData.length > 0) {
      studentUploadData.forEach((row) => {
        set(ref(db, `classroom/${row.data[2]}/${row.data[0]}`), {
          id: row.data[0],
          name: row.data[1],
          classroom: row.data[2],
          imageUrl: row.data[3],
          spiritualTheme: false,
          outstandingAchievement: false,
          wowAward: false,
          cougarCommunityService: false,
          communityServiceChosenBy: "none",
          ccsWriteup: "",
          terrificKid: false,
          terrificKidChosenBy: "none",
          terrificKidWriteup: "",
          threeR: "none",
          threeRWriteup: "",
          acceleratedReader: false,
          words: 0,
          pastAwards: [""],
        });
      });
      console.log("Upload complete!");
    } else {
      console.log("Error: No data to upload");
    }
  };

  return (
    <>
      <Button
        variant="light"
        onClick={() => setCreatingStudent(true)}
        style={{ margin: "1rem .5rem 1rem 1rem" }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginRight: ".5rem" }}
        ></FontAwesomeIcon>
        Add New Student
      </Button>

      <Button
        variant="light"
        onClick={() => setCreatingStudents(true)}
        style={{ margin: "1rem .5rem 1rem auto" }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginRight: ".5rem" }}
        ></FontAwesomeIcon>
        Upload Students
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
            <Button type="submit" variant="info" style={{ marginTop: "1rem" }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="add-new-students-modal"
        centered
        show={creatingStudents}
        onHide={() => setCreatingStudents(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-new-students-modal">Upload Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ marginTop: "2rem" }}>
            <Form.Group>
              <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                noClick
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
              >
                <span>Drop CSV file here to upload.</span>
              </CSVReader>
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewStudentForm;
