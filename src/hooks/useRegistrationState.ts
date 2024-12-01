import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const useRegistrationState = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const token = Cookies.get('gorest_token')
    const userName = Cookies.get('user_name')
    if (!token || !userName) {
      setShowModal(true)
    }
  }, [])

  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  return { showModal, closeModal, openModal }
}
