import { Button, Flex, Title } from '@mantine/core';

interface RoomListProp {
  rooms: string[];
}

export default function RoomList({ rooms }: RoomListProp) {
  return (
    <>
      <Title order={3}>Join a Room:</Title>
      <Flex justify='flex-start' align='center' gap='sm'>
        {rooms.map((roomName) => (
          <Button key={roomName}>{roomName}</Button>
        ))}
      </Flex>
    </>
  );
}
