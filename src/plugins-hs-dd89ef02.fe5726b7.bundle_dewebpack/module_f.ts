function cleanupIterator<T>(iterator: Iterator<T> | null | undefined, shouldThrow: boolean, error: unknown): void {
  try {
    if (iterator && iterator.return != null) {
      iterator.return();
    }
  } finally {
    if (shouldThrow) {
      throw error;
    }
  }
}