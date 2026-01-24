import { Vector2 } from '../math/Vector2';
import { Display2D } from '../base/Display2D';
import { DiffCWRouteController } from '../controllers/DiffCWRouteController';
import { HSCore } from '../core/HSCore';
import { HSApp } from '../app/HSApp';

/**
 * SVG路径样式配置接口
 */
interface IPathStyle {
  /** 描边颜色 */
  stroke: string;
  /** 描边宽度 */
  'stroke-width': number;
  /** 描边端点样式 */
  'stroke-linecap': 'round' | 'butt' | 'square';
  /** 鼠标事件处理 */
  'pointer-events': 'none' | 'auto';
}

/**
 * 箭头样式配置接口
 */
interface IArrowStyle {
  /** 描边颜色 */
  stroke: string;
  /** 描边宽度 */
  'stroke-width': number;
  /** 填充颜色 */
  fill: string;
}

/**
 * 路径状态样式集合接口
 */
interface IRouteStyleSet {
  /** 正常状态样式 */
  normal: IPathStyle;
  /** 选中状态样式 */
  selected: IPathStyle;
  /** 悬停状态样式 */
  hover: IPathStyle;
}

/**
 * 箭头状态样式集合接口
 */
interface IArrowStyleSet {
  /** 正常状态样式 */
  normal: IArrowStyle;
  /** 选中状态样式 */
  selected: IArrowStyle;
  /** 悬停状态样式 */
  hover: IArrowStyle;
}

/**
 * 边界样式配置接口
 */
interface IBoundStyle {
  /** 描边颜色 */
  stroke: string;
  /** 描边宽度 */
  'stroke-width': number;
  /** 描边端点样式 */
  'stroke-linecap': 'round' | 'butt' | 'square';
}

/**
 * SVG元素接口
 */
interface ISVGElement {
  /** 设置元素属性 */
  attr(attrs: Record<string, unknown>): this;
  /** 移除元素 */
  remove(): void;
  /** 显示元素 */
  show(): void;
  /** 隐藏元素 */
  hide(): void;
}

/**
 * SVG路径元素接口
 */
interface ISVGPathElement extends ISVGElement {
  /** 设置路径终点标记 */
  marker(type: 'end', marker: ISVGMarker): this;
}

/**
 * SVG标记元素接口
 */
interface ISVGMarker extends ISVGElement {
  /** 设置标记路径 */
  path(pathData: string): this;
}

/**
 * 路径段接口
 */
interface IPathSegment {
  /** 获取起点 */
  getStartPt(): { x: number; y: number; z: number; subtracted(other: unknown): { normalize(): { z: number } } };
  /** 获取终点 */
  getEndPt(): { x: number; y: number; z: number };
}

/**
 * 路径实体接口
 */
interface IRouteEntity {
  /** 路径段集合 */
  path: IPathSegment[];
  /** 检查标志位是否开启 */
  isFlagOn(flag: number): boolean;
  /** 设置标志位开启 */
  setFlagOn(flag: number, notify: boolean): void;
  /** 设置标志位关闭 */
  setFlagOff(flag: number, notify: boolean): void;
}

/**
 * SVG上下文接口
 */
interface ISVGContext {
  /** 创建路径元素 */
  path(pathData: string): ISVGPathElement;
  /** 创建标记元素 */
  marker(width: number, height: number): ISVGMarker;
  /** 应用程序实例 */
  application: {
    /** 检查2D视图是否激活 */
    is2DViewActive(): boolean;
  };
}

/**
 * 事件钩子接口
 */
interface IEventHook {
  /** 鼠标悬停事件 */
  mouseover(handler: () => void): this;
  /** 鼠标移出事件 */
  mouseout(handler: () => void): this;
  /** 释放事件监听 */
  dispose(): void;
}

/**
 * 2D差分清洁工路径显示类
 * 
 * 负责在2D SVG视图中渲染和管理清洁工路径的可视化显示，
 * 包括路径线条、方向箭头以及交互状态（正常/选中/悬停）的样式切换。
 */
export declare class DiffCWRouteDisplay2D extends Display2D {
  /**
   * SVG路径主体元素
   * @private
   */
  private _element: ISVGPathElement | null;

  /**
   * SVG路径边界元素（用于增强点击区域）
   * @private
   */
  private _bound: ISVGPathElement | null;

  /**
   * SVG箭头标记元素
   * @private
   */
  private _arrow: ISVGMarker | null;

  /**
   * 事件钩子集合
   * @private
   */
  private _eventHooks: IEventHook[];

  /**
   * 路径样式配置（正常/选中/悬停）
   * @private
   */
  private readonly _routeStyle: IRouteStyleSet;

  /**
   * 边界样式配置
   * @private
   */
  private readonly _boundStyle: IBoundStyle;

  /**
   * 箭头样式配置（正常/选中/悬停）
   * @private
   */
  private readonly _arrowStyle: IArrowStyleSet;

  /**
   * 构造函数
   * 
   * @param context - SVG渲染上下文
   * @param group - SVG组容器
   * @param entity - 路径实体数据
   * @param viewTransform - 视图变换矩阵
   * @param controller - 路径控制器（可选，默认创建DiffCWRouteController实例）
   */
  constructor(
    context: ISVGContext,
    group: unknown,
    entity: IRouteEntity,
    viewTransform: unknown,
    controller?: DiffCWRouteController
  );

  /**
   * 初始化显示对象
   * 
   * 创建SVG路径元素、边界元素和箭头标记，
   * 设置初始样式并绑定交互事件。
   */
  init(): void;

  /**
   * 绘制更新回调
   * 
   * 当几何形状或位置发生变化时重新生成路径数据并更新样式。
   */
  onDraw(): void;

  /**
   * 清理资源
   * 
   * 释放事件监听、移除SVG元素并清空引用。
   */
  onCleanup(): void;

  /**
   * 绑定交互命令
   * 
   * 为边界元素绑定鼠标悬停/移出事件，
   * 根据鼠标状态更新实体标志位和视觉样式。
   * 
   * @private
   */
  private bindCommand(): void;

  /**
   * 更新视觉样式
   * 
   * 根据实体当前状态（选中/悬停/正常）应用对应的样式配置。
   */
  updateStyle(): void;

  /**
   * 创建箭头标记
   * 
   * @returns SVG箭头标记元素
   * @private
   */
  private _getArrow(): ISVGMarker;

  /**
   * 提取路径点数据
   * 
   * 从路径实体中提取有效的2D路径段（过滤垂直线段）。
   * 
   * @param entity - 路径实体
   * @returns 路径点对数组
   * @private
   */
  private _getPathPoint(entity: IRouteEntity): Array<[Vector2, Vector2]>;

  /**
   * 更新可见性状态
   * 
   * @param visible - 是否可见
   */
  updateVisibleStatus(visible: boolean): void;
}