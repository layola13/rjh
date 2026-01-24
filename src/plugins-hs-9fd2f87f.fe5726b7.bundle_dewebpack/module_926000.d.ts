/**
 * 自定义建模环境基类
 * 继承自 HSApp.Environment.CommonEnvironment，提供工具栏激活/停用的生命周期钩子
 */

import type { CommonEnvironment } from 'HSApp/Environment';

/**
 * 自定义建模环境类
 * 提供建模环境的基础抽象，子类可重写生命周期方法实现特定功能
 */
export declare class CustomizedModelingEnv extends CommonEnvironment {
  /**
   * 构造函数
   * @param config - 环境配置参数
   */
  constructor(config: unknown);

  /**
   * 环境激活时的回调
   * 当环境被激活时触发，可用于初始化资源、绑定事件等
   */
  onActivate(): void;

  /**
   * 环境停用时的回调
   * 当环境被停用时触发，可用于清理资源、解绑事件等
   */
  onDeactivate(): void;

  /**
   * 获取关联的工具栏ID
   * @returns 工具栏的唯一标识符，默认返回空字符串
   */
  getToolbarId(): string;

  /**
   * 工具栏激活时的回调
   * @param toolbarContext - 工具栏上下文对象
   * @returns 是否允许激活，返回 true 表示允许，false 表示阻止
   */
  onActivateToolbar(toolbarContext: unknown): boolean;
}

/**
 * 模块导出
 */
export interface ModuleExports {
  /** 自定义建模环境类 */
  CustomizedModelingEnv: typeof CustomizedModelingEnv;
}

declare const exports: ModuleExports;
export default exports;