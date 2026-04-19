import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { from, subject, text } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_APP_EMAIL,
        pass: process.env.NEXT_APP_PWD,
      },
    });

    await transporter.sendMail({
      to: process.env.NEXT_APP_EMAIL,
      replyTo: from,
      from,
      subject,
      text,
      html: `
    		<h2>${subject}</h2>
    		<div>${text}</div>
    		</br>
    		<p>보낸사람 : ${from}</p>
    		`,
    });

    return NextResponse.json({ message: "메일 전송 성공" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "메일 전송 실패" }, { status: 500 });
  }
}
