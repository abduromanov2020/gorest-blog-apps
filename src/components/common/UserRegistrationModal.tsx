import {
  RegistrationModalProps,
  UserCredentials,
  UserRegistrationResponse,
} from '@/types/auth'
import { Form, Input, message, Modal } from 'antd'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

export default function UserRegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [form] = Form.useForm<UserCredentials>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const registerUser = async (credentials: UserCredentials) => {
    const normalizedUsername = normalizeUsername(credentials.name)

    const userData = await createUserAccount(
      normalizedUsername,
      credentials.name,
      credentials.token
    )

    storeUserSession(credentials.name, credentials.token, userData.id)
  }

  const normalizeUsername = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '.')
  }

  const createUserAccount = async (
    username: string,
    displayName: string,
    token: string
  ): Promise<UserRegistrationResponse> => {
    const { data } = await axios.post(
      'https://gorest.co.in/public/v2/users',
      {
        email: `${username}@example.com`,
        name: displayName,
        gender: 'male',
        status: 'active',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return data
  }

  const storeUserSession = (name: string, token: string, userId: string) => {
    Cookies.set('user_name', name)
    Cookies.set('gorest_token', token)
    Cookies.set('user_id', userId)
  }

  const handleRegistrationError = (error: AxiosError<any>) => {
    const errorMessage = error.response?.data?.message
    const isTokenError = errorMessage === 'Invalid token'

    message.error(isTokenError ? errorMessage : 'Username is already taken')
  }

  const handleSubmit = async (credentials: UserCredentials) => {
    setIsSubmitting(true)

    try {
      await registerUser(credentials)
      message.success('credentials have been saved')
      onClose()
    } catch (err) {
      handleRegistrationError(err as AxiosError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      title="Welcome to Blog Platform"
      open={isOpen}
      onOk={form.submit}
      onCancel={onClose}
      closable={false}
      maskClosable={false}
      confirmLoading={isSubmitting}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="GoRest API Token"
          name="token"
          rules={[{ required: true, message: 'API token is required' }]}
          extra="Token will be validated before saving"
        >
          <Input.Password placeholder="Enter your GoRest API token" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
