/**
 * Finnish (fi) locale configuration for Vuetify
 * Contains all translations and localized text for Finnish language support
 */

/**
 * Aria label configuration for data table sorting
 */
interface DataTableAriaLabel {
  /** Aria label for descending sort state */
  sortDescending: string;
  /** Aria label for ascending sort state */
  sortAscending: string;
  /** Aria label for unsorted state */
  sortNone: string;
  /** Aria label for deactivating sort */
  activateNone: string;
  /** Aria label for activating descending sort */
  activateDescending: string;
  /** Aria label for activating ascending sort */
  activateAscending: string;
}

/**
 * Data table localization configuration
 */
interface DataTable {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for table sorting actions */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by control */
  sortBy: string;
}

/**
 * Data iterator localization configuration
 */
interface DataIterator {
  /** Text displayed when no results are found */
  noResultsText: string;
  /** Text displayed while loading items */
  loadingText: string;
}

/**
 * Data footer localization configuration
 */
interface DataFooter {
  /** Text for items per page selector */
  itemsPerPageText: string;
  /** Text for "show all" option */
  itemsPerPageAll: string;
  /** Text for next page button */
  nextPage: string;
  /** Text for previous page button */
  prevPage: string;
  /** Text for first page button */
  firstPage: string;
  /** Text for last page button */
  lastPage: string;
  /** Template for page range text. Format: "{0}-{1} ({2})" where {0}=start, {1}=end, {2}=total */
  pageText: string;
}

/**
 * Date picker localization configuration
 */
interface DatePicker {
  /** Template for selected items count. Format: "{0} valittu" where {0}=count */
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
  /** Template for carousel slide indicator. Format: "Slide {0}/{1}" where {0}=current, {1}=total */
  delimiter: string;
}

/**
 * Carousel localization configuration
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
 * Calendar localization configuration
 */
interface Calendar {
  /** Template for "more events" indicator. Format: "{0} more" where {0}=count */
  moreEvents: string;
}

/**
 * File input localization configuration
 */
interface FileInput {
  /** Template for file count. Format: "{0} files" where {0}=count */
  counter: string;
  /** Template for file count with size. Format: "{0} files ({1} total)" where {0}=count, {1}=size */
  counterSize: string;
}

/**
 * Time picker localization configuration
 */
interface TimePicker {
  /** Text for AM (ante meridiem) */
  am: string;
  /** Text for PM (post meridiem) */
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
  /** Template for page button. Format: "Goto Page {0}" where {0}=page number */
  page: string;
  /** Template for current page. Format: "Current Page, Page {0}" where {0}=page number */
  currentPage: string;
}

/**
 * Pagination localization configuration
 */
interface Pagination {
  /** Aria labels for pagination controls */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Aria label configuration for rating component
 */
interface RatingAriaLabel {
  /** Template for rating icon. Format: "Rating {0} of {1}" where {0}=current, {1}=max */
  icon: string;
}

/**
 * Rating component localization configuration
 */
interface Rating {
  /** Aria labels for rating icons */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Finnish locale configuration interface
 */
export interface FinnishLocale {
  /** Text for badge component */
  badge: string;
  /** Text for close button */
  close: string;
  /** Data iterator translations */
  dataIterator: DataIterator;
  /** Data table translations */
  dataTable: DataTable;
  /** Data footer translations */
  dataFooter: DataFooter;
  /** Date picker translations */
  datePicker: DatePicker;
  /** Text displayed when no data is available */
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
 * Finnish locale configuration object
 */
declare const finnishLocale: FinnishLocale;

export default finnishLocale;