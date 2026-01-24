/**
 * Portuguese (pt) locale translations for Vuetify components
 * Provides localized strings for various UI components including data tables,
 * pickers, pagination, and other common interface elements.
 */
declare module '@/locale/pt' {
  /**
   * Data iterator component locale configuration
   */
  interface DataIteratorLocale {
    /** Message displayed when no results are found */
    noResultsText: string;
    /** Message displayed while loading items */
    loadingText: string;
  }

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
    /** Label for action to activate descending sort */
    activateDescending: string;
    /** Label for action to activate ascending sort */
    activateAscending: string;
  }

  /**
   * Data table component locale configuration
   */
  interface DataTableLocale {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Accessibility labels for sorting actions */
    ariaLabel: DataTableAriaLabel;
    /** Label for sort by functionality */
    sortBy: string;
  }

  /**
   * Data footer component locale configuration
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
    /** Template for page range text, format: "{0}-{1} de {2}" where {0}=start, {1}=end, {2}=total */
    pageText: string;
  }

  /**
   * Date picker component locale configuration
   */
  interface DatePickerLocale {
    /** Template for selected items count, format: "{0} selecionado(s)" where {0}=count */
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
   * Aria label configuration for carousel component
   */
  interface CarouselAriaLabel {
    /** Template for slide position, format: "Slide {0} de {1} do carrossel" where {0}=current, {1}=total */
    delimiter: string;
  }

  /**
   * Carousel component locale configuration
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
   * Calendar component locale configuration
   */
  interface CalendarLocale {
    /** Template for "more events" link, format: "Mais {0}" where {0}=count */
    moreEvents: string;
  }

  /**
   * File input component locale configuration
   */
  interface FileInputLocale {
    /** Template for file count, format: "{0} arquivo(s)" where {0}=count */
    counter: string;
    /** Template for file count with size, format: "{0} arquivo(s) ({1} no total)" where {0}=count, {1}=size */
    counterSize: string;
  }

  /**
   * Time picker component locale configuration
   */
  interface TimePickerLocale {
    /** Label for AM period */
    am: string;
    /** Label for PM period */
    pm: string;
  }

  /**
   * Aria label configuration for pagination component
   */
  interface PaginationAriaLabel {
    /** Label for pagination wrapper element */
    wrapper: string;
    /** Label for next page button */
    next: string;
    /** Label for previous page button */
    previous: string;
    /** Template for page navigation, format: "Ir à página {0}" where {0}=page number */
    page: string;
    /** Template for current page indicator, format: "Página atual, página {0}" where {0}=page number */
    currentPage: string;
  }

  /**
   * Pagination component locale configuration
   */
  interface PaginationLocale {
    /** Accessibility labels for pagination controls */
    ariaLabel: PaginationAriaLabel;
  }

  /**
   * Aria label configuration for rating component
   */
  interface RatingAriaLabel {
    /** Template for rating value, format: "Rating {0} of {1}" where {0}=current rating, {1}=max rating */
    icon: string;
  }

  /**
   * Rating component locale configuration
   */
  interface RatingLocale {
    /** Accessibility labels for rating icons */
    ariaLabel: RatingAriaLabel;
  }

  /**
   * Complete Portuguese locale configuration object
   */
  interface PortugueseLocale {
    /** Label for badge component */
    badge: string;
    /** Label for close action */
    close: string;
    /** Data iterator translations */
    dataIterator: DataIteratorLocale;
    /** Data table translations */
    dataTable: DataTableLocale;
    /** Data footer (pagination footer) translations */
    dataFooter: DataFooterLocale;
    /** Date picker translations */
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

  const locale: PortugueseLocale;
  export default locale;
}