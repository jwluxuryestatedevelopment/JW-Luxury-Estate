"use client";

import { FormEvent, useState } from "react";

type FormState = {
  fullName: string;
  companyName: string;
  emailAddress: string;
  phone: string;
  message: string;
  website: string;
};

type ContactApiResponse =
  | {
      ok: true;
      data: {
        id: string | null;
      };
    }
  | {
      ok: false;
      error: string;
      details?: string;
    };

const initialFormState: FormState = {
  fullName: "",
  companyName: "",
  emailAddress: "",
  phone: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    console.info("[contact-form] submitting inquiry");
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      let result: ContactApiResponse | null = null;

      try {
        result = (await response.json()) as ContactApiResponse;
      } catch (error) {
        console.error("[contact-form] failed to parse response JSON", error);
      }

      if (!response.ok || !result?.ok) {
        const errorMessage =
          result && !result.ok
            ? result.error
            : "Unable to send your inquiry right now.";

        console.error("[contact-form] submit failed", {
          status: response.status,
          result,
        });

        throw new Error(errorMessage);
      }

      console.info("[contact-form] inquiry sent", result.data);
      setFormState(initialFormState);
      setStatus({
        type: "success",
        message: "Your inquiry was sent successfully. We'll be in touch shortly.",
      });
    } catch (error) {
      console.error("[contact-form] unexpected submit error", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your inquiry right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
        <label className="form-field block border-b border-white/12 pb-3">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-white/26">
            Full Name
          </span>
          <input
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={formState.fullName}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                fullName: event.target.value,
              }))
            }
            placeholder="Enter full name"
            className="w-full bg-transparent text-sm leading-7 text-white/80 outline-none placeholder:text-white/24"
          />
        </label>

        <label className="form-field block border-b border-white/12 pb-3">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-white/26">
            Company Name
          </span>
          <input
            name="companyName"
            type="text"
            autoComplete="organization"
            value={formState.companyName}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                companyName: event.target.value,
              }))
            }
            placeholder="Enter company name"
            className="w-full bg-transparent text-sm leading-7 text-white/80 outline-none placeholder:text-white/24"
          />
        </label>

        <label className="form-field block border-b border-white/12 pb-3">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-white/26">
            Email Address
          </span>
          <input
            name="emailAddress"
            type="email"
            autoComplete="email"
            required
            value={formState.emailAddress}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                emailAddress: event.target.value,
              }))
            }
            placeholder="Enter email address"
            className="w-full bg-transparent text-sm leading-7 text-white/80 outline-none placeholder:text-white/24"
          />
        </label>

        <label className="form-field block border-b border-white/12 pb-3">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-white/26">
            Phone Number
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={formState.phone}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                phone: event.target.value,
              }))
            }
            placeholder="Enter phone number"
            className="w-full bg-transparent text-sm leading-7 text-white/80 outline-none placeholder:text-white/24"
          />
        </label>

        <label className="form-field block border-b border-white/12 pb-3 sm:col-span-2">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.26em] text-white/26">
            Tell Us What You Need
          </span>
          <textarea
            name="message"
            rows={3}
            required
            value={formState.message}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                message: event.target.value,
              }))
            }
            placeholder="Team size, city, move-in timing, stay length, and any must-haves..."
            className="min-h-[6.5rem] w-full resize-none bg-transparent text-sm leading-7 text-white/80 outline-none placeholder:text-white/24"
          />
        </label>

        <label className="hidden">
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formState.website}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                website: event.target.value,
              }))
            }
          />
        </label>
      </div>

      <div aria-live="polite" className="min-h-6">
        {status.type !== "idle" ? (
          <p
            className={[
              "rounded-full border px-4 py-2 text-sm leading-6",
              status.type === "success" ? "text-[#d7c08b]" : "text-[#f3b1a2]",
              status.type === "success"
                ? "border-[#d7c08b]/18 bg-[#d7c08b]/6"
                : "border-[#f3b1a2]/18 bg-[#f3b1a2]/6",
            ].join(" ")}
          >
            {status.message}
          </p>
        ) : (
          <p className="text-xs leading-6 text-white/38">
            We respond with fit, timing, and next steps for your housing request.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="button-sheen inline-flex h-[48px] w-full items-center justify-center bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#080504] transition-transform duration-150 ease-out hover:bg-accent-strong active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Request Housing Plan"}
      </button>
    </form>
  );
}
