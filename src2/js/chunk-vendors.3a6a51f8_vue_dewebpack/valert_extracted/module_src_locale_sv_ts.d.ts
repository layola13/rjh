/**
 * Swedish (sv) locale configuration for Vuetify
 * 
 * Provides Swedish translations for all Vuetify component labels,
 * aria-labels, and user-facing text strings.
 * 
 * @module locale/sv
 */

/**
 * Vuetify locale definition interface
 * Defines the structure for all translatable strings in Vuetify components
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
    /** Accessibility labels for sorting */
    ariaLabel: {
      /** Label for descending sort state */
      sortDescending: string;
      /** Label for ascending sort state */
      sortAscending: string;
      /** Label for no sort state */
      sortNone: string;
      /** Label for action to remove sorting */
      activateNone: string;
      /** Label for action to sort descending */
      activateDescending: string;
      /** Label for action to sort ascending */
      activateAscending: string;
    };
    /** Sort by column header text */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Text for "show all items" option */
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
    /** Aria label for next month button */
    nextMonthAriaLabel: string;
    /** Aria label for next year button */
    nextYearAriaLabel: string;
    /** Aria label for previous month button */
    prevMonthAriaLabel: string;
    /** Aria label for previous year button */
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
    /** More events indicator text template: "{0} more" */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count text template: "{0} files" */
    counter: string;
    /** File count with size text template: "{0} files (of {1} total)" */
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
      /** Wrapper element label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Page button label template: "Go to page {0}" */
      page: string;
      /** Current page label template: "Current page, page {0}" */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating value label template: "Rating {0} of {1}" */
      icon: string;
    };
  };
}

/**
 * Swedish locale configuration
 * Default export for Swedish translations
 */
declare const swedishLocale: VuetifyLocale;

export default swedishLocale;