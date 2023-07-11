import Lobby from '../components/Lobby';
import { socket } from '../src/socket';
import { SocketContext } from '../components/SocketContext';

export default function Home() {
  return (
    <SocketContext.Provider value={socket}>
      <Lobby />
    </SocketContext.Provider>
  );
}
