"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Front-end only. Replace the body of `onSubmit` with a call to your backend or
 * CRM (for example a Next.js server action or a route handler) before launch.
 *
 * Validation runs on blur and on submit (not on every keystroke) and the error
 * is announced via aria-describedby + role="alert".
 */
export default function WaitlistForm() {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function validate(v: string) {
    if (!v.trim()) return "Enter your work email.";
    if (!EMAIL.test(v.trim())) return "Enter a valid email, like you@clinic.com.";
    return "";
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const msg = validate(value);
    setError(msg);
    if (msg) {
      document.getElementById(`${id}-email`)?.focus();
      return;
    }
    setValue("");
    setDone(true);
  }

  const helpId = `${id}-help`;
  const errId = `${id}-error`;

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6">
      <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-semibold text-ink">
        Work email
      </label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@clinic.com"
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${helpId} ${errId}` : helpId}
        onChange={(e) => {
          setValue(e.target.value);
          setDone(false);
          if (error) setError("");
        }}
        onBlur={() => value && setError(validate(value))}
        className={`min-h-12 w-full rounded-lg border bg-paper px-4 text-base text-ink placeholder:text-subtle focus:bg-surface ${error ? "border-[#b42318]" : "border-line-strong"}`}
      />
      <p id={helpId} className="mt-2 text-sm text-subtle">
        We&apos;ll use it only to reply about your demo.
      </p>
      <p id={errId} role="alert" className="mt-2 min-h-5 text-sm font-medium text-[#b42318]">
        {error}
      </p>

      <button
        type="submit"
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-accent-hover sm:w-auto"
      >
        Request a demo
      </button>

      <p role="status" className="mt-4 min-h-6 text-[0.95rem] font-medium text-ok">
        {done ? "Thanks, you're on the list. We'll be in touch." : ""}
      </p>
    </form>
  );
}
