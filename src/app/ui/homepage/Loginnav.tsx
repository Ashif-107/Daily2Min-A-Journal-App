import Link from 'next/link';

export default function Loginnav() {
    return (
      <div className="flex justify-between w-full p-5 items-center">
        <h1 className="text-3xl font-bold text-pink-600">Daily2Min</h1>
        <div className="flex justify-between mt-4 gap-8">
        <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-pink-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </Link>
        <Link
            href="/signup"
            className="flex items-center gap-5 self-start rounded-lg bg-pink-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    );
  }
  