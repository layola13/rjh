/**
 * Swedish (sv) locale configuration for Vuetify
 * Provides translations and localized strings for Vuetify components
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
  /** Aria label configuration for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by label */
  sortBy: string;
}

/**
 * Data footer localization strings
 */
interface DataFooter {
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
  /** Template for page range text. Format: "{0}-{1} av {2}" */
  pageText: string;
}

/**
 * Data iterator localization strings
 */
interface DataIterator {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed while loading data */
  loadingText: string;
}

/**
 * Date picker localization strings
 */
interface DatePicker {
  /** Template for selected items count. Format: "{0} markerade" */
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
 * Carousel aria label configuration
 */
interface CarouselAriaLabel {
  /** Template for carousel slide label. Format: "Carousel slide {0} of {1}" */
  delimiter: string;
}

/**
 * Carousel localization strings
 */
interface Carousel {
  /** Text for previous slide button */
  prev: string;
  /** Text for next slide button */
  next: string;
  /** Aria label configuration */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization strings
 */
interface Calendar {
  /** Template for additional events text. Format: "{0} fler" */
  moreEvents: string;
}

/**
 * File input localization strings
 */
interface FileInput {
  /** Template for file count. Format: "{0} filer" */
  counter: string;
  /** Template for file count with total size. Format: "{0} filer (av {1} totalt)" */
  counterSize: string;
}

/**
 * Time picker localization strings
 */
interface TimePicker {
  /** Text for AM period */
  am: string;
  /** Text for PM period */
  pm: string;
}

/**
 * Pagination aria label configuration
 */
interface PaginationAriaLabel {
  /** Aria label for pagination wrapper */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /** Template for page button label. Format: "Gå till sidan {0}" */
  page: string;
  /** Template for current page label. Format: "Aktuell sida, sida {0}" */
  currentPage: string;
}

/**
 * Pagination localization strings
 */
interface Pagination {
  /** Aria label configuration */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria label configuration
 */
interface RatingAriaLabel {
  /** Template for rating icon label. Format: "Rating {0} of {1}" */
  icon: string;
}

/**
 * Rating localization strings
 */
interface Rating {
  /** Aria label configuration */
  ariaLabel: RatingAriaLabel;
}

/**
 * Vuetify Swedish locale definition
 */
interface VuetifyLocale {
  /** Text for badge component */
  badge: string;
  /** Text for close button */
  close: string;
  /** Data iterator component strings */
  dataIterator: DataIterator;
  /** Data table component strings */
  dataTable: DataTable;
  /** Data footer component strings */
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

declare const locale: VuetifyLocale;

export default locale;