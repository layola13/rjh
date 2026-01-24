/**
 * Hebrew (עברית) locale configuration for Vuetify
 * @module locale/he
 */

/**
 * Locale configuration interface for Vuetify components
 */
export interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text shown when no results are found */
    noResultsText: string;
    /** Text shown while loading items */
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
      /** Label to activate no sorting */
      activateNone: string;
      /** Label to activate descending sort */
      activateDescending: string;
      /** Label to activate ascending sort */
      activateAscending: string;
    };
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Text for "show all" option */
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
    /** Text template for selected items count */
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
  
  /** Text shown when no data is available */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button text */
    prev: string;
    /** Next slide button text */
    next: string;
    /** Accessibility labels */
    ariaLabel: {
      /** Slide position label template */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** Text template for additional events */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count text template */
    counter: string;
    /** File count with total size text template */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM (ante meridiem) text */
    am: string;
    /** PM (post meridiem) text */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** Accessibility labels */
    ariaLabel: {
      /** Navigation wrapper label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Go to page label template */
      page: string;
      /** Current page label template */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating value label template */
      icon: string;
    };
  };
}

/**
 * Hebrew locale configuration
 * Default export containing all Hebrew translations for Vuetify components
 */
declare const hebrewLocale: VuetifyLocale;

export default hebrewLocale;