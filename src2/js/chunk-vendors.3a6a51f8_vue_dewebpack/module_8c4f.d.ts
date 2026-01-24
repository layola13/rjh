/**
 * Vue Router v3.5.2
 * (c) 2021 Evan You
 * @license MIT
 */

import type Vue from 'vue';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Route location descriptor - can be a string path or an object
 */
export type RawLocation = string | Location;

/**
 * Location object used for navigation
 */
export interface Location {
  name?: string;
  path?: string;
  hash?: string;
  query?: Dictionary<string | (string | null)[] | null | undefined>;
  params?: Dictionary<string>;
  append?: boolean;
  replace?: boolean;
}

/**
 * Normalized route location
 */
export interface Route {
  path: string;
  name?: string | null;
  hash: string;
  query: Dictionary<string | (string | null)[]>;
  params: Dictionary<string>;
  fullPath: string;
  matched: RouteRecord[];
  redirectedFrom?: string;
  meta?: RouteMeta;
}

/**
 * Route record in the matcher
 */
export interface RouteRecord {
  path: string;
  name?: string;
  components: Dictionary<Component>;
  instances: Dictionary<Vue>;
  enteredCbs: Dictionary<NavigationGuardNext[]>;
  parent?: RouteRecord;
  matchAs?: string;
  redirect?: RedirectOption;
  beforeEnter?: NavigationGuard;
  meta: RouteMeta;
  props: boolean | Record<string, any> | RoutePropsFunction;
  regex: RegExp;
  alias: string[];
}

/**
 * Route configuration provided by user
 */
export interface RouteConfig {
  path: string;
  name?: string;
  component?: Component;
  components?: Dictionary<Component>;
  redirect?: RedirectOption;
  alias?: string | string[];
  children?: RouteConfig[];
  beforeEnter?: NavigationGuard;
  meta?: RouteMeta;
  props?: boolean | Record<string, any> | RoutePropsFunction;
  caseSensitive?: boolean;
  pathToRegexpOptions?: PathToRegexpOptions;
}

/**
 * Navigation guard function signature
 */
export type NavigationGuard = (
  to: Route,
  from: Route,
  next: NavigationGuardNext
) => any;

/**
 * Navigation guard next function
 */
export type NavigationGuardNext = (to?: RawLocation | false | void) => void;

/**
 * Router options for instantiation
 */
export interface RouterOptions {
  routes?: RouteConfig[];
  mode?: RouterMode;
  fallback?: boolean;
  base?: string;
  linkActiveClass?: string;
  linkExactActiveClass?: string;
  parseQuery?: (query: string) => Record<string, any>;
  stringifyQuery?: (query: Record<string, any>) => string;
  scrollBehavior?: (
    to: Route,
    from: Route,
    savedPosition: Position | null
  ) => PositionResult | Promise<PositionResult>;
}

/**
 * Router mode types
 */
export type RouterMode = 'hash' | 'history' | 'abstract';

/**
 * Scroll position
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Position result for scroll behavior
 */
export type PositionResult =
  | Position
  | { selector: string; offset?: Position; behavior?: ScrollBehavior }
  | void;

/**
 * Redirect option in route config
 */
export type RedirectOption = RawLocation | ((to: Route) => RawLocation);

/**
 * Route props function
 */
export type RoutePropsFunction = (route: Route) => Record<string, any>;

/**
 * Route meta information
 */
export interface RouteMeta {
  [key: string]: any;
}

/**
 * Path-to-regexp options
 */
export interface PathToRegexpOptions {
  sensitive?: boolean;
  strict?: boolean;
  end?: boolean;
  delimiter?: string;
}

/**
 * Generic dictionary type
 */
export interface Dictionary<T> {
  [key: string]: T;
}

/**
 * Component type (Vue component constructor or definition)
 */
export type Component = typeof Vue | ComponentOptions;

/**
 * Vue component options
 */
export interface ComponentOptions {
  [key: string]: any;
}

/**
 * Navigation failure type enum
 */
export enum NavigationFailureType {
  redirected = 2,
  aborted = 4,
  cancelled = 8,
  duplicated = 16,
}

/**
 * Navigation failure error
 */
export interface NavigationFailure extends Error {
  _isRouter: true;
  from: Route;
  to: Route;
  type: NavigationFailureType;
}

// ============================================================================
// VueRouter Class
// ============================================================================

/**
 * Main VueRouter class
 */
export default class VueRouter {
  /**
   * Current active route
   */
  readonly currentRoute: Route;

  /**
   * Router mode (hash, history, or abstract)
   */
  readonly mode: RouterMode;

  /**
   * Router options
   */
  readonly options: RouterOptions;

  /**
   * Current Vue app instance
   */
  app: Vue | null;

  /**
   * All registered Vue app instances
   */
  apps: Vue[];

  /**
   * Route matcher
   */
  matcher: Matcher;

  /**
   * History implementation
   */
  history: History;

  /**
   * Before navigation hooks
   */
  beforeHooks: NavigationGuard[];

  /**
   * Resolve hooks
   */
  resolveHooks: NavigationGuard[];

  /**
   * After navigation hooks
   */
  afterHooks: Array<(to: Route, from: Route) => any>;

  /**
   * Whether to fallback to hash mode
   */
  fallback: boolean;

  /**
   * Create a new VueRouter instance
   * @param options - Router configuration options
   */
  constructor(options?: RouterOptions);

  /**
   * Initialize the router with a Vue instance
   * @param app - Root Vue instance
   */
  init(app: Vue): void;

  /**
   * Register a global before hook
   * @param guard - Navigation guard function
   * @returns Function to remove the hook
   */
  beforeEach(guard: NavigationGuard): () => void;

  /**
   * Register a global before resolve hook
   * @param guard - Navigation guard function
   * @returns Function to remove the hook
   */
  beforeResolve(guard: NavigationGuard): () => void;

  /**
   * Register a global after hook
   * @param hook - Hook function called after navigation
   * @returns Function to remove the hook
   */
  afterEach(hook: (to: Route, from: Route) => any): () => void;

  /**
   * Register a callback to be called when router is ready
   * @param callback - Success callback
   * @param errorCallback - Error callback
   */
  onReady(callback: () => void, errorCallback?: (error: Error) => void): void;

  /**
   * Register an error handler
   * @param callback - Error callback
   */
  onError(callback: (error: Error) => void): void;

  /**
   * Navigate to a different location (pushes to history)
   * @param location - Target location
   * @param onComplete - Success callback
   * @param onAbort - Abort callback
   */
  push(
    location: RawLocation,
    onComplete?: (route: Route) => void,
    onAbort?: (error: Error) => void
  ): Promise<Route> | void;

  /**
   * Navigate to a different location (replaces current history entry)
   * @param location - Target location
   * @param onComplete - Success callback
   * @param onAbort - Abort callback
   */
  replace(
    location: RawLocation,
    onComplete?: (route: Route) => void,
    onAbort?: (error: Error) => void
  ): Promise<Route> | void;

  /**
   * Go forward or backward through history
   * @param n - Number of steps (positive = forward, negative = backward)
   */
  go(n: number): void;

  /**
   * Go back one step in history
   */
  back(): void;

  /**
   * Go forward one step in history
   */
  forward(): void;

  /**
   * Get all active components for a given route
   * @param to - Target route (defaults to current route)
   * @returns Array of matched components
   */
  getMatchedComponents(to?: RawLocation | Route): Component[];

  /**
   * Resolve a location to a route object
   * @param to - Target location
   * @param current - Current route (defaults to current route)
   * @param append - Whether to append to current path
   * @returns Resolved route information
   */
  resolve(
    to: RawLocation,
    current?: Route,
    append?: boolean
  ): {
    location: Location;
    route: Route;
    href: string;
    normalizedTo: Location;
    resolved: Route;
  };

  /**
   * Get all registered routes
   * @returns Array of all route records
   */
  getRoutes(): RouteRecord[];

  /**
   * Dynamically add a route
   * @param parentOrRoute - Parent route name or route config
   * @param route - Route config (if parent is provided)
   */
  addRoute(parentOrRoute: string | RouteConfig, route?: RouteConfig): void;

  /**
   * Dynamically add multiple routes
   * @param routes - Array of route configs
   */
  addRoutes(routes: RouteConfig[]): void;

  /**
   * Match a location to a route
   * @param raw - Raw location
   * @param current - Current route
   * @param redirectedFrom - Redirected from location
   * @returns Matched route
   */
  match(raw: RawLocation, current?: Route, redirectedFrom?: Location): Route;

  /**
   * Install Vue Router plugin
   * @param Vue - Vue constructor
   */
  static install(Vue: typeof import('vue')): void;

  /**
   * Vue Router version
   */
  static readonly version: string;

  /**
   * Check if an error is a navigation failure
   * @param error - Error to check
   * @param type - Optional specific failure type to check
   * @returns True if error is a navigation failure
   */
  static isNavigationFailure(
    error: any,
    type?: NavigationFailureType
  ): error is NavigationFailure;

  /**
   * Navigation failure type enum
   */
  static readonly NavigationFailureType: typeof NavigationFailureType;

  /**
   * Initial route location
   */
  static readonly START_LOCATION: Route;
}

// ============================================================================
// Internal Interfaces (for completeness)
// ============================================================================

/**
 * Route matcher interface
 */
export interface Matcher {
  match(raw: RawLocation, current?: Route, redirectedFrom?: Location): Route;
  addRoute(parentOrRoute: string | RouteConfig, route?: RouteConfig): void;
  addRoutes(routes: RouteConfig[]): void;
  getRoutes(): RouteRecord[];
}

/**
 * History base class
 */
export interface History {
  current: Route;
  pending: Route | null;
  
  listen(callback: (route: Route) => void): void;
  onReady(callback: () => void, errorCallback?: (error: Error) => void): void;
  onError(callback: (error: Error) => void): void;
  transitionTo(
    location: RawLocation,
    onComplete?: (route: Route) => void,
    onAbort?: (error: Error) => void
  ): void;
  confirmTransition(
    route: Route,
    onComplete: () => void,
    onAbort: (error: Error) => void
  ): void;
  updateRoute(route: Route): void;
  setupListeners(): void;
  teardown(): void;
  push(
    location: RawLocation,
    onComplete?: (route: Route) => void,
    onAbort?: (error: Error) => void
  ): void;
  replace(
    location: RawLocation,
    onComplete?: (route: Route) => void,
    onAbort?: (error: Error) => void
  ): void;
  go(n: number): void;
  ensureURL(push?: boolean): void;
  getCurrentLocation(): string;
}