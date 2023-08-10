'use client';

import { Group, Button, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useContext } from 'react';
import { UserContext } from '../../UserProvider';

export default function LoginForm() {
  const { setUser } = useContext(UserContext);

  const form = useForm({
    initialValues: {
      username: '',
    },
    validate: {
      username: hasLength({ min: 1 }, 'User Name is required'),
    },
  });

  const onFormSubmit = ({ username }: any) => {
    setUser({ username });
  };

  return (
    <form onSubmit={form.onSubmit(onFormSubmit)}>
      <TextInput
        withAsterisk
        label="User Name"
        placeholder="Please input your name"
        {...form.getInputProps('username')}
      />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
