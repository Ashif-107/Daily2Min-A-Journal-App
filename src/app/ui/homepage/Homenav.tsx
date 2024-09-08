/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/logo-white.png'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Homenav() {
  const { user, error, isLoading } = useUser();
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;


  return (
     user && (<div className="flex justify-between w-full p-5 items-center">
      <div>
      <Image
          src={logo}
          alt='logo'
          height={65}
          width={65}
          className='color-white'
        /> 
      </div>
      <h1 className="text-3xl font-bold text-pink-600">Daily2Min</h1>
      <div className="flex justify-between mt-4 gap-8 items-center">
        <Link
          href="/home"
          className="flex items-center gap-5 self-start rounded-lg text-pink-500 p-3 text-sm font-medium  transition-colors hover:text-blue-400 md:text-base"
        >
          <span>Home</span>
        </Link>
        <Link
          href="/myjournals"
          className="flex items-center gap-5 self-start rounded-lg text-pink-500 p-3 text-sm font-medium  transition-colors hover:text-blue-400 md:text-base"
        >
          <span>My Journals</span>
        </Link>
        <Link
          href="/progress"
          className="flex items-center gap-5 self-start rounded-lg text-pink-500 p-3 text-sm font-medium  transition-colors hover:text-blue-400 md:text-base"
        >
          <span>Check Progress</span>
        </Link>
        <a href="/api/auth/logout"
          className="flex items-center gap-5 self-start rounded-lg text-pink-500 p-3 text-sm font-medium  transition-colors hover:text-blue-400 md:text-base"
        >Logout</a>
        <img src={user.picture ?? ''} alt={user.name ?? 'User'} 
          className='rounded-full items-center w-[65px]'
        />
      </div>
    </div>)
  );
}
