function getDescription<T extends { description: string }>(item: T): string {
  return item.description;
}

export { getDescription };