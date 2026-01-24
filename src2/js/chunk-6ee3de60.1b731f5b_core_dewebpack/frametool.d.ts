import { Point } from './point';
import { Polygon } from './polygon';
import { View } from './view';
import { DragDrawTool } from './drag-draw-tool';

/**
 * FrameTool - 框选绘制工具
 * 继承自 DragDrawTool，用于通过拖拽绘制框架多边形
 */
export declare class FrameTool extends DragDrawTool {
  /**
   * 当前工具关联的视图实例
   */
  protected view: View;

  /**
   * 工具名称标识
   */
  protected name: string;

  /**
   * 拖拽起始点
   */
  protected firstPt?: Point;

  /**
   * 当前鼠标位置点
   */
  protected curPt: Point;

  /**
   * 构造函数
   * @param name - 工具名称标识
   * @param view - 关联的视图实例
   */
  constructor(name: string, view: View);

  /**
   * 单击时创建的形状
   * 在当前点位置创建一个多边形
   */
  get clickShape(): Polygon;

  /**
   * 重启工具状态
   * 调用父类重启逻辑并释放当前工具
   */
  restart(): void;

  /**
   * 根据拖拽区域生成的框架多边形
   * 自动计算中心点、缩放比例以保持原始形状比例
   */
  get framePolygon(): Polygon;

  /**
   * 完成拖拽操作的回调
   * 将生成的框架多边形添加到形状管理器
   * @param event - 鼠标事件对象
   */
  finishDrag(event: MouseEvent): void;
}