import type { AppProps } from 'next/app';
import { socket } from '../src/socket';
import { SocketContext } from '../components/SocketContext';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, [])
  return (
    <SocketContext.Provider value={socket}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
}
