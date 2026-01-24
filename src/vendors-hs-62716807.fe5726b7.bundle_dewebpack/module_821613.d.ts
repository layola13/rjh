/**
 * React createClass mixin utilities module
 * Provides functionality for creating React component classes with mixins (legacy React pattern)
 */

/**
 * Specification policy types for component methods
 */
type SpecPolicy =
  | 'DEFINE_ONCE'
  | 'DEFINE_MANY'
  | 'DEFINE_MANY_MERGED'
  | 'OVERRIDE_BASE';

/**
 * Component specification with lifecycle methods
 */
interface ComponentSpec<P = any, S = any, C = any> {
  /** Array of mixin objects to apply */
  mixins?: ComponentSpec[];
  /** Static properties */
  statics?: Record<string, any>;
  /** Prop type definitions */
  propTypes?: Record<string, any>;
  /** Context type definitions */
  contextTypes?: Record<string, any>;
  /** Child context type definitions */
  childContextTypes?: Record<string, any>;
  /** Display name for debugging */
  displayName?: string;
  /** Get default props */
  getDefaultProps?(): Partial<P>;
  /** Get initial state */
  getInitialState?(): Partial<S>;
  /** Get child context */
  getChildContext?(): Partial<C>;
  /** Render method (required) */
  render(): React.ReactElement | null;
  /** Lifecycle: component will mount */
  componentWillMount?(): void;
  /** Lifecycle: component did mount */
  componentDidMount?(): void;
  /** Lifecycle: component will receive props */
  componentWillReceiveProps?(nextProps: P): void;
  /** Lifecycle: should component update */
  shouldComponentUpdate?(nextProps: P, nextState: S): boolean;
  /** Lifecycle: component will update */
  componentWillUpdate?(nextProps: P, nextState: S): void;
  /** Lifecycle: component did update */
  componentDidUpdate?(prevProps: P, prevState: S): void;
  /** Lifecycle: component will unmount */
  componentWillUnmount?(): void;
  /** UNSAFE lifecycle methods */
  UNSAFE_componentWillMount?(): void;
  UNSAFE_componentWillReceiveProps?(nextProps: P): void;
  UNSAFE_componentWillUpdate?(nextProps: P, nextState: S): void;
  /** Update component override */
  updateComponent?(): void;
  /** Auto-bind methods flag */
  autobind?: boolean;
  /** Static method: get derived state from props */
  getDerivedStateFromProps?(props: P, state: S): Partial<S> | null;
  /** Additional custom methods */
  [key: string]: any;
}

/**
 * Component updater interface
 */
interface ComponentUpdater {
  /** Enqueue a state replacement */
  enqueueReplaceState<S>(instance: any, state: S, callback?: () => void): void;
}

/**
 * React component instance interface
 */
interface ComponentInstance<P = any, S = any, C = any> {
  /** Component props */
  props: P;
  /** Component state */
  state: S;
  /** Component context */
  context: C;
  /** Component refs */
  refs: Record<string, any>;
  /** Component updater */
  updater: ComponentUpdater;
  /** Display name */
  displayName?: string;
  /** Default props */
  defaultProps?: Partial<P>;
  /** Auto-bind pairs array */
  __reactAutoBindPairs: Array<string | Function>;
  /** Is mounted flag */
  __isMounted?: boolean;
  /** Get initial state */
  getInitialState?(): Partial<S> | null;
  /** Render method */
  render(): React.ReactElement | null;
  /** Replace component state */
  replaceState(state: S, callback?: () => void): void;
  /** Check if component is mounted */
  isMounted(): boolean;
}

/**
 * Component constructor type
 */
interface ComponentConstructor<P = any, S = any, C = any> {
  new (props: P, context: C, updater: ComponentUpdater): ComponentInstance<P, S, C>;
  prototype: ComponentInstance<P, S, C>;
  displayName?: string;
  defaultProps?: Partial<P>;
  getDefaultProps?(): Partial<P>;
}

/**
 * Spec policy map defining how component methods should be handled
 */
interface SpecPolicyMap {
  [key: string]: SpecPolicy;
}

/**
 * Property handler function type
 */
type PropertyHandler = (componentClass: ComponentConstructor, value: any) => void;

/**
 * Property handlers map
 */
interface PropertyHandlers {
  [key: string]: PropertyHandler;
}

/**
 * Creates a React component class from a specification object with mixins support
 * 
 * @param basePrototype - Base prototype to extend from
 * @param isReactComponent - Function to check if object is a React component
 * @param defaultUpdater - Default updater implementation
 * @returns Function that creates a component class from a specification
 */
export default function createMixinFactory(
  basePrototype: any,
  isReactComponent: (obj: any) => boolean,
  defaultUpdater: ComponentUpdater
): <P = any, S = any, C = any>(spec: ComponentSpec<P, S, C>) => ComponentConstructor<P, S, C>;

/**
 * Invariant error throwing utility
 * Throws an error with formatted message
 * 
 * @param condition - Condition that must be true
 * @param format - Error message format string
 * @param args - Format string arguments
 * @throws Error with formatted message
 */
declare function invariant(
  condition: boolean,
  format: string,
  ...args: any[]
): void;

/**
 * Merges two objects, throwing on duplicate keys
 * 
 * @param target - Target object
 * @param source - Source object to merge
 * @returns Merged object
 * @throws Error if duplicate keys are found
 */
declare function mergeIntoWithNoDuplicateKeys<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T;

/**
 * Creates a merged function that calls both functions and merges their results
 * 
 * @param baseFunc - Base function
 * @param mixinFunc - Mixin function
 * @returns Merged function
 */
declare function mergeFunctions<T extends (...args: any[]) => any>(
  baseFunc: T,
  mixinFunc: T
): T;

/**
 * Creates a chained function that calls both functions in sequence
 * 
 * @param baseFunc - Base function
 * @param mixinFunc - Mixin function
 * @returns Chained function
 */
declare function chainFunctions<T extends (...args: any[]) => void>(
  baseFunc: T,
  mixinFunc: T
): T;

/**
 * Binds a method to an instance
 * 
 * @param instance - Component instance
 * @param method - Method to bind
 * @returns Bound method
 */
declare function bindMethod<T extends Function>(
  instance: any,
  method: T
): T;

/**
 * Applies a mixin to a component class
 * 
 * @param componentClass - Component class constructor
 * @param mixin - Mixin specification to apply
 */
declare function applyMixin(
  componentClass: ComponentConstructor,
  mixin: ComponentSpec
): void;

/**
 * Validates a spec key against the policy map
 * 
 * @param isAlreadyDefined - Whether the key is already defined
 * @param specKey - The specification key being validated
 */
declare function validateSpecKey(
  isAlreadyDefined: boolean,
  specKey: string
): void;

/**
 * Auto-binds methods in a component instance
 * 
 * @param instance - Component instance with __reactAutoBindPairs array
 */
declare function autoBindMethods(instance: ComponentInstance): void;