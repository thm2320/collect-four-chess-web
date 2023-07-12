import { Button, Container, Text } from '@mantine/core';
import RoomList from './RoomList';
import { SocketContext } from '../SocketContext';
import { useContext, useEffect, useState } from 'react';
import GameCreator from './RoomCreator';
import Link from 'next/link';


export default function Lobby() {
  const socket = useContext(SocketContext);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    if (socket) {
      setPlayerName(socket.id);
    }
  }, [socket]);

  return (
    <Container>
      <Text>Hi {playerName}</Text>
      <GameCreator/>
      <Link href='gameRoom'>
        gameRoom
      </Link>
      <RoomList/>
    </Container>
  );
}
