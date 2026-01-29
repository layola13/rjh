/**
 * Gizmo管理器模块
 * 负责初始化和管理2D(SVG)和3D(WebGL)视图的Gizmo工厂
 * @module GizmoManager
 */

import type { SignalHook } from 'HSCore.Util';

/**
 * 应用程序主接口
 */
interface Application {
  /**
   * 获取主2D视图
   */
  getMain2DView(): SVGView | null;
  
  /**
   * 获取辅助2D视图（可选）
   */
  getAux2DView?(): SVGView | null;
  
  /**
   * 获取主3D视图
   */
  getMain3DView(): WebGLView | null;
  
  /**
   * 获取辅助3D视图（可选）
   */
  getAux3DView?(): WebGLView | null;
}

/**
 * 插件初始化配置
 */
interface PluginContext {
  /**
   * 应用程序实例
   */
  app: Application;
}

/**
 * SVG视图接口
 */
interface SVGView {
  /**
   * 注册Gizmo工厂
   * @param factory - Gizmo工厂实例
   */
  registerGizmoFactory(factory: SVGGizmoFactory): void;
  
  /**
   * 注销Gizmo工厂
   * @param factory - Gizmo工厂实例
   */
  unregisterGizmoFactory(factory: SVGGizmoFactory): void;
}

/**
 * WebGL视图接口
 */
interface WebGLView {
  /**
   * 注册Gizmo工厂
   * @param factory - Gizmo工厂实例
   */
  registerGizmoFactory(factory: WebGLGizmoFactory): void;
}

/**
 * SVG Gizmo工厂类
 */
declare class SVGGizmoFactory {
  constructor(view: SVGView);
}

/**
 * WebGL Gizmo工厂类
 */
declare class WebGLGizmoFactory {
  constructor(view: WebGLView);
}

/**
 * Gizmo管理器默认导出类
 * 管理应用中所有视图的Gizmo工厂实例
 */
export default class GizmoManager {
  /**
   * 信号钩子，用于事件监听管理
   * @private
   */
  private _signalHook: SignalHook;
  
  /**
   * 存储SVG视图与其Gizmo工厂的映射关系
   * @private
   */
  private _svgGizmoFactoryMap: Map<SVGView, SVGGizmoFactory | undefined>;
  
  /**
   * 应用程序实例引用
   * @private
   */
  private _app?: Application;
  
  /**
   * 构造函数
   */
  constructor();
  
  /**
   * 初始化Gizmo管理器
   * 为所有可用的2D和3D视图注册Gizmo工厂
   * @param context - 插件上下文，包含应用实例
   * @param options - 初始化选项（未使用）
   */
  init(context: PluginContext, options?: unknown): void;
  
  /**
   * 初始化SVG视图的Gizmo工厂
   * @param view - SVG视图实例
   * @private
   */
  private _initSVGView(view: SVGView | null): void;
  
  /**
   * 禁用所有SVG Gizmo
   * 注销所有已注册的SVG Gizmo工厂
   */
  disableSVGGizmo(): void;
  
  /**
   * 启用所有SVG Gizmo
   * 为所有映射的SVG视图重新初始化Gizmo工厂
   */
  enableSVGGizmo(): void;
  
  /**
   * 初始化WebGL视图的Gizmo工厂
   * @param view - WebGL视图实例
   * @private
   */
  private _initWebGLView(view: WebGLView | null): void;
  
  /**
   * 反初始化，清理所有监听器
   */
  uninit(): void;
}