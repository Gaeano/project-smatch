import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[linear-gradient(135deg,#08121f_0%,#111827_50%,#1f2937_100%)] px-6 text-center text-white">
      <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
        Landing Page
      </span>
      <h1 className="text-5xl font-black uppercase tracking-tight">Smatch</h1>
      <p className="max-w-xl text-sm text-white/70">
        The landing route is connected again, so Next.js can recognize it as a valid module.
      </p>
      <div className="flex gap-3">
        <Link href="/login" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90">
          Sign in
        </Link>
        <Link href="/signup" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
          Create account
        </Link>
      </div>
    </main>
  );
}
