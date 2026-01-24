/**
 * French (fr) locale configuration for Vuetify
 * Contains all translated strings for UI components
 */
declare const frLocale: {
  /**
   * Badge component translations
   */
  badge: string;

  /**
   * Close button text
   */
  close: string;

  /**
   * Data iterator component translations
   */
  dataIterator: {
    /**
     * Message displayed when no matching records are found
     */
    noResultsText: string;

    /**
     * Loading indicator text
     */
    loadingText: string;
  };

  /**
   * Data table component translations
   */
  dataTable: {
    /**
     * Label for items per page selector
     */
    itemsPerPageText: string;

    /**
     * ARIA labels for accessibility
     */
    ariaLabel: {
      /**
       * ARIA label for descending sort state
       */
      sortDescending: string;

      /**
       * ARIA label for ascending sort state
       */
      sortAscending: string;

      /**
       * ARIA label for unsorted state
       */
      sortNone: string;

      /**
       * ARIA label to activate removal of sorting
       */
      activateNone: string;

      /**
       * ARIA label to activate descending sort
       */
      activateDescending: string;

      /**
       * ARIA label to activate ascending sort
       */
      activateAscending: string;
    };

    /**
     * Sort by label
     */
    sortBy: string;
  };

  /**
   * Data table footer translations
   */
  dataFooter: {
    /**
     * Label for items per page selector
     */
    itemsPerPageText: string;

    /**
     * Option to show all items
     */
    itemsPerPageAll: string;

    /**
     * Next page button text
     */
    nextPage: string;

    /**
     * Previous page button text
     */
    prevPage: string;

    /**
     * First page button text
     */
    firstPage: string;

    /**
     * Last page button text
     */
    lastPage: string;

    /**
     * Page range text template
     * Format: "{0}-{1} de {2}" where {0} is start, {1} is end, {2} is total
     */
    pageText: string;
  };

  /**
   * Date picker component translations
   */
  datePicker: {
    /**
     * Selected items count template
     * Format: "{0} sélectionné(s)" where {0} is the count
     */
    itemsSelected: string;

    /**
     * ARIA label for next month button
     */
    nextMonthAriaLabel: string;

    /**
     * ARIA label for next year button
     */
    nextYearAriaLabel: string;

    /**
     * ARIA label for previous month button
     */
    prevMonthAriaLabel: string;

    /**
     * ARIA label for previous year button
     */
    prevYearAriaLabel: string;
  };

  /**
   * Message displayed when no data is available
   */
  noDataText: string;

  /**
   * Carousel component translations
   */
  carousel: {
    /**
     * Previous slide button text
     */
    prev: string;

    /**
     * Next slide button text
     */
    next: string;

    /**
     * ARIA labels for accessibility
     */
    ariaLabel: {
      /**
       * ARIA label for slide position
       * Format: "Diapositive {0} de {1}" where {0} is current, {1} is total
       */
      delimiter: string;
    };
  };

  /**
   * Calendar component translations
   */
  calendar: {
    /**
     * More events indicator template
     * Format: "{0} de plus" where {0} is the count
     */
    moreEvents: string;
  };

  /**
   * File input component translations
   */
  fileInput: {
    /**
     * File count template
     * Format: "{0} fichier(s)" where {0} is the count
     */
    counter: string;

    /**
     * File count with size template
     * Format: "{0} fichier(s) ({1} au total)" where {0} is count, {1} is total size
     */
    counterSize: string;
  };

  /**
   * Time picker component translations
   */
  timePicker: {
    /**
     * AM (ante meridiem) label
     */
    am: string;

    /**
     * PM (post meridiem) label
     */
    pm: string;
  };

  /**
   * Pagination component translations
   */
  pagination: {
    /**
     * ARIA labels for accessibility
     */
    ariaLabel: {
      /**
       * ARIA label for pagination wrapper
       */
      wrapper: string;

      /**
       * ARIA label for next page button
       */
      next: string;

      /**
       * ARIA label for previous page button
       */
      previous: string;

      /**
       * ARIA label for page button template
       * Format: "Aller à la page {0}" where {0} is the page number
       */
      page: string;

      /**
       * ARIA label for current page template
       * Format: "Page actuelle, Page {0}" where {0} is the page number
       */
      currentPage: string;
    };
  };

  /**
   * Rating component translations
   */
  rating: {
    /**
     * ARIA labels for accessibility
     */
    ariaLabel: {
      /**
       * ARIA label for rating icon template
       * Format: "Rating {0} of {1}" where {0} is current rating, {1} is max rating
       */
      icon: string;
    };
  };
};

export default frLocale;