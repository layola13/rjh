/**
 * Responsive breakpoint management system
 * Provides media query matching and subscription functionality for responsive layouts
 */

/**
 * Breakpoint identifiers in priority order (largest to smallest)
 */
export declare const responsiveArray: readonly ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

/**
 * Breakpoint name type derived from responsiveArray
 */
export type Breakpoint = typeof responsiveArray[number];

/**
 * Media query definitions for each breakpoint
 */
export declare const responsiveMap: {
  /** Extra small devices - max width 575px */
  xs: '(max-width: 575px)';
  /** Small devices - min width 576px */
  sm: '(min-width: 576px)';
  /** Medium devices - min width 768px */
  md: '(min-width: 768px)';
  /** Large devices - min width 992px */
  lg: '(min-width: 992px)';
  /** Extra large devices - min width 1200px */
  xl: '(min-width: 1200px)';
  /** Extra extra large devices - min width 1600px */
  xxl: '(min-width: 1600px)';
};

/**
 * Current screen state indicating which breakpoints are active
 */
export interface ScreenState {
  xxl?: boolean;
  xl?: boolean;
  lg?: boolean;
  md?: boolean;
  sm?: boolean;
  xs?: boolean;
}

/**
 * Callback function type for screen state changes
 * @param screens - Current state of all breakpoints
 */
export type SubscribeHandler = (screens: ScreenState) => void;

/**
 * Media query listener wrapper
 */
interface MatchHandler {
  /** MediaQueryList instance */
  mql: MediaQueryList;
  /** Listener function attached to the MediaQueryList */
  listener: (event: MediaQueryListEvent | MediaQueryList) => void;
}

/**
 * Responsive breakpoint manager
 * Manages media query listeners and notifies subscribers of breakpoint changes
 */
export interface ResponsiveObserver {
  /**
   * Internal map of media query handlers
   * @internal
   */
  matchHandlers: Record<string, MatchHandler>;

  /**
   * Dispatch screen state update to all subscribers
   * @param screens - Updated screen state
   * @returns Whether any subscribers exist
   */
  dispatch(screens: ScreenState): boolean;

  /**
   * Subscribe to screen state changes
   * @param handler - Callback invoked on state changes
   * @returns Subscription token for unsubscribing
   */
  subscribe(handler: SubscribeHandler): number;

  /**
   * Unsubscribe from screen state changes
   * @param token - Subscription token returned from subscribe()
   */
  unsubscribe(token: number): void;

  /**
   * Register all media query listeners
   * @internal
   */
  register(): void;

  /**
   * Unregister all media query listeners and cleanup
   * @internal
   */
  unregister(): void;
}

/**
 * Default responsive observer instance
 * Singleton for managing responsive breakpoint subscriptions
 */
declare const responsiveObserver: ResponsiveObserver;

export default responsiveObserver;