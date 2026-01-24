/**
 * Bootstrap Carousel Component Type Definitions
 * A slideshow component for cycling through elements (images or slides of text)
 * @module CarouselComponent
 */

/**
 * Carousel configuration options
 */
export interface CarouselOptions {
  /**
   * The amount of time to delay between automatically cycling an item.
   * If false, carousel will not automatically cycle.
   * @default 5000
   */
  interval: number | false;

  /**
   * Pauses the cycling of the carousel on mouseenter and resumes on mouseleave.
   * @default "hover"
   */
  pause: "hover" | false;

  /**
   * Whether the carousel should cycle continuously or have hard stops.
   * @default true
   */
  wrap: boolean;

  /**
   * Whether the carousel should react to keyboard events.
   * @default true
   */
  keyboard: boolean;
}

/**
 * Direction type for carousel slide transitions
 */
export type CarouselDirection = "next" | "prev";

/**
 * Side type for carousel slide positioning
 */
export type CarouselSide = "left" | "right";

/**
 * Carousel event data passed to event handlers
 */
export interface CarouselEventData {
  /**
   * The DOM element being slid into place as the active item
   */
  relatedTarget: HTMLElement;

  /**
   * The direction in which the carousel is sliding
   */
  direction: CarouselSide;
}

/**
 * jQuery interface extension for Carousel plugin
 */
export interface JQueryCarousel {
  /**
   * Initializes carousel with options or executes a method
   * @param options - Configuration options or method name
   * @returns jQuery object for chaining
   */
  carousel(options?: Partial<CarouselOptions> | string | number): JQuery;

  /**
   * Reference to the Carousel constructor
   */
  carousel: {
    Constructor: typeof Carousel;
    noConflict(): JQueryCarousel;
  };
}

/**
 * Bootstrap Carousel Component
 * Manages slideshow functionality for cycling through content
 */
export declare class Carousel {
  /**
   * Component version
   */
  static readonly VERSION: string;

  /**
   * Transition duration in milliseconds
   * @default 600
   */
  static readonly TRANSITION_DURATION: number;

  /**
   * Default configuration options
   */
  static readonly DEFAULTS: CarouselOptions;

  /**
   * Root carousel element (jQuery wrapped)
   */
  $element: JQuery;

  /**
   * Carousel indicator elements
   */
  $indicators: JQuery;

  /**
   * Current configuration options
   */
  options: CarouselOptions;

  /**
   * Whether the carousel is currently paused
   */
  paused: boolean | null;

  /**
   * Whether the carousel is currently transitioning between slides
   */
  sliding: boolean | null;

  /**
   * Interval timer ID for automatic cycling
   */
  interval: number | null;

  /**
   * Currently active slide element
   */
  $active: JQuery | null;

  /**
   * All slide item elements
   */
  $items: JQuery | null;

  /**
   * Creates a new Carousel instance
   * @param element - The root carousel DOM element
   * @param options - Configuration options
   */
  constructor(element: HTMLElement, options: Partial<CarouselOptions>);

  /**
   * Handles keyboard navigation events
   * @param event - Keyboard event (Arrow Left: prev, Arrow Right: next)
   */
  keydown(event: JQuery.KeyDownEvent): void;

  /**
   * Cycles through the carousel items from left to right
   * @param event - Optional event object
   * @returns The carousel instance for chaining
   */
  cycle(event?: Event): this;

  /**
   * Gets the index of a carousel item
   * @param item - The item element to get the index for
   * @returns The zero-based index of the item
   */
  getItemIndex(item: JQuery): number;

  /**
   * Gets the item element for a given direction
   * @param direction - The direction to get the item for
   * @param activeItem - The currently active item
   * @returns The target item element
   */
  getItemForDirection(direction: CarouselDirection, activeItem: JQuery): JQuery;

  /**
   * Cycles the carousel to a particular frame (0 based, similar to an array)
   * @param position - The index of the item to cycle to
   * @returns The carousel instance for chaining
   */
  to(position: number): this | void;

  /**
   * Stops the carousel from cycling through items
   * @param event - Optional event object
   * @returns The carousel instance for chaining
   */
  pause(event?: Event): this;

  /**
   * Cycles to the next item
   * @returns The carousel instance for chaining
   */
  next(): this | void;

  /**
   * Cycles to the previous item
   * @returns The carousel instance for chaining
   */
  prev(): this | void;

  /**
   * Slides the carousel to a specified item in a given direction
   * @param direction - The direction to slide ("next" or "prev")
   * @param nextItem - Optional specific item to slide to
   * @returns The carousel instance for chaining
   */
  slide(direction: CarouselDirection, nextItem?: JQuery): this;
}

/**
 * jQuery plugin method for initializing or controlling carousels
 * @param this - jQuery collection of carousel elements
 * @param option - Configuration object, method name, or slide index
 * @returns jQuery collection for chaining
 */
export declare function carousel(
  this: JQuery,
  option?: Partial<CarouselOptions> | string | number
): JQuery;

declare global {
  interface JQuery {
    /**
     * Initialize carousel or execute carousel method
     * @param options - Configuration options, method name, or slide index
     */
    carousel(options?: Partial<CarouselOptions> | string | number): JQuery;
  }

  interface JQueryStatic {
    fn: {
      carousel: typeof carousel & {
        Constructor: typeof Carousel;
        noConflict(): typeof carousel;
      };
    };
  }
}