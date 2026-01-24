/**
 * Dutch (nl) locale configuration for Vuetify
 * Nederlandse taalconfiguratie voor Vuetify
 */

/**
 * Aria label configuration for data table sorting
 * Aria-labelconfiguratie voor het sorteren van datatabel
 */
interface DataTableAriaLabel {
  /** Label when sorted in descending order / Label bij aflopende sortering */
  sortDescending: string;
  /** Label when sorted in ascending order / Label bij oplopende sortering */
  sortAscending: string;
  /** Label when not sorted / Label wanneer niet gesorteerd */
  sortNone: string;
  /** Label to activate to remove sorting / Label om sortering te verwijderen */
  activateNone: string;
  /** Label to activate descending sort / Label om aflopend te sorteren */
  activateDescending: string;
  /** Label to activate ascending sort / Label om oplopend te sorteren */
  activateAscending: string;
}

/**
 * Data table configuration
 * Datatabelconfiguratie
 */
interface DataTable {
  /** Text for items per page selector / Tekst voor aantal items per pagina */
  itemsPerPageText: string;
  /** Aria labels for accessibility / Aria-labels voor toegankelijkheid */
  ariaLabel: DataTableAriaLabel;
  /** Text for sort by control / Tekst voor sorteercontrole */
  sortBy: string;
}

/**
 * Data iterator configuration for loading and empty states
 * Data-iteratorconfiguratie voor laad- en lege toestanden
 */
interface DataIterator {
  /** Text shown when no results match the query / Tekst getoond wanneer geen resultaten overeenkomen */
  noResultsText: string;
  /** Text shown while loading items / Tekst getoond tijdens het laden */
  loadingText: string;
}

/**
 * Data footer pagination configuration
 * Datafooterpaginatieconfiguratie
 */
interface DataFooter {
  /** Text for items per page selector / Tekst voor aantal items per pagina */
  itemsPerPageText: string;
  /** Text for "show all" option / Tekst voor "toon alles" optie */
  itemsPerPageAll: string;
  /** Next page button text / Volgende pagina knoptekst */
  nextPage: string;
  /** Previous page button text / Vorige pagina knoptekst */
  prevPage: string;
  /** First page button text / Eerste pagina knoptekst */
  firstPage: string;
  /** Last page button text / Laatste pagina knoptekst */
  lastPage: string;
  /** Page range text with placeholders {0}-{1} of {2} / Paginabereiktekst met placeholders */
  pageText: string;
}

/**
 * Date picker configuration
 * Datumselectorconfiguratie
 */
interface DatePicker {
  /** Text for selected items count with placeholder {0} / Tekst voor aantal geselecteerde items */
  itemsSelected: string;
  /** Aria label for next month button / Aria-label voor volgende maand knop */
  nextMonthAriaLabel: string;
  /** Aria label for next year button / Aria-label voor volgend jaar knop */
  nextYearAriaLabel: string;
  /** Aria label for previous month button / Aria-label voor vorige maand knop */
  prevMonthAriaLabel: string;
  /** Aria label for previous year button / Aria-label voor vorig jaar knop */
  prevYearAriaLabel: string;
}

/**
 * Carousel aria label configuration
 * Carousel aria-labelconfiguratie
 */
interface CarouselAriaLabel {
  /** Delimiter text with placeholders {0} of {1} / Scheidingstekst met placeholders */
  delimiter: string;
}

/**
 * Carousel navigation configuration
 * Carouselnavigatieconfiguratie
 */
interface Carousel {
  /** Previous slide button text / Vorige dia knoptekst */
  prev: string;
  /** Next slide button text / Volgende dia knoptekst */
  next: string;
  /** Aria labels for accessibility / Aria-labels voor toegankelijkheid */
  ariaLabel: CarouselAriaLabel;
}

/**
 * Calendar configuration
 * Kalenderconfiguratie
 */
interface Calendar {
  /** Text for "more events" with placeholder {0} / Tekst voor "meer evenementen" */
  moreEvents: string;
}

/**
 * File input configuration
 * Bestandsinvoerconfiguratie
 */
interface FileInput {
  /** Counter text with placeholder {0} / Tellertekst met placeholder */
  counter: string;
  /** Counter text with size, placeholders {0} and {1} / Tellertekst met grootte */
  counterSize: string;
}

/**
 * Time picker configuration
 * Tijdselectorconfiguratie
 */
interface TimePicker {
  /** AM (ante meridiem) text / AM-tekst */
  am: string;
  /** PM (post meridiem) text / PM-tekst */
  pm: string;
}

/**
 * Pagination aria label configuration
 * Paginering aria-labelconfiguratie
 */
interface PaginationAriaLabel {
  /** Wrapper aria label / Wrapper aria-label */
  wrapper: string;
  /** Next page aria label / Volgende pagina aria-label */
  next: string;
  /** Previous page aria label / Vorige pagina aria-label */
  previous: string;
  /** Go to page aria label with placeholder {0} / Ga naar pagina aria-label */
  page: string;
  /** Current page aria label with placeholder {0} / Huidige pagina aria-label */
  currentPage: string;
}

/**
 * Pagination configuration
 * Pagineringconfiguratie
 */
interface Pagination {
  /** Aria labels for accessibility / Aria-labels voor toegankelijkheid */
  ariaLabel: PaginationAriaLabel;
}

/**
 * Rating aria label configuration
 * Beoordeling aria-labelconfiguratie
 */
interface RatingAriaLabel {
  /** Icon aria label with placeholders {0} of {1} / Pictogram aria-label */
  icon: string;
}

/**
 * Rating configuration
 * Beoordelingconfiguratie
 */
interface Rating {
  /** Aria labels for accessibility / Aria-labels voor toegankelijkheid */
  ariaLabel: RatingAriaLabel;
}

/**
 * Complete Dutch locale configuration for Vuetify components
 * Volledige Nederlandse taalconfiguratie voor Vuetify-componenten
 */
interface DutchLocale {
  /** Badge component text / Badge-componenttekst */
  badge: string;
  /** Close button text / Sluitknoptekst */
  close: string;
  /** Data iterator configuration / Data-iteratorconfiguratie */
  dataIterator: DataIterator;
  /** Data table configuration / Datatabelconfiguratie */
  dataTable: DataTable;
  /** Data footer configuration / Datafooterconfiguratie */
  dataFooter: DataFooter;
  /** Date picker configuration / Datumselectorconfiguratie */
  datePicker: DatePicker;
  /** Text shown when no data is available / Tekst getoond wanneer geen gegevens beschikbaar zijn */
  noDataText: string;
  /** Carousel configuration / Carouselconfiguratie */
  carousel: Carousel;
  /** Calendar configuration / Kalenderconfiguratie */
  calendar: Calendar;
  /** File input configuration / Bestandsinvoerconfiguratie */
  fileInput: FileInput;
  /** Time picker configuration / Tijdselectorconfiguratie */
  timePicker: TimePicker;
  /** Pagination configuration / Pagineringconfiguratie */
  pagination: Pagination;
  /** Rating configuration / Beoordelingconfiguratie */
  rating: Rating;
}

/**
 * Default export: Dutch locale object
 * Standaardexport: Nederlands taalobject
 */
declare const dutchLocale: DutchLocale;

export default dutchLocale;