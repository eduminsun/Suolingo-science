import type { NextPage } from "next";
import Link from "next/link";
import subjects from "~/utils/subjects";
import { LanguageHeader } from "~/components/LanguageHeader";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";

const bgSnow = _bgSnow as StaticImageData;

const Register: NextPage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center bg-[#235390] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <LanguageHeader />
      <div className="container flex grow flex-col items-center justify-center gap-8 px-4 py-8">
        <h1 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          어떤 과학을 배우고 싶으신가요?
        </h1>
        <section className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4 sm:gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.code}
              href="/learn"
              className={
                "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-b-4 px-4 py-6 text-lg font-bold hover:bg-gray-300 hover:bg-opacity-20 transition-all sm:py-8 sm:text-xl"
              }
              style={{
                borderColor: subject.color,
              }}
            >
              <div className="text-5xl sm:text-6xl">{subject.emoji}</div>
              <span>{subject.name}</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Register;
