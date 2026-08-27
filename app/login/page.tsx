import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/50">Welcome back</p>
        <h1 className="text-3xl font-black uppercase tracking-tight">Login</h1>
        <p className="mt-3 text-sm text-white/65">
          The login route now exists, which keeps the app router and type checker happy.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/signup" className="rounded-full bg-yellow-400 px-5 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-yellow-300">
            Create account
          </Link>
          <Link href="/" className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
