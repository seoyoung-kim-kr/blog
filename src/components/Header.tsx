import Link from "next/link";
import React from "react";
import Container from "./Container";

type Menu = {
  label: string;
  href: string;
};

const MENU_LIST: Menu[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "about",
  },
  {
    label: "Posts",
    href: "posts",
  },
  {
    label: "Contact",
    href: "contact",
  },
];

function MenuBar() {
  return (
    <ul className="flex gap-x-2">
      {MENU_LIST.map((menu, idx) => (
        <li key={idx}>
          <Link href={menu.href} className="text-sm hover:underline">
            {menu.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  return (
    <Container>
      <header className="flex justify-between">
        <Link href="/">
          <h1>Seoyoung's Blog</h1>
        </Link>
        <MenuBar />
      </header>
    </Container>
  );
}
