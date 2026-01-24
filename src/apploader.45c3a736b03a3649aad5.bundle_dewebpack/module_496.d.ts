/**
 * Displays a browser compatibility warning message
 * @param message - The warning message to display to the user
 * @param additionalClassName - Optional CSS class name to append to the wrapper element
 */
declare function displayBrowserWarning(
  message: string,
  additionalClassName?: string
): void;

export default displayBrowserWarning;