function cleanupIterator<T>(
  iterator: Iterator<T> | null | undefined,
  shouldThrow: boolean,
  error: unknown
): void {
  try {
    if (iterator?.return) {
      iterator.return();
    }
  } finally {
    if (shouldThrow) {
      throw error;
    }
  }
}