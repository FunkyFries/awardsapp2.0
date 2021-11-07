import React from "react";
import {
  PrintDiv,
  CertDiv,
  ThreeRWriteupContainer,
  ThreeRWriteupTitle,
  ThreeRh3,
  ThreeRWriteup,
  ThreeRWriteupSignature,
  ThreeRWriteupTeacherDiv,
  ThreeRh5,
  TerrificH1,
} from "../styles/certstyles";
import terrificKidLogo from "../styles/images/terrifickidlogo.png";
import { determineSpecialistSignature } from "./constants";

const TerrificKidCertificate = ({ students, currentQuarter }) => {
  const certs = students.map((student) => {
    return (
      <div key={`${student.id}terrifickid`}>
        <CertDiv style={{ display: "flex" }}>
          <TerrificH1>{student.name}</TerrificH1>
        </CertDiv>
        <CertDiv>
          <ThreeRWriteupContainer>
            <img
              style={{ height: "30%", margin: "0 auto" }}
              src={terrificKidLogo}
              alt="Terrific Kid Logo"
            />
            <ThreeRWriteupTitle
              style={{
                width: "100%",
                fontSize: "2rem",
                fontFamily: "Noto Sans",
              }}
            >
              {currentQuarter} 2021 - 2022
            </ThreeRWriteupTitle>
            <div style={{ width: "100%" }}>
              <ThreeRh3>{student.name}</ThreeRh3>
            </div>
            <ThreeRWriteup>{student.terrificKidWriteUp}</ThreeRWriteup>
            <ThreeRWriteupSignature>
              <ThreeRWriteupTeacherDiv>
                <ThreeRh5 style={{ marginTop: "1rem" }}>
                  {determineSpecialistSignature(student.terrificKidChosenBy)}
                </ThreeRh5>
              </ThreeRWriteupTeacherDiv>
            </ThreeRWriteupSignature>
          </ThreeRWriteupContainer>
        </CertDiv>
      </div>
    );
  });
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default TerrificKidCertificate;
