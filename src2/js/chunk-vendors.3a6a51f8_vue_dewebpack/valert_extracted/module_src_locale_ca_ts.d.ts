/**
 * Catalan (ca) locale configuration for Vuetify
 * @module locale/ca
 */

/**
 * Vuetify locale interface definition
 */
export interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text displayed when no results are available */
    noResultsText: string;
    /** Text displayed while loading data */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Items per page selector label */
    itemsPerPageText: string;
    
    /** ARIA labels for accessibility */
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
    /** Items per page selector label */
    itemsPerPageText: string;
    /** Show all items option text */
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
    /** Next month button ARIA label */
    nextMonthAriaLabel: string;
    /** Next year button ARIA label */
    nextYearAriaLabel: string;
    /** Previous month button ARIA label */
    prevMonthAriaLabel: string;
    /** Previous year button ARIA label */
    prevYearAriaLabel: string;
  };
  
  /** No data available text */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button text */
    prev: string;
    /** Next slide button text */
    next: string;
    
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Slide position template: Slide {0} of {1} */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events indicator template: {0} more */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template: {0} files */
    counter: string;
    /** File count with size template: {0} files ({1} in total) */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM (ante meridiem) indicator */
    am: string;
    /** PM (post meridiem) indicator */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Pagination wrapper ARIA label */
      wrapper: string;
      /** Next page button ARIA label */
      next: string;
      /** Previous page button ARIA label */
      previous: string;
      /** Go to page button ARIA label template: Go to page {0} */
      page: string;
      /** Current page ARIA label template: Current page, page {0} */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Rating icon ARIA label template: Rating {0} of {1} */
      icon: string;
    };
  };
}

/**
 * Catalan locale object
 */
declare const catalanLocale: VuetifyLocale;

export default catalanLocale;