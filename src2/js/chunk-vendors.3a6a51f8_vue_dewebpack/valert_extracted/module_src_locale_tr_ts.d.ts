/**
 * Turkish (Türkçe) locale configuration for Vuetify UI components
 * @module LocaleTurkish
 */

/**
 * Data table sort order aria label configuration
 */
interface DataTableAriaLabel {
  /** Aria label for descending sort (Z to A) */
  sortDescending: string;
  /** Aria label for ascending sort (A to Z) */
  sortAscending: string;
  /** Aria label when no sorting is applied */
  sortNone: string;
  /** Aria label to activate and remove sorting */
  activateNone: string;
  /** Aria label to activate descending sort */
  activateDescending: string;
  /** Aria label to activate ascending sort */
  activateAscending: string;
}

/**
 * Data table configuration
 */
interface DataTable {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by action */
  sortBy: string;
}

/**
 * Data iterator configuration for list views
 */
interface DataIterator {
  /** Message displayed when no matching data is found */
  noResultsText: string;
  /** Message displayed while data is loading */
  loadingText: string;
}

/**
 * Data footer/pagination configuration
 */
interface DataFooter {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Label for showing all items option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /** Template string for page range display. Placeholders: {0} = start, {1} = end, {2} = total */
  pageText: string;
}

/**
 * Date picker configuration
 */
interface DatePicker {
  /** Template string for selected items count. Placeholder: {0} = count */
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
  /** Template string for carousel pagination. Placeholders: {0} = current, {1} = total */
  delimiter: string;
}

/**
 * Carousel component configuration
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
 * Calendar component configuration
 */
interface Calendar {
  /** Template string for additional events. Placeholder: {0} = count */
  moreEvents: string;
}

/**
 * File input component configuration
 */
interface FileInput {
  /** Template string for file count. Placeholder: {0} = count */
  counter: string;
  /** Template string for file count with size. Placeholders: {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker component configuration
 */
interface TimePicker {
  /** Label for AM (ante meridiem) */
  am: string;
  /** Label for PM (post meridiem) */
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
  /** Template string for page navigation. Placeholder: {0} = page number */
  page: string;
  /** Template string for current page indicator. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination component configuration
 */
interface Pagination {
  /** Accessibility labels */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria label configuration
 */
interface RatingAriaLabel {
  /** Template string for rating value. Placeholders: {0} = current rating, {1} = max rating */
  icon: string;
}

/**
 * Rating component configuration
 */
interface Rating {
  /** Accessibility labels */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Turkish locale configuration object for Vuetify
 */
interface VuetifyLocale {
  /** Label for badge component */
  badge: string;
  /** Label for close button */
  close: string;
  /** Data iterator component texts */
  dataIterator: DataIterator;
  /** Data table component texts */
  dataTable: DataTable;
  /** Data footer/pagination texts */
  dataFooter: DataFooter;
  /** Date picker component texts */
  datePicker: DatePicker;
  /** Message displayed when no data is available */
  noDataText: string;
  /** Carousel component texts */
  carousel: Carousel;
  /** Calendar component texts */
  calendar: Calendar;
  /** File input component texts */
  fileInput: FileInput;
  /** Time picker component texts */
  timePicker: TimePicker;
  /** Pagination component texts */
  pagination: Pagination;
  /** Rating component texts */
  rating: Rating;
}

/**
 * Turkish locale configuration
 */
declare const turkishLocale: VuetifyLocale;

export default turkishLocale;