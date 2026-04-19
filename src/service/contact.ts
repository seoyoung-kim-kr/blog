import { EmailData } from "./email";

export async function sendContactEmail(email: EmailData) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "서버 요청에 실패했습니다.");
  }
  return data;
}
