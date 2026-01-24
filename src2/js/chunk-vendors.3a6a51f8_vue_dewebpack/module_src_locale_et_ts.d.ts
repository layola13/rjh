/**
 * Estonian (et) locale configuration for Vuetify
 * Provides translations for all Vuetify components
 */

/**
 * Data iterator component localization
 */
interface DataIteratorLocale {
  /** Message displayed when no matching records are found */
  noResultsText: string;
  /** Message displayed while data is being loaded */
  loadingText: string;
}

/**
 * Data table aria label localization
 */
interface DataTableAriaLabel {
  /** Label for descending sort state */
  sortDescending: string;
  /** Label for ascending sort state */
  sortAscending: string;
  /** Label for unsorted state */
  sortNone: string;
  /** Instruction to remove sorting */
  activateNone: string;
  /** Instruction to activate descending sort */
  activateDescending: string;
  /** Instruction to activate ascending sort */
  activateAscending: string;
}

/**
 * Data table component localization
 */
interface DataTableLocale {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by functionality */
  sortBy: string;
}

/**
 * Data footer component localization
 */
interface DataFooterLocale {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "all items" option */
  itemsPerPageAll: string;
  /** Text for next page button */
  nextPage: string;
  /** Text for previous page button */
  prevPage: string;
  /** Text for first page button */
  firstPage: string;
  /** Text for last page button */
  lastPage: string;
  /** Template for page range text: {0}-{1} of {2} */
  pageText: string;
}

/**
 * Date picker aria label localization
 */
interface DatePickerLocale {
  /** Template for selected items count: {0} selected */
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
 * Carousel aria label localization
 */
interface CarouselAriaLabel {
  /** Template for slide indicator: Carousel slide {0} of {1} */
  delimiter: string;
}

/**
 * Carousel component localization
 */
interface CarouselLocale {
  /** Text for previous slide button */
  prev: string;
  /** Text for next slide button */
  next: string;
  /** Aria labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component localization
 */
interface CalendarLocale {
  /** Template for additional events text: {0} more */
  moreEvents: string;
}

/**
 * File input component localization
 */
interface FileInputLocale {
  /** Template for file count: {0} files */
  counter: string;
  /** Template for file count with size: {0} files (total {1}) */
  counterSize: string;
}

/**
 * Time picker component localization
 */
interface TimePickerLocale {
  /** AM time period label */
  am: string;
  /** PM time period label */
  pm: string;
}

/**
 * Pagination aria label localization
 */
interface PaginationAriaLabel {
  /** Aria label for pagination wrapper */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /** Template for page navigation: Go to page {0} */
  page: string;
  /** Template for current page indicator: Current page, page {0} */
  currentPage: string;
}

/**
 * Pagination component localization
 */
interface PaginationLocale {
  /** Aria labels for pagination navigation */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria label localization
 */
interface RatingAriaLabel {
  /** Template for rating value: Rating {0} of {1} */
  icon: string;
}

/**
 * Rating component localization
 */
interface RatingLocale {
  /** Aria labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIteratorLocale;
  /** Data table component translations */
  dataTable: DataTableLocale;
  /** Data footer component translations */
  dataFooter: DataFooterLocale;
  /** Date picker component translations */
  datePicker: DatePickerLocale;
  /** Message displayed when no data is available */
  noDataText: string;
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
 * Estonian locale configuration
 */
declare const estonianLocale: VuetifyLocale;

export default estonianLocale;