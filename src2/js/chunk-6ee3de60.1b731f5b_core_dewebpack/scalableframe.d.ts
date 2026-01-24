import type { DragDrawTool, ToolType } from './DragDrawTool';
import type { PolygonCreator } from './PolygonCreator';
import type { Shape } from './Shape';
import type { Point } from './Point';
import type { ShapeManager } from './ShapeManager';

/**
 * 可缩放框架工具
 * 继承自拖拽绘制工具，用于创建可缩放的矩形框架
 */
export declare class ScalableFrame extends DragDrawTool {
  /**
   * 构造函数
   * @param view - 视图实例，用于管理形状和交互
   */
  constructor(view: View);

  /**
   * 获取点击时创建的形状
   * 通过PolygonCreator单例创建基于当前点的矩形形状
   */
  get clickShape(): Shape;

  /**
   * 是否应该释放资源
   * @returns 始终返回true，表示操作完成后释放
   */
  get shouldRelease(): boolean;

  /**
   * 完成拖拽操作
   * 将创建的形状添加到视图的形状管理器中
   * @param shape - 拖拽完成后生成的形状对象
   */
  finishDrag(shape: Shape): void;

  /**
   * 当前鼠标指针位置
   * 继承自父类DragDrawTool
   */
  protected curPt: Point;

  /**
   * 视图实例
   * 包含形状管理器等核心组件
   */
  protected view: View;
}

/**
 * 视图接口
 * 管理形状和绘制交互
 */
interface View {
  /** 形状管理器，负责添加、删除和管理所有形状 */
  shapeManager: ShapeManager;
}