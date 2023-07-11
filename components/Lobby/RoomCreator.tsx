import { Button, Container, Text } from '@mantine/core';
import RoomList from './RoomList';
import { SocketContext } from '../SocketContext';
import { useContext  } from 'react';
import { SocketEvents } from '@/socket/SocketEvents';

export default function GameCreator() {
  const socket = useContext(SocketContext);
  
  const openRoomHandler = () => {
    socket?.emit(SocketEvents.OpenRoom, {
      roomName: `Room-by-${new Date().toUTCString()}`,
    });
  };

  return (
      <Button onClick={openRoomHandler}>Create New Room</Button>
  );
}
