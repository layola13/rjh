/**
 * Locale translations for Portuguese (pt)
 * Contains all UI text strings for Vuetify components in Portuguese language
 */

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Label shown when column is sorted in descending order */
  sortDescending: string;
  /** Label shown when column is sorted in ascending order */
  sortAscending: string;
  /** Label shown when column is not sorted */
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
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for table interactions */
  ariaLabel: DataTableAriaLabel;
  /** Text label for sort by feature */
  sortBy: string;
}

/**
 * Data iterator component localization
 */
interface DataIterator {
  /** Message displayed when no results are found */
  noResultsText: string;
  /** Message displayed while loading items */
  loadingText: string;
}

/**
 * Data footer component localization
 */
interface DataFooter {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Label for "show all items" option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /** Template text for pagination display. Placeholders: {0} = start index, {1} = end index, {2} = total count */
  pageText: string;
}

/**
 * Date picker component localization
 */
interface DatePicker {
  /** Template text for selected items count. Placeholder: {0} = count */
  itemsSelected: string;
  /** Aria label for next month navigation button */
  nextMonthAriaLabel: string;
  /** Aria label for next year navigation button */
  nextYearAriaLabel: string;
  /** Aria label for previous month navigation button */
  prevMonthAriaLabel: string;
  /** Aria label for previous year navigation button */
  prevYearAriaLabel: string;
}

/**
 * Aria label configuration for carousel navigation
 */
interface CarouselAriaLabel {
  /** Template for slide position. Placeholders: {0} = current slide, {1} = total slides */
  delimiter: string;
}

/**
 * Carousel component localization
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
 * Calendar component localization
 */
interface Calendar {
  /** Template text for additional events. Placeholder: {0} = count of additional events */
  moreEvents: string;
}

/**
 * File input component localization
 */
interface FileInput {
  /** Template text for file count. Placeholder: {0} = number of files */
  counter: string;
  /** Template text for file count with size. Placeholders: {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker component localization
 */
interface TimePicker {
  /** Label for AM (ante meridiem) */
  am: string;
  /** Label for PM (post meridiem) */
  pm: string;
}

/**
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Label for pagination navigation wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page button. Placeholder: {0} = page number */
  page: string;
  /** Template for current page. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination component localization
 */
interface Pagination {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating value. Placeholders: {0} = current rating, {1} = max rating */
  icon: string;
}

/**
 * Rating component localization
 */
interface Rating {
  /** Accessibility labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Portuguese locale configuration for Vuetify
 * Contains all translatable strings for UI components
 */
interface PortugueseLocale {
  /** Label for badge component */
  badge: string;
  /** Label for close button */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer component translations */
  dataFooter: DataFooter;
  /** Date picker component translations */
  datePicker: DatePicker;
  /** Message displayed when no data is available */
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
 * Portuguese (pt) locale configuration object
 */
declare const portugueseLocale: PortugueseLocale;

export default portugueseLocale;