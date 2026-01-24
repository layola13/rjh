/**
 * Dutch (Netherlands) locale configuration for Vuetify
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
  /** Label for action to sort descending */
  activateDescending: string;
  /** Label for action to sort ascending */
  activateAscending: string;
}

/**
 * Data table component translations
 */
interface DataTable {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for table interactions */
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
  /** Message shown while loading items */
  loadingText: string;
}

/**
 * Data footer component translations
 * Supports pagination controls at the bottom of data displays
 */
interface DataFooter {
  /** Label for items per page selector */
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
  /** Template string for page range display. Placeholders: {0} = start, {1} = end, {2} = total */
  pageText: string;
}

/**
 * Date picker component translations
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
 * Aria label configuration for carousel navigation
 */
interface CarouselAriaLabel {
  /** Template string for slide indicator. Placeholders: {0} = current slide, {1} = total slides */
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
  /** Accessibility labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component translations
 */
interface Calendar {
  /** Template string for collapsed events. Placeholder: {0} = count of additional events */
  moreEvents: string;
}

/**
 * File input component translations
 */
interface FileInput {
  /** Template string for file count. Placeholder: {0} = number of files */
  counter: string;
  /** Template string for file count with size. Placeholders: {0} = count, {1} = total size */
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
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Label for pagination wrapper element */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template string for page link. Placeholder: {0} = page number */
  page: string;
  /** Template string for current page. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination component translations
 */
interface Pagination {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template string for rating icon. Placeholders: {0} = current value, {1} = max value */
  icon: string;
}

/**
 * Rating component translations
 */
interface Rating {
  /** Accessibility labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Dutch locale configuration for Vuetify
 * Implements all component translations and localized strings
 */
interface VuetifyLocale {
  /** Translation for badge component */
  badge: string;
  /** Translation for close button/action */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer component translations */
  dataFooter: DataFooter;
  /** Date picker component translations */
  datePicker: DatePicker;
  /** Message shown when no data is available */
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
 * Dutch (nl) locale export
 * Default export containing all Dutch translations for Vuetify components
 */
declare const dutchLocale: VuetifyLocale;

export default dutchLocale;