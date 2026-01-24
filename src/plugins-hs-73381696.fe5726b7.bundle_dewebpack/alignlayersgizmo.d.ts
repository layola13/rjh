/**
 * Align Layers Gizmo - 图层对齐小工具
 * 用于在不同图层之间对齐元素的交互式图形工具
 */

import { HSApp } from '518193';
import { HSCore } from '635589';
import { SnapHelper } from '862993';
import { Vector2 } from '815362';

/**
 * 线性标注状态枚举
 */
type LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;

/**
 * 点类型枚举
 */
enum PointType {
  /** 线上的点 */
  linePoint = 'linePoint',
  /** 捕捉点 */
  snapPoint = 'snapPoint'
}

/**
 * 偏移量坐标
 */
interface Offset {
  x: number;
  y: number;
}

/**
 * 位置坐标
 */
interface Position {
  x: number;
  y: number;
}

/**
 * 指示器样式配置
 */
interface IndicatorStyles {
  /** 起始点指示器样式 */
  startIndicator: Record<string, string>;
  /** 笔指示器样式 */
  penIndicator: Record<string, string>;
  /** 线上点指示器样式 */
  linePointIndicator: {
    fill: string;
    stroke: string;
    'stroke-width': string;
    'vector-effect': string;
    'pointer-events': string;
  };
  /** 红色笔指示器样式（无效状态） */
  redPenIndicator: {
    fill: string;
    stroke: string;
    'stroke-width': string;
    'vector-effect': string;
    'pointer-events': string;
  };
  /** 捕捉点指示器样式 */
  snapIndicator: {
    fill: string;
    stroke: string;
    'stroke-width': string;
    'vector-effect': string;
    'pointer-events': string;
  };
}

/**
 * SVG 元素类型
 */
interface SVGElement {
  center(x: number, y: number): this;
  attr(attributes: Record<string, unknown>): this;
  show(): void;
  hide(): void;
  remove(): void;
}

/**
 * 线性标注对象
 */
interface LinearDimension {
  min: number;
  max: number;
  active: boolean;
  updateState(state: LinearDimensionStateEnum, value: boolean): void;
  activate(): void;
  clear(): void;
  hide(): void;
  draw(): void;
}

/**
 * 捕捉结果
 */
interface SnapResult {
  offset?: Vector2;
}

/**
 * 命令参数
 */
interface CommandParams {
  params: 'toAbove' | 'toBelow';
}

/**
 * 图层对齐小工具类
 * 继承自 Sketch2dTemp 基类，提供图层间元素对齐的可视化交互功能
 */
export declare class AlignLayersGizmo extends HSApp.Sketch2d.Gizmo.Sketch2dTemp {
  /** 起始点圆形指示器 */
  private startIndicator?: SVGElement;
  
  /** 笔形光标指示器 */
  private penIndicator?: SVGElement;
  
  /** 当前偏移量 */
  private offset: Offset;
  
  /** 操作起始位置 */
  private beginPosition?: Vector2;
  
  /** 偏移量标注线 */
  private offsetDimension?: LinearDimension;
  
  /** 当前鼠标位置 */
  private pos?: Vector2;
  
  /** 当前指针是否有效 */
  private _isValid: boolean;
  
  /** 捕捉辅助工具 */
  private _snapHelper: SnapHelper;
  
  /** 当前图层选择提示文本 */
  private _selectInCurrentLayer: string;
  
  /** 目标图层选择提示文本 */
  private _selectInTargetLayer: string;
  
  /** SVG 元素数组 */
  private element: Array<SVGElement | LinearDimension>;
  
  /** 当前点类型 */
  private pointType: PointType;
  
  /** 样式配置 */
  private styles: IndicatorStyles;

  /**
   * 构造函数
   * @param context - 绘图上下文
   * @param canvas - 画布对象
   * @param cmd - 命令对象
   * @param layer - 图层对象
   */
  constructor(
    context: unknown,
    canvas: unknown,
    cmd: CommandParams,
    layer: unknown
  );

  /**
   * 获取指针有效性
   * @returns 当前指针是否处于有效捕捉状态
   */
  get isValidPointer(): boolean;

  /**
   * 刷新捕捉辅助工具
   * 根据当前命令步骤更新可捕捉的墙体和结构元素
   */
  refreshSnapHelper(): void;

  /**
   * 鼠标移动事件处理
   * @param event - 鼠标事件对象
   * @param clientX - 客户端 X 坐标
   * @param clientY - 客户端 Y 坐标
   */
  onMouseMove(event: MouseEvent, clientX: number, clientY: number): void;

  /**
   * 更新所有图形元素
   */
  updateElements(): void;

  /**
   * 创建起始点指示器
   */
  private createStartIndicator(): void;

  /**
   * 更新起始点指示器的位置和大小
   */
  private updateStartIndicator(): void;

  /**
   * 创建所有图形元素
   */
  createElements(): void;

  /**
   * 创建笔形指示器
   */
  private createPenIndicator(): void;

  /**
   * 更新笔形指示器的位置、样式和大小
   */
  private updatePenIndicator(): void;

  /**
   * 创建偏移量标注线
   * @param context - SVG 上下文
   * @param layer - 目标图层
   */
  private createOffsetDimensionLine(context: unknown, layer: unknown): void;

  /**
   * 清除偏移量标注
   */
  private clearOffsetDimension(): void;

  /**
   * 更新偏移量标注线的位置和内容
   */
  private updateOffsetDimensionLine(): void;

  /**
   * 绘制回调
   */
  onDraw(): void;

  /**
   * 更新偏移量并重绘
   * @param offset - 新的偏移量
   */
  updateOffset(offset: Offset): void;

  /**
   * 清理资源
   * 移除所有图形元素、释放监听器和辅助工具
   */
  onCleanup(): void;

  /**
   * 重置小工具状态
   */
  reset(): void;

  /**
   * 清理所有图形元素
   */
  private cleanUpElements(): void;

  /**
   * 重置并重新创建元素
   */
  private resetElemets(): void;

  /**
   * 清理起始点指示器
   */
  private cleanUpStartIndicator(): void;

  /**
   * 根据当前状态获取笔形指示器的样式
   * @returns 样式对象
   */
  private getPenIndicatorStyle(): Record<string, string>;

  /**
   * 清理笔形指示器
   */
  private cleanUpPenIndicator(): void;

  /**
   * 获取指示器圆圈的半径
   * @returns 半径值（考虑缩放因子）
   */
  private getIndicatorCircleRadius(): number;

  /**
   * 混入指示器样式配置
   */
  private _mixinIndicatorStyles(): void;

  /**
   * 将屏幕坐标转换为模型坐标
   * @param event - 鼠标事件
   * @returns 模型空间中的二维向量
   */
  private _getModelPoint(event: MouseEvent): Vector2;

  /**
   * 隐藏偏移量标注
   */
  private _hideOffsetDimension(): void;

  /**
   * 视图盒变化事件处理
   */
  private _onViewBoxChanged(): void;
}