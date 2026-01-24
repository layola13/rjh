/**
 * German (Deutsch) locale translation for Vuetify components
 * @module LocaleDE
 */

/**
 * Locale translation interface for Vuetify framework
 */
interface VuetifyLocale {
  /** Badge component translation */
  badge: string;
  
  /** Close action translation */
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
    /** ARIA labels for table sorting */
    ariaLabel: {
      /** ARIA label for descending sort state */
      sortDescending: string;
      /** ARIA label for ascending sort state */
      sortAscending: string;
      /** ARIA label for no sort state */
      sortNone: string;
      /** ARIA label for removing sort action */
      activateNone: string;
      /** ARIA label for descending sort action */
      activateDescending: string;
      /** ARIA label for ascending sort action */
      activateAscending: string;
    };
    /** Sort by label */
    sortBy: string;
  };
  
  /** Data footer component translations */
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
    /** Page range text template, format: "{start}-{end} of {total}" */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template, format: "{count} selected" */
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
  
  /** Text shown when no data is available */
  noDataText: string;
  
  /** Carousel component translations */
  carousel: {
    /** Previous item button label */
    prev: string;
    /** Next item button label */
    next: string;
    /** ARIA labels for carousel */
    ariaLabel: {
      /** Delimiter ARIA label template, format: "Item {current} of {total}" */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events label template, format: "{count} more" */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File counter template, format: "{count} files" */
    counter: string;
    /** File counter with size template, format: "{count} files ({size} total)" */
    counterSize: string;
  };
  
  /** Time picker component translations */
  timePicker: {
    /** Ante meridiem label */
    am: string;
    /** Post meridiem label */
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
      /** ARIA label for page button template, format: "Go to page {page}" */
      page: string;
      /** ARIA label for current page template, format: "Current page, page {page}" */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** ARIA labels for rating */
    ariaLabel: {
      /** ARIA label for rating icon template, format: "Rating {current} of {total}" */
      icon: string;
    };
  };
}

/**
 * German locale configuration for Vuetify
 */
declare const locale: VuetifyLocale;

export default locale;