/**
 * Responsive breakpoint system for managing screen size changes
 * Provides subscription mechanism for responsive layout updates
 */

/**
 * Ordered array of responsive breakpoint names from largest to smallest
 */
export declare const responsiveArray: readonly ["xxl", "xl", "lg", "md", "sm", "xs"];

/**
 * Breakpoint name type derived from responsiveArray
 */
export type Breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

/**
 * Media query definitions for each breakpoint
 * Maps breakpoint names to CSS media query strings
 */
export declare const responsiveMap: {
  /** Extra small devices: max-width 575px */
  xs: "(max-width: 575px)";
  /** Small devices: min-width 576px */
  sm: "(min-width: 576px)";
  /** Medium devices: min-width 768px */
  md: "(min-width: 768px)";
  /** Large devices: min-width 992px */
  lg: "(min-width: 992px)";
  /** Extra large devices: min-width 1200px */
  xl: "(min-width: 1200px)";
  /** Extra extra large devices: min-width 1600px */
  xxl: "(min-width: 1600px)";
};

/**
 * Current responsive state indicating which breakpoints are active
 * Each key represents a breakpoint, value indicates if it matches
 */
export interface ResponsiveState {
  xxl?: boolean;
  xl?: boolean;
  lg?: boolean;
  md?: boolean;
  sm?: boolean;
  xs?: boolean;
}

/**
 * Callback function invoked when responsive state changes
 * @param state - The updated responsive state object
 */
export type SubscribeHandler = (state: ResponsiveState) => void;

/**
 * Internal match handler storing MediaQueryList and its listener
 */
interface MatchHandler {
  /** The MediaQueryList object for this breakpoint */
  mql: MediaQueryList;
  /** The listener function attached to the MediaQueryList */
  listener: (event: MediaQueryListEvent | MediaQueryList) => void;
}

/**
 * Responsive observer service for managing screen size subscriptions
 */
export interface ResponsiveObserver {
  /**
   * Internal storage of match handlers keyed by media query string
   * @internal
   */
  matchHandlers: Record<string, MatchHandler>;

  /**
   * Dispatches updated responsive state to all subscribers
   * @param state - The new responsive state
   * @returns True if there are active subscribers, false otherwise
   */
  dispatch(state: ResponsiveState): boolean;

  /**
   * Subscribes to responsive state changes
   * Automatically registers media query listeners on first subscription
   * @param handler - Callback invoked with current and future state changes
   * @returns Subscription token (numeric ID) for unsubscribing
   */
  subscribe(handler: SubscribeHandler): number;

  /**
   * Unsubscribes from responsive state changes
   * Automatically unregisters media query listeners when no subscribers remain
   * @param token - The subscription token returned from subscribe()
   */
  unsubscribe(token: number): void;

  /**
   * Registers media query listeners for all breakpoints
   * Called automatically on first subscription
   * @internal
   */
  register(): void;

  /**
   * Unregisters all media query listeners and clears subscriber list
   * Called automatically when last subscriber unsubscribes
   * @internal
   */
  unregister(): void;
}

/**
 * Default responsive observer instance
 * Use this singleton to subscribe to responsive breakpoint changes
 * 
 * @example
 *