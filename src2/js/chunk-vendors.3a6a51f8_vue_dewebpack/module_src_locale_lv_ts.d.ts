/**
 * Latvian (lv) locale configuration for Vuetify
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
  /** Label for action to remove sorting */
  activateNone: string;
  /** Label for action to activate descending sort */
  activateDescending: string;
  /** Label for action to activate ascending sort */
  activateAscending: string;
}

/**
 * Data table component localization
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Sort by label */
  sortBy: string;
}

/**
 * Data iterator component localization
 */
interface DataIterator {
  /** Text shown when no results are found */
  noResultsText: string;
  /** Text shown during data loading */
  loadingText: string;
}

/**
 * Data footer/pagination configuration
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Label for "show all" option */
  itemsPerPageAll: string;
  /** Next page button text */
  nextPage: string;
  /** Previous page button text */
  prevPage: string;
  /** First page button text */
  firstPage: string;
  /** Last page button text */
  lastPage: string;
  /** Page range text template (e.g., "1-10 of 100") */
  pageText: string;
}

/**
 * Date picker component localization
 */
interface DatePicker {
  /** Text for selected items count */
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
 * Carousel aria label configuration
 */
interface CarouselAriaLabel {
  /** Aria label for carousel slide delimiter */
  delimiter: string;
}

/**
 * Carousel component localization
 */
interface Carousel {
  /** Previous slide button text */
  prev: string;
  /** Next slide button text */
  next: string;
  /** Aria labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component localization
 */
interface Calendar {
  /** Text for additional events indicator */
  moreEvents: string;
}

/**
 * File input component localization
 */
interface FileInput {
  /** File count display text */
  counter: string;
  /** File count with size display text */
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
 * Pagination aria label configuration
 */
interface PaginationAriaLabel {
  /** Wrapper aria label for pagination navigation */
  wrapper: string;
  /** Next page button aria label */
  next: string;
  /** Previous page button aria label */
  previous: string;
  /** Page button aria label template */
  page: string;
  /** Current page aria label template */
  currentPage: string;
}

/**
 * Pagination component localization
 */
interface Pagination {
  /** Aria labels for pagination controls */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria label configuration
 */
interface RatingAriaLabel {
  /** Aria label for rating icon */
  icon: string;
}

/**
 * Rating component localization
 */
interface Rating {
  /** Aria labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration for Latvian language
 */
interface VuetifyLocale {
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
  /** No data available text */
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
 * Latvian locale configuration export
 */
declare const locale: VuetifyLocale;

export default locale;