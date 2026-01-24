/**
 * Czech (cs) locale configuration for Vuetify
 * Provides translations and localized strings for all Vuetify components
 */

/**
 * Data iterator component locale strings
 */
interface DataIteratorLocale {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed while loading items */
  loadingText: string;
}

/**
 * ARIA labels for data table sorting
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
 * Data table component locale strings
 */
interface DataTableLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** ARIA labels for sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by column */
  sortBy: string;
}

/**
 * Data footer/pagination locale strings
 */
interface DataFooterLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Label for "show all" option */
  itemsPerPageAll: string;
  /** Label for next page button */
  nextPage: string;
  /** Label for previous page button */
  prevPage: string;
  /** Label for first page button */
  firstPage: string;
  /** Label for last page button */
  lastPage: string;
  /** Pagination info text template. {0} = start, {1} = end, {2} = total */
  pageText: string;
}

/**
 * Date picker component locale strings
 */
interface DatePickerLocale {
  /** Text showing number of selected items. {0} = count */
  itemsSelected: string;
  /** ARIA label for next month button */
  nextMonthAriaLabel: string;
  /** ARIA label for next year button */
  nextYearAriaLabel: string;
  /** ARIA label for previous month button */
  prevMonthAriaLabel: string;
  /** ARIA label for previous year button */
  prevYearAriaLabel: string;
}

/**
 * ARIA labels for carousel navigation
 */
interface CarouselAriaLabel {
  /** Delimiter template for slide position. {0} = current, {1} = total */
  delimiter: string;
}

/**
 * Carousel component locale strings
 */
interface CarouselLocale {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** ARIA labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component locale strings
 */
interface CalendarLocale {
  /** Text for showing more events. {0} = count */
  moreEvents: string;
}

/**
 * File input component locale strings
 */
interface FileInputLocale {
  /** Counter text for number of files. {0} = count */
  counter: string;
  /** Counter text with size. {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker component locale strings
 */
interface TimePickerLocale {
  /** AM period label */
  am: string;
  /** PM period label */
  pm: string;
}

/**
 * ARIA labels for pagination component
 */
interface PaginationAriaLabel {
  /** Label for pagination wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Label template for page button. {0} = page number */
  page: string;
  /** Label template for current page. {0} = page number */
  currentPage: string;
}

/**
 * Pagination component locale strings
 */
interface PaginationLocale {
  /** ARIA labels for pagination navigation */
  ariaLabel: PaginationAriaLabel;
}

/**
 * ARIA labels for rating component
 */
interface RatingAriaLabel {
  /** Label template for rating icon. {0} = current rating, {1} = max rating */
  icon: string;
}

/**
 * Rating component locale strings
 */
interface RatingLocale {
  /** ARIA labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration for Czech language
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  /** Close button label */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIteratorLocale;
  /** Data table component translations */
  dataTable: DataTableLocale;
  /** Data footer/pagination translations */
  dataFooter: DataFooterLocale;
  /** Date picker component translations */
  datePicker: DatePickerLocale;
  /** Text displayed when no data is available */
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
 * Czech locale configuration
 * Default export for Vuetify locale settings
 */
declare const czechLocale: VuetifyLocale;

export default czechLocale;