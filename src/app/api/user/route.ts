import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import prisma from '../../../../lib/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getSession(req as any, res as any);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { sub, name, email } = session.user;

  try {
    let user = await prisma.user.findUnique({
      where: { auth0Id: sub! },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: sub!,
          name: name || '',
          email: email || '',
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}