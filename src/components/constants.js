import moment from "moment";
import {
  StyledCard,
  CardImg,
  CardBody,
  CardTitle,
} from "../styles/awardstyles";
import AwardForm from "../components/awardform";

export function currentQuarter() {
  if (moment().isBefore("2023-01-24")) {
    return "First Quarter";
  } else if (moment().isBefore("2023-03-20")) {
    return "Second Quarter";
  } else if (moment().isBefore("2023-05-23")) {
    return "Third Quarter";
  } else {
    return "Fourth Quarter";
  }
}

export const teachers = [
  "Angel Martin",
  "Kaitlyn Miller",
  "Jamie Estep",
  "Janna White",
  "Annalisa Lang",
  "Christine DeWaal",
  "Kim Pederson",
  "Kabrina Kidd",
  "Claude Kranik",
  "Nathan Lenhart",
  "Michelle Medina",
  "Tammy Akins",
  "Kristin Helle",
  "Kelly Kidd",
];

export const primaryTeachers = [
  "Angel Martin",
  "Kaitlyn Miller",
  "Jamie Estep",
  "Janna White",
  "Annalisa Lang",
  "Christine DeWaal",
];

export const intermediateTeachers = [
  "Kim Pederson",
  "Kabrina Kidd",
  "Claude Kranik",
  "Nathan Lenhart",
  "Michelle Medina",
  "Tammy Akins",
  "Kristin Helle",
  "Kelly Kidd",
];

export const bandTeachers = ["Kelly Kidd", "Kristin Helle"];

export const recessSpecialists = "Mrs. Raab & Mrs. Zaharevich";

export const specialists = [
  "Angela Tiegs",
  "Bre Jeffries",
  "Jennifer Alexander",
  "Bryan Botka",
  "Rene Perry",
  "Kirsten Howard",
];

export function determineGrade(classroom) {
  if (classroom === "Angel Martin" || classroom === "Kaitlyn Miller") {
    return "Kindergarten";
  } else if (classroom === "Janna White" || classroom === "Jamie Estep") {
    return "First Grade";
  } else if (
    classroom === "Christine DeWaal" ||
    classroom === "Annalisa Lang"
  ) {
    return "Second Grade";
  } else if (classroom === "Kabrina Kidd" || classroom === "Kim Pederson") {
    return "Third Grade";
  } else if (classroom === "Claude Kranik" || classroom === "Nathan Lenhart") {
    return "Fourth Grade";
  } else if (classroom === "Michelle Medina" || classroom === "Tammy Akins") {
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
    case "Kaitlyn Miller":
      return "Mrs. Miller";
    case "Jamie Estep":
      return "Mrs. Estep";
    case "Janna White":
      return "Mrs. White";
    case "Christine DeWaal":
      return "Mrs. DeWaal";
    case "Annalisa Lang":
      return "Ms. Lang";
    case "Kabrina Kidd":
      return "Mrs. Kidd";
    case "Kim Pederson":
      return "Ms. Pederson";
    case "Claude Kranik":
      return "Mr. Kranik";
    case "Nathan Lenhart":
      return "Mr. Lenhart";
    case "Michelle Medina":
      return "Mrs. Medina";
    case "Tammy Akins":
      return "Mrs. Akins";
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
    case "Angela Tiegs":
      return "Mrs. Tiegs";
    case "Jennifer Alexander":
      return "Mrs. Alexander";
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

export const characterTraits = [
  "Alertness",
  "Ambition",
  "Analytical",
  "Attentiveness",
  "Attitude",
  "Boldness",
  "Carefulness",
  "Cautiousness",
  "Charity",
  "Cheerfulness",
  "Commitment",
  "Compassion",
  "Consistency",
  "Contentment",
  "Courageous",
  "Courteous",
  "Creativity",
  "Decisiveness",
  "Dependable",
  "Determination",
  "Diligence",
  "Discernment",
  "Discretion",
  "Eagerness",
  "Eloquence",
  "Encouragement",
  "Endurance",
  "Energetic",
  "Enthusiasm",
  "Excellence",
  "Fairness",
  "Faith",
  "Flexibility",
  "Forgiveness",
  "Friendliness",
  "Generosity",
  "Gentleness",
  "Genuine",
  "Godliness",
  "Gracious",
  "Gratefulness",
  "Gregarious",
  "Helpfulness",
  "Honesty",
  "Honor",
  "Hopefulness",
  "Hospitality",
  "Humility",
  "Humor",
  "Industrious",
  "Influence",
  "Ingenuity",
  "Initiative",
  "Inspirational",
  "Integrity",
  "Joyfulness",
  "Justice",
  "Kindness",
  "Knowledgeable",
  "Leadership",
  "Love",
  "Loyalty",
  "Meekness",
  "Merciful",
  "Obedience",
  "Observant",
  "Orderliness",
  "Patient",
  "Patriotism",
  "Peaceful",
  "Perseverence",
  "Persistance",
  "Persuasiveness",
  "Pleasant",
  "Prayerfulness",
  "Punctuality",
  "Promptness",
  "Purity",
  "Reliability",
  "Respectful",
  "Resourcefulness",
  "Responsibility",
  "Righteousness",
  "Self-control",
  "Sensitivity",
  "Selflessness",
  "Sincerity",
  "Stewardship",
  "Teachability",
  "Tenderheartedness",
  "Thankfulness",
  "Thoroughness",
  "Tolerance",
  "Trustworthy",
  "Truthfulness",
  "Understanding",
  "Wisdom",
  "Vigilence",
  "Vision",
  "Vivaciousness",
  "Zeal",
];
export const characterTraitsVerses = {
  Alertness: ["Mark 14:38", "1 Peter 5:8"],
  Ambition: ["Romans 12:11", "Philippians 3:13-14"],
  Analytical: ["Ecclesiastes 3:1"],
  Attentiveness: ["Proverbs 4:20-22", "1 Peter 5:8"],
  Attitude: ["Philippians 2:5"],
  Boldness: ["Acts 4:29b", "Ephesians 3:12"],
  Carefulness: ["Ephesians 5:15"],
  Cautiousness: ["Proverbs 19:2"],
  Charity: ["Matthew 25:35", "Romans 12:8"],
  Cheerfulness: ["Proverbs 15:13", "Romans 12:8"],
  Commitment: ["Proverbs 16:3"],
  Compassion: ["Ephesians 4:32", "Colossians 3:12", "1 John 3:17"],
  Consistency: ["1 Corinthians 15:58"],
  Contentment: [
    "Proverbs 14:30",
    "Philippians 4:11-12",
    "1 Timothy 6:6",
    "Hebrews 13:5",
  ],
  Courageous: [
    "Joshua 1:7",
    "Joshua 1:9",
    "Philippians 4:13",
    "1 Corinthians 16:13",
    "Psalm 27:14",
  ],
  Courteous: ["Titus 3:2b", "1 Peter 3:8"],
  Creativity: ["Exodus 31:3-4", "Isaiah 64:8"],
  Decisiveness: ["Joshua 24:15", "Philippians 1:9-10"],
  Dependable: ["1 Corinthians 4:1-2", "Ephesians 6:13-14", "Philippians 1:27"],
  Determination: ["2 Timothy 4:7-8"],
  Diligence: ["Romans 12:11", "Colossians 3:23"],
  Discernment: [
    "2 Kings 22:2",
    "Psalm 119:66",
    "Philippians 1:10",
    "Proverbs 3:21-22",
  ],
  Discretion: ["Proverbs 2:11"],
  Eagerness: ["2 Corinthians 9:2", "1 Peter 5:2"],
  Eloquence: ["Proverbs 25:11"],
  Encouragement: ["Ephesians 4:29", "1 Thessalonians 5:11a"],
  Endurance: ["Romans 15:4", "1 Corinthians 15:58", "2 Timothy 4:7"],
  Energetic: ["1 Corinthians 15:58", "Colossians 1:29"],
  Enthusiasm: ["Romans 12:11", "2 Corinthians 9:2"],
  Excellence: ["2 Corinthians 8:7", "Philippians 4:8"],
  Fairness: ["Micah 6:8", "Luke 6:31"],
  Faith: ["Hebrews 11:1", "Hebrews 11:3"],
  Flexibility: ["Philippians 4:12"],
  Forgiveness: [
    "Matthew 6:14",
    "Matthew 18:21-22",
    "Colossians 3:13",
    "Ephesians 4:32",
  ],
  Friendliness: ["Proverbs 17:17", "Proverbs 18:24b", "John 15:13"],
  Generosity: [
    "Proverbs 11:25",
    "Proverbs 22:9",
    "1 Timothy 6:18",
    "2 Corinthians 9:6b-7",
  ],
  Gentleness: ["Ephesians 4:32", "Philippians 4:5"],
  Genuine: ["1 Peter 1:7"],
  Godliness: ["1 Timothy 2:2-3", "1 Timothy 4:7-8", "1 Timothy 6:11"],
  Gracious: ["2 Corinthians 8:7", "2 Timothy 2:1", "2 Peter 3:18"],
  Gratefulness: ["Ephesians 5:20", "Colossians 3:16"],
  Gregarious: ["Romans 12:11"],
  Helpfulness: ["Isaiah 41:6", "Acts 11:29-30", "1 Corinthians 12:28"],
  Honesty: ["Proverbs 12:17", "Romans 12:17", "Ephesians 4:25"],
  Honor: ["Romans 12:10", "Hebrews 13:18"],
  Hopefulness: ["Psalm 25:21", "Romans 5:5", "Hebrews 6:19a", "Romans 15:13"],
  Hospitality: ["Romans 12:13", "Titus 1:8", "Hebrews 13:2", "1 Peter 4:9"],
  Humility: [
    "Psalm 25:9",
    "Psalm 37:11",
    "Psalm 149:4",
    "Matthew 5:5",
    "Matthew 18:4",
    "Philippians 2:3",
    "Titus 3:1-2",
    "Hebrews 13:2",
    "1 Peter 5:6",
  ],
  Humor: ["Psalm 100:1-2", "Psalm 126:2", "Proverbs 17:22"],
  Industrious: ["Colossians 3:23", "1 Timothy 4:10"],
  Influence: ["Matthew 5:14", "Mark 16:15", "2 Timothy 2:2"],
  Ingenuity: ["Exodus 31:3", "Isaiah 64:8"],
  Initiative: ["Philippians 3:14", "Colossians 1:29"],
  Inspirational: ["2 Corinthians 2:14", "Titus 2:9-10"],
  Integrity: ["Psalm 25:21", "Psalm 41:12", "Proverbs 10:9a"],
  Joyfulness: [
    "1 Chronicles 16:33",
    "Psalm 100:1-2",
    "1 Thessalonians 5:16-18",
    "Philippians 4:4",
  ],
  Justice: ["Psalm 11:7", "Psalm 37:28", "Micah 6:8", "Zechariah 7:9"],
  Kindness: ["Ephesians 4:32", "Colossians 3:12", "2 Peter 1:7-8"],
  Knowledgeable: [
    "Proverbs 23:23",
    "Proverbs 8:10-11",
    "Philippians 1:9-10",
    "2 Peter 1:5-6",
  ],
  Leadership: ["Matthew 5:16", "Mark 10:43", "Romans 12:8", "1 Timothy 3:1"],
  Love: [
    "John 13:35",
    "John 15:13",
    "1 John 2:10",
    "1 John 4:7-8",
    "1 John 4:11",
  ],
  Loyalty: ["Proverbs 17:17", "John 15:13", "Romans 12:10"],
  Meekness: ["Psalm 25:9", "Psalm 37:11", "Psalm 149:4", "Matthew 5:5"],
  Merciful: ["Micah 6:8", "Zechariah 7:9", "Matthew 5:7", "Romans 12:8"],
  Obedience: ["Colossians 3:20", "Hebrews 13:17", "Titus 3:1-2"],
  Observant: ["Deuteronomy 4:6", "Psalm 37:37"],
  Orderliness: ["1 Corinthians 14:40"],
  Patient: ["2 Corinthians 6:4 & 6", "James 1:19", "James 5:8"],
  Patriotism: ["Timothy 2:3-4", "1 Peter 2:17"],
  Peaceful: ["Romans 12:17-18", "1 Peter 3:8", "Titus 3:1-2"],
  Perseverence: [
    "Romans 2:7",
    "1 Corinthians 15:58",
    "1 Corinthians 16:13",
    "Philippians 3:13-14",
    "James 1:4",
  ],
  Persistance: [
    "Romans 2:7",
    "1 Corinthians 15:58",
    "1 Corinthians 16:13",
    "Philippians 3:13-14",
    "James 1:4",
  ],
  Persuasiveness: ["1 Peter 3:15"],
  Pleasant: ["Proverbs 16:21", "Proverbs 16:24", "Titus 3:2b"],
  Prayerfulness: ["Matthew 6:6", "Philippians 4:6", "1 Thessalonians 5:16-18"],
  Punctuality: ["Ecclesiastes 3:1"],
  Promptness: ["Ecclesiastes 3:1"],
  Purity: ["2 Corinthians 6:4 & 6", "1 Timothy 4:12"],
  Reliability: ["1 Corinthians 4:1-2", "Ephesians 6:13-14", "Philippians 1:27"],
  Respectful: ["Romans 12:16", "Ephesians 6:5"],
  Resourcefulness: ["Matthew 25:21", "Luke 16:10"],
  Responsibility: [
    "Matthew 25:21",
    "Luke 16:10",
    "1 Corinthians 4:2",
    "Colossians 4:17b",
  ],
  Righteousness: [
    "Proverbs 2:7-8",
    "Proverbs 4:18",
    "Proverbs 12:28",
    "Ephesians 4:23-24",
  ],
  "Self-control": [
    "1 Thessalonians 5:6",
    "1 Thessalonians 5:8b",
    "Titus 2:11-12",
    "1 Peter 1:13",
  ],
  Sensitivity: ["Romans 12:15", "1 Corinthians 10:24", "Philippians 2:4"],
  Selflessness: ["Romans 12:15", "1 Corinthians 10:24", "Philippians 2:4"],
  Sincerity: ["1 Peter 1:22"],
  Stewardship: ["Luke 3:11", "Luke 6:38", "Luke 16:11", "2 Corinthians 9:6-7"],
  Teachability: [
    "Exodus 33:13",
    "Proverbs 4:13",
    "Proverbs 8:10",
    "Proverbs 9:9",
    "Proverbs 18:15",
  ],
  Tenderheartedness: ["Ephesians 4:32"],
  Thankfulness: ["Psalm 95:1", "Psalm 100:4", "1 Thessalonians 5:18"],
  Thoroughness: ["2 Timothy 4:7"],
  Tolerance: ["Romans 14:1", "Philippians 2:2-3", "James 2:1"],
  Trustworthy: ["Proverbs 11:13", "Luke 19:17"],
  Truthfulness: [
    "Proverbs 8:7",
    "Proverbs 12:17",
    "Proverbs 12:19",
    "Ephesians 4:25",
  ],
  Understanding: ["Proverbs 4:7", "Proverbs 9:10", "Matthew 7:24"],
  Wisdom: [
    "Proverbs 1:5",
    "Proverbs 4:7",
    "Proverbs 8:10-11",
    "Proverbs 9:12",
    "Proverbs 18:15",
  ],
  Vigilence: [
    "Mark 14:38",
    "Colossians 4:12b",
    "2 Timothy 4:5",
    "1 Peter 4:7b",
  ],
  Vision: ["Proverbs 4:10-11", "2 Corinthians 5:9", "Ephesians 1:18"],
  Vivaciousness: ["Romans 12:11", "1 Corinthians 15:58", "2 Corinthians 9:2a"],
  Zeal: ["Romans 12:11", "1 Corinthians 15:58"],
};
export const bibleVerses = {
  "1 Chronicles 16:33":
    "Let the trees of the forest sing, let them sing for joy before the LORD, for he comes to judge the earth.",
  "1 Corinthians 10:24":
    "No one should seek their own good, but the good of others.",
  "1 Corinthians 12:28":
    "And God has placed in the church first of all apostles, second prophets, third teachers, then miracles, then gifts of healing, of helping, of guidance, and of different kinds of tongues.",
  "1 Corinthians 14:40":
    "But everything should be done in a fitting and orderly way.",
  "1 Corinthians 15:58":
    "Therefore, my dear brothers and sisters, stand firm. Let nothing move you. Always give yourselves fully to the work of the Lord, because you know that your labor in the Lord is not in vain.",
  "1 Corinthians 16:13":
    "Be on your guard; stand firm in the faith; be courageous; be strong.",
  "1 Corinthians 4:1-2":
    "Let a man regard us in this manner, as servants of Christ and stewards of the mysteries of God. In this case, moreover, it is required of stewards that one be found trustworthy.",
  "1 Corinthians 4:2":
    "Now it is required that those who have been given a trust must prove faithful.",
  "1 John 2:10":
    "Anyone who loves their brother and sister lives in the light, and there is nothing in them to make them stumble.",
  "1 John 3:17":
    "If anyone has material possessions and sees a brother or sister in need but has no pity on them, how can the love of God be in that person?",
  "1 John 4:11":
    "Dear friends, since God so loved us, we also ought to love one another.",
  "1 John 4:7-8":
    "Beloved, let us love one another, for love is from God; and everyone who loves is born of God and knows God. The one who does not love does not know God, for God is love.",
  "1 Peter 1:13":
    "Therefore, with minds that are alert and fully sober, set your hope on the grace to be brought to you when Jesus Christ is revealed at his coming.",
  "1 Peter 1:22":
    "Now that you have purified yourselves by obeying the truth so that you have sincere love for each other, love one another deeply, from the heart.",
  "1 Peter 1:7":
    "These have come so that the proven genuineness of your faith—of greater worth than gold, which perishes even though refined by fire—may result in praise, glory and honor when Jesus Christ is revealed.",
  "1 Peter 2:17":
    "Show proper respect to everyone, love the family of believers, fear God, honor the emperor.",
  "1 Peter 3:15":
    "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect,",
  "1 Peter 3:8":
    "Finally, all of you, be like-minded, be sympathetic, love one another, be compassionate and humble.",
  "1 Peter 4:7b":
    "Therefore be clear minded and self-controlled so that you can pray.",
  "1 Peter 4:9": "Offer hospitality to one another without grumbling.",
  "1 Peter 5:2":
    "Be shepherds of God’s flock that is under your care, watching over them—not because you must, but because you are willing, as God wants you to be; not pursuing dishonest gain, but eager to serve;",
  "1 Peter 5:6":
    "Humble yourselves, therefore, under God’s mighty hand, that he may lift you up in due time.",
  "1 Peter 5:8":
    "Be alert and of sober mind. Your enemy the devil prowls around like a roaring lion looking for someone to devour.",
  "1 Thessalonians 5:11a":
    "Therefore encourage one another and build each other up, just as in fact you are doing.",
  "1 Thessalonians 5:16-18":
    "Rejoice always; pray without ceasing; in everything give thanks; for this is God’s will for you in Christ Jesus.",
  "1 Thessalonians 5:18":
    "Give thanks in all circumstances; for this is God’s will for you in Christ Jesus.",
  "1 Thessalonians 5:6":
    "So then, let us not be like others, who are asleep, but let us be awake and sober.",
  "1 Thessalonians 5:8b":
    "Let us be self-controlled, putting on faith and love as a breastplate, and the hope of salvation as a helmet. ",
  "1 Timothy 2:2-3":
    "For kings and all who are in authority, so that we may lead a tranquil and quiet life in all godliness and dignity. This is good and acceptable in the sight of God our Savior.",
  "1 Timothy 3:1":
    "Here is a trustworthy saying: Whoever aspires to be an overseer desires a noble task.",
  "1 Timothy 4:10":
    "That is why we labor and strive, because we have put our hope in the living God, who is the Savior of all people, and especially of those who believe.",
  "1 Timothy 4:12":
    "Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.",
  "1 Timothy 4:7-8":
    "But have nothing to do with worldly fables fit only for old women. On the other hand, discipline yourself for the purpose of godliness; for bodily discipline is only of little profit, but godliness is profitable for all things, since it holds promise for the present life and also for the life to come.",
  "1 Timothy 6:11":
    "But you, man of God, flee from all this, and pursue righteousness, godliness, faith, love, endurance and gentleness.",
  "1 Timothy 6:18":
    "Command them to do good, to be rich in good deeds, and to be generous and willing to share.",
  "1 Timothy 6:6": "But godliness with contentment is great gain.",
  "2 Corinthians 2:14":
    "But thanks be to God, who always leads us as captives in Christ’s triumphal procession and uses us to spread the aroma of the knowledge of him everywhere.",
  "2 Corinthians 5:9":
    "So we make it our goal to please him, whether we are at home in the body or away from it.",
  "2 Corinthians 6:4 & 6":
    "Rather, as servants of God we commend ourselves in every way: in great endurance; in troubles, hardships and distresses… in purity, understanding, patience and kindness; in the Holy Spirit and in sincere love.",
  "2 Corinthians 8:7":
    "But since you excel in everything—in faith, in speech, in knowledge, in complete earnestness and in the love we have kindled in you —see that you also excel in this grace of giving.",
  "2 Corinthians 9:2":
    "For I know your eagerness to help, and I have been boasting about it to the Macedonians, telling them that since last year you in Achaia were ready to give; and your enthusiasm has stirred most of them to action.",
  "2 Corinthians 9:2a":
    "For I know your eagerness to help, and I have been boasting about it…",
  "2 Corinthians 9:6-7":
    "Now this I say, he who sows sparingly will also reap sparingly, and he who sows bountifully will also reap bountifully. Each one must do just as he has purposed in his heart, not grudgingly or under compulsion, for God loves a cheerful giver.",
  "2 Corinthians 9:6b-7":
    "Whoever sows generously will also reap generously. Each man should give what he has decided in his heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
  "2 King 22:2":
    "He did what was right in the eyes of the LORD and followed completely the ways of his father David, not turning aside to the right or to the left.",
  "2 Peter 1:5-6":
    "Now for this very reason also, applying all diligence, in your faith supply moral excellence, and in your moral excellence, knowledge, and in your knowledge, self-control, and in your self-control, perseverance, and in your perseverance, godliness,",
  "2 Peter 1:7-8":
    "And in your godliness, brotherly kindness, and in your brotherly kindness, love. For if these qualities are yours and are increasing, they render you neither useless nor unfruitful in the true knowledge of our Lord Jesus Christ.",
  "2 Peter 3:18":
    "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen.",
  "2 Timothy 2:1":
    "You then, my son, be strong in the grace that is in Christ Jesus.",
  "2 Timothy 2:2":
    "And the things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others.",
  "2 Timothy 4:5":
    "But you, keep your head in all situations, endure hardship, do the work of an evangelist, discharge all the duties of your ministry.",
  "2 Timothy 4:7":
    "I have fought the good fight, I have finished the race, I have kept the faith.",
  "2 Timothy 4:7-8":
    "I have fought the good fight, I have finished the course, I have kept the faith; in the future there is laid up for me the crown of righteousness, which the Lord, the righteous Judge, will award to me on that day; and not only to me, but also to all who have loved His appearing.",
  "Acts 11:29-30":
    "And in the proportion that any of the disciples had means, each of them determined to send a contribution for the relief of the brethren living in Judea. And this they did, sending it in charge of Barnabas and Saul to the elders.",
  "Acts 4:29b":
    "And enable your servants to speak your word with great boldness.",
  "Colossians 1:29":
    "To this end I strenuously contend with all the energy Christ so powerfully works in me.",
  "Colossians 3:12":
    "Therefore, as God’s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.",
  "Colossians 3:13":
    "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
  "Colossians 3:16":
    "Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts.",
  "Colossians 3:20":
    "Children, obey your parents in everything, for this pleases the Lord.",
  "Colossians 3:23":
    "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
  "Colossians 4:12b":
    "He is always wrestling in prayer for you; that you may stand firm in all the will of God, mature and fully assured. ",
  "Colossians 4:17b":
    '"See to it that you complete the work you have received in the Lord."',
  "Deuteronomy 4:6":
    "Observe them carefully, for this will show your wisdom and understanding to the nations, who will hear about all these decrees and say, “Surely this great nation is a wise and understanding people.”",
  "Ecclesiastes 3:1":
    "There is a time for everything, and a season for every activity under the heavens.",
  "Ephesians 1:18":
    "I pray that the eyes of your heart may be enlightened in order that you may know the hope to which he has called you, the riches of his glorious inheritance in his holy people.",
  "Ephesians 3:12":
    "In him and through faith in him we may approach God with freedom and confidence.",
  "Ephesians 4:23-24":
    "And that you be renewed in the spirit of your mind, and put on the new self, which in the likeness of God has been created in righteousness and holiness of the truth.",
  "Ephesians 4:25":
    "Therefore each of you must put off falsehood and speak truthfully to your neighbor, for we are all members of one body.",
  "Ephesians 4:29":
    "Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen.",
  "Ephesians 4:32":
    "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
  "Ephesians 5:15":
    "Be very careful, then, how you live—not as unwise but as wise.",
  "Ephesians 5:20":
    "Always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ.",
  "Ephesians 6:13-14":
    "Therefore, take up the full armor of God, so that you will be able to resist in the evil day, and having done everything, to stand firm. Stand firm therefore, having girded your loins with truth, and having put on the breastplate of righteousness.",
  "Ephesians 6:5":
    "Obey your earthly masters with respect and fear, and with sincerity of heart, just as you would obey Christ.",
  "Exodus 31:3":
    "And I have filled him with the Spirit of God, with wisdom, with understanding, with knowledge and with all kinds of skills—",
  "Exodus 31:3-4":
    "“I have filled him with the Spirit of God in wisdom, in understanding, in knowledge, and in all kinds of craftsmanship, to make artistic designs for work in gold, in silver, and in bronze.",
  "Exodus 33:13":
    "If you are pleased with me, teach me your ways so I may know you and continue to find favor with you. Remember that this nation is your people.”",
  "Hebrews 11:1":
    "Now faith is confidence in what we hope for and assurance about what we do not see.",
  "Hebrews 11:3":
    "By faith we understand that the universe was formed at God’s command, so that what is seen was not made out of what was visible.",
  "Hebrews 13:17":
    "Have confidence in your leaders and submit to their authority, because they keep watch over you as those who must give an account. Do this so that their work will be a joy, not a burden, for that would be of no benefit to you.",
  "Hebrews 13:18":
    "Pray for us. We are sure that we have a clear conscience and desire to live honorably in every way.",
  "Hebrews 13:2":
    "Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it.",
  "Hebrews 13:5":
    "Keep your lives free from the love of money and be content with what you have, because God has said, “Never will I leave you; never will I forsake you.”",
  "Hebrews 6:19a":
    "We have this hope as an anchor for the soul, firm and secure.",
  "Isaiah 41:6":
    "They help each other and say to their companions, “Be strong!”",
  "Isaiah 64:8":
    "Yet you, LORD, are our Father. We are the clay, you are the potter; we are all the work of your hand.",
  "James 1:19":
    "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry.",
  "James 1:4":
    "Let perseverance finish its work so that you may be mature and complete, not lacking anything.",
  "James 2:1":
    "My brothers and sisters, believers in our glorious Lord Jesus Christ must not show favoritism.",
  "James 5:8":
    "You too, be patient and stand firm, because the Lord’s coming is near.",
  "John 13:35":
    "By this everyone will know that you are my disciples, if you love one another.”",
  "John 15:13":
    "Greater love has no one than this: to lay down one’s life for one’s friends.",
  "Joshua 1:7":
    "“Be strong and very courageous. Be careful to obey all the law my servant Moses gave you; do not turn from it to the right or to the left, that you may be successful wherever you go.",
  "Joshua 1:9":
    "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.”",
  "Joshua 24:15":
    "But if serving the LORD seems undesirable to you, then choose for yourselves this day whom you will serve, whether the gods your ancestors served beyond the Euphrates, or the gods of the Amorites, in whose land you are living. But as for me and my household, we will serve the LORD.”",
  "Luke 16:10":
    "“Whoever can be trusted with very little can also be trusted with much, and whoever is dishonest with very little will also be dishonest with much.",
  "Luke 16:11":
    "So if you have not been trustworthy in handling worldly wealth, who will trust you with true riches?",
  "Luke 19:17":
    "“’Well done, my good servant!’ his master replied. ‘Because you have been trustworthy in a very small matter, take charge of ten cities.’",
  "Luke 3:11":
    "John answered, “Anyone who has two shirts should share with the one who has none, and anyone who has food should do the same.”",
  "Luke 6:31": "Do to others as you would have them do to you.",
  "Luke 6:38":
    "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap. For with the measure you use, it will be measured to you.”",
  "Mark 10:43":
    "Not so with you. Instead, whoever wants to become great among you must be your servant.",
  "Mark 14:38":
    "Watch and pray so that you will not fall into temptation. The spirit is willing, but the flesh is weak.”",
  "Mark 16:15":
    "He said to them, “Go into all the world and preach the gospel to all creation.",
  "Matthew 18:21-22":
    "Then Peter came and said to Him, “Lord, how often shall my brother sin against me and I forgive him? Up to seven times?” Jesus said to him, “I do not say to you, up to seven times, but up to seventy times seven.",
  "Matthew 18:4":
    "Therefore, whoever takes the lowly position of this child is the greatest in the kingdom of heaven.",
  "Matthew 25:21":
    "“His master replied, ‘Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things. Come and share your master’s happiness!’",
  "Matthew 25:35":
    "For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink, I was a stranger and you invited me in.",
  "Matthew 5:14":
    "You are the light of the world. A town built on a hill cannot be hidden.",
  "Matthew 5:16":
    "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
  "Matthew 5:5": "Blessed are the meek, for they will inherit the earth.",
  "Matthew 5:7": "Blessed are the merciful, for they will be shown mercy.",
  "Matthew 6:14":
    "For if you forgive other people when they sin against you, your heavenly Father will also forgive you.",
  "Matthew 6:6":
    "But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you.",
  "Matthew 7:24":
    "Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock.",
  "Micah 6:8":
    "He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.",
  "Philippians 1:10":
    "So that you may be able to discern what is best and may be pure and blameless for the day of Christ.",
  "Philippians 1:17":
    "The former preach Christ out of selfish ambition, not sincerely, supposing that they can stir up trouble for me while I am in chains.",
  "Philippians 1:27":
    "Whatever happens, conduct yourselves in a manner worthy of the gospel of Christ. Then, whether I come and see you or only hear about you in my absence, I will know that you stand firm in the one Spirit, striving together as one for the faith of the gospel.",
  "Philippians 1:9-10":
    "And this I pray, that your love may abound still more and more in real knowledge and all discernment, so that you may approve the things that are excellent, in order to be sincere and blameless until the day of Christ.",
  "Philippians 2:2-3":
    "Make my joy complete by being of the same mind, maintaining the same love, united in spirit, intent on one purpose. 3Do nothing from selfishness or empty conceit, but with humility of mind regard one another as more important than yourselves.",
  "Philippians 2:3":
    "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.",
  "Philippians 2:4":
    "Not looking to your own interests but each of you to the interests of the others.",
  "Philippians 2:5":
    "In your relationships with one another, have the same mindset as Christ Jesus.",
  "Philippians 3:13-14":
    "Brethren, I do not regard myself as having laid hold of it yet; but one thing I do: forgetting what lies behind and reaching forward to what lies ahead, I press on toward the goal for the prize of the upward call of God in Christ Jesus.",
  "Philippians 3:14":
    "I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus.",
  "Philippians 4:11-12":
    "Not that I speak from want, for I have learned to be content in whatever circumstances I am. I know how to get along with humble means, and I also know how to live in prosperity; in any and every circumstance I have learned the secret of being filled and going hungry, both of having abundance and suffering need.",
  "Philippians 4:12":
    "I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation, whether well fed or hungry, whether living in plenty or in want.",
  "Philippians 4:13": "I can do all this through him who gives me strength.",
  "Philippians 4:4":
    "Rejoice in the Lord always. I will say it again: Rejoice!",
  "Philippians 4:5": "Let your gentleness be evident to all. The Lord is near.",
  "Philippians 4:6":
    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
  "Philippians 4:8":
    "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
  "Proverbs 1:5":
    "Let the wise listen and add to their learning, and let the discerning get guidance.",
  "Proverbs 10:9a": "The man of integrity walks securely.",
  "Proverbs 11:13":
    "A gossip betrays a confidence, but a trustworthy person keeps a secret.",
  "Proverbs 11:25":
    "A generous person will prosper; whoever refreshes others will be refreshed.",
  "Proverbs 12:17":
    "An honest witness tells the truth, but a false witness tells lies.",
  "Proverbs 12:19":
    "Truthful lips endure forever, but a lying tongue lasts only a moment.",
  "Proverbs 12:28":
    "In the way of righteousness there is life; along that path is immortality.",
  "Proverbs 14:30":
    "A heart at peace gives life to the body, but envy rots the bones.",
  "Proverbs 15:13":
    "A happy heart makes the face cheerful, but heartache crushes the spirit.",
  "Proverbs 16:21":
    "The wise in heart are called discerning, and gracious words promote instruction.",
  "Proverbs 16:24":
    "Gracious words are a honeycomb, sweet to the soul and healing to the bones.",
  "Proverbs 16:3":
    "Commit to the LORD whatever you do, and he will establish your plans.",
  "Proverbs 17:17":
    "A friend loves at all times, and a brother is born for a time of adversity.",
  "Proverbs 18:15":
    "The heart of the discerning acquires knowledge, for the ears of the wise seek it out.",
  "Proverbs 18:24b": "There is a friend who sticks closer than a brother.",
  "Proverbs 19:2":
    "Desire without knowledge is not good— how much more will hasty feet miss the way!",
  "Proverbs 2:11":
    "Discretion will protect you, and understanding will guard you.",
  "Proverbs 2:7-8":
    "He stores up sound wisdom for the upright; He is  a shield to those who walk in integrity, Guarding the paths of justice, And He preserves the way of His godly ones.",
  "Proverbs 22:9":
    "The generous will themselves be blessed, for they share their food with the poor.",
  "Proverbs 23:23":
    "Buy the truth and do not sell it— wisdom, instruction and insight as well.",
  "Proverbs 25:11":
    "Like apples of gold in settings of silver is a ruling rightly given.",
  "Proverbs 3:21-22":
    "My son, let them not vanish from your sight; Keep sound wisdom and discretion, So they will be life to your soul and adornment to your neck.",
  "Proverbs 4:10-11":
    "Hear, my son, and accept my sayings and the years of your life will be many. I have directed you in the way of wisdom; I have led you in upright paths.",
  "Proverbs 4:13":
    "Hold on to instruction, do not let it go; guard it well, for it is your life.",
  "Proverbs 4:18":
    "The path of the righteous is like the morning sun, shining ever brighter till the full light of day.",
  "Proverbs 4:20-22":
    "My son, give attention to my words; Incline your ear to my sayings. Do not let them depart from your sight; Keep them in the midst of your heart. For they are life to those who find them and health to all their body.",
  "Proverbs 4:7":
    "The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.",
  "Proverbs 8:10":
    "Choose my instruction instead of silver, knowledge rather than choice gold.",
  "Proverbs 8:10-11":
    "Choose my instruction instead of silver, knowledge rather than choice gold. For wisdom is better than jewels; and all desirable things cannot compare with her.",
  "Proverbs 8:7":
    "My mouth speaks what is true, for my lips detest wickedness.",
  "Proverbs 9:10":
    "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.",
  "Proverbs 9:12":
    "If you are wise, your wisdom will reward you; if you are a mocker, you alone will suffer.",
  "Proverbs 9:9":
    "Instruct the wise and they will be wiser still; teach the righteous and they will add to their learning.",
  "Psalm 100:1-2":
    "Shout joyfully to the LORD, all the earth. Serve the LORD with gladness; Come before Him with joyful singing.",
  "Psalm 100:4":
    "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
  "Psalm 11:7":
    "For the LORD is righteous, he loves justice; the upright will see his face.",
  "Psalm 119:66":
    "Teach me knowledge and good judgment, for I trust your commands.",
  "Psalm 126:2":
    "Our mouths were filled with laughter, our tongues with songs of joy. Then it was said among the nations, “The LORD has done great things for them.”",
  "Psalm 149:4":
    "For the LORD takes delight in his people; he crowns the humble with victory.",
  "Psalm 25:21":
    "May integrity and uprightness protect me, because my hope, LORD, is in you.",
  "Psalm 25:9":
    "He guides the humble in what is right and teaches them his way.",
  "Psalm 27:14":
    "Wait for the LORD; be strong and take heart and wait for the LORD.",
  "Psalm 37:11":
    "But the meek will inherit the land and enjoy peace and prosperity.",
  "Psalm 37:28":
    "For the LORD loves the just and will not forsake his faithful ones. Wrongdoers will be completely destroyed; the offspring of the wicked will perish.",
  "Psalm 37:37":
    "Consider the blameless, observe the upright; a future awaits those who seek peace.",
  "Psalm 41:12":
    "Because of my integrity you uphold me and set me in your presence forever.",
  "Psalm 95:1":
    "Come, let us sing for joy to the LORD; let us shout aloud to the Rock of our salvation.",
  "Romans 12:10":
    "Be devoted to one another in love. Honor one another above yourselves.",
  "Romans 12:11":
    "Never be lacking in zeal, but keep your spiritual fervor, serving the Lord.",
  "Romans 12:13":
    "Share with the Lord’s people who are in need. Practice hospitality.",
  "Romans 12:15": "Rejoice with those who rejoice; mourn with those who mourn.",
  "Romans 12:16":
    "Live in harmony with one another. Do not be proud, but be willing to associate with people of low position. Do not be conceited.",
  "Romans 12:17":
    "Do not repay anyone evil for evil. Be careful to do what is right in the eyes of everyone.",
  "Romans 12:17-18":
    "Never pay back evil for evil to anyone. Respect what is right in the sight of all men. If possible, so far as it depends on you, be at peace with all men.",
  "Romans 12:8":
    "If it is to encourage, then give encouragement; if it is giving, then give generously; If it is to lead, do it diligently; if it is to show mercy, do it cheerfully.",
  "Romans 14:1":
    "Accept the one whose faith is weak, without quarreling over disputable matters.",
  "Romans 15:13":
    "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
  "Romans 15:4":
    "For everything that was written in the past was written to teach us, so that through the endurance taught in the Scriptures and the encouragement they provide we might have hope.",
  "Romans 2:7":
    "To those who by persistence in doing good seek glory, honor and immortality, he will give eternal life.",
  "Romans 5:5":
    "And hope does not put us to shame, because God’s love has been poured out into our hearts through the Holy Spirit, who has been given to us.",
  "2 Timothy 2:3-4":
    "Suffer hardship with me, as a good soldier of Christ Jesus. No soldier in active service entangles himself in the affairs of everyday life, so that he may please the one who enlisted him as a soldier.",
  "Titus 1:8":
    "Rather, he must be hospitable, one who loves what is good, who is self-controlled, upright, holy and disciplined.",
  "Titus 2:11-12":
    "For the grace of God has appeared, bringing salvation to all men, instructing us to deny ungodliness and worldly desires and to live sensibly, righteously and godly in the present age.",
  "Titus 2:9-10":
    "Urge bondslaves to be subject to their masters in everything, to try to please them, not to talk back to them, and not to steal from them, but to show that they can be fully trusted, so that in every way they will make the teaching about God our Savior attractive.",
  "Titus 3:1-2":
    "Remind the people to be subject to rulers and authorities, to be obedient, to be ready to do whatever is good, to slander no one, to be peaceable and considerate, and to show true humility toward all men.",
  "Titus 3:2b":
    "And to be peaceable and considerate, and to show true humility toward all men.",
  "Zechariah 7:9":
    'This is what the LORD Almighty said: "Administer true justice; show mercy and compassion to one another."',
};

export const elcOne = [
  { name: "Vera Valos", classroom: "ELC 1" },
  { name: "Beau Baker", classroom: "ELC 1" },
  { name: "Tony Bargo", classroom: "ELC 1" },
  { name: "Fiona Barnett", classroom: "ELC 1" },
  { name: "Emmett Belin", classroom: "ELC 1" },
  { name: "Kendall Byers", classroom: "ELC 1" },
  { name: "Payslee Cantu", classroom: "ELC 1" },
  { name: "Tierney Church", classroom: "ELC 1" },
  { name: "Ann-Elisheba Dossou", classroom: "ELC 1" },
  { name: "Evan Levtzow", classroom: "ELC 1" },
  { name: "Alexandria Maroney", classroom: "ELC 1" },
  { name: "Alayna Medina", classroom: "ELC 1" },
  { name: "Violet Morlin", classroom: "ELC 1" },
  { name: "Nicole Morozov", classroom: "ELC 1" },
  { name: "Aiden Philebaum", classroom: "ELC 1" },
  { name: "Elise Rogers", classroom: "ELC 1" },
  { name: "Harley Seay", classroom: "ELC 1" },
  { name: "Aubrey Villa", classroom: "ELC 1" },
  { name: "Matthew Volosciuc", classroom: "ELC 1" },
  { name: "Orel Wombo Lokaso", classroom: "ELC 1" },
];

export const elcTwo = [
  { name: "Keira Adamson", classroom: "ELC 2" },
  { name: "Annabelle Babler", classroom: "ELC 2" },
  { name: "Dami Dickinson", classroom: "ELC 2" },
  { name: "Lincoln Gerber", classroom: "ELC 2" },
  { name: "Laney Jones", classroom: "ELC 2" },
  { name: "Naomi Kimble", classroom: "ELC 2" },
  { name: "Mila Moses", classroom: "ELC 2" },
  { name: "JoAhn Namkung", classroom: "ELC 2" },
  { name: "Maya Roberts", classroom: "ELC 2" },
  { name: "Donald Shorter", classroom: "ELC 2" },
  { name: "Jahkobi Stephens", classroom: "ELC 2" },
  { name: "Eben Van Zijl", classroom: "ELC 2" },
  { name: "Ronan Wells", classroom: "ELC 2" },
  { name: "Baya Wolf", classroom: "ELC 2" },
  { name: "Macy Wray", classroom: "ELC 2" },
  { name: "Mia Wray", classroom: "ELC 2" },
  { name: "Kaylah-Joy Yanogo", classroom: "ELC 2" },
];

export const elcStudents = [
  "Vera Valos",
  "Beau Baker",
  "Tony Bargo",
  "Fiona Barnett",
  "Emmett Belin",
  "Kendall Byers",
  "Payslee Cantu",
  "Tierney Church",
  "Ann-Elisheba Dossou",
  "Evan Levtzow",
  "Alexandria Maroney",
  "Alayna Medina",
  "Violet Morlin",
  "Nicole Morozov",
  "Aiden Philebaum",
  "Elise Rogers",
  "Harley Seay",
  "Aubrey Villa",
  "Matthew Volosciuc",
  "Orel Wombo Lokaso",
  "Keira Adamson",
  "Annabelle Babler",
  "Dami Dickinson",
  "Lincoln Gerber",
  "Laney Jones",
  "Naomi Kimble",
  "Mila Moses",
  "JoAhn Namkung",
  "Maya Roberts",
  "Donald Shorter",
  "Jahkobi Stephens",
  "Eben Van Zijl",
  "Ronan Wells",
  "Baya Wolf",
  "Macy Wray",
  "Mia Wray",
  "Kaylah-Joy Yanogo",
];
