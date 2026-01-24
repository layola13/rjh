/**
 * Hebrew (עברית) locale translations for Vuetify components
 * @module he
 */

/**
 * Locale configuration interface for Vuetify framework
 */
export interface VuetifyLocale {
  /** Badge component text */
  badge: string;
  
  /** Close button text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text displayed when no results are found */
    noResultsText: string;
    /** Text displayed while loading items */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label for descending sort state */
      sortDescending: string;
      /** ARIA label for ascending sort state */
      sortAscending: string;
      /** ARIA label for unsorted state */
      sortNone: string;
      /** ARIA label to activate no sorting */
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
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Text for "all items" option */
    itemsPerPageAll: string;
    /** Next page button text */
    nextPage: string;
    /** Previous page button text */
    prevPage: string;
    /** First page button text */
    firstPage: string;
    /** Last page button text */
    lastPage: string;
    /** 
     * Page range text template
     * @example "{0}-{1} of {2}" where {0}=start, {1}=end, {2}=total
     */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** 
     * Selected items count text template
     * @example "{0} selected" where {0}=count
     */
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
  
  /** Text displayed when no data is available */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button text */
    prev: string;
    /** Next slide button text */
    next: string;
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** 
       * ARIA label for slide delimiter template
       * @example "Carousel slide {0} of {1}" where {0}=current, {1}=total
       */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** 
     * More events indicator text template
     * @example "{0} more" where {0}=count
     */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** 
     * File count text template
     * @example "{0} files" where {0}=count
     */
    counter: string;
    /** 
     * File count with size text template
     * @example "{0} files ({1} total)" where {0}=count, {1}=size
     */
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
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** ARIA label for pagination wrapper */
      wrapper: string;
      /** ARIA label for next page button */
      next: string;
      /** ARIA label for previous page button */
      previous: string;
      /** 
       * ARIA label for page navigation template
       * @example "Go to page {0}" where {0}=page number
       */
      page: string;
      /** 
       * ARIA label for current page template
       * @example "Current page, Page {0}" where {0}=page number
       */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for accessibility */
    ariaLabel: {
      /** 
       * ARIA label for rating icon template
       * @example "Rating {0} of {1}" where {0}=current rating, {1}=max rating
       */
      icon: string;
    };
  };
}

/**
 * Hebrew locale configuration for Vuetify
 */
declare const hebrewLocale: VuetifyLocale;

export default hebrewLocale;