import { apiGetCurrentUser } from '@/api'
import { useLoginMutation } from '@/hooks/mutation'
import { currentUserQueryKey } from '@/hooks/query/index'
import { queryClient } from '@/main'
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Center,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons'
import { FC } from 'react'
import { redirect } from 'react-router-dom'

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
  const { mutateAsync: login, loading } = useLoginMutation()

  const handleFinish = async (values: any) => {
    console.log('values', values)

    const data = await login(values)
    console.log('data', data)

    localStorage.setItem('token', data.email)
    const userInfo = await queryClient.fetchQuery(
      currentUserQueryKey,
      apiGetCurrentUser
    )

    console.log('userInfo', userInfo)

    showNotification({
      icon: <IconCheck size={18} />,
      message: '登录成功',
    })
    // redirect('/home')

    //   if (data.code === 0) {
    // } else {
    //   showNotification({
    //     color: 'red',
    //     icon: <IconX size={18} />,
    //     message: data.message,
    //   })
    // }
  }
  return (
    <Container>
      <form onSubmit={form.onSubmit(handleFinish)}>
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
        <Button type="submit" mt="sm" loading={loading}>
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default Login
