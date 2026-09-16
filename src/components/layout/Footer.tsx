import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/10 pt-24 pb-6 overflow-hidden w-full flex flex-col items-center z-10">
      <div className="max-w-7xl w-full px-8 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 z-10">
        
        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase text-xs">Quick Links</h4>
          <div className="flex flex-col gap-4">
            <Link href="#features" className="text-gray-400 hover:text-green-500 transition-colors text-sm w-fit">How it works</Link>
            <Link href="/signup" className="text-gray-400 hover:text-green-500 transition-colors text-sm w-fit">Get Started</Link>
            <Link href="#faq" className="text-gray-400 hover:text-green-500 transition-colors text-sm w-fit">FAQ</Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase text-xs">Legal</h4>
          <div className="flex flex-col gap-4">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm w-fit">Terms & Policies</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm w-fit">Privacy Policy</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm w-fit">Cookie Guidelines</Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-white font-bold tracking-[0.2em] uppercase text-xs">Built By</h4>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com/ladajules" 
              target="_blank" 
              rel="noreferrer"
              className="group flex flex-col items-center gap-2">

              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-green-500 transition-colors">
                <img 
                  src="https://github.com/ladajules.png" 
                  alt="Developer 1" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
            </a>
            <a 
              href="https://github.com/gaeano" 
              target="_blank" 
              rel="noreferrer"
              className="group flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-green-500 transition-colors">
                <img 
                  src="https://github.com/gaeano.png" 
                  alt="Developer 2" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
            </a>
          </div>
          
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center relative select-none pointer-events-none">
        
        <span className="text-[25vw] leading-[0.8] font-bebas tracking-tighter text-white opacity-[0.03]">
          SMATCH
        </span>
        
        <div className="absolute bottom-0 w-full text-center text-gray-600 text-[10px] tracking-widest font-inter uppercase">
          © {currentYear} Smatch. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}