'use client';

import { Container, Text } from '@mantine/core';
import RoomList from './RoomList';
import GameCreator from './RoomCreator';
import { UserContext } from '../UserProvider';
import { useContext } from 'react';

export default function Lobby() {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Text>Hi {user?.username}</Text>
      <GameCreator />
      <RoomList />
    </Container>
  );
}
