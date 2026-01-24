/**
 * Croatian (hr) locale configuration for Vuetify
 * Provides translations and localized text for all Vuetify components
 */

/**
 * Locale configuration interface defining all translatable strings
 * used across Vuetify components
 */
interface VuetifyLocale {
  /** Badge component label */
  badge: string;
  
  /** Close button/dialog text */
  close: string;
  
  /** Data iterator component translations */
  dataIterator: {
    /** Text shown when no results match the filter */
    noResultsText: string;
    /** Text shown while data is loading */
    loadingText: string;
  };
  
  /** Data table component translations */
  dataTable: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Accessibility labels for sorting */
    ariaLabel: {
      /** Announced when column is sorted descending */
      sortDescending: string;
      /** Announced when column is sorted ascending */
      sortAscending: string;
      /** Announced when column is not sorted */
      sortNone: string;
      /** Instructions to remove sorting */
      activateNone: string;
      /** Instructions to sort descending */
      activateDescending: string;
      /** Instructions to sort ascending */
      activateAscending: string;
    };
    /** Sort by column label */
    sortBy: string;
  };
  
  /** Data table footer translations */
  dataFooter: {
    /** Label for items per page selector */
    itemsPerPageText: string;
    /** Option to show all items */
    itemsPerPageAll: string;
    /** Next page button label */
    nextPage: string;
    /** Previous page button label */
    prevPage: string;
    /** First page button label */
    firstPage: string;
    /** Last page button label */
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
    /** Previous slide button label */
    prev: string;
    /** Next slide button label */
    next: string;
    /** Accessibility labels */
    ariaLabel: {
      /** Slide position template: Carousel slide {0} of {1} */
      delimiter: string;
    };
  };
  
  /** Calendar component translations */
  calendar: {
    /** More events indicator template: More {0} */
    moreEvents: string;
  };
  
  /** File input component translations */
  fileInput: {
    /** File count template: {0} files selected */
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
      /** Navigation wrapper label */
      wrapper: string;
      /** Next page button label */
      next: string;
      /** Previous page button label */
      previous: string;
      /** Go to page template: Go to page {0} */
      page: string;
      /** Current page template: Current page, page {0} */
      currentPage: string;
    };
  };
  
  /** Rating component translations */
  rating: {
    /** Accessibility labels */
    ariaLabel: {
      /** Rating value template: Rating {0} of {1} */
      icon: string;
    };
  };
}

/**
 * Croatian locale configuration
 * Default export for use with Vuetify's internationalization system
 */
declare const locale: VuetifyLocale;

export default locale;