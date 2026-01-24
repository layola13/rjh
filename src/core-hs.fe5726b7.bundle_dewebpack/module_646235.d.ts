/**
 * HSRender - 渲染引擎模块
 * 
 * 该模块提供核心渲染功能，用于处理UI组件的渲染和更新
 * 
 * @module HSRender
 * @description 全局渲染引擎，挂载在window/global对象的HSRender属性上
 */

/**
 * 渲染配置选项
 */
export interface RenderOptions {
  /** 目标DOM容器选择器或元素 */
  container?: string | HTMLElement;
  
  /** 是否启用虚拟DOM */
  virtualDOM?: boolean;
  
  /** 渲染模式：同步或异步 */
  mode?: 'sync' | 'async';
  
  /** 是否启用调试模式 */
  debug?: boolean;
}

/**
 * 渲染上下文
 */
export interface RenderContext {
  /** 当前渲染的组件实例 */
  component: unknown;
  
  /** 渲染时间戳 */
  timestamp: number;
  
  /** 渲染状态 */
  state: 'pending' | 'rendering' | 'complete' | 'error';
}

/**
 * HSRender 渲染引擎类
 * 
 * @description 核心渲染引擎，负责组件的渲染、更新和生命周期管理
 */
export interface HSRender {
  /**
   * 初始化渲染引擎
   * @param options - 渲染配置选项
   * @returns 初始化成功返回true
   */
  init(options?: RenderOptions): boolean;
  
  /**
   * 渲染组件到指定容器
   * @param component - 要渲染的组件
   * @param container - 目标容器
   * @returns 渲染上下文
   */
  render(component: unknown, container?: HTMLElement): RenderContext;
  
  /**
   * 更新已渲染的组件
   * @param context - 渲染上下文
   * @returns 更新后的上下文
   */
  update(context: RenderContext): RenderContext;
  
  /**
   * 卸载组件并清理资源
   * @param context - 渲染上下文
   */
  unmount(context: RenderContext): void;
  
  /**
   * 获取当前引擎版本
   */
  readonly version: string;
}

/**
 * 全局HSRender实例
 * 
 * @description 该对象挂载在全局作用域（window/global）上
 */
declare global {
  interface Window {
    /** HSRender全局渲染引擎实例 */
    HSRender: HSRender;
  }
  
  namespace NodeJS {
    interface Global {
      /** HSRender全局渲染引擎实例 */
      HSRender: HSRender;
    }
  }
}

export default HSRender;