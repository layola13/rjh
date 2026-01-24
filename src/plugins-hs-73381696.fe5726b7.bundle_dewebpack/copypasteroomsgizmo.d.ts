/**
 * 复制粘贴房间的交互式图形控件
 * 用于在场景中选择、预览和放置房间副本
 */

import { Vector2, Box2, Loop, MathAlg } from './MathTypes';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { CopyPasteRoomSnapHelper } from './CopyPasteRoomSnapHelper';
import { Polygon, PtLoopPositonType } from './Polygon';

/**
 * SVG 路径样式接口
 */
interface PathStyle {
  'stroke-width': number;
  stroke: string;
  'fill-opacity': number;
  'stroke-opacity': number;
  fill: string;
  'vector-effect': string;
}

/**
 * 偏移量接口
 */
interface Offset {
  x: number;
  y: number;
}

/**
 * 包围盒偏移量接口
 */
interface BoxOffset {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * 路径数据接口
 * @property outer - 外轮廓曲线数组
 * @property holes - 内孔洞曲线数组
 */
interface PathData {
  outer: Curve2D[];
  holes: Curve2D[][];
}

/**
 * 曲线接口
 */
interface Curve2D {
  clone(): Curve2D;
  translate(offset: Vector2): Curve2D;
  discrete(): Vector2[];
}

/**
 * SVG 矩阵接口
 */
interface Matrix {
  translate(x: number, y: number): Matrix;
}

/**
 * Snap 图形元素接口
 */
interface SnapElement {
  attr(attributes: Record<string, unknown>): SnapElement;
  show(): void;
  hide(): void;
  remove(): void;
  path(): SnapElement;
  appendChild(child: SnapElement): void;
}

/**
 * 尺寸标注接口
 */
interface Dimension {
  dispose(): void;
}

/**
 * 命令接口
 */
interface CopyPasteCommand {
  type: string;
  copyFloors?: Floor[];
  copied?: {
    unionWallsPolygon: Polygon[];
  };
  onReceive(action: string, data: Record<string, unknown>): void;
}

/**
 * 图层接口
 */
interface Layer {
  walls: Record<string, Wall>;
  forEachFloorSlab(callback: (slab: Slab) => void): void;
}

/**
 * 墙体接口
 */
interface Wall {
  // 墙体相关属性
}

/**
 * 楼板接口
 */
interface Slab {
  topFaces: Record<string, Floor | unknown>;
}

/**
 * 楼层/房间接口
 */
interface Floor {
  worldRawPath2d: {
    outer: Curve2D[];
    holes: Curve2D[][];
  };
}

/**
 * 画布上下文接口
 */
interface CanvasContext {
  modelPointToCanvas(point: Vector2): { x: number; y: number };
}

/** 预览状态样式 - 青色高亮 */
declare const PREVIEW_STYLE: PathStyle;

/** 拖拽状态样式 - 蓝色半透明 */
declare const DRAGGING_STYLE: PathStyle;

/**
 * 复制粘贴房间的图形交互控件
 * 
 * 功能说明：
 * 1. 选择目标房间（Floor）或楼板（Slab）
 * 2. 预览复制内容的位置和范围
 * 3. 支持拖拽移动、智能吸附
 * 4. 实时显示尺寸标注
 * 5. 约束在有效建模范围内
 * 
 * @example
 * const gizmo = new CopyPasteRoomsGizmo(snapElement, canvasContext, command);
 * gizmo.onMouseMove(event, screenX, screenY);
 * gizmo.onMouseDown(event, screenX, screenY);
 */
export declare class CopyPasteRoomsGizmo extends HSApp.View.SVG.Temp {
  /**
   * @param element - Snap.svg 根元素
   * @param context - 画布上下文
   * @param command - 命令对象，用于处理复制粘贴逻辑
   */
  constructor(element: SnapElement, context: CanvasContext, command: CopyPasteCommand);

  /** 当前鼠标位置（模型坐标） */
  private _pos?: Vector2;

  /** 是否正在拖拽 */
  private _isDragging: boolean;

  /** 当前选中的目标对象（Floor 或 Slab） */
  private _target?: Floor | Slab;

  /** 所在图层 */
  private _layer: Layer;

  /** 拖拽开始时的原始位置 */
  private _originalPos?: Vector2;

  /** 当前偏移量（画布坐标） */
  private _offset: Offset;

  /** 预览路径 SVG 元素 */
  private _PreviewPath: SnapElement;

  /** 四周尺寸标注数组 */
  private _pickDimensions: Dimension[];

  /** 智能吸附辅助器 */
  private _snapHelper: CopyPasteRoomSnapHelper;

  /** 是否锁定目标（已选择待粘贴的楼层） */
  private _isLockTarget: boolean;

  /** 缓存的目标路径数据 */
  private _targetPaths?: PathData[];

  /** 包围盒边界偏移量 */
  private _boxOffset?: BoxOffset;

  /**
   * 获取当前目标对象
   * 如果已锁定目标，返回待粘贴的第一个楼层；否则返回鼠标悬停的目标
   */
  get target(): Floor | Slab | undefined;

  /**
   * 获取目标对象的路径数据
   * @returns 路径数组，包含外轮廓和孔洞
   */
  getTargetPaths(): PathData[];

  /**
   * 更新包围盒偏移量
   * 用于约束拖拽范围，防止超出建模边界
   */
  updateBoxOffset(): void;

  /**
   * 初始化 SVG 元素和尺寸标注
   * @param element - Snap.svg 根元素
   */
  initElements(element: SnapElement): void;

  /**
   * 更新吸附辅助器的参考墙体
   */
  private _updateSnapHelper(): void;

  /**
   * 绘制回调，更新预览路径
   */
  onDraw(): void;

  /**
   * 更新预览路径的 SVG 显示
   * 根据拖拽状态切换样式，生成路径数据并应用变换
   */
  private _updatePreviewPath(): void;

  /**
   * 约束模型坐标位置在有效范围内
   * @param position - [x, y] 坐标数组
   * @returns 约束后的坐标对象
   */
  private _constraintModelPosition(position: [number, number]): { x: number; y: number };

  /**
   * 鼠标移动事件处理
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 鼠标按下事件处理
   * 左键：选择目标或确认粘贴
   * 右键：取消操作
   * @param event - 鼠标事件
   * @param screenX - 屏幕 X 坐标
   * @param screenY - 屏幕 Y 坐标
   */
  onMouseDown(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * ESC 键处理 - 取消当前操作
   */
  onESC(): void;

  /**
   * 清理资源
   * 移除 SVG 元素、注销热键、释放辅助器
   */
  onCleanup(): void;

  /**
   * 将曲线数组离散化为点数组
   * @param curves - 曲线数组
   * @returns 离散点数组（带 close 标记）
   */
  getDiscrete(curves: Curve2D[]): Vector2[] & { close: boolean };

  /**
   * 拾取鼠标位置下的楼板对象
   * @returns 拾取到的 Slab 或 undefined
   */
  private _pickTargetSlab(): Slab | undefined;

  /**
   * 将多个路径数组转换为 SVG 路径字符串
   * @param paths - 路径点数组
   * @returns SVG path d 属性字符串
   */
  private _getPathsSvg(paths: Vector2[][]): string;

  /**
   * 将单个路径转换为 SVG 路径字符串
   * @param path - 路径点数组
   * @returns SVG path 片段
   */
  private _getPathSvg(path: Vector2[] & { close?: boolean }): string;
}