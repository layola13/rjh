/**
 * Vuex Store Type Definitions
 * Core state management library for Vue.js applications
 * @module VuexStore
 */

/**
 * Vue DevTools global hook interface for debugging and inspection
 */
interface VueDevToolsHook {
  emit(event: string, ...args: unknown[]): void;
  on(event: string, handler: (...args: unknown[]) => void): void;
}

/**
 * Deep clone cache entry for tracking circular references during object cloning
 */
interface CloneCache {
  /** Original object reference */
  original: unknown;
  /** Cloned object copy */
  copy: unknown;
}

/**
 * Raw module definition representing a single Vuex module configuration
 */
interface RawModule<S = unknown, R = unknown> {
  /** Whether this module is namespaced */
  namespaced?: boolean;
  /** Module state - can be object or factory function */
  state?: S | (() => S);
  /** Action definitions */
  actions?: ActionTree<S, R>;
  /** Mutation definitions */
  mutations?: MutationTree<S>;
  /** Getter definitions */
  getters?: GetterTree<S, R>;
  /** Nested child modules */
  modules?: ModuleTree<R>;
}

/**
 * Runtime module wrapper with metadata and hierarchy management
 */
export declare class Module<S = unknown, R = unknown> {
  runtime: boolean;
  private _children: Record<string, Module<unknown, R>>;
  private _rawModule: RawModule<S, R>;
  state: S;

  constructor(rawModule: RawModule<S, R>, runtime: boolean);

  /** Whether this module uses namespacing */
  get namespaced(): boolean;

  /** Add a child module */
  addChild(key: string, module: Module<unknown, R>): void;

  /** Remove a child module */
  removeChild(key: string): void;

  /** Get a child module by key */
  getChild(key: string): Module<unknown, R> | undefined;

  /** Check if child module exists */
  hasChild(key: string): boolean;

  /** Update module configuration */
  update(rawModule: RawModule<S, R>): void;

  /** Iterate over child modules */
  forEachChild(fn: (child: Module<unknown, R>, key: string) => void): void;

  /** Iterate over getters */
  forEachGetter(fn: (getter: Getter<S, R>, key: string) => void): void;

  /** Iterate over actions */
  forEachAction(fn: (action: Action<S, R>, key: string) => void): void;

  /** Iterate over mutations */
  forEachMutation(fn: (mutation: Mutation<S>, key: string) => void): void;
}

/**
 * Module registry managing the module tree hierarchy
 */
export declare class ModuleCollection<R = unknown> {
  root: Module<unknown, R>;

  constructor(rawRootModule: RawModule<unknown, R>);

  /** Get module at specified path */
  get(path: string[]): Module<unknown, R>;

  /** Get namespace string for module path */
  getNamespace(path: string[]): string;

  /** Update module tree with new configuration */
  update(rawRootModule: RawModule<unknown, R>): void;

  /** Register a new module */
  register(path: string[], rawModule: RawModule<unknown, R>, runtime?: boolean): void;

  /** Unregister a module */
  unregister(path: string[]): void;

  /** Check if module is registered */
  isRegistered(path: string[]): boolean;
}

/**
 * Action context providing access to store functionality within actions
 */
export interface ActionContext<S, R> {
  /** Dispatch another action */
  dispatch: Dispatch;
  /** Commit a mutation */
  commit: Commit;
  /** Module state */
  state: S;
  /** Module getters */
  getters: Record<string, unknown>;
  /** Root store state */
  rootState: R;
  /** Root store getters */
  rootGetters: Record<string, unknown>;
}

/**
 * Action handler function signature
 */
export type Action<S, R> = (
  context: ActionContext<S, R>,
  payload?: unknown
) => Promise<unknown> | unknown;

/**
 * Action tree mapping action names to handlers
 */
export interface ActionTree<S, R> {
  [key: string]: Action<S, R>;
}

/**
 * Mutation handler function signature
 */
export type Mutation<S> = (state: S, payload?: unknown) => void;

/**
 * Mutation tree mapping mutation names to handlers
 */
export interface MutationTree<S> {
  [key: string]: Mutation<S>;
}

/**
 * Getter function signature
 */
export type Getter<S, R> = (
  state: S,
  getters: Record<string, unknown>,
  rootState: R,
  rootGetters: Record<string, unknown>
) => unknown;

/**
 * Getter tree mapping getter names to functions
 */
export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>;
}

/**
 * Module tree mapping module names to definitions
 */
export interface ModuleTree<R> {
  [key: string]: RawModule<unknown, R>;
}

/**
 * Dispatch function for triggering actions
 */
export interface Dispatch {
  (type: string, payload?: unknown, options?: DispatchOptions): Promise<unknown>;
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<unknown>;
}

/**
 * Commit function for triggering mutations
 */
export interface Commit {
  (type: string, payload?: unknown, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

/**
 * Payload object with type property for object-style dispatch/commit
 */
export interface Payload {
  type: string;
  [key: string]: unknown;
}

/**
 * Options for dispatch calls
 */
export interface DispatchOptions {
  /** Whether to dispatch to root store */
  root?: boolean;
}

/**
 * Options for commit calls
 */
export interface CommitOptions {
  /** Whether to commit to root store */
  root?: boolean;
  /** Whether this is a silent commit (no subscribers notified) */
  silent?: boolean;
}

/**
 * Subscription handler for mutations
 */
export type MutationSubscriber<P, S> = (
  mutation: { type: string; payload: P },
  state: S
) => void;

/**
 * Subscription handler for actions
 */
export interface ActionSubscriber<P, S> {
  /** Called before action dispatch */
  before?(action: { type: string; payload: P }, state: S): void;
  /** Called after action completes */
  after?(action: { type: string; payload: P }, state: S): void;
  /** Called on action error */
  error?(action: { type: string; payload: P }, state: S, error: Error): void;
}

/**
 * Options for subscriptions
 */
export interface SubscribeOptions {
  /** Whether to prepend subscriber to list */
  prepend?: boolean;
}

/**
 * Watch handler function
 */
export type WatchHandler<T> = (value: T, oldValue: T) => void;

/**
 * Options for store watch
 */
export interface WatchOptions {
  /** Whether to watch deeply */
  deep?: boolean;
  /** Whether to trigger immediately */
  immediate?: boolean;
}

/**
 * Store constructor options
 */
export interface StoreOptions<S> {
  /** Root state */
  state?: S | (() => S);
  /** Root getters */
  getters?: GetterTree<S, S>;
  /** Root actions */
  actions?: ActionTree<S, S>;
  /** Root mutations */
  mutations?: MutationTree<S>;
  /** Child modules */
  modules?: ModuleTree<S>;
  /** Store plugins */
  plugins?: Plugin<S>[];
  /** Enable strict mode (throws on state mutation outside mutations) */
  strict?: boolean;
  /** Enable Vue DevTools integration */
  devtools?: boolean;
}

/**
 * Store plugin function
 */
export type Plugin<S> = (store: Store<S>) => void;

/**
 * Options for module registration
 */
export interface ModuleOptions {
  /** Whether to preserve existing state when registering */
  preserveState?: boolean;
}

/**
 * Main Vuex Store class providing centralized state management
 */
export declare class Store<S = unknown> {
  /** Store state (readonly - use mutations to modify) */
  readonly state: S;
  /** Computed getters */
  readonly getters: Record<string, unknown>;

  private _committing: boolean;
  private _actions: Record<string, Array<(payload: unknown) => Promise<unknown>>>;
  private _actionSubscribers: ActionSubscriber<unknown, S>[];
  private _mutations: Record<string, Array<(payload: unknown) => void>>;
  private _wrappedGetters: Record<string, (store: Store<S>) => unknown>;
  private _modules: ModuleCollection<S>;
  private _modulesNamespaceMap: Record<string, Module<unknown, S>>;
  private _subscribers: Array<MutationSubscriber<unknown, S>>;
  private _watcherVM: Vue;
  private _makeLocalGettersCache: Record<string, Record<string, unknown>>;
  private _vm: Vue;
  private _devtoolHook?: VueDevToolsHook;
  strict: boolean;

  /**
   * Create a new Vuex store instance
   * @param options - Store configuration options
   */
  constructor(options: StoreOptions<S>);

  /**
   * Dispatch an action
   * @param type - Action type or payload with type
   * @param payload - Action payload
   * @returns Promise resolving to action result
   */
  dispatch: Dispatch;

  /**
   * Commit a mutation
   * @param type - Mutation type or payload with type
   * @param payload - Mutation payload
   * @param options - Commit options
   */
  commit: Commit;

  /**
   * Subscribe to store mutations
   * @param fn - Subscriber function
   * @param options - Subscription options
   * @returns Unsubscribe function
   */
  subscribe<P>(
    fn: MutationSubscriber<P, S>,
    options?: SubscribeOptions
  ): () => void;

  /**
   * Subscribe to store actions
   * @param fn - Subscriber function or object
   * @param options - Subscription options
   * @returns Unsubscribe function
   */
  subscribeAction<P>(
    fn: ActionSubscriber<P, S> | ((action: { type: string; payload: P }, state: S) => void),
    options?: SubscribeOptions
  ): () => void;

  /**
   * Watch a getter value
   * @param getter - Function returning value to watch
   * @param cb - Callback on value change
   * @param options - Watch options
   * @returns Unwatch function
   */
  watch<T>(
    getter: (state: S, getters: Record<string, unknown>) => T,
    cb: WatchHandler<T>,
    options?: WatchOptions
  ): () => void;

  /**
   * Replace entire store state (use with caution)
   * @param state - New state object
   */
  replaceState(state: S): void;

  /**
   * Register a dynamic module
   * @param path - Module path (string or array)
   * @param module - Module definition
   * @param options - Registration options
   */
  registerModule(
    path: string | string[],
    module: RawModule<unknown, S>,
    options?: ModuleOptions
  ): void;

  /**
   * Unregister a dynamic module
   * @param path - Module path (string or array)
   */
  unregisterModule(path: string | string[]): void;

  /**
   * Check if module is registered
   * @param path - Module path (string or array)
   * @returns Whether module exists
   */
  hasModule(path: string | string[]): boolean;

  /**
   * Hot-update store modules
   * @param newOptions - New module options
   */
  hotUpdate(newOptions: StoreOptions<S>): void;

  /**
   * Internal helper to ensure mutations happen in commit context
   * @internal
   */
  _withCommit(fn: () => void): void;
}

/**
 * Helper to map state properties to computed properties
 * @param namespace - Optional module namespace
 * @param map - State property mapping (array or object)
 * @returns Computed property definitions
 */
export declare function mapState<S = unknown>(
  map: string[] | Record<string, (state: S, getters: Record<string, unknown>) => unknown>
): Record<string, () => unknown>;

export declare function mapState<S = unknown>(
  namespace: string,
  map: string[] | Record<string, (state: S, getters: Record<string, unknown>) => unknown>
): Record<string, () => unknown>;

/**
 * Helper to map mutations to methods
 * @param namespace - Optional module namespace
 * @param map - Mutation mapping (array or object)
 * @returns Method definitions
 */
export declare function mapMutations(
  map: string[] | Record<string, (commit: Commit, ...args: unknown[]) => unknown>
): Record<string, (...args: unknown[]) => void>;

export declare function mapMutations(
  namespace: string,
  map: string[] | Record<string, (commit: Commit, ...args: unknown[]) => unknown>
): Record<string, (...args: unknown[]) => void>;

/**
 * Helper to map getters to computed properties
 * @param namespace - Optional module namespace
 * @param map - Getter mapping (array or object)
 * @returns Computed property definitions
 */
export declare function mapGetters(
  map: string[]
): Record<string, () => unknown>;

export declare function mapGetters(
  namespace: string,
  map: string[]
): Record<string, () => unknown>;

/**
 * Helper to map actions to methods
 * @param namespace - Optional module namespace
 * @param map - Action mapping (array or object)
 * @returns Method definitions
 */
export declare function mapActions(
  map: string[] | Record<string, (dispatch: Dispatch, ...args: unknown[]) => unknown>
): Record<string, (...args: unknown[]) => Promise<unknown>>;

export declare function mapActions(
  namespace: string,
  map: string[] | Record<string, (dispatch: Dispatch, ...args: unknown[]) => unknown>
): Record<string, (...args: unknown[]) => Promise<unknown>>;

/**
 * Create namespaced helper functions
 * @param namespace - Module namespace
 * @returns Object containing namespaced mapState, mapGetters, mapMutations, mapActions
 */
export declare function createNamespacedHelpers(namespace: string): {
  mapState: typeof mapState;
  mapGetters: typeof mapGetters;
  mapMutations: typeof mapMutations;
  mapActions: typeof mapActions;
};

/**
 * Logger plugin options
 */
export interface LoggerOptions<S = unknown> {
  /** Whether to collapse log groups */
  collapsed?: boolean;
  /** Filter mutations to log */
  filter?: (mutation: { type: string; payload: unknown }, stateBefore: S, stateAfter: S) => boolean;
  /** Transform state before logging */
  transformer?: (state: S) => unknown;
  /** Transform mutation before logging */
  mutationTransformer?: (mutation: { type: string; payload: unknown }) => unknown;
  /** Filter actions to log */
  actionFilter?: (action: { type: string; payload: unknown }, state: S) => boolean;
  /** Transform action before logging */
  actionTransformer?: (action: { type: string; payload: unknown }) => unknown;
  /** Whether to log mutations */
  logMutations?: boolean;
  /** Whether to log actions */
  logActions?: boolean;
  /** Custom logger (defaults to console) */
  logger?: Console;
}

/**
 * Create a logger plugin for debugging
 * @param options - Logger configuration
 * @returns Store plugin function
 */
export declare function createLogger<S = unknown>(options?: LoggerOptions<S>): Plugin<S>;

/**
 * Install Vuex into Vue
 * @param Vue - Vue constructor
 */
export declare function install(Vue: typeof import('vue')): void;

/**
 * Vuex version string
 */
export declare const version: string;

/**
 * Default export containing all Vuex APIs
 */
declare const Vuex: {
  Store: typeof Store;
  install: typeof install;
  version: typeof version;
  mapState: typeof mapState;
  mapMutations: typeof mapMutations;
  mapGetters: typeof mapGetters;
  mapActions: typeof mapActions;
  createNamespacedHelpers: typeof createNamespacedHelpers;
  createLogger: typeof createLogger;
};

export default Vuex;

/**
 * Named exports for tree-shaking support
 */
export {
  Store as b,
  mapGetters as c
};