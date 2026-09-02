'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Brain, Hand, Timer, Trophy, Clock, Repeat, ArrowUp, MoveRight } from "lucide-react";

type Feature = { title: string; desc: string; icon: React.ReactNode };

const images = [
  { src: "landing-page1.png", position: "60% 40%" },
  { src: "landing-page2.png", position: "20% 45%" },
  { src: "landing-page3.jpg", position: "45% 65%" },
  { src: "landing-page4.jpg", position: "32% 80%" },
];

const features: Feature[] = [
  {
    title: "Automated Matchmaking",
    desc: "Forms balanced matches automatically based on rest time, games played, and skill.",
    icon: <Brain className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Manual Matchmaking",
    desc: "Hand-pick who plays who whenever you want to bypass the queue.",
    icon: <Hand className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Match Timer",
    desc: "Tracks how long each match has been running, per court.",
    icon: <Timer className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Leaderboard",
    desc: "Wins, losses, win rate, and performance rating — updated automatically.",
    icon: <Trophy className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Resting Time Tracking",
    desc: "Keeps rest time factored into every matchmaking decision, automatically.",
    icon: <Clock className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Automated Queue Fallback",
    desc: "Keeps the queue moving even when the queue master is mid-match.",
    icon: <Repeat className="w-10 h-10 text-green-500" />,
  },
];

function FeatureItem({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-4 p-4 rounded-lg hover:scale-105 transition-transform duration-300 hover:bg-white/15 text-left"
    >
      <div className="flex-shrink-0">{icon}</div>
      <h3 className="text-lg font-semibold text-black">{title}</h3>
    </button>
  );
}

function FeatureModal({feature, isOpen, onClose}: {feature: Feature; isOpen: boolean; onClose: () => void;}) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-modal-title"
        className={`relative flex flex-col items-center text-center gap-4 p-10 sm:p-20 bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-5 text-white text-2xl font-bold" onClick={onClose} aria-label="Close"> ×</button>
        <div className="mb-2 p-4 bg-black rounded-full border border-zinc-800">{feature.icon}</div>
        <div>
          <h3 id="feature-modal-title" className="text-2xl font-bold text-white mb-3 tracking-tight">
            {feature.title}
          </h3>
          <p className="text-base text-gray-400 mt-1 leading-relaxed">{feature.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (feature: Feature) => {
    setSelectedFeature(feature);
    setTimeout(() => setIsModalOpen(true), 10); // next tick so the enter transition actually fires
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFeature(null), 300); // must match duration-300 above
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("section-one")?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden scroll-smooth">

      <div className="fixed top-0 left-0 w-full h-screen -z-20">
        {images.map((img, index) => (
          <Image
            key={img.src}
            src={`/${img.src}`}
            alt={`Landing page ${index + 1}`}
            fill
            style={{ objectPosition: img.position }}
            className={`object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            priority={index === 0}
            quality={90}
            sizes="100vw"
          />
        ))}
        <div className="absolute inset-0 bg-black/85" />
      </div>


      <nav className="absolute top-0 w-full flex justify-between items-center px-8 lg:px-24 py-10 z-50 border-b border-[#008235]/50">
        <div className="font-bebas text-3xl tracking-widest text-[#F4F4F0]">SMATCH</div>
        <div className="flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
            <a href="#features" onClick={handleScroll} className="hover:text-white transition-colors hidden sm:block">
                How it works
            </a>

            <Link href="/signup" className="border border-white/20 px-8 py-3 text-white hover:bg-green-600 hover:text-white transition-all">
                Get started
            </Link>
        </div>
      </nav>

      <section id="section-one" className="relative flex flex-col justify-center min-h-screen w-full px-8 lg:px-24 pt-20">

        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden flex justify-center pointer-events-none opacity-5 select-none -z-10">
          <span className="text-[25vw] font-bebas leading-none text-white tracking-tighter">SMATCH</span>
        </div>

        <div className="max-w-5xl z-10">
          <h1 className="sm:text-[10vw] lg:text-[130px] font-medium leading-[0.85] tracking-tighter text-[#F4F4F0] mb-12">
            <span className="italic font-serif font-light pr-4 text-[6vw]">project</span> <br />
            <span className="font-bebas text-[12vw] ">SMATCH</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-12 leading-relaxed font-light">
            Smart automated queueing system designed for <span className="text-[#008235] font-bold">badminton players</span>.
          </p>

          <Link href="/signup" className="inline-flex items-center gap-4 border border-[#008235] px-8 py-4 text-[#F4F4F0] hover:bg-green-600 transition-all text-xs font-bold tracking-[0.2em] uppercase">
            Get Started <MoveRight className="w-6 h-6" />
          </Link>

        </div>

        <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 text-[10px] sm:text-xs text-gray-600 font-inter tracking-[0.2em] z-10">PHOTOS BY BWF</div>

      </section>

      {/* TODO: improve style */}
      <section id="features" className="min-h-screen w-full bg-white flex flex-col items-center text-black p-8 justify-center">
       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-center text-lg md:text-2xl leading-relaxed text-black font-semibold font-inter mb-6">
                Smatch is an automated queueing and matchmaking system specifically designed for badminton sessions. It eliminates the manual overhead of managing active courts by automatically tracking:
            </p>
            
            <ul className="text-left text-lg md:text-xl text-black font-medium space-y-3 list-disc pl-6 marker:text-green-500">
              <li>Who is next in line.</li>
              <li>Who is adequately rested.</li>
              <li>Who has already played whom.</li>
            </ul>

          </div>
          
          <div className="flex flex-col items-center justify-center gap-3">
            <h2 className="text-2xl text-green-400 uppercase font-bold">Features</h2>
            {/* line */}
            <div className="w-150 h-px bg-gray-500/40 rounded-full mt-3" />  

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
            {features.map((feature) => (
              <FeatureItem
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                onClick={() => openModal(feature)}
              />
            ))}

           </div>

        </div>

      </div>

  

        {selectedFeature && (
          <FeatureModal feature={selectedFeature} isOpen={isModalOpen} onClose={closeModal} />
        )}
      </section>

      {/* TODO: Make button dynamic by making it only appear when user is scrolling down and not positioning it statically at the bottom */}
      <a href="#section-one" onClick={handleScroll} className=" absolute bottom-6 right-6 lg:bottom-8 lg:right-8 lg:p-4 p-3 rounded-full border-[#008235] border-2 hover:-translate-y-1 cursor-pointer hover:transition-transform hover:bg-zinc-700/40">
        <ArrowUp className="text-[#008235] w-6 h-6" />
      </a>


    </main>
  );
}