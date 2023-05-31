import React from "react";
import {
  CertDiv,
  PrintDiv,
  ThreeRSignatures,
  ThreeRHR,
  OutstandingInnerBorder,
  OutstandingOuterBorder,
  AllInLogo,
  AllInContainer,
  ThreeRContainer,
  AllInCCS,
  SpiritualTraitTitle,
  SpiritualTraitDescription,
  SpiritualTraitName,
  SpiritualTraitVerse,
  SpiritualTrait,
  SpiritualHr,
} from "../styles/certstyles";
import { elcStudents } from "./constants";
import rootedLogo from "../styles/images/rootedlogo.png";
import Logo from "../styles/images/Logo.png";

const SpiritualTraitCertificate = ({
  name,
  trait,
  verse,
  verseText,
  classroom,
}) => {
  return (
    <PrintDiv key={`${name}characterTrait`} className="d-none d-print-block">
      <CertDiv>
        <ThreeRContainer style={{ flexWrap: "wrap" }}>
          <OutstandingOuterBorder>
            <OutstandingInnerBorder style={{ width: "100%" }}>
              <AllInContainer style={{ paddingTop: "1rem" }}>
                <SpiritualTraitTitle>
                  Cascade Christian Schools{" "}
                  <i>
                    {classroom === "Omary Velez-Caraballo" ||
                    classroom === "Toni DePoister"
                      ? "Frederickson ELC"
                      : "Frederickson Elementary"}
                  </i>
                </SpiritualTraitTitle>
                <AllInLogo
                  style={{
                    paddingTop: "0rem",
                    paddingBottom: "1rem",
                    width: "40%",
                    margin: "0 auto",
                  }}
                  src={rootedLogo}
                  alt="Rooted Logo"
                />
                <SpiritualHr></SpiritualHr>
                <SpiritualTraitName>{name}</SpiritualTraitName>
                <SpiritualTraitDescription>
                  is being awarded the character quality of
                </SpiritualTraitDescription>
                <SpiritualTrait
                  style={{
                    marginTop: ".5rem",
                    paddingBottom: 0,
                    marginBottom: 0,
                  }}
                >
                  {trait}
                </SpiritualTrait>
                <SpiritualTraitVerse style={{ paddingTop: "0" }}>
                  {verseText} {verse}
                </SpiritualTraitVerse>
              </AllInContainer>
              <ThreeRSignatures style={{ width: "100%" }}>
                <ThreeRHR />
                <ThreeRHR />
              </ThreeRSignatures>
              <ThreeRSignatures style={{ width: "100%" }}>
                <h6>
                  {classroom === "Omary Velez-Caraballo" ||
                  classroom === "Toni DePoister"
                    ? "Supervisor"
                    : "Principal"}
                </h6>
                <h6>Teacher</h6>
              </ThreeRSignatures>
            </OutstandingInnerBorder>
          </OutstandingOuterBorder>
          <AllInCCS
            style={{ paddingBottom: "1.5rem" }}
            src={Logo}
            alt="CCS Logo"
          />
        </ThreeRContainer>
      </CertDiv>
    </PrintDiv>
  );
};

export default SpiritualTraitCertificate;
