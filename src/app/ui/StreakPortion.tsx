import { useUser } from "@auth0/nextjs-auth0/client";
import { useCallback, useEffect, useState } from "react";


export default function StreakPortion() {

    const { user, isLoading } = useUser();
    const [streak, setStreak] = useState<number | null>(null);
    const [longestStreak, setLongestStreak] = useState<number | null>(null);
    const [loadingStreak, setLoadingStreak] = useState(true);
    const [entryMadeToday, setEntryMadeToday] = useState<boolean | null>(null);
    const [streakError, setStreakError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStreakData = async () => {
            try {
                const response = await fetch('/api/streak');
                if (!response.ok) {
                    throw new Error('Failed to fetch streak data');
                }
                const data = await response.json();
                setStreak(data.currentStreak);
                setLongestStreak(data.longestStreak);
                setEntryMadeToday(data.entryMadeToday);
                setLoadingStreak(false);
            } catch (error) {
                console.error('Error fetching streak:', error);
                setStreakError('Failed to fetch streak information');
                setLoadingStreak(false);
            }
        };

        if (user && !isLoading) {
            fetchStreakData();
        }
    }, [user, isLoading]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-8 text-orange-500 text-center">Keep The Streak Alive</h2>
            {streakError ? (
                <p className="text-red-500">{streakError}</p>
            ) : (
                <div className="text-[1.1rem]">
                    <p className="mb-3 text-blue-400">Current Streak: <strong className="text-white">{streak !== null ? streak : 'Loading...'}</strong> Days</p>
                    <p className="mb-3 text-green-300">Longest Streak: <strong className="text-white"> {longestStreak !== null ? longestStreak : 'Loading...'}</strong>  Days</p>
                    <p className="mb-3 text-purple-400 font-bold">
                        {entryMadeToday === null ? 'Loading...' :
                            entryMadeToday ? "You've made an entry today. Great job!" :
                                "You haven't made an entry today yet. Keep the streak going!"}
                    </p>
                </div>
            )}
            {/* Add more streak-related information here */}
        </div>

    )
}