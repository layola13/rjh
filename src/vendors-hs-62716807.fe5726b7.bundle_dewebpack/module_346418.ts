export default function logError(error: unknown, context?: unknown): void {
  try {
    if (context === undefined) {
      console.error(error);
    } else {
      console.error(error, context);
    }
  } catch (e) {
    // Silently ignore errors during error logging
  }
}