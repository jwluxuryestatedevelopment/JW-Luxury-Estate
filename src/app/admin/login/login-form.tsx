"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import BrandLockup from "../../components/brand-lockup";
import { supabase } from "../../../../lib/supabase/client";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function redirectIfLoggedIn() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session && isMounted) {
        router.replace("/admin");
      }
    }

    redirectIfLoggedIn();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/admin");
  }

  return (
    <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[980px] flex-col">
        <div className="flex items-center justify-between border-b border-border-subtle pb-5">
          <BrandLockup href="/" />
          <Link
            href="/"
            className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted transition-colors duration-200 hover:text-foreground"
          >
            Site
          </Link>
        </div>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.54fr)_minmax(320px,0.46fr)]">
          <div className="max-w-[32rem] space-y-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Private Access
            </p>
            <h1 className="font-display text-[3.3rem] leading-[0.92] tracking-[-0.045em] sm:text-[4.8rem]">
              JW Luxury Estate Admin
            </h1>
            <p className="max-w-[27rem] text-[1rem] leading-8 text-muted">
              Manage hero photos and property content from one protected place.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-border-subtle bg-surface px-6 py-7 shadow-[0_22px_50px_rgba(17,12,9,0.06)] sm:px-7"
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="admin-email"
                  className="block text-[10px] font-bold uppercase tracking-[0.26em] text-muted"
                >
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="h-12 w-full border border-border-subtle bg-background px-4 text-sm text-foreground transition-colors duration-200 focus:border-border-strong"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="admin-password"
                  className="block text-[10px] font-bold uppercase tracking-[0.26em] text-muted"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="h-12 w-full border border-border-subtle bg-background px-4 text-sm text-foreground transition-colors duration-200 focus:border-border-strong"
                />
              </div>

              {message ? (
                <p className="border border-red-950/15 bg-red-50 px-4 py-3 text-sm leading-6 text-red-900">
                  {message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="button-sheen inline-flex h-12 w-full items-center justify-center bg-[#17120f] px-5 text-[10px] font-bold uppercase tracking-[0.28em] !text-white transition-[opacity,transform,background-color] duration-150 ease-out hover:bg-[#27211d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isSubmitting ? "Signing In" : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
