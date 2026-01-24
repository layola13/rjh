/**
 * Greek (Ελληνικά) locale configuration for Vuetify
 * @module LocaleEl
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
 * Data table localization strings
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by functionality */
  sortBy: string;
}

/**
 * Data iterator localization strings
 */
interface DataIterator {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed while loading items */
  loadingText: string;
}

/**
 * Data footer (pagination) localization strings
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all items" option */
  itemsPerPageAll: string;
  /** Text for next page button */
  nextPage: string;
  /** Text for previous page button */
  prevPage: string;
  /** Text for first page button */
  firstPage: string;
  /** Text for last page button */
  lastPage: string;
  /** Template for page range text. Placeholders: {0} = start, {1} = end, {2} = total */
  pageText: string;
}

/**
 * Date picker localization strings
 */
interface DatePicker {
  /** Template for selected items count. Placeholder: {0} = count */
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
 * Aria label configuration for carousel
 */
interface CarouselAriaLabel {
  /** Template for slide position. Placeholders: {0} = current slide, {1} = total slides */
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
  /** Aria labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization strings
 */
interface Calendar {
  /** Template for "more events" link. Placeholder: {0} = count */
  moreEvents: string;
}

/**
 * File input localization strings
 */
interface FileInput {
  /** Template for file count. Placeholder: {0} = count */
  counter: string;
  /** Template for file count with size. Placeholders: {0} = count, {1} = total size */
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
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Aria label for pagination wrapper */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /** Template for page navigation. Placeholder: {0} = page number */
  page: string;
  /** Template for current page. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination localization strings
 */
interface Pagination {
  /** Aria labels for pagination navigation */
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
  /** Aria labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Greek locale configuration for Vuetify components
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  /** Close button text */
  close: string;
  /** Data iterator localization */
  dataIterator: DataIterator;
  /** Data table localization */
  dataTable: DataTable;
  /** Data footer localization */
  dataFooter: DataFooter;
  /** Date picker localization */
  datePicker: DatePicker;
  /** Text displayed when no data is available */
  noDataText: string;
  /** Carousel localization */
  carousel: Carousel;
  /** Calendar localization */
  calendar: Calendar;
  /** File input localization */
  fileInput: FileInput;
  /** Time picker localization */
  timePicker: TimePicker;
  /** Pagination localization */
  pagination: Pagination;
  /** Rating component localization */
  rating: Rating;
}

/**
 * Greek (Ελληνικά) locale for Vuetify
 */
declare const elLocale: VuetifyLocale;

export default elLocale;