/**
 * Thai (th) locale configuration for Vuetify
 * @module locale/th
 */

/**
 * Vuetify locale definition interface
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
    /** Text shown while data is loading */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Items per page label text */
    itemsPerPageText: string;
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label for descending sort state */
      sortDescending: string;
      /** ARIA label for ascending sort state */
      sortAscending: string;
      /** ARIA label for no sort state */
      sortNone: string;
      /** ARIA label to activate no sort */
      activateNone: string;
      /** ARIA label to activate descending sort */
      activateDescending: string;
      /** ARIA label to activate ascending sort */
      activateAscending: string;
    };
    /** Sort by label text */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Items per page label text */
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
    /** Page range text template: {0}-{1} from {2} */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items text template: {0} days selected */
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
      /** ARIA label for slide delimiter: slide {0} of {1} */
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
    /** File counter text template: {0} files */
    counter: string;
    /** File counter with size text template: {0} files (total {1}) */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM label */
    am: string;
    /** PM label */
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
      /** ARIA label for page button template: go to page {0} */
      page: string;
      /** ARIA label for current page template: current page (page {0}) */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label for rating icon: Rating {0} of {1} */
      icon: string;
    };
  };
}

/**
 * Thai locale configuration
 */
declare const thLocale: VuetifyLocale;

export default thLocale;