/**
 * Page module - handles page-related options and updates
 * @module module_page
 */

/**
 * Options object containing page configuration
 */
interface PageOptions {
  /**
   * Page identifier or page number
   */
  page: number | string;
  [key: string]: unknown;
}

/**
 * Updates the current options with new page configuration
 * @param page - The page identifier or page number to set
 */
declare function updateOptions(options: Partial<PageOptions>): void;

/**
 * Main page update function
 * Sets the current page by updating options
 * @param page - The page identifier or page number
 */
declare function setPage(page: number | string): void;