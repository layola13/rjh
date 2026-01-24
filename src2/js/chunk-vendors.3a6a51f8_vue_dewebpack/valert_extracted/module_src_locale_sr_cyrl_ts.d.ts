/**
 * Serbian (Cyrillic) locale for Vuetify
 * @module sr-Cyrl
 */

/**
 * Vuetify locale configuration interface
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text displayed when no results are found */
    noResultsText: string;
    /** Text displayed while loading items */
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
      /** Label for no sort state */
      sortNone: string;
      /** Label to activate removing sort */
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
    /** Page text template: {0}-{1} of {2} */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items text template: {0} selected */
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
      /** Slide delimiter template: slide {0} of {1} */
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
    /** File counter with size template: {0} files ({1} in total) */
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
    /** Accessibility labels */
    ariaLabel: {
      /** Wrapper accessibility label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Go to page label template: {0} */
      page: string;
      /** Current page label template: {0} */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating icon label template: {0} of {1} */
      icon: string;
    };
  };
}

/**
 * Serbian (Cyrillic) locale object
 */
declare const srCyrl: VuetifyLocale;

export default srCyrl;