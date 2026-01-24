/**
 * Estonian (et) locale configuration for Vuetify
 * Eesti keele tõlked Vuetify komponentidele
 */

/**
 * Data iterator component translations
 */
interface DataIteratorLocale {
  /** Text displayed when no matching records are found */
  noResultsText: string;
  /** Text displayed while data is being loaded */
  loadingText: string;
}

/**
 * Data table ARIA label translations for accessibility
 */
interface DataTableAriaLabel {
  /** Label for descending sort state */
  sortDescending: string;
  /** Label for ascending sort state */
  sortAscending: string;
  /** Label for unsorted state */
  sortNone: string;
  /** Instruction to remove sorting */
  activateNone: string;
  /** Instruction to sort descending */
  activateDescending: string;
  /** Instruction to sort ascending */
  activateAscending: string;
}

/**
 * Data table component translations
 */
interface DataTableLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** ARIA labels for sorting states */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by column */
  sortBy: string;
}

/**
 * Data footer (pagination) component translations
 */
interface DataFooterLocale {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Label for "show all items" option */
  itemsPerPageAll: string;
  /** Next page button label */
  nextPage: string;
  /** Previous page button label */
  prevPage: string;
  /** First page button label */
  firstPage: string;
  /** Last page button label */
  lastPage: string;
  /** Page range text template: "{0}-{1} of {2}" */
  pageText: string;
}

/**
 * Date picker component translations
 */
interface DatePickerLocale {
  /** Selected items count template: "{0} selected" */
  itemsSelected: string;
  /** ARIA label for next month navigation */
  nextMonthAriaLabel: string;
  /** ARIA label for next year navigation */
  nextYearAriaLabel: string;
  /** ARIA label for previous month navigation */
  prevMonthAriaLabel: string;
  /** ARIA label for previous year navigation */
  prevYearAriaLabel: string;
}

/**
 * Carousel ARIA label translations for accessibility
 */
interface CarouselAriaLabel {
  /** Carousel slide position template: "Carousel slide {0} of {1}" */
  delimiter: string;
}

/**
 * Carousel component translations
 */
interface CarouselLocale {
  /** Previous slide button label */
  prev: string;
  /** Next slide button label */
  next: string;
  /** ARIA labels for carousel navigation */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component translations
 */
interface CalendarLocale {
  /** More events indicator template: "{0} more" */
  moreEvents: string;
}

/**
 * File input component translations
 */
interface FileInputLocale {
  /** File count template: "{0} files" */
  counter: string;
  /** File count with size template: "{0} files (total {1})" */
  counterSize: string;
}

/**
 * Time picker component translations
 */
interface TimePickerLocale {
  /** AM period label */
  am: string;
  /** PM period label */
  pm: string;
}

/**
 * Pagination ARIA label translations for accessibility
 */
interface PaginationAriaLabel {
  /** ARIA label for pagination wrapper */
  wrapper: string;
  /** Next page button ARIA label */
  next: string;
  /** Previous page button ARIA label */
  previous: string;
  /** Go to page ARIA label template: "Go to page {0}" */
  page: string;
  /** Current page ARIA label template: "Current page, page {0}" */
  currentPage: string;
}

/**
 * Pagination component translations
 */
interface PaginationLocale {
  /** ARIA labels for pagination navigation */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating ARIA label translations for accessibility
 */
interface RatingAriaLabel {
  /** Rating value ARIA label template: "Rating {0} of {1}" */
  icon: string;
}

/**
 * Rating component translations
 */
interface RatingLocale {
  /** ARIA labels for rating component */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Vuetify locale configuration interface
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  /** Close button label */
  close: string;
  /** Data iterator translations */
  dataIterator: DataIteratorLocale;
  /** Data table translations */
  dataTable: DataTableLocale;
  /** Data footer translations */
  dataFooter: DataFooterLocale;
  /** Date picker translations */
  datePicker: DatePickerLocale;
  /** No data available message */
  noDataText: string;
  /** Carousel translations */
  carousel: CarouselLocale;
  /** Calendar translations */
  calendar: CalendarLocale;
  /** File input translations */
  fileInput: FileInputLocale;
  /** Time picker translations */
  timePicker: TimePickerLocale;
  /** Pagination translations */
  pagination: PaginationLocale;
  /** Rating translations */
  rating: RatingLocale;
}

/**
 * Estonian locale configuration object
 */
declare const estonianLocale: VuetifyLocale;

export default estonianLocale;