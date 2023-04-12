import React from "react";
import {
  PrintDiv,
  CertDiv,
  WowH1,
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
  OutstandingStar,
  Signature,
} from "../styles/certstyles";
import { schoolYear } from "./constants";
import principalSignature from "../styles/images/signature.png";
import Logo from "../styles/images/Logo.png";
import wowstar from "../styles/images/wowstar.png";

const WowCertificate = ({ students, currentQuarter }) => {
  const certs = students.map((student) => (
    <CertDiv key={`${student.id}wow`}>
      <ThreeRContainer>
        <OutstandingCCS src={Logo} alt="CCS Logo"></OutstandingCCS>
        <OutstandingOuterBorder>
          <OutstandingInnerBorder>
            <OutstandingH4>Frederickson Elementary</OutstandingH4>
            <WowH1>Wow Award</WowH1>
            <OutstandingH5>is hereby granted to</OutstandingH5>
            <OutstandingH2>{student.name}</OutstandingH2>
            <OutstandingH5>
              for the completion of their semester goal during the
            </OutstandingH5>
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
        <OutstandingStar src={wowstar} alt="Star Logo" />
      </ThreeRContainer>
    </CertDiv>
  ));
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default WowCertificate;
