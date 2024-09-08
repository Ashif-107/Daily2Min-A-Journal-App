/* eslint-disable react/no-unescaped-entities */
'use client'

import Link from "next/link";
import { ChangeEvent, useState, FormEvent } from "react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Page() {
    const [entry, setEntry] = useState('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle the submission, like saving the entry to a database
        console.log('Journal Entry:', entry);
    };

    return (
        <div className="p-4 md:p-8">
            <div className="mb-6">
                <h1 className="text-red-500 text-3xl mb-8 font-extrabold">Welcome to Your Daily Journal</h1>
                <p className="text-xl text-white text-justify md:text-1xl lg:text-1xl md:leading lg:leading-relaxed">
                    Kickstart your journaling habit with our simple & effective approach. With the help of the
                    <strong className="text-red-500"> 2-Mins Rule from James Clear's Atomic Habits, </strong><br />
                    Wonder How will This Help You ?<br></br>
                    <Link
                        href="/home/about"
                        className="inline-flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-400 md:text-base mt-2"
                    >
                        <span>Learn..</span>
                    </Link>
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="writing_field mb-8 md:mb-0 md:mr-8 md:flex-[3.5] w-full">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={entry}
                            onChange={handleChange}
                            placeholder="Write your journal entry here..."
                            rows={15}
                            className="w-full p-4 text-lg border border-gray-300 rounded-md bg-transparent text-white"
                        />
                        <br />
                        <button
                            type="submit"
                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-pink-600 transition-colors"
                        >
                            Save Entry
                        </button>
                    </form>
                </div>
                <div className="streak_part flex-1 p-6 md:flex-[1.5] bg-[#282828] rounded-md text-white">
                    <h2 className="text-xl font-bold mb-4">Keep The Streak Alive</h2>
                    <p>Streak: 5 days</p>
                    <p>Longest Streak: 10 days</p>
                    {/* Add more streak-related information here */}
                </div>
            </div>
        </div>
    );
}
)