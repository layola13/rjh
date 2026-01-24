/**
 * Vue Apollo - Global module for Apollo GraphQL integration with Vue.js
 * Provides reactive GraphQL queries, mutations, and subscriptions
 */

import { VueConstructor, ComponentOptions } from 'vue';
import { ApolloClient, ObservableQuery, ApolloQueryResult, OperationVariables, WatchQueryOptions, QueryOptions, MutationOptions, SubscriptionOptions, FetchPolicy, ErrorPolicy } from '@apollo/client/core';

/**
 * Global configuration and utilities for Vue Apollo
 */
export interface Globals {
  /** Vue constructor reference */
  Vue: VueConstructor;
}

/**
 * Throttle function options
 */
export type ThrottleFunction = <T extends (...args: any[]) => any>(
  handler: T,
  wait: number
) => T & { cancel(): void };

/**
 * Debounce function options
 */
export type DebounceFunction = <T extends (...args: any[]) => any>(
  handler: T,
  wait: number,
  immediate?: boolean
) => T & { cancel(): void };

/**
 * Smart query/subscription options
 */
export interface SmartApolloOptions {
  /** GraphQL query or subscription document */
  query?: any;
  document?: any;
  /** Query variables */
  variables?: OperationVariables | (() => OperationVariables);
  /** Fetch policy for queries */
  fetchPolicy?: FetchPolicy;
  /** Error policy */
  errorPolicy?: ErrorPolicy;
  /** Polling interval in milliseconds */
  pollInterval?: number | (() => number);
  /** Watch for changes */
  watch?: boolean;
  /** Skip query execution */
  skip?: boolean | (() => boolean);
  /** Deep watch variables */
  deep?: boolean;
  /** Throttle execution (ms) */
  throttle?: number;
  /** Debounce execution (ms) */
  debounce?: number;
  /** Apollo client ID */
  client?: string;
  /** GraphQL context */
  context?: any;
  /** Manual mode - requires explicit refetch */
  manual?: boolean;
  /** Server-side prefetch */
  prefetch?: boolean;
  /** Loading key in component data */
  loadingKey?: string;
  /** Notify on network status changes */
  notifyOnNetworkStatusChange?: boolean;
  
  /** Transform query result */
  update?: (data: any) => any;
  /** Result callback */
  result?: (result: ApolloQueryResult<any>, key: string) => void;
  /** Error callback */
  error?: (error: Error) => void;
  /** Watch loading callback */
  watchLoading?: (isLoading: boolean, countModifier: number) => void;
  
  /** Subscribe to more queries */
  subscribeToMore?: SubscribeToMoreOptions | SubscribeToMoreOptions[];
  /** Update function for subscriptions */
  updateQuery?: (previousResult: any, options: any) => any;
  /** Linked query for subscriptions */
  linkedQuery?: SmartQuery;
}

/**
 * Subscribe to more options
 */
export interface SubscribeToMoreOptions {
  document: any;
  variables?: OperationVariables;
  updateQuery?: (previousResult: any, options: any) => any;
}

/**
 * Smart query result
 */
export interface SmartQueryResult<TData = any> {
  data: TData | null;
  fullData?: TData;
  loading: boolean;
  error: Error | null;
  networkStatus: number;
}

/**
 * Base class for smart Apollo operations (queries and subscriptions)
 */
export declare class SmartApollo {
  readonly type: string | null;
  readonly vm: Vue;
  readonly key: string;
  readonly options: SmartApolloOptions;
  readonly initialOptions: SmartApolloOptions;
  
  protected _skip: boolean;
  protected _pollInterval: number | null;
  protected _watchers: Array<() => void>;
  protected _destroyed: boolean;
  protected lastApolloOptions: any;
  protected sub: any;
  protected observer: any;
  
  constructor(vm: Vue, key: string, options: SmartApolloOptions, autostart?: boolean);
  
  /** Start watching and executing */
  autostart(): void;
  /** Refresh the operation */
  refresh(): void;
  /** Start execution */
  start(): void;
  /** Stop execution */
  stop(): void;
  /** Destroy and cleanup */
  destroy(): void;
  
  /** Current skip state */
  get skip(): boolean;
  set skip(value: boolean);
  
  /** Current poll interval */
  get pollInterval(): number | null;
  set pollInterval(value: number | null);
  
  /** Generate Apollo options */
  protected generateApolloOptions(variables: OperationVariables): any;
  /** Execute Apollo operation */
  protected executeApollo(variables: OperationVariables): void;
  /** Handle next result */
  protected nextResult(result: any): void;
  /** Handle errors */
  protected catchError(error: Error): void;
  /** Call event handlers */
  protected callHandlers(handlers: Array<Function | undefined>, ...args: any[]): boolean;
  /** Handle errors with custom handlers */
  protected errorHandler(...args: any[]): boolean;
}

/**
 * Smart query - reactive GraphQL query
 */
export declare class SmartQuery<TData = any, TVariables = OperationVariables> extends SmartApollo {
  readonly type: 'query';
  
  /** Apollo client instance */
  get client(): ApolloClient<any>;
  /** Loading state */
  get loading(): boolean;
  set loading(value: boolean);
  /** Loading key in component */
  get loadingKey(): string;
  
  /** First run promise (server-side) */
  firstRun?: Promise<void>;
  
  /** Fetch more results */
  fetchMore(options: any): Promise<ApolloQueryResult<TData>>;
  /** Subscribe to more data */
  subscribeToMore(options: SubscribeToMoreOptions): { unsubscribe: () => void };
  /** Refetch query */
  refetch(variables?: TVariables): Promise<ApolloQueryResult<TData>>;
  /** Set query variables */
  setVariables(variables: TVariables, tryFetch?: boolean): Promise<ApolloQueryResult<TData>>;
  /** Set query options */
  setOptions(options: Partial<WatchQueryOptions<TVariables, TData>>): Promise<ApolloQueryResult<TData>>;
  /** Start polling */
  startPolling(pollInterval: number): void;
  /** Stop polling */
  stopPolling(): void;
}

/**
 * Smart subscription - reactive GraphQL subscription
 */
export declare class SmartSubscription extends SmartApollo {
  readonly type: 'subscription';
}

/**
 * Vue Apollo instance - manages queries and subscriptions for a component
 */
export declare class DollarApollo {
  readonly vm: Vue;
  readonly queries: Record<string, SmartQuery>;
  readonly subscriptions: Record<string, SmartSubscription>;
  
  client?: string | ApolloClient<any>;
  loadingKey?: string;
  error?: (error: Error, vm: Vue, key: string, type: string, options: any) => void;
  
  constructor(vm: Vue);
  
  /** Get Apollo provider */
  get provider(): ApolloProvider;
  /** Check if any queries are loading */
  get loading(): boolean;
  /** Get query data */
  get data(): any;
  
  /** Get Apollo client */
  getClient(options?: SmartApolloOptions): ApolloClient<any>;
  
  /** Execute a query */
  query<TData = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, TData>
  ): Promise<ApolloQueryResult<TData>>;
  
  /** Watch a query */
  watchQuery<TData = any, TVariables = OperationVariables>(
    options: WatchQueryOptions<TVariables, TData>
  ): ObservableQuery<TData, TVariables>;
  
  /** Execute a mutation */
  mutate<TData = any, TVariables = OperationVariables>(
    options: MutationOptions<TData, TVariables>
  ): Promise<any>;
  
  /** Create a subscription */
  subscribe<TData = any, TVariables = OperationVariables>(
    options: SubscriptionOptions<TVariables, TData>
  ): any;
  
  /** Add a smart query */
  addSmartQuery(key: string, options: SmartApolloOptions): SmartQuery;
  /** Add a smart subscription */
  addSmartSubscription(key: string, options: SmartApolloOptions): SmartSubscription;
  
  /** Define reactive setter */
  defineReactiveSetter(key: string, func: () => any, deep?: boolean): void;
  
  /** Skip all queries */
  set skipAllQueries(value: boolean);
  /** Skip all subscriptions */
  set skipAllSubscriptions(value: boolean);
  /** Skip all operations */
  set skipAll(value: boolean);
  
  /** Destroy and cleanup */
  destroy(): void;
}

/**
 * Apollo provider configuration
 */
export interface ApolloProviderOptions {
  /** Default Apollo client */
  defaultClient?: ApolloClient<any>;
  /** Named Apollo clients */
  clients?: Record<string, ApolloClient<any>>;
  /** Default query/subscription options */
  defaultOptions?: any;
  /** Global loading watcher */
  watchLoading?: (isLoading: boolean, countModifier: number, query?: SmartQuery) => void;
  /** Global error handler */
  errorHandler?: (error: Error, vm: Vue, key: string, type: string, options: any) => void;
  /** Enable server-side prefetch */
  prefetch?: boolean;
}

/**
 * Apollo provider - manages Apollo clients for the application
 */
export declare class ApolloProvider {
  readonly defaultClient?: ApolloClient<any>;
  readonly clients: Record<string, ApolloClient<any>>;
  readonly defaultOptions?: any;
  readonly watchLoading?: (isLoading: boolean, countModifier: number, query?: SmartQuery) => void;
  readonly errorHandler?: (error: Error, vm: Vue, key: string, type: string, options: any) => void;
  readonly prefetch?: boolean;
  
  constructor(options: ApolloProviderOptions);
  
  /** @deprecated Use apolloProvider option instead */
  provide(key?: string): any;
  
  /** Install Vue plugin */
  static install(Vue: VueConstructor, options?: any): void;
  /** Version string */
  static readonly version: string;
}

/**
 * Component apollo options
 */
export interface ComponentApolloOptions {
  /** Apollo client ID */
  $client?: string | (() => string);
  /** Skip all operations */
  $skipAll?: boolean | (() => boolean);
  /** Skip all queries */
  $skipAllQueries?: boolean | (() => boolean);
  /** Skip all subscriptions */
  $skipAllSubscriptions?: boolean | (() => boolean);
  /** Loading key */
  $loadingKey?: string | (() => string);
  /** Deep watch */
  $deep?: boolean;
  /** Error handler */
  $error?: (error: Error, vm: Vue, key: string, type: string, options: any) => void;
  /** Watch loading */
  $watchLoading?: (isLoading: boolean, countModifier: number) => void;
  /** Prefetch */
  $prefetch?: boolean;
  /** Subscriptions */
  $subscribe?: Record<string, SmartApolloOptions>;
  /** Queries */
  [key: string]: SmartApolloOptions | any;
}

/**
 * Vue instance with Apollo
 */
declare module 'vue/types/vue' {
  interface Vue {
    $apollo: DollarApollo;
    $apolloProvider?: ApolloProvider;
    $apolloData?: {
      queries: Record<string, { loading: boolean }>;
      loading: number;
      data: any;
    };
  }
}

/**
 * Vue component options with Apollo
 */
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    apollo?: ComponentApolloOptions;
    apolloProvider?: ApolloProvider | (() => ApolloProvider);
  }
}

export default ApolloProvider;

export {
  Globals,
  ThrottleFunction,
  DebounceFunction,
  SmartApolloOptions,
  SmartQueryResult,
  DollarApollo,
  SmartQuery,
  SmartSubscription,
};