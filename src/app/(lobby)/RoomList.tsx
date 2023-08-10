import { Button, Flex, Title } from '@mantine/core';
import { useCallback, useContext, useEffect, useState } from 'react';

import { SocketContext } from '@/app/SocketProvider';
import { CustomRoomEvent } from '@/socket/SocketEvent';
import { useRouter } from 'next/navigation';

export default function RoomList() {
  const [rooms, setRooms] = useState<string[]>([]);
  const socket = useContext(SocketContext);
  const router = useRouter();

  const listRooms = useCallback(() => {
    if (socket) {
      socket.emit(
        CustomRoomEvent.ListRooms,
        {},
        (response: { rooms: string[] }) => {
          console.log(response);
          if (response) {
            setRooms(response.rooms);
          }
        }
      );
    }
  }, [socket]);

  const roomButtonHandler = (roomName: string) => {
    socket?.emit(
      CustomRoomEvent.JoinRoom,
      {
        roomName,
      },
      (response: any) => {
        if (response && response.roomName === roomName) {
          router.push(`/gameRooms/${roomName}`);
        }
      }
    );
  };

  useEffect(() => {
    listRooms();
  }, [listRooms]);

  const refreshHandler = () => {
    listRooms();
  };

  return (
    <>
      <Title order={3}>Join a Room:</Title>
      <Flex justify="flex-start" align="center" gap="sm">
        {rooms.map((roomName) => (
          <Button key={roomName} onClick={() => roomButtonHandler(roomName)}>
            {roomName}
          </Button>
        ))}
      </Flex>
      <Button onClick={refreshHandler}>Refresh List</Button>
    </>
  );
}
