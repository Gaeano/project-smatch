"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className='flex flex-col w-full'>
            <button type="button" className='w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-2 focus:outline-offset-2 transition-colors bg-[#FDFDFD]'>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                Continue with Google
            </button>

            <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-xs text-gray-400 bg-white">or sign in with email</span>
                <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* email*/}
            <div className='flex flex-col gap-1.5 mb-4'>
                <label htmlFor='email' className='text-xs font-semibold text-gray-700'>Email</label>
                <input type='text' id='email' placeholder='you@email.com'
                className='p-2.5 bg-[#F9F9F8] border border-gray-200 rounded-md text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all'
                />
            </div>

            {/* pass*/}
            <div className='flex flex-col gap-1.5 mb-4 relative'>
                <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-xs font-semibold text-gray-700">Password</label>
                    <Link href="/forgot-password" className="text-xs font-medium text-teal-700 hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <input type={showPassword ? "text" : "password"} id='password' placeholder='••••••••'
                className='p-2.5 pr-10 bg-[#F9F9F8] border border-gray-200 rounded-md text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all'
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className='absolute right-3 top-[38px] text-gray-400 hover:text-gray-600'>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>

            {/* terms*/}
            <div className='flex items-start gap-2 mb-6'>
                <input type='checkbox' id='terms' className='mt-1 w-4 h-4 accent-green-600 text-green-700 border-gray-300 rounded focus:ring-green-700 cursor-pointer'
                />
                <label htmlFor='terms' className='text-xs leading-relaxed'>
                    Keep me signed in
                </label>
            </div>

            <button type='submit' className='w-full flex items-center justify-center gap-2 bg-primary-buttons hover:bg-hoverButtons text-white font-bold py-3 rounded-md transition-colors'>
                <ArrowRight size={18} strokeWidth={3} />
                Sign in
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
                Don&apos;t have an account? <a href="/signup" className="font-bold text-green-700 hover:underline">Create one free</a>
            </p>
        </form>
    )
}
