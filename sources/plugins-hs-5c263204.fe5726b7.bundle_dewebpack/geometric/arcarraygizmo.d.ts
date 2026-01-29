/**
 * 圆弧阵列Gizmo模块
 * 提供圆弧阵列交互式编辑功能
 */

import { Vector2 } from './Vector2';
import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { HSCore } from './HSCore';
import { ArcArrayParamsCardControl } from './ArcArrayParamsCardControl';

/**
 * 圆弧阵列操作状态枚举
 */
export enum ArcArrayGizmoStatus {
  /** 选择圆心 */
  SelectCircleCenter = '0',
  /** 选择起始点 */
  SelectStartPoint = '1',
  /** 选择结束点 */
  SelectEndPoint = '2',
  /** 完成命令 */
  FinishCmd = '3'
}

/**
 * SVG图形元素接口
 */
interface SVGElement {
  attr(attributes: Record<string, unknown>): this;
  center(x: number, y: number): this;
  radius(r: number): this;
  width(w?: number): number | this;
  height(h?: number): number | this;
  x(value?: number): number | this;
  y(value?: number): number | this;
  scale(factor: number): this;
  show(): this;
  hide(): this;
  remove(): void;
}

/**
 * 圆形SVG元素
 */
interface CircleElement extends SVGElement {
  radius(r: number): this;
  center(x: number, y: number): this;
}

/**
 * 线条SVG元素
 */
interface LineElement extends SVGElement {
  attr(attributes: { x1?: string; y1?: string; x2?: string; y2?: string } & Record<string, unknown>): this;
}

/**
 * 多边形SVG元素
 */
interface PolygonElement extends SVGElement {
  fill(color: string): this;
  stroke(options: { width: number; color: string }): this;
}

/**
 * 画布上下文接口
 */
interface CanvasContext {
  getScaleFactor(): number;
  svgEx(svgString: string): SVGElement | undefined;
}

/**
 * 画布接口
 */
interface Canvas {
  screenPointToCanvas(point: Vector2): Vector2;
  modelPointToCanvas(point: Vector2): Vector2;
  canvasPointToModel(point: Vector2): Vector2;
  modelPointToScreen(point: Vector2): Vector2;
  screenPointToModel(point: Vector2): Vector2;
  signalViewBoxChanged: Signal<void>;
}

/**
 * 信号接口
 */
interface Signal<T> {
  listen(callback: (data: T) => void, context?: unknown): void;
  unlisten(callback: (data: T) => void, context?: unknown): void;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  cancel(): void;
  receive(action: string, params: unknown): void;
  signalCommandTerminated: Signal<{ data: { cmd: { type: string } } }>;
}

/**
 * 内容对象接口
 */
interface Content {
  id: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  bound?: boolean;
  outline: Vector2[];
}

/**
 * 圆弧阵列初始化参数
 */
interface ArcArrayInitParams {
  content: Content;
  arrayNum: number;
}

/**
 * 圆弧阵列更新参数
 */
interface ArcArrayUpdateParams {
  arrayNum?: number;
  angle?: number;
}

/**
 * 圆弧阵列结果参数
 */
interface ArcArrayResultParams {
  position: Array<{ x: number; y: number; z: number }>;
  rotation: number[];
}

/**
 * 捕捉角度结果
 */
interface SnapAngleResult {
  snapPos: Vector2;
  snapAngle: number;
}

/**
 * 鼠标事件接口
 */
interface MouseEvent {
  button?: number;
}

/**
 * 圆弧阵列Gizmo类
 * 负责处理圆弧阵列的交互式编辑，包括选择圆心、起始点、结束点等操作
 */
export declare class ArcArrayGizmo {
  /** 阵列边界图形元素数组 */
  private arrayBound: PolygonElement[];

  /** 圆形环图形元素 */
  private circularRing: SVGElement;

  /** 圆心点图形元素 */
  private centerPoint: CircleElement;

  /** 起始点图形元素 */
  private startPoint: CircleElement;

  /** 结束点图形元素 */
  private endPoint: CircleElement;

  /** 起始线图形元素 */
  private startLine: LineElement;

  /** 结束线图形元素 */
  private endLine: LineElement;

  /** 圆弧环图形元素 */
  private arcRing: CircleElement;

  /** 高亮边界映射表 */
  private highlightBoundMap: Map<string, PolygonElement>;

  /** 当前操作状态 */
  private status: ArcArrayGizmoStatus;

  /** 是否已捕捉到圆心 */
  private hasSnappedToCenter: boolean;

  /** 画布上的圆心位置 */
  private canvasCenterPos: Vector2;

  /** 画布上的起始位置 */
  private canvasStartPos: Vector2;

  /** 所有SVG元素数组 */
  private element: SVGElement[];

  /** 上一次的角度 */
  private lastAngle: number;

  /** 当前角度 */
  private angle: number;

  /** 起始角度 */
  private startAngle: number;

  /** 阵列数量 */
  private arrayNum: number;

  /** 当前画布坐标点 */
  private currentCanvasPt: Vector2;

  /** 当前屏幕坐标点 */
  private currentScreenPt: Vector2;

  /** 是否顺时针 */
  private isClockWise: boolean;

  /** 内容对象 */
  private content: Content;

  /** 命令管理器 */
  private cmdMgr: CommandManager;

  /** 画布上下文 */
  private context: CanvasContext;

  /** 画布对象 */
  private canvas: Canvas;

  /** 图层元素 */
  private layer: SVGElement;

  /** 绘图元素 */
  private drawing?: SVGElement;

  /** 脏标记 */
  private dirty: boolean;

  /** 信号钩子 */
  private signalHook: {
    listen(signal: Signal<unknown>, callback: () => void): void;
  };

  /**
   * 构造函数
   * @param context - 画布上下文
   * @param canvas - 画布对象
   * @param params - 初始化参数
   */
  constructor(context: CanvasContext, canvas: Canvas, params: ArcArrayInitParams);

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 绘制图形
   */
  onDraw(): void;

  /**
   * 标记图形需要重绘
   */
  dirtyGraph(): void;

  /**
   * 取消命令回调
   * @param event - 命令事件
   */
  cancelCmd(event: { data: { cmd: { type: string } } }): void;

  /**
   * 更新状态栏
   * @param screenPos - 屏幕坐标
   */
  updateStatusBar(screenPos: Vector2): void;

  /**
   * 鼠标点击事件处理
   * @param event - 鼠标事件
   */
  onMouseClick(event?: MouseEvent): void;

  /**
   * 更新参数
   * @param params - 更新参数
   */
  updateParam(params: ArcArrayUpdateParams): void;

  /**
   * 鼠标移动事件处理
   * @param event - 鼠标事件
   * @param screenX - 屏幕X坐标
   * @param screenY - 屏幕Y坐标
   * @param angle - 可选的角度参数
   */
  onMouseMove(event: MouseEvent | undefined, screenX: number, screenY: number, angle?: number): void;

  /**
   * 添加圆形环
   */
  private addCircularRing(): void;

  /**
   * 创建点图形元素
   * @returns 圆形元素
   */
  private createPoint(): CircleElement;

  /**
   * 添加圆心点
   */
  private addCenterPoint(): void;

  /**
   * 重置圆心点样式
   */
  private resetCenterPointStyle(): void;

  /**
   * 添加起始点
   */
  private addStartPoint(): void;

  /**
   * 添加结束点
   */
  private addEndPoint(): void;

  /**
   * 创建线条图形元素
   * @param attributes - 线条属性
   * @returns 线条元素
   */
  private createLine(attributes?: Record<string, unknown>): LineElement;

  /**
   * 添加起始线
   */
  private addStartLine(): void;

  /**
   * 添加结束线
   */
  private addEndLine(): void;

  /**
   * 添加圆弧环
   */
  private addArcRing(): void;

  /**
   * 根据轮廓创建内容边界路径
   * @param outline - 轮廓点数组
   * @param color - 颜色，默认为'#396EFE'
   * @returns 多边形元素
   */
  private createContentBoundPath(outline: Vector2[], color?: string): PolygonElement;

  /**
   * 添加阵列边界
   * @param count - 添加数量
   */
  private addArrayBound(count: number): void;

  /**
   * 移除阵列边界
   * @param count - 移除数量
   */
  private removeArrayBound(count: number): void;

  /**
   * 更新SVG元素位置
   * @param elements - 元素数组
   * @param position - 目标位置
   */
  private updateSvgElement(elements: SVGElement[], position: Vector2): void;

  /**
   * 更新圆弧显示
   * @param angle - 角度
   */
  private updateArc(angle: number): void;

  /**
   * 转换角度到-180至180范围
   * @param angle - 原始角度
   * @returns 转换后的角度
   */
  private convertedAngle(angle: number): number;

  /**
   * 检查是否顺时针
   * @param lastAngle - 上一次角度
   * @param currentAngle - 当前角度
   * @returns 是否顺时针，未确定返回undefined
   */
  private checkClockWise(lastAngle: number, currentAngle: number): boolean | undefined;

  /**
   * 更新阵列边界位置
   * @param angle - 旋转角度
   */
  private updateArrayBound(angle: number): void;

  /**
   * 捕捉到内容中心
   * @param screenPos - 屏幕坐标
   * @returns 捕捉后的画布坐标
   */
  private snapToContentCenter(screenPos: Vector2): Vector2;

  /**
   * 高亮显示内容
   * @param contentId - 内容ID
   * @param screenPos - 屏幕坐标
   * @param outline - 轮廓点数组
   */
  private highlightContent(contentId: string, screenPos: Vector2, outline: Vector2[]): void;

  /**
   * 计算捕捉角度
   * @param angle - 原始角度
   * @param snapAngles - 捕捉角度数组
   * @param threshold - 捕捉阈值，默认为5
   * @returns 捕捉后的角度
   */
  private calcSnapAngle(angle: number, snapAngles: number[], threshold?: number): number;

  /**
   * 捕捉到角度
   * @param canvasPos - 画布坐标
   * @param snapAngle - 可选的捕捉角度
   * @returns 捕捉结果
   */
  private snapToAngle(canvasPos: Vector2, snapAngle?: number): SnapAngleResult;

  /**
   * 获取阵列参数
   * @returns 阵列结果参数
   */
  private getParams(): ArcArrayResultParams;
}