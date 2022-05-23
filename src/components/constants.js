import moment from "moment";
import {
  StyledCard,
  CardImg,
  CardBody,
  CardTitle,
} from "../styles/awardstyles";
import AwardForm from "../components/awardform";

export function currentQuarter() {
  if (moment().isBefore("2022-01-24")) {
    return "First Quarter";
  } else if (moment().isBefore("2022-03-20")) {
    return "Second Quarter";
  } else if (moment().isBefore("2022-05-23")) {
    return "Third Quarter";
  } else {
    return "Fourth Quarter";
  }
}

export const teachers = [
  "Angel Martin",
  "Kaitlyn Johnson",
  "Jamie Estep",
  "Kristal Weber",
  "Annalisa Lang",
  "Kellie Terpstra",
  "Kim Pederson",
  "Trista Haberman",
  "Claude Kranik",
  "Kabrina Kidd",
  "Nathan Lenhart",
  "Michelle Medina",
  "Kristin Helle",
  "Kelly Kidd",
];

export const primaryTeachers = [
  "Angel Martin",
  "Kaitlyn Johnson",
  "Jamie Estep",
  "Kristal Weber",
  "Annalisa Lang",
  "Kellie Terpstra",
];

export const intermediateTeachers = [
  "Kim Pederson",
  "Trista Haberman",
  "Claude Kranik",
  "Kabrina Kidd",
  "Nathan Lenhart",
  "Michelle Medina",
  "Kristin Helle",
  "Kelly Kidd",
];

export const bandTeachers = ["Kelly Kidd", "Kristin Helle"];

export const recessSpecialists = "Mrs. Raab & Mrs. Zaharevich";

export const specialists = [
  "Ryan Leach",
  "Bre Jeffries",
  "Denise Sievers",
  "Bryan Botka",
  "Rene Perry",
  "Kirsten Howard",
];

export function determineGrade(classroom) {
  if (classroom === "Angel Martin" || classroom === "Kaitlyn Johnson") {
    return "Kindergarten";
  } else if (classroom === "Kristal Weber" || classroom === "Jamie Estep") {
    return "First Grade";
  } else if (classroom === "Kellie Terpstra" || classroom === "Annalisa Lang") {
    return "Second Grade";
  } else if (classroom === "Trista Haberman" || classroom === "Kim Pederson") {
    return "Third Grade";
  } else if (
    classroom === "Claude Kranik" ||
    classroom === "Kabrina Kidd" ||
    classroom === "Nathan Lenhart"
  ) {
    return "Fourth Grade";
  } else if (classroom === "Michelle Medina") {
    return "Fifth Grade";
  } else if (classroom === "Kelly Kidd" || classroom === "Kristin Helle") {
    return "Sixth Grade";
  }
}

export function determineTeacherSignature(teacher) {
  switch (teacher) {
    case "Angel Martin":
      return "Mrs. Martin";
    case "Kaitlyn Johnson":
      return "Mrs. Johnson";
    case "Jamie Estep":
      return "Mrs. Estep";
    case "Kristal Weber":
      return "Mrs. Weber";
    case "Kellie Terpstra":
      return "Ms. Terpstra";
    case "Annalisa Lang":
      return "Ms. Lang";
    case "Trista Haberman":
      return "Mrs. Haberman";
    case "Kim Pederson":
      return "Ms. Pederson";
    case "Claude Kranik":
      return "Mr. Kranik";
    case "Kabrina Kidd":
      return "Ms. Kidd";
    case "Nathan Lenhart":
      return "Mr. Lenhart";
    case "Michelle Medina":
      return "Mrs. Weber";
    case "Kelly Kidd":
      return "Mrs. Kidd";
    case "Kristin Helle":
      return "Mrs. Helle";
    default:
      console.log(`Sorry, ${teacher} not found.`);
      break;
  }
}

export function determineSpecialistSignature(teacher) {
  switch (teacher) {
    case "Ryan Leach":
      return "Mr. Leach";
    case "Denise Sievers":
      return "Mrs. Sievers";
    case "Bryan Botka":
      return "Mr. Botka";
    case "Bre Jeffries":
      return "Mrs. Jeffries";
    case "Rene Perry":
      return "Ms. Perry";
    case "Kirsten Howard":
      return "Miss Kiki";
    default:
      console.log(`Sorry ${teacher} not found.`);
      break;
  }
}

export function generateCard(
  student,
  disableRespect,
  disableResponsibility,
  disableRelationship,
  disableSpiritualTheme,
  disableOutstanding,
  disableCommunityPrimary,
  disableCommunityIntermediate,
  disableTerrificPrimary,
  disableTerrificIntermediate,
  userName,
  userInfoRole
) {
  return (
    <StyledCard key={student.id}>
      <CardImg src={student.imageUrl} />
      <CardBody>
        <CardTitle>{student.name}</CardTitle>
        <AwardForm
          id={student.id}
          disableRespect={disableRespect}
          disableResponsibility={disableResponsibility}
          disableRelationship={disableRelationship}
          disableSpiritualTheme={disableSpiritualTheme}
          disableOutstanding={disableOutstanding}
          teacher={student.classroom}
          spiritualThemeAward={student.spiritualTheme}
          outstandingAchievement={student.outstandingAchievement}
          wowAward={student.wowAward}
          cougarCommunityService={student.cougarCommunityService}
          communityServiceChosenBy={student.communityServiceChosenBy}
          disableCommunityPrimary={disableCommunityPrimary}
          disableCommunityIntermediate={disableCommunityIntermediate}
          terrificKid={student.terrificKid}
          terrificKidChosenBy={student.terrificKidChosenBy}
          disableTerrificPrimary={disableTerrificPrimary}
          disableTerrificIntermediate={disableTerrificIntermediate}
          acceleratedReader={student.acceleratedReader}
          words={student.words}
          threeR={student.threeR}
          userName={userName}
          role={userInfoRole}
          pastAwards={student.pastAwards}
        />
      </CardBody>
    </StyledCard>
  );
}
