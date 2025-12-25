"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Logged in successfully.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-lg border border-border">
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your dashboard</p>
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
            <div className="flex items-center justify-between">
              <span className="mb-1 block text-xs text-muted-foreground">Password</span>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot?</Link>
            </div>
            <input
              className="w-full rounded-md border border-input bg-background px-3 py-2 shadow-sm focus:ring-1 focus:ring-ring focus:border-ring placeholder:text-muted-foreground"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your password"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {message && (
          <div className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{message}</div>
        )}

        <footer className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            No account? <Link className="text-primary hover:underline" href="/signup">Create one</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
