/**
 * Connect function factory for React-Redux
 * Creates HOC (Higher-Order Component) to connect React components to Redux store
 */

/**
 * Selector factory function type
 */
type SelectorFactory = (dispatch: any, options: any) => any;

/**
 * Factory function that creates mapStateToProps
 */
type MapStateToPropsFactory = (initialState: any, initialOwnProps: any) => MapStateToPropsFunction | null;

/**
 * Function that maps state to props
 */
type MapStateToPropsFunction = (state: any, ownProps?: any) => Record<string, any>;

/**
 * Factory function that creates mapDispatchToProps
 */
type MapDispatchToPropsFactory = (dispatch: any, initialOwnProps: any) => MapDispatchToPropsFunction | null;

/**
 * Function that maps dispatch to props
 */
type MapDispatchToPropsFunction = (dispatch: any, ownProps?: any) => Record<string, any>;

/**
 * Factory function that creates mergeProps
 */
type MergePropsFactory = (dispatch: any, options: any) => MergePropsFunction | null;

/**
 * Function that merges state props, dispatch props and own props
 */
type MergePropsFunction = (stateProps: any, dispatchProps: any, ownProps: any) => Record<string, any>;

/**
 * Higher-Order Component that connects a component to Redux store
 */
type ConnectHOC = (selectorFactory: SelectorFactory, options: ConnectOptions) => <P>(component: React.ComponentType<P>) => React.ComponentType<P>;

/**
 * Equality comparison function
 */
type EqualityFunction = (left: any, right: any) => boolean;

/**
 * Options for connect HOC initialization
 */
interface ConnectOptions {
  /** Method name for debugging */
  methodName: string;
  /** Function to generate display name for wrapped component */
  getDisplayName: (componentName: string) => string;
  /** Whether component should subscribe to store state changes */
  shouldHandleStateChanges: boolean;
  /** Initialize mapStateToProps function */
  initMapStateToProps: MapStateToPropsFactory;
  /** Initialize mapDispatchToProps function */
  initMapDispatchToProps: MapDispatchToPropsFactory;
  /** Initialize mergeProps function */
  initMergeProps: MergePropsFactory;
  /** Whether to use pure component optimization */
  pure: boolean;
  /** Function to compare previous and next states */
  areStatesEqual: EqualityFunction;
  /** Function to compare previous and next own props */
  areOwnPropsEqual: EqualityFunction;
  /** Function to compare previous and next state props */
  areStatePropsEqual: EqualityFunction;
  /** Function to compare previous and next merged props */
  areMergedPropsEqual: EqualityFunction;
  [key: string]: any;
}

/**
 * Configuration for createConnect factory
 */
interface CreateConnectConfig {
  /** Custom connect HOC implementation */
  connectHOC?: ConnectHOC;
  /** Array of mapStateToProps factory functions */
  mapStateToPropsFactories?: MapStateToPropsFactory[];
  /** Array of mapDispatchToProps factory functions */
  mapDispatchToPropsFactories?: MapDispatchToPropsFactory[];
  /** Array of mergeProps factory functions */
  mergePropsFactories?: MergePropsFactory[];
  /** Selector factory function */
  selectorFactory?: SelectorFactory;
}

/**
 * Configuration options for connect function
 */
interface ConnectConfig {
  /** Whether to use pure component optimization (default: true) */
  pure?: boolean;
  /** Custom equality function for states (default: strict equality) */
  areStatesEqual?: EqualityFunction;
  /** Custom equality function for own props (default: shallow equality) */
  areOwnPropsEqual?: EqualityFunction;
  /** Custom equality function for state props (default: shallow equality) */
  areStatePropsEqual?: EqualityFunction;
  /** Custom equality function for merged props (default: shallow equality) */
  areMergedPropsEqual?: EqualityFunction;
  [key: string]: any;
}

/**
 * Connect function that creates HOC for connecting React components to Redux
 */
type ConnectFunction = <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
  mapStateToProps?: MapStateToPropsFunction | null,
  mapDispatchToProps?: MapDispatchToPropsFunction | Record<string, any> | null,
  mergeProps?: MergePropsFunction | null,
  options?: ConnectConfig
) => <P>(component: React.ComponentType<P>) => React.ComponentType<P>;

/**
 * Default strict equality comparison
 * @param left - First value to compare
 * @param right - Second value to compare
 * @returns True if values are strictly equal
 */
export declare function defaultAreStatesEqual(left: any, right: any): boolean;

/**
 * Matches a factory function from the provided factories array
 * @param value - The value to match (mapStateToProps, mapDispatchToProps, or mergeProps)
 * @param factories - Array of factory functions to try
 * @param name - Name of the parameter for error messages
 * @returns Matched factory function or error thrower
 */
export declare function match(
  value: any,
  factories: Array<(value: any) => any>,
  name: string
): (initialState: any, options: any) => any;

/**
 * Creates a customizable connect function factory
 * @param config - Configuration object for connect behavior
 * @returns Connect function with custom configuration
 */
export declare function createConnect(config?: CreateConnectConfig): ConnectFunction;

/**
 * Default connect function with standard React-Redux behavior
 */
declare const connect: ConnectFunction;

export default connect;