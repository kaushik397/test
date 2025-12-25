"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrorType(null);

    const { data, error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      // Provide better guidance when confirmation email fails to send
      if (error.message?.toLowerCase().includes("error sending confirmation")) {
        setErrorType("confirmation_email");
        setMessage(
          "There was a problem sending the confirmation email. This usually means your Supabase project needs an SMTP provider configured or email confirmations are disabled on the project."
        );
        return;
      }

      setMessage(error.message);
      return;
    }

    setMessage(
      "Signup successful. Check your email for a confirmation link if email confirmations are enabled."
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-lg border border-border">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start tracking your health goals — calories, nutrition, exercise
            and more.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Email</span>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 shadow-sm focus:ring-1 focus:ring-ring focus:border-ring placeholder:text-muted-foreground"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Password</span>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 shadow-sm focus:ring-1 focus:ring-ring focus:border-ring placeholder:text-muted-foreground"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Choose a strong password"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {errorType === "confirmation_email" && message && (
          <div className="mt-4 rounded-md bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
            <p className="text-sm">{message}</p>
            <div className="mt-2">
              <p>Quick fixes:</p>
              <ul className="ml-4 list-disc">
                <li>Configure an SMTP provider in your Supabase project (Project → Settings → Email).</li>
                <li>Or disable email confirmations in Supabase Auth settings for testing.</li>
              </ul>
              <p className="mt-2">
                Supabase docs: <a className="text-blue-600" href="https://supabase.com/docs/guides/auth#email">https://supabase.com/docs/guides/auth#email</a>
              </p>
            </div>
          </div>
        )}

        {message && errorType !== "confirmation_email" && (
          <div className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
            <p>{message}</p>
          </div>
        )}

        <footer className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Already have an account? <Link className="text-primary hover:underline" href="/login">Log in</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
