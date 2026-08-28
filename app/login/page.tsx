import Link from "next/link";
import LoginForm from "./loginform";
import { Trophy, Infinity, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }).format(today);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <Link href="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-s font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 w-fit">
          <ArrowLeft size={22} />
          Back to home
        </Link>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-8">Sign in to manage your queue sessions.</p>

          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white flex-col p-16 justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[url('/login-bg.jpg')] bg-cover bg-center opacity-50"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#111111]/30" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-900/10 rounded-full blur-3xl -z-0"></div>
        
            <div className="relative z-10 max-w-lg">
                <h1 className=" text-6xl font-black leading-tight tracking-tighter uppercase mb-6">
                    Back on
                    <span className="text-green-600"> Court.</span>
                </h1>
            
                <p className="text-gray-400 text-lg mb-12">
                    Sign in to pick up right where you left off. <span className="text-green-600"> Badminton </span>and your player registry are waiting.
                </p>

                <div className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 mb-8 text-sm">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-3">
                    <div className="flex items-center gap-2 text-gray-300 font-medium">
                      <Trophy size={14} className="text-green-600" />
                      Sample session - #A1B2
                    </div>
                    <span className="text-gray-500 text-xs">{formattedDate}</span>
                  </div>

                  <div className="space-y-3">
                    <MockupRow rank="1" name="John D." tier="UB" wins="5W" wr="83%" status="Elevated" />
                    <MockupRow rank="2" name="Viktor A." tier="A" wins="4W" wr="80%" status="Elevated" />
                    <MockupRow rank="3" name="Kento M." tier="LI" wins="4W" wr="67%" status="Normal" />
                    <MockupRow rank="4" name="Chiharu S." tier="B" wins="3W" wr="50%" status="Normal" />
                  </div>
                </div>

                <div className="flex justify-between max-w-md mb-12">
                  <StatBlock number="3" label="Matchmaking Modes" />
                  <StatBlock number="4" label="Skill Level Tiers" />
                  <StatBlock number={<Infinity size={36} strokeWidth={3} />} label="Courts Supported" />
                </div>

            </div>

        </div>

    </div>

  );
}

function MockupRow({ rank, name, tier, wins, wr, status }: { rank: string, name: string, tier: string, wins: string, wr: string, status: string }) {
  const isTopThree = parseInt(rank) <= 3;
  return (
    <div className="flex justify-between items-center text-xs">
      <div className="flex items-center gap-4">
        <span className={`font-bold ${isTopThree ? 'text-green-600' : 'text-gray-600'}`}>{rank}</span>
        <span className="text-gray-200">{name}</span>
      </div>
      <div className="flex items-center gap-3 text-gray-400">
        <span className="w-6 text-center border border-gray-700 rounded-full text-[10px] py-0.5 text-white">{tier}</span>
        <span className="w-6 text-right">{wins}</span>
        <span className="w-8 text-right">{wr}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${status === 'Elevated' ? 'bg-teal-900/30 text-teal-400' : 'bg-gray-800 text-gray-400'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function StatBlock({ number, label }: { number: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-bebas text-5xl text-green-600 flex items-center justify-center h-10">
        {number}
      </span>
      <span className="text-[10px] tracking-widest text-white uppercase mt-1">{label}</span>
    </div>
  );
}
