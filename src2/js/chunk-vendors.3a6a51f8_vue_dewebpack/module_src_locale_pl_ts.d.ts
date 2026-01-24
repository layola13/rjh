/**
 * Polish (pl) locale configuration for Vuetify framework
 * Provides translations for common UI components and messages
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
  /** Label for removing sort action */
  activateNone: string;
  /** Label for activating descending sort */
  activateDescending: string;
  /** Label for activating ascending sort */
  activateAscending: string;
}

/**
 * Data table component translations
 */
interface DataTable {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for accessibility */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by functionality */
  sortBy: string;
}

/**
 * Data iterator component translations
 */
interface DataIterator {
  /** Message shown when no results match the search */
  noResultsText: string;
  /** Message shown during data loading */
  loadingText: string;
}

/**
 * Data footer component translations with pagination controls
 */
interface DataFooter {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Label for "show all" option */
  itemsPerPageAll: string;
  /** Next page button label */
  nextPage: string;
  /** Previous page button label */
  prevPage: string;
  /** First page button label */
  firstPage: string;
  /** Last page button label */
  lastPage: string;
  /** Page range text template with placeholders: {0} start, {1} end, {2} total */
  pageText: string;
}

/**
 * Date picker component translations
 */
interface DatePicker {
  /** Selected items count template with placeholder {0} for count */
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
  /** Carousel slide position template with placeholders: {0} current, {1} total */
  delimiter: string;
}

/**
 * Carousel component translations
 */
interface Carousel {
  /** Previous slide button label */
  prev: string;
  /** Next slide button label */
  next: string;
  /** Aria labels for accessibility */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component translations
 */
interface Calendar {
  /** Text for showing more events, template with placeholder {0} for count */
  moreEvents: string;
}

/**
 * File input component translations
 */
interface FileInput {
  /** File count template with placeholder {0} for number of files */
  counter: string;
  /** File count with size template with placeholders: {0} count, {1} total size */
  counterSize: string;
}

/**
 * Time picker component translations
 */
interface TimePicker {
  /** AM (ante meridiem) label */
  am: string;
  /** PM (post meridiem) label */
  pm: string;
}

/**
 * Aria label configuration for pagination navigation
 */
interface PaginationAriaLabel {
  /** Wrapper element label */
  wrapper: string;
  /** Next page button label */
  next: string;
  /** Previous page button label */
  previous: string;
  /** Page button label template with placeholder {0} for page number */
  page: string;
  /** Current page label template with placeholder {0} for page number */
  currentPage: string;
}

/**
 * Pagination component translations
 */
interface Pagination {
  /** Aria labels for accessibility */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Rating value label template with placeholders: {0} current rating, {1} max rating */
  icon: string;
}

/**
 * Rating component translations
 */
interface Rating {
  /** Aria labels for accessibility */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration interface
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
  /** No data available message */
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

/**
 * Polish locale configuration export
 */
declare const polishLocale: VuetifyLocale;

export default polishLocale;