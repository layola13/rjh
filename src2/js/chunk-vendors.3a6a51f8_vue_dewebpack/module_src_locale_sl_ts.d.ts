/**
 * Slovenian (Slovenščina) locale translations for Vuetify
 * @module locale/sl
 */

/**
 * Locale translation interface for Vuetify components
 */
export interface VuetifyLocale {
  /** Badge component translation */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text displayed when no results are found */
    noResultsText: string;
    /** Text displayed during data loading */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Accessibility labels for sorting */
    ariaLabel: {
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
    };
    /** Sort by column label */
    sortBy: string;
  };
  
  /** Data footer/pagination component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Option to show all items */
    itemsPerPageAll: string;
    /** Next page button text */
    nextPage: string;
    /** Previous page button text */
    prevPage: string;
    /** First page button text */
    firstPage: string;
    /** Last page button text */
    lastPage: string;
    /** Page range text template (e.g., "1-10 of 100") */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template */
    itemsSelected: string;
    /** Accessibility label for next month button */
    nextMonthAriaLabel: string;
    /** Accessibility label for next year button */
    nextYearAriaLabel: string;
    /** Accessibility label for previous month button */
    prevMonthAriaLabel: string;
    /** Accessibility label for previous year button */
    prevYearAriaLabel: string;
  };
  
  /** Text displayed when no data is available */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button text */
    prev: string;
    /** Next slide button text */
    next: string;
    /** Accessibility labels */
    ariaLabel: {
      /** Carousel slide position template (e.g., "slide 1 of 5") */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events indicator template */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template */
    counter: string;
    /** File count with total size template */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM (ante meridiem) label */
    am: string;
    /** PM (post meridiem) label */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** Accessibility labels */
    ariaLabel: {
      /** Wrapper element label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Go to page action label template */
      page: string;
      /** Current page indicator label template */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating value label template (e.g., "Rating 4 of 5") */
      icon: string;
    };
  };
}

/**
 * Slovenian locale configuration
 */
declare const locale: VuetifyLocale;

export default locale;