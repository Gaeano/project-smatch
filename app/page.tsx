import Link from "next/link"; 

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#111111] text-white">
      <h1 className="text-5xl font-black mb-6 uppercase tracking-tight">Smatch</h1>
      <p className="mb-8 text-gray-400">Gaea ungo. Gaea bayot. Gaea </p>
      
      {/* inganion diay pag comment HAHAHAHHAHA */}
      <Link href="/signup" className="px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500 transition-colors">
        Create account
      </Link>
    </main>
    
  );
}
