function finalizeIteration<T>(
  iterator: Iterator<T> | null,
  shouldThrow: boolean,
  error: Error | null
): void {
  try {
    if (iterator?.return) {
      iterator.return();
    }
  } finally {
    if (shouldThrow && error) {
      throw error;
    }
  }
}