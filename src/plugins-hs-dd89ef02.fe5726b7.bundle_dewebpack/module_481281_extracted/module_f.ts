function finalizeIterator<T>(iterator: Iterator<T> | null, hasError: boolean, error: unknown): void {
  try {
    if (iterator && iterator.return !== null && iterator.return !== undefined) {
      iterator.return();
    }
  } finally {
    if (hasError) {
      throw error;
    }
  }
}