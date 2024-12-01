
import { expect, test } from '@playwright/test';
import { setupAuth } from '../utils/test-utils';

test.describe('Toggle Theme', () => {
    test.beforeEach(async ({ page }) => {
        await setupAuth(page);
    });

    test('should handle theme toggle', async ({ page }) => {
        // Wait for page to be ready
        await page.locator('[data-testid="post-card"]').first().waitFor();

        // Find and click theme toggle button
        const themeButton = page.locator('button', {
            has: page.locator('.lucide-moon, .lucide-sun')
        });
        await themeButton.click();

        // Verify theme change
        await expect(page.locator('html')).toHaveClass(/dark/);

        // Toggle back
        await themeButton.click();
        await expect(page.locator('html')).not.toHaveClass(/dark/);
    })
});