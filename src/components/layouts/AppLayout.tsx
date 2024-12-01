import { Button, Layout } from 'antd'
import Cookies from 'js-cookie'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import WelcomeDialog from '../common/UserRegistrationModal'

const { Header, Content } = Layout

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const userName = Cookies.get('user_name')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Layout className="min-h-screen">
      <Header className="px-4 flex items-center justify-between bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-4 justify-between">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Blog Posts
          </h1>

          <div className="flex items-center gap-2">
            {userName ? (
              <p className="text-gray-600 dark:text-gray-300">
                Welcome, {userName}
              </p>
            ) : (
              <Button type="primary" onClick={() => setShowWelcome(true)}>
                Sign In
              </Button>
            )}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer transition-all border-0"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-gray-100" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </Header>
      <Content className="p-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">{children}</div>
      </Content>
      <WelcomeDialog
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
      />
    </Layout>
  )
}
