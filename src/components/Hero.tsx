import Image from "next/image";
import Link from "next/link";
import profileImage from "../../public/images/profile.jpeg";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center bg-gray-50 py-20 gap-y-4">
      <div className="w-50 h-50 rounded-full overflow-hidden">
        <Image src={profileImage} alt="Picture of the author" />
      </div>

      <div className="space-y-1 text-sm text-center">
        <h2 className="font-semibold text-base">Hi, I'm Seoyoung</h2>
        <p className="text-gray-600">Frontend Developer</p>
        <Link
          href="/contact"
          className="mt-2 bg-pink-50 px-4 py-1 rounded-md text-gray-500 font-semibold hover:bg-pink-100 transition"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}
