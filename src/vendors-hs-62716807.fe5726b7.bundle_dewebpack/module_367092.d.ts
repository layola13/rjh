/**
 * Redux store 配置接口
 */
interface ReduxConfig {
  /** Redux 中间件数组 */
  middlewares: Array<any>;
  /** 根 reducers */
  rootReducers?: Record<string, any>;
}

/**
 * Model 基础配置接口
 */
interface ModelConfig<TState = any> {
  /** Model 名称（必需） */
  name: string;
  /** Model 初始状态 */
  state?: TState;
  /** Reducers 定义 */
  reducers?: Record<string, (state: TState, payload?: any) => TState>;
  /** 基础 reducer 函数 */
  baseReducer?: (state: TState, action: any) => TState;
  /** Effects 定义 */
  effects?: Record<string, any>;
}

/**
 * 内部扩展的 Model 配置
 */
interface InternalModelConfig<TState = any> extends ModelConfig<TState> {
  /** 确保 reducers 字段存在 */
  reducers: Record<string, (state: TState, payload?: any) => TState>;
}

/**
 * 插件接口定义
 */
interface Plugin {
  /** 插件中间件 */
  middleware?: any;
  /** Model 注册时的钩子 */
  onModel?: (model: ModelConfig) => void;
  /** Store 创建后的钩子 */
  onStoreCreated?: (store: Store) => Partial<Store> | void;
}

/**
 * 插件工厂接口
 */
interface PluginFactory {
  /** 创建插件实例 */
  create: (pluginConfig: any) => Plugin;
}

/**
 * Store 增强接口
 */
interface Store {
  /** Store 名称 */
  name?: string;
  /** 动态添加 Model */
  model: <TState = any>(modelConfig: ModelConfig<TState>) => void;
  /** Redux dispatch 方法 */
  dispatch: (action: any) => any;
  /** 获取当前状态 */
  getState?: () => any;
  /** 替换 reducer */
  replaceReducer?: (reducer: any) => void;
  /** 其他扩展属性 */
  [key: string]: any;
}

/**
 * Rematch 配置接口
 */
interface RematchConfig {
  /** Store 名称 */
  name?: string;
  /** Models 定义 */
  models: Record<string, ModelConfig>;
  /** Redux 配置 */
  redux: ReduxConfig;
  /** 插件列表 */
  plugins?: Array<any>;
}

/**
 * Rematch 核心类
 * 负责管理 Redux store、models 和插件系统
 */
export default class Rematch {
  /** 插件列表 */
  private plugins: Plugin[];
  
  /** 配置对象 */
  private config: RematchConfig;
  
  /** 插件工厂实例 */
  private pluginFactory: PluginFactory;
  
  /** Models 列表 */
  private models: InternalModelConfig[];

  /**
   * 构造函数
   * @param config - Rematch 配置对象
   */
  constructor(config: RematchConfig);

  /**
   * 将 models 对象转换为 model 数组
   * @param models - Models 配置对象
   * @returns Model 配置数组
   */
  private getModels(models: Record<string, ModelConfig>): InternalModelConfig[];

  /**
   * 遍历所有插件并执行指定方法
   * @param methodName - 插件方法名
   * @param callback - 回调函数
   */
  private forEachPlugin(methodName: keyof Plugin, callback: (method: any) => void): void;

  /**
   * 添加一个 Model 到 Store
   * @param modelConfig - Model 配置对象
   * @throws 当 model 配置不合法时抛出错误
   */
  addModel<TState = any>(modelConfig: ModelConfig<TState>): void;

  /**
   * 初始化 Rematch，创建 Redux Store
   * @returns 增强后的 Store 实例
   */
  init(): Store;
}

/**
 * 默认导出 Rematch 类
 */
export { Rematch };