/**
 * Modal configuration options
 */
export interface ModalOptions {
  /** Whether to use black theme for the modal */
  isBlack?: boolean;
  /** Modal size type */
  type?: 'small' | 'large' | 'medium';
}

/**
 * Sortable item with order property
 */
export interface SortableItem {
  /** Sort order value (lower numbers appear first) */
  order: number;
  [key: string]: unknown;
}

/**
 * Generates modal CSS class string based on base class and options
 * @param baseClass - Base CSS class name
 * @param options - Modal configuration options
 * @returns Complete CSS class string with modifiers
 */
export function getModalClass(baseClass: string, options: ModalOptions): string;

/**
 * Formats a date into a string representation
 * @param date - Date to format (Date object or timestamp)
 * @param includeTime - Whether to include hours and minutes in output (default: true)
 * @returns Formatted date string in format "YYYY-MM-DD" or "YYYY-MM-DD HH:mm"
 */
export function getTime(date: Date | number, includeTime?: boolean): string;

/**
 * Sorts an array of items by their order property using insertion sort algorithm
 * @param items - Array of sortable items to sort in-place
 * @returns The sorted array (same reference, mutated)
 */
export function insertSort<T extends SortableItem>(items: T[]): T[];