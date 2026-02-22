export type SendMailOptions = {
  from: string;
  subject: string;
  text: string;
};

export async function sendEmail(options: SendMailOptions) {
  console.log(options);
  await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
}
