import styled from "styled-components";
import Button from "react-bootstrap/Button";
import backgroundImage from "./daisyBackground.jpg";

export const StyledLogin = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  width: 20rem;
  height: 6rem;
  font-size: 3rem;
  align-self: center;
`;
