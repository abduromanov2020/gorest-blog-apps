import { Page } from '@playwright/test'

export const TEST_TOKEN =
  'e6d45f44c47816780f59965b58927a4188c97c9b8c3fc4a4d6bc6f17fca34262'
export const TEST_NAME = `Test User ${Date.now()}`
export const TEST_USER_ID = '7552089'

export async function setupAuth(page: Page) {
  await page.context().addCookies([
    {
      name: 'user_name',
      value: TEST_NAME,
      domain: 'localhost',
      path: '/',
    },
    {
      name: 'gorest_token',
      value: TEST_TOKEN,
      domain: 'localhost',
      path: '/',
    },
    {
      name: 'user_id',
      value: TEST_USER_ID,
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.goto('/')
  await page.waitForLoadState('networkidle')
}
