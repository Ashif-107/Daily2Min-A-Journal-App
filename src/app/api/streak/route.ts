// pages/api/streak.ts
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const { sub } = session.user;
        
        const user = await prisma.user.findUnique({
            where: { auth0Id: sub! },
        });
        
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastEntry = user.lastJournalDate ? new Date(user.lastJournalDate) : null;
        const entryMadeToday = lastEntry && lastEntry >= today;
        
        return NextResponse.json({
            currentStreak: user.streakCount,
            longestStreak: user.longestStreak,
            entryMadeToday: entryMadeToday
        });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const { sub } = session.user;
        
        const user = await prisma.user.findUnique({
            where: { auth0Id: sub! },
        });
        
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const lastJournalDate = user.lastJournalDate;
        let currentStreak = user.streakCount;
        let longestStreak = user.longestStreak;

        const now = new Date();


        if (lastJournalDate) {
            const lastDate = new Date(lastJournalDate);
            
            // Calculate the difference in days
            const diffTime = now.getTime() - lastDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
              
            if (diffDays === 0) {
                // Same day, do nothing
            } else if (diffDays === 1 || (diffDays === 2 && now.getHours() < 24)) {
                // Next day or before midnight of the day after, increment streak
                currentStreak += 1;
                longestStreak = Math.max(longestStreak, currentStreak);
            } else {
                // More than one day has passed, reset streak
                currentStreak = 1;
            }
        } else {
            currentStreak = 1;
            longestStreak = 1;  // First journal entry
        }

        // Update streak in database
        await prisma.user.update({
            where: { id: user.id },
            data: { 
                streakCount: currentStreak, 
                lastJournalDate: now,
                longestStreak: longestStreak,
            },
        });

        return NextResponse.json({ currentStreak , longestStreak });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
    }
}