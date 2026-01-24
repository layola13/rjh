/**
 * 消息通知API接口
 * 提供添加消息通知的方法
 */
interface MessageApi {
  /**
   * 添加消息通知
   * @param key - 消息的唯一标识符
   * @param config - 消息配置
   */
  add(key: string, config: MessageConfig): void;
}

/**
 * 消息配置选项
 */
interface MessageConfig {
  /** 样式前缀 */
  prefixCls?: string;
  /** 消息唯一标识 */
  key?: string | number;
  /** 消息内容 */
  content?: React.ReactNode;
  /** 显示时长（秒），0表示不自动关闭 */
  duration?: number;
  /** 消息类型 */
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading';
  /** 关闭时的回调函数 */
  onClose?: () => void;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 消息通知销毁函数
 * 可以直接调用销毁消息，也可以作为Promise使用
 */
interface MessageDestroy {
  (): void;
  /** Promise化的销毁函数，在消息关闭后resolve */
  then<T = void>(onFulfilled?: (value: boolean) => T, onRejected?: (reason: unknown) => T): Promise<T>;
  /** 关闭消息的Promise */
  promise: Promise<boolean>;
}

/**
 * 消息实例API
 * 包含打开消息和类型快捷方法
 */
interface MessageInstance {
  /**
   * 打开消息通知
   * @param config - 消息配置选项
   * @returns 返回销毁函数，可用于手动关闭消息
   */
  open(config: MessageConfig): MessageDestroy;

  /**
   * 显示成功消息
   * @param content - 消息内容
   * @param duration - 显示时长（秒）
   * @param onClose - 关闭回调
   * @returns 销毁函数
   */
  success(content: React.ReactNode, duration?: number, onClose?: () => void): MessageDestroy;

  /**
   * 显示信息消息
   * @param content - 消息内容
   * @param duration - 显示时长（秒）
   * @param onClose - 关闭回调
   * @returns 销毁函数
   */
  info(content: React.ReactNode, duration?: number, onClose?: () => void): MessageDestroy;

  /**
   * 显示警告消息
   * @param content - 消息内容
   * @param duration - 显示时长（秒）
   * @param onClose - 关闭回调
   * @returns 销毁函数
   */
  warning(content: React.ReactNode, duration?: number, onClose?: () => void): MessageDestroy;

  /**
   * 显示错误消息
   * @param content - 消息内容
   * @param duration - 显示时长（秒）
   * @param onClose - 关闭回调
   * @returns 销毁函数
   */
  error(content: React.ReactNode, duration?: number, onClose?: () => void): MessageDestroy;

  /**
   * 显示加载中消息
   * @param content - 消息内容
   * @param duration - 显示时长（秒），默认0表示不自动关闭
   * @param onClose - 关闭回调
   * @returns 销毁函数
   */
  loading(content: React.ReactNode, duration?: number, onClose?: () => void): MessageDestroy;
}

/**
 * 消息渲染函数类型
 * @param config - 消息配置
 * @param prefixCls - 样式前缀
 * @returns React元素
 */
type MessageRenderer = (config: MessageConfig, prefixCls: string) => React.ReactElement;

/**
 * 消息初始化器函数类型
 * @param config - 消息配置
 * @param callback - 初始化完成后的回调，提供前缀和实例
 */
type MessageInitializer = (
  config: MessageConfig,
  callback: (params: { prefixCls: string; instance: MessageApi }) => void
) => void;

/**
 * useMessage Hook
 * 
 * 用于创建消息通知的React Hook，返回消息实例API和holder元素
 * 
 * @param initializer - 消息初始化函数
 * @param renderer - 消息渲染函数
 * @returns [0] 消息实例API，用于调用各种消息方法
 * @returns [1] Holder元素，需要渲染在组件树中以显示消息
 * 
 * @example
 *