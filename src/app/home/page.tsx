/* eslint-disable react/no-unescaped-entities */
'use client'

import Link from "next/link";
import { ChangeEvent, useState, FormEvent, useEffect, useCallback } from "react";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import StreakPortion from "../ui/StreakPortion";

export default withPageAuthRequired(function Page() {
    const [entry, setEntry] = useState('');
    const { user, isLoading } = useUser();
    const [streak, setStreak] = useState<number | null>(null);
    const [longestStreak, setLongestStreak] = useState<number | null>(null);
    const [loadingStreak, setLoadingStreak] = useState(true);
    const [entryMadeToday, setEntryMadeToday] = useState<boolean | null>(null);
    const [streakError, setStreakError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);



    useEffect(() => {
        if (user && !isLoading) {
            // Call your API route to create or update the user
            fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('User created or updated:', data);

                })

                .catch(error => {
                    console.error('Error:', error);
                    setStreakError('Failed to fetch streak information');
                    setLoadingStreak(false);
                });

        }
    }, [user, isLoading]);



    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!entry.trim()) {
            alert("Journal entry cannot be empty!");
            return;
        }

        setIsSaving(true);

        console.log('Auth0 User ID:', user?.sub);
        console.log('Submitting entry:', entry);

        try {
            const response = await fetch('/api/journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: entry,
                    auth0UserId: user?.sub, // Send the Auth0 user ID
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to save the journal entry");
            }

            const data = await response.json();
            console.log('Journal saved:', data);
            // Add user feedback here (e.g., success message)

            // Update streak after saving journal entry
            const streakResponse = await fetch('/api/streak', { method: 'POST' });
            if (!streakResponse.ok) {
                throw new Error('Failed to update streak');
            }
            const streakData = await streakResponse.json();
            setStreak(streakData.currentStreak);
            setLongestStreak(streakData.longestStreak);
            setEntryMadeToday(streakData.entryMadeToday);

            setEntry(""); // Clear the input field after saving
            setEntryMadeToday(true);

        } catch (error) {
            console.error('Error saving journal:', error);
            alert(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsSaving(false);
        }
    };


    if (isLoading) return <div>Loading...</div>;


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
            <div className="flex flex-col-reverse md:flex-row justify-between">
                <div className="writing_field mb-8 md:mb-0 md:mr-8 md:flex-[3.5] w-full">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={isSaving ? "Saving..." : entry}
                            onChange={handleChange}
                            placeholder={isSaving ? 'Saving...' : "Write your journal entry here..."}
                            rows={15}
                            className="w-full p-4 text-lg border border-gray-300 rounded-md bg-transparent text-white"
                            disabled={isSaving}
                        />
                        <br />
                        <button
                            type="submit"
                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-pink-600 transition-colors"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Entry'}
                        </button>
                    </form>
                </div>
                <div className="streak_part flex-1 mb-10 p-6 md:flex-[1.5] bg-[#282828] rounded-md text-white">
                    <StreakPortion />
                </div>
            </div>
        </div>
    );
}
)