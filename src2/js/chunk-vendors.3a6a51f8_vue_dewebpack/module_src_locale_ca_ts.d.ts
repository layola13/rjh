/**
 * Catalan (Català) locale configuration for Vuetify framework
 * Provides translations for common UI components and accessibility labels
 */

/**
 * Vuetify locale interface defining all translatable strings
 */
interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Message when no data is available */
    noResultsText: string;
    /** Loading state message */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Items per page selector label */
    itemsPerPageText: string;
    /** Accessibility labels for table sorting */
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
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Items per page selector label */
    itemsPerPageText: string;
    /** "All items" option text */
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
    /** Selected items count template: "{0} selected" */
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
  
  /** Generic "no data" message */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button text */
    prev: string;
    /** Next slide button text */
    next: string;
    /** Accessibility labels */
    ariaLabel: {
      /** Slide position template: "Slide {0} of {1}" */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events indicator template: "{0} more" */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template: "{0} files" */
    counter: string;
    /** File count with size template: "{0} files ({1} total)" */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM designator */
    am: string;
    /** PM designator */
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
      /** Go to page template: "Go to page {0}" */
      page: string;
      /** Current page indicator template: "Current page, page {0}" */
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
 * Catalan locale export
 */
declare const catalanLocale: VuetifyLocale;

export default catalanLocale;