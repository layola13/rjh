/**
 * Russian (ru) locale configuration for Vuetify
 * Contains translations for all Vuetify components and accessibility labels
 */

/**
 * Locale configuration interface for Vuetify internationalization
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  
  /** Close button label */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text shown when no results are found */
    noResultsText: string;
    /** Text shown while data is loading */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Accessibility labels for table sorting */
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
  
  /** Data footer/pagination component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Label for "all items" option */
    itemsPerPageAll: string;
    /** Next page button label */
    nextPage: string;
    /** Previous page button label */
    prevPage: string;
    /** First page button label */
    firstPage: string;
    /** Last page button label */
    lastPage: string;
    /** Page range text template: "{0}-{1} of {2}" */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template: "{0} selected" */
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
    /** Previous slide button label */
    prev: string;
    /** Next slide button label */
    next: string;
    /** Accessibility labels */
    ariaLabel: {
      /** Slide position template: "Slide {0} of {1}" */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events label template: "{0} more" */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template: "{0} files" */
    counter: string;
    /** File count with size template: "{0} files (total {1})" */
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
      /** Page button label template: "Go to page {0}" */
      page: string;
      /** Current page label template: "Current page, Page {0}" */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating label template: "Rating {0} of {1}" */
      icon: string;
    };
  };
}

/**
 * Default export: Russian locale configuration
 */
declare const ruLocale: VuetifyLocale;

export default ruLocale;