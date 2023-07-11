import { Button, Flex, Title } from '@mantine/core';
import { useCallback, useContext, useEffect, useState } from 'react';

import { SocketContext } from '../SocketContext';
import { SocketEvents } from '@/socket/SocketEvents';

export default function RoomList() {
  const [rooms, setRooms] = useState<string[]>([]);
  const socket = useContext(SocketContext)

  const listRooms = useCallback(() => {
    if (socket){
      socket.emit(SocketEvents.ListRooms, {}, (response : {rooms: string[]})=>{
        console.log(response)
        if (response){
          setRooms(response.rooms)
        }
      })
    }
  }, [socket])

  useEffect(()=>{
    listRooms();
  }, [listRooms]) 
  
  const refreshHandler = () => {
    listRooms();
  }

  return (
    <>
      <Title order={3}>Join a Room:</Title>
      <Flex justify="flex-start" align="center" gap="sm">
        {rooms.map((roomName) => (
          <Button key={roomName}>{roomName}</Button>
        ))}
      </Flex>
      <Button onClick={refreshHandler}>Refresh List</Button>
    </>
  );
}
