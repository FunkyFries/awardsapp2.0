import React from "react";
import {
  CertDiv,
  PrintDiv,
  ThreeRh4,
  AllInH5,
  ThreeRh2,
  ThreeRSignatures,
  ThreeRHR,
  OutstandingInnerBorder,
  OutstandingOuterBorder,
  AllInLogo,
  AllInContainer,
  ThreeRContainer,
  AllInCCS,
  ThreeRWriteupContainer,
  ThreeRLogoContainer,
  ThreeRLogoImage,
  ThreeRWriteupTitle,
  ThreeRh3,
  ThreeRWriteup,
  ThreeRWriteupSignature,
  ThreeRWriteupTeacherDiv,
  ThreeRh5,
  Signature,
} from "../styles/certstyles";
import { schoolYear } from "./constants";
import seekGodLogo from "../styles/images/seekgodlogo.png";
import Logo from "../styles/images/Logo.png";
import principalSignature from "../styles/images/signature.png";
import { determineTeacherSignature } from "./constants";

const AllInCertificate = ({ students, currentQuarter }) => {
  const certs = students.map((student) => {
    return (
      <div key={`${student.id}spiritualTheme`}>
        <CertDiv>
          <ThreeRContainer style={{ flexWrap: "wrap" }}>
            <OutstandingOuterBorder>
              <OutstandingInnerBorder style={{ width: "100%" }}>
                <AllInLogo src={seekGodLogo} alt="Seek God Logo" />
                <AllInContainer>
                  <AllInH5 style={{}}>is hereby granted to</AllInH5>
                  <ThreeRh2>{student.name}</ThreeRh2>
                  <AllInH5>
                    for exemplifying the CCS Spiritual Theme during the
                  </AllInH5>
                  <ThreeRh4 style={{ paddingTop: "2rem" }}>
                    {currentQuarter} of the {schoolYear} School Year
                  </ThreeRh4>
                  <Signature
                    src={principalSignature}
                    alt="Annie Pichot"
                  ></Signature>
                </AllInContainer>
                <ThreeRSignatures style={{ width: "100%" }}>
                  <ThreeRHR />
                  <ThreeRHR />
                </ThreeRSignatures>
                <ThreeRSignatures style={{ width: "100%" }}>
                  <h6>Principal</h6>
                  <h6>Teacher</h6>
                </ThreeRSignatures>
              </OutstandingInnerBorder>
            </OutstandingOuterBorder>
            <AllInCCS src={Logo} alt="CCS Logo" />
          </ThreeRContainer>
        </CertDiv>
        <CertDiv>
          <ThreeRWriteupContainer>
            <ThreeRLogoContainer>
              <ThreeRLogoImage src={Logo} alt="CCS Logo" />
            </ThreeRLogoContainer>
            <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
              <ThreeRWriteupTitle style={{ width: "100%" }}>
                Seeking God Award
              </ThreeRWriteupTitle>
              <ThreeRh3 style={{ width: "100%" }}>{student.name}</ThreeRh3>
              <ThreeRWriteup>{student.threeRWriteup}</ThreeRWriteup>
            </div>
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

export default AllInCertificate;
