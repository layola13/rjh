/**
 * 用户设置日志监听器模块
 * 用于监听和记录用户设置变更事件
 */

/**
 * 插件管理器接口
 * 负责管理和获取各类插件实例
 */
interface PluginManager {
  /**
   * 根据插件类型获取对应的插件实例
   * @param pluginType - 插件类型标识
   */
  getPlugin(pluginType: string): UserSettingPlugin;
}

/**
 * 用户设置插件接口
 * 提供用户设置相关的信号和操作
 */
interface UserSettingPlugin {
  /**
   * 用户设置变更信号
   * 当用户设置需要记录到日志时触发
   */
  signalUserSettingToLog: Signal<unknown>;
}

/**
 * 信号接口
 * 用于事件订阅和触发机制
 */
interface Signal<T> {
  // 信号相关方法会在实际实现中定义
}

/**
 * 日志监听器上下文接口
 * 包含插件管理器和其他运行时上下文
 */
interface ListenerContext {
  /**
   * 插件管理器实例
   */
  pluginManager: PluginManager;
}

/**
 * 事件数据包装接口
 * 包含实际的事件数据负载
 */
interface EventData<T = unknown> {
  /**
   * 嵌套的数据结构
   */
  data: {
    /**
     * 实际的事件数据
     */
    data: T;
  };
}

/**
 * 用户设置数据接口
 * 表示需要保存的用户设置内容
 */
interface UserSettingData {
  // 具体的用户设置字段将在实际使用中定义
  [key: string]: unknown;
}

/**
 * 日志数据接口
 * 表示创建的日志条目
 */
interface LogData {
  /**
   * 日志事件类型
   */
  eventType: string;
  
  /**
   * 日志数据负载
   */
  payload: {
    saveUserSetting: UserSettingData;
  };
}

/**
 * 日志监听器接口
 * 定义日志监听器的标准结构
 */
interface LogListener {
  /**
   * 获取需要监听的信号
   * @param context - 监听器上下文，包含插件管理器等
   * @returns 返回用户设置变更信号
   */
  getListenSignal(context: ListenerContext): Signal<unknown>;
  
  /**
   * 监听事件并生成日志数据
   * @param event - 包含用户设置数据的事件对象
   * @returns 返回日志数据数组
   */
  listen(event: EventData<UserSettingData>): LogData[];
}

/**
 * HSFP常量命名空间
 * 包含插件类型等常量定义
 */
declare namespace HSFPConstants {
  /**
   * 插件类型枚举
   */
  enum PluginType {
    /**
     * 用户设置插件类型
     */
    UserSetting = 'UserSetting'
  }
}

/**
 * 创建日志数据的工具函数
 * @param eventType - 日志事件类型（如 "click.userSetting"）
 * @param payload - 日志数据负载
 * @returns 返回格式化的日志数据对象
 */
declare function createLogData(
  eventType: string,
  payload: { saveUserSetting: UserSettingData }
): LogData;

/**
 * 用户设置日志监听器配置数组
 * 默认导出，包含监听器实例
 */
declare const userSettingLogListeners: LogListener[];

export default userSettingLogListeners;