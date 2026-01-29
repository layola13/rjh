function handleIteratorCleanup<T>(
  iterator: Iterator<T> | null | undefined,
  hasError: boolean,
  error: unknown
): void {
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