/**
 * Spanish (es) locale configuration for Vuetify
 * Contains translations for all UI components and accessibility labels
 */

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Label for descending sort order */
  sortDescending: string;
  /** Label for ascending sort order */
  sortAscending: string;
  /** Label for no sort order */
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
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for table interactions */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort indicator */
  sortBy: string;
}

/**
 * Data iterator localization configuration
 */
interface DataIterator {
  /** Text displayed when no results match the search */
  noResultsText: string;
  /** Text displayed while data is loading */
  loadingText: string;
}

/**
 * Data footer (pagination footer) localization configuration
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
  /** Template for page range text (e.g., "1-10 of 100") */
  pageText: string;
}

/**
 * Date picker localization configuration
 */
interface DatePicker {
  /** Template for selected items count */
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
  /** Template for slide position (e.g., "Slide 1 of 5") */
  delimiter: string;
}

/**
 * Carousel component localization configuration
 */
interface Carousel {
  /** Text for previous slide button */
  prev: string;
  /** Text for next slide button */
  next: string;
  /** Accessibility labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component localization configuration
 */
interface Calendar {
  /** Template text for "more events" indicator */
  moreEvents: string;
}

/**
 * File input component localization configuration
 */
interface FileInput {
  /** Template for file count (e.g., "3 files") */
  counter: string;
  /** Template for file count with total size (e.g., "3 files (1.5 MB total)") */
  counterSize: string;
}

/**
 * Time picker component localization configuration
 */
interface TimePicker {
  /** Text for AM (ante meridiem) */
  am: string;
  /** Text for PM (post meridiem) */
  pm: string;
}

/**
 * Aria label configuration for pagination navigation
 */
interface PaginationAriaLabel {
  /** Label for pagination wrapper element */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page link label */
  page: string;
  /** Template for current page label */
  currentPage: string;
}

/**
 * Pagination component localization configuration
 */
interface Pagination {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating icon label (e.g., "Rating 4 of 5") */
  icon: string;
}

/**
 * Rating component localization configuration
 */
interface Rating {
  /** Accessibility labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete locale configuration interface for Vuetify components
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  /** Close button label */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer (pagination) component translations */
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
 * Spanish locale export for Vuetify
 */
declare const locale: VuetifyLocale;

export default locale;