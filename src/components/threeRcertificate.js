import React from "react";
import {
  PrintDiv,
  CertDiv,
  ThreeRContainer,
  OuterBorder,
  TitleDiv,
  ThreeRLogo,
  ThreeRCCS,
  ContentDiv,
  ThreeRSignatures,
  ThreeRTitle,
  ThreeRHR,
  ThreeRh1,
  ThreeRh2,
  ThreeRh3,
  ThreeRh4,
  ThreeRh5,
  ThreeRWriteupContainer,
  ThreeRLogoContainer,
  ThreeRLogoImage,
  ThreeRWriteup,
  ThreeRWriteupTitle,
  ThreeRWriteupSignature,
  ThreeRWriteupTeacherDiv,
  OutstandingInnerBorder,
} from "../styles/certstyles";
import RLogo from "../styles/images/3Rlogo.png";
import Header from "../styles/images/Header.png";
import Logo from "../styles/images/Logo.png";
import { determineTeacherSignature } from "./constants";

const ThreeRCertificate = ({ students, currentQuarter }) => {
  const certs = students.map((student) => {
    let awardName = student.threeR.substr(0, student.threeR.indexOf(" "));

    let definition;
    if (awardName === "Respect") {
      definition =
        "Respect is serving God by choosing to think, act and speak in a way that honors God, others, self and property.";
    } else if (awardName === "Relationship") {
      definition =
        "Relationship is serving God by choosing to understand, accept, and show concern for others and oneself.";
    } else if (awardName === "Responsibility") {
      definition =
        "Responsibility is being trustworthy, self-monitored, and accountable for one’s choices and accepting all consequences for one’s actions.";
    }

    return (
      <div key={`${student.id}threeR`}>
        <CertDiv>
          <ThreeRLogo src={RLogo} alt="3R logo" />
          <ThreeRContainer>
            <OuterBorder>
              <OutstandingInnerBorder style={{ margin: ".5rem" }}>
                <TitleDiv>
                  <img
                    src={Header}
                    alt="Header Background"
                    style={{
                      zIndex: -20,
                      height: "100%",
                      width: "100%",
                    }}
                  />
                  <ThreeRTitle>Cougar Character</ThreeRTitle>
                </TitleDiv>
                <ContentDiv>
                  <ThreeRh1>Congratulations!</ThreeRh1>
                  <ThreeRh2>{student.name}</ThreeRh2>
                  <ThreeRh3>
                    has displayed Respect, Responsibility and Relationship,
                  </ThreeRh3>
                  <ThreeRh3>the qualities of a leader.</ThreeRh3>
                  <ThreeRh5>Frederickson Campus</ThreeRh5>
                  <ThreeRh4>{currentQuarter} of 21-22 School Year</ThreeRh4>
                  <ThreeRSignatures>
                    <ThreeRHR />
                    <ThreeRHR />
                  </ThreeRSignatures>
                  <ThreeRSignatures>
                    <h5>Principal</h5>
                    <h5>Teacher</h5>
                  </ThreeRSignatures>
                </ContentDiv>
              </OutstandingInnerBorder>
            </OuterBorder>
            <ThreeRCCS src={Logo} alt="CCS Logo" />
          </ThreeRContainer>
        </CertDiv>
        <CertDiv>
          <ThreeRWriteupContainer>
            <ThreeRLogoContainer>
              <ThreeRLogoImage src={Logo} alt="CCS Logo" />
            </ThreeRLogoContainer>
            <ThreeRWriteupTitle>{awardName} Cougar Award</ThreeRWriteupTitle>
            <ThreeRh4 style={{ fontStyle: "italic" }}>{definition}</ThreeRh4>
            <ThreeRh3 style={{ width: "100%" }}>{student.name}</ThreeRh3>
            <ThreeRWriteup>{student.threeRWriteup}</ThreeRWriteup>
            <ThreeRWriteupSignature>
              <ThreeRWriteupTeacherDiv>
                <ThreeRh5 style={{ marginTop: "1rem" }}>
                  {determineTeacherSignature(student.classroom)}, Teacher
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

export default ThreeRCertificate;
