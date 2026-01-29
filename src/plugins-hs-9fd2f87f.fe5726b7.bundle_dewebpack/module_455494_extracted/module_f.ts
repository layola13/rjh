function finalizeIterator<T>(iterator: Iterator<T> | undefined, hasError: boolean, error: unknown): void {
  try {
    if (iterator && iterator.return != null) {
      iterator.return();
    }
  } finally {
    if (hasError) {
      throw error;
    }
  }
}