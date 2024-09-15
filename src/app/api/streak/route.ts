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

    // Find user by Auth0 ID
    const user = await prisma.user.findUnique({
      where: { auth0Id: sub! },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const lastJournalDate = user.lastJournalDate;
    let currentStreak = user.streakCount;

    // Calculate current streak
    if (lastJournalDate) {
      const today = new Date();
      const lastDate = new Date(lastJournalDate);
      const diffDays = Math.ceil((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak += 1; // Continue streak
      } else if (diffDays > 1) {
        currentStreak = 1; // Reset streak if more than 1 day gap
      }
    }

    // Update streak in database
    await prisma.user.update({
      where: { id: user.id },
      data: { streakCount: currentStreak, lastJournalDate: new Date() },
    });

    return NextResponse.json({ currentStreak });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
