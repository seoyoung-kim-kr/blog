import Container from "@/src/components/Container";
import Profile from "@/src/components/Profile";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <section className="bg-gray-50 py-20">
        <Profile />
      </section>

      <Container>
        <section className="space-y-10">
          <div>
            <h1>Who am I?</h1>
            <p className="text-sm">
              프론트엔드 개발자 김서영입니다.
              <br />
              - 새로운 기술에 대해 두려움 없이 도전하며, 학습하는 과정 자체를
              즐깁니다.
              <br />- 사용자의 관점에서 생각하며, 직관적이고 편리한 UI/UX를
              구현하는 데 관심이 많습니다.
            </p>
          </div>
          <div>
            <h1>Carrer</h1>
            <p className="text-sm">(주)썬더소프트코리아(2023.01.01 ~ 현재)</p>
          </div>
          <div>
            <h1>Skills</h1>
            <p className="text-sm">
              <span className="font-semibold">Frontend</span> : React, Tailwind
              CSS, NextJS, Tanstack Query/Table,Axios, Zustand
            </p>
            <p className="text-sm">
              <span className="font-semibold">Language</span> : JavaScript,
              TypeScript, Python
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
