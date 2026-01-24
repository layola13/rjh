/**
 * Factory function for creating final props selectors in a Redux connect-like implementation.
 * Combines state props, dispatch props, and own props into final component props.
 * 
 * @param context - The context object containing selector factories and configuration
 * @param options - Configuration options for the selector factory
 * @returns A memoized selector function that computes final props
 */
export default function selectorFactory<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  context: unknown,
  options: SelectorFactoryOptions<TStateProps, TDispatchProps, TOwnProps, TMergedProps>
): FinalPropsSelector<TMergedProps, TOwnProps>;

/**
 * Configuration options for the selector factory.
 */
export interface SelectorFactoryOptions<TStateProps, TDispatchProps, TOwnProps, TMergedProps> {
  /** Factory function that creates the mapStateToProps selector */
  initMapStateToProps: InitMapStateToProps<TStateProps, TOwnProps>;
  
  /** Factory function that creates the mapDispatchToProps selector */
  initMapDispatchToProps: InitMapDispatchToProps<TDispatchProps, TOwnProps>;
  
  /** Factory function that creates the mergeProps function */
  initMergeProps: InitMergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;
  
  /** Whether to use pure (memoized) selector. Defaults to true for performance optimization */
  pure?: boolean;
  
  /** Custom equality function for comparing states */
  areStatesEqual?: (nextState: unknown, prevState: unknown, nextOwnProps: TOwnProps, prevOwnProps: TOwnProps) => boolean;
  
  /** Custom equality function for comparing own props */
  areOwnPropsEqual?: (nextOwnProps: TOwnProps, prevOwnProps: TOwnProps) => boolean;
  
  /** Custom equality function for comparing state-derived props */
  areStatePropsEqual?: (nextStateProps: TStateProps, prevStateProps: TStateProps) => boolean;
}

/**
 * Factory function that initializes mapStateToProps selector.
 */
export type InitMapStateToProps<TStateProps, TOwnProps> = (
  context: unknown,
  options: Record<string, unknown>
) => MapStateToPropsFunc<TStateProps, TOwnProps>;

/**
 * Factory function that initializes mapDispatchToProps selector.
 */
export type InitMapDispatchToProps<TDispatchProps, TOwnProps> = (
  context: unknown,
  options: Record<string, unknown>
) => MapDispatchToPropsFunc<TDispatchProps, TOwnProps>;

/**
 * Factory function that initializes mergeProps function.
 */
export type InitMergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = (
  context: unknown,
  options: Record<string, unknown>
) => MergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;

/**
 * Function that extracts props from state.
 */
export interface MapStateToPropsFunc<TStateProps, TOwnProps> {
  (state: unknown, ownProps: TOwnProps): TStateProps;
  /** Flag indicating if this function depends on ownProps */
  dependsOnOwnProps?: boolean;
}

/**
 * Function that creates dispatchable action props.
 */
export interface MapDispatchToPropsFunc<TDispatchProps, TOwnProps> {
  (dispatch: unknown, ownProps: TOwnProps): TDispatchProps;
  /** Flag indicating if this function depends on ownProps */
  dependsOnOwnProps?: boolean;
}

/**
 * Function that merges state props, dispatch props, and own props into final props.
 */
export type MergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = (
  stateProps: TStateProps,
  dispatchProps: TDispatchProps,
  ownProps: TOwnProps
) => TMergedProps;

/**
 * Final selector function that computes merged props from state and own props.
 */
export type FinalPropsSelector<TMergedProps, TOwnProps> = (
  state: unknown,
  ownProps: TOwnProps
) => TMergedProps;

/**
 * Creates an impure (non-memoized) final props selector.
 * Recomputes props on every invocation without caching.
 * 
 * @param mapStateToProps - Function to extract state-derived props
 * @param mapDispatchToProps - Function to create dispatch props
 * @param mergeProps - Function to merge all props
 * @param dispatch - Redux dispatch function
 * @returns A selector that always recomputes final props
 */
export function impureFinalPropsSelectorFactory<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  mapStateToProps: MapStateToPropsFunc<TStateProps, TOwnProps>,
  mapDispatchToProps: MapDispatchToPropsFunc<TDispatchProps, TOwnProps>,
  mergeProps: MergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  dispatch: unknown
): FinalPropsSelector<TMergedProps, TOwnProps>;

/**
 * Creates a pure (memoized) final props selector.
 * Caches results and only recomputes when inputs change based on equality checks.
 * 
 * @param mapStateToProps - Function to extract state-derived props
 * @param mapDispatchToProps - Function to create dispatch props
 * @param mergeProps - Function to merge all props
 * @param dispatch - Redux dispatch function
 * @param options - Configuration with equality comparison functions
 * @returns A memoized selector that optimizes re-renders
 */
export function pureFinalPropsSelectorFactory<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  mapStateToProps: MapStateToPropsFunc<TStateProps, TOwnProps>,
  mapDispatchToProps: MapDispatchToPropsFunc<TDispatchProps, TOwnProps>,
  mergeProps: MergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  dispatch: unknown,
  options: PureSelectorOptions<TStateProps, TOwnProps>
): FinalPropsSelector<TMergedProps, TOwnProps>;

/**
 * Options for pure selector factory with equality comparison functions.
 */
export interface PureSelectorOptions<TStateProps, TOwnProps> {
  /** Compares two states for equality */
  areStatesEqual: (nextState: unknown, prevState: unknown, nextOwnProps: TOwnProps, prevOwnProps: TOwnProps) => boolean;
  
  /** Compares two ownProps objects for equality */
  areOwnPropsEqual: (nextOwnProps: TOwnProps, prevOwnProps: TOwnProps) => boolean;
  
  /** Compares two state-derived props objects for equality */
  areStatePropsEqual: (nextStateProps: TStateProps, prevStateProps: TStateProps) => boolean;
}