/**
 * Ukrainian (Українська) locale configuration for Vuetify
 * Provides translations for all Vuetify components and UI elements
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
  /** Label for action to remove sorting */
  activateNone: string;
  /** Label for action to sort descending */
  activateDescending: string;
  /** Label for action to sort ascending */
  activateAscending: string;
}

/**
 * Data table component locale configuration
 */
interface DataTable {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Text label for sort by control */
  sortBy: string;
}

/**
 * Data iterator component locale configuration
 */
interface DataIterator {
  /** Text displayed when no search results found */
  noResultsText: string;
  /** Text displayed during data loading */
  loadingText: string;
}

/**
 * Data footer/pagination component locale configuration
 */
interface DataFooter {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Text label for "show all" option */
  itemsPerPageAll: string;
  /** Text label for next page button */
  nextPage: string;
  /** Text label for previous page button */
  prevPage: string;
  /** Text label for first page button */
  firstPage: string;
  /** Text label for last page button */
  lastPage: string;
  /** Template text for page range display (e.g. "1-10 of 100") */
  pageText: string;
}

/**
 * Date picker component locale configuration
 */
interface DatePicker {
  /** Text template for selected items count */
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
  /** Template for slide position announcement (e.g. "Slide 1 of 5") */
  delimiter: string;
}

/**
 * Carousel component locale configuration
 */
interface Carousel {
  /** Text label for previous slide button */
  prev: string;
  /** Text label for next slide button */
  next: string;
  /** Accessibility labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component locale configuration
 */
interface Calendar {
  /** Template text for collapsed events count */
  moreEvents: string;
}

/**
 * File input component locale configuration
 */
interface FileInput {
  /** Template text for file count */
  counter: string;
  /** Template text for file count with total size */
  counterSize: string;
}

/**
 * Time picker component locale configuration
 */
interface TimePicker {
  /** Text label for AM period */
  am: string;
  /** Text label for PM period */
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
  /** Template for page navigation button label */
  page: string;
  /** Template for current page announcement */
  currentPage: string;
}

/**
 * Pagination component locale configuration
 */
interface Pagination {
  /** Accessibility labels for pagination controls */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating value announcement */
  icon: string;
}

/**
 * Rating component locale configuration
 */
interface Rating {
  /** Accessibility labels for rating icons */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration for Ukrainian language
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator component configuration */
  dataIterator: DataIterator;
  /** Data table component configuration */
  dataTable: DataTable;
  /** Data footer/pagination configuration */
  dataFooter: DataFooter;
  /** Date picker component configuration */
  datePicker: DatePicker;
  /** Text displayed when no data available */
  noDataText: string;
  /** Carousel component configuration */
  carousel: Carousel;
  /** Calendar component configuration */
  calendar: Calendar;
  /** File input component configuration */
  fileInput: FileInput;
  /** Time picker component configuration */
  timePicker: TimePicker;
  /** Pagination component configuration */
  pagination: Pagination;
  /** Rating component configuration */
  rating: Rating;
}

/**
 * Ukrainian locale export
 * Default export containing all Ukrainian translations for Vuetify components
 */
declare const ukrainianLocale: VuetifyLocale;

export default ukrainianLocale;