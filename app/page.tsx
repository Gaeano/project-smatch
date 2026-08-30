'use client';
import Link from "next/link"; 
import {useState, useEffect} from "react";
import Image from "next/image";


export default function Home() {

  const images = [
    "landing-page1.png",
    "landing-page2.png",
    "landing-page3.jpg",
    "landing-page4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden scroll-smooth">

      {images.map((src, index) =>
       (
          <Image
            key={src}
            src={`/${src}`}
            alt={`Landing page ${index + 1}`}
            fill
            className={`absolute top-0 left-0 object-cover -z-20 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            priority={index === 0}
            quality={100}
            unoptimized={true}
          />
      ))}

      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      <h1 className="text-5xl font-black mb-6 uppercase tracking-tight text-white">Smatch</h1>
      
      {/* inganion diay pag comment HAHAHAHHAHA */}

      <div id="buttons" className="flex flex-col sm:flex-row gap-4  p-1">

        <Link href="/signup" className="px-6 py-3 bg-primary-buttons text-white font-bold rounded hover:bg-hoverButtons transition-colors">
          Get Started
        </Link>

        <Link href="#features" className=" min-h-min bg-primary-buttons px-6 py-3 text-white font-bold rounded hover:bg-hoverButtons"> Learn More</Link>

      </div>




      <div id="features" className="mt-16 max-w-4xl text-center">
        <p className="text-black"> hah </p>
    </div>

      
    </main>
    
  );
}
