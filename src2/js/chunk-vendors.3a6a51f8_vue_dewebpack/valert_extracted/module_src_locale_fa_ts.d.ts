/**
 * Persian (Farsi) locale configuration for Vuetify
 * @module locale/fa
 */

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Label for descending sort state */
  sortDescending: string;
  /** Label for ascending sort state */
  sortAscending: string;
  /** Label for no sort state */
  sortNone: string;
  /** Label for deactivating sort */
  activateNone: string;
  /** Label for activating descending sort */
  activateDescending: string;
  /** Label for activating ascending sort */
  activateAscending: string;
}

/**
 * Data table localization configuration
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by label */
  sortBy: string;
}

/**
 * Data iterator localization configuration
 */
interface DataIterator {
  /** Text shown when no results are found */
  noResultsText: string;
  /** Text shown during data loading */
  loadingText: string;
}

/**
 * Data footer pagination configuration
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for showing all items option */
  itemsPerPageAll: string;
  /** Text for next page button */
  nextPage: string;
  /** Text for previous page button */
  prevPage: string;
  /** Text for first page button */
  firstPage: string;
  /** Text for last page button */
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
  /** Aria label for next month button */
  nextMonthAriaLabel: string;
  /** Aria label for next year button */
  nextYearAriaLabel: string;
  /** Aria label for previous month button */
  prevMonthAriaLabel: string;
  /** Aria label for previous year button */
  prevYearAriaLabel: string;
}

/**
 * Aria label configuration for carousel navigation
 */
interface CarouselAriaLabel {
  /** Template text for slide delimiter. Placeholders: {0} current, {1} total */
  delimiter: string;
}

/**
 * Carousel localization configuration
 */
interface Carousel {
  /** Text for previous slide button */
  prev: string;
  /** Text for next slide button */
  next: string;
  /** Aria labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization configuration
 */
interface Calendar {
  /** Template text for showing more events. Placeholder: {0} count */
  moreEvents: string;
}

/**
 * File input localization configuration
 */
interface FileInput {
  /** Template text for file counter. Placeholder: {0} count */
  counter: string;
  /** Template text for file counter with size. Placeholders: {0} count, {1} total size */
  counterSize: string;
}

/**
 * Time picker localization configuration
 */
interface TimePicker {
  /** Text for AM (ante meridiem) */
  am: string;
  /** Text for PM (post meridiem) */
  pm: string;
}

/**
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Aria label for pagination wrapper */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /** Template aria label for page button. Placeholder: {0} page number */
  page: string;
  /** Template aria label for current page. Placeholder: {0} page number */
  currentPage: string;
}

/**
 * Pagination localization configuration
 */
interface Pagination {
  /** Aria labels for pagination controls */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template aria label for rating icon. Placeholders: {0} current rating, {1} max rating */
  icon: string;
}

/**
 * Rating component localization configuration
 */
interface Rating {
  /** Aria labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Persian (Farsi) locale definition for Vuetify components
 */
interface PersianLocale {
  /** Badge component label */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator component localization */
  dataIterator: DataIterator;
  /** Data table component localization */
  dataTable: DataTable;
  /** Data footer component localization */
  dataFooter: DataFooter;
  /** Date picker component localization */
  datePicker: DatePicker;
  /** Text shown when no data is available */
  noDataText: string;
  /** Carousel component localization */
  carousel: Carousel;
  /** Calendar component localization */
  calendar: Calendar;
  /** File input component localization */
  fileInput: FileInput;
  /** Time picker component localization */
  timePicker: TimePicker;
  /** Pagination component localization */
  pagination: Pagination;
  /** Rating component localization */
  rating: Rating;
}

/**
 * Default export: Persian (Farsi) locale configuration
 */
declare const persianLocale: PersianLocale;

export default persianLocale;