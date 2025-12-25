import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="border-b border-border bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-6">
          <h2 className="text-lg font-semibold">HEALTH TRACKER</h2>
          <nav className="flex gap-3">
            <Link href="/login" className="rounded px-4 py-2 text-sm hover:underline">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-8">
        <section className="mb-8 rounded-lg bg-card p-8 shadow text-card-foreground border border-border">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h1 className="text-4xl font-extrabold leading-tight">Health Tracker</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                Track your age, height, weight, habits and targets — get
                personalized calorie, nutrition and exercise suggestions to
                meet your goals faster.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                >
                  Create account
                </Link>

                <Link href="/login" className="inline-flex items-center gap-2 rounded border border-border px-5 py-3 text-sm hover:bg-muted/50">
                  Log in
                </Link>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:w-1/3">
              <div className="rounded border border-border p-4 bg-muted/30">
                <strong className="block">Quick summary</strong>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sign up to receive tailored time estimates, calorie targets,
                  meal suggestions and exercise plans.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded bg-card p-6 shadow border border-border">
            <h4 className="mb-2 text-lg font-semibold">Profile</h4>
            <p className="text-sm text-muted-foreground">
              Record: age, gender, height, weight, habits, past diagnosis,
              profession, free time / stress and personal targets.
            </p>
          </article>

          <article className="rounded bg-card p-6 shadow border border-border">
            <h4 className="mb-2 text-lg font-semibold">Nutrition & Calories</h4>
            <p className="text-sm text-muted-foreground">Food & supplements logging with AI-assisted suggestions.</p>
          </article>

          <article className="rounded bg-card p-6 shadow border border-border">
            <h4 className="mb-2 text-lg font-semibold">Exercise & Reports</h4>
            <p className="text-sm text-muted-foreground">Exercise tracking, progress reports and suggested routines.</p>
          </article>

          <article className="rounded bg-card p-6 shadow md:col-span-3 border border-border">
            <h3 className="mb-2 text-xl font-semibold">Vision</h3>
            <p className="text-sm text-muted-foreground">
              Build a lightweight, AI-assisted health tracker that combines
              profile data, nutrition and exercise insights to give users a
              clear, achievable plan toward their targets.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
