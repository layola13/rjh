type StateProps = Record<string, unknown>;
type DispatchProps = Record<string, unknown>;
type OwnProps = Record<string, unknown>;
type MergedProps = Record<string, unknown>;

interface MapStateToProps {
  (state: unknown, ownProps: OwnProps): StateProps;
  dependsOnOwnProps?: boolean;
}

interface MapDispatchToProps {
  (dispatch: unknown, ownProps: OwnProps): DispatchProps;
  dependsOnOwnProps?: boolean;
}

type MergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
) => MergedProps;

interface SelectorFactoryOptions {
  initMapStateToProps: (dispatch: unknown, options: Omit<SelectorFactoryOptions, 'initMapStateToProps' | 'initMapDispatchToProps' | 'initMergeProps'>) => MapStateToProps;
  initMapDispatchToProps: (dispatch: unknown, options: Omit<SelectorFactoryOptions, 'initMapStateToProps' | 'initMapDispatchToProps' | 'initMergeProps'>) => MapDispatchToProps;
  initMergeProps: (dispatch: unknown, options: Omit<SelectorFactoryOptions, 'initMapStateToProps' | 'initMapDispatchToProps' | 'initMergeProps'>) => MergeProps;
  pure?: boolean;
  areStatesEqual?: (nextState: unknown, prevState: unknown, nextProps: OwnProps, prevProps: OwnProps) => boolean;
  areOwnPropsEqual?: (nextProps: OwnProps, prevProps: OwnProps) => boolean;
  areStatePropsEqual?: (nextProps: StateProps, prevProps: StateProps) => boolean;
}

type PropsSelector = (state: unknown, ownProps: OwnProps) => MergedProps;

export function impureFinalPropsSelectorFactory(
  mapStateToProps: MapStateToProps,
  mapDispatchToProps: MapDispatchToProps,
  mergeProps: MergeProps,
  dispatch: unknown
): PropsSelector {
  return function (state: unknown, ownProps: OwnProps): MergedProps {
    return mergeProps(
      mapStateToProps(state, ownProps),
      mapDispatchToProps(dispatch, ownProps),
      ownProps
    );
  };
}

export function pureFinalPropsSelectorFactory(
  mapStateToProps: MapStateToProps,
  mapDispatchToProps: MapDispatchToProps,
  mergeProps: MergeProps,
  dispatch: unknown,
  options: Pick<SelectorFactoryOptions, 'areStatesEqual' | 'areOwnPropsEqual' | 'areStatePropsEqual'>
): PropsSelector {
  const {
    areStatesEqual,
    areOwnPropsEqual,
    areStatePropsEqual
  } = options;

  let prevState: unknown;
  let prevOwnProps: OwnProps;
  let prevStateProps: StateProps;
  let prevDispatchProps: DispatchProps;
  let prevMergedProps: MergedProps;
  let hasRunAtLeastOnce = false;

  function handleSubsequentCalls(state: unknown, ownProps: OwnProps): MergedProps {
    const ownPropsChanged = !areOwnPropsEqual?.(ownProps, prevOwnProps);
    const stateChanged = !areStatesEqual?.(state, prevState, ownProps, prevOwnProps);

    prevState = state;
    prevOwnProps = ownProps;

    if (ownPropsChanged && stateChanged) {
      prevStateProps = mapStateToProps(prevState, prevOwnProps);
      if (mapDispatchToProps.dependsOnOwnProps) {
        prevDispatchProps = mapDispatchToProps(dispatch, prevOwnProps);
      }
      prevMergedProps = mergeProps(prevStateProps, prevDispatchProps, prevOwnProps);
    } else if (ownPropsChanged) {
      if (mapStateToProps.dependsOnOwnProps) {
        prevStateProps = mapStateToProps(prevState, prevOwnProps);
      }
      if (mapDispatchToProps.dependsOnOwnProps) {
        prevDispatchProps = mapDispatchToProps(dispatch, prevOwnProps);
      }
      prevMergedProps = mergeProps(prevStateProps, prevDispatchProps, prevOwnProps);
    } else if (stateChanged) {
      const nextStateProps = mapStateToProps(prevState, prevOwnProps);
      const statePropsChanged = !areStatePropsEqual?.(nextStateProps, prevStateProps);
      prevStateProps = nextStateProps;
      if (statePropsChanged) {
        prevMergedProps = mergeProps(prevStateProps, prevDispatchProps, prevOwnProps);
      }
    }

    return prevMergedProps;
  }

  return function (state: unknown, ownProps: OwnProps): MergedProps {
    if (hasRunAtLeastOnce) {
      return handleSubsequentCalls(state, ownProps);
    }

    prevState = state;
    prevOwnProps = ownProps;
    prevStateProps = mapStateToProps(prevState, prevOwnProps);
    prevDispatchProps = mapDispatchToProps(dispatch, prevOwnProps);
    prevMergedProps = mergeProps(prevStateProps, prevDispatchProps, prevOwnProps);
    hasRunAtLeastOnce = true;

    return prevMergedProps;
  };
}

export default function finalPropsSelectorFactory(
  dispatch: unknown,
  options: SelectorFactoryOptions
): PropsSelector {
  const {
    initMapStateToProps,
    initMapDispatchToProps,
    initMergeProps,
    pure = true,
    ...restOptions
  } = options;

  const mapStateToProps = initMapStateToProps(dispatch, restOptions);
  const mapDispatchToProps = initMapDispatchToProps(dispatch, restOptions);
  const mergeProps = initMergeProps(dispatch, restOptions);

  const selectorFactory = pure
    ? pureFinalPropsSelectorFactory
    : impureFinalPropsSelectorFactory;

  return selectorFactory(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    dispatch,
    restOptions
  );
}