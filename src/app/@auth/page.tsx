'use client';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/app/UserProvider';

import LoginForm from './login/form';

export default function AuthPage() {
  const [isModalOpened, modalHandler] = useDisclosure(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.username) {
      modalHandler.close();
    }
  }, [user, modalHandler]);

  return (
    <>
      <Modal opened={isModalOpened} onClose={modalHandler.close} title="Login">
        <LoginForm />
      </Modal>
    </>
  );
}
