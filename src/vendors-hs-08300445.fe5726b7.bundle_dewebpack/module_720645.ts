export default function logError(errorMessage: string): void {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(errorMessage);
  }
  
  try {
    throw new Error(errorMessage);
  } catch (error) {
    // Intentionally empty - error is thrown to trigger debugger breakpoints
  }
}