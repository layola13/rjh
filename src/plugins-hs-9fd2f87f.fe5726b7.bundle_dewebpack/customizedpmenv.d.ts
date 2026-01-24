/**
 * 自定义PM环境类
 * 继承自CommonEnvironment，提供工具栏和环境激活管理功能
 */
export declare class CustomizedPmEnv extends HSApp.Environment.CommonEnvironment {
  /**
   * 构造函数
   * @param config - 环境配置参数
   */
  constructor(config: unknown);

  /**
   * 环境激活时的回调
   * 当环境被激活时触发此方法
   */
  onActivate(): void;

  /**
   * 环境停用时的回调
   * 当环境被停用时触发此方法
   */
  onDeactivate(): void;

  /**
   * 获取工具栏标识符
   * @returns 工具栏ID字符串，默认返回空字符串
   */
  getToolbarId(): string;

  /**
   * 工具栏激活回调
   * @param toolbarId - 要激活的工具栏ID
   * @returns 是否成功激活工具栏，默认返回true
   */
  onActivateToolbar(toolbarId: unknown): boolean;

  /**
   * 恢复DIY模式
   * 调用MessageHandler实例恢复自定义编辑功能
   */
  resume(): void;
}