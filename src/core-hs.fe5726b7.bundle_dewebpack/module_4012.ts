type Result<T> = 
  | { error: false; value: T }
  | { error: true; value: unknown };

export default function tryCatch<T>(fn: () => T): Result<T> {
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