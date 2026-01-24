/**
 * Romanian (ro) locale configuration for Vuetify
 * Provides translations and localized text for all Vuetify components
 */

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Label for descending sort state */
  sortDescending: string;
  /** Label for ascending sort state */
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
 * Data table component localization
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by functionality */
  sortBy: string;
}

/**
 * Data iterator component localization
 */
interface DataIterator {
  /** Text shown when no results match the search */
  noResultsText: string;
  /** Text shown while loading items */
  loadingText: string;
}

/**
 * Data footer (pagination) component localization
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all items" option */
  itemsPerPageAll: string;
  /** Text for next page button */
  nextPage: string;
  /** Text for previous page button */
  prevPage: string;
  /** Text for first page button */
  firstPage: string;
  /** Text for last page button */
  lastPage: string;
  /** Template text for page range display (e.g., "1-10 of 100") */
  pageText: string;
}

/**
 * Date picker component localization
 */
interface DatePicker {
  /** Text showing number of selected items */
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
 * Aria label configuration for carousel navigation
 */
interface CarouselAriaLabel {
  /** Template for slide position announcement (e.g., "Carousel slide 1 of 5") */
  delimiter: string;
}

/**
 * Carousel component localization
 */
interface Carousel {
  /** Text for previous slide button */
  prev: string;
  /** Text for next slide button */
  next: string;
  /** Accessibility labels */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component localization
 */
interface Calendar {
  /** Text showing additional events count */
  moreEvents: string;
}

/**
 * File input component localization
 */
interface FileInput {
  /** Text showing number of files selected */
  counter: string;
  /** Text showing number of files and total size */
  counterSize: string;
}

/**
 * Time picker component localization
 */
interface TimePicker {
  /** AM period label */
  am: string;
  /** PM period label */
  pm: string;
}

/**
 * Aria label configuration for pagination navigation
 */
interface PaginationAriaLabel {
  /** Label for pagination navigation wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page button label */
  page: string;
  /** Template for current page announcement */
  currentPage: string;
}

/**
 * Pagination component localization
 */
interface Pagination {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating value announcement (e.g., "Rating 4 of 5") */
  icon: string;
}

/**
 * Rating component localization
 */
interface Rating {
  /** Accessibility labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Romanian locale configuration for Vuetify
 */
export interface RomanianLocale {
  /** Badge component label */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer/pagination translations */
  dataFooter: DataFooter;
  /** Date picker component translations */
  datePicker: DatePicker;
  /** Text shown when no data is available */
  noDataText: string;
  /** Carousel component translations */
  carousel: Carousel;
  /** Calendar component translations */
  calendar: Calendar;
  /** File input component translations */
  fileInput: FileInput;
  /** Time picker component translations */
  timePicker: TimePicker;
  /** Pagination component translations */
  pagination: Pagination;
  /** Rating component translations */
  rating: Rating;
}

/**
 * Romanian locale object
 */
declare const romanianLocale: RomanianLocale;

export default romanianLocale;