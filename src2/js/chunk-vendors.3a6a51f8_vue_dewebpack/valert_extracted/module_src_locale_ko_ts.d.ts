/**
 * Korean (ko) locale configuration for Vuetify components
 * 
 * This module provides Korean translations for all Vuetify UI component labels,
 * aria-labels, and user-facing text strings.
 * 
 * @module locale/ko
 */

/**
 * Badge component translations
 */
interface BadgeLocale {
  /** Badge label text */
  badge: string;
}

/**
 * Close action translations
 */
interface CloseLocale {
  /** Close button text */
  close: string;
}

/**
 * Data iterator component translations
 */
interface DataIteratorLocale {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed while data is loading */
  loadingText: string;
}

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Aria label for descending sort state */
  sortDescending: string;
  /** Aria label for ascending sort state */
  sortAscending: string;
  /** Aria label for unsorted state */
  sortNone: string;
  /** Aria label for action to remove sorting */
  activateNone: string;
  /** Aria label for action to sort descending */
  activateDescending: string;
  /** Aria label for action to sort ascending */
  activateAscending: string;
}

/**
 * Data table component translations
 */
interface DataTableLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for table sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by functionality */
  sortBy: string;
}

/**
 * Data footer/pagination component translations
 */
interface DataFooterLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Label for "all items" option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /**
   * Template for page range text
   * @param {0} - Start index
   * @param {1} - End index
   * @param {2} - Total count
   */
  pageText: string;
}

/**
 * Date picker component translations
 */
interface DatePickerLocale {
  /**
   * Template for selected items count
   * @param {0} - Number of selected items
   */
  itemsSelected: string;
  /** Aria label for next month navigation */
  nextMonthAriaLabel: string;
  /** Aria label for next year navigation */
  nextYearAriaLabel: string;
  /** Aria label for previous month navigation */
  prevMonthAriaLabel: string;
  /** Aria label for previous year navigation */
  prevYearAriaLabel: string;
}

/**
 * No data state translations
 */
interface NoDataLocale {
  /** Text displayed when no data is available */
  noDataText: string;
}

/**
 * Aria label configuration for carousel component
 */
interface CarouselAriaLabel {
  /**
   * Template for carousel slide position
   * @param {0} - Current slide number
   * @param {1} - Total slides count
   */
  delimiter: string;
}

/**
 * Carousel component translations
 */
interface CarouselLocale {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Accessibility labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component translations
 */
interface CalendarLocale {
  /**
   * Template for "more events" link text
   * @param {0} - Number of additional events
   */
  moreEvents: string;
}

/**
 * File input component translations
 */
interface FileInputLocale {
  /**
   * Template for file count
   * @param {0} - Number of files
   */
  counter: string;
  /**
   * Template for file count with total size
   * @param {0} - Number of files
   * @param {1} - Total size formatted string
   */
  counterSize: string;
}

/**
 * Time picker component translations
 */
interface TimePickerLocale {
  /** Label for AM (ante meridiem) */
  am: string;
  /** Label for PM (post meridiem) */
  pm: string;
}

/**
 * Aria label configuration for pagination component
 */
interface PaginationAriaLabel {
  /** Aria label for pagination wrapper/navigation */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /**
   * Template for page navigation link
   * @param {0} - Target page number
   */
  page: string;
  /**
   * Template for current page indicator
   * @param {0} - Current page number
   */
  currentPage: string;
}

/**
 * Pagination component translations
 */
interface PaginationLocale {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /**
   * Template for rating value
   * @param {0} - Current rating value
   * @param {1} - Maximum rating value
   */
  icon: string;
}

/**
 * Rating component translations
 */
interface RatingLocale {
  /** Accessibility labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Korean locale configuration interface
 * 
 * Contains all translation strings and templates for Vuetify components
 */
interface KoreanLocale extends BadgeLocale, CloseLocale, NoDataLocale {
  /** Data iterator component translations */
  dataIterator: DataIteratorLocale;
  /** Data table component translations */
  dataTable: DataTableLocale;
  /** Data footer/pagination translations */
  dataFooter: DataFooterLocale;
  /** Date picker component translations */
  datePicker: DatePickerLocale;
  /** Carousel component translations */
  carousel: CarouselLocale;
  /** Calendar component translations */
  calendar: CalendarLocale;
  /** File input component translations */
  fileInput: FileInputLocale;
  /** Time picker component translations */
  timePicker: TimePickerLocale;
  /** Pagination component translations */
  pagination: PaginationLocale;
  /** Rating component translations */
  rating: RatingLocale;
}

/**
 * Korean locale configuration object
 */
declare const koreanLocale: KoreanLocale;

export default koreanLocale;