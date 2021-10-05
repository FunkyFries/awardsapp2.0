import { useState } from "react";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import {
  StyledForm,
  FormGroup,
  FormControl,
  BtnContainer,
  StudentRow,
  StudentColumn,
  StudentButtonColumn,
  SwipeContainer,
  StudentContainer,
  StudentButton,
  SaveButton,
  ModalBody,
} from "../styles/studentformstyles";

const StudentForm = ({
  id,
  name,
  teacher,
  image,
  handleDelete,
  updateStudent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentName, setStudentName] = useState(name);
  const [studentTeacher, setStudentTeacher] = useState(teacher);
  const [studentImage, setStudentImage] = useState(image);
  const [validated, setValidated] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setButtonVisible(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  function onClick() {
    if (buttonVisible) {
      setButtonVisible(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefaultTouchmoveEvent();
    evt.stopPropagation();
    if (evt.target.checkValidity() === false) {
      setValidated(true);
    } else {
      updateStudent({
        name: studentName,
        teacher: studentTeacher,
        image: studentImage,
        id: id,
      });
    }
  }

  let display = isEditing ? (
    <StudentContainer>
      <StyledForm
        noValidate
        inline
        onSubmit={handleSubmit}
        validated={validated}
      >
        <FormGroup>
          <FormControl
            id={`name-${id}`}
            required
            onChange={(e) => setStudentName(e.target.value)}
            value={studentName}
          ></FormControl>
          <Form.Control.Feedback type="invalid">
            Student name required.
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <FormControl
            id={`teacher-${id}`}
            required
            onChange={(e) => setStudentTeacher(e.target.value)}
            value={studentTeacher}
          ></FormControl>
          <Form.Control.Feedback type="invalid">
            Teacher is required.
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <FormControl
            placeholder="Image URL"
            id={`image-${id}`}
            onChange={(e) => setStudentImage(e.target.value)}
            value={studentImage}
          ></FormControl>
        </FormGroup>
        <BtnContainer>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`save-student-tooltip-top`}>Save</Tooltip>}
          >
            <SaveButton type="submit">
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
            </SaveButton>
          </OverlayTrigger>
        </BtnContainer>
      </StyledForm>
    </StudentContainer>
  ) : (
    <StudentContainer>
      <SwipeContainer onClick={onClick} {...handlers}></SwipeContainer>
      <StudentRow>
        <StudentColumn>{studentName}</StudentColumn>
        <StudentColumn>{studentTeacher}</StudentColumn>
        <StudentColumn>{studentImage.substring(0, 20)}...</StudentColumn>
        <StudentButtonColumn buttonVisible={buttonVisible}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`edit-student-tooltip-top`}>Edit</Tooltip>}
          >
            <StudentButton variant="light" onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </StudentButton>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={
              <Tooltip id={`delete-student-tooltip-top`}>Delete</Tooltip>
            }
          >
            <StudentButton
              variant="danger"
              onClick={() => setConfirmingDelete(true)}
            >
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </StudentButton>
          </OverlayTrigger>

          <Modal
            size="sm"
            aria-labelledby="confirm-delete"
            centered
            show={confirmingDelete}
            onHide={() => setConfirmingDelete(false)}
          >
            <Modal.Header closeButton>Delete Student</Modal.Header>
            <ModalBody>Are you sure? This cannot be undone!</ModalBody>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setConfirmingDelete(false)}
              >
                Close
              </Button>
              <Button variant="danger" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </StudentButtonColumn>
      </StudentRow>
    </StudentContainer>
  );

  return display;
};

export default StudentForm;
