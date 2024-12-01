import { expect, test } from '@playwright/test'
import { setupAuth } from '../utils/test-utils'

test.describe('Post List', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('should load the initial page with posts', async ({ page }) => {
    await expect(
      page.locator('[data-testid="post-card"]').first()
    ).toBeVisible()
    await expect(page.getByPlaceholder('Search posts...')).toBeVisible()
    await expect(
      page.getByRole('button', { name: /create post/i })
    ).toBeVisible()
  })
})
