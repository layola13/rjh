/**
 * English locale translations for Vuetify components
 * Provides all text labels, aria labels, and user-facing strings in English
 */
declare module 'vuetify/src/locale/en' {
  /**
   * Locale configuration object for English (en) translations
   */
  interface VuetifyLocale {
    /** Badge component label */
    badge: string;
    
    /** Close button label */
    close: string;
    
    /** Data iterator component translations */
    dataIterator: {
      /** Message shown when no results match the search/filter criteria */
      noResultsText: string;
      /** Message displayed while data is being loaded */
      loadingText: string;
    };
    
    /** Data table component translations */
    dataTable: {
      /** Label for rows per page selector */
      itemsPerPageText: string;
      
      /** Accessibility labels for table sorting */
      ariaLabel: {
        /** Screen reader text when column is sorted in descending order */
        sortDescending: string;
        /** Screen reader text when column is sorted in ascending order */
        sortAscending: string;
        /** Screen reader text when column is not sorted */
        sortNone: string;
        /** Screen reader instruction to remove sorting */
        activateNone: string;
        /** Screen reader instruction to sort in descending order */
        activateDescending: string;
        /** Screen reader instruction to sort in ascending order */
        activateAscending: string;
      };
      
      /** Label for sort by control */
      sortBy: string;
    };
    
    /** Data table footer component translations */
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
      /** 
       * Pagination text template showing range and total
       * @example "1-10 of 100"
       * Placeholders: {0} = start index, {1} = end index, {2} = total count
       */
      pageText: string;
    };
    
    /** Date picker component translations */
    datePicker: {
      /** 
       * Template for selected items count
       * @example "3 selected"
       * Placeholder: {0} = number of items
       */
      itemsSelected: string;
      /** Accessibility label for next month navigation */
      nextMonthAriaLabel: string;
      /** Accessibility label for next year navigation */
      nextYearAriaLabel: string;
      /** Accessibility label for previous month navigation */
      prevMonthAriaLabel: string;
      /** Accessibility label for previous year navigation */
      prevYearAriaLabel: string;
    };
    
    /** Message shown when no data is available */
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
         * Template for slide position announcement
         * @example "Carousel slide 1 of 5"
         * Placeholders: {0} = current slide, {1} = total slides
         */
        delimiter: string;
      };
    };
    
    /** Calendar component translations */
    calendar: {
      /** 
       * Template for additional events indicator
       * @example "3 more"
       * Placeholder: {0} = number of additional events
       */
      moreEvents: string;
    };
    
    /** File input component translations */
    fileInput: {
      /** 
       * Template for file count
       * @example "5 files"
       * Placeholder: {0} = number of files
       */
      counter: string;
      /** 
       * Template for file count with total size
       * @example "5 files (2.5 MB in total)"
       * Placeholders: {0} = number of files, {1} = total size
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
        /** Label for pagination navigation wrapper */
        wrapper: string;
        /** Label for next page button */
        next: string;
        /** Label for previous page button */
        previous: string;
        /** 
         * Template for specific page button
         * @example "Goto Page 3"
         * Placeholder: {0} = page number
         */
        page: string;
        /** 
         * Template for current page indicator
         * @example "Current Page, Page 2"
         * Placeholder: {0} = page number
         */
        currentPage: string;
      };
    };
    
    /** Rating component translations */
    rating: {
      /** Accessibility labels for rating */
      ariaLabel: {
        /** 
         * Template for rating value announcement
         * @example "Rating 4 of 5"
         * Placeholders: {0} = current rating, {1} = maximum rating
         */
        icon: string;
      };
    };
  }

  /**
   * Default English locale export
   */
  const locale: VuetifyLocale;
  export default locale;
}