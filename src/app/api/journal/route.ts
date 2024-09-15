import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { getSession } from '@auth0/nextjs-auth0';


const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { content, auth0UserId } = await request.json();
    console.log("Received request:", { content, auth0UserId });

    // Validate input
    if (!content || !auth0UserId) {
      console.log("Validation failed: missing content or auth0UserId");
      return NextResponse.json({ error: 'Content and auth0UserId are required' }, { status: 400 });
    }

    // Find the user by Auth0 ID
    const user = await prisma.user.findUnique({
      where: { auth0Id: auth0UserId },
    });

    if (!user) {
      console.log(`User not found for Auth0 ID: ${auth0UserId}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create journal entry using the database user ID
    console.log("Attempting to create journal entry...");
    const journal = await prisma.journal.create({
      data: {
        content,
        userId: user.id, // Use the database ID, not the Auth0 ID
      },
    });

    console.log("Journal entry created successfully:", journal);
    return NextResponse.json(journal, { status: 200 });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json({ error: 'Failed to save the journal entry' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest) {
  try {
    // Retrieve the session
    const session = await getSession();

    // If no session, return unauthorized
    if (!session || !session.user) {
      console.log('Unauthorized: No session or user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the user’s ID from the session
    const auth0Id = session.user.sub; // Adjust according to how you store the user ID
    console.log('User ID:', auth0Id);

    const user = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id,
      },
    });

    if (!user) {
      console.log('User not found in the database for Auth0 ID:', auth0Id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch journals for the logged-in user based on their unique ID
    const journals = await prisma.journal.findMany({
      where: {
        userId: user.id, // Filter by the user's unique ID
      },
      orderBy: {
        createdAt: 'desc', // Display latest journals on top
      },
    });

    console.log('Fetched journals:', JSON.stringify(journals, null, 2));

    if (journals.length === 0) {
      return NextResponse.json({ message: 'No Journals found' }, { status: 404 });
    }

    return NextResponse.json(journals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 }); 
  }
}