export const config = {
  botName: "F.R.E.T.",
  incorrectUsageColor: "#e91e63",
  transparentColor: "#2f3136",
  thanksColor: "#2ecc71",
  dataChangeColor: "#e67e22",
  correctUsageMessageLifetimeInSeconds: 10,
};

export const helpForumRanks: { rank: string; points: number }[] = [
  { rank: "Peer", points: 200 },
  { rank: "Teacher", points: 500 },
  { rank: "Mentor", points: 1000 },
  { rank: "Advisor", points: 2500 },
  { rank: "Lecturer", points: 5000 },
  { rank: "Tenure", points: 10000 },
];

export const weeklyRanks: { rank: string; streak: number }[] = [
  { rank: "Weekly: Weekling", streak: 1 },
  { rank: "Weekly: Elite", streak: 3 },
  { rank: "Weekly: Challenger", streak: 7 },
  { rank: "Weekly: Trophy", streak: 10 }, // Trophy rank
];
