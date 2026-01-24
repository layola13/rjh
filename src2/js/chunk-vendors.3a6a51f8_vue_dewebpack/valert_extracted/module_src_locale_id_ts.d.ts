/**
 * Indonesian (Bahasa Indonesia) locale configuration for Vuetify
 * @module locale/id
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
    /** Text shown while loading data */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label for descending sort state */
      sortDescending: string;
      /** ARIA label for ascending sort state */
      sortAscending: string;
      /** ARIA label for unsorted state */
      sortNone: string;
      /** ARIA label to activate removing sort */
      activateNone: string;
      /** ARIA label to activate descending sort */
      activateDescending: string;
      /** ARIA label to activate ascending sort */
      activateAscending: string;
    };
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Label for "all items" option */
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
    /** ARIA label for next month button */
    nextMonthAriaLabel: string;
    /** ARIA label for next year button */
    nextYearAriaLabel: string;
    /** ARIA label for previous month button */
    prevMonthAriaLabel: string;
    /** ARIA label for previous year button */
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
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label template for slide position */
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
    /** File counter template */
    counter: string;
    /** File counter with size template */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM time period label */
    am: string;
    /** PM time period label */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label for pagination wrapper */
      wrapper: string;
      /** ARIA label for next page button */
      next: string;
      /** ARIA label for previous page button */
      previous: string;
      /** ARIA label template for page button */
      page: string;
      /** ARIA label template for current page */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label template for rating icon */
      icon: string;
    };
  };
}

/**
 * Indonesian locale configuration
 */
declare const indonesianLocale: VuetifyLocale;

export default indonesianLocale;