/**
 * Italian (it) locale configuration for Vuetify
 * Provides translated strings for all Vuetify components
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
 * Data table localization strings
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting interactions */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by label */
  sortBy: string;
}

/**
 * Data iterator localization strings
 */
interface DataIterator {
  /** Text shown when no results are found */
  noResultsText: string;
  /** Text shown during data loading */
  loadingText: string;
}

/**
 * Data footer (pagination) localization strings
 * Supports template strings with {0}, {1}, {2} placeholders
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
  /** Template text for page range display: "{0}-{1} of {2}" */
  pageText: string;
}

/**
 * Date picker localization strings
 */
interface DatePicker {
  /** Template text for selected items count: "{0} selected" */
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
  /** Template text for slide position: "Carousel slide {0} of {1}" */
  delimiter: string;
}

/**
 * Carousel component localization strings
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
 * Calendar component localization strings
 */
interface Calendar {
  /** Template text for additional events: "{0} more" */
  moreEvents: string;
}

/**
 * File input component localization strings
 */
interface FileInput {
  /** Template text for file count: "{0} files" */
  counter: string;
  /** Template text for file count with size: "{0} files ({1} total)" */
  counterSize: string;
}

/**
 * Time picker component localization strings
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
  /** Aria label for pagination wrapper */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /** Template text for page button: "Go to page {0}" */
  page: string;
  /** Template text for current page: "Current page, page {0}" */
  currentPage: string;
}

/**
 * Pagination component localization strings
 */
interface Pagination {
  /** Aria labels for pagination navigation */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template text for rating value: "Rating {0} of {1}" */
  icon: string;
}

/**
 * Rating component localization strings
 */
interface Rating {
  /** Aria labels for rating icons */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Italian locale configuration for Vuetify
 * All template strings use {0}, {1}, {2} placeholders for dynamic values
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator component strings */
  dataIterator: DataIterator;
  /** Data table component strings */
  dataTable: DataTable;
  /** Data footer/pagination strings */
  dataFooter: DataFooter;
  /** Date picker component strings */
  datePicker: DatePicker;
  /** Text shown when no data is available */
  noDataText: string;
  /** Carousel component strings */
  carousel: Carousel;
  /** Calendar component strings */
  calendar: Calendar;
  /** File input component strings */
  fileInput: FileInput;
  /** Time picker component strings */
  timePicker: TimePicker;
  /** Pagination component strings */
  pagination: Pagination;
  /** Rating component strings */
  rating: Rating;
}

/**
 * Italian locale configuration object
 */
declare const itLocale: VuetifyLocale;

export default itLocale;