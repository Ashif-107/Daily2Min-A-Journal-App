import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

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
