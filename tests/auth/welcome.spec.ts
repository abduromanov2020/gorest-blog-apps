// tests/auth/welcome.spec.ts
import { expect, test } from '@playwright/test';
import { TEST_NAME, TEST_TOKEN } from '../utils/test-utils';

test.describe('Welcome Dialog', () => {
    test('should show and handle welcome dialog', async ({ page, context }) => {
        await context.clearCookies();
        await page.goto('/');

        const welcomeDialog = page.getByRole('dialog');
        await expect(welcomeDialog).toBeVisible();

        await page.getByLabel('Your Name').fill(TEST_NAME);
        await page.getByLabel(/GoRest API Token/i).fill(TEST_TOKEN);
        await page.getByRole('button', { name: 'OK' }).click();

        await expect(page.getByText(/credentials have been saved/i)).toBeVisible();
    });
});