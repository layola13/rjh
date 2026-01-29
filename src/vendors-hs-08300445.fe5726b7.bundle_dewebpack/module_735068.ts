/**
 * React-Redux connect() 高阶组件工厂函数
 * 用于创建连接 React 组件与 Redux store 的连接器
 */

/**
 * mapStateToProps 工厂函数类型
 * 从 Redux state 中提取数据并映射到组件 props
 */
type MapStateToPropsFactory<TStateProps = unknown, TOwnProps = unknown, State = unknown> = (
  dispatch: unknown,
  factoryOptions: unknown
) => MapStateToPropsFunction<TStateProps, TOwnProps, State> | null;

/**
 * mapDispatchToProps 工厂函数类型
 * 将 action creators 绑定到 dispatch 并映射到组件 props
 */
type MapDispatchToPropsFactory<TDispatchProps = unknown, TOwnProps = unknown> = (
  dispatch: unknown,
  factoryOptions: unknown
) => MapDispatchToPropsFunction<TDispatchProps, TOwnProps> | null;

/**
 * mergeProps 工厂函数类型
 * 合并 stateProps、dispatchProps 和 ownProps
 */
type MergePropsFactory<TMergedProps = unknown, TStateProps = unknown, TDispatchProps = unknown, TOwnProps = unknown> = (
  dispatch: unknown,
  factoryOptions: unknown
) => MergePropsFunction<TMergedProps, TStateProps, TDispatchProps, TOwnProps> | null;

/**
 * mapStateToProps 函数类型
 */
type MapStateToPropsFunction<TStateProps, TOwnProps, State> = (
  state: State,
  ownProps: TOwnProps
) => TStateProps;

/**
 * mapDispatchToProps 函数类型
 */
type MapDispatchToPropsFunction<TDispatchProps, TOwnProps> = (
  dispatch: unknown,
  ownProps: TOwnProps
) => TDispatchProps;

/**
 * mergeProps 函数类型
 */
type MergePropsFunction<TMergedProps, TStateProps, TDispatchProps, TOwnProps> = (
  stateProps: TStateProps,
  dispatchProps: TDispatchProps,
  ownProps: TOwnProps
) => TMergedProps;

/**
 * 相等性比较函数类型
 */
type EqualityFunction<T = unknown> = (a: T, b: T) => boolean;

/**
 * Selector 工厂函数类型
 */
type SelectorFactory = (dispatch: unknown, options: SelectorFactoryOptions) => unknown;

/**
 * Selector 工厂配置选项
 */
interface SelectorFactoryOptions {
  /** 方法名称（用于错误消息） */
  methodName: string;
  /** 获取组件显示名称的函数 */
  getDisplayName: (componentName: string) => string;
  /** 是否应该处理 state 变化 */
  shouldHandleStateChanges: boolean;
  /** 初始化 mapStateToProps */
  initMapStateToProps: MapStateToPropsFactory;
  /** 初始化 mapDispatchToProps */
  initMapDispatchToProps: MapDispatchToPropsFactory;
  /** 初始化 mergeProps */
  initMergeProps: MergePropsFactory;
  /** 是否启用纯组件优化 */
  pure: boolean;
  /** state 相等性比较函数 */
  areStatesEqual: EqualityFunction;
  /** ownProps 相等性比较函数 */
  areOwnPropsEqual: EqualityFunction;
  /** stateProps 相等性比较函数 */
  areStatePropsEqual: EqualityFunction;
  /** mergedProps 相等性比较函数 */
  areMergedPropsEqual: EqualityFunction;
  /** 其他扩展选项 */
  [key: string]: unknown;
}

/**
 * Connect 高阶组件类型
 */
type ConnectHOC = (
  selectorFactory: SelectorFactory,
  options: SelectorFactoryOptions
) => <TProps>(component: React.ComponentType<TProps>) => React.ComponentType<TProps>;

/**
 * Connect 配置选项
 */
interface ConnectOptions {
  /** 连接高阶组件实现 */
  connectHOC?: ConnectHOC;
  /** mapStateToProps 工厂函数数组 */
  mapStateToPropsFactories?: MapStateToPropsFactory[];
  /** mapDispatchToProps 工厂函数数组 */
  mapDispatchToPropsFactories?: MapDispatchToPropsFactory[];
  /** mergeProps 工厂函数数组 */
  mergePropsFactories?: MergePropsFactory[];
  /** selector 工厂函数 */
  selectorFactory?: SelectorFactory;
}

/**
 * Connect 函数运行时配置选项
 */
interface ConnectRuntimeOptions {
  /** 是否启用纯组件优化（默认 true） */
  pure?: boolean;
  /** state 相等性比较函数（默认使用严格相等） */
  areStatesEqual?: EqualityFunction;
  /** ownProps 相等性比较函数（默认使用 shallowEqual） */
  areOwnPropsEqual?: EqualityFunction;
  /** stateProps 相等性比较函数（默认使用 shallowEqual） */
  areStatePropsEqual?: EqualityFunction;
  /** mergedProps 相等性比较函数（默认使用 shallowEqual） */
  areMergedPropsEqual?: EqualityFunction;
  /** 其他扩展选项 */
  [key: string]: unknown;
}

/**
 * Connect 函数类型
 */
type ConnectFunction = <TStateProps = unknown, TDispatchProps = unknown, TOwnProps = unknown, TMergedProps = unknown>(
  mapStateToProps?: MapStateToPropsFunction<TStateProps, TOwnProps, unknown> | null,
  mapDispatchToProps?: MapDispatchToPropsFunction<TDispatchProps, TOwnProps> | null,
  mergeProps?: MergePropsFunction<TMergedProps, TStateProps, TDispatchProps, TOwnProps> | null,
  options?: ConnectRuntimeOptions
) => <TComponent extends React.ComponentType<TMergedProps>>(component: TComponent) => TComponent;

/**
 * 组件包装信息（用于错误消息）
 */
interface ComponentWrapperInfo {
  /** 被包装组件的名称 */
  wrappedComponentName: string;
}

/**
 * 验证并匹配合适的工厂函数
 * @param value - 要匹配的值（mapStateToProps、mapDispatchToProps 或 mergeProps）
 * @param factories - 工厂函数数组
 * @param argumentName - 参数名称（用于错误消息）
 * @returns 匹配的工厂函数或错误抛出函数
 */
declare function matchFactory<T>(
  value: T,
  factories: Array<(value: T) => unknown | null>,
  argumentName: string
): (dispatch: unknown, wrapperInfo: ComponentWrapperInfo) => unknown;

/**
 * 默认的严格相等比较函数
 * @param a - 第一个值
 * @param b - 第二个值
 * @returns 是否严格相等
 */
declare function strictEqual<T>(a: T, b: T): boolean;

/**
 * 创建自定义的 connect 函数
 * @param options - connect 配置选项
 * @returns 自定义的 connect 函数
 */
export declare function createConnect(options?: ConnectOptions): ConnectFunction;

/**
 * 默认的 connect 函数
 * 用于将 React 组件连接到 Redux store
 */
declare const connect: ConnectFunction;

export default connect;