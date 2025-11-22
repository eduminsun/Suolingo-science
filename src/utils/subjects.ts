export type Subject = (typeof subjects)[number];

const subjects = [
  {
    name: "물리",
    code: "physics",
    emoji: "⚛️",
    color: "#FF6B6B",
  },
  {
    name: "화학",
    code: "chemistry",
    emoji: "🧪",
    color: "#4ECDC4",
  },
  {
    name: "지구과학",
    code: "earth-science",
    emoji: "🌍",
    color: "#45B7D1",
  },
  {
    name: "생명과학",
    code: "biology",
    emoji: "🧬",
    color: "#96CEB4",
  },
] as const;

export default subjects;

