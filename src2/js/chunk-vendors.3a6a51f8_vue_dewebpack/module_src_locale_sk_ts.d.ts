/**
 * Slovak (sk) locale configuration for Vuetify components
 * @module locale/sk
 */

/**
 * Locale translation interface for Slovak language
 */
interface SkLocale {
  /** Badge component label */
  badge: string;
  
  /** Close action label */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Message displayed when no results are found */
    noResultsText: string;
    /** Message displayed while loading items */
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
      /** Label for activating no sort */
      activateNone: string;
      /** Label for activating descending sort */
      activateDescending: string;
      /** Label for activating ascending sort */
      activateAscending: string;
    };
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data footer component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Label for showing all items */
    itemsPerPageAll: string;
    /** Next page button label */
    nextPage: string;
    /** Previous page button label */
    prevPage: string;
    /** First page button label */
    firstPage: string;
    /** Last page button label */
    lastPage: string;
    /** Page range text template. {0} = start, {1} = end, {2} = total */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template. {0} = count */
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
  
  /** Message displayed when no data is available */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button label */
    prev: string;
    /** Next slide button label */
    next: string;
    /** Accessibility labels */
    ariaLabel: {
      /** Slide position template. {0} = current, {1} = total */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events label template. {0} = count */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template. {0} = count */
    counter: string;
    /** File count with size template. {0} = count, {1} = total size */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM time period label */
    am: string;
    /** PM time period label */
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
      /** Page button label template. {0} = page number */
      page: string;
      /** Current page label template. {0} = page number */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating icon label template. {0} = current rating, {1} = max rating */
      icon: string;
    };
  };
}

/**
 * Slovak locale configuration object
 */
declare const skLocale: SkLocale;

export default skLocale;