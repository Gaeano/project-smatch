import Link from 'next/link';
import SignupForm from './signupform'
import { Check, BarChart2, Zap, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-white">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
            <Link href="/" 
              className="absolute top-8 left-8 flex items-center gap-2 text-s font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 w-fit">
              <ArrowLeft size={22} />
              Back to home
            </Link>


            <div className="w-full max-w-md">
                <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-sm text-gray-500 mb-8">Become a queue master. No credit card needed.</p>

                <SignupForm />
            </div>
        </div>

        

        <div className="hidden lg:flex lg:w-1/2 bg-[#111111] text-white flex-col p-16 justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 bg-[url('/signup-bg.jpg')] bg-cover bg-center opacity-50"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#111111]/30" aria-hidden="true" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-900/10 rounded-full blur-3xl -z-0"></div>
        
            <div className="relative z-10 max-w-lg">
                <h1 className="text-6xl font-black leading-tight tracking-tighter uppercase mb-6">
                    Join the <br />
                    <span className="text-green-600">Queue.</span> <br />
                    Run the <br />
                    Court.
                </h1>
            
                <p className="text-gray-400 text-lg mb-12">
                    Create your account and run your <span className="text-green-600">first session</span> in minutes. 
                    Your player registry and stats stay with you across every session.
                </p>

                <div className="space-y-6">
                    <FeatureItem 
                    icon={<Check className="w-5 h-5 text-green-400" />}
                    title="Register players once"
                    desc="Add players to your registry and pull them into any future session without re-entering details."
                    />
                    <FeatureItem 
                    icon={<BarChart2 className="w-5 h-5 text-blue-400" />}
                    title="Persistent stats across sessions"
                    desc="Win rates, MMR, streaks, and performance ratings carry over automatically."
                    />
                    <FeatureItem 
                    icon={<Zap className="w-5 h-5 text-orange-400" />}
                    title="Smart matchmaking engine"
                    desc="Three matchmaking modes including Smart Hybrid — MMR-aware pairings."
                    />
                </div>

            </div>

            <p className='absolute bottom-8 right-8 flex text-xs text-gray-700'>Photo by BWF</p>

        </div>

    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded bg-gray-800 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-white text-lg">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
    </div>
  );
}
