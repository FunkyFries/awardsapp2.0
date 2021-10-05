import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const NewUserForm = ({ addUser }) => {
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newImageUrl, setImageUrl] = useState("");
  const [newClassroom, setClassroom] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [validated, setValidated] = useState(false);

  function newUserSubmit(evt) {
    if (evt.target.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
    } else {
      let newId = uuidv4();
      evt.preventDefault();
      evt.stopPropagation();
      addUser({
        name: newUserName,
        email: newUserEmail,
        imageUrl: newImageUrl,
        classroom: newClassroom,
        role: newUserRole,
        userId: newId,
      });
      setValidated(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole("");
      setImageUrl("");
      setClassroom("");
      setCreatingUser(false);
    }
  }

  return (
    <>
      <Button
        variant="light"
        onClick={() => setCreatingUser(true)}
        style={{ margin: "1rem .5rem 1rem auto" }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginRight: ".5rem" }}
        ></FontAwesomeIcon>
        Add New User
      </Button>

      <Modal
        size="lg"
        aria-labelledby="add-new-user-modal"
        centered
        show={creatingUser}
        onHide={() => setCreatingUser(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-new-user-modal">Add A New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={newUserSubmit} validated={validated}>
            <Form.Group controlId="newUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={newUserEmail}
                type="email"
                onChange={(e) => setNewUserEmail(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newClassroom">
              <Form.Label>Classroom</Form.Label>
              <Form.Control
                required
                value={newClassroom}
                onChange={(e) => setClassroom(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Classroom is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newImageUrl">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                value={newImageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="newUserRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                required
                value={newUserRole}
                as="select"
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                <option value="" defaultChecked></option>
                <option value="teacher">Teacher</option>
                <option value="specialist">Specialist</option>
                <option value="community">Community Service Specialist</option>
                <option value="admin">Admin</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a role.
              </Form.Control.Feedback>
            </Form.Group>
            <Button style={{ marginTop: "1rem" }} type="submit" variant="info">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewUserForm;
