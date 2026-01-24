/**
 * Finnish (fi) locale configuration for Vuetify
 * Suomenkielinen lokalisointitiedosto Vuetify-komponenteille
 */

/**
 * Data table sorting and pagination labels
 * Taulukkonäkymän lajittelu- ja sivutustekstit
 */
interface DataTableAriaLabel {
  /** Label for descending sort state */
  sortDescending: string;
  /** Label for ascending sort state */
  sortAscending: string;
  /** Label for unsorted state */
  sortNone: string;
  /** Label to activate no sorting */
  activateNone: string;
  /** Label to activate descending sort */
  activateDescending: string;
  /** Label to activate ascending sort */
  activateAscending: string;
}

interface DataTable {
  /** Label for items per page selector */
  itemsPerPageText: string;
  /** Accessibility labels for sorting */
  ariaLabel: DataTableAriaLabel;
  /** Label for sort by column */
  sortBy: string;
}

/**
 * Data iterator configuration
 * Datan iteraattorin asetukset
 */
interface DataIterator {
  /** Text shown when no results found */
  noResultsText: string;
  /** Text shown during loading */
  loadingText: string;
}

/**
 * Data footer pagination controls
 * Alatunnisteen sivutuskontrollit
 */
interface DataFooter {
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
  /** Page range text template with placeholders {0}-{1} of {2} */
  pageText: string;
}

/**
 * Date picker component labels
 * Päivämäärävalitsimen tekstit
 */
interface DatePicker {
  /** Text for selected items count, {0} = count */
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
 * Carousel component labels
 * Karusellikomponentin tekstit
 */
interface CarouselAriaLabel {
  /** Delimiter text for slide position, {0} = current, {1} = total */
  delimiter: string;
}

interface Carousel {
  /** Previous slide button label */
  prev: string;
  /** Next slide button label */
  next: string;
  /** Accessibility labels */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar component labels
 * Kalenterikomponentin tekstit
 */
interface Calendar {
  /** Text for additional events indicator, {0} = count */
  moreEvents: string;
}

/**
 * File input component labels
 * Tiedostojen syöttökentän tekstit
 */
interface FileInput {
  /** Text for file count, {0} = count */
  counter: string;
  /** Text for file count with size, {0} = count, {1} = total size */
  counterSize: string;
}

/**
 * Time picker component labels
 * Aikavalitsimen tekstit
 */
interface TimePicker {
  /** AM (ante meridiem) label */
  am: string;
  /** PM (post meridiem) label */
  pm: string;
}

/**
 * Pagination component accessibility labels
 * Sivutuskomponentin saavutettavuustekstit
 */
interface PaginationAriaLabel {
  /** Wrapper element label */
  wrapper: string;
  /** Next page button label */
  next: string;
  /** Previous page button label */
  previous: string;
  /** Page button label template, {0} = page number */
  page: string;
  /** Current page indicator label, {0} = page number */
  currentPage: string;
}

interface Pagination {
  /** Accessibility labels */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating component accessibility labels
 * Arvostelukomponentin saavutettavuustekstit
 */
interface RatingAriaLabel {
  /** Icon label template, {0} = current rating, {1} = max rating */
  icon: string;
}

interface Rating {
  /** Accessibility labels */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Finnish locale configuration for Vuetify
 * Vuetifyn täydellinen suomenkielinen lokalisointiasetukset
 */
export interface FinnishLocale {
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
  /** Text shown when no data available */
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
 * Finnish locale object for Vuetify components
 * Suomenkielinen lokalisointiobjekti Vuetify-komponenteille
 */
declare const finnishLocale: FinnishLocale;

export default finnishLocale;