import React from "react";
import {
  PrintDiv,
  CertDiv,
  OutstandingH1,
  OutstandingOuterBorder,
  OutstandingInnerBorder,
  ThreeRContainer,
  OutstandingCCS,
  OutstandingH2,
  OutstandingH3,
  OutstandingH4,
  OutstandingH5,
  OutstandingH6,
  OutstandingSignatures,
  ThreeRHR,
  CommunityServiceStar,
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
import principalSignature from "../styles/images/signature.png";
import Logo from "../styles/images/Logo.png";
import GoldStar from "../styles/images/goldstar.png";

const CommunityServiceCertificate = ({ students, currentQuarter }) => {
  const certs = students.map((student) => {
    return (
      <div key={`${student.id}communityservice`}>
        <CertDiv>
          <ThreeRContainer>
            <OutstandingCCS src={Logo} alt="CCS Logo"></OutstandingCCS>
            <OutstandingOuterBorder>
              <OutstandingInnerBorder>
                <OutstandingH4>Frederickson Elementary</OutstandingH4>
                <OutstandingH1 style={{ fontSize: "4rem" }}>
                  Cougar Community Service Award
                </OutstandingH1>
                <OutstandingH5>is hereby granted to</OutstandingH5>
                <OutstandingH2>{student.name}</OutstandingH2>
                <OutstandingH5>For community service during the</OutstandingH5>
                <OutstandingH3>
                  {currentQuarter} of the {schoolYear} School Year
                </OutstandingH3>
                <Signature
                  style={{ marginBottom: "-4.5rem" }}
                  src={principalSignature}
                  alt="Annie Pichot"
                ></Signature>
                <OutstandingSignatures>
                  <ThreeRHR />
                  <ThreeRHR />
                </OutstandingSignatures>
                <OutstandingSignatures>
                  <OutstandingH6>Principal</OutstandingH6>
                  <OutstandingH6>Teacher</OutstandingH6>
                </OutstandingSignatures>
              </OutstandingInnerBorder>
            </OutstandingOuterBorder>
            <CommunityServiceStar src={GoldStar} alt="Community Service Logo" />
          </ThreeRContainer>
        </CertDiv>
        <CertDiv>
          <ThreeRWriteupContainer>
            <ThreeRLogoContainer>
              <ThreeRLogoImage src={Logo} alt="CCS Logo" />
            </ThreeRLogoContainer>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <ThreeRWriteupTitle style={{ width: "100%" }}>
                Cougar Community Service Award
              </ThreeRWriteupTitle>
              <ThreeRh3 style={{ width: "100%" }}>{student.name}</ThreeRh3>
              <ThreeRWriteup>{student.ccsWriteup}</ThreeRWriteup>
            </div>
            <ThreeRWriteupSignature>
              <ThreeRWriteupTeacherDiv>
                <ThreeRh5 style={{ marginTop: "1rem" }}>
                  {student.communityServiceChosenBy}, Recess Specialists
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

export default CommunityServiceCertificate;
