/**
 * Spanish (Español) locale configuration for Vuetify
 * @module LocaleEs
 */

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Label for descending sort order */
  sortDescending: string;
  /** Label for ascending sort order */
  sortAscending: string;
  /** Label for no sort order */
  sortNone: string;
  /** Label to activate no sort */
  activateNone: string;
  /** Label to activate descending sort */
  activateDescending: string;
  /** Label to activate ascending sort */
  activateAscending: string;
}

/**
 * Data table configuration
 */
interface DataTable {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by text */
  sortBy: string;
}

/**
 * Data iterator configuration
 */
interface DataIterator {
  /** Text shown when no results match the search */
  noResultsText: string;
  /** Text shown during loading */
  loadingText: string;
}

/**
 * Data footer (pagination) configuration
 */
interface DataFooter {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Label for "all items" option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /** Template for page range text. Placeholders: {0} start, {1} end, {2} total */
  pageText: string;
}

/**
 * Date picker configuration
 */
interface DatePicker {
  /** Template for selected items count. Placeholder: {0} count */
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
  /** Template for slide delimiter. Placeholders: {0} current, {1} total */
  delimiter: string;
}

/**
 * Carousel configuration
 */
interface Carousel {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Aria labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar configuration
 */
interface Calendar {
  /** Template for "more events" text. Placeholder: {0} count */
  moreEvents: string;
}

/**
 * File input configuration
 */
interface FileInput {
  /** Template for file count. Placeholder: {0} count */
  counter: string;
  /** Template for file count with size. Placeholders: {0} count, {1} total size */
  counterSize: string;
}

/**
 * Time picker configuration
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
  /** Label for pagination wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page link. Placeholder: {0} page number */
  page: string;
  /** Template for current page. Placeholder: {0} page number */
  currentPage: string;
}

/**
 * Pagination configuration
 */
interface Pagination {
  /** Aria labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating
 */
interface RatingAriaLabel {
  /** Template for rating value. Placeholders: {0} current, {1} max */
  icon: string;
}

/**
 * Rating configuration
 */
interface Rating {
  /** Aria labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete locale configuration interface for Spanish
 */
interface SpanishLocale {
  /** Label for badge component */
  badge: string;
  /** Label for close button */
  close: string;
  /** Data iterator localization */
  dataIterator: DataIterator;
  /** Data table localization */
  dataTable: DataTable;
  /** Data footer localization */
  dataFooter: DataFooter;
  /** Date picker localization */
  datePicker: DatePicker;
  /** Text shown when no data is available */
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
  /** Rating localization */
  rating: Rating;
}

/**
 * Spanish locale configuration object
 */
declare const spanishLocale: SpanishLocale;

export default spanishLocale;