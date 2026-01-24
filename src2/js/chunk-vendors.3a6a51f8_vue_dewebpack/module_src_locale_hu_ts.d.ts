/**
 * Hungarian (hu) locale translations for Vuetify component library
 * Provides localized strings for various UI components including data tables,
 * pickers, pagination, and other interactive elements.
 */

/**
 * Locale configuration interface for Vuetify components
 */
export interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  
  /** Close button label */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Message displayed when no results are found */
    noResultsText: string;
    /** Loading state message */
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
      /** Label for action to remove sorting */
      activateNone: string;
      /** Label for action to activate descending sort */
      activateDescending: string;
      /** Label for action to activate ascending sort */
      activateAscending: string;
    };
    
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data table footer component translations */
  dataFooter: {
    /** Items per page selector label */
    itemsPerPageText: string;
    /** Option to show all items */
    itemsPerPageAll: string;
    /** Next page button label */
    nextPage: string;
    /** Previous page button label */
    prevPage: string;
    /** First page button label */
    firstPage: string;
    /** Last page button label */
    lastPage: string;
    /** Page information text template: "{start}-{end} / {total}" */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items counter template: "{count} selected" */
    itemsSelected: string;
    /** ARIA label for next month navigation */
    nextMonthAriaLabel: string;
    /** ARIA label for next year navigation */
    nextYearAriaLabel: string;
    /** ARIA label for previous month navigation */
    prevMonthAriaLabel: string;
    /** ARIA label for previous year navigation */
    prevYearAriaLabel: string;
  };
  
  /** Message displayed when no data is available */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button label */
    prev: string;
    /** Next slide button label */
    next: string;
    
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Slide position template: "Slide {current}/{total}" */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** Additional events indicator template: "{count} more" */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File counter template: "{count} files" */
    counter: string;
    /** File counter with size template: "{count} files ({size} total)" */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** Ante meridiem (AM) label */
    am: string;
    /** Post meridiem (PM) label */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Wrapper element label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Go to page action template: "Go to page {number}" */
      page: string;
      /** Current page indicator template: "Current page: {number}" */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** Rating value template: "Rating {value} of {max}" */
      icon: string;
    };
  };
}

/**
 * Hungarian locale configuration
 * Default export for Vuetify locale settings
 */
declare const huLocale: VuetifyLocale;

export default huLocale;