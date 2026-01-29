import { test, expect } from '@playwright/test';

test.describe('Sanity', () => {
  test('basic', async () => {
    expect(1 + 1).toBe(2);
  });
});
