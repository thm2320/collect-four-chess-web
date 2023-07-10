import { Button, Container } from '@mantine/core';
import RoomList from './RoomList';

export default function Lobby() {
  return (
    <Container>
      <Button>Open new Room</Button>
      <RoomList rooms={['Room-1', 'Room-2', 'Room-3']}></RoomList>
    </Container>
  );
}
