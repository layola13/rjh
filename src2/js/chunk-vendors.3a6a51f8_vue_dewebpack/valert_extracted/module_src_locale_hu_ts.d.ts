/**
 * Hungarian (Magyar) locale configuration for Vuetify
 * Contains translations for all Vuetify components and their accessibility labels
 */

/**
 * Data table sorting and accessibility labels
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
 * Data table component translations
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for sorting states */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by column */
  sortBy: string;
}

/**
 * Data iterator component translations
 */
interface DataIterator {
  /** Text shown when no results match the search criteria */
  noResultsText: string;
  /** Text shown during data loading */
  loadingText: string;
}

/**
 * Data footer pagination translations
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all items" option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /** Template for page range text: "{start}-{end} / {total}" */
  pageText: string;
}

/**
 * Date picker component translations
 */
interface DatePicker {
  /** Template text for selected items count: "{count} kiválasztva" */
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
 * Carousel component accessibility labels
 */
interface CarouselAriaLabel {
  /** Template for slide position: "Dia {current}/{total}" */
  delimiter: string;
}

/**
 * Carousel component translations
 */
interface Carousel {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Accessibility labels */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component translations
 */
interface Calendar {
  /** Template for additional events count: "{count} további" */
  moreEvents: string;
}

/**
 * File input component translations
 */
interface FileInput {
  /** Template for file count: "{count} fájl" */
  counter: string;
  /** Template for file count with total size: "{count} fájl ({size} összesen)" */
  counterSize: string;
}

/**
 * Time picker component translations
 */
interface TimePicker {
  /** Label for AM (ante meridiem) */
  am: string;
  /** Label for PM (post meridiem) */
  pm: string;
}

/**
 * Pagination component accessibility labels
 */
interface PaginationAriaLabel {
  /** Label for pagination navigation wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page navigation: "Menj a(z) {page}. oldalra" */
  page: string;
  /** Template for current page indicator: "Aktuális oldal: {page}" */
  currentPage: string;
}

/**
 * Pagination component translations
 */
interface Pagination {
  /** Accessibility labels */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating component accessibility labels
 */
interface RatingAriaLabel {
  /** Template for rating value: "Rating {value} of {max}" */
  icon: string;
}

/**
 * Rating component translations
 */
interface Rating {
  /** Accessibility labels */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration for Hungarian
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  /** Close button label */
  close: string;
  /** Data iterator translations */
  dataIterator: DataIterator;
  /** Data table translations */
  dataTable: DataTable;
  /** Data footer translations */
  dataFooter: DataFooter;
  /** Date picker translations */
  datePicker: DatePicker;
  /** Text shown when no data is available */
  noDataText: string;
  /** Carousel translations */
  carousel: Carousel;
  /** Calendar translations */
  calendar: Calendar;
  /** File input translations */
  fileInput: FileInput;
  /** Time picker translations */
  timePicker: TimePicker;
  /** Pagination translations */
  pagination: Pagination;
  /** Rating translations */
  rating: Rating;
}

declare const locale: VuetifyLocale;
export default locale;