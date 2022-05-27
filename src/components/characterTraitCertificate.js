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
import unshakeableLogo from "../styles/images/unshakeablealt.png";
import Logo from "../styles/images/Logo.png";

const SpiritualTraitCertificate = ({ name, trait, verse, verseText }) => {
  return (
    <PrintDiv key={`${name}characterTrait`} className="d-none d-print-block">
      <CertDiv>
        <ThreeRContainer style={{ flexWrap: "wrap" }}>
          <OutstandingOuterBorder>
            <OutstandingInnerBorder>
              <AllInContainer style={{ paddingTop: "1rem" }}>
                <SpiritualTraitTitle>
                  Cascade Christian Schools <i>Frederickson Elementary</i>
                </SpiritualTraitTitle>
                <AllInLogo
                  style={{ paddingTop: "2rem", paddingBottom: "1rem" }}
                  src={unshakeableLogo}
                  alt="Unshakeable Logo"
                />
                <SpiritualHr></SpiritualHr>
                <SpiritualTraitName>{name}</SpiritualTraitName>
                <SpiritualTraitDescription>
                  is being awarded the character quality of
                </SpiritualTraitDescription>
                <SpiritualTrait style={{ paddingTop: "1rem" }}>
                  {trait}
                </SpiritualTrait>
                <SpiritualTraitVerse style={{ paddingTop: ".5rem" }}>
                  {verseText} {verse}
                </SpiritualTraitVerse>
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
