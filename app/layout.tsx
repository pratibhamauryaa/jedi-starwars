import './globals.css';
import { ReactNode } from 'react';
import Providers from '@/providers';

export const metadata = {
  title: 'Star Wars Fleet',
  description: 'Manage your Star Wars fleet!',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
