/**
 * Romanian (ro) locale configuration for Vuetify
 * @module LocaleRo
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
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by functionality */
  sortBy: string;
}

/**
 * Data iterator localization strings
 */
interface DataIterator {
  /** Message shown when no results match the search */
  noResultsText: string;
  /** Message shown while items are loading */
  loadingText: string;
}

/**
 * Data footer (pagination) localization strings
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
  /** Template for page range text, format: "{0}-{1} din {2}" */
  pageText: string;
}

/**
 * Date picker localization strings
 */
interface DatePicker {
  /** Template for selected items count, format: "{0} selectate" */
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
  /** Template for carousel slide indicator, format: "Carousel slide {0} of {1}" */
  delimiter: string;
}

/**
 * Carousel localization strings
 */
interface Carousel {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Aria labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar localization strings
 */
interface Calendar {
  /** Template for "more events" indicator, format: "{0} mai mult" */
  moreEvents: string;
}

/**
 * File input localization strings
 */
interface FileInput {
  /** Template for file count, format: "{0} files" */
  counter: string;
  /** Template for file count with total size, format: "{0} files ({1} in total)" */
  counterSize: string;
}

/**
 * Time picker localization strings
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
  /** Template for page navigation, format: "Mergi la pagina {0}" */
  page: string;
  /** Template for current page indicator, format: "Pagina curentă, pagina {0}" */
  currentPage: string;
}

/**
 * Pagination localization strings
 */
interface Pagination {
  /** Aria labels for pagination controls */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating value, format: "Rating {0} of {1}" */
  icon: string;
}

/**
 * Rating component localization strings
 */
interface Rating {
  /** Aria labels for rating icons */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Romanian locale configuration for Vuetify components
 */
interface VuetifyLocaleRo {
  /** Label for badge component */
  badge: string;
  /** Label for close button */
  close: string;
  /** Data iterator component translations */
  dataIterator: DataIterator;
  /** Data table component translations */
  dataTable: DataTable;
  /** Data footer (pagination) translations */
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
 * Default export: Romanian locale configuration
 */
declare const roLocale: VuetifyLocaleRo;

export default roLocale;