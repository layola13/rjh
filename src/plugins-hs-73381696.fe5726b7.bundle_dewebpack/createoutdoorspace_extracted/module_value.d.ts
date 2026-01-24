/**
 * 创建线性尺寸标注的Gizmo工具
 * 
 * @remarks
 * 此函数用于在画布的Gizmo管理器中创建一个名为"LinearDimension"的Gizmo实例。
 * 通常用于CAD/3D编辑器等场景中添加测量和标注功能。
 * 
 * @param e - 第一个参数（具体含义取决于LinearDimension的实现，可能是起点、配置对象等）
 * @param t - 第二个参数（可能是终点、选项配置等）
 * @param n - 第三个参数（可能是额外的配置参数）
 * @returns 创建的LinearDimension Gizmo实例
 * 
 * @public
 */
export function createLinearDimensionGizmo(
  e: unknown,
  t: unknown,
  n: unknown
): unknown;

/**
 * Gizmo管理器接口
 * 负责创建和管理各种类型的Gizmo工具
 */
export interface GizmoManager {
  /**
   * 根据名称创建Gizmo实例
   * 
   * @param name - Gizmo类型名称
   * @param args - 传递给Gizmo构造函数的参数
   * @returns 创建的Gizmo实例
   */
  createGizmoByName(name: string, ...args: unknown[]): unknown;
}

/**
 * 画布接口
 * 包含Gizmo管理器等画布相关功能
 */
export interface HSCanvas {
  /** Gizmo管理器实例 */
  gizmoManager: GizmoManager;
}

/**
 * 上下文接口
 * 提供对画布和其他全局资源的访问
 */
export interface Context {
  /** 画布实例 */
  hscanvas: HSCanvas;
}