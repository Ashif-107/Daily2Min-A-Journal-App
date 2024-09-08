'use client'
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/logo.png'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Loginnav() {
  const { user } = useUser();
  return (
    <div className="flex justify-between w-full p-5 items-center">
      <Image
        src={logo}
        alt='logo'
        height={90}
        width={90}
      />
      <h1 className="text-3xl font-bold text-pink-600">Daily2Min</h1>
      <div className="flex justify-between mt-4 gap-8">
        {user ? (<Link
          href="/home"
          className="flex items-center gap-5 self-start rounded-lg bg-pink-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Start Journaling</span>
        </Link>) : (
          <Link
          href="/api/auth/login"
          className="flex items-center gap-5 self-start rounded-lg bg-pink-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Login</span>
        </Link>
        )}
      </div>
    </div>
  );
}
