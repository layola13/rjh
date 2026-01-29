export default function logError(message: unknown, details?: unknown): void {
  try {
    if (arguments.length === 1) {
      console.error(message);
    } else {
      console.error(message, details);
    }
  } catch (error) {
    // Silently catch errors during logging
  }
}