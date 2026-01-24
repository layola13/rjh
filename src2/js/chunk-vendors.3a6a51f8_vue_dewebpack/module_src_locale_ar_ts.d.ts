/**
 * Arabic (AR) locale configuration for Vuetify components
 * Contains translations and localized strings for UI components
 */
declare module '@/locale/ar' {
  /**
   * Locale configuration interface for Vuetify components
   */
  interface VuetifyLocale {
    /** Badge component label */
    badge: string;
    
    /** Close button label */
    close: string;
    
    /** Data iterator component translations */
    dataIterator: {
      /** Message displayed when no matching records are found */
      noResultsText: string;
      /** Loading indicator text */
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
        /** ARIA label to remove sorting */
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
      /** Previous slide button label */
      prev: string;
      /** Next slide button label */
      next: string;
      
      /** ARIA labels for accessibility */
      ariaLabel: {
        /** Slide indicator template: "Carousel slide {0} of {1}" */
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
        /** ARIA label for pagination wrapper */
        wrapper: string;
        /** ARIA label for next page button */
        next: string;
        /** ARIA label for previous page button */
        previous: string;
        /** ARIA label for page navigation template: "Go to page {0}" */
        page: string;
        /** ARIA label for current page template: "Current page, page {0}" */
        currentPage: string;
      };
    };
    
    /** Rating component translations */
    rating: {
      /** ARIA labels for accessibility */
      ariaLabel: {
        /** ARIA label for rating icon template: "Rating {0} of {1}" */
        icon: string;
      };
    };
  }

  /**
   * Default export containing Arabic locale configuration
   */
  const locale: VuetifyLocale;
  export default locale;
}