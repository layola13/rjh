/**
 * Lithuanian (lt) locale configuration for Vuetify
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
  /** Aria labels for table sorting accessibility */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by functionality */
  sortBy: string;
}

/**
 * Data iterator localization configuration
 */
interface DataIterator {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed while data is loading */
  loadingText: string;
}

/**
 * Data footer/pagination localization configuration
 */
interface DataFooter {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Text label for "all items" option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /** Template for page range text, uses placeholders {0}-{1} of {2} */
  pageText: string;
}

/**
 * Date picker localization configuration
 */
interface DatePicker {
  /** Template for selected items count, uses placeholder {0} */
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
  /** Template for slide position, uses placeholders {0} of {1} */
  delimiter: string;
}

/**
 * Carousel component localization configuration
 */
interface Carousel {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Aria labels for carousel accessibility */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component localization configuration
 */
interface Calendar {
  /** Template for "more events" text, uses placeholder {0} */
  moreEvents: string;
}

/**
 * File input component localization configuration
 */
interface FileInput {
  /** Template for file count, uses placeholder {0} */
  counter: string;
  /** Template for file count with total size, uses placeholders {0} and {1} */
  counterSize: string;
}

/**
 * Time picker component localization configuration
 */
interface TimePicker {
  /** Label for AM (ante meridiem) */
  am: string;
  /** Label for PM (post meridiem) */
  pm: string;
}

/**
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Label for pagination wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page navigation, uses placeholder {0} */
  page: string;
  /** Template for current page indicator, uses placeholder {0} */
  currentPage: string;
}

/**
 * Pagination component localization configuration
 */
interface Pagination {
  /** Aria labels for pagination accessibility */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating value, uses placeholders {0} of {1} */
  icon: string;
}

/**
 * Rating component localization configuration
 */
interface Rating {
  /** Aria labels for rating accessibility */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Lithuanian locale configuration for Vuetify
 */
interface VuetifyLithuanianLocale {
  /** Label for badge component */
  badge: string;
  /** Label for close action */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer/pagination translations */
  dataFooter: DataFooter;
  /** Date picker component translations */
  datePicker: DatePicker;
  /** Text displayed when no data is available */
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
 * Default export: Lithuanian locale configuration object
 */
declare const lithuanianLocale: VuetifyLithuanianLocale;

export default lithuanianLocale;