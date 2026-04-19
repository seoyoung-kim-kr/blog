import { NextResponse } from "next/server";
import * as yup from "yup";
import { sendEmail } from "@/src/service/email";

const bodySchema = yup.object().shape({
  from: yup
    .string()
    .required("※ 이메일을 입력해주세요.")
    .email("※ 이메일 형식이 올바르지 않습니다."),
  subject: yup.string().required("※ 제목을 입력해주세요."),
  message: yup.string().required("※ 내용을 입력해주세요."),
});

export async function POST(req: Request) {
  const body = await req.json();

  return bodySchema
    .validate(body, { abortEarly: false })
    .then((validatedBody) => sendEmail(validatedBody))
    .then(() =>
      NextResponse.json({ message: "메일 전송 성공" }, { status: 200 }),
    )
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        console.error(error.inner);
        return NextResponse.json(
          {
            message: error.errors.join("\n "),
          },
          { status: 400 },
        );
      }

      console.error(error);

      return NextResponse.json({ message: "메일 전송 실패" }, { status: 500 });
    });
}
