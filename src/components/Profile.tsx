import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="m-auto w-fit">
      <div className="w-40 h-40 rounded-full overflow-hidden">
        <Image
          src="/images/profile.jpeg"
          alt="Profile"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col items-center gap-y-1 mt-4 text-sm">
        <h2>Hi, I'm Seoyoung</h2>
        <p>Frontend Developer</p>
        <Link
          href="contact"
          className="bg-pink-50 py-1 px-4 rounded-md text-gray hover:bg-pink-50 transition-colors duration-300 font-semibold text-gray-500"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
