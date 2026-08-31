
'use client';
import {Menu, X} from "lucide-react";
import {useState, useEffect} from "react";
import Link from "next/link";

function HamburgerMenu({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    return (

    <div className={`fixed inset-y-0 right-0 h-screen w-full md:w-64 lg:w-64 bg-white z-50 p-8 shadow-xl transition-transform duration-300 ease-in-out transform flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <menu className="flex flex-col gap-4 p-10 text-black items-center h-full text-2xl font-semibold">
             
            <Link href="/" className=" hover:text-white transition-colors">Home</Link>
            <Link href="/signup" className=" hover:text-white transition-colors">Queues</Link>
            <Link href="/login" className=" hover:text-white transition-colors">Settings</Link>
            <Link href="/login" className=" hover:text-white transition-colors">Log out</Link>

             <button onClick={onClose} className="absolute bottom-52 text-gray-400 hover:text-white hover:bg-zinc-800 p-2 rounded-full transition-colors ">
                <X size={32} />
            </button>
        </menu>
    </div>

    

    );
}

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openSidebar = () => {
        setIsMenuOpen(true);
    }

    const closeSidebar = () => {
        setIsMenuOpen(false);
    }
    

  return (
    <nav className="bg-navbarBackground p-4 w-full flex items-center justify-between">

        <p className="text-white text-2xl font-bold font-bebas">SMATCH</p>

        <Menu className="text-white cursor-pointer" size={24} onClick={() => openSidebar()} />

        <HamburgerMenu isOpen={isMenuOpen} onClose={closeSidebar} />

    </nav>
    );  
}

