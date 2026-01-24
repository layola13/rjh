/**
 * SvgRooms 模块类型定义
 * 用于处理 SVG 格式的房间渲染和绘制
 */

import type { HSApp, HSCore } from './core-types';
import type { SvgBase } from './svg-base';
import type { MixPaintCapture } from './mix-paint-capture';
import type { SvgCommon } from './svg-common';
import type { SvgPaints } from './svg-paints';

/**
 * 房间类型本地化资源映射
 */
export interface RoomResourceMap {
  [roomType: string]: string;
  none: string;
}

/**
 * 房间纹理图案配置
 */
export interface RoomPattern {
  /** 图案宽度（单位：像素） */
  width: number;
  /** 图案高度（单位：像素） */
  height: number;
  /** 图案资源 URL */
  url: string;
}

/**
 * 房间配置选项
 */
export interface RoomSettings {
  /** 语言代码（如 'en_US', 'zh_CN'） */
  lang: string;
  /** 房间配置 */
  room?: {
    /** 是否隐藏房间名称 */
    isHideRoomName?: boolean;
    /** 面积是否可见 */
    areaVisible?: boolean;
    /** 是否绘制地面图片 */
    drawGroundImg?: boolean;
    /** 边缘宽度 */
    edgeWidth: number;
    /** 边缘颜色 */
    edgeColor: string;
    /** 字体颜色 */
    fontColor: string;
    /** 字体轮廓颜色 */
    fontOutlineColor: string;
    /** 文本描边宽度 */
    textStrokeWidth: number;
    /** 文本轮廓描边宽度 */
    textOutlineStrokeWidth: number;
    /** 房间类型文本尺寸配置 */
    typeTextSize: {
      size: number;
      padding: number;
    };
    /** 面积文本尺寸配置 */
    areaTextSize: {
      size: number;
      paddingSmall: number;
      paddingBig: number;
      sizelist: number[];
    };
    /** 房间样式映射 */
    style?: Record<string, unknown>;
  };
  /** 背景颜色 */
  backgroundColor?: string;
  /** 墙体配置 */
  wall: {
    /** 承重墙颜色 */
    loadBearingColor: string;
  };
}

/**
 * SVG 上下文接口
 */
export interface SvgContext {
  /** 图层管理器 */
  layers(): {
    rooms: SvgNode;
    loadbearings: SvgNode;
    roomtexts: SvgNode;
  };
  /** 获取 SVG 上下文 */
  context(): SvgCanvas;
  /** 获取页面设置 */
  pageSetting(): RoomSettings;
  /** 获取单位像素比 */
  getUnitPerPixel(): number;
  /** 是否包含涂料 */
  _withPaint?: boolean;
}

/**
 * SVG 节点接口
 */
export interface SvgNode {
  /** 创建分组 */
  group(): SvgGroup;
}

/**
 * SVG 分组接口
 */
export interface SvgGroup {
  /** 设置元素 ID */
  id(id: string): this;
  /** 绘制路径 */
  path(pathString: string): SvgPath;
  /** 绘制多边形 */
  polygon(points: string): SvgPolygon;
  /** 绘制文本 */
  text(content: string | ((textBuilder: TextBuilder) => void)): SvgText;
}

/**
 * SVG 路径接口
 */
export interface SvgPath {
  /** 设置描边样式 */
  stroke(options: StrokeOptions): this;
  /** 设置填充样式 */
  fill(color: string | SvgPattern): this;
  /** 设置属性 */
  attr(attributes: Record<string, unknown>): this;
}

/**
 * SVG 多边形接口
 */
export interface SvgPolygon {
  /** 设置元素 ID */
  id(id: string): this;
  /** 设置填充样式 */
  fill(color: string): this;
  /** 设置描边样式 */
  stroke(options: StrokeOptions): this;
}

/**
 * SVG 文本接口
 */
export interface SvgText {
  /** 设置样式 */
  style(styles: Record<string, string>): this;
  /** 设置路径 */
  path(pathString: string): SvgPath;
  /** 获取文本路径 */
  textPath(): {
    attr(attributes: Record<string, string>): void;
  };
  /** 设置字体 */
  font(options: FontOptions): this;
  /** 获取边界框 */
  bbox(): BoundingBox;
  /** 设置描边样式 */
  stroke(options: StrokeOptions): this;
}

/**
 * 文本构建器接口
 */
export interface TextBuilder {
  /** 添加文本片段 */
  tspan(text: string): void;
}

/**
 * 描边选项
 */
export interface StrokeOptions {
  /** 描边宽度 */
  width: number;
  /** 描边颜色 */
  color: string;
}

/**
 * 字体选项
 */
export interface FontOptions {
  /** 字体大小 */
  size: number;
  /** 字体族 */
  family: string;
}

/**
 * 边界框
 */
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * SVG 画布接口
 */
export interface SvgCanvas {
  /** 创建图案 */
  pattern(width: number, height: number, callback: (pattern: PatternBuilder) => void): SvgPattern;
}

/**
 * SVG 图案接口
 */
export interface SvgPattern {
  // 图案对象
}

/**
 * 图案构建器接口
 */
export interface PatternBuilder {
  /** 添加图片 */
  image(url: string): {
    size(width: number, height: number): {
      attr(key: string, value: string): void;
    };
  };
}

/**
 * 2D 点坐标
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Clipper 路径点
 */
export interface ClipperPoint {
  X: number;
  Y: number;
}

/**
 * 房间几何数据
 */
export interface RoomGeometry {
  /** 外轮廓点集 */
  outer: Point2D[];
  /** 内部孔洞集合 */
  holes?: Point2D[][];
}

/**
 * 房间模型数据
 */
export interface Room {
  /** 房间唯一标识 */
  ID: string;
  /** 房间类型 */
  roomType?: string;
  /** 原始几何数据 */
  rawGeometry: RoomGeometry;
  /** 父对象映射 */
  parents: Record<string, unknown>;
}

/**
 * 地面面对象
 */
export interface FloorFace {
  /** 面 ID */
  id: string;
  /** 材质信息 */
  material: {
    /** 混合涂料配置 */
    mixpaint?: {
      /** 面组 ID */
      faceGroupId: string;
    };
  };
}

/**
 * 地板模型
 */
export interface FloorSlab {
  /** 获取指定侧面 */
  getFaces(side: 'top'): Record<string, FloorFace>;
}

/**
 * 场景图层
 */
export interface SceneLayer {
  /** 遍历地板 */
  forEachFloorSlab(callback: (slab: FloorSlab) => void): void;
}

/**
 * 应用场景
 */
export interface AppScene {
  /** 当前激活图层 */
  activeLayer: SceneLayer;
  /** 根图层 */
  rootLayer: SceneLayer;
  /** 室外图层 */
  outdoorLayer: SceneLayer;
}

/**
 * 单个房间构造参数
 */
export interface SingleRoomOptions {
  /** 房间模型数据 */
  room: Room;
  /** 地板 SVG 节点 */
  floor: SvgGroup;
  /** 承重墙 SVG 节点 */
  loadbearing: SvgNode;
  /** 注释文本 SVG 节点 */
  annotation: SvgGroup;
  /** 父级 SvgRooms 实例 */
  parent: SvgRooms;
  /** 分组房间数组 */
  groupRoom: Room[];
  /** 是否为室外房间 */
  isOutDoor: boolean;
}

/**
 * 图像绘制参数
 */
export interface ImageDrawOptions {
  /** 单位缩放比例 */
  unitScale: number;
  /** 图像对象 */
  image: unknown;
  /** 模型边界框 */
  box2d: unknown;
  /** SVG 上下文 */
  svgContext: SvgContext;
  /** SVG 节点 */
  svgNode: SvgNode;
}

/**
 * SvgRooms 主类
 * 负责管理所有房间的 SVG 渲染
 */
export declare class SvgRooms extends SvgBase {
  /** 房间实例数组 */
  private _rooms: SingleRoom[];
  /** 图案缓存映射 */
  private _patterns: Map<RoomPattern, SvgPattern>;
  /** SVG 根节点 */
  private _node: SvgNode;
  /** 房间设置 */
  private _setting: RoomSettings;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param context - SVG 上下文
   * @param settings - 房间配置
   */
  constructor(app: HSApp, context: SvgContext, settings: RoomSettings);

  /**
   * 构建房间数据
   * 遍历场景中的所有地板，生成房间实例
   */
  build(): void;

  /**
   * 绘制所有房间
   * 如果启用了涂料功能，会额外绘制混合涂料效果
   */
  draw(): void;

  /**
   * 绘制房间图案
   * @param pattern - 图案配置
   * @returns SVG 图案对象
   */
  drawPattern(pattern: RoomPattern): SvgPattern;

  /**
   * 导出模式渲染
   * 构建并绘制用于导出的房间视图
   */
  exportM(): void;

  /**
   * 绘制房间混合涂料效果
   * 分别处理室内和室外房间
   */
  private _drawRoomsMixPaint(): void;

  /**
   * 捕获并绘制地板图像
   * @param layer - 目标图层
   */
  private _drawRoomsFloorsCapture(layer: SceneLayer): void;
}

/**
 * SingleRoom 单个房间类
 * 处理单个房间的几何、样式和文本渲染
 */
declare class SingleRoom extends SvgBase {
  /** 房间模型数据 */
  private _room: Room;
  /** 地板 SVG 分组 */
  private _floor: SvgGroup;
  /** 承重墙 SVG 节点 */
  private _loadbearing: SvgNode;
  /** 注释文本 SVG 分组 */
  private _annotation: SvgGroup;
  /** 父级 SvgRooms 实例 */
  private _parent: SvgRooms;
  /** 分组房间数组 */
  private _groupRoom: Room[];
  /** 是否为室外房间 */
  private _isOutDoor: boolean;
  /** 处理后的几何点集 */
  private _geometry: Point2D[] | null;
  /** 承重墙数组 */
  private _bearwalls: unknown[];
  /** SVG 涂料渲染器 */
  private _svgPaints?: SvgPaints;
  /** 本地化资源映射 */
  private _resource: RoomResourceMap;
  /** 是否使用显示名称 */
  private _useDisplayName: boolean;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param context - SVG 上下文
   * @param options - 房间选项
   * @param resource - 本地化资源
   * @param useDisplayName - 是否使用显示名称
   */
  constructor(
    app: HSApp,
    context: SvgContext,
    options: SingleRoomOptions,
    resource: RoomResourceMap,
    useDisplayName?: boolean
  );

  /** 获取房间模型数据 */
  get room(): Room;

  /** 获取是否为室外房间 */
  get isOutDoor(): boolean;

  /** 获取几何点集 */
  get geometry(): Point2D[] | null;

  /** 获取本地化资源 */
  get resource(): RoomResourceMap;

  /**
   * 获取房间文本标签
   * @param room - 房间对象
   * @returns 本地化的房间类型名称
   */
  getRoomText(room: Room): string;

  /**
   * 构建房间数据
   * 处理几何数据和涂料配置
   */
  build(): void;

  /**
   * 构建 SVG 路径字符串
   * @param room - 房间对象
   * @param unitScale - 单位缩放比例
   * @returns SVG 路径字符串
   */
  private _buildSVGString(room: Room, unitScale: number): string;

  /**
   * 绘制房间
   * 绘制地板、涂料、承重墙和文本标注
   */
  draw(): void;

  /**
   * 导出模式绘制
   * 绘制用于导出的房间视图
   */
  drawM(): void;

  /**
   * 绘制导出模式文本
   * @param annotation - 注释 SVG 分组
   * @param bounds - 边界框
   * @param text - 文本内容
   * @param fontSizes - 字体大小列表
   * @param offset - 垂直偏移量
   */
  private _drawTextM(
    annotation: SvgGroup,
    bounds: BoundingBox,
    text: string,
    fontSizes: number[],
    offset: number
  ): void;

  /**
   * 计算房间面积
   * @returns 格式化的面积字符串，如果面积过小则返回 undefined
   */
  private _calcArea(): string | undefined;

  /**
   * 计算文本位置
   * @returns 文本中心位置坐标
   */
  private _calcTextPos(): Point2D;

  /**
   * 将模型坐标转换为 Clipper 路径点
   * @param point - 模型坐标点
   * @returns Clipper 路径点
   */
  private _toPath(point: Point2D): ClipperPoint;

  /**
   * 绘制文本标注
   * @param annotation - 注释 SVG 分组
   * @param bounds - 边界框
   * @param text - 文本内容
   * @param outlineMode - 是否为轮廓模式（0=普通，1=轮廓）
   * @param fontSize - 字体大小
   * @param padding - 内边距
   */
  private _drawText(
    annotation: SvgGroup,
    bounds: BoundingBox,
    text: string,
    outlineMode: 0 | 1,
    fontSize: number,
    padding: number
  ): void;

  /**
   * 获取房间地面图案
   * @returns 图案配置对象
   */
  private _getImage(): RoomPattern | undefined;
}

export { SingleRoom };