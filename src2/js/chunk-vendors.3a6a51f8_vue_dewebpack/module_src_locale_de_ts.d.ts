/**
 * German (de) locale translations for Vuetify components
 * Contains all UI text strings and aria labels in German language
 */
declare const locale: VuetifyLocale;

export default locale;

/**
 * Vuetify locale configuration interface
 * Defines the structure for internationalization of all Vuetify components
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  
  /** Close button/action label */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: DataIteratorLocale;
  
  /** Data table component translations */
  dataTable: DataTableLocale;
  
  /** Data table footer translations */
  dataFooter: DataFooterLocale;
  
  /** Date picker component translations */
  datePicker: DatePickerLocale;
  
  /** No data available message */
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
 * Data iterator component locale strings
 */
interface DataIteratorLocale {
  /** Message shown when no results are found */
  noResultsText: string;
  
  /** Loading state message */
  loadingText: string;
}

/**
 * Data table component locale strings
 */
interface DataTableLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  
  /** Accessibility labels for sorting functionality */
  ariaLabel: DataTableAriaLabels;
  
  /** Sort by label */
  sortBy: string;
}

/**
 * Accessibility labels for data table sorting
 */
interface DataTableAriaLabels {
  /** Label when sorted in descending order */
  sortDescending: string;
  
  /** Label when sorted in ascending order */
  sortAscending: string;
  
  /** Label when not sorted */
  sortNone: string;
  
  /** Label for action to remove sorting */
  activateNone: string;
  
  /** Label for action to sort descending */
  activateDescending: string;
  
  /** Label for action to sort ascending */
  activateAscending: string;
}

/**
 * Data table footer locale strings
 */
interface DataFooterLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  
  /** Label for "all items" option */
  itemsPerPageAll: string;
  
  /** Next page button label */
  nextPage: string;
  
  /** Previous page button label */
  prevPage: string;
  
  /** First page button label */
  firstPage: string;
  
  /** Last page button label */
  lastPage: string;
  
  /** Page range text template. {0}: start index, {1}: end index, {2}: total count */
  pageText: string;
}

/**
 * Date picker component locale strings
 */
interface DatePickerLocale {
  /** Template for selected items count. {0}: number of items */
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
 * Carousel component locale strings
 */
interface CarouselLocale {
  /** Previous slide button label */
  prev: string;
  
  /** Next slide button label */
  next: string;
  
  /** Accessibility labels */
  ariaLabel: CarouselAriaLabels;
}

/**
 * Carousel accessibility labels
 */
interface CarouselAriaLabels {
  /** Delimiter aria label template. {0}: current item, {1}: total items */
  delimiter: string;
}

/**
 * Calendar component locale strings
 */
interface CalendarLocale {
  /** Template for "more events" indicator. {0}: number of additional events */
  moreEvents: string;
}

/**
 * File input component locale strings
 */
interface FileInputLocale {
  /** File counter template. {0}: number of files */
  counter: string;
  
  /** File counter with size template. {0}: number of files, {1}: total size */
  counterSize: string;
}

/**
 * Time picker component locale strings
 */
interface TimePickerLocale {
  /** AM (ante meridiem) label */
  am: string;
  
  /** PM (post meridiem) label */
  pm: string;
}

/**
 * Pagination component locale strings
 */
interface PaginationLocale {
  /** Accessibility labels */
  ariaLabel: PaginationAriaLabels;
}

/**
 * Pagination accessibility labels
 */
interface PaginationAriaLabels {
  /** Wrapper element aria label */
  wrapper: string;
  
  /** Next page button aria label */
  next: string;
  
  /** Previous page button aria label */
  previous: string;
  
  /** Page button aria label template. {0}: page number */
  page: string;
  
  /** Current page aria label template. {0}: page number */
  currentPage: string;
}

/**
 * Rating component locale strings
 */
interface RatingLocale {
  /** Accessibility labels */
  ariaLabel: RatingAriaLabels;
}

/**
 * Rating accessibility labels
 */
interface RatingAriaLabels {
  /** Icon aria label template. {0}: current rating, {1}: maximum rating */
  icon: string;
}