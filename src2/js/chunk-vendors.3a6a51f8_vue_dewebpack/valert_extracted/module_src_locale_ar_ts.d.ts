/**
 * Arabic (ar) locale configuration for UI components
 * Provides translations and labels for various UI elements including tables, pickers, and navigation
 */
declare module 'locale/ar' {
  /**
   * Locale definition interface for Arabic language
   */
  interface ArLocale {
    /** Badge component label */
    badge: string;
    
    /** Close button text */
    close: string;
    
    /** Data iterator component translations */
    dataIterator: {
      /** Message displayed when no results are found */
      noResultsText: string;
      /** Loading state text */
      loadingText: string;
    };
    
    /** Data table component translations */
    dataTable: {
      /** Label for items per page selector */
      itemsPerPageText: string;
      
      /** ARIA labels for accessibility */
      ariaLabel: {
        /** Label for descending sort state */
        sortDescending: string;
        /** Label for ascending sort state */
        sortAscending: string;
        /** Label for unsorted state */
        sortNone: string;
        /** Label to remove sorting */
        activateNone: string;
        /** Label to activate descending sort */
        activateDescending: string;
        /** Label to activate ascending sort */
        activateAscending: string;
      };
      
      /** Sort by label text */
      sortBy: string;
    };
    
    /** Data footer/pagination component translations */
    dataFooter: {
      /** Label for items per page selector */
      itemsPerPageText: string;
      /** Option to show all items */
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
      /** ARIA label for next month navigation */
      nextMonthAriaLabel: string;
      /** ARIA label for next year navigation */
      nextYearAriaLabel: string;
      /** ARIA label for previous month navigation */
      prevMonthAriaLabel: string;
      /** ARIA label for previous year navigation */
      prevYearAriaLabel: string;
    };
    
    /** Message displayed when no data is available */
    noDataText: string;
    
    /** Carousel component translations */
    carousel: {
      /** Previous slide button text */
      prev: string;
      /** Next slide button text */
      next: string;
      
      /** ARIA labels for accessibility */
      ariaLabel: {
        /** Slide position template: "Carousel slide {0} of {1}" */
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
      /** AM (ante meridiem) label */
      am: string;
      /** PM (post meridiem) label */
      pm: string;
    };
    
    /** Pagination component translations */
    pagination: {
      /** ARIA labels for accessibility */
      ariaLabel: {
        /** Wrapper element label */
        wrapper: string;
        /** Next page button label */
        next: string;
        /** Previous page button label */
        previous: string;
        /** Go to page template: "Go to page {0}" */
        page: string;
        /** Current page indicator template: "Current page, Page {0}" */
        currentPage: string;
      };
    };
    
    /** Rating component translations */
    rating: {
      /** ARIA labels for accessibility */
      ariaLabel: {
        /** Rating value template: "Rating {0} of {1}" */
        icon: string;
      };
    };
  }

  /**
   * Arabic locale configuration object
   */
  const locale: ArLocale;
  
  export default locale;
}