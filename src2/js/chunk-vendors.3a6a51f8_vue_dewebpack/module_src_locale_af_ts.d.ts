/**
 * Afrikaans (af) locale configuration for Vuetify
 * @module AfrikaansLocale
 */

/**
 * Vuetify locale configuration interface
 */
export interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text shown when no results match the search criteria */
    noResultsText: string;
    /** Text shown while items are being loaded */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label when sorted in descending order */
      sortDescending: string;
      /** ARIA label when sorted in ascending order */
      sortAscending: string;
      /** ARIA label when not sorted */
      sortNone: string;
      /** ARIA label for action to remove sorting */
      activateNone: string;
      /** ARIA label for action to sort descending */
      activateDescending: string;
      /** ARIA label for action to sort ascending */
      activateAscending: string;
    };
    
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Option text for showing all items */
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
    /** Text showing number of items selected */
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
    /** Text for showing more events */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** Text showing number of files selected */
    counter: string;
    /** Text showing number of files and total size */
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
 * Afrikaans locale configuration
 */
declare const afrikaansLocale: VuetifyLocale;

export default afrikaansLocale;