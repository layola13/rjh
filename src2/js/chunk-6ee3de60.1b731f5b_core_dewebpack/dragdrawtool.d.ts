/**
 * 拖拽绘制工具类型定义
 * 提供基于拖拽操作的形状绘制功能
 */

import { Tool } from './Tool';
import { View } from './View';
import { WinPolygon } from './WinPolygon';
import { Point, Segment } from './Geometry';

/**
 * 拖拽绘制工具
 * 继承自基础工具类，提供通过拖拽鼠标绘制形状的能力
 */
export declare class DragDrawTool extends Tool {
  /**
   * 辅助绘制状态标志
   * 表示当前是否正在进行拖拽绘制操作
   */
  protected auxDrawing: boolean;

  /**
   * 辅助绘制的多边形对象
   * 存储当前正在绘制的临时形状
   */
  protected aux: WinPolygon;

  /**
   * 辅助形状的可视化对象
   * 用于在画布上渲染临时绘制的形状
   */
  protected vshapeOfAux?: any;

  /**
   * 拖拽起始点
   * 记录鼠标按下时的坐标位置
   */
  protected firstPt?: Point;

  /**
   * 构造函数
   * @param view - 视图实例，提供画布和绘制上下文
   * @param options - 工具配置选项
   */
  constructor(view: View, options: any);

  /**
   * 默认颜色
   * 根据暗黑模式自动切换：暗黑模式返回"yellow"，普通模式返回"blue"
   */
  get defaultColor(): string;

  /**
   * 填充颜色
   * 默认为"none"，表示不填充
   */
  get fillColor(): string;

  /**
   * 描边颜色
   * 默认使用defaultColor的值
   */
  get strokeColor(): string;

  /**
   * 描边宽度
   * 默认为15像素
   */
  get strokeWidth(): number;

  /**
   * 是否使用虚线样式
   * 默认为true
   */
  get dashed(): boolean;

  /**
   * 是否在操作完成后释放工具
   * 默认为false，子类可重写此属性改变行为
   */
  get shouldRelease(): boolean;

  /**
   * 点击形状生成器
   * 当拖拽距离过小时，生成一个单击位置的微小多边形
   */
  get clickShape(): WinPolygon;

  /**
   * 重启工具
   * 重置工具状态，并根据shouldRelease决定是否释放工具
   */
  restart(): void;

  /**
   * 鼠标按下事件处理
   * 开始拖拽绘制，记录起始点并隐藏辅助提示
   * @param event - 鼠标事件对象
   */
  mousedown(event: MouseEvent): void;

  /**
   * 鼠标移动事件处理
   * 在拖拽过程中实时生成并绘制辅助形状
   * @param event - 鼠标事件对象
   */
  mousemove(event: MouseEvent): void;

  /**
   * 鼠标释放事件处理
   * 完成拖拽绘制，生成最终形状并清理辅助对象
   * @param event - 鼠标事件对象
   */
  mouseup(event: MouseEvent): void;

  /**
   * 清理工具资源
   * 回收辅助对象并恢复画布的可拖拽状态
   */
  cleanup(): void;

  /**
   * 生成辅助形状
   * 根据起始点和当前点计算并创建矩形或点击形状
   * @param isFinal - 是否为最终形状（影响距离阈值判断）
   */
  protected makeAux(isFinal?: boolean): void;

  /**
   * 绘制辅助形状
   * 将辅助形状渲染到画布上，并应用样式属性
   */
  protected drawAux(): void;

  /**
   * 回收辅助对象
   * 隐藏并清理辅助形状的可视化对象
   */
  protected recyleAux(): void;

  /**
   * 完成拖拽操作
   * 子类应重写此方法以处理最终生成的形状
   * @param shape - 最终生成的多边形形状
   */
  protected finishDrag(shape: WinPolygon): void;
}