/**
 * Slovak (sk) locale translations for Vuetify components
 * @module locale/sk
 */

/**
 * Locale configuration interface for Slovak language
 */
interface SkLocale {
  /** Badge component label */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Message shown when no results are found */
    noResultsText: string;
    /** Loading state message */
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
      /** Label for unsorted state */
      sortNone: string;
      /** Label for activating no sort */
      activateNone: string;
      /** Label for activating descending sort */
      activateDescending: string;
      /** Label for activating ascending sort */
      activateAscending: string;
    };
    /** Sort by column label */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Label for showing all items */
    itemsPerPageAll: string;
    /** Next page button text */
    nextPage: string;
    /** Previous page button text */
    prevPage: string;
    /** First page button text */
    firstPage: string;
    /** Last page button text */
    lastPage: string;
    /** Page range text template: {0}–{1} of {2} */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template: {0} selected */
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
  
  /** Message shown when no data is available */
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
    /** More events indicator template: {0} more */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template: {0} files */
    counter: string;
    /** File count with size template: {0} files ({1} total) */
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
      /** Wrapper aria label */
      wrapper: string;
      /** Next page button aria label */
      next: string;
      /** Previous page button aria label */
      previous: string;
      /** Go to page aria label template: Go to page {0} */
      page: string;
      /** Current page aria label template: Current page, page {0} */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating icon aria label template: Rating {0} of {1} */
      icon: string;
    };
  };
}

/**
 * Slovak locale export
 */
declare const skLocale: SkLocale;

export default skLocale;