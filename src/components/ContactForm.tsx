"use client";

import { useState } from "react";
import * as yup from "yup";

export const contactSchema = yup.object({
  from: yup
    .string()
    .email("유효한 이메일을 입력해주세요")
    .required("이메일은 필수입니다"),
  subject: yup.string().required("제목은 필수입니다"),
  text: yup.string().required("메시지는 필수입니다"),
});

import React from "react";
import { sendEmail, SendMailOptions } from "../service/contact";

export default function ContactForm() {
  const [values, setValues] = useState<SendMailOptions>({
    from: "",
    subject: "",
    text: "",
  });

  const [errors, setErrors] = useState<Partial<SendMailOptions>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await contactSchema.validate(values, { abortEarly: false });
      await sendEmail(values);
      alert("메일이 전송되었습니다.");
      setValues({ from: "", subject: "", text: "" });
      setErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Partial<SendMailOptions> = {};

        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof SendMailOptions] = error.message;
          }
        });

        setErrors(newErrors);
      } else {
        console.error(err);
        alert("메일 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl">
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Your Email</label>
        <input
          type="email"
          name="from"
          value={values.from}
          onChange={handleChange}
          className="border rounded px-3 py-1 text-sm w-full"
        />
        {errors.from && <p className="text-xs text-red-500">{errors.from}</p>}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Subject</label>
        <input
          type="text"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          className="border rounded px-3 py-1 text-sm"
        />
        {errors.subject && (
          <p className="text-xs text-red-500">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Message</label>
        <textarea
          name="text"
          value={values.text}
          onChange={handleChange}
          rows={5}
          className="border rounded px-3 py-2 text-sm resize-none"
        />
        {errors.text && <p className="text-xs text-red-500">{errors.text}</p>}
      </div>

      <button
        type="submit"
        className="disabled:opacity-80 disabled:cursor-not-allowed px-4 py-2 rounded bg-black text-white text-sm hover:bg-gray-800 transition cursor-pointer"
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
}
