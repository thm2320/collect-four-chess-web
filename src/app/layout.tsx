import { Inter } from 'next/font/google';
import SocketProvider from '@/app/SocketProvider';
import UserProvider from './UserProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SocketProvider>
        <UserProvider>
          <body className={inter.className}>
            {auth}
            {children}
          </body>
        </UserProvider>
      </SocketProvider>
    </html>
  );
}
