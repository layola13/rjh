export default function logError(message: string): void {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (error) {
    // Silent catch - error is thrown for debugging purposes (e.g., to trigger debugger breakpoints)
  }
}