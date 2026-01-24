/**
 * Bootstrap Tab Plugin Type Definitions
 * Version: 3.3.7
 * 
 * Provides tab navigation functionality for Bootstrap components.
 * Manages tab activation, transition effects, and event handling.
 */

/// <reference types="jquery" />

declare namespace BootstrapTab {
  /**
   * Tab plugin options interface
   */
  interface TabOptions {
    /** The target element selector */
    target?: string;
  }

  /**
   * Tab event object interface
   */
  interface TabEventObject extends JQueryEventObject {
    /** The related target element involved in the tab transition */
    relatedTarget: HTMLElement;
  }

  /**
   * Tab method names that can be called via jQuery plugin interface
   */
  type TabMethod = 'show';

  /**
   * Bootstrap Tab plugin class
   * Manages individual tab component behavior and state
   */
  class Tab {
    /** Plugin version number */
    static readonly VERSION: string;

    /** Transition duration in milliseconds for tab animations */
    static readonly TRANSITION_DURATION: number;

    /** The DOM element wrapped by this tab instance */
    readonly element: JQuery;

    /**
     * Creates a new Tab instance
     * @param element - The DOM element to initialize as a tab
     */
    constructor(element: HTMLElement);

    /**
     * Activates the tab and shows its associated content panel.
     * Triggers 'show.bs.tab', 'shown.bs.tab', 'hide.bs.tab', and 'hidden.bs.tab' events.
     */
    show(): void;

    /**
     * Activates a given element and manages transition effects
     * @param element - The list item element to activate
     * @param container - The parent container element
     * @param callback - Optional callback function to execute after activation
     */
    activate(element: JQuery, container: JQuery, callback?: () => void): void;
  }
}

declare global {
  interface JQuery {
    /**
     * Initializes tab functionality on the selected elements
     * @param method - The tab method to call ('show')
     * @returns jQuery object for chaining
     */
    tab(method: BootstrapTab.TabMethod): JQuery;

    /**
     * Initializes tab functionality on the selected elements
     * @returns jQuery object for chaining
     */
    tab(): JQuery;

    /**
     * Tab plugin constructor reference
     */
    tab: {
      Constructor: typeof BootstrapTab.Tab;
      
      /**
       * Restores the previous jQuery.fn.tab value and returns the Bootstrap tab plugin
       * @returns The tab plugin function
       */
      noConflict(): JQuery;
    };
  }

  interface JQueryStatic {
    /**
     * Event triggered before a tab is shown
     * @event show.bs.tab
     */
    Event(type: 'show.bs.tab', options: { relatedTarget: HTMLElement }): BootstrapTab.TabEventObject;

    /**
     * Event triggered after a tab is shown
     * @event shown.bs.tab
     */
    Event(type: 'shown.bs.tab', options: { relatedTarget: HTMLElement }): BootstrapTab.TabEventObject;

    /**
     * Event triggered before a tab is hidden
     * @event hide.bs.tab
     */
    Event(type: 'hide.bs.tab', options: { relatedTarget: HTMLElement }): BootstrapTab.TabEventObject;

    /**
     * Event triggered after a tab is hidden
     * @event hidden.bs.tab
     */
    Event(type: 'hidden.bs.tab', options: { relatedTarget: HTMLElement }): BootstrapTab.TabEventObject;
  }

  /**
   * Data attribute interface for elements with tab plugin data
   */
  interface JQueryDataMap {
    /** Bootstrap tab plugin instance data */
    'bs.tab'?: BootstrapTab.Tab;
  }
}

export = BootstrapTab;
export as namespace BootstrapTab;