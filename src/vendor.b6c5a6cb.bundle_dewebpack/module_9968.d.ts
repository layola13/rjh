/**
 * Bootstrap Collapse Plugin Type Definitions
 * Provides collapsible content panels with accordion functionality
 */

/**
 * Configuration options for the Collapse plugin
 */
interface CollapseOptions {
  /**
   * Whether to toggle the collapsible element on initialization
   * @default true
   */
  toggle?: boolean;

  /**
   * Parent selector for accordion-style behavior
   * If provided, all collapsible elements under the parent will close when one is opened
   */
  parent?: string | Element | JQuery;
}

/**
 * Events triggered by the Collapse plugin
 */
interface CollapseEvents {
  /**
   * Fired immediately when the show instance method is called
   * @event show.bs.collapse
   */
  'show.bs.collapse': JQuery.TriggeredEvent;

  /**
   * Fired when a collapse element has been made visible to the user (will wait for CSS transitions to complete)
   * @event shown.bs.collapse
   */
  'shown.bs.collapse': JQuery.TriggeredEvent;

  /**
   * Fired immediately when the hide method has been called
   * @event hide.bs.collapse
   */
  'hide.bs.collapse': JQuery.TriggeredEvent;

  /**
   * Fired when a collapse element has been hidden from the user (will wait for CSS transitions to complete)
   * @event hidden.bs.collapse
   */
  'hidden.bs.collapse': JQuery.TriggeredEvent;
}

/**
 * Bootstrap Collapse Plugin
 * Toggles visibility of content panels with smooth transitions
 */
declare class Collapse {
  /**
   * Plugin version number
   */
  static readonly VERSION: string;

  /**
   * Default transition duration in milliseconds
   */
  static readonly TRANSITION_DURATION: number;

  /**
   * Default configuration options
   */
  static readonly DEFAULTS: CollapseOptions;

  /**
   * The collapsible element
   */
  readonly $element: JQuery;

  /**
   * Plugin configuration options
   */
  readonly options: CollapseOptions;

  /**
   * Trigger elements that control this collapse
   */
  readonly $trigger: JQuery;

  /**
   * Parent container for accordion behavior
   */
  readonly $parent?: JQuery;

  /**
   * Indicates whether a transition is currently in progress
   * 0 = not transitioning, 1 = transitioning
   */
  transitioning: number | null;

  /**
   * Creates a new Collapse instance
   * @param element - The DOM element to make collapsible
   * @param options - Configuration options
   */
  constructor(element: Element, options?: CollapseOptions);

  /**
   * Gets the dimension property to animate (height or width)
   * @returns The dimension to animate
   */
  dimension(): 'height' | 'width';

  /**
   * Shows the collapsible element
   */
  show(): void;

  /**
   * Hides the collapsible element
   */
  hide(): void;

  /**
   * Toggles the collapsible element between shown and hidden states
   */
  toggle(): void;

  /**
   * Gets the parent element for accordion behavior
   * @returns The parent container
   */
  getParent(): JQuery;

  /**
   * Adds ARIA attributes and collapsed class to elements
   * @param element - The collapsible element
   * @param trigger - The trigger element
   */
  addAriaAndCollapsedClass(element: JQuery, trigger: JQuery): void;
}

/**
 * jQuery plugin interface for Collapse
 */
interface JQuery {
  /**
   * Initializes collapse functionality or invokes a method
   * @param options - Configuration options or method name
   * @returns jQuery object for chaining
   */
  collapse(options?: CollapseOptions | 'show' | 'hide' | 'toggle'): JQuery;
}

/**
 * jQuery.fn.collapse namespace
 */
interface JQueryStatic {
  fn: {
    collapse: {
      /**
       * Reference to the Collapse constructor
       */
      Constructor: typeof Collapse;

      /**
       * Restores the previous value of $.fn.collapse and returns the Collapse plugin
       * @returns The Collapse plugin function
       */
      noConflict(): typeof Collapse;
    };
  };
}

/**
 * Data API attribute selectors
 */
interface CollapseDataAttributes {
  /**
   * Marks an element as a collapse trigger
   * @attribute data-toggle="collapse"
   */
  'data-toggle': 'collapse';

  /**
   * Specifies the target collapsible element by selector
   * @attribute data-target
   */
  'data-target'?: string;

  /**
   * Specifies the parent for accordion behavior
   * @attribute data-parent
   */
  'data-parent'?: string;
}

/**
 * jQuery data storage key for Collapse instances
 */
interface JQueryDataStorage {
  /**
   * Stored Collapse instance
   */
  'bs.collapse'?: Collapse;
}

export { Collapse, CollapseOptions, CollapseEvents, CollapseDataAttributes };
export default Collapse;