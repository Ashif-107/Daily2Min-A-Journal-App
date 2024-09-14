'use client'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
interface Journal {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
    user: {
        id: string;
        auth0Id: string;
        streakCount: number;
        lastJournalDate: string | null;
    };
}

export default withPageAuthRequired(function Page() {

    const [journals, setJournals] = useState<Journal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchJournals() {
          try {
            const response = await fetch('/api/journal');
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Failed to fetch journals: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            if (Array.isArray(data)) {
              setJournals(data);
            } else if (data.message) {
              setError(data.message);
            }
          } catch (error) {
            console.error('Error fetching journals:', error);
            setError((error as Error).message);
          } finally {
            setLoading(false);
          }
        }
        fetchJournals();
      }, []);

    if (loading) return <p className='text-white'>Loading...</p>;
    if (error) return <p className='text-white'>Error: {error}</p>;

    return (
        <div className='p-4 md:p-6 flex flex-col min-h-screen'>
            <h1 className='text-3xl md:text-5xl text-center text-red-500 font-bold mb-10'>My Journals</h1>
            <div className='flex-grow'>

            {journals.length === 0 ? (
                <p className='text-white'>No journals found.</p>
            ) : (
                <ul className='text-white text-xl md:text-2xl'>
                    {journals.map((journal) => (
                        <li key={journal.id} className="border p-4 mb-4 rounded-lg shadow-md">
                            <p className='py-2'><strong className='text-pink-500 mr-4'>Content:</strong> {journal.content}</p>
                            <p className='py-2'><strong className='text-pink-500 mr-4'>Date:</strong> {new Date(journal.createdAt).toLocaleDateString()}</p>
                            {/* Display additional user information if needed */}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    )


})