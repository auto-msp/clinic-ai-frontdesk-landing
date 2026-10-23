"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = { name: string; clinic: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", clinic: "", email: "", phone: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your full name.";
  if (!v.email.trim()) e.email = "Enter your work email.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email, like you@clinic.com.";
  return e;
}

const inputCls = (err?: string) =>
  `min-h-12 w-full rounded-md border bg-surface px-4 text-base text-ink placeholder:text-subtle focus:bg-surface ${err ? "border-[#b42318]" : "border-subtle focus:border-ink"}`;

/**
 * Front-end only. Replace the success branch of `onSubmit` with a call to your
 * backend or CRM before launch. Required fields are validated on blur and on
 * submit, and errors are announced via aria-describedby + role="alert".
 */
export default function ContactForm() {
  const id = useId();
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    setDone(false);
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const blur = (k: "name" | "email") => () => setErrors((s) => ({ ...s, [k]: validate(v)[k] }));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    const first = (["name", "email"] as const).find((k) => found[k]);
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setV(empty);
    setDone(true);
  }

  const field = (k: keyof Values, label: string, extra: { required?: boolean; type?: string; auto?: string; placeholder?: string }) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {extra.required && <span className="font-normal text-subtle"> (required)</span>}
      </label>
      <input
        id={`${id}-${k}`}
        name={k}
        type={extra.type ?? "text"}
        autoComplete={extra.auto}
        placeholder={extra.placeholder}
        value={v[k]}
        aria-required={extra.required || undefined}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
        onChange={set(k)}
        onBlur={k === "name" || k === "email" ? blur(k) : undefined}
        className={inputCls(errors[k])}
      />
      <p id={`${id}-${k}-err`} role="alert" className="mt-1.5 min-h-5 text-sm font-medium text-[#b42318]">
        {errors[k]}
      </p>
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-1">
      {field("name", "Full name", { required: true, auto: "name" })}
      {field("clinic", "Clinic name", { auto: "organization" })}
      {field("email", "Work email", { required: true, type: "email", auto: "email", placeholder: "you@clinic.com" })}
      {field("phone", "Phone number", { type: "tel", auto: "tel" })}
      <div>
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-semibold text-ink">
          How can we help?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          value={v.message}
          onChange={set("message")}
          className={`${inputCls()} min-h-28 py-3`}
        />
      </div>
      <button
        type="submit"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-white transition-colors duration-150 hover:bg-accent-hover sm:w-auto sm:justify-self-start"
      >
        Send request
      </button>
      <p role="status" className="mt-3 min-h-6 text-[0.95rem] font-medium text-ok">
        {done ? "Thanks. We'll be in touch within a business day." : ""}
      </p>
    </form>
  );
}
