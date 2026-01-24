/**
 * Czech (cs) locale configuration for Vuetify
 * Contains translations and localized strings for all Vuetify components
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
  /** Label for action to disable sorting */
  activateNone: string;
  /** Label for action to activate descending sort */
  activateDescending: string;
  /** Label for action to activate ascending sort */
  activateAscending: string;
}

/**
 * Data table component translations
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria label configurations */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by label */
  sortBy: string;
}

/**
 * Data iterator component translations
 */
interface DataIterator {
  /** Text shown when no results are found */
  noResultsText: string;
  /** Text shown while loading items */
  loadingText: string;
}

/**
 * Data footer/pagination component translations
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all" option */
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
 * Date picker component translations
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
 * Aria label configuration for carousel
 */
interface CarouselAriaLabel {
  /** Template text for slide indicator. Placeholders: {0} current slide, {1} total slides */
  delimiter: string;
}

/**
 * Carousel component translations
 */
interface Carousel {
  /** Text for previous slide button */
  prev: string;
  /** Text for next slide button */
  next: string;
  /** Aria label configurations */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component translations
 */
interface Calendar {
  /** Template text for additional events. Placeholder: {0} count */
  moreEvents: string;
}

/**
 * File input component translations
 */
interface FileInput {
  /** Template text for file count. Placeholder: {0} count */
  counter: string;
  /** Template text for file count with size. Placeholders: {0} count, {1} total size */
  counterSize: string;
}

/**
 * Time picker component translations
 */
interface TimePicker {
  /** Text for AM period */
  am: string;
  /** Text for PM period */
  pm: string;
}

/**
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Label for pagination wrapper element */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template label for page button. Placeholder: {0} page number */
  page: string;
  /** Template label for current page. Placeholder: {0} page number */
  currentPage: string;
}

/**
 * Pagination component translations
 */
interface Pagination {
  /** Aria label configurations */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating
 */
interface RatingAriaLabel {
  /** Template label for rating icon. Placeholders: {0} current rating, {1} max rating */
  icon: string;
}

/**
 * Rating component translations
 */
interface Rating {
  /** Aria label configurations */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration interface
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer component translations */
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
 * Czech locale configuration
 */
declare const locale: VuetifyLocale;

export default locale;