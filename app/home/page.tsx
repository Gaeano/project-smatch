import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-950 px-6 text-center text-white">
      <h1 className="text-4xl font-black uppercase tracking-tight">Home</h1>
      <p className="max-w-md text-sm text-neutral-400">
        This route is now wired up so the app can build cleanly.
      </p>
      <Link
        href="/"
        className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
      >
        Go to main page
      </Link>
    </main>
  );
}
