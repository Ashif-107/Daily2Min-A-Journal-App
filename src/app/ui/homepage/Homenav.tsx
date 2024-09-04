import Link from 'next/link';

export default function Homenav() {
    return (
      <div className="flex justify-between w-full p-5 items-center">
        <div></div>
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
          <div className='text-pink-700 text-3xl bg-blue-400 p-3 w-[3rem] h-[3rem] rounded-full flex justify-center items-center'>
            A
          </div>
        </div>
      </div>
    );
  }
  