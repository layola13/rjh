/**
 * Redux 连接组件的 props 合并策略模块
 * 用于 react-redux connect 函数中合并 stateProps, dispatchProps 和 ownProps
 */

/**
 * 合并后的 props 对象类型
 */
export type MergedProps<TStateProps = unknown, TDispatchProps = unknown, TOwnProps = unknown> = 
  TStateProps & TDispatchProps & TOwnProps;

/**
 * props 合并函数类型
 * @param stateProps - 从 mapStateToProps 返回的 props
 * @param dispatchProps - 从 mapDispatchToProps 返回的 props
 * @param ownProps - 组件自身接收的 props
 * @returns 合并后的 props 对象
 */
export type MergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = (
  stateProps: TStateProps,
  dispatchProps: TDispatchProps,
  ownProps: TOwnProps
) => TMergedProps;

/**
 * 合并 props 配置选项
 */
export interface MergePropsOptions {
  /** 组件显示名称 */
  displayName?: string;
  /** 是否启用纯组件优化 */
  pure?: boolean;
  /** 比较合并后的 props 是否相等的函数 */
  areMergedPropsEqual?: (next: unknown, prev: unknown) => boolean;
}

/**
 * 包装后的合并函数类型
 */
export type WrappedMergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = (
  stateProps: TStateProps,
  dispatchProps: TDispatchProps,
  ownProps: TOwnProps
) => TMergedProps;

/**
 * 合并 props 工厂函数类型
 */
export type MergePropsFactory<TStateProps, TDispatchProps, TOwnProps, TMergedProps> = 
  (dispatch: unknown, options: MergePropsOptions) => WrappedMergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;

/**
 * 默认的 props 合并实现
 * 按照 ownProps < stateProps < dispatchProps 的优先级顺序合并
 * 
 * @param stateProps - 来自 state 的 props
 * @param dispatchProps - 来自 dispatch 的 props
 * @param ownProps - 组件原有的 props
 * @returns 合并后的 props 对象
 */
export function defaultMergeProps<TStateProps, TDispatchProps, TOwnProps>(
  stateProps: TStateProps,
  dispatchProps: TDispatchProps,
  ownProps: TOwnProps
): MergedProps<TStateProps, TDispatchProps, TOwnProps>;

/**
 * 包装 props 合并函数，添加缓存和相等性检查优化
 * 
 * @param mergePropsFunc - 用户提供的 props 合并函数
 * @returns 包装后的工厂函数
 */
export function wrapMergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  mergePropsFunc: MergePropsFunc<TStateProps, TDispatchProps, TOwnProps, TMergedProps>
): MergePropsFactory<TStateProps, TDispatchProps, TOwnProps, TMergedProps>;

/**
 * 当 mergeProps 参数是函数时的处理策略
 * 
 * @param mergeProps - 可能是函数的 mergeProps 参数
 * @returns 包装后的工厂函数或 undefined
 */
export function whenMergePropsIsFunction<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  mergeProps: unknown
): MergePropsFactory<TStateProps, TDispatchProps, TOwnProps, TMergedProps> | undefined;

/**
 * 当 mergeProps 参数被省略时的处理策略
 * 
 * @param mergeProps - mergeProps 参数（检查是否为 undefined/null）
 * @returns 返回默认合并函数的工厂或 undefined
 */
export function whenMergePropsIsOmitted(
  mergeProps: unknown
): (() => typeof defaultMergeProps) | undefined;

/**
 * mergeProps 处理策略数组
 * 按顺序尝试每个策略，直到找到匹配的处理方式
 */
declare const mergePropsStrategies: [
  typeof whenMergePropsIsFunction,
  typeof whenMergePropsIsOmitted
];

export default mergePropsStrategies;