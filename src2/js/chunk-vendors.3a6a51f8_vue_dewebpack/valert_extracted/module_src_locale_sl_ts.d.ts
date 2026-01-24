/**
 * Slovenian (Slovenščina) locale for Vuetify
 * @module locale/sl
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
 * Data table localization configuration
 */
interface DataTable {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Aria label configurations for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Text label for sort by control */
  sortBy: string;
}

/**
 * Data iterator localization configuration
 */
interface DataIterator {
  /** Text shown when no results are found */
  noResultsText: string;
  /** Text shown during data loading */
  loadingText: string;
}

/**
 * Data footer localization configuration
 */
interface DataFooter {
  /** Text label for items per page selector */
  itemsPerPageText: string;
  /** Text label for "all items" option */
  itemsPerPageAll: string;
  /** Text label for next page button */
  nextPage: string;
  /** Text label for previous page button */
  prevPage: string;
  /** Text label for first page button */
  firstPage: string;
  /** Text label for last page button */
  lastPage: string;
  /** 
   * Template text for page range display
   * Placeholders: {0} = start index, {1} = end index, {2} = total count
   */
  pageText: string;
}

/**
 * Date picker localization configuration
 */
interface DatePicker {
  /** 
   * Text template for selected items count
   * Placeholder: {0} = number of selected items
   */
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
  /** 
   * Template for slide position announcement
   * Placeholders: {0} = current slide, {1} = total slides
   */
  delimiter: string;
}

/**
 * Carousel localization configuration
 */
interface Carousel {
  /** Text label for previous slide button */
  prev: string;
  /** Text label for next slide button */
  next: string;
  /** Aria label configurations */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization configuration
 */
interface Calendar {
  /** 
   * Text template for additional events indicator
   * Placeholder: {0} = number of additional events
   */
  moreEvents: string;
}

/**
 * File input localization configuration
 */
interface FileInput {
  /** 
   * Text template for file count
   * Placeholder: {0} = number of files
   */
  counter: string;
  /** 
   * Text template for file count with total size
   * Placeholders: {0} = number of files, {1} = total size
   */
  counterSize: string;
}

/**
 * Time picker localization configuration
 */
interface TimePicker {
  /** Text label for AM (ante meridiem) */
  am: string;
  /** Text label for PM (post meridiem) */
  pm: string;
}

/**
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Aria label for pagination wrapper element */
  wrapper: string;
  /** Aria label for next page button */
  next: string;
  /** Aria label for previous page button */
  previous: string;
  /** 
   * Aria label template for page button
   * Placeholder: {0} = page number
   */
  page: string;
  /** 
   * Aria label template for current page
   * Placeholder: {0} = current page number
   */
  currentPage: string;
}

/**
 * Pagination localization configuration
 */
interface Pagination {
  /** Aria label configurations */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** 
   * Aria label template for rating icon
   * Placeholders: {0} = current rating, {1} = maximum rating
   */
  icon: string;
}

/**
 * Rating component localization configuration
 */
interface Rating {
  /** Aria label configurations */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration for Slovenian language
 */
interface SlovenianLocale {
  /** Text label for badge component */
  badge: string;
  /** Text label for close button */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer component translations */
  dataFooter: DataFooter;
  /** Date picker component translations */
  datePicker: DatePicker;
  /** Text shown when no data is available */
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

declare const slovenianLocale: SlovenianLocale;

export default slovenianLocale;