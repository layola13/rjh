export function tryCatch<T>(fn: () => T): { error: false; value: T } | { error: true; value: unknown } {
  try {
    return {
      error: false,
      value: fn()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
}