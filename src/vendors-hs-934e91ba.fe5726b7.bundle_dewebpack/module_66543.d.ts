/**
 * Mini Store Connect - Redux-like state connection for React components
 * Provides HOC functionality to connect React components to a centralized store
 */

/**
 * Store interface representing the state container
 */
export interface Store<S = any> {
  /**
   * Get the current state from the store
   */
  getState(): S;
  
  /**
   * Subscribe to store changes
   * @returns Unsubscribe function
   */
  subscribe(listener: () => void): () => void;
}

/**
 * Map state to props function signature
 * @template S - Store state type
 * @template P - Component props type
 * @template R - Resulting mapped props type
 */
export type MapStateToProps<S = any, P = any, R = any> = (
  state: S,
  ownProps: P
) => R;

/**
 * Connect options configuration
 */
export interface ConnectOptions {
  /**
   * Whether to forward refs through the connected component
   */
  forwardRef?: boolean;
}

/**
 * Props injected into connected components
 */
export interface InjectedStoreProps<S = any> {
  /**
   * The store instance
   */
  store: Store<S>;
}

/**
 * Internal state of the connected component wrapper
 */
interface ConnectedComponentState<R = any, S = any, P = any> {
  /**
   * Props derived from store state
   */
  subscribed: R;
  
  /**
   * Reference to the store instance
   */
  store: Store<S>;
  
  /**
   * Original component props
   */
  props: P;
}

/**
 * Connect function - Higher Order Component that connects React components to store
 * 
 * @template S - Store state type
 * @template P - Original component props type
 * @template R - Mapped props type from store state
 * 
 * @param mapStateToProps - Optional function to map store state to component props
 * @param options - Connection options including forwardRef support
 * 
 * @returns HOC function that wraps a component with store connection
 * 
 * @example
 *