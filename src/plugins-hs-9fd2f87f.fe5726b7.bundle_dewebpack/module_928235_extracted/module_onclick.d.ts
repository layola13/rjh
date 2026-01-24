/**
 * UI 消息命令参数接口
 */
interface PlaneProjectionCommandParams {
  /** 可选的命令参数 */
  [key: string]: unknown;
}

/**
 * UI 模块接口，用于处理用户界面消息通信
 */
interface UIModule {
  /**
   * 向 UI 发送消息
   * @param command - 命令名称
   * @param action - 执行的动作
   * @param params - 命令参数
   */
  postUIMessage(
    command: string,
    action: string,
    params: PlaneProjectionCommandParams
  ): void;
}

/**
 * 全局应用上下文接口
 */
interface AppContext {
  /** UI 模块实例 */
  readonly UI: UIModule;
}

/**
 * 事件处理器接口
 */
interface EventHandler {
  /** 当前是否处于 2D 模式 */
  _in2DMode: boolean;
}

/**
 * 全局变量声明
 */
declare const a: AppContext;
declare const e: EventHandler;

/**
 * 点击事件处理函数
 * 
 * 触发平面投影命令并将视图切换为 2D 模式
 * 
 * @remarks
 * 该函数执行以下操作：
 * 1. 发送 "command.planeProjection" 命令到 UI
 * 2. 设置操作类型为 "start"
 * 3. 将事件处理器状态切换为 2D 模式
 * 
 * @module module_onClick
 */
declare function module_onClick(): void;