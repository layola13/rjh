/**
 * Thai (ไทย) locale configuration for Vuetify
 * Provides localized strings for various Vuetify components
 */

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Label when sorted in descending order */
  sortDescending: string;
  /** Label when sorted in ascending order */
  sortAscending: string;
  /** Label when not sorted */
  sortNone: string;
  /** Label for activating no sort */
  activateNone: string;
  /** Label for activating descending sort */
  activateDescending: string;
  /** Label for activating ascending sort */
  activateAscending: string;
}

/**
 * Data table localization strings
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by functionality */
  sortBy: string;
}

/**
 * Data iterator localization strings
 */
interface DataIterator {
  /** Text displayed when no results found */
  noResultsText: string;
  /** Text displayed while loading data */
  loadingText: string;
}

/**
 * Data footer/pagination localization strings
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for showing all items option */
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
 * Date picker localization strings
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
 * Aria label configuration for carousel
 */
interface CarouselAriaLabel {
  /** Template for carousel slide position. Placeholders: {0} = current, {1} = total */
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
  /** Aria labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization strings
 */
interface Calendar {
  /** Template text for more events indicator. Placeholder: {0} = count */
  moreEvents: string;
}

/**
 * File input localization strings
 */
interface FileInput {
  /** Template text for file count. Placeholder: {0} = count */
  counter: string;
  /** Template text for file count with size. Placeholders: {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker localization strings
 */
interface TimePicker {
  /** AM time indicator */
  am: string;
  /** PM time indicator */
  pm: string;
}

/**
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Wrapper aria label for pagination navigation */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page link label. Placeholder: {0} = page number */
  page: string;
  /** Template for current page label. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination localization strings
 */
interface Pagination {
  /** Aria labels for pagination */
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
 * Rating component localization strings
 */
interface Rating {
  /** Aria labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration interface
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator component strings */
  dataIterator: DataIterator;
  /** Data table component strings */
  dataTable: DataTable;
  /** Data footer component strings */
  dataFooter: DataFooter;
  /** Date picker component strings */
  datePicker: DatePicker;
  /** Text displayed when no data available */
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
 * Thai locale configuration object
 */
declare const thaiLocale: VuetifyLocale;

export default thaiLocale;