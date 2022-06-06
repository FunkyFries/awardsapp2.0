import React from "react";
import {
  PrintDiv,
  CertDiv,
  PromotionH1,
  OutstandingOuterBorder,
  OutstandingInnerBorder,
  ThreeRContainer,
  PromotionCCS,
  OutstandingH2,
  OutstandingH5,
  OutstandingH6,
  OutstandingSignatures,
  ThreeRHR,
  PromotionSeal,
} from "../styles/certstyles";
import Seal from "../styles/images/Seal.png";
import Logo from "../styles/images/FullLogo.png";

const SixthCertificate = ({ students }) => {
  const certs = students.map((student) => {
    return (
      <div key={`${student.id}promotion`}>
        <CertDiv>
          <ThreeRContainer>
            <OutstandingOuterBorder>
              <OutstandingInnerBorder>
                <PromotionCCS src={Logo} alt="CCS Logo"></PromotionCCS>
                <PromotionH1>SIXTH GRADE PROMOTION</PromotionH1>
                <OutstandingH5 style={{ fontSize: "1.3rem" }}>
                  This certifies that
                </OutstandingH5>
                <OutstandingH2>{student.name}</OutstandingH2>
                <OutstandingH5 style={{ fontSize: "1.3rem" }}>
                  has been awarded this certificate for successfully completing
                  <br />
                  the sixth grade at Cascade Christian Schools
                  <br />
                  during the 2021-2022 school year.
                </OutstandingH5>
                <OutstandingSignatures
                  style={{ justifyContent: "space-between", margin: "0 2rem" }}
                >
                  <ThreeRHR />
                  <ThreeRHR />
                </OutstandingSignatures>
                <OutstandingSignatures
                  style={{
                    justifyContent: "space-between",
                    width: "75%",
                    margin: "0 auto",
                  }}
                >
                  <OutstandingH6>Principal</OutstandingH6>
                  <OutstandingH6>Teacher</OutstandingH6>
                </OutstandingSignatures>
              </OutstandingInnerBorder>
            </OutstandingOuterBorder>
            <PromotionSeal src={Seal} alt="Promotion Seal" />
          </ThreeRContainer>
        </CertDiv>
      </div>
    );
  });
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default SixthCertificate;
