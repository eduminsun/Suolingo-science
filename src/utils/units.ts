export type Unit = {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  textColor: `text-${string}`;
  borderColor: `border-${string}`;
  tiles: Tile[];
};

export type Tile =
  | {
      type: "star" | "dumbbell" | "book" | "trophy" | "fast-forward";
      description: string;
    }
  | { type: "treasure" };

export type TileType = Tile["type"];

export const units: readonly Unit[] = [
  {
    unitNumber: 1,
    description: "물질의 고유한 성질부터 혼합물의 분리까지",
    backgroundColor: "bg-[#58cc02]",
    textColor: "text-[#58cc02]",
    borderColor: "border-[#46a302]",
    tiles: [
      {
        type: "star",
        description: "용해도와 끓는점",
      },
      {
        type: "book",
        description: "크로마토그래피",
      },
      {
        type: "star",
        description: "혼합물 분리 방법",
      },
      { type: "treasure" },
      { type: "book", description: "A date" },
      { type: "trophy", description: "Unit 1 review" },
    ],
  },
  {
    unitNumber: 2,
    description: "해수의 온도, 호흡과 배설",
    backgroundColor: "bg-[#ce82ff]",
    textColor: "text-[#ce82ff]",
    borderColor: "border-[#a568cc]",
    tiles: [
      { type: "fast-forward", description: "해수의 온도" },
      { type: "dumbbell", description: "호흡" },
      { type: "book", description: "배설" },
      { type: "treasure" },
      { type: "star", description: "Get around in a city" },
      { type: "book", description: "A very big family" },
      { type: "star", description: "Greet people" },
      { type: "book", description: "The red jacket" },
      { type: "treasure" },
      { type: "dumbbell", description: "Personalized practice" },
      { type: "trophy", description: "Unit 2 review" },
    ],
  },
  {
    unitNumber: 3,
    description: "기말고사 화이팅",
    backgroundColor: "bg-[#00cd9c]",
    textColor: "text-[#00cd9c]",
    borderColor: "border-[#00a47d]",
    tiles: [
      { type: "fast-forward", description: "점검 Time" },
      { type: "book", description: "혼합물의 분리 방법" },
      { type: "star", description: "열과 우리 생활" },
      { type: "treasure" },
      { type: "book", description: "The honeymoon" },
      { type: "star", description: "Get around in a city" },
      { type: "treasure" },
      { type: "dumbbell", description: "Personalized practice" },
      { type: "book", description: "Doctor Eddy" },
      { type: "trophy", description: "Unit 2 review" },
    ],
  },
  {
    unitNumber: 4,
    description: "화학반응식 마스터하기",
    backgroundColor: "bg-[#ff9600]",
    textColor: "text-[#ff9600]",
    borderColor: "border-[#d67700]",
    tiles: [
      { type: "fast-forward", description: "화학반응식 점검" },
      { type: "star", description: "화학반응식의 기초" },
      { type: "book", description: "계수 맞추기" },
      { type: "star", description: "화학반응식 완성하기" },
      { type: "treasure" },
      { type: "trophy", description: "Unit 4 review" },
    ],
  },
];
