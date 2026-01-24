/**
 * Intersectable mixin options configuration
 */
export interface IntersectableOptions {
  /**
   * Array of method names to be called when the element becomes visible
   */
  onVisible: string[];
}

/**
 * Intersectable mixin component interface
 */
export interface IntersectableMixin {
  /**
   * Component name
   */
  name: string;
  
  /**
   * Lifecycle hook called when component is mounted to the DOM
   * Sets up IntersectionObserver via the intersect directive
   */
  mounted?(): void;
  
  /**
   * Lifecycle hook called when component is destroyed
   * Cleans up IntersectionObserver bindings
   */
  destroyed?(): void;
  
  /**
   * Methods object containing observer callback
   */
  methods?: {
    /**
     * Callback invoked by IntersectionObserver
     * @param entries - IntersectionObserver entries
     * @param observer - IntersectionObserver instance
     * @param isIntersecting - Whether the element is currently intersecting
     */
    onObserve(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
      isIntersecting: boolean
    ): void;
  };
}

/**
 * Creates a Vue mixin that provides intersection observer functionality.
 * This mixin allows components to react when they become visible in the viewport.
 * 
 * @param options - Configuration options specifying which methods to call on visibility
 * @returns Vue component mixin with intersection observer capabilities.
 *          Returns a no-op mixin if IntersectionObserver is not supported.
 * 
 * @example
 *