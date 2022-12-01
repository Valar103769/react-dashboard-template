import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Center,
} from '@mantine/core'
import { $fetch } from 'ohmyfetch'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons'
import { FC } from 'react'
import apiFetch from '@/api'

const Login: FC = () => {
  const form = useForm({
    initialValues: { name: '', email: '' },
    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
    validateInputOnChange: true,
  })

  const handleLogin = async (values: any) => {
    console.log('values', values)

    const data = await apiFetch('/profile', {
      method: 'POST',
      headers: {
        contentType: 'application/json',
      },
      body: {
        values,
      },
    })
    console.log('data', data)

    localStorage.setItem('token', JSON.stringify('2133'))

    showNotification({
      icon: <IconCheck size={18} />,
      message: '登录成功',
    })
    location.replace('/')
  }
  return (
    <Container>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          mt="sm"
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default Login
