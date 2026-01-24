/**
 * AIDA 插件类型定义
 * @module AIDAPlugin
 */

import { HSApp } from './hs-app';
import { Handler } from './handler';

/**
 * AIDA 插件配置接口
 */
interface AIDAPluginConfig {
  /** 插件名称 */
  name: string;
  /** 插件描述 */
  description: string;
  /** 插件依赖项列表 */
  dependencies: string[];
}

/**
 * AIDA 插件类
 * 用于集成 AI Design Award 功能到主应用
 * @extends {HSApp.Plugin.IPlugin}
 */
declare class AIDAPlugin extends HSApp.Plugin.IPlugin {
  /**
   * AIDA 功能处理器实例
   */
  private handler: Handler | undefined;

  /**
   * 构造函数
   * 初始化插件配置信息
   */
  constructor();

  /**
   * 插件激活生命周期钩子
   * @param context - 插件上下文对象
   * @param options - 激活选项参数
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * 插件停用生命周期钩子
   */
  onDeactive(): void;

  /**
   * 显示 AIDA 入口界面
   */
  showAIDAEntry(): void;

  /**
   * 隐藏 AIDA 入口界面
   */
  hideAIDAEntry(): void;

  /**
   * 打开 AIDA 主界面
   * @param params - 打开参数配置
   * @returns 打开操作的结果
   */
  openAIDA(params: unknown): unknown;
}

/**
 * 全局常量声明
 */
declare global {
  /**
   * HSFPConstants 全局常量对象
   */
  const HSFPConstants: {
    /** 插件类型枚举 */
    PluginType: {
      /** AIDA 插件类型标识 */
      AIDA: string;
    };
  };
}

/**
 * 模块导出
 */
export { AIDAPlugin };