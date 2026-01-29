function cleanupIterator<T>(iterator: Iterator<T> | null | undefined, error: unknown, shouldThrow: boolean): void {
  try {
    if (iterator && iterator.return !== null && iterator.return !== undefined) {
      iterator.return();
    }
  } finally {
    if (shouldThrow) {
      throw error;
    }
  }
}