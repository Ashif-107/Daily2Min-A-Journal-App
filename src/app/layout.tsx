import '@/app/ui/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily2Min',
  description: 'The official Daily2Min app. A app to develop journaling Habit.',
  icons: {
    icon: '/logo.png', // or .png, .svg etc.
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='bg-[#1A1A1A]'>
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
