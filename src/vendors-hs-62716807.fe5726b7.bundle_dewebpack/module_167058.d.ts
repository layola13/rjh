/**
 * Redux配置接口
 */
interface ReduxConfig<TState = any> {
  /** Redux reducers映射 */
  reducers?: Record<string, Reducer>;
  /** 根级别的reducers */
  rootReducers?: Record<string, Reducer>;
  /** Redux store增强器数组 */
  enhancers?: StoreEnhancer[];
  /** Redux中间件数组 */
  middlewares?: Middleware[];
  /** Redux初始状态 */
  initialStates?: TState;
  /** 自定义的combineReducers函数 */
  combineReducers?: (reducers: Record<string, Reducer>) => Reducer;
  /** 自定义的createStore函数 */
  createStore?: (
    reducer: Reducer,
    preloadedState?: any,
    enhancer?: StoreEnhancer
  ) => Store;
  /** Redux DevTools配置选项 */
  devtoolOptions?: {
    /** DevTools显示名称 */
    name?: string;
    [key: string]: any;
  };
}

/**
 * 插件配置接口
 */
interface PluginConfig {
  /** 模型定义 */
  models?: Record<string, ModelConfig>;
  /** 嵌套插件数组 */
  plugins?: Plugin[];
  /** Redux相关配置 */
  redux?: ReduxConfig;
}

/**
 * 插件接口
 */
interface Plugin {
  /** 插件配置对象 */
  config?: PluginConfig;
  [key: string]: any;
}

/**
 * 模型配置接口
 */
interface ModelConfig {
  /** 模型的state */
  state?: any;
  /** 模型的reducers */
  reducers?: Record<string, Reducer>;
  /** 模型的effects */
  effects?: Record<string, Effect>;
  [key: string]: any;
}

/**
 * 应用配置接口(输入)
 */
interface InputConfig {
  /** 应用名称 */
  name: string;
  /** 模型定义集合 */
  models?: Record<string, ModelConfig>;
  /** 插件数组 */
  plugins?: Plugin[];
  /** Redux配置 */
  redux?: Partial<ReduxConfig>;
}

/**
 * 应用配置接口(输出 - 经过规范化处理)
 */
interface NormalizedConfig {
  /** 应用名称 */
  name: string;
  /** 模型定义集合 */
  models: Record<string, ModelConfig>;
  /** 插件数组 */
  plugins: Plugin[];
  /** 完整的Redux配置 */
  redux: Required<ReduxConfig>;
}

/**
 * Redux Reducer类型
 */
type Reducer<S = any, A = any> = (state: S | undefined, action: A) => S;

/**
 * Redux Store增强器类型
 */
type StoreEnhancer = (next: StoreCreator) => StoreCreator;

/**
 * Redux Store创建器类型
 */
type StoreCreator = (
  reducer: Reducer,
  preloadedState?: any,
  enhancer?: StoreEnhancer
) => Store;

/**
 * Redux Store接口
 */
interface Store<S = any, A = any> {
  dispatch: Dispatch<A>;
  getState(): S;
  subscribe(listener: () => void): () => void;
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

/**
 * Redux Dispatch类型
 */
type Dispatch<A = any> = (action: A) => A;

/**
 * Redux中间件类型
 */
type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => Dispatch;

/**
 * Redux中间件API接口
 */
interface MiddlewareAPI<S = any> {
  dispatch: Dispatch;
  getState(): S;
}

/**
 * Effect类型
 */
type Effect = (...args: any[]) => any;

/**
 * 配置规范化函数
 * 
 * 接收用户提供的配置对象,并返回经过规范化处理的完整配置。
 * 该函数会:
 * 1. 为所有可选字段提供默认值
 * 2. 合并所有插件的配置
 * 3. 处理嵌套插件
 * 4. 设置Redux DevTools选项
 * 
 * @param config - 用户提供的应用配置
 * @returns 规范化后的完整配置对象
 * 
 * @example
 *