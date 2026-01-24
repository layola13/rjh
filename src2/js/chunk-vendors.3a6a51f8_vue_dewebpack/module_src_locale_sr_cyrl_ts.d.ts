/**
 * Serbian (Cyrillic) locale configuration for Vuetify framework
 * @module LocaleSrCyrl
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
    /** ARIA labels for accessibility */
    ariaLabel: {
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
    /** Page range text template: {0}-{1} of {2} */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template: {0} selected */
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
      /** Carousel slide delimiter template: slide {0} of {1} */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events text template: {0} more */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File counter template: {0} files */
    counter: string;
    /** File counter with size template: {0} files ({1} total) */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM period label */
    am: string;
    /** PM period label */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Wrapper ARIA label */
      wrapper: string;
      /** Next page ARIA label */
      next: string;
      /** Previous page ARIA label */
      previous: string;
      /** Go to page ARIA label template: go to page {0} */
      page: string;
      /** Current page ARIA label template: current page, page {0} */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Rating icon ARIA label template: rating {0} of {1} */
      icon: string;
    };
  };
}

/**
 * Serbian (Cyrillic) locale configuration
 * Default export for Vuetify locale plugin
 */
declare const srCyrl: VuetifyLocale;

export default srCyrl;