import type { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { PiNotionLogo } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import ContactForm from "@/src/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Seoyoung에게 메일 발송",
};

const socialLinks: { href: string; label: string; Icon: IconType }[] = [
  {
    href: "https://github.com/seoyoung-kim-kr",
    label: "GitHub",
    Icon: FaGithub,
  },
  {
    href: "https://www.notion.so/2c7ae54c5b7880869b47cefaaab99c06?source=copy_link",
    label: "Notion",
    Icon: PiNotionLogo,
  },
  {
    href: "https://www.linkedin.com/in/seoyoung-kim-6a4058394/",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
];

export default function ContactPage() {
  return (
    <section className="items-center justify-center flex flex-col gap-y-4 py-10">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <h2 className="text-xl">Contact Me</h2>
        <p className="text-sm hover:underline">
          <a href="mailto:seoyoung.k.kr@gamil.com">seoyoung.k.kr@gamil.com</a>
        </p>
      </div>

      <div className="flex gap-x-2">
        {socialLinks.map(({ href, label, Icon }) => (
          <Link key={label} href={href} target="_blank" aria-label={label}>
            <Icon size={40} />
          </Link>
        ))}
      </div>

      <div className="mt-6 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl">Send me an email</h2>
        <ContactForm />
      </div>
    </section>
  );
}
