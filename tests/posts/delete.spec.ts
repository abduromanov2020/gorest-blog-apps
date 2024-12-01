import test, { expect } from '@playwright/test'
import { setupAuth } from '../utils/test-utils'

test.describe('Delete Post', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('should delete a post', async ({ page }) => {
    // Wait for the first post and get its title
    const firstPost = page.locator('[data-testid="post-card"]').first()
    await firstPost.waitFor()

    const titleElement = firstPost.locator('.ant-card-head-title')
    const firstPostTitle = await titleElement.textContent()

    // Delete post
    await firstPost.getByRole('button', { name: 'Delete' }).click()
    await page.getByRole('button', { name: 'OK' }).click()

    // Verify deletion
    await expect(page.getByText('Post deleted successfully')).toBeVisible()
    if (firstPostTitle) {
      await expect(page.getByText(firstPostTitle)).not.toBeVisible()
    }
  })
})
