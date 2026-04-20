"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast, Toaster } from "sonner";
import { sendContactEmail } from "../service/contact";

const DEFAULT_DATA = {
  from: "",
  subject: "",
  message: "",
};

type Form = typeof DEFAULT_DATA;

export default function ContactForm() {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form)
      .then(() => {
        toast.success("메일이 전송되었습니다.");
        setForm(DEFAULT_DATA);
      })
      .catch((err) => {
        toast.error(err?.message || "메일 전송에 실패했습니다.", {
          style: {
            whiteSpace: "pre-line",
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="from" className="text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            name="from"
            value={form.from}
            onChange={handleChange}
            className="border rounded px-3 py-1 text-sm w-full"
            required
            autoFocus
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="border rounded px-3 py-1 text-sm"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={10}
            className="border rounded px-3 py-2 text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          className="disabled:opacity-80 disabled:cursor-not-allowed px-4 py-2 rounded bg-black text-white text-sm hover:bg-gray-800 transition cursor-pointer"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </>
  );
}
