import { test } from '@playwright/test';
import { setupAuth } from '../utils/test-utils';

test.describe('Search', () => {
    test.beforeEach(async ({ page }) => {
        await setupAuth(page);
    });

    test('should search posts', async ({ page }) => {
        await page.locator('[data-testid="post-card"]').first().waitFor();

        const searchTerm = 'test';
        await page.getByPlaceholder('Search posts...').fill(searchTerm);

        await page.waitForResponse(response =>
            response.url().includes('/posts') &&
            response.url().includes(searchTerm)
        );

        await page.waitForLoadState('networkidle');
    });
});