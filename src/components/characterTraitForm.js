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
import { getDatabase, ref, update } from "firebase/database";

const TraitForm = ({
  name,
  teacher,
  id,
  dbCharacterTrait,
  characterTraitVerse,
}) => {
  const [characterTrait, setCharacterTrait] = useState(dbCharacterTrait);
  const [verseOptions, setVerseOptions] = useState(
    characterTraitsVerses[dbCharacterTrait]
  );
  const [verseChosen, setVerseChosen] = useState(characterTraitVerse);
  const [verseText, setVerseText] = useState(bibleVerses[characterTraitVerse]);

  const database = getDatabase();

  function handleChange(e) {
    e.preventDefault();
    setCharacterTrait(e.target.value);
    if (e.target.value !== "none") {
      setVerseOptions(characterTraitsVerses[e.target.value]);
    } else {
      setVerseOptions([""]);
      setVerseChosen("none");
      setVerseText("");
    }

    if (teacher !== "Omary Velez-Caraballo" && teacher !== "Toni DePoister") {
      update(ref(database, `classroom/${teacher}/${id}`), {
        characterTrait: e.target.value,
        characterTraitVerse: "none",
      });
    } else {
      update(ref(database, `elc/${teacher}/${id}`), {
        characterTrait: e.target.value,
        characterTraitVerse: "none",
      });
    }
  }

  function handleVerseChosen(e) {
    e.preventDefault();
    setVerseChosen(e.target.value);
    if (e.target.value !== "none") {
      setVerseText(bibleVerses[e.target.value]);
    } else {
      setVerseText("");
    }

    if (teacher !== "Omary Velez-Caraballo" && teacher !== "Toni DePoister") {
      update(ref(database, `classroom/${teacher}/${id}`), {
        characterTraitVerse: e.target.value,
      });
    } else {
      update(ref(database, `elc/${teacher}/${id}`), {
        characterTraitVerse: e.target.value,
      });
    }
  }

  const traitOptions = characterTraits.map((trait) => (
    <option key={trait} value={trait}>
      {trait}
    </option>
  ));

  const verseOptionsList = verseOptions.map((verse) => (
    <option key={verse} value={verse}>
      {verse}
    </option>
  ));
  return (
    <>
      <TraitCertificate
        name={name}
        verse={verseChosen}
        trait={characterTrait}
        verseText={verseText}
        classroom={teacher}
      ></TraitCertificate>
      <BackgroundDiv className="d-print-none">
        <DisplayAwardsContainer>
          <StyledTable>
            <tbody>
              <tr style={{ margin: "0 auto" }}>
                <td style={{ width: "20%" }}>{name}</td>
                <td style={{ width: "20%" }}>
                  <Form.Control
                    as="select"
                    id={`Trait-${name}`}
                    value={characterTrait}
                    onChange={handleChange}
                  >
                    <option value="none" defaultChecked></option>
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
                    <option value="none" defaultChecked></option>
                    {verseOptionsList}
                  </Form.Control>
                </td>
                <td style={{ width: "40%" }}>{verseText}</td>
              </tr>
            </tbody>
          </StyledTable>
        </DisplayAwardsContainer>
      </BackgroundDiv>
    </>
  );
};

export default TraitForm;
