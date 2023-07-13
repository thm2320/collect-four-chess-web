import { Button } from '@mantine/core';
import { GameBoard } from '../../components/GameRoom/GameBoard';
import { SocketContext } from '../../components/SocketContext';
import { useContext } from 'react';
import { SocketEvents } from '@/socket/SocketEvents';
import { useRouter } from 'next/router';

export default function GameRoom() {
  const socket = useContext(SocketContext);
  const router = useRouter();

  const leaveRoomHandler = () => {
    if (socket && socket.connected) {
      const { roomName } = router.query;
      socket.emit(SocketEvents.LeaveRoom, { roomName }, () => {
        router.back();
      });
    }
  };

  return (
    <>
      <GameBoard />
      <Button onClick={leaveRoomHandler}>Leave</Button>
    </>
  );
}
