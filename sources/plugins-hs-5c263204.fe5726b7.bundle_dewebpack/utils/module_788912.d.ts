/**
 * 深度合并两个对象
 * @param target - 目标对象
 * @param source - 源对象
 * @returns 合并后的目标对象
 */
declare function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T;

/**
 * 指南针小工具选项配置
 */
interface CompassGizmoOptions {
  [key: string]: any;
}

/**
 * 入口指示器小工具选项配置
 */
interface EntranceIndicatorGizmoOptions {
  [key: string]: any;
}

/**
 * 小工具参数配置
 */
interface GizmoParams {
  gizmo?: {
    compass?: CompassGizmoOptions;
    entranceIndictor?: EntranceIndicatorGizmoOptions;
  };
}

/**
 * 指南针小工具类
 * 用于在SVG视图中显示指南针
 */
declare class CompassGizmo extends HSApp.View.SVG.Gizmo {
  /** 小工具类型标识 */
  type: 'hsw.view.svg.gizmo.Compass';
  
  /** 小工具配置选项 */
  options: CompassGizmoOptions;

  /**
   * 构造函数
   * @param element - DOM元素
   * @param viewContext - 视图上下文
   * @param params - 参数配置
   */
  constructor(
    element: HTMLElement,
    viewContext: any,
    params: GizmoParams
  );

  /**
   * 激活小工具时的回调
   */
  onActivate(): void;

  /**
   * 停用小工具时的回调
   */
  onDeactivate(): void;

  /**
   * 清理小工具资源时的回调
   */
  onCleanup(): void;

  /**
   * 绘制小工具
   */
  draw(): void;
}

/**
 * 入口指示器小工具类
 * 用于在SVG视图中显示入口指示
 */
declare class EntranceIndicatorGizmo extends HSApp.View.SVG.Gizmo {
  /** 小工具类型标识 */
  type: 'hsw.view.svg.gizmo.EntranceIndictor';
  
  /** 小工具配置选项 */
  options: EntranceIndicatorGizmoOptions;

  /**
   * 构造函数
   * @param element - DOM元素
   * @param viewContext - 视图上下文
   * @param params - 参数配置
   */
  constructor(
    element: HTMLElement,
    viewContext: any,
    params: GizmoParams
  );

  /**
   * 激活小工具时的回调
   */
  onActivate(): void;

  /**
   * 停用小工具时的回调
   */
  onDeactivate(): void;

  /**
   * 清理小工具资源时的回调
   */
  onCleanup(): void;

  /**
   * 绘制小工具
   */
  draw(): void;
}

/**
 * 2D导出小工具类
 * 组合指南针和入口指示器，用于2D视图导出场景
 */
declare class Export2DGizmo extends HSApp.View.SVG.Gizmo {
  /** 小工具类型标识 */
  type: 'hsw.view.svg.gizmo.Export2D';
  
  /** 指南针子小工具 */
  compass: CompassGizmo;
  
  /** 入口指示器子小工具 */
  entranceIndictor: EntranceIndicatorGizmo;
  
  /** 脏标记，指示是否需要重新绘制 */
  dirty: boolean;

  /**
   * 构造函数
   * @param element - DOM元素
   * @param viewContext - 视图上下文
   * @param params - 参数配置
   */
  constructor(
    element: HTMLElement,
    viewContext: any,
    params: GizmoParams
  );

  /**
   * 激活小工具时的回调
   * 会调用父类的onActivate方法
   */
  onActivate(): void;

  /**
   * 停用小工具时的回调
   * 会调用父类的onDeactivate方法
   */
  onDeactivate(): void;

  /**
   * 清理小工具资源时的回调
   * 释放子小工具引用并调用父类的onCleanup方法
   */
  onCleanup(): void;

  /**
   * 绘制小工具
   * 会调用父类的draw方法
   */
  draw(): void;

  /**
   * 更新小工具状态
   * 将dirty标记设置为true，表示需要重新绘制
   */
  update(): void;
}

export default Export2DGizmo;