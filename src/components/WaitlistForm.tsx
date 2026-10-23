"use client";

import { useState, type FormEvent } from "react";

/**
 * Front-end only. Replace the body of `onSubmit` with a call to your backend or
 * CRM (for example a Next.js server action or a route handler) before launch.
 */
export default function WaitlistForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setDone(true);
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto mt-5 flex max-w-[460px] flex-col gap-2.5 sm:flex-row">
        <label htmlFor="wl-email" className="sr-only">
          Work email
        </label>
        <input
          id="wl-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@clinic.com"
          className="flex-1 rounded-lg border-[1.5px] border-line px-3.5 py-3 text-ink focus:outline-2 focus:outline-accent"
        />
        <button
          type="submit"
          className="rounded-lg border-[1.5px] border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Join the Waitlist
        </button>
      </form>
      <p role="status" className="mt-3 min-h-6 font-semibold text-ok">
        {done ? "Thanks, you're on the list." : ""}
      </p>
    </>
  );
}
