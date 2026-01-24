/**
 * Korean (ko) locale configuration for Vuetify
 * 
 * This module provides Korean translations for all Vuetify components
 * including data tables, pickers, pagination, and other UI elements.
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
  /** Label for activating no sort */
  activateNone: string;
  /** Label for activating descending sort */
  activateDescending: string;
  /** Label for activating ascending sort */
  activateAscending: string;
}

/**
 * Data table configuration
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for table interactions */
  ariaLabel: DataTableAriaLabel;
  /** Column sorting label */
  sortBy: string;
}

/**
 * Data iterator configuration for loading states
 */
interface DataIterator {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed during data loading */
  loadingText: string;
}

/**
 * Data footer/pagination controls configuration
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all" option */
  itemsPerPageAll: string;
  /** Next page button label */
  nextPage: string;
  /** Previous page button label */
  prevPage: string;
  /** First page button label */
  firstPage: string;
  /** Last page button label */
  lastPage: string;
  /** Page range text. Params: {0} = start, {1} = end, {2} = total */
  pageText: string;
}

/**
 * Date picker component configuration
 */
interface DatePicker {
  /** Text for selected items count. Params: {0} = count */
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
  /** Slide indicator text. Params: {0} = current, {1} = total */
  delimiter: string;
}

/**
 * Carousel component configuration
 */
interface Carousel {
  /** Previous slide button label */
  prev: string;
  /** Next slide button label */
  next: string;
  /** Accessibility labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component configuration
 */
interface Calendar {
  /** Text for "more events" indicator. Params: {0} = count */
  moreEvents: string;
}

/**
 * File input component configuration
 */
interface FileInput {
  /** File count text. Params: {0} = count */
  counter: string;
  /** File count with size text. Params: {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker component configuration
 */
interface TimePicker {
  /** AM (ante meridiem) label */
  am: string;
  /** PM (post meridiem) label */
  pm: string;
}

/**
 * Aria label configuration for pagination
 */
interface PaginationAriaLabel {
  /** Wrapper element label */
  wrapper: string;
  /** Next page button label */
  next: string;
  /** Previous page button label */
  previous: string;
  /** Go to page label. Params: {0} = page number */
  page: string;
  /** Current page label. Params: {0} = page number */
  currentPage: string;
}

/**
 * Pagination component configuration
 */
interface Pagination {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Rating icon label. Params: {0} = current, {1} = max */
  icon: string;
}

/**
 * Rating component configuration
 */
interface Rating {
  /** Accessibility labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Korean locale configuration for Vuetify
 * 
 * This interface defines all translatable strings used across
 * Vuetify components for Korean localization.
 */
interface KoreanLocale {
  /** Badge component label */
  badge: string;
  /** Close button label */
  close: string;
  /** Data iterator configuration */
  dataIterator: DataIterator;
  /** Data table configuration */
  dataTable: DataTable;
  /** Data footer configuration */
  dataFooter: DataFooter;
  /** Date picker configuration */
  datePicker: DatePicker;
  /** Empty state text */
  noDataText: string;
  /** Carousel configuration */
  carousel: Carousel;
  /** Calendar configuration */
  calendar: Calendar;
  /** File input configuration */
  fileInput: FileInput;
  /** Time picker configuration */
  timePicker: TimePicker;
  /** Pagination configuration */
  pagination: Pagination;
  /** Rating configuration */
  rating: Rating;
}

/**
 * Korean locale export
 */
declare const koreanLocale: KoreanLocale;

export default koreanLocale;