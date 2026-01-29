function finalizeIterator<T>(iterator: Iterator<T> | undefined, shouldThrow: boolean, error: unknown): void {
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