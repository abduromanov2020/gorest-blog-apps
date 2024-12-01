import { expect, test } from '@playwright/test';
import { setupAuth } from '../utils/test-utils';

test.describe('Pagination', () => {
    test.beforeEach(async ({ page }) => {
        await setupAuth(page);
    });

    test('should handle pagination', async ({ page }) => {
        await page.locator('[data-testid="post-card"]').first().waitFor();

        const initialTitle = await page.locator('[data-testid="post-card"]')
            .first()
            .locator('.ant-card-head-title')
            .textContent();

        await page.locator('.ant-pagination-next').click();

        await page.waitForResponse(response =>
            response.url().includes('/posts') &&
            response.url().includes('page=2')
        );

        await page.waitForLoadState('networkidle');

        const newTitle = await page.locator('[data-testid="post-card"]')
            .first()
            .locator('.ant-card-head-title')
            .textContent();

        expect(initialTitle).not.toEqual(newTitle);
    });
});