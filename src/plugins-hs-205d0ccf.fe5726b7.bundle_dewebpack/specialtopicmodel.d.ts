/**
 * SpecialTopicModel 模块
 * 用于处理特殊主题的展示和插件状态监听
 */

declare module 'SpecialTopicModel' {
  import { Action } from 'HSCore/Action';
  import { SignalHook } from 'HSCore/Util/SignalHook';
  import { HSApp } from 'HSApp';

  /**
   * 特殊主题执行参数接口
   */
  export interface SpecialTopicExecuteParams {
    /** 资源池ID */
    poolId: string;
    /** 封面图片URL */
    coverUrl: string;
  }

  /**
   * 特殊主题属性接口
   */
  export interface SpecialTopicAttributes {
    /** 封面图片 */
    COVER: string;
  }

  /**
   * 展示特殊主题的选项接口
   */
  export interface ShowSpecialTopicOptions {
    /** 资源池ID */
    poolId: string;
    /** 特殊主题属性 */
    attributes: SpecialTopicAttributes;
  }

  /**
   * 插件接口定义
   */
  export interface Plugin {
    /** 插件状态变化信号 */
    signalStatusChanged: unknown;
  }

  /**
   * 特殊主题模型类
   * 负责监听多个插件的状态变化，并在状态改变时展示特殊主题
   * 
   * @extends Action
   * 
   * @remarks
   * 该类监听以下插件的状态变化：
   * - Welcome（欢迎页）
   * - DesignTemplates（设计模板）
   * - UnderlayImg（底图）
   * - WallAutoBuilder（墙体自动构建）
   * 
   * @example
   *