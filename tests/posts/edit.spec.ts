import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'
import { setupAuth } from '../utils/test-utils'

test.describe('Edit Post', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page)
  })

  test('should edit an existing post', async ({ page }) => {
    const updatedTitle = faker.lorem.sentence()
    const updatedBody = faker.lorem.paragraphs(2)

    // Wait for posts to be visible and click edit
    await page.locator('[data-testid="post-card"]').first().waitFor()
    await page.getByRole('button', { name: 'Edit' }).first().click()

    // Update content
    await page.getByLabel(/title/i).fill(updatedTitle)
    await page.getByLabel(/content/i).fill(updatedBody)
    await page.getByRole('button', { name: 'Save' }).click()

    // Verify update
    await expect(page.getByText('Post updated successfully')).toBeVisible()
    await expect(page.getByText(updatedTitle)).toBeVisible()
  })
})
