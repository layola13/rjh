/**
 * Italian (it) locale configuration for Vuetify
 * Provides translations and localized text for Vuetify components
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
  /** Label for action to activate descending sort */
  activateDescending: string;
  /** Label for action to activate ascending sort */
  activateAscending: string;
}

/**
 * Data table localization configuration
 */
interface DataTable {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Aria label configurations for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Text label for sort by column */
  sortBy: string;
}

/**
 * Data iterator localization configuration
 */
interface DataIterator {
  /** Text shown when no results are found */
  noResultsText: string;
  /** Text shown during loading state */
  loadingText: string;
}

/**
 * Data footer (pagination) localization configuration
 */
interface DataFooter {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Text label for "all items" option */
  itemsPerPageAll: string;
  /** Text label for next page button */
  nextPage: string;
  /** Text label for previous page button */
  prevPage: string;
  /** Text label for first page button */
  firstPage: string;
  /** Text label for last page button */
  lastPage: string;
  /** Template text for page range display. Placeholders: {0} start, {1} end, {2} total */
  pageText: string;
}

/**
 * Date picker localization configuration
 */
interface DatePicker {
  /** Template text for selected items count. Placeholder: {0} count */
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
  /** Template text for slide position. Placeholders: {0} current, {1} total */
  delimiter: string;
}

/**
 * Carousel localization configuration
 */
interface Carousel {
  /** Text label for previous slide button */
  prev: string;
  /** Text label for next slide button */
  next: string;
  /** Aria label configurations */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization configuration
 */
interface Calendar {
  /** Template text for additional events count. Placeholder: {0} count */
  moreEvents: string;
}

/**
 * File input localization configuration
 */
interface FileInput {
  /** Template text for file count. Placeholder: {0} count */
  counter: string;
  /** Template text for file count with size. Placeholders: {0} count, {1} total size */
  counterSize: string;
}

/**
 * Time picker localization configuration
 */
interface TimePicker {
  /** Text label for AM period */
  am: string;
  /** Text label for PM period */
  pm: string;
}

/**
 * Aria label configuration for pagination navigation
 */
interface PaginationAriaLabel {
  /** Aria label for pagination wrapper */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /** Template text for page navigation. Placeholder: {0} page number */
  page: string;
  /** Template text for current page indicator. Placeholder: {0} page number */
  currentPage: string;
}

/**
 * Pagination localization configuration
 */
interface Pagination {
  /** Aria label configurations */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template text for rating value. Placeholders: {0} current rating, {1} max rating */
  icon: string;
}

/**
 * Rating component localization configuration
 */
interface Rating {
  /** Aria label configurations */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Italian locale configuration for Vuetify
 */
interface ItalianLocale {
  /** Badge component text */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator translations */
  dataIterator: DataIterator;
  /** Data table translations */
  dataTable: DataTable;
  /** Data footer/pagination translations */
  dataFooter: DataFooter;
  /** Date picker translations */
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
 * Default export: Italian locale configuration object
 */
declare const italianLocale: ItalianLocale;
export default italianLocale;