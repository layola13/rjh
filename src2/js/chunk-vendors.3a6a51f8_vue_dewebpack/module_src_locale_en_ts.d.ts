/**
 * English locale translations for Vuetify components
 * Provides all text strings and labels used throughout the UI framework
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
    /** Text shown while data is being loaded */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for rows per page selector */
    itemsPerPageText: string;
    
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label for descending sort state */
      sortDescending: string;
      /** ARIA label for ascending sort state */
      sortAscending: string;
      /** ARIA label for unsorted state */
      sortNone: string;
      /** ARIA label to remove sorting */
      activateNone: string;
      /** ARIA label to activate descending sort */
      activateDescending: string;
      /** ARIA label to activate ascending sort */
      activateAscending: string;
    };
    
    /** Label for sort by control */
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
    /** 
     * Page range text template
     * @param {0} - Start index
     * @param {1} - End index
     * @param {2} - Total count
     */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** 
     * Selected items count text
     * @param {0} - Number of selected items
     */
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
      /**
       * Slide position delimiter template
       * @param {0} - Current slide number
       * @param {1} - Total slides count
       */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /**
     * More events indicator text
     * @param {0} - Number of additional events
     */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /**
     * Files count text
     * @param {0} - Number of files
     */
    counter: string;
    /**
     * Files count with total size text
     * @param {0} - Number of files
     * @param {1} - Total size
     */
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
      /**
       * ARIA label for page button
       * @param {0} - Page number
       */
      page: string;
      /**
       * ARIA label for current page
       * @param {0} - Current page number
       */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /**
       * ARIA label for rating icon
       * @param {0} - Current rating value
       * @param {1} - Maximum rating value
       */
      icon: string;
    };
  };
}

/**
 * Default English locale export
 */
declare const englishLocale: VuetifyLocale;

export default englishLocale;