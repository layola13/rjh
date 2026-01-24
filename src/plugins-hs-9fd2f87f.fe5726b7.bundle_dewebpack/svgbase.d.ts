/**
 * SvgBase模块类型定义
 * 提供SVG导出功能的基础类和上下文类
 */

import { HSCore } from 'hscore';
import type { App } from 'app-types';

/**
 * 2D几何线段
 */
export class Line2d {
  getStartPt(): Point2D;
  getEndPt(): Point2D;
}

/**
 * 2D几何圆弧
 */
export class Arc2d {
  getStartPt(): Point2D;
  getEndPt(): Point2D;
  getRadius(): number;
  isCCW(): boolean;
  getRange(): { getLength(): number };
}

/**
 * 2D点坐标
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D点坐标（含弧形信息）
 */
export interface Point3D {
  x: number;
  y: number;
  z?: number;
  arcInfo?: ArcInfo;
}

/**
 * 圆弧信息
 */
export interface ArcInfo {
  center: Point3D;
  radius: number;
  clockwise: boolean;
}

/**
 * 缩放后的点坐标
 */
export interface ScaledPoint {
  X: number;
  Y: number;
}

/**
 * 边界框
 */
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 边界信息
 */
export interface BoundInfo {
  left: number;
  bottom: number;
  width: number;
  height: number;
}

/**
 * 间距配置
 */
export interface SpanConfig {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * 尺寸标注配置
 */
export interface DimensionConfig {
  isIgnoreDimensionOffset?: boolean;
  offsetBase: number;
  showLevels: {
    first?: boolean;
    second?: boolean;
  };
  levelSpan: number;
}

/**
 * 房间样式配置
 */
export interface RoomStyle {
  fontColor: string;
  fontOutlineColor: string;
  drawGroundImg: boolean;
  edgeWidth?: number;
  edgeColor?: string;
}

/**
 * 墙体样式配置
 */
export interface WallStyle {
  normalColor: string;
  innerWidth?: number;
  outerWidth?: number;
}

/**
 * 门样式配置
 */
export interface DoorStyle {
  lineColor: string;
}

/**
 * 窗户样式配置
 */
export interface WindowStyle {
  lineColor: string;
  strokeColor: string;
  glassColor: string;
  glassStrokeColor: string;
  wallColor: string;
}

/**
 * 入口样式配置
 */
export interface EntryStyle {
  lineColor: string;
}

/**
 * 页面设置
 */
export interface PageSetting {
  fullWidth: number;
  fullHeight: number;
  backgroundColor?: string;
  frameSpan: SpanConfig;
  floorplanSpan: SpanConfig;
  dimension?: DimensionConfig;
  materialTitleHeight?: number;
  room: RoomStyle;
  wall: WallStyle;
  door: DoorStyle;
  window: WindowStyle;
  entry: EntryStyle;
}

/**
 * 导出设置
 */
export interface ExportSetting {
  thumbnail2D?: boolean;
  withPaint?: boolean;
  clearDoc?: boolean;
}

/**
 * 小地图样式配置
 */
export interface MinimapStyleConfig {
  style: 'black' | 'white' | 'color';
  clearDoc?: boolean;
}

/**
 * SVG图层集合
 */
export interface SvgLayers {
  outline: SVGElement;
  rooms: SVGElement;
  loadbearings: SVGElement;
  openings: SVGElement;
  cornerwindows: SVGElement;
  dimensions: SVGElement;
  entry: SVGElement;
  contents: SVGElement;
  paints: SVGElement;
  roomtexts: SVGElement;
}

/**
 * 几何信息
 */
export interface GeometryInfo {
  wallsBound: BoundInfo;
  innerPaths?: unknown[];
  outerPaths?: unknown[];
  innerBound?: unknown;
  outerBound?: unknown;
}

/**
 * 位置信息
 */
export interface PositionInfo {
  svg: {
    left: number;
    bottom: number;
    width: number;
    height: number;
    scale: number;
  };
  wallsbound: BoundInfo;
}

/**
 * 实体几何数据
 */
export interface EntityGeometry {
  entity: HSCore.Model.Wall | HSCore.Model.NCustomizedStructure;
  geometry: Point3D[] | unknown;
  path: {
    outer: unknown;
    holes: unknown[];
  };
}

/**
 * 视图框配置
 */
export interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * SVG导出基类
 * 提供SVG导出的通用功能
 */
export declare class SvgBase {
  protected _app: App;
  protected _ctx: SvgRawContext | SvgContext | SvgPaveContext | SvgMinimapContext;

  constructor(app: App, context: SvgRawContext | SvgContext | SvgPaveContext | SvgMinimapContext);

  /**
   * 导出SVG
   */
  export(): Promise<void>;

  /**
   * 导出SVG（材质表）
   */
  exportM(): void;

  /**
   * 构建SVG内容
   */
  build(): void;

  /**
   * 绘制SVG元素
   */
  draw(): void;

  /**
   * 获取单位缩放比例
   * @returns 缩放比例（默认100）
   */
  unitScale(): number;

  /**
   * 获取精度
   * @returns 精度值（默认1000000）
   */
  precision(): number;

  /**
   * 模型坐标转画布坐标
   * @param point 模型坐标点
   * @returns 画布坐标点
   */
  modelToCanvas(point: Point2D): Point2D;

  /**
   * 初始化Promise
   * @returns 初始化完成的Promise
   */
  protected initialized(): Promise<void>;

  /**
   * 检查实体是否有效
   * @param entity 实体对象
   * @returns 是否有效
   */
  protected isItemValid(entity: HSCore.Model.Entity): boolean;
}

/**
 * SVG上下文基类
 * 管理SVG的图层、边界和布局
 */
export declare class SvgContextBase {
  protected _floorplanOutline: Point2D[];
  protected _geometryInfo: GeometryInfo;
  protected _layers: SvgLayers;
  protected _root: SVGElement;
  protected _bbox: BoundingBox | undefined;
  protected _layoutScale: number;
  protected _context: SVGElement;
  protected _pageRoot: SVGElement;
  protected _pageSetting: PageSetting;
  protected _wallsMask: SVGElement | undefined;

  /**
   * 初始化几何信息
   * @param geometryInfo 几何信息
   * @param outline 轮廓点数组
   */
  init(geometryInfo: GeometryInfo, outline: Point2D[]): void;

  /**
   * 初始化图层
   */
  protected _initLayers(): void;

  /**
   * 获取布局缩放比例
   */
  layoutScale(): number;

  /**
   * 获取SVG上下文
   */
  context(): SVGElement;

  /**
   * 获取墙体蒙版
   */
  getWallsMask(): SVGElement | undefined;

  /**
   * 获取根节点
   */
  root(): SVGElement;

  /**
   * 获取页面根节点
   */
  pageRoot(): SVGElement;

  /**
   * 获取户型轮廓
   */
  floorplanOutline(): Point2D[];

  /**
   * 获取图层集合
   */
  layers(): SvgLayers;

  /**
   * 获取页面设置
   */
  pageSetting(): PageSetting;

  /**
   * 获取几何信息
   */
  geometryInfo(): GeometryInfo;

  /**
   * 获取模型边界框
   */
  modelBox(): BoundingBox | undefined;

  /**
   * 更新模型边界框
   * @param x X坐标
   * @param y Y坐标
   * @param width 宽度
   * @param height 高度
   */
  updateModelBox(x: number, y: number, width: number, height: number): void;
}

/**
 * 标准SVG上下文
 * 支持完整页面导出，包含边框和材质表
 */
export declare class SvgContext extends SvgContextBase {
  protected _setting: ExportSetting;
  protected _withPaint: boolean;
  protected _frameRoot: SVGElement;
  protected _materialRoot: SVGElement;
  protected _materialTableWidth: number;
  protected _position: PositionInfo | undefined;
  protected _materialTitle: SVGElement | undefined;

  constructor(setting: ExportSetting, pageSetting?: Partial<PageSetting>);

  /**
   * 设置材质表
   */
  protected _setupMaterialTable(): void;

  /**
   * 设置边框
   */
  protected _setupFrame(): void;

  /**
   * 设置页面布局
   */
  setupPage(): void;

  /**
   * 获取位置信息
   */
  getPositionInfo(): PositionInfo | undefined;
}

/**
 * 铺砖SVG上下文
 * 不包含边框和材质表
 */
export declare class SvgPaveContext extends SvgContext {
  protected _setupFrame(): void;
  protected _setupMaterialTable(): void;
}

/**
 * 原始SVG上下文
 * 最简单的SVG导出，自动适配视图框
 */
export declare class SvgRawContext extends SvgContextBase {
  constructor(pageSetting?: PageSetting, exportSetting?: ExportSetting);

  /**
   * 设置页面布局（自动计算视图框）
   */
  setupPage(): void;
}

/**
 * 小地图SVG上下文
 * 用于缩略图导出
 */
export declare class SvgMinimapContext extends SvgContextBase {
  constructor(app: App, pageSetting: PageSetting, styleConfig: MinimapStyleConfig);

  /**
   * 初始化模型边界框
   * @param app 应用实例
   */
  protected _initModelBox(app: App): void;

  /**
   * 扩展模型边界框
   * @param padding 扩展边距
   */
  protected _expandModelBox(padding: number): void;

  /**
   * 获取每像素对应的单位数
   */
  getUnitPerPixel(): number;

  /**
   * 获取视图框配置
   */
  getViewBox(): ViewBox;

  /**
   * 获取墙体模型宽度
   * @param wall 墙体实体
   */
  getWallModelWidth(wall?: HSCore.Model.Wall): number;

  /**
   * 设置页面布局
   */
  setupPage(): void;

  /**
   * 判断是否为内墙
   * @param wall 墙体实体
   */
  static isInnerWall(wall: HSCore.Model.Wall): boolean;
}

/**
 * SVG轮廓导出类
 * 负责导出墙体轮廓
 */
export declare class SvgOutline extends SvgBase {
  protected _wallStructurePaths: unknown[][] | null;
  protected _node: SVGElement;

  constructor(app: App, context: SvgContextBase);

  /**
   * 导出轮廓
   */
  export(): Promise<void>;

  /**
   * 导出轮廓（材质表版本）
   */
  exportM(): void;

  /**
   * 过滤墙体
   * @param entityList 实体列表
   */
  protected filterWalls(entityList: EntityGeometry[]): void;

  /**
   * 过滤结构
   * @param entityList 实体列表
   */
  protected filterStructures(entityList: EntityGeometry[]): void;

  /**
   * 构建轮廓路径
   */
  build(): void;

  /**
   * 合并路径
   * @param paths 路径数组
   */
  protected _union(paths: unknown[]): unknown[][];

  /**
   * 绘制轮廓
   */
  draw(): void;

  /**
   * 循环路径转SVG路径
   * @param loop 循环路径
   */
  protected loop2SVG(loop: unknown[]): string;

  /**
   * 曲线转SVG路径
   * @param curve 曲线对象
   * @param isFirst 是否为起始曲线
   */
  protected curve2SVG(curve: Line2d | Arc2d, isFirst: boolean): string;

  /**
   * 缩放点坐标
   * @param point 原始点
   */
  protected _scale(point: Point2D): ScaledPoint;
}