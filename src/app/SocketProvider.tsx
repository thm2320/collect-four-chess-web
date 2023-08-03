'use client';

import { createContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '@/socket';

export const SocketContext = createContext<Socket>(socket);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
