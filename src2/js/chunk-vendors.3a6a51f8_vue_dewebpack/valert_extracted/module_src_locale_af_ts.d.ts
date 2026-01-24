/**
 * Afrikaans (af) locale configuration for Vuetify
 * @module LocaleAf
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
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by label */
  sortBy: string;
}

/**
 * Data iterator localization configuration
 */
interface DataIterator {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed while loading items */
  loadingText: string;
}

/**
 * Data footer (pagination) localization configuration
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all" option */
  itemsPerPageAll: string;
  /** Text for next page button */
  nextPage: string;
  /** Text for previous page button */
  prevPage: string;
  /** Text for first page button */
  firstPage: string;
  /** Text for last page button */
  lastPage: string;
  /** Template text for page range display. Placeholders: {0} = start, {1} = end, {2} = total */
  pageText: string;
}

/**
 * Date picker localization configuration
 */
interface DatePicker {
  /** Template text for selected items count. Placeholder: {0} = count */
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
 * Aria label configuration for carousel navigation
 */
interface CarouselAriaLabel {
  /** Template text for carousel slide position. Placeholders: {0} = current, {1} = total */
  delimiter: string;
}

/**
 * Carousel localization configuration
 */
interface Carousel {
  /** Text for previous slide button */
  prev: string;
  /** Text for next slide button */
  next: string;
  /** Aria labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization configuration
 */
interface Calendar {
  /** Template text for additional events. Placeholder: {0} = count */
  moreEvents: string;
}

/**
 * File input localization configuration
 */
interface FileInput {
  /** Template text for file count. Placeholder: {0} = count */
  counter: string;
  /** Template text for file count with size. Placeholders: {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker localization configuration
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
  /** Template label for page navigation. Placeholder: {0} = page number */
  page: string;
  /** Template label for current page. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination localization configuration
 */
interface Pagination {
  /** Aria labels for pagination navigation */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template label for rating value. Placeholders: {0} = current rating, {1} = max rating */
  icon: string;
}

/**
 * Rating component localization configuration
 */
interface Rating {
  /** Aria labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration for Afrikaans
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  /** Close button text */
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
 * Afrikaans locale configuration object
 */
declare const af: VuetifyLocale;

export default af;