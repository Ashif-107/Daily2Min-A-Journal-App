/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/logo-white.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing hamburger and close icons

export default function Homenav() {
  const { user, error, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false); // State for sidebar visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="flex justify-between w-full p-5 items-center">
        {/* Logo and Site Title */}
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            height={50}
            width={50}
            className="color-white"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-pink-600 ml-3">
            Daily2Min
          </h1>
        </div>

        {/* Hamburger Menu */}
        <button className="text-pink-500 md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>

        {/* Sidebar (only visible on mobile, hidden on larger screens) */}
        <div
          className={`fixed top-0 right-0 h-full w-[250px] bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
        >
          <div className="p-4 flex flex-col h-full">
            <button className="text-pink-500 mb-4" onClick={toggleMenu}>
              <FaTimes size={30} />
            </button>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/home"
                className="text-lg font-medium text-white hover:text-blue-400"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/home/myjournals"
                className="text-lg font-medium text-white hover:text-blue-400"
                onClick={toggleMenu}
              >
                My Journals
              </Link>
              <Link
                href="/home/progress"
                className="text-lg font-medium text-white hover:text-blue-400"
                onClick={toggleMenu}
              >
                Check Progress
              </Link>
              <a
                href="/api/auth/logout"
                className="text-lg font-medium text-white hover:text-blue-400"
                onClick={toggleMenu}
              >
                Logout
              </a>
            </nav>
            <div className="mt-auto">
              <img
                src={user.picture ?? ''}
                alt={user.name ?? 'User'}
                className="rounded-full w-[50px] mb-4"
              />
            </div>
          </div>
        </div>

        {/* Regular Navbar for Desktop */}
        <div className="hidden md:flex justify-between gap-8 items-center">
          <Link
            href="/home"
            className="text-pink-500 text-base font-medium transition-colors hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/home/myjournals"
            className="text-pink-500 text-base font-medium transition-colors hover:text-blue-400"
          >
            My Journals
          </Link>
          <Link
            href="/home/progress"
            className="text-pink-500 text-base font-medium transition-colors hover:text-blue-400"
          >
            Check Progress
          </Link>
          <a
            href="/api/auth/logout"
            className="text-pink-500 text-base font-medium transition-colors hover:text-blue-400"
          >
            Logout
          </a>
          <img
            src={user.picture ?? ''}
            alt={user.name ?? 'User'}
            className="rounded-full w-[45px] md:w-[65px]"
          />
        </div>
      </div>
    )
  );
}
