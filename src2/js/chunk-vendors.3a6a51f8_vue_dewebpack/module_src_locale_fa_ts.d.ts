/**
 * Persian (Farsi) locale configuration for Vuetify components
 * Locale code: fa
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
  /** Accessibility labels for sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by label */
  sortBy: string;
}

/**
 * Data iterator localization strings
 */
interface DataIterator {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed during loading state */
  loadingText: string;
}

/**
 * Data footer (pagination) localization strings
 * Supports template variables: {0}, {1}, {2} for dynamic values
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all" option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /** Text template showing range: "{0} to {1} of {2}" */
  pageText: string;
}

/**
 * Date picker localization strings
 */
interface DatePicker {
  /** Text template for selected items count: "{0} selected" */
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
  /** Template for slide position: "Slide {0} of {1}" */
  delimiter: string;
}

/**
 * Carousel component localization strings
 */
interface Carousel {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Accessibility labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component localization strings
 */
interface Calendar {
  /** Text template for additional events: "{0} more" */
  moreEvents: string;
}

/**
 * File input component localization strings
 */
interface FileInput {
  /** Text template for file count: "{0} files" */
  counter: string;
  /** Text template for files with size: "{0} files ({1} total)" */
  counterSize: string;
}

/**
 * Time picker component localization strings
 */
interface TimePicker {
  /** AM period label */
  am: string;
  /** PM period label */
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
  /** Template for page navigation: "Go to page {0}" */
  page: string;
  /** Template for current page: "{0} Current page, Page" */
  currentPage: string;
}

/**
 * Pagination component localization strings
 */
interface Pagination {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating value: "Rating {0} of {1}" */
  icon: string;
}

/**
 * Rating component localization strings
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
  /** Data iterator component strings */
  dataIterator: DataIterator;
  /** Data table component strings */
  dataTable: DataTable;
  /** Data footer/pagination strings */
  dataFooter: DataFooter;
  /** Date picker component strings */
  datePicker: DatePicker;
  /** Text displayed when no data is available */
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
 * Persian (Farsi) locale export
 */
declare const locale: VuetifyLocale;
export default locale;