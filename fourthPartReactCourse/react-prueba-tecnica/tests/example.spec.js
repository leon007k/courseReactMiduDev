// @ts-check
import { test, expect } from '@playwright/test';

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/';
const LOCALHOST_URL = 'http://localhost:5173/';

test('app shows random fact and image', async ({ page }) => {
  // * We pass the URL where the test will be executed
  await page.goto(LOCALHOST_URL);

  // * We get the HTML elements to test
  const text = await page.getByRole('paragraph');
  const image = await page.getByRole('img');
  const btn = await page.getByRole('button');

  // * We get the paragraph and url of the image to test
  const textContent = await text.textContent();
  await page.waitForTimeout(2000); // * We add the time to get the complete URL
  const imageContent = await image.getAttribute('src');

  // * We get the new text after clicking on the button 
  await btn.click();
  await page.waitForTimeout(5000);
  const newText = await page.getByRole('paragraph');
  const newtextgenerated = await newText.textContent();
  const newImage = await page.getByRole('img');
  await page.waitForTimeout(2000);
  const newImageContent = await newImage.getAttribute('src');

  // * Validate that the text is different, just like URL
  const compareText = newtextgenerated !== textContent;
  const compareUrlImage = imageContent !== newImageContent;

  // * We execute the proof of what we should contain or return our p or img
  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageContent?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy();
  await expect(compareText).toBeTruthy();
  await expect(compareUrlImage).toBeTruthy();
});
