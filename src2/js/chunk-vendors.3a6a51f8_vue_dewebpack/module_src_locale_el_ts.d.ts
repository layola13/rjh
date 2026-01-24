/**
 * Greek (Ελληνικά) locale configuration for Vuetify
 * @module locale/el
 */

/**
 * Locale translations and labels for Greek language
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
    /** Message displayed while items are loading */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Accessibility labels for table sorting */
    ariaLabel: {
      /** Label when sorted in descending order */
      sortDescending: string;
      /** Label when sorted in ascending order */
      sortAscending: string;
      /** Label when not sorted */
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
  
  /** Data footer (pagination) component translations */
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
    /** 
     * Page range text template
     * @example "{0}-{1} από {2}" becomes "1-10 από 100"
     * {0} = start index, {1} = end index, {2} = total items
     */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** 
     * Selected items count template
     * @example "{0} επιλεγμένα" becomes "5 επιλεγμένα"
     * {0} = number of selected items
     */
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
    /** Accessibility labels for carousel */
    ariaLabel: {
      /** 
       * Slide position template
       * @example "Carousel slide {0} of {1}" becomes "Carousel slide 1 of 5"
       * {0} = current slide, {1} = total slides
       */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** 
     * More events indicator template
     * @example "{0} ακόμη" becomes "3 ακόμη"
     * {0} = number of additional events
     */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** 
     * File count template
     * @example "{0} files" becomes "5 files"
     * {0} = number of files
     */
    counter: string;
    /** 
     * File count with total size template
     * @example "{0} files ({1} in total)" becomes "5 files (2.3 MB in total)"
     * {0} = number of files, {1} = total size
     */
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
    /** Accessibility labels for pagination */
    ariaLabel: {
      /** Wrapper accessibility label */
      wrapper: string;
      /** Next page button accessibility label */
      next: string;
      /** Previous page button accessibility label */
      previous: string;
      /** 
       * Go to page accessibility label template
       * @example "Πήγαινε στην σελίδα {0}" becomes "Πήγαινε στην σελίδα 5"
       * {0} = page number
       */
      page: string;
      /** 
       * Current page accessibility label template
       * @example "Τρέχουσα σελίδα, σελίδα {0}" becomes "Τρέχουσα σελίδα, σελίδα 3"
       * {0} = current page number
       */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels for rating */
    ariaLabel: {
      /** 
       * Rating value accessibility label template
       * @example "Rating {0} of {1}" becomes "Rating 4 of 5"
       * {0} = current rating, {1} = maximum rating
       */
      icon: string;
    };
  };
}

/**
 * Greek locale configuration object
 */
declare const greekLocale: VuetifyLocale;

export default greekLocale;