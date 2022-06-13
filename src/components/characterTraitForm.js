import Form from "react-bootstrap/Form";
import { useState } from "react";
import {
  characterTraits,
  characterTraitsVerses,
  bibleVerses,
} from "./constants";
import {
  BackgroundDiv,
  DisplayAwardsContainer,
  StyledTable,
} from "../styles/displayawardstyles";
import TraitCertificate from "../components/characterTraitCertificate";
import "firebase/database";

const TraitForm = ({ name }) => {
  const [characterTrait, setCharacterTrait] = useState("");
  const [verseOptions, setVerseOptions] = useState([""]);
  const [verseChosen, setVerseChosen] = useState("");
  const [verseText, setVerseText] = useState("");

  function handleChange(e) {
    setCharacterTrait(e.target.value);
    setVerseOptions(characterTraitsVerses[e.target.value]);
  }

  function handleVerseChosen(e) {
    setVerseChosen(e.target.value);
    setVerseText(bibleVerses[e.target.value]);
  }

  const traitOptions = characterTraits.map((trait) => (
    <option value={trait}>{trait}</option>
  ));

  const verseOptionsList = verseOptions.map((verse) => (
    <option value={verse}>{verse}</option>
  ));
  return (
    <>
      <TraitCertificate
        name={name}
        verse={verseChosen}
        trait={characterTrait}
        verseText={verseText}
      ></TraitCertificate>
      <BackgroundDiv className="d-print-none">
        <DisplayAwardsContainer>
          <StyledTable>
            <tr style={{ margin: "0 auto" }}>
              <td style={{ width: "20%" }}>{name}</td>
              <td style={{ width: "20%" }}>
                <Form.Control
                  as="select"
                  id={`Trait-${name}`}
                  value={characterTrait}
                  onChange={handleChange}
                >
                  <option value="" defaultChecked></option>
                  {traitOptions}
                </Form.Control>
              </td>
              <td style={{ width: "20%" }}>
                <Form.Control
                  as="select"
                  id={`Verse-${name}`}
                  value={verseChosen}
                  onChange={handleVerseChosen}
                >
                  <option value="" defaultChecked></option>
                  {verseOptionsList}
                </Form.Control>
              </td>
              <td style={{ width: "40%" }}>{verseText}</td>
            </tr>
          </StyledTable>
        </DisplayAwardsContainer>
      </BackgroundDiv>
    </>
  );
};

export default TraitForm;
