export interface MergePropsOptions {
  displayName?: string;
  pure: boolean;
  areMergedPropsEqual: (next: any, prev: any) => boolean;
}

export type MergePropsFunc = (
  stateProps: any,
  dispatchProps: any,
  ownProps: any
) => any;

export type MergePropsFactoryFunc = (
  dispatch: any,
  options: MergePropsOptions
) => MergePropsFunc;

export function defaultMergeProps(
  stateProps: any,
  dispatchProps: any,
  ownProps: any
): any {
  return { ...ownProps, ...stateProps, ...dispatchProps };
}

export function wrapMergePropsFunc(
  mergeProps: MergePropsFunc
): MergePropsFactoryFunc {
  return function (dispatch: any, options: MergePropsOptions): MergePropsFunc {
    const { pure, areMergedPropsEqual } = options;
    let hasRunAtLeastOnce = false;
    let mergedProps: any;

    return function (stateProps: any, dispatchProps: any, ownProps: any): any {
      const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunAtLeastOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) {
          mergedProps = nextMergedProps;
        }
      } else {
        hasRunAtLeastOnce = true;
        mergedProps = nextMergedProps;
      }

      return mergedProps;
    };
  };
}

export function whenMergePropsIsFunction(
  mergeProps: any
): MergePropsFactoryFunc | undefined {
  return typeof mergeProps === 'function'
    ? wrapMergePropsFunc(mergeProps)
    : undefined;
}

export function whenMergePropsIsOmitted(
  mergeProps: any
): (() => typeof defaultMergeProps) | undefined {
  return mergeProps
    ? undefined
    : function () {
        return defaultMergeProps;
      };
}

export default [whenMergePropsIsFunction, whenMergePropsIsOmitted];