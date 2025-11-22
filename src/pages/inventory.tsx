import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import choco from "../../public/choco-cookie.png";
import lemon from "../../public/lemon.png";
import sweetPotato from "../../public/sweet-potato.png";
import yangGang from "../../public/yang-gang.png";
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

import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";
import { DoneSvg, CheckmarkSvg } from "~/components/Svgs";
import Link from "next/link";

// 아이템 정보 매핑
const itemInfo: Record<
  string,
  { name: string; image: typeof Image; category: string }
> = {
  yangGang: {
    name: "양갱 에디션",
    image: yangGang,
    category: "Merch",
  },
  choco: {
    name: "초코쿠키 에디션",
    image: choco,
    category: "Merch",
  },
  sweetPotato: {
    name: "군고구마 에디션",
    image: sweetPotato,
    category: "Merch",
  },
  lemon: {
    name: "레몬 에디션",
    image: lemon,
    category: "Merch",
  },
  chocolate: {
    name: "초콜릿",
    image: chocolate,
    category: "Food",
  },
  strawberry: {
    name: "딸기",
    image: strawberry,
    category: "Food",
  },
  jelly: {
    name: "젤리",
    image: jelly,
    category: "Food",
  },
  creamBrulee: {
    name: "크렘 브륄레",
    image: creamBrulee,
    category: "Food",
  },
  castella: {
    name: "카스테라",
    image: castella,
    category: "Food",
  },
  soda: {
    name: "소다",
    image: soda,
    category: "Food",
  },
  bento: {
    name: "도시락",
    image: bento,
    category: "Food",
  },
  grill: {
    name: "그릴",
    image: grill,
    category: "Food",
  },
  applePie: {
    name: "사과파이",
    image: applePie,
    category: "Food",
  },
  kiwi: {
    name: "키위",
    image: kiwi,
    category: "Food",
  },
};

// 선택 가능한 아이템 ID 목록 (캐릭터 + 소다)
const selectableItemIds = ["yangGang", "choco", "sweetPotato", "lemon", "soda"];

const Inventory: NextPage = () => {
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 구매한 아이템 불러오기
    const stored = localStorage.getItem("purchasedItems");
    if (stored) {
      setPurchasedItems(JSON.parse(stored));
    }
    
    // 로컬 스토리지에서 선택된 아이템 불러오기
    const savedItem = localStorage.getItem("selectedCharacter");
    if (savedItem && selectableItemIds.includes(savedItem)) {
      setSelectedCharacter(savedItem);
    }
  }, []);

  // 카테고리별로 아이템 그룹화
  const itemsByCategory = purchasedItems.reduce(
    (acc, itemId) => {
      const item = itemInfo[itemId];
      if (item) {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push({ id: itemId, ...item });
      }
      return acc;
    },
    {} as Record<string, Array<{ id: string; name: string; image: typeof Image; category: string }>>,
  );

  const categories = Object.keys(itemsByCategory);

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab={null} />
      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="px-4 pb-20">
          <div className="py-7">
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-3xl font-bold">내 아이템</h1>
              <div className="flex gap-2">
                <Link
                  href="/learn"
                  className="flex items-center gap-2 rounded-2xl border-2 border-b-4 border-gray-300 bg-gray-200 px-4 py-2 text-sm font-bold uppercase text-gray-700 transition hover:brightness-105"
                >
                  돌아가기
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 rounded-2xl border-2 border-b-4 border-blue-500 bg-blue-400 px-4 py-2 text-sm font-bold uppercase text-white transition hover:brightness-105"
                >
                  상점으로 가기
                </Link>
              </div>
            </div>
            {purchasedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <p className="text-xl text-gray-500">보유 중인 아이템이 없습니다.</p>
                <p className="text-sm text-gray-400">
                  상점에서 아이템을 구매해보세요!
                </p>
              </div>
            ) : (
              categories.map((category) => (
                <div key={category} className="mb-8">
                  <h2 className="mb-5 text-2xl font-bold">{category}</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {itemsByCategory[category]?.map((item) => {
                      const isSelectable = selectableItemIds.includes(item.id);
                      const isSelected = isSelectable && selectedCharacter === item.id;
                      
                      return (
                        <div
                          key={item.id}
                          className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 shadow-sm transition ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : isSelectable
                                ? "cursor-pointer border-gray-200 bg-white hover:shadow-md"
                                : "border-gray-200 bg-white hover:shadow-md"
                          }`}
                        >
                          <div className="relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="h-32 w-32 rounded-lg object-cover"
                              width={128}
                              height={128}
                            />
                            <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                              <DoneSvg className="h-4 w-4 text-white" />
                            </div>
                            {isSelected && (
                              <div className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                <CheckmarkSvg />
                              </div>
                            )}
                          </div>
                          <h3 className="text-center text-lg font-bold">
                            {item.name}
                          </h3>
                          {isSelectable ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCharacter(item.id);
                                localStorage.setItem("selectedCharacter", item.id);
                              }}
                              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {isSelected ? "선택됨" : "선택하기"}
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-600">
                              <DoneSvg className="h-4 w-4" /> 보유 중
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <RightBar />
      </div>
      <BottomBar selectedTab={null} />
    </div>
  );
};

export default Inventory;

