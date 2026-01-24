/**
 * Norwegian (Bokmål) locale for Vuetify components
 * Provides translations for all UI components and their accessibility labels
 */

/**
 * Data iterator component translations
 */
interface DataIteratorLocale {
  /** Message displayed when no matching items are found */
  noResultsText: string;
  /** Message displayed while items are being loaded */
  loadingText: string;
}

/**
 * Data table sorting accessibility labels
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
 * Data table component translations
 */
interface DataTableLocale {
  /** Label for rows per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for sorting states */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by column header */
  sortBy: string;
}

/**
 * Data footer/pagination component translations
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
  /** Template for page range text. Placeholders: {0} = start index, {1} = end index, {2} = total count */
  pageText: string;
}

/**
 * Date picker component translations
 */
interface DatePickerLocale {
  /** Template for selected items count. Placeholder: {0} = count */
  itemsSelected: string;
  /** Accessibility label for next month navigation */
  nextMonthAriaLabel: string;
  /** Accessibility label for next year navigation */
  nextYearAriaLabel: string;
  /** Accessibility label for previous month navigation */
  prevMonthAriaLabel: string;
  /** Accessibility label for previous year navigation */
  prevYearAriaLabel: string;
}

/**
 * Carousel accessibility labels
 */
interface CarouselAriaLabel {
  /** Template for slide indicator. Placeholders: {0} = current slide, {1} = total slides */
  delimiter: string;
}

/**
 * Carousel component translations
 */
interface CarouselLocale {
  /** Label for previous slide button */
  prev: string;
  /** Label for next slide button */
  next: string;
  /** Accessibility labels */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component translations
 */
interface CalendarLocale {
  /** Template for additional events indicator. Placeholder: {0} = count */
  moreEvents: string;
}

/**
 * File input component translations
 */
interface FileInputLocale {
  /** Template for file count. Placeholder: {0} = count */
  counter: string;
  /** Template for file count with total size. Placeholders: {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker component translations
 */
interface TimePickerLocale {
  /** Label for AM (ante meridiem) */
  am: string;
  /** Label for PM (post meridiem) */
  pm: string;
}

/**
 * Pagination accessibility labels
 */
interface PaginationAriaLabel {
  /** Label for pagination navigation wrapper */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page button. Placeholder: {0} = page number */
  page: string;
  /** Template for current page indicator. Placeholder: {0} = page number */
  currentPage: string;
}

/**
 * Pagination component translations
 */
interface PaginationLocale {
  /** Accessibility labels */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating accessibility labels
 */
interface RatingAriaLabel {
  /** Template for rating icon. Placeholders: {0} = current rating, {1} = maximum rating */
  icon: string;
}

/**
 * Rating component translations
 */
interface RatingLocale {
  /** Accessibility labels */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Norwegian (Bokmål) locale definition for Vuetify
 */
interface NorwegianLocale {
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

declare const norwegianLocale: NorwegianLocale;
export default norwegianLocale;