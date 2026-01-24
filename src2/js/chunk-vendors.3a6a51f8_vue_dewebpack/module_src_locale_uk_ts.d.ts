/**
 * Ukrainian (UK) locale translations for Vuetify components
 * Provides localized strings for various UI components including tables, pickers, pagination, etc.
 */
declare const ukLocale: {
  /** Badge component label */
  badge: string;
  
  /** Close button label */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Message displayed when no search results are found */
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
  
  /** Data footer/pagination component translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Label for "show all items" option */
    itemsPerPageAll: string;
    /** Next page button label */
    nextPage: string;
    /** Previous page button label */
    prevPage: string;
    /** First page button label */
    firstPage: string;
    /** Last page button label */
    lastPage: string;
    /** Page range text template: "{start}-{end} of {total}" */
    pageText: string;
  };
  
  /** Date picker component translations */
  datePicker: {
    /** Selected items count template: "{count} selected" */
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
      /** Slide position template: "Slide {current} of {total}" */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events indicator template: "More {count}" */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template: "{count} files" */
    counter: string;
    /** File count with size template: "{count} files ({size} total)" */
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
    /** Accessibility labels */
    ariaLabel: {
      /** Wrapper element label for screen readers */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Page button label template: "Go to page {number}" */
      page: string;
      /** Current page label template: "Current page, Page {number}" */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating value label template: "Rating {value} of {max}" */
      icon: string;
    };
  };
};

export default ukLocale;