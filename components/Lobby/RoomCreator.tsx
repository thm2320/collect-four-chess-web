import { Button, Group, Modal, TextInput } from '@mantine/core';
import { SocketContext } from '../SocketContext';
import { useContext } from 'react';
import { SocketEvents } from '@/socket/SocketEvents';
import { useDisclosure } from '@mantine/hooks';
import { useForm, hasLength } from '@mantine/form';
import { useRouter } from 'next/router';

export default function GameCreator() {
  const socket = useContext(SocketContext);
  const router = useRouter()
  const [isModalOpened, modalHandler] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      roomName: '',
    },
    validate: {
      roomName: hasLength({ min: 1 }, 'Room Name is required'),
    },
  });

  const createRoom = ({roomName}: any) => {
    socket?.emit(SocketEvents.OpenRoom, {
      roomName,
    }, (response: any) => {
      if (response && response.roomName === roomName){
        router.push('/gameRoom')
      }
    });
  };

  return (
    <>
      <Button onClick={modalHandler.open}>Create New Room</Button>
      <Modal
        opened={isModalOpened}
        onClose={modalHandler.close}
        title="Create New Room"
      >
        <form onSubmit={form.onSubmit(createRoom)}>
          <TextInput
            withAsterisk
            label="Room Name"
            placeholder="New Room Name"
            {...form.getInputProps('roomName')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
