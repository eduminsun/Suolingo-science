import type { NextPage } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  BigCloseSvg,
  CloseSvg,
  DoneSvg,
  LessonFastForwardEndFailSvg,
  LessonFastForwardEndPassSvg,
  LessonFastForwardStartSvg,
  LessonTopBarEmptyHeart,
  LessonTopBarHeart,
} from "~/components/Svgs";
import summerPng from "../../public/summer.png";
import chromatographyImg from "../../public/chromatography.png";
import celebrationPng from "../../public/celebration.png";
import yangGang from "../../public/yang-gang.png";
import choco from "../../public/choco-cookie.png";
import sweetPotato from "../../public/sweet-potato.png";
import lemon from "../../public/lemon.png";
import chocolate from "../../public/chocolate.png";
import strawberry from "../../public/strawberry.png";
import jelly from "../../public/jelly.png";
import creamBrulee from "../../public/cream-brulee.png";
import castella from "../../public/castella.png";
import soda from "../../public/soda.png";
import bento from "../../public/bento.png";
import grill from "../../public/grill.png";
import applePie from "../../public/apple-pie.png";
import kiwi from "../../public/kiwi.png";
import { useBoundStore } from "~/hooks/useBoundStore";
import { useRouter } from "next/router";

// 아이템 이미지 매핑
const itemImages: Record<string, StaticImageData> = {
  yangGang,
  choco,
  sweetPotato,
  lemon,
  chocolate,
  strawberry,
  jelly,
  creamBrulee,
  castella,
  soda,
  bento,
  grill,
  applePie,
  kiwi,
};

// 과학 OX 1: 고체 용해도와 압력
const lessonProblem1 = {
  type: "SELECT_1_OF_3",
  question: `고체의 용해도는 압력이 높을수록 높아진다. (O/X)`,
  answers: [
    { icon: <></>, name: "O" },
    { icon: <></>, name: "X" },
  ],
  // 고체의 용해도는 압력 영향이 거의 없음 → X가 정답
  correctAnswer: 1,
} as const;

// 과학 빈칸 2: 소줏고리 증류 과정
const lessonProblem2 = {
  type: "WRITE_IN_ENGLISH",
  question:
    "소줏고리에 탁한 술을 넣고 가열하면 끓는점이 ( ㄱ ) 에탄올이 먼저 ( ㄴ ) 되어 끓어 나온다. 이 기체 물질이 찬물이 담긴 그릇에 닿으면 ( ㄷ ) 되어 소주가 소줏고리 가지를 따라 흘러나온다.",
  // 타일에서 순서대로 ㄱ, ㄴ, ㄷ을 선택
  answerTiles: ["낮은", "높은", "기화", "액화", "응고"],
  // ㄱ=낮은, ㄴ=기화, ㄷ=액화
  correctAnswer: [0, 2, 3],
} as const;

// 과학 OX 3: 용매에 따른 용해도
const lessonProblem3 = {
  type: "SELECT_1_OF_3",
  question: `같은 물질이면 용매의 종류에 관계없이 용해도가 같다. (O/X)`,
  answers: [
    { icon: <></>, name: "O" },
    { icon: <></>, name: "X" },
  ],
  // 용해도는 용매 종류에 따라 다름 → X가 정답
  correctAnswer: 1,
} as const;

// 과학 OX 4-8: 크로마토그래피 실험 (5개 OX 문제)
const lessonProblem4 = {
  type: "SELECT_1_OF_3",
  question: `다음 그림을 보고 문제를 풀어보세요. 사인펜 잉크는 최대한 작게, 여러 번, 진하게 찍는다. 이 말은 맞을까요?`,
  answers: [
    { icon: <></>, name: "O" },
    { icon: <></>, name: "X" },
  ],
  // 사인펜 잉크는 최대한 작게, 여러 번, 진하게 찍어야 함 → O가 정답
  correctAnswer: 0,
  image: chromatographyImg,
} as const;

const lessonProblem5 = {
  type: "SELECT_1_OF_3",
  question: `다음 그림을 보고 문제를 풀어보세요. 사인펜 잉크를 찍은 점이 물에 잠기게 장치한다. 이 말은 맞을까요?`,
  answers: [
    { icon: <></>, name: "O" },
    { icon: <></>, name: "X" },
  ],
  // 잉크 점은 물 수면보다 위에 있어야 함 → X가 정답
  correctAnswer: 1,
  image: chromatographyImg,
} as const;

const lessonProblem6 = {
  type: "SELECT_1_OF_3",
  question: `다음 그림을 보고 문제를 풀어보세요. 용매의 증발을 막기 위해 용기의 입구를 막는다. 이 말은 맞을까요?`,
  answers: [
    { icon: <></>, name: "O" },
    { icon: <></>, name: "X" },
  ],
  // 용매의 증발을 막기 위해 용기 입구를 막아야 함 → O가 정답
  correctAnswer: 0,
  image: chromatographyImg,
} as const;

const lessonProblem7 = {
  type: "SELECT_1_OF_3",
  question: `다음 그림을 보고 문제를 풀어보세요. 가장 아래쪽에 분리되는 색소의 이동 속도가 가장 빠르다. 이 말은 맞을까요?`,
  answers: [
    { icon: <></>, name: "O" },
    { icon: <></>, name: "X" },
  ],
  // 이동 속도가 빠른 색소가 더 멀리 이동하므로 아래쪽 색소가 가장 느림 → X가 정답
  correctAnswer: 1,
  image: chromatographyImg,
} as const;

const lessonProblem8 = {
  type: "SELECT_1_OF_3",
  question: `다음 그림을 보고 문제를 풀어보세요. 물 대신 에탄올을 사용해도 실험 결과는 같다. 이 말은 맞을까요?`,
  answers: [
    { icon: <></>, name: "O" },
    { icon: <></>, name: "X" },
  ],
  // 용매에 따라 분리 결과가 다름 → X가 정답
  correctAnswer: 1,
  image: chromatographyImg,
} as const;

// 과학 빈칸 9: 소금, 에탄올, 물, 모래 분리 과정 (Problem 12 기반)
const lessonProblem9 = {
  type: "WRITE_IN_ENGLISH",
  question:
    "수오의 마법 실험실! 소금, 에탄올, 물, 모래가 섞인 혼합물을 분리해보자! 먼저 거름을 하면 ( ㄱ )를 분리할 수 있어. 그 다음 남은 용액을 증류하면 끓는점이 낮은 ( ㄴ )이 먼저 나와. 마지막으로 끓는점으로 분류되지 않은 용액을 증발시키면 ( ㄷ )을 얻을 수 있지!",
  answerTiles: ["모래", "에탄올", "소금", "물", "소금물"],
  // ㄱ=거름, ㄴ=증류, ㄷ=증발
  correctAnswer: [0, 1, 2],
} as const;

// 과학 MCQ 10: 소금물에서 물 얻기 (Problem 11 기반)
const lessonProblem10 = {
  type: "SELECT_1_OF_3",
  question: `다음 중 소금물에서 깨끗한 물을 얻는 데 가장 적합한 실험 장치는 무엇일까?`,
  answers: [
    { icon: <></>, name: "(가) 증류 장치" },
    { icon: <></>, name: "(나) 분별 깔때기" },
    { icon: <></>, name: "(다) 거름 장치" },
  ],
  // (가) 증류 장치가 정답
  correctAnswer: 0,
} as const;

// 과학 OX 11: 크로마토그래피 원리 이용 (Problem 09 기반)
const lessonProblem11 = {
  type: "SELECT_1_OF_3",
  question: `크로마토그래피의 원리를 이용하여 혼합물을 분리하는 예가 아닌 것은?`,
  answers: [
    { icon: <></>, name: "도핑 테스트" },
    { icon: <></>, name: "시금치 잎의 색소 분리" },
    { icon: <></>, name: "바닷물에서 식수 분리" },
    { icon: <></>, name: "의약품의 성분 검출" },
    { icon: <></>, name: "식품 속 농약 성분 검출" },
  ],
  // 바닷물에서 식수 분리 증류는 크로마토그래피가 아님 → 정답
  correctAnswer: 2,
} as const;

const lessonProblem12 = {
  type: "SELECT_1_OF_3",
  question: `해수의 표층 수온에 영향을 주는 요인은?`,
  answers: [
    { icon: <></>, name: "바람" },
    { icon: <></>, name: "태양 에너지" },
    { icon: <></>, name: "염분" },
    { icon: <></>, name: "위도" },
    { icon: <></>, name: "경도" },
  ],
  correctAnswer: 1,
} as const;

// 해수의 온도 문제 1: 표층 수온 분포 (SELECT_1_OF_3)
const lessonProblem13 = {
  type: "SELECT_1_OF_3",
  question: `전 세계 해수의 표층 수온 분포에 대한 설명으로 옳은 것은?`,
  answers: [
    { icon: <></>, name: "저위도에서 고위도로 갈수록 표층 수온이 높아진다" },
    { icon: <></>, name: "위도가 같은 곳에서는 대체로 표층 수온이 비슷하다" },
    { icon: <></>, name: "적도 부근의 표층 수온이 극지방보다 낮다" },
  ],
  correctAnswer: 1, // "위도가 같은 곳에서는 대체로 표층 수온이 비슷하다"
} as const;

// 해수의 온도 문제 2: 깊이에 따른 수온 변화 (WRITE_IN_ENGLISH)
const lessonProblem14 = {
  type: "WRITE_IN_ENGLISH",
  question: `해수의 깊이에 따른 수온 분포를 알아보자! 햇빛이 도달하는 ( ㄱ )에서는 수온이 높고, 햇빛이 거의 도달하지 않는 ( ㄴ )에서는 수온이 낮아. 그리고 ( ㄱ )과 ( ㄴ ) 사이의 ( ㄷ )에서는 깊이가 깊어질수록 수온이 급격히 낮아지지!`,
  answerTiles: ["혼합층", "수온 약층", "심해층", "표층", "중층"],
  // ㄱ=혼합층, ㄴ=심해층, ㄷ=수온 약층
  correctAnswer: [0, 2, 1],
} as const;

// ==========================================
// 호흡과 배설 관련 문제 20개
// Unit 2 - Step 2 (호흡), Step 3 (배설)
// ==========================================

// ========== 호흡 관련 문제 ==========

// 문제 2: 호흡 기관의 순서 (WRITE_IN_ENGLISH)
const lessonProblem15 = {
  type: "WRITE_IN_ENGLISH",
  question: `공기가 들어오는 순서를 완성해보자! 코나 입 → 기관 → ( ㄱ ) → 폐 속의 ( ㄴ )로 공기가 이동해!`,
  answerTiles: ["인두", "후두", "기관지", "식도", "폐포"],
  correctAnswer: [2, 4],
} as const;

// 문제 3: 폐포의 특징 (SELECT_1_OF_3)
const lessonProblem16 = {
  type: "SELECT_1_OF_3",
  question: `폐포의 특징으로 옳지 않은 것은?`,
  answers: [
    { icon: <></>, name: "포도송이처럼 작은 주머니가 수없이 많이 모여 있다" },
    { icon: <></>, name: "표면적이 넓어 기체 교환에 유리하다" },
    { icon: <></>, name: "두꺼운 벽으로 이루어져 있어 튼튼하다" },
  ],
  correctAnswer: 2, // "두꺼운 벽으로 이루어져 있어 튼튼하다"
} as const;

// 문제 4: 들숨과 날숨 (WRITE_IN_ENGLISH)
const lessonProblem17 = {
  type: "WRITE_IN_ENGLISH",
  question: `호흡 운동을 알아보자! 들숨일 때 갈비뼈는 ( ㄱ ), 가로막은 ( ㄴ )하고, 날숨일 때 흉강 부피는 ( ㄷ ), 흉강 압력은 ( ㄹ )!`,
  answerTiles: ["올라간다", "내려간다", "증가한다","감소한다"],
  correctAnswer: [0, 1, 3, 2],
} as const;

// 문제 5: 기체 교환 (SELECT_1_OF_3)
const lessonProblem18 = {
  type: "SELECT_1_OF_3",
  question: `폐포에서 일어나는 기체 교환에 대한 설명으로 옳은 것은?`,
  answers: [
    { icon: <></>, name: "산소는 폐포에서 혈액으로, 이산화 탄소는 혈액에서 폐포로 이동한다" },
    { icon: <></>, name: "산소와 이산화 탄소 모두 폐포에서 혈액으로 이동한다" },
    { icon: <></>, name: "이산화 탄소는 폐포에서 혈액으로, 산소는 혈액에서 폐포로 이동한다" },
  ],
  correctAnswer: 0,
} as const;


// 문제 10: 날숨과 들숨의 기체 비교 (SELECT_1_OF_3)
const lessonProblem19 = {
  type: "SELECT_1_OF_3",
  question: `날숨에 대한 설명으로 옳은 것은?`,
  answers: [
    { icon: <></>, name: "들숨보다 산소가 많고 이산화 탄소가 적다" },
    { icon: <></>, name: "들숨보다 산소가 적고 이산화 탄소가 많다" },
    { icon: <></>, name: "들숨과 기체 조성이 같다" },
  ],
  correctAnswer: 1,
} as const;

// ========== 배설 관련 문제  ==========

// 문제 12: 배설 기관 (WRITE_IN_ENGLISH)
const lessonProblem20 = {
  type: "WRITE_IN_ENGLISH",
  question: `배설 기관과 배설물을 연결해보자! ( ㄱ )은 이산화 탄소와 물을 배출하고, ( ㄴ )은 요소와 물을 배출해!`,
  answerTiles: ["폐", "콩팥", "피부", "간", "심장"],
  // ㄱ=폐, ㄴ=콩팥
  correctAnswer: [0, 1],
} as const;

// 문제 13: 콩팥의 구조 (SELECT_1_OF_3)
const lessonProblem21 = {
  type: "SELECT_1_OF_3",
  question: `콩팥의 기본 단위로 오줌을 만드는 구조는?`,
  answers: [
    { icon: <></>, name: "네프론" },
    { icon: <></>, name: "방광" },
    { icon: <></>, name: "보먼주머니" },
  ],
  correctAnswer: 0, // "네프론"
} as const;

// 문제 14: 오줌 생성 과정 (WRITE_IN_ENGLISH)
const lessonProblem22 = {
  type: "WRITE_IN_ENGLISH",
  question: `오줌이 만들어지는 과정을 알아보자! 사구체에서 ( ㄱ )된 것 중 필요한 물질을 ( ㄴ )하여 노폐물이 ( ㄷ )돼!`,
  answerTiles: ["오줌", "원뇨", "재흡수", "여과", "분비"],
  // ㄱ=여과, ㄴ=재흡수, ㄷ=분비
  correctAnswer: [3, 2, 4],
} as const;

// 문제 15: 요소의 생성 (SELECT_1_OF_3)
const lessonProblem23 = {
  type: "SELECT_1_OF_3",
  question: `요소는 어디에서 만들어지는가?`,
  answers: [
    { icon: <></>, name: "콩팥" },
    { icon: <></>, name: "간" },
    { icon: <></>, name: "폐" },
  ],
  correctAnswer: 1, // "간"
} as const;

// 문제 16: 재흡수 (SELECT_1_OF_3)
const lessonProblem24 = {
  type: "SELECT_1_OF_3",
  question: `콩팥에서 재흡수되는 물질이 아닌 것은?`,
  answers: [
    { icon: <></>, name: "포도당" },
    { icon: <></>, name: "물" },
    { icon: <></>, name: "요소" },
  ],
  correctAnswer: 2, // "요소"
} as const;

// 문제 19: 오줌의 성분 (SELECT_1_OF_3)
const lessonProblem25 = {
  type: "SELECT_1_OF_3",
  question: `정상적인 오줌에 포함되지 않는 성분은?`,
  answers: [
    { icon: <></>, name: "요소" },
    { icon: <></>, name: "물" },
    { icon: <></>, name: "포도당" },
  ],
  correctAnswer: 2, // "포도당" - 정상적으로는 재흡수됨
} as const;

// 문제 20: 배설 기관의 종류 (SELECT_1_OF_3)
const lessonProblem26 = {
  type: "SELECT_1_OF_3",
  question: `다음 중 배설 기관이 아닌 것은?`,
  answers: [
    { icon: <></>, name: "콩팥" },
    { icon: <></>, name: "폐" },
    { icon: <></>, name: "위" },
  ],
  correctAnswer: 2, // "위" - 소화 기관
} as const;

// 물질의 특성
// 4. 물질의 특성
const lessonProblem27 = {
  type: "SELECT_1_OF_3",
  question: "물질의 특성에 대한 설명으로 옳은 것은?",
  answers: [
    { icon: <></>, name: "질량은 물질의 고유한 양으로 물질의 특성이다" },
    { icon: <></>, name: "물질의 양에 관계없이 일정하다" },
    { icon: <></>, name: "물질의 특성은 혼합물만 가지고 있다" },
  
  ],
  correctAnswer: 1,
  explanation: "물질의 특성(밀도, 끓는점, 녹는점 등)은 물질의 양에 관계없이 일정하다."
} as const;

// 5. 물과 소금물의 가열 곡선
const lessonProblem28 = {
  type: "SELECT_1_OF_3",
  question: "물과 소금물을 가열할 때, 소금물에 대한 설명으로 옳은 것은?",
  answers: [
    { icon: <></>, name: "물보다 낮은 온도에서 끓기 시작한다"},
    { icon: <></>, name: "끓는 동안 온도가 일정하게 유지된다" },
    { icon: <></>, name: "끓는 동안 농도가 진해진다"},
    
  ],
  correctAnswer: 2,
  explanation: "소금물은 끓는 동안 물이 증발하므로 소금물의 농도가 진해진다."
} as const;

// 13. 철의 밀도 계산
const lessonProblem29 = {
  type: "SELECT_1_OF_3",
  question: "철의 부피가 10cm³일 때, 순수한 철의 질량은? (단, 철의 밀도는 7.87g/cm³)",
  answers: [
    { icon: <></>, name: "3.98g"},
    { icon: <></>, name: "39.80g"},
    { icon: <></>, name: "78.70g"},
  ],
  correctAnswer: 2,
  explanation: "질량 = 밀도 × 부피 = 7.87 × 10 = 78.7g이다."
} as const;

// 14. 밀도에 대한 설명
const lessonProblem30 = {
  type: "SELECT_1_OF_3",
  question: "밀도에 관한 설명으로 옳지 않은 것은?",
  answers: [
    { icon: <></>, name: "물질마다 고유한 값을 가진다"},
    { icon: <></>, name: "단위는 g/cm³, kg/L 등을 사용한다"},
    { icon: <></>, name: "부피가 같으면 질량이 작을수록 밀도는 크다"},
   
  ],
  correctAnswer: 2,
  explanation: "부피가 같으면 질량이 클수록 밀도가 크다. 밀도 = 질량/부피이다."
} as const;

// 15. 반지의 밀도 측정
const lessonProblem31 = {
  type: "WRITE_IN_ENGLISH",
  question: "물 12.0mL가 들어있는 눈금실린더에 반지를 넣었더니 18.0mL로 변했다. 반지의 질량이 21.0g이면? 반지의 부피는 ( ㄱ )mL이고, 밀도는 질량을 ( ㄴ )로 나누어 구한다.",
  answerTiles: ["6.0", "18.0", "무게", "부피"], 
  correctAnswer: [0, 3],
  explanation: "부피 = 18.0 - 12.0 = 6.0mL이고, 밀도 = 질량/부피이다."
} as const;

// 16. 여러 물질의 부피와 질량
const lessonProblem32 = {
  type: "SELECT_1_OF_3",
  question: "물질 A~E의 부피와 질량을 측정했을 때, 밀도가 같은 물질은?",
  answers: [
    { icon: <></>, name: "A(20mL, 80g)와 E(32mL, 64g)"},
    { icon: <></>, name: "B(300mL, 150g)와 D(40mL, 20g)"},
    { icon: <></>, name: "C(30mL, 10g)와 E(32mL, 64g)"},
  ],
  correctAnswer: 1,
  explanation: "B의 밀도 = 150/300 = 0.5g/mL, D의 밀도 = 20/40 = 0.5g/mL로 같다."
} as const;

// 17. 25℃, 1기압에서 물질의 밀도
const lessonProblem33 = {
  type: "SELECT_1_OF_3",
  question: "25℃, 1기압에서 물에 넣었을 때 물 위에 뜨는 물질은? (물의 밀도 1g/cm³)",
  answers: [
    { icon: <></>, name: "밀도가 0.7g/cm³인 물질 (가)"},
    { icon: <></>, name: "밀도가 1.5g/cm³인 물질 (나)"},
    { icon: <></>, name: "밀도가 1.9g/cm³인 물질 (다)"},
    
  ],
  correctAnswer: 0,
  explanation: "물의 밀도(1g/cm³)보다 작은 밀도를 가진 물질이 물 위에 뜬다."
} as const;


// 20. 밀도와 관련 없는 현상
const lessonProblem34 = {
  type: "SELECT_1_OF_3",
  question: "물질의 밀도와 관련이 없는 현상은?",
  answers: [
    { icon: <></>, name: "썩은 달걀은 소금물 위에 뜬다"},
    { icon: <></>, name: "설탕은 물에 녹지만, 기름에는 녹지 않는다"},
    { icon: <></>, name: "추운 겨울철 호수에서 물고기가 살 수 있다"},
  ],
  correctAnswer: 1,
  explanation: "설탕의 용해는 용해도와 관련된 현상으로 밀도와는 관련이 없다."
} as const;


// 1. 비열의 정의
const lessonProblem35 = {
  type: "SELECT_1_OF_3",
  question: "비열에 대한 설명으로 옳은 것은?",
  answers: [
    { icon: <></>, name: "물질 1g의 온도를 1℃ 높이는 데 필요한 열량이다"},
    { icon: <></>, name: "열의 이동을 막는 것을 열평형이라고 한다"},
    { icon: <></>, name: "어떤 온도에서 용매 100g에 최대로 녹을 수 있는 용질의 g수"},
  ],
  correctAnswer: 0,
  explanation: "비열은 어떤 물질 1g의 온도를 1℃ 높이는 데 필요한 열량을 말한다."
} as const;

// 3. 비열 계산 문제
const lessonProblem36 = {
  type: "SELECT_1_OF_3",
  question: "질량이 400g인 물질이 2kcal의 열량을 얻어 온도가 20℃ 상승하였다. 이 물질의 비열은 몇 kcal/(kg·℃)인가?",
  answers: [
    { icon: <></>, name: "0.15"},
    { icon: <></>, name: "0.25"},
    { icon: <></>, name: "0.5"},
    { icon: <></>, name: "0.75"},
    { icon: <></>, name: "1.25"},
  ],
  correctAnswer: 1,
  explanation: "비열 = 열량/(질량×온도변화) = 2kcal/(0.4kg×20℃) = 0.25kcal/(kg·℃)"
} as const;

// 4. 열팽창 정도 비교
const lessonProblem37 = {
  type: "SELECT_1_OF_3",
  question: "다음 중 열팽창에 대한 설명으로 옳지 않은 것은?",
  answers: [
    { icon: <></>, name: "고체, 액체, 기체 모두 열팽창을 한다"},
    { icon: <></>, name: "고체의 열팽창 정도는 물질의 종류에 관계없이 일정하다"},
    { icon: <></>, name: "입자들 사이가 멀어지면서 입자들이 차지하는 공간이 넓어져 팽창하는 것이다"},
  ],
  correctAnswer: 1,
  explanation: "고체의 열팽창 정도는 물질의 종류에 따라 다르다. 1kg당 온도를 1℃ 높이는 데 필요한 열량은 물질마다 고유한 값을 갖는다."
} as const;


// ==========================================
// Unit 4 - 화학반응식 (Chemical Equations)
// Step 1: 화학반응식의 기초
// Step 2: 계수 맞추기
// Step 3: 화학반응식 완성하기
// ==========================================

// ========== Step 1: 화학반응식의 기초 ==========

// 문제 1: 화학반응식 읽기
const lessonProblem38 = {
  type: "SELECT_1_OF_3",
  question: "화학반응식 2H₂ + O₂ → 2H₂O에서 반응물은?",
  answers: [
    { icon: <></>, name: "H₂O" },
    { icon: <></>, name: "H₂와 O₂" },
    { icon: <></>, name: "O₂만" },
  ],
  correctAnswer: 1,
} as const;

// 문제 2: 계수의 의미
const lessonProblem39 = {
  type: "SELECT_1_OF_3",
  question: "화학반응식에서 계수는 무엇을 나타내는가?",
  answers: [
    { icon: <></>, name: "원자 개수 비" },
    { icon: <></>, name: "분자 개수 비" },
    { icon: <></>, name: "질량의 비" },
  ],
  correctAnswer: 1,
} as const;

// 문제 3: 화살표의 의미
const lessonProblem40 = {
  type: "SELECT_1_OF_3",
  question: "화학반응식에서 화살표(→)의 의미는?",
  answers: [
    { icon: <></>, name: "반응물이 생성물로 변한다" },
    { icon: <></>, name: "반응물과 생성물이 같다" },
    { icon: <></>, name: "생성물이 반응물로 변한다" },
  ],
  correctAnswer: 0,
} as const;

// 문제 4: 화학반응식의 법칙
const lessonProblem41 = {
  type: "SELECT_1_OF_3",
  question: "화학반응식에서 반응 전후에 동일하지 않은 것은?",
  answers: [
    { icon: <></>, name: "원자의 종류" },
    { icon: <></>, name: "원자의 개수" },
    { icon: <></>, name: "분자의 개수" },
  ],
  correctAnswer: 2,
} as const;

// ========== Step 2: 계수 맞추기 ==========

// 문제 5: 간단한 계수 맞추기 1
const lessonProblem42 = {
  type: "WRITE_IN_ENGLISH",
  question: "다음 화학반응식의 빈칸에 알맞은 계수를 순서대로 고르시오. ( ㄱ )H₂ + ( ㄴ )O₂ → ( ㄷ )H₂O",
  answerTiles: ["1", "2", "2", "3", "4"],
  correctAnswer: [1, 0, 2], // 2, 1, 2
} as const;

// 문제 6: 원자 개수 세기
const lessonProblem43 = {
  type: "SELECT_1_OF_3",
  question: "2H₂O에서 H 원자의 개수는?",
  answers: [
    { icon: <></>, name: "2개" },
    { icon: <></>, name: "4개" },
    { icon: <></>, name: "6개" },
  ],
  correctAnswer: 1, // 2×2 = 4개
} as const;

// 문제 7: 계수 맞추기 2
const lessonProblem44 = {
  type: "WRITE_IN_ENGLISH",
  question: "다음 화학반응식의 빈칸에 알맞은 계수를 순서대로 고르시오. ( ㄱ )C + ( ㄴ )O₂ → ( ㄷ )CO₂",
  answerTiles: ["1", "1", "1", "2", "3", "4"],
  correctAnswer: [0, 1, 2], // 1, 1, 1
} as const;

// 문제 8: 반응 전후 원자 개수 비교
const lessonProblem45 = {
  type: "SELECT_1_OF_3",
  question: "화학반응 2Mg + O₂ → 2MgO에서 반응 전 O 원자는 몇 개인가?",
  answers: [
    { icon: <></>, name: "1개" },
    { icon: <></>, name: "2개" },
    { icon: <></>, name: "3개" },
  ],
  correctAnswer: 1, // O₂이므로 2개
} as const;

// 문제 9: 계수 맞추기 3 (질소와 수소)
const lessonProblem46 = {
  type: "WRITE_IN_ENGLISH",
  question: "다음 화학반응식의 빈칸에 알맞은 계수를 순서대로 고르시오. ( ㄱ )N₂ + ( ㄴ )H₂ → ( ㄷ )NH₃",
  answerTiles: ["1", "2", "3", "4", "5", "6"],
  correctAnswer: [0, 2, 1], // 1, 3, 2
} as const;

// ========== Step 3: 화학반응식 완성하기 ==========

// 문제 10: 빈칸에 들어갈 화학식
const lessonProblem47 = {
  type: "SELECT_1_OF_3",
  question: "다음 화학반응식의 빈칸에 들어갈 화학식은? CH₄ + 2O₂ → ( ) + 2H₂O",
  answers: [
    { icon: <></>, name: "CO" },
    { icon: <></>, name: "CO₂" },
    { icon: <></>, name: "C₂O" },
  ],
  correctAnswer: 1, // CO₂
} as const;

// 문제 11: 연소 반응
const lessonProblem48 = {
  type: "SELECT_1_OF_3",
  question: "메테인(CH₄)의 연소 반응에서 생성물은?",
  answers: [
    { icon: <></>, name: "CO₂와 H₂O" },
    { icon: <></>, name: "CO와 H₂" },
    { icon: <></>, name: "C와 H₂O" },
  ],
  correctAnswer: 0,
} as const;

// 문제 12: 복잡한 계수 맞추기
const lessonProblem49 = {
  type: "WRITE_IN_ENGLISH",
  question: "다음 화학반응식의 빈칸에 알맞은 계수를 순서대로 고르시오. ( ㄱ )Fe + ( ㄴ )O₂ → ( ㄷ )Fe₂O₃",
  answerTiles: ["1", "2", "3", "4"],
  correctAnswer: [3, 2, 1], // 4, 3, 2
} as const;

// 문제 13: 원자 개수 세기 (복잡)
const lessonProblem50 = {
  type: "SELECT_1_OF_3",
  question: "3Fe₂O₃에서 Fe 원자의 개수는?",
  answers: [
    { icon: <></>, name: "3개" },
    { icon: <></>, name: "6개" },
    { icon: <></>, name: "9개" },
  ],
  correctAnswer: 1, // 3×2 = 6개
} as const;

// 문제 14: 화학반응식 완성 (종합)
const lessonProblem51 = {
  type: "SELECT_1_OF_3",
  question: "다음 화학반응식이 올바르게 완성된 것은?",
  answers: [
    { icon: <></>, name: "2Na + H₂O → 2NaOH + H₂" },
    { icon: <></>, name: "Na + 2H₂O → NaOH + H₂" },
    { icon: <></>, name: "2Na + 2H₂O → 2NaOH + H₂" },
  ],
  correctAnswer: 2, // 2Na + 2H₂O → 2NaOH + H₂
} as const;




// 단계별 문제 그룹
const lessonProblemsUnit1Step1 = [lessonProblem1, lessonProblem2, lessonProblem3];
const lessonProblemsUnit1Step2 = [lessonProblem4, lessonProblem5, lessonProblem6, lessonProblem7, lessonProblem8];
const lessonProblemsUnit1Step3 = [lessonProblem9, lessonProblem10, lessonProblem11];
const lessonProblemsUnit2Step1 = [lessonProblem12, lessonProblem13, lessonProblem14];
const lessonProblemsUnit2Step2 = [lessonProblem15,lessonProblem16, lessonProblem17, lessonProblem18, lessonProblem19 ];
const lessonProblemsUnit2Step3 = [lessonProblem20, lessonProblem21, lessonProblem22, lessonProblem23, lessonProblem24, lessonProblem25, lessonProblem26]
const lessonProblemsUnit3Step1 = [lessonProblem27, lessonProblem28, lessonProblem29, lessonProblem30]
const lessonProblemsUnit3Step2 = [lessonProblem31, lessonProblem32, lessonProblem33, lessonProblem34]
const lessonProblemsUnit3Step3 = [lessonProblem35, lessonProblem36, lessonProblem37]
const lessonProblemsUnit4Step1 = [lessonProblem38, lessonProblem39, lessonProblem40, lessonProblem41]
const lessonProblemsUnit4Step2 = [lessonProblem42, lessonProblem43, lessonProblem44, lessonProblem45, lessonProblem46]
const lessonProblemsUnit4Step3 = [lessonProblem47, lessonProblem48, lessonProblem49, lessonProblem50]
const lessonProblemsUnit4Step4 = [lessonProblem51]

const numbersEqual = (a: readonly number[], b: readonly number[]): boolean => {
  return a.length === b.length && a.every((_, i) => a[i] === b[i]);
};

// Problem type definitions (relaxed to allow multiple instances)
type Select1Of3Problem = {
  type: "SELECT_1_OF_3";
  question: string;
  answers: readonly { icon: React.JSX.Element; name: string }[];
  correctAnswer: number;
  image?: StaticImageData;
};

type WriteInEnglishProblem = {
  type: "WRITE_IN_ENGLISH";
  question: string;
  answerTiles: readonly string[];
  correctAnswer: readonly number[];
};

const formatTime = (timeMs: number): string => {
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 1000 / 60) % 60;
  const hours = Math.floor(timeMs / 1000 / 60 / 60);
  if (hours === 0)
    return [minutes, seconds]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");
  return [hours, minutes, seconds]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};

const Lesson: NextPage = () => {
  const router = useRouter();

  const [lessonProblem, setLessonProblem] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quitMessageShown, setQuitMessageShown] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);

  const unitNumber = Number(router.query["fast-forward"]); 
  // 라우터 쿼리에서 step 파라미터 읽기 (기본값: 1)
  const unit = Number(router.query["fast-forward"]) || Number(router.query.unit) || 1;
  const step = Number(router.query.step) || 1;
  
  // 문제 데이터 맵핑
  const lessonProblemsMap: Record<number, Record<number, any>> = {
    1: {
      1: lessonProblemsUnit1Step1,
      2: lessonProblemsUnit1Step2,
      3: lessonProblemsUnit1Step3,
    },
    2: {
      1: lessonProblemsUnit2Step1,
      2: lessonProblemsUnit2Step2,
      3: lessonProblemsUnit2Step3,
    },
    3: {
      1: lessonProblemsUnit3Step1,
      2: lessonProblemsUnit3Step2,
      3: lessonProblemsUnit3Step3,
    },
    4: {
      1: lessonProblemsUnit4Step1,
      2: lessonProblemsUnit4Step2,
      3: lessonProblemsUnit4Step3,
      4: lessonProblemsUnit4Step4,
    },
  }

  const lessonProblems = lessonProblemsMap[unit]?.[step] ?? lessonProblemsUnit1Step1;

  // step이 바뀌면 문제 인덱스를 0으로 리셋
  useEffect(() => {
    setLessonProblem(0);
    setCorrectAnswerCount(0);
    setIncorrectAnswerCount(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);
    setQuestionResults([]);
  }, [step]);

  const problem = lessonProblems[lessonProblem] ?? lessonProblems[0];

  // Show all problems (complete after answering all correctly once)
  const totalCorrectAnswersNeeded = lessonProblems.length;

  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const hearts =
    "fast-forward" in router.query &&
    !isNaN(Number(router.query["fast-forward"]))
      ? 3 - incorrectAnswerCount
      : null;

  if (!problem) {
    return <div>문제를 불러올 수 없습니다.</div>;
  }

  const { correctAnswer } = problem;
  const isAnswerCorrect = Array.isArray(correctAnswer)
    ? numbersEqual(selectedAnswers, correctAnswer)
    : selectedAnswer === correctAnswer;

  const onCheckAnswer = () => {
    if (!problem) return;
    setCorrectAnswerShown(true);
    if (isAnswerCorrect) {
      setCorrectAnswerCount((x) => x + 1);
    } else {
      setIncorrectAnswerCount((x) => x + 1);
    }
    setQuestionResults((questionResults) => [
      ...questionResults,
      {
        question: problem.question,
        yourResponse:
          problem.type === "SELECT_1_OF_3"
            ? problem.answers[selectedAnswer ?? 0]?.name ?? ""
            : selectedAnswers.map((i) => problem.answerTiles[i]).join(" "),
        correctResponse:
          problem.type === "SELECT_1_OF_3"
            ? problem.answers[problem.correctAnswer]?.name ?? ""
            : Array.isArray(problem.correctAnswer)
            ? problem.correctAnswer.map((i: number) => problem.answerTiles[i] ?? "").join(" ")
            : "",
      },
    ]);
  };

  const onFinish = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);
    setLessonProblem((x) => (x + 1) % lessonProblems.length);
    endTime.current = Date.now();
  };

  const onSkip = () => {
    setSelectedAnswer(null);
    setCorrectAnswerShown(true);
  };


  if (hearts !== null && hearts < 0 && !correctAnswerShown) {
    return (
      <LessonFastForwardEndFail
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (
    hearts !== null &&
    hearts >= 0 &&
    !correctAnswerShown &&
    correctAnswerCount >= totalCorrectAnswersNeeded
  ) {
    return (
      <LessonFastForwardEndPass
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (hearts !== null && isStartingLesson) {
    return (
      <LessonFastForwardStart
        unitNumber={unitNumber}
        setIsStartingLesson={setIsStartingLesson}
      />
    );
  }

  if (correctAnswerCount >= totalCorrectAnswersNeeded && !correctAnswerShown) {
    return (
      <LessonComplete
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        startTime={startTime}
        endTime={endTime}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  switch (problem.type) {
    case "SELECT_1_OF_3": {
      return (
        <ProblemSelect1Of3
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
        />
      );
    }

    case "WRITE_IN_ENGLISH": {
      return (
        <ProblemWriteInEnglish
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          hearts={hearts}
        />
      );
    }
  }
};

export default Lesson;

const ProgressBar = ({
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  setQuitMessageShown,
  hearts,
}: {
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  setQuitMessageShown: (isShown: boolean) => void;
  hearts: null | number;
}) => {
  return (
    <header className="flex items-center gap-4">
      {correctAnswerCount === 0 ? (
        <Link href="/learn" className="text-gray-400">
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </Link>
      ) : (
        <button
          className="text-gray-400"
          onClick={() => setQuitMessageShown(true)}
        >
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </button>
      )}
      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={correctAnswerCount / totalCorrectAnswersNeeded}
      >
        <div
          className={
            "h-full rounded-full bg-green-500 transition-all duration-700 " +
            (correctAnswerCount > 0 ? "px-2 pt-1 " : "")
          }
          style={{
            width: `${(correctAnswerCount / totalCorrectAnswersNeeded) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-green-400"></div>
        </div>
      </div>
      {hearts !== null &&
        [1, 2, 3].map((heart) => {
          if (heart <= hearts) {
            return <LessonTopBarHeart key={heart} />;
          }
          return <LessonTopBarEmptyHeart key={heart} />;
        })}
    </header>
  );
};

const QuitMessage = ({
  quitMessageShown,
  setQuitMessageShown,
}: {
  quitMessageShown: boolean;
  setQuitMessageShown: (isShown: boolean) => void;
}) => {
  return (
    <>
      <div
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-60 transition-all duration-300"
            : "pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-0 transition-all duration-300"
        }
        onClick={() => setQuitMessageShown(false)}
        aria-label="Close quit message"
        role="button"
      ></div>

      <article
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 z-40 flex flex-col gap-4 bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
            : "fixed -bottom-96 left-0 right-0 z-40 flex flex-col bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
        }
        aria-hidden={!quitMessageShown}
      >
        <div className="flex grow flex-col gap-4">
          <h2 className="text-lg font-bold sm:text-2xl">
            Are you sure you want to quit?
          </h2>
          <p className="text-gray-500 sm:text-lg">
            All progress for this lesson will be lost.
          </p>
        </div>
        <div className="flex grow flex-col items-center justify-center gap-4 sm:flex-row-reverse">
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-105 sm:w-48"
            href="/learn"
          >
            Quit
          </Link>
          <button
            className="w-full rounded-2xl py-3 font-bold uppercase text-blue-400 transition hover:brightness-90 sm:w-48 sm:border-2 sm:border-b-4 sm:border-gray-300 sm:text-gray-400 sm:hover:bg-gray-100"
            onClick={() => setQuitMessageShown(false)}
          >
            Stay
          </button>
        </div>
      </article>
    </>
  );
};

const CheckAnswer = ({
  isAnswerSelected,
  isAnswerCorrect,
  correctAnswerShown,
  correctAnswer,
  onCheckAnswer,
  onFinish,
  onSkip,
}: {
  isAnswerSelected: boolean;
  isAnswerCorrect: boolean;
  correctAnswerShown: boolean;
  correctAnswer: string;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
}) => {
  return (
    <>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={onSkip}
          >
            Skip
          </button>
          {!isAnswerSelected ? (
            <button
              className="grow rounded-2xl bg-gray-200 p-3 font-bold uppercase text-gray-400 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
              disabled
            >
              Check
            </button>
          ) : (
            <button
              onClick={onCheckAnswer}
              className="grow rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white sm:min-w-[150px] sm:max-w-fit sm:grow-0"
            >
              Check
            </button>
          )}
        </div>
      </section>

      <div
        className={
          correctAnswerShown
            ? isAnswerCorrect
              ? "fixed bottom-0 left-0 right-0 bg-lime-100 font-bold text-green-600 transition-all"
              : "fixed bottom-0 left-0 right-0 bg-red-100 font-bold text-red-500 transition-all"
            : "fixed -bottom-52 left-0 right-0"
        }
      >
        <div className="flex max-w-5xl flex-col gap-4 p-5 sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:py-14">
          <>
            {isAnswerCorrect ? (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-green-500 sm:block">
                  <DoneSvg />
                </div>
                <div className="text-2xl">Good job!</div>
              </div>
            ) : (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-red-500 sm:block">
                  <BigCloseSvg />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">Correct solution:</div>{" "}
                  <div className="text-sm font-normal">{correctAnswer}</div>
                </div>
              </div>
            )}
          </>
          <button
            onClick={onFinish}
            className={
              isAnswerCorrect
                ? "w-full rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
                : "w-full rounded-2xl border-b-4 border-red-600 bg-red-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            }
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

const ProblemSelect1Of3 = ({
  problem,
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  selectedAnswer,
  setSelectedAnswer,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  hearts,
}: {
  problem: Select1Of3Problem;
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  selectedAnswer: number | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  hearts: number | null;
}) => {
  const { question, answers, correctAnswer, image } = problem;

  // 이미지가 있는 경우 question을 분리
  const imagePrefix = "다음 그림을 보고 문제를 풀어보세요.";
  let questionTitle = "";
  let questionBody = question;
  
  if (image && question.startsWith(imagePrefix)) {
    questionTitle = imagePrefix;
    questionBody = question.slice(imagePrefix.length).trim();
  }

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            hearts={hearts}
          />
        </div>
        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24 sm:px-5">
          {image ? (
            <>
              {/* 이미지가 있는 경우: 제목은 위, 이미지, 본문은 아래 */}
              {questionTitle && (
                <h1 className="self-start text-xl font-bold sm:text-2xl">
                  {questionTitle}
                </h1>
              )}
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={image}
                  alt="크로마토그래피 실험 장치"
                  width={300}
                  height={375}
                  className="rounded-lg"
                />
                {questionBody && (
                  <p className="text-lg font-semibold sm:text-xl">
                    {questionBody}
                  </p>
                )}
              </div>
            </>
          ) : (
            <h1 className="self-start text-2xl font-bold sm:text-3xl">
              {question}
            </h1>
          )}
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
            role="radiogroup"
          >
            {answers.map((answer, i) => {
              return (
                <div
                  key={i}
                  className={
                    i === selectedAnswer
                      ? "cursor-pointer rounded-xl border-2 border-b-4 border-blue-300 bg-blue-100 p-4 text-blue-400"
                      : "cursor-pointer rounded-xl border-2 border-b-4 border-gray-200 p-4 hover:bg-gray-100"
                  }
                  role="radio"
                  aria-checked={i === selectedAnswer}
                  tabIndex={0}
                  onClick={() => setSelectedAnswer(i)}
                >
                  {answer.icon}
                  <h2 className="text-center">{answer.name}</h2>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer={answers[correctAnswer]?.name ?? ""}
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={selectedAnswer !== null}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
};

const ProblemWriteInEnglish = ({
  problem,
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  selectedAnswers,
  setSelectedAnswers,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  hearts,
}: {
  problem: WriteInEnglishProblem;
  correctAnswerCount: number;
  totalCorrectAnswersNeeded: number;
  selectedAnswers: number[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onCheckAnswer: () => void;
  onFinish: () => void;
  onSkip: () => void;
  hearts: number | null;
}) => {
  const { question, correctAnswer, answerTiles } = problem;

  // 선택된 아이템 가져오기
  const [selectedItem, setSelectedItem] = useState<StaticImageData>(summerPng);

  useEffect(() => {
    const savedItem = localStorage.getItem("selectedCharacter");
    if (savedItem && itemImages[savedItem]) {
      setSelectedItem(itemImages[savedItem]!);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            hearts={hearts}
          />
        </div>
        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
            다음 빈칸에 들어갈 말을 순서대로 고르시오 (ㄱ, ㄴ, ㄷ)
          </h1>

          <div className="w-full">
            <div className="flex items-center gap-2 px-2">
              <Image src={selectedItem} alt="" width={92} height={115} />
              <div className="relative ml-2 w-fit rounded-2xl border-2 border-gray-200 p-4">
                {question}
                <div
                  className="absolute h-4 w-4 rotate-45 border-b-2 border-l-2 border-gray-200 bg-white"
                  style={{
                    top: "calc(50% - 8px)",
                    left: "-10px",
                  }}
                ></div>
              </div>
            </div>

            <div className="flex min-h-[60px] flex-wrap gap-1 border-b-2 border-t-2 border-gray-200 py-1">
              {selectedAnswers.map((i) => {
                return (
                  <button
                    key={i}
                    className="rounded-2xl border-2 border-b-4 border-gray-200 p-2 text-gray-700"
                    onClick={() => {
                      setSelectedAnswers((selectedAnswers) => {
                        return selectedAnswers.filter((x) => x !== i);
                      });
                    }}
                  >
                    {answerTiles[i]}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {answerTiles.map((answerTile, i) => {
              return (
                <button
                  key={i}
                  className={
                    selectedAnswers.includes(i)
                      ? "rounded-2xl border-2 border-b-4 border-gray-200 bg-gray-200 p-2 text-gray-200"
                      : "rounded-2xl border-2 border-b-4 border-gray-200 p-2 text-gray-700"
                  }
                  disabled={selectedAnswers.includes(i)}
                  onClick={() =>
                    setSelectedAnswers((selectedAnswers) => {
                      if (selectedAnswers.includes(i)) {
                        return selectedAnswers;
                      }
                      return [...selectedAnswers, i];
                    })
                  }
                >
                  {answerTile}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer={correctAnswer.map((i) => answerTiles[i]).join(" ")}
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={selectedAnswers.length > 0}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
};

const LessonComplete = ({
  correctAnswerCount,
  incorrectAnswerCount,
  startTime,
  endTime,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  startTime: React.MutableRefObject<number>;
  endTime: React.MutableRefObject<number>;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const router = useRouter();
  const isPractice = "practice" in router.query;
  const step = Number(router.query.step) || 1;

  const increaseXp = useBoundStore((x) => x.increaseXp);
  const addToday = useBoundStore((x) => x.addToday);
  const increaseLingots = useBoundStore((x) => x.increaseLingots);
  const increaseLessonsCompleted = useBoundStore(
    (x) => x.increaseLessonsCompleted,
  );
  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8 font-bold">
        {/* 축하 이미지와 메시지 */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src={celebrationPng}
            alt="축하"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <h1 className="text-center text-3xl text-yellow-400 sm:text-4xl">
            잘했어요! 🎉
          </h1>
          <p className="text-center text-xl text-gray-600 sm:text-2xl">
            Step {step} 완료!
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="min-w-[110px] rounded-xl border-2 border-yellow-400 bg-yellow-400">
            <h2 className="py-1 text-center text-white">Total XP</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-yellow-400">
              {correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-blue-400 bg-blue-400">
            <h2 className="py-1 text-center text-white">Committed</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-blue-400">
              {formatTime(endTime.current - startTime.current)}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-green-400 bg-green-400">
            <h2 className="py-1 text-center text-white">Amazing</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-green-400">
              {Math.round(
                (correctAnswerCount /
                  (correctAnswerCount + incorrectAnswerCount)) *
                  100,
              )}
              %
            </div>
          </div>
        </div>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className={
              "flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            }
            href="/learn"
            onClick={() => {
              increaseXp(correctAnswerCount);
              addToday();
              increaseLingots(isPractice ? 0 : 1);
              if (!isPractice) {
                // 모든 step에서 1씩만 증가 (lessonsPerTile = 1)
                increaseLessonsCompleted(1);
              }
            }}
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

type QuestionResult = {
  question: string;
  yourResponse: string;
  correctResponse: string;
};

const ReviewLesson = ({
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const [selectedQuestionResult, setSelectedQuestionResult] =
    useState<null | QuestionResult>(null);
  return (
    <div
      className={[
        "fixed inset-0 flex items-center justify-center p-5 transition duration-300",
        reviewLessonShown ? "" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black",
          reviewLessonShown ? "opacity-75" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setReviewLessonShown(false)}
      ></div>
      <div className="relative flex w-full max-w-4xl flex-col gap-5 rounded-2xl border-2 border-gray-200 bg-white p-8">
        <button
          className="absolute -right-5 -top-5 rounded-full border-2 border-gray-200 bg-gray-100 p-1 text-gray-400 hover:brightness-90"
          onClick={() => setReviewLessonShown(false)}
        >
          <BigCloseSvg className="h-8 w-8" />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-center text-3xl">Check out your scorecard!</h2>
        <p className="text-center text-xl text-gray-400">
          Click the tiles below to reveal the solutions
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {questionResults.map((questionResult, i) => {
            return (
              <button
                key={i}
                className={[
                  "relative flex flex-col items-stretch gap-3 rounded-xl p-5 text-left",
                  questionResult.yourResponse === questionResult.correctResponse
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-500",
                ].join(" ")}
                onClick={() =>
                  setSelectedQuestionResult((selectedQuestionResult) =>
                    selectedQuestionResult === questionResult
                      ? null
                      : questionResult,
                  )
                }
              >
                <div className="flex justify-between gap-2">
                  <h3 className="font-bold">{questionResult.question}</h3>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                    {questionResult.yourResponse ===
                    questionResult.correctResponse ? (
                      <DoneSvg className="h-5 w-5" />
                    ) : (
                      <BigCloseSvg className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div>{questionResult.yourResponse}</div>
                {selectedQuestionResult === questionResult && (
                  <div className="absolute left-1 right-1 top-20 z-10 rounded-2xl border-2 border-gray-200 bg-white p-3 text-sm tracking-tighter">
                    <div
                      className="absolute -top-2 h-3 w-3 rotate-45 border-l-2 border-t-2 border-gray-200 bg-white"
                      style={{ left: "calc(50% - 6px)" }}
                    ></div>
                    <div className="font-bold uppercase text-gray-400">
                      Your response:
                    </div>
                    <div className="mb-3 text-gray-700">
                      {questionResult.yourResponse}
                    </div>
                    <div className="font-bold uppercase text-gray-400">
                      Correct response:
                    </div>
                    <div className="text-gray-700">
                      {questionResult.correctResponse}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LessonFastForwardStart = ({
  unitNumber,
  setIsStartingLesson,
}: {
  unitNumber: number;
  setIsStartingLesson: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardStartSvg />
        <h1 className="text-lg font-bold">
          Want to jump to Unit {unitNumber}?
        </h1>
        <p className="text-sm text-gray-400">
          {`Pass the test to jump ahead. We won't make it easy for you though.`}
        </p>
      </div>
      <div className="flex flex-col gap-5"></div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
          <Link
            href="/learn"
            className="font-bold uppercase text-blue-400 transition hover:brightness-110"
          >
            Maybe later
          </Link>
          <button
            className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 p-3 font-bold uppercase text-white transition hover:brightness-110 sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setIsStartingLesson(false)}
          >
            {`Let's go`}
          </button>
        </div>
      </section>
    </div>
  );
};

const LessonFastForwardEndFail = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndFailSvg />
        <h1 className="text-2xl font-bold">
          {`You didn't unlock Unit ${unitNumber}`}
        </h1>
        <p className="text-lg text-gray-500">
          {`Don't worry! Practice makes perfect.`}
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

const LessonFastForwardEndPass = ({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  unitNumber: number;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const jumpToUnit = useBoundStore((x) => x.jumpToUnit);
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndPassSvg />
        <h1 className="text-2xl font-bold">You unlocked Unit {unitNumber}!</h1>
        <p className="text-lg text-gray-500">
          Way to go! You’re making great strides!
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
            onClick={() => jumpToUnit(unitNumber)}
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};
