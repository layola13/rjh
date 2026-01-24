/**
 * SaveProcessPlugin 模块
 * 用于处理保存流程的插件系统
 */

/**
 * 保存流程插件类
 * 负责管理和协调保存操作的生命周期
 */
export class SaveProcessPlugin {
  /**
   * 构造函数
   * 初始化保存流程插件实例
   */
  constructor();

  /**
   * 停用回调方法
   * 当插件被停用时调用，用于清理资源和状态
   * @returns void
   */
  onDeactive(): void;
}

/**
 * 动态加载的插件模块类型
 * 表示从上下文中加载的插件模块结构
 */
interface PluginModule {
  /** 导出的默认插件实例或类 */
  default: unknown;
}

/**
 * 插件集合
 * 包含所有动态加载的保存流程插件实例
 */
declare const plugins: unknown[];

export default plugins;