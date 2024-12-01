import axios from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://gorest.co.in/public/v2',
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('gorest_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('gorest_token')
      Cookies.remove('user_name')
      Cookies.remove('user_id')
      Router.reload()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
