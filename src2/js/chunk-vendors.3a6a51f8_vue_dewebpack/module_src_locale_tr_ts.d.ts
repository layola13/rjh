/**
 * Turkish (Türkçe) locale configuration for Vuetify
 * Contains translations for all UI components and accessibility labels
 */

/**
 * Data iterator component locale settings
 */
interface DataIteratorLocale {
  /** Text displayed when no matching data is found */
  noResultsText: string;
  /** Text displayed while data is loading */
  loadingText: string;
}

/**
 * Aria labels for data table sorting functionality
 */
interface DataTableAriaLabel {
  /** Label for descending sort state (Z to A) */
  sortDescending: string;
  /** Label for ascending sort state (A to Z) */
  sortAscending: string;
  /** Label for unsorted state */
  sortNone: string;
  /** Label for action to remove sorting */
  activateNone: string;
  /** Label for action to sort descending */
  activateDescending: string;
  /** Label for action to sort ascending */
  activateAscending: string;
}

/**
 * Data table component locale settings
 */
interface DataTableLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by button */
  sortBy: string;
}

/**
 * Data footer (pagination footer) locale settings
 */
interface DataFooterLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Label for "show all" option */
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
   * {0} - start index, {1} - end index, {2} - total items
   */
  pageText: string;
}

/**
 * Date picker component locale settings
 */
interface DatePickerLocale {
  /** Template for selected items count. {0} - number of items */
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
 * Carousel component aria labels
 */
interface CarouselAriaLabel {
  /** 
   * Template for slide delimiter label
   * {0} - current slide, {1} - total slides
   */
  delimiter: string;
}

/**
 * Carousel component locale settings
 */
interface CarouselLocale {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Accessibility labels */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component locale settings
 */
interface CalendarLocale {
  /** Template for "show more events" text. {0} - number of additional events */
  moreEvents: string;
}

/**
 * File input component locale settings
 */
interface FileInputLocale {
  /** Template for file counter. {0} - number of files */
  counter: string;
  /** 
   * Template for file counter with size
   * {0} - number of files, {1} - total size
   */
  counterSize: string;
}

/**
 * Time picker component locale settings
 */
interface TimePickerLocale {
  /** Label for AM (ante meridiem) */
  am: string;
  /** Label for PM (post meridiem) */
  pm: string;
}

/**
 * Pagination component aria labels
 */
interface PaginationAriaLabel {
  /** Label for pagination navigation wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page link. {0} - page number */
  page: string;
  /** Template for current page indicator. {0} - page number */
  currentPage: string;
}

/**
 * Pagination component locale settings
 */
interface PaginationLocale {
  /** Accessibility labels */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating component aria labels
 */
interface RatingAriaLabel {
  /** 
   * Template for rating icon label
   * {0} - current rating, {1} - maximum rating
   */
  icon: string;
}

/**
 * Rating component locale settings
 */
interface RatingLocale {
  /** Accessibility labels */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration interface
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  /** Close button label */
  close: string;
  /** Data iterator translations */
  dataIterator: DataIteratorLocale;
  /** Data table translations */
  dataTable: DataTableLocale;
  /** Data footer translations */
  dataFooter: DataFooterLocale;
  /** Date picker translations */
  datePicker: DatePickerLocale;
  /** No data placeholder text */
  noDataText: string;
  /** Carousel translations */
  carousel: CarouselLocale;
  /** Calendar translations */
  calendar: CalendarLocale;
  /** File input translations */
  fileInput: FileInputLocale;
  /** Time picker translations */
  timePicker: TimePickerLocale;
  /** Pagination translations */
  pagination: PaginationLocale;
  /** Rating translations */
  rating: RatingLocale;
}

/**
 * Turkish locale export for Vuetify
 */
declare const turkishLocale: VuetifyLocale;

export default turkishLocale;