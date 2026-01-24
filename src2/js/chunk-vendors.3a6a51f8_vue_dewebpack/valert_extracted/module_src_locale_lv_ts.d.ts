/**
 * Latvian (lv) locale configuration for Vuetify components
 * Provides translations and localized text for all Vuetify UI components
 */

/**
 * Vuetify locale definition interface
 * Defines the complete structure for component translations
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
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
    /** Accessibility labels for table operations */
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
    /** Sort by column label */
    sortBy: string;
  };
  
  /** Data footer (pagination) component translations */
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
    /** Page range text template: "{0}-{1} of {2}" */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count text template: "{0} selected" */
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
      /** Slide position label template: "Carousel slide {0} of {1}" */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events text template: "{0} more" */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count text template: "{0} files" */
    counter: string;
    /** File count with size text template: "{0} files ({1} in total)" */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM period text */
    am: string;
    /** PM period text */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** Accessibility labels */
    ariaLabel: {
      /** Wrapper navigation label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Go to page label template: "Go to page {0}" */
      page: string;
      /** Current page label template: "Current page, page {0}" */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating icon label template: "Rating {0} of {1}" */
      icon: string;
    };
  };
}

/**
 * Latvian locale configuration
 * Default export for Vuetify locale support
 */
declare const latvianLocale: VuetifyLocale;

export default latvianLocale;