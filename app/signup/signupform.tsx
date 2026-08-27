"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form className='flex flex-col w-full'>
            <button type="button" className='w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-2 focus:outline-offset-2 transition-colors bg-[#FDFDFD]'>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                Sign in with Google
            </button>

            <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-xs text-gray-400 bg-white">or sign up with email</span>
                <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <div className='flex gap-4 mb-4'>
                {/* first name*/}
                <div className='flex flex-col gap-1.5 w-1/2'>
                    <label htmlFor='firstName' className='text-xs font-semibold text-gray-700'>First Name</label>
                    <input type='text' id='firstName' placeholder='e.g. Juan'
                    className='p-2.5 bg-[#F9F9F8] border border-gray-200 rounded-md text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all'
                    />

                </div>

                {/* lname*/}
                <div className='flex flex-col gap-1.5 w-1/2'>
                    <label htmlFor='lastName' className='text-xs font-semibold text-gray-700'>Last Name</label>
                    <input type='text' id='lastName' placeholder='e.g. Dela Cruz'
                    className='p-2.5 bg-[#F9F9F8] border border-gray-200 rounded-md text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all'
                    />
                </div>
            </div>

            {/* email*/}
            <div className='flex flex-col gap-1.5 mb-4'>
                <label htmlFor='email' className='text-xs font-semibold text-gray-700'>Email</label>
                <input type='text' id='email' placeholder='e.g. you@email.com'
                className='p-2.5 bg-[#F9F9F8] border border-gray-200 rounded-md text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all'
                />
            </div>

            {/* pass*/}
            <div className='flex flex-col gap-1.5 mb-4 relative'>
                <label htmlFor='password' className='text-xs font-semibold text-gray-700'>Password</label>
                <input type={showPassword ? "text" : "password"} id='password' placeholder='At least 8 characters'
                className='p-2.5 pr-10 bg-[#F9F9F8] border border-gray-200 rounded-md text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all'
                />
                <button type='button' onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className='absolute right-3 top-[38px] text-gray-400 hover:text-gray-600'>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>

            {/* confirm pass*/}
            <div className='flex flex-col gap-1.5 mb-4 relative'>
                <label htmlFor='confirmPassword' className='text-xs font-semibold text-gray-700'>Confirm Password</label>
                <input type={showConfirmPassword ? "text" : "password"} id='confirmPassword' placeholder='Re-enter your password'
                className='p-2.5 pr-10 bg-[#F9F9F8] border border-gray-200 rounded-md text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition-all'
                />
                <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} className='absolute right-3 top-[38px] text-gray-400 hover:text-gray-600'>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>

            {/* terms*/}
            <div className='flex items-start gap-2 mb-6'>
                <input type='checkbox' id='terms' className='mt-1 w-4 h-4 text-green-700 border-gray-300 rounded focus:ring-green-700'
                />
                <label htmlFor='terms' className='flex text-center text-xs leading-relaxed'>
                    I agree to Smatch&apos;s Terms and <a href="#" className="text-green-700 font-medium">Terms of Service</a> and <a href="#" className="text-green-700 font-medium">Privacy Policy</a>.
                </label>
            </div>

            <button type='submit' className='w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-black font-bold py-3 rounded-md transition-colors'>
                <Check size={18} strokeWidth={3} />
                Create account
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account? <a href="/login" className="font-bold text-green-700 hover:underline">Sign in instead</a>
            </p>
        </form>
    )
}
