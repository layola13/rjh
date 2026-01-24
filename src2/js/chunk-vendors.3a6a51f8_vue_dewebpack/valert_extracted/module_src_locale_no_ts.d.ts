/**
 * Norwegian (Bokmål) locale configuration for Vuetify
 * @module locale/no
 */

/**
 * Data iterator pagination configuration
 */
interface DataIteratorLocale {
  /** Text displayed when no results match the search criteria */
  noResultsText: string;
  /** Text displayed while items are being loaded */
  loadingText: string;
}

/**
 * Data table aria-label configuration for sorting
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
 * Data table configuration
 */
interface DataTableLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for table sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by column header */
  sortBy: string;
}

/**
 * Data footer/pagination configuration
 */
interface DataFooterLocale {
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
  /** 
   * Template for page range text
   * @example "{0}-{1} av {2}" where {0}=start, {1}=end, {2}=total
   */
  pageText: string;
}

/**
 * Date picker configuration
 */
interface DatePickerLocale {
  /** 
   * Template for selected items count
   * @example "{0} valgt" where {0}=count
   */
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
 * Carousel aria-label configuration
 */
interface CarouselAriaLabel {
  /** 
   * Template for carousel slide label
   * @example "Karusellbilde {0} av {1}" where {0}=current, {1}=total
   */
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
  /** Accessibility labels for carousel */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component configuration
 */
interface CalendarLocale {
  /** 
   * Template for "more events" indicator
   * @example "{0} flere" where {0}=count
   */
  moreEvents: string;
}

/**
 * File input component configuration
 */
interface FileInputLocale {
  /** 
   * Template for file count
   * @example "{0} filer" where {0}=count
   */
  counter: string;
  /** 
   * Template for file count with total size
   * @example "{0} filer ({1} totalt)" where {0}=count, {1}=size
   */
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
 * Pagination aria-label configuration
 */
interface PaginationAriaLabel {
  /** Label for pagination wrapper element */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** 
   * Template for page navigation button
   * @example "Gå til side {0}" where {0}=page number
   */
  page: string;
  /** 
   * Template for current page indicator
   * @example "Gjeldende side, side {0}" where {0}=page number
   */
  currentPage: string;
}

/**
 * Pagination component configuration
 */
interface PaginationLocale {
  /** Accessibility labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria-label configuration
 */
interface RatingAriaLabel {
  /** 
   * Template for rating icon accessibility label
   * @example "Rating {0} of {1}" where {0}=current, {1}=max
   */
  icon: string;
}

/**
 * Rating component configuration
 */
interface RatingLocale {
  /** Accessibility labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Norwegian locale definition for Vuetify components
 */
export interface NorwegianLocale {
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
 * Norwegian (Bokmål) locale object
 */
declare const norwegianLocale: NorwegianLocale;

export default norwegianLocale;