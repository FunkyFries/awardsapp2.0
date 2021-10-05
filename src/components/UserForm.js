import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownItem from "react-bootstrap/DropdownItem";
import FormGroup from "react-bootstrap/FormGroup";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faSave,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import {
  StyledForm,
  FormControl,
  FormControlText,
  UserRow,
  UserColumnRightBorder,
  UserButtonColumn,
  UserContainer,
  SaveButton,
  ModalBody,
} from "../styles/userformstyles";

const UserForm = ({
  id,
  name,
  email,
  role,
  userImageUrl,
  userClassroom,
  handleDelete,
  updateUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userRole, setUserRole] = useState(role);
  const [imageUrl, setImageUrl] = useState(userImageUrl);
  const [classroom, setClassroom] = useState(userClassroom);
  const [validated, setValidated] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function handleSubmit(evt) {
    if (evt.target.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
    } else {
      evt.preventDefault();
      evt.stopPropagation();
      updateUser({
        id: id,
        name: userName,
        email: userEmail,
        profile_picture: imageUrl,
        classroom: classroom,
        role: userRole,
      });
      setIsEditing(false);
      setValidated(false);
    }
  }

  let display = isEditing ? (
    <UserContainer>
      <StyledForm noValidate onSubmit={handleSubmit} validated={validated}>
        <UserButtonColumn>
          <div>
            <img
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                objectFit: "cover",
              }}
              src={userImageUrl}
              alt=""
            />
          </div>
        </UserButtonColumn>
        <UserColumnRightBorder
          style={{ flexWrap: "wrap", justifyContent: "left" }}
        >
          <div style={{ marginLeft: "1rem" }}>
            <FormGroup>
              <FormControlText
                id={`username-${id}`}
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              ></FormControlText>
              <Form.Control.Feedback type="invalid">
                User name required.
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormControlText
                id={`email-${id}`}
                type="email"
                required
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
              ></FormControlText>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </FormGroup>
          </div>
        </UserColumnRightBorder>
        <UserColumnRightBorder>
          <FormGroup>
            <FormControl
              id={`role-${id}`}
              as="select"
              onChange={(e) => setUserRole(e.target.value)}
              value={userRole}
            >
              <option value="teacher">Teacher</option>
              <option value="specialist">Specialist</option>
              <option value="admin">Admin</option>
            </FormControl>
          </FormGroup>
        </UserColumnRightBorder>
        <UserColumnRightBorder>
          <FormGroup>
            <FormControlText
              id={`imageUrl-${id}`}
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
            ></FormControlText>
          </FormGroup>
        </UserColumnRightBorder>
        <UserColumnRightBorder>
          <FormGroup>
            <FormControlText
              id={`userClassroom-${id}`}
              onChange={(e) => setClassroom(e.target.value)}
              value={classroom}
            ></FormControlText>
          </FormGroup>
        </UserColumnRightBorder>
        <SaveButton type="submit">
          <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
        </SaveButton>
      </StyledForm>
    </UserContainer>
  ) : (
    <UserContainer>
      <UserRow>
        <UserButtonColumn>
          <div>
            <img
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                objectFit: "cover",
              }}
              src={userImageUrl}
              alt=""
            />
          </div>
        </UserButtonColumn>
        <UserColumnRightBorder
          style={{ flexWrap: "wrap", justifyContent: "left" }}
        >
          <div style={{ marginLeft: "1rem" }}>
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                marginBottom: "0",
                textAlign: "left",
              }}
            >
              {userName}
            </h4>
            <h5
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                color: "#6c757d",
                textAlign: "left",
              }}
            >
              {userEmail}
            </h5>
          </div>
        </UserColumnRightBorder>
        <UserColumnRightBorder>{userRole}</UserColumnRightBorder>
        <UserColumnRightBorder>{`${userImageUrl.substring(
          0,
          20
        )}...`}</UserColumnRightBorder>
        <UserColumnRightBorder>{userClassroom}</UserColumnRightBorder>
        <UserButtonColumn>
          <Dropdown>
            <DropdownToggle variant="link" bsPrefix="p-0">
              <FontAwesomeIcon icon={faEllipsisV} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit
              </DropdownItem>
              <DropdownItem
                onClick={() => setConfirmingDelete(true)}
                className="text-danger"
              >
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal
            size="sm"
            aria-labelledby="confirm-delete"
            centered
            show={confirmingDelete}
            onHide={() => setConfirmingDelete(false)}
          >
            <Modal.Header closeButton>Delete User</Modal.Header>
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
        </UserButtonColumn>
      </UserRow>
    </UserContainer>
  );

  return display;
};

export default UserForm;
