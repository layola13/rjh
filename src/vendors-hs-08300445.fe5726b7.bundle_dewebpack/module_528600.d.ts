/**
 * Pagination locale configuration for English
 * Provides translations for pagination component UI elements
 */
interface PaginationLocale {
  /** Text displayed after the page size selector (e.g., "10 / page") */
  items_per_page: string;
  
  /** Label for the "Go to" input field */
  jump_to: string;
  
  /** Text for the confirm button when jumping to a specific page */
  jump_to_confirm: string;
  
  /** Label for "Page" text */
  page: string;
  
  /** Accessible label for the previous page button */
  prev_page: string;
  
  /** Accessible label for the next page button */
  next_page: string;
  
  /** Accessible label for the previous 5 pages button */
  prev_5: string;
  
  /** Accessible label for the next 5 pages button */
  next_5: string;
  
  /** Accessible label for the previous 3 pages button */
  prev_3: string;
  
  /** Accessible label for the next 3 pages button */
  next_3: string;
  
  /** Label for the page size selector */
  page_size: string;
}

/**
 * Default English locale configuration for pagination component
 */
declare const paginationLocale: PaginationLocale;

export default paginationLocale;