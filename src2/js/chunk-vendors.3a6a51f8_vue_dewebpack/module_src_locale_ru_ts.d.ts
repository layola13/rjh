/**
 * Russian (ru) locale configuration for Vuetify
 * Provides translations for common UI components and aria labels
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
 * Data table component localization
 */
interface DataTable {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Aria labels for sorting functionality */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by control */
  sortBy: string;
}

/**
 * Data iterator component localization
 */
interface DataIterator {
  /** Message shown when no results found */
  noResultsText: string;
  /** Message shown during data loading */
  loadingText: string;
}

/**
 * Data footer/pagination component localization
 */
interface DataFooter {
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
  /** Template for page range text, format: "{0}-{1} из {2}" */
  pageText: string;
}

/**
 * Date picker component localization
 */
interface DatePicker {
  /** Template for selected items count, format: "{0} выбран" */
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
 * Carousel aria label configuration
 */
interface CarouselAriaLabel {
  /** Template for slide position, format: "Слайд {0} из {1}" */
  delimiter: string;
}

/**
 * Carousel component localization
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
 * Calendar component localization
 */
interface Calendar {
  /** Template for additional events count, format: "Еще {0}" */
  moreEvents: string;
}

/**
 * File input component localization
 */
interface FileInput {
  /** Template for file count, format: "Файлов: {0}" */
  counter: string;
  /** Template for file count with size, format: "Файлов: {0} (всего {1})" */
  counterSize: string;
}

/**
 * Time picker component localization
 */
interface TimePicker {
  /** AM period label */
  am: string;
  /** PM period label */
  pm: string;
}

/**
 * Pagination aria label configuration
 */
interface PaginationAriaLabel {
  /** Label for pagination wrapper element */
  wrapper: string;
  /** Label for next page button */
  next: string;
  /** Label for previous page button */
  previous: string;
  /** Template for page navigation, format: "Перейти на страницу {0}" */
  page: string;
  /** Template for current page indicator, format: "Текущая страница, Страница {0}" */
  currentPage: string;
}

/**
 * Pagination component localization
 */
interface Pagination {
  /** Aria labels for pagination */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria label configuration
 */
interface RatingAriaLabel {
  /** Template for rating value, format: "Rating {0} of {1}" */
  icon: string;
}

/**
 * Rating component localization
 */
interface Rating {
  /** Aria labels for rating */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration for Russian language
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  /** Close button label */
  close: string;
  /** Data iterator localization */
  dataIterator: DataIterator;
  /** Data table localization */
  dataTable: DataTable;
  /** Data footer/pagination localization */
  dataFooter: DataFooter;
  /** Date picker localization */
  datePicker: DatePicker;
  /** Message shown when no data available */
  noDataText: string;
  /** Carousel component localization */
  carousel: Carousel;
  /** Calendar component localization */
  calendar: Calendar;
  /** File input component localization */
  fileInput: FileInput;
  /** Time picker component localization */
  timePicker: TimePicker;
  /** Pagination component localization */
  pagination: Pagination;
  /** Rating component localization */
  rating: Rating;
}

/**
 * Default export: Russian locale configuration object
 */
declare const ruLocale: VuetifyLocale;
export default ruLocale;