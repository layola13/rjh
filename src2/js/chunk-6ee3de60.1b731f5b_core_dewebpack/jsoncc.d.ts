/**
 * 门窗配置序列化模块
 * 负责将视图中的门窗图形数据序列化为JSON格式
 */

import type { Box, Point, Segment, Vector, Matrix, Polygon, Arc } from './geometry';
import type { ShapeManager } from './shape-manager';
import type { MomentoManager } from './momento-manager';
import type { Frame, Sash, CornerJoiner, TrapezoidPoly, PeakPentagonPoly } from './shapes';
import type { Direction, EdgeFinder, FrameUtil } from './utils';
import type { OpenToward, OpenDirection } from './hardware';

/**
 * 开启方式枚举
 */
export enum OpenWay {
  /** 无 */
  None = 0,
  /** 外开右 */
  OutwardRight = 1,
  /** 外开左 */
  OutwardLeft = 2,
  /** 内开右 */
  InwardRight = 3,
  /** 内开左 */
  InwardLeft = 4,
  /** 外开上 */
  OutwardUp = 5,
  /** 外开下 */
  OutwardDown = 6,
  /** 内开上 */
  InwardUp = 7,
  /** 内开下 */
  InwardDown = 8,
  /** 外开右下 */
  OutwardRightDown = 9,
  /** 外开左下 */
  OutwardLeftDown = 10,
  /** 内开右下 */
  InwardRightDown = 11,
  /** 内开左下 */
  InwardLeftDown = 12,
  /** 外开右上 */
  OutwardRightUp = 13,
  /** 外开左上 */
  OutwardLeftUp = 14,
  /** 内开右上 */
  InwardRightUp = 15,
  /** 内开左上 */
  InwardLeftUp = 16,
  /** 左推 */
  LeftPush = 17,
  /** 右推 */
  RightPush = 18,
  /** 上推 */
  UpPush = 19,
  /** 内开上右推 */
  InwardUpRightPush = 20,
  /** 内开上左推 */
  InwardUpLeftPush = 21,
  /** 外推 */
  OutPush = 22,
}

/**
 * 双扇开启方式枚举
 */
export enum DoubleSashOpenMethod {
  /** 固定 */
  Fixed = 0,
  /** 内开 */
  In = 1,
  /** 外开 */
  Out = 2,
}

/**
 * 连接条类型枚举
 */
export enum JoinBarType {
  /** 空 */
  Null = 0,
  /** 带连接条分隔 */
  SeparationWithJoin = 1,
  /** 无连接条分隔 */
  SeparationWithOutJoin = 2,
  /** 框中分隔 */
  MiddleInFrame = 3,
  /** 无框转角 */
  WithOutFrameCorner = 4,
  /** 有框转角 */
  WithFrameCorner = 5,
}

/**
 * 边框连接方式枚举
 */
export enum BarJoinType {
  /** 默认 */
  Default = -1,
  /** 垂直拼接 */
  StraightV = 0,
  /** 水平拼接 */
  StraightH = 1,
  /** 45度斜拼接 */
  Straight45 = 2,
}

/**
 * 框架类型枚举
 */
export enum FrameType {
  /** 矩形框 */
  Normal = 0,
  /** 三角形框 */
  Triangle = 3,
  /** 梯形框 */
  Trapezoid = 4,
}

/**
 * 二维点数据
 */
export interface PointData {
  /** X坐标 */
  x: number;
  /** Y坐标（已翻转） */
  y: number;
}

/**
 * 线段数据
 */
export interface SegmentData {
  /** 起点 */
  p1: PointData;
  /** 终点 */
  p2: PointData;
}

/**
 * 多边形包围盒数据
 */
export interface PolygonData {
  /** 左上角点 */
  p1: PointData;
  /** 右下角点 */
  p2: PointData;
}

/**
 * 边框边数据
 */
export interface EdgeData {
  /** 边的起点 */
  p1: PointData;
  /** 边的终点 */
  p2: PointData;
  /** 是否隐藏（虚拟边） */
  hidden: boolean;
}

/**
 * 中挺（分格条）数据
 */
export interface MullionData extends SegmentData {}

/**
 * 玻璃数据
 */
export interface GlassData extends PolygonData {
  /** 玻璃规格 */
  spec: string;
  /** 矩形孔列表 */
  rectHoleList: unknown[];
  /** 圆形孔列表 */
  circleHoleList: unknown[];
}

/**
 * 推拉扇数据
 */
export interface PushSashData extends PolygonData {
  /** 开启方式 */
  openWay: OpenWay;
  /** 边框连接方式 */
  barJoinType: BarJoinType;
  /** 填充物规格（玻璃等） */
  fillerSpec: string;
}

/**
 * 双扇数据
 */
export interface DoubleSashData extends PolygonData {
  /** 开启方式 */
  openMethod: DoubleSashOpenMethod;
  /** 边框连接方式 */
  barJoinType: BarJoinType;
  /** 填充物规格 */
  fillerSpec: string;
}

/**
 * 滑动扇数据
 */
export interface SlideData extends PolygonData {
  /** 轨道数量 */
  count: number;
  /** 开启路径序列 */
  openPath: number[];
  /** 边框连接方式 */
  barJoinType: BarJoinType;
  /** 填充物规格 */
  fillerSpec: string;
}

/**
 * 连接条数据
 */
export interface JoinBarData extends SegmentData {
  /** 连接条类型 */
  type: JoinBarType;
  /** 转角角度 */
  CornerAngle: number;
  /** 上方框架GUID组 */
  UpGuidGroup: string[];
  /** 下方框架GUID组 */
  DownGuidGroup: string[];
  /** 左侧框架GUID组 */
  LeftGuidGroup: string[];
  /** 右侧框架GUID组 */
  RightGuidGroup: string[];
}

/**
 * 基础框架数据
 */
export interface BaseFrameData extends PolygonData {
  /** 产品ID */
  ProductID: number;
  /** 全局唯一标识符 */
  guid: string;
  /** 框架类型 */
  FrameType: FrameType;
  /** 边框连接方式 */
  BarJoinType: BarJoinType;
  /** 边框边列表 */
  edges: EdgeData[];
  /** 中挺列表 */
  Mullions: MullionData[];
  /** 扇列表 */
  Leaves: PushSashData[];
  /** 纱扇列表 */
  ScreenLeaves: PushSashData[];
  /** 玻璃列表 */
  Glasses: GlassData[];
  /** 防蝇纱窗列表 */
  FlyScreens: unknown[];
  /** 双扇列表 */
  DoubleLeaves: DoubleSashData[];
  /** 双纱扇列表 */
  DoubleScreenLeaves: DoubleSashData[];
  /** 滑动扇列表 */
  Sashs: SlideData[];
  /** 滑动纱扇列表 */
  ScreenSashs: SlideData[];
}

/**
 * 梯形框架数据
 */
export interface TrapezoidFrameData extends BaseFrameData {
  FrameType: FrameType.Trapezoid;
  /** 左侧高度（毫米） */
  leftHeightMM: number;
  /** 右侧高度（毫米） */
  rightHeightMM: number;
  /** 宽度（毫米） */
  widthMM: number;
  /** 四边形边框连接方式 */
  quaDrangleBarJoinType: BarJoinType;
}

/**
 * 三角形框架数据
 */
export interface TriangleFrameData extends BaseFrameData {
  FrameType: FrameType.Triangle;
  /** 底边高度（毫米） */
  heightMM: number;
  /** 底边宽度（毫米） */
  widthMM: number;
  /** 三角形顶部高度（毫米） */
  triHeightMM: number;
}

/**
 * 框架数据联合类型
 */
export type FrameData = BaseFrameData | TrapezoidFrameData | TriangleFrameData;

/**
 * 序列化结果
 */
export interface SerializedData {
  /** 框架列表 */
  FrameList: FrameData[];
  /** 连接条列表 */
  JoinBarList: JoinBarData[];
}

/**
 * 开启方式映射项
 */
interface OpenWayMapItem {
  /** 开启朝向（内/外） */
  toward?: OpenToward;
  /** 开启方向（左/右/上/下等） */
  direction?: OpenDirection;
  /** 是否为滑动 */
  isSlide?: boolean;
}

/**
 * 视图接口
 */
export interface IView {
  /** 图形管理器 */
  shapeManager: ShapeManager;
  /** 撤销重做管理器 */
  mometoManager: MomentoManager;
}

/**
 * JSON-CC序列化器
 * 将门窗设计视图数据序列化为CC系统所需的JSON格式
 */
export declare class JsonCc {
  /** 视图实例 */
  private readonly view: IView;
  /** 图形管理器 */
  private readonly shapeManager: ShapeManager;

  /**
   * 构造函数
   * @param view - 设计视图实例
   */
  constructor(view: IView);

  /**
   * 序列化整个视图
   * @returns 序列化后的数据对象
   */
  serialize(): SerializedData;

  /**
   * 提取框架间的自由连接关系
   * @returns 连接条数据数组
   */
  private freeConnectOfFrames(): JoinBarData[];

  /**
   * 将连接器转换为数据
   * @param couple - 连接器实例
   * @returns 连接条数据
   */
  private coupleToData(couple: CornerJoiner): JoinBarData;

  /**
   * 获取指定方向连接的框架
   * @param element - 元素实例
   * @param direction - 连接方向
   * @returns 连接的框架，不存在则返回undefined
   */
  private connectedFrame(element: unknown, direction: Direction): Frame | undefined;

  /**
   * 获取指定方向连接的所有框架ID
   * @param element - 元素实例
   * @param direction - 连接方向
   * @returns 框架ID字符串数组
   */
  private connectedFrameIds(element: unknown, direction: Direction): string[];

  /**
   * 将框架转换为数据
   * @param frame - 框架实例
   * @returns 框架数据
   */
  private frameToData(frame: Frame): FrameData;

  /**
   * 将所有框架对齐到地面基准
   */
  private alignToGround(): void;

  /**
   * 将滑动扇转换为数据
   * @param slide - 滑动扇实例
   * @returns 滑动扇数据
   */
  private slideToData(slide: unknown): SlideData;

  /**
   * 将玻璃转换为数据
   * @param glass - 玻璃实例
   * @returns 玻璃数据
   */
  private glassToData(glass: unknown): GlassData;

  /**
   * 将中挺转换为数据
   * @param mullion - 中挺实例
   * @returns 中挺数据
   */
  private mullionToData(mullion: unknown): MullionData;

  /**
   * 将推拉扇转换为数据
   * @param sash - 推拉扇实例
   * @returns 推拉扇数据
   */
  private pushSashToData(sash: Sash): PushSashData;

  /**
   * 将双扇转换为数据
   * @param doubleSash - 双扇实例
   * @returns 双扇数据
   */
  private doubleSashToData(doubleSash: unknown): DoubleSashData;

  /**
   * 将普通矩形框架转换为数据
   * @param frame - 框架实例
   * @returns 基础框架数据
   */
  private normalFrameBarToData(frame: Frame): BaseFrameData;

  /**
   * 将梯形框架转换为数据
   * @param frame - 框架实例
   * @param polygon - 梯形多边形
   * @returns 梯形框架数据
   */
  private bewFrameBarToData(frame: Frame, polygon: TrapezoidPoly): TrapezoidFrameData;

  /**
   * 将三角形框架转换为数据
   * @param frame - 框架实例
   * @param polygon - 五边形多边形
   * @returns 三角形框架数据
   */
  private trFrameBarToData(frame: Frame, polygon: PeakPentagonPoly): TriangleFrameData;

  /**
   * 将点转换为数据（Y轴翻转）
   * @param point - 点对象
   * @returns 点数据
   */
  private pointToData(point: Point): PointData;

  /**
   * 将线段转换为数据
   * @param segment - 线段对象
   * @returns 线段数据
   */
  private segmentToData(segment: Segment): SegmentData;

  /**
   * 将边转换为数据（应用Y轴镜像变换）
   * @param edge - 边对象
   * @returns 边的JSON数据
   */
  private edgeToData(edge: Segment | Arc): unknown;

  /**
   * 将多边形转换为数据
   * @param polygon - 多边形对象
   * @returns 多边形包围盒数据
   */
  private polygonToData(polygon: Polygon): PolygonData;

  /**
   * 将边框连接方式转换为数据
   * @param frameManager - 框架管理器
   * @returns 边框连接方式枚举值
   */
  private joinWayToData(frameManager: unknown): BarJoinType;

  /**
   * 获取双扇的开启方式
   * @param doubleSash - 双扇实例
   * @returns 双扇开启方式枚举值
   */
  private openWayOfDoubleSash(doubleSash: unknown): DoubleSashOpenMethod;

  /**
   * 获取推拉扇的开启方式
   * @param sash - 推拉扇实例
   * @returns 开启方式枚举值
   */
  private openWayOfPushSash(sash: Sash): OpenWay;

  /**
   * 获取扇的填充物规格
   * @param sash - 扇实例
   * @returns 填充物规格字符串
   */
  private fillerSpecOfSash(sash: unknown): string;

  /**
   * 开启方式映射表
   * 将硬件开启参数映射到枚举值
   */
  private get openWayMap(): Map<OpenWay, OpenWayMapItem>;
}