import { test, expect } from '@playwright/test';

test.describe('Dynamic Theme System', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5173');
    // Wait for the theme switcher to be visible
    await page.waitForSelector('.theme-switcher');
  });

  test('should have dark theme as default', async ({ page }) => {
    // Check that the default theme is applied
    const dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBe('dark');
    
    // Verify dark theme colors are applied
    const headerBg = await page.locator('header').evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    // Should be dark (neutral-900 equivalent: rgb(23, 23, 23))
    expect(headerBg).toBe('rgb(23, 23, 23)');
  });

  test('should switch themes when clicking theme switcher', async ({ page }) => {
    const themeSwitcher = page.locator('.theme-switcher button');
    
    // Open theme switcher dropdown
    await themeSwitcher.click();
    
    // Wait for dropdown to appear
    await page.waitForSelector('.theme-switcher div[role="menu"], .theme-switcher > div > div');
    
    // Click on light theme
    await page.locator('button', { hasText: 'Clair' }).click();
    
    // Wait for theme change
    await page.waitForTimeout(100);
    
    // Check that light theme is applied
    const dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBe('light');
    
    // Verify light theme colors are applied
    const headerBg = await page.locator('header').evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    // Should be white (rgb(255, 255, 255))
    expect(headerBg).toBe('rgb(255, 255, 255)');
  });

  test('should persist theme selection after page refresh', async ({ page }) => {
    const themeSwitcher = page.locator('.theme-switcher button');
    
    // Switch to cyberpunk theme
    await themeSwitcher.click();
    await page.waitForSelector('.theme-switcher div[role="menu"], .theme-switcher > div > div');
    await page.locator('button', { hasText: 'Cyberpunk' }).click();
    
    // Wait for theme change
    await page.waitForTimeout(100);
    
    // Verify cyberpunk theme is applied
    let dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBe('cyberpunk');
    
    // Refresh the page
    await page.reload();
    
    // Wait for page to load
    await page.waitForSelector('.theme-switcher');
    
    // Verify theme persisted
    dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBe('cyberpunk');
    
    // Verify cyberpunk theme colors are applied
    const headerBg = await page.locator('header').evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    // Should be deep purple (rgb(15, 0, 30))
    expect(headerBg).toBe('rgb(15, 0, 30)');
  });

  test('should display correct theme icons and labels', async ({ page }) => {
    const themeSwitcher = page.locator('.theme-switcher button');
    
    // Check default theme icon (dark theme - moon)
    const defaultIcon = await themeSwitcher.locator('span').first().textContent();
    expect(defaultIcon).toBe('🌙');
    
    // Open dropdown
    await themeSwitcher.click();
    await page.waitForSelector('.theme-switcher div[role="menu"], .theme-switcher > div > div');
    
    // Check all theme options are present
    await expect(page.locator('button', { hasText: 'Sombre' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Clair' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Cyberpunk' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Rétro' })).toBeVisible();
    
    // Switch to light theme and check icon changes
    await page.locator('button', { hasText: 'Clair' }).click();
    await page.waitForTimeout(100);
    
    const lightIcon = await page.locator('.theme-switcher button span').first().textContent();
    expect(lightIcon).toBe('☀️');
  });

  test('should apply theme colors to all elements', async ({ page }) => {
    // Test light theme colors
    const themeSwitcher = page.locator('.theme-switcher button');
    await themeSwitcher.click();
    await page.waitForSelector('.theme-switcher div[role="menu"], .theme-switcher > div > div');
    await page.locator('button', { hasText: 'Clair' }).click();
    await page.waitForTimeout(100);
    
    // Check main content background
    const mainBg = await page.locator('main').evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    expect(mainBg).toBe('rgb(255, 255, 255)');
    
    // Check footer background
    const footerBg = await page.locator('footer').evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    expect(footerBg).toBe('rgb(255, 255, 255)');
  });

  test('should handle theme switcher dropdown correctly', async ({ page }) => {
    const themeSwitcher = page.locator('.theme-switcher button');
    const dropdown = page.locator('.theme-switcher > div > div');
    
    // Initially dropdown should be hidden
    await expect(dropdown).not.toBeVisible();
    
    // Click to open dropdown
    await themeSwitcher.click();
    await expect(dropdown).toBeVisible();
    
    // Click outside to close dropdown
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await page.waitForTimeout(100);
    await expect(dropdown).not.toBeVisible();
  });

  test('should show checkmark for current theme', async ({ page }) => {
    const themeSwitcher = page.locator('.theme-switcher button');
    
    // Open dropdown
    await themeSwitcher.click();
    await page.waitForSelector('.theme-switcher div[role="menu"], .theme-switcher > div > div');
    
    // Check that dark theme (default) has checkmark
    const darkThemeButton = page.locator('button', { hasText: 'Sombre' });
    await expect(darkThemeButton.locator('span', { hasText: '✓' })).toBeVisible();
    
    // Switch to retro theme
    await page.locator('button', { hasText: 'Rétro' }).click();
    await page.waitForTimeout(100);
    
    // Open dropdown again
    await themeSwitcher.click();
    await page.waitForSelector('.theme-switcher div[role="menu"], .theme-switcher > div > div');
    
    // Check that retro theme now has checkmark
    const retroThemeButton = page.locator('button', { hasText: 'Rétro' });
    await expect(retroThemeButton.locator('span', { hasText: '✓' })).toBeVisible();
    
    // Check that dark theme no longer has checkmark
    await expect(darkThemeButton.locator('span', { hasText: '✓' })).not.toBeVisible();
  });

  test('should work on mobile layout', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Theme switcher should be visible in mobile layout
    const themeSwitcher = page.locator('.theme-switcher button');
    await expect(themeSwitcher).toBeVisible();
    
    // Test theme switching on mobile
    await themeSwitcher.click();
    await page.waitForSelector('.theme-switcher div[role="menu"], .theme-switcher > div > div');
    await page.locator('button', { hasText: 'Cyberpunk' }).click();
    
    // Verify theme applied
    const dataTheme = await page.locator('html').getAttribute('data-theme');
    expect(dataTheme).toBe('cyberpunk');
  });
});