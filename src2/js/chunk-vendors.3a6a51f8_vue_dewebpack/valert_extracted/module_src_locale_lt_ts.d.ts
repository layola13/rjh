/**
 * Lithuanian (lt) locale translations for Vuetify components
 * @module locale/lt
 */

/**
 * Locale configuration interface for Lithuanian language
 */
export interface LithuanianLocale {
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
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** ARIA labels for table sorting */
    ariaLabel: {
      /** ARIA label for descending sort state */
      sortDescending: string;
      /** ARIA label for ascending sort state */
      sortAscending: string;
      /** ARIA label for unsorted state */
      sortNone: string;
      /** ARIA label for removing sort */
      activateNone: string;
      /** ARIA label for activating descending sort */
      activateDescending: string;
      /** ARIA label for activating ascending sort */
      activateAscending: string;
    };
    /** Sort by column label */
    sortBy: string;
  };
  
  /** Data footer/pagination component translations */
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
    /** Page range text template: "{0}-{1} iš {2}" where {0}=start, {1}=end, {2}=total */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template: "{0} pasirinkta" where {0}=count */
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
  
  /** Message displayed when no data is available */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous slide button label */
    prev: string;
    /** Next slide button label */
    next: string;
    /** ARIA labels for carousel */
    ariaLabel: {
      /** ARIA label template for slide delimiter: "Carousel slide {0} of {1}" */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events label template: "Daugiau {0}" where {0}=count */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File counter template: "{0} failų" where {0}=count */
    counter: string;
    /** File counter with size template: "{0} failų ({1} iš viso)" where {0}=count, {1}=totalSize */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** AM label for 12-hour format */
    am: string;
    /** PM label for 12-hour format */
    pm: string;
  };
  
  /** Pagination component translations */
  pagination: {
    /** ARIA labels for pagination */
    ariaLabel: {
      /** ARIA label for pagination wrapper */
      wrapper: string;
      /** ARIA label for next page button */
      next: string;
      /** ARIA label for previous page button */
      previous: string;
      /** ARIA label template for page button: "Eiti į puslapį {0}" where {0}=pageNumber */
      page: string;
      /** ARIA label template for current page: "Dabartinis puslapis, puslapis {0}" where {0}=pageNumber */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for rating */
    ariaLabel: {
      /** ARIA label template for rating icon: "Rating {0} of {1}" where {0}=current, {1}=max */
      icon: string;
    };
  };
}

/**
 * Lithuanian locale configuration
 * Default export containing all Lithuanian translations for Vuetify components
 */
declare const locale: LithuanianLocale;

export default locale;