async function modulePre(element: unknown): Promise<boolean> {
  await element.next();
  await delay(10);
  return true;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}