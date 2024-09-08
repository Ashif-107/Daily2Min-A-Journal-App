'use client'
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/logo.png';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Loginnav() {
  const { user } = useUser();

  return (
    <div className="flex flex-col md:flex-row justify-between w-full p-4 md:p-5 items-center">
      <div className="mb-4 md:mb-0">
        <Image
          src={logo}
          alt="logo"
          height={70} // Adjusted for better scaling on smaller screens
          width={70}
          className="md:h-[90px] md:w-[90px]" // For larger screens
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-pink-600 text-center">
        Daily2Min
      </h1>

      <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-0 gap-4 md:gap-8 items-center">
        {user ? (
          <div className="flex justify-center items-center gap-4 md:gap-8">
            <Link
              href="/home"
              className="flex items-center gap-5 self-start rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base md:px-6 md:py-3"
            >
              <span>Start Journaling</span>
            </Link>
          </div>
        ) : (
          <Link
            href="/api/auth/login"
            className="flex items-center gap-5 self-start rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base md:px-6 md:py-3"
          >
            <span>Login</span>
          </Link>
        )}

        {user && (
          <Image
            src={user.picture ?? ''}
            alt={user.name ?? 'User'}
            width={50} // Adjusted for smaller screens
            height={50}
            className="rounded-full w-[50px] h-[50px] md:w-[65px] md:h-[65px]"
          />
        )}
      </div>
    </div>
  );
}
