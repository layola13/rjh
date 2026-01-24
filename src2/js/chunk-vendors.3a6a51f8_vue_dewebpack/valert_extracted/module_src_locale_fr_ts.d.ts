/**
 * French (fr) locale configuration for Vuetify
 * Contains all translation strings for UI components
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text shown when no results match the search */
    noResultsText: string;
    /** Text shown while loading items */
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
      /** Label to activate no sort */
      activateNone: string;
      /** Label to activate descending sort */
      activateDescending: string;
      /** Label to activate ascending sort */
      activateAscending: string;
    };
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data footer (pagination) translations */
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
    /** Page range text template: {0}-{1} of {2} */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template: {0} selected */
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
      /** Slide indicator template: Slide {0} of {1} */
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
    /** File count template: {0} file(s) */
    counter: string;
    /** File count with size template: {0} file(s) ({1} total) */
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
      /** Wrapper element label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Page button label template: Go to page {0} */
      page: string;
      /** Current page label template: Current page, Page {0} */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating icon label template: Rating {0} of {1} */
      icon: string;
    };
  };
}

/**
 * French locale export
 */
declare const frLocale: VuetifyLocale;
export default frLocale;