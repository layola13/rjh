/**
 * Pagination locale configuration interface for English (en_US)
 * Defines labels and messages used in pagination components
 */
export interface PaginationLocale {
  /**
   * Label suffix for items per page selector
   * @example "10 / page"
   */
  items_per_page: string;

  /**
   * Label for the "jump to page" input field
   */
  jump_to: string;

  /**
   * Label for the confirm button when jumping to a specific page
   */
  jump_to_confirm: string;

  /**
   * Label for the page indicator
   */
  page: string;

  /**
   * Accessible label for the "previous page" button
   */
  prev_page: string;

  /**
   * Accessible label for the "next page" button
   */
  next_page: string;

  /**
   * Accessible label for the "previous 5 pages" button
   */
  prev_5: string;

  /**
   * Accessible label for the "next 5 pages" button
   */
  next_5: string;

  /**
   * Accessible label for the "previous 3 pages" button
   */
  prev_3: string;

  /**
   * Accessible label for the "next 3 pages" button
   */
  next_3: string;

  /**
   * Label for the page size selector
   */
  page_size: string;
}

/**
 * Default English locale configuration for pagination component
 */
declare const paginationLocale: PaginationLocale;

export default paginationLocale;