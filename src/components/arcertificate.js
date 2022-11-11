import React from "react";
import {
  PrintDiv,
  CertDiv,
  H1,
  H2,
  H3,
  H4,
  P,
  Img,
  Signatures,
  HR,
  OutstandingOuterBorder,
  OutstandingInnerBorder,
  Signature,
  ThreeRContainer,
} from "../styles/certstyles";
import { determineGrade } from "./constants";
import Logo from "../styles/images/Logo.png";
import principalSignature from "../styles/images/signature.png";

const ArCertificate = ({ students, currentQuarter }) => {
  const certs = students.map((student) => {
    const formattedWords = student.words
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
      <CertDiv key={student.id}>
        <ThreeRContainer>
          <OutstandingOuterBorder>
            <OutstandingInnerBorder style={{ width: "100%", margin: "0 auto" }}>
              <div style={{ display: "inline", width: "100%" }}>
                <H1>AR Reader of the Quarter</H1>
                <H4>presented to</H4>
                <H2>{student.name}</H2>
                <H3>
                  on this 16th day of November, 2022 for reading{" "}
                  {formattedWords} words in the {currentQuarter.toLowerCase()}!
                </H3>
                <H3>The most in {determineGrade(student.classroom)}!</H3>
                <Img
                  style={{ width: "13%", marginTop: "2rem" }}
                  src={Logo}
                  alt="CCS Logo"
                />
                <Signature
                  src={principalSignature}
                  alt="Annie Pichot"
                ></Signature>
                <Signatures>
                  <HR></HR>
                  <HR></HR>
                </Signatures>
                <P>
                  <q>
                    There is more treasure in books, than in all the pirate's
                    loot on Treasure Island.
                  </q>{" "}
                  - Walt Disney
                </P>
              </div>
            </OutstandingInnerBorder>
          </OutstandingOuterBorder>
        </ThreeRContainer>
      </CertDiv>
    );
  });
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default ArCertificate;
