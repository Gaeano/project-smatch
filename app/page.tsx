'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Brain, Users, Trophy, Clock, Repeat, ArrowUp, MoveRight, X, Plus, Minus } from "lucide-react";

type Feature = { title: string; desc: string; icon: React.ReactNode, span?: string; highlight?: boolean; };

const images = [
  { src: "landing-page1.png", position: "60% 40%" },
  { src: "landing-page2.png", position: "20% 45%" },
  { src: "landing-page3.jpg", position: "45% 65%" },
  { src: "landing-page4.jpg", position: "32% 80%" },
];

const features: Feature[] = [
  {
    title: "Smart Matchmaking",
    desc: "Auto-generates balanced matches using skill tiers, rest times, and match history, with full manual override support when needed.",
    icon: <Brain className="w-10 h-10 text-white  " />,
    span: "col-span-1 md:col-span-2 lg:col-span-2",
    highlight: true, 
  },
  {
    title: "Player Registry",
    desc: "Add players to your roster once and pull them into any future session instantly.",
    icon: <Users className="w-10 h-10 text-green-500" />,
    span: "col-span-1",
  },
  {
    title: "Leaderboard",
    desc: "Wins, losses, win rate, and performance rating — updated automatically.",
    icon: <Trophy className="w-10 h-10 text-green-500" />,
    span: "col-span-1",
  },
  {
    title: "Resting Time Tracking",
    desc: "Keeps rest time factored into every matchmaking decision, automatically.",
    icon: <Clock className="w-10 h-10 text-green-500" />,
    span: "col-span-1",
  },
  {
    title: "Automated Queue Fallback",
    desc: "Keeps the queue moving even when the queue master is mid-match.",
    icon: <Repeat className="w-10 h-10 text-green-500" />,
    span: "col-span-1 md:col-span-2 lg:col-span-1",
  },
];

const steps = [
  {
    num: "1",
    title: "Create Your Account",
    desc: "Sign up in minutes with a simple process and secure verification."
  },
  {
    num: "2",
    title: "Add Players to Your Registry",
    desc: "Add players once and pull them into any future session instantly."
  },
  {
    num: "3",
    title: "Run Your First Session",
    desc: "Create a queue, add players, and let Smatch handle the rest."
  }
];

const faqs = [
  {
    question: "How does the smart matchmaking work?",
    answer: "Smatch uses a dynamic Matchmaking Rating (MMR) algorithm to pair/match up players. It continuously evaluates win/loss ratios, performance ratings, score differentials, total games played, and more to ensure balanced and competitive matchups."
  },
  {
    question: "Do all players need to create an account?",
    answer: "No. Only the queue master needs an account. You can register guest players in your registry and pull them into any session.",
  },
  {
    question: "Can I manually bypass the automated queue?",
    answer: "Yes. The queue master has full control to manually select players and assign them to specific matchups/pairings at any time."
  },
  {
    question: "Is the app free to use?",
    answer: "Yes, Smatch is completely free. No credit card needed. Perfect for managing your queue sessions."
  },
];

function FeatureItem({ icon, title, desc, span, highlight, onClick }: { icon: React.ReactNode; title: string; desc: string; span: string; highlight: boolean; onClick: () => void }) {
  return (
    <div
      key={title}
      onClick={onClick}
      className={`${span || "col-span-1"} rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 border ${
        highlight 
          ? "bg-gradient-to-br from-green-400 to-black border-green-500 shadow-xl" 
          : "bg-[#141414] border-zinc-800 hover:border-zinc-700 text-white"
      }`}
    >
      <div className="mb-12 p-3 w-fit rounded-xl bg-black/10 backdrop-blur-md border border-white/10">
        {icon}
      </div>
      <div>
        <h3 className={'text-2xl font-bold mb-3 tracking-tight text-white'}>
          {title}
        </h3>
        <p className={'text-sm leading-relaxed text-gray-400'}>
          {desc}
        </p>
      </div>
    </div>
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
        <button className="absolute top-5 right-5 text-white text-2xl font-bold" onClick={onClose} aria-label="Close"> <X className="w-6 h-6" /> </button>
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

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-white/10">
      <button className="w-full py-6 flex justify-between items-center text-left focus:outline-none group" onClick={onClick}>

        <span className="text-lg font-medium text-white group-hover:text-green-400 transition-colors">
          {question}
        </span>

        <div className="relative w-5 h-5 flex-shrink-0 flex items-center justify-center">
          <Plus 
            className={`absolute w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0 scale-50 text-white' : 'rotate-0 opacity-100 scale-100 text-gray-400 group-hover:text-white'}`} 
          />
          <Minus 
            className={`absolute w-5 h-5 transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'rotate-0 opacity-100 scale-100 text-white' 
                : '-rotate-90 opacity-0 scale-50 text-gray-400'
            }`} 
          />
        </div>

      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-gray-400 text-sm leading-relaxed pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const openModal = (feature: Feature) => {
    setSelectedFeature(feature);
    setTimeout(() => setIsModalOpen(true), 10); // next tick so the enter transition actually fires
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFeature(null), 300); // must match duration-300 above
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <a href="#features" onClick={(e) => {
                e.preventDefault();
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }} className="hover:text-white transition-colors hidden sm:block">
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


      <section id="features" className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-8 lg:p-24 relative z-10 border-t border-white/10">
       <div className="max-w-7xl w-full flex flex-col items-center">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-bebas tracking-wider mb-4 text-green-600">
                BUILT FOR SPEED & CONTROL
            </h2>
            
            <p className="font-inter text-gray-400 text-xl max-w-2xl leading-relaxed font-light">
              Leave the excel. Automate the queue, balance the matchups, and track player stats in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {features.map((feature) => (
              <FeatureItem
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                span={feature.span ?? "col-span-1"}
                highlight={feature.highlight ?? false}
                onClick={() => openModal(feature)}
              />
            ))}
            
            {selectedFeature && (
          <FeatureModal feature={selectedFeature} isOpen={isModalOpen} onClose={closeModal} />
        )}
          </div>

        </div>

      </section>

      <section id="setup" className=" w-full bg-[#141414] flex flex-col items-center justify-center p-8 lg:p-24 relative z-10">
       <div className="max-w-7xl w-full flex flex-col items-center">

          <div className="text-center mb-16">
            <div className="text-5xl mb-4 text-green-600">
                <span className="italic font-serif font-light text-white">why </span> <span className="font-bebas text-7xl tracking-wider">SMATCH?</span>
            </div>
            
            <p className="font-inter text-gray-400 text-xl max-w-2xl leading-relaxed font-light">
              From account creation to daily use, get started quickly and manage your queues with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
            {steps.map((step, index) => (
              <div key={step.num} className={`flex flex-col pr-8 lg:pr-12 ${
                index !== steps.length - 1 ? 'md:border-r md:border-white/10' : 'md:pl-12'
              } ${index === 1 ? 'md:pl-12' : ''}`}
            >
                <div className="relative mb-8 w-fit">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#D9F86C] blur-[24px] opacity-30 rounded-full z-0"></div>
                
                  <div className="relative z-10 w-12 h-12 bg-gradient-to-b from-[#008235] to-[#FBF5DD] rounded-xl flex items-center justify-center text-black font-bold text-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]">
                    {step.num}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight"> 
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </section>

      <section id="faq" className="w-full bg-[#141414] flex flex-row items-center justify-center p-8 lg:p-24 relative z-10">
        <div className="max-w-7xl w-full px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-5 flex flex-col">
              <h2 className="text-4xl text-white md:text-5xl font-bold mb-6 tracking-tight font-inter">
                Frequently Asked <br /> Questions
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                Quick answers to common questions about using the app to manage your queues.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="border-t border-white/10 w-full"></div>

              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>

        </div>
      </section>

      {/* FOOOOTERR NALANG */}

      <a 
        href="#section-one" 
        onClick={scrollToTop} 
        className={`group fixed bottom-6 right-6 lg:bottom-8 lg:right-8 lg:p-4 p-3 rounded-full border-[#008235] border-2 cursor-pointer hover:bg-[#008235] hover:text-white z-50 transition-all duration-300 ${
          showScrollTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp className="text-[#008235] w-6 h-6 group-hover:text-white transition-all duration-300" />
      </a>

    </main>
  );
}