export const teachers = [
  "Angel Martin",
  "Kaitlyn Johnson",
  "Jamie Estep",
  "Kathy Dilley",
  "AnnaLisa Lang",
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
  "Kathy Dilley",
  "AnnaLisa Lang",
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

export const recessSpecialists = ["Mrs. Raab & Mrs. Zaharevich"];

export const specialists = [
  "Ryan Leach",
  "Bre Jeffries",
  "Denise Sievers",
  "Bryan Botka",
  "Rene Perry",
];

export function determineGrade(classroom) {
  if (classroom === "Angel Martin" || classroom === "Kaitlyn Johnson") {
    return "Kindergarten";
  } else if (classroom === "Kathy Dilley" || classroom === "Jamie Estep") {
    return "First Grade";
  } else if (classroom === "Kellie Terpstra" || classroom === "AnnaLisa Lang") {
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
