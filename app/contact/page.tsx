import { FaGithub } from "react-icons/fa";
import { PiNotionLogo } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import ContactForm from "@/src/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="items-center justify-center flex flex-col gap-y-4">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <h1 className="text-xl">Contact Me</h1>
        <p className="text-sm hover:underline">
          <a href="mailto:seoyoung.k.kr@gamil.com">seoyoung.k.kr@gamil.com</a>
        </p>
      </div>

      <div className="flex gap-x-2">
        <Link href="https://github.com/seoyoung-kim-kr" target="_blank">
          <FaGithub size={40} />
        </Link>
        <Link
          href="https://www.notion.so/2c7ae54c5b7880869b47cefaaab99c06?source=copy_link"
          target="_blank"
        >
          <PiNotionLogo size={40} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/seoyoung-kim-6a4058394/"
          target="_blank"
        >
          <FaLinkedin size={40} />
        </Link>
      </div>
      <div className="mt-6 w-full flex flex-col items-center justify-center">
        <h1 className="text-xl">Send me an email</h1>
        <ContactForm />
      </div>
    </section>
  );
}
