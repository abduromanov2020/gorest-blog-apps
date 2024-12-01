import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { setupAuth } from '../utils/test-utils';

test.describe('Create Post', () => {
    test.beforeEach(async ({ page }) => {
        await setupAuth(page);
    });

    test('should create a new post', async ({ page }) => {
        const testTitle = faker.lorem.sentence();
        const testBody = faker.lorem.paragraphs(2);

        await page.getByRole('button', { name: /create post/i }).click();
        await expect(page.getByRole('dialog')).toBeVisible();

        await page.getByLabel(/title/i).fill(testTitle);
        await page.getByLabel(/content/i).fill(testBody);
        await page.getByRole('button', { name: 'Create', exact: true }).click();

        await expect(page.getByText('Post created successfully')).toBeVisible();
        await expect(page.getByText(testTitle)).toBeVisible();
    });
});