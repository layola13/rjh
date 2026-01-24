/**
 * Polish (pl) locale configuration for Vuetify
 * Contains translations and localized text for various Vuetify components
 */

/**
 * Data table sorting aria label configuration
 */
interface DataTableSortAriaLabel {
  /** Aria label for descending sort state */
  sortDescending: string;
  /** Aria label for ascending sort state */
  sortAscending: string;
  /** Aria label for no sort state */
  sortNone: string;
  /** Aria label for action to remove sorting */
  activateNone: string;
  /** Aria label for action to activate descending sort */
  activateDescending: string;
  /** Aria label for action to activate ascending sort */
  activateAscending: string;
}

/**
 * Data table configuration
 */
interface DataTableLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for sorting functionality */
  ariaLabel: DataTableSortAriaLabel;
  /** Label for sort by column header */
  sortBy: string;
}

/**
 * Data iterator configuration
 */
interface DataIteratorLocale {
  /** Message displayed when no results match the search */
  noResultsText: string;
  /** Message displayed while data is loading */
  loadingText: string;
}

/**
 * Data footer/pagination configuration
 */
interface DataFooterLocale {
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
  /** Template for page range text. Placeholders: {0} = start, {1} = end, {2} = total */
  pageText: string;
}

/**
 * Date picker configuration
 */
interface DatePickerLocale {
  /** Template for selected items count. Placeholder: {0} = count */
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
 * Carousel aria label configuration
 */
interface CarouselAriaLabel {
  /** Template for slide indicator. Placeholders: {0} = current slide, {1} = total slides */
  delimiter: string;
}

/**
 * Carousel component configuration
 */
interface CarouselLocale {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Aria labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component configuration
 */
interface CalendarLocale {
  /** Template for "more events" indicator. Placeholder: {0} = count */
  moreEvents: string;
}

/**
 * File input component configuration
 */
interface FileInputLocale {
  /** Template for file counter. Placeholder: {0} = file count */
  counter: string;
  /** Template for file counter with size. Placeholders: {0} = file count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker component configuration
 */
interface TimePickerLocale {
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
  /** Template for page button aria label. Placeholder: {0} = page number */
  page: string;
  /** Template for current page aria label. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination component configuration
 */
interface PaginationLocale {
  /** Aria labels for pagination controls */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria label configuration
 */
interface RatingAriaLabel {
  /** Template for rating icon aria label. Placeholders: {0} = current rating, {1} = max rating */
  icon: string;
}

/**
 * Rating component configuration
 */
interface RatingLocale {
  /** Aria labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration structure
 */
interface VuetifyLocale {
  /** Label for badge component */
  badge: string;
  /** Label for close button */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIteratorLocale;
  /** Data table component translations */
  dataTable: DataTableLocale;
  /** Data footer/pagination translations */
  dataFooter: DataFooterLocale;
  /** Date picker component translations */
  datePicker: DatePickerLocale;
  /** Message displayed when no data is available */
  noDataText: string;
  /** Carousel component translations */
  carousel: CarouselLocale;
  /** Calendar component translations */
  calendar: CalendarLocale;
  /** File input component translations */
  fileInput: FileInputLocale;
  /** Time picker component translations */
  timePicker: TimePickerLocale;
  /** Pagination component translations */
  pagination: PaginationLocale;
  /** Rating component translations */
  rating: RatingLocale;
}

/**
 * Polish locale configuration
 * Default export containing all Polish translations for Vuetify components
 */
declare const polishLocale: VuetifyLocale;

export default polishLocale;