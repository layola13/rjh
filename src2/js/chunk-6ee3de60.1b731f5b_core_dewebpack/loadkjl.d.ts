/**
 * 门窗加载模块 - 从CAD数据加载和创建门窗模型
 * @module LoadKJL
 */

import Flatten from 'flatten-js';
import { EdgeJointWay } from './edge-joint-way';
import { ShapeActor, OpenDirection, OpenToward } from './shape-actor';
import { Direction, SlideOptions, EdgeFinder } from './direction-utils';
import {
  ShapeType,
  SingleTrackPolygon,
  WinPolygon,
  Handle,
  SkewPartEnum
} from './shape-types';

/**
 * 玻璃信息
 */
interface GlassInfo {
  /** 玻璃编码 */
  glassCode: string;
  /** 玻璃中心点 */
  center: Flatten.Point;
}

/**
 * 加载结果
 */
interface LoadResult {
  /** 绘图数据序列化字符串 */
  drawingData: string;
  /** 图片数据 */
  img: string;
  /** 自定义参数 */
  custom: CustomParams | string;
  /** 连接件编码数组 */
  coupleCodes: string[];
  /** 玻璃编码数组 */
  glassCodes: string[];
  /** 错误信息 */
  error: string;
}

/**
 * 自定义参数
 */
interface CustomParams {
  /** 自定义编码 */
  customCode: string;
  /** 自定义参数 */
  customParam: string;
  /** 外部颜色材质ID */
  outcolor: string;
  /** 内部颜色材质ID */
  incolor: string;
}

/**
 * 门窗数据
 */
interface DoorWindow {
  /** 门窗类型 (1=门, 其他=窗) */
  doorWindowType: number;
  /** 零件列表 */
  parts: Part[];
  /** 参数列表 */
  parameters: Parameter[];
}

/**
 * 零件
 */
interface Part {
  /** 零件ID */
  id: string;
  /** 零件类别代码 */
  category: number;
  /** 品牌商品编码 */
  bgCode?: string;
  /** 自定义编码 */
  code?: string;
  /** 2D轮廓数据 */
  profile2ds: Profile2D[];
  /** 面宽 */
  faceWidth: number;
  /** 墙体角度 */
  wallAngle?: number;
  /** 子零件 */
  parts: Part[];
  /** 参数 */
  parameters: Parameter[];
}

/**
 * 2D轮廓
 */
interface Profile2D {
  /** 类型 (SEGMENT/ARC2) */
  tp: string;
  /** 起点 */
  p0: { x: number; y: number };
  /** 终点 */
  p1: { x: number; y: number };
  /** 圆弧数据 */
  circle?: {
    /** 圆心 */
    c: { x: number; y: number };
    /** 半径 */
    r: number;
  };
  /** 起始角度 */
  s?: number;
  /** 结束角度 */
  e?: number;
}

/**
 * 参数
 */
interface Parameter {
  /** 参数名 */
  name: string;
  /** 参数值 */
  value: string;
}

/**
 * 边数据
 */
interface EdgeData {
  /** 边线段或圆弧 */
  edge: Flatten.Segment | Flatten.Arc;
  /** 模型ID */
  modelId: string;
  /** 方向 */
  direction?: Direction;
}

/**
 * 中挺线数据
 */
interface MullionLineData {
  /** 线段 */
  seg: Flatten.Segment;
  /** 起点是否对接 */
  stDock: boolean;
  /** 终点是否对接 */
  edDock: boolean;
}

/**
 * 墙体角度信息
 */
interface WallAngle {
  /** A侧零件ID */
  aid: string;
  /** B侧零件ID */
  bid: string;
  /** 墙体角度 */
  wallAngle: number;
}

/**
 * 生产工艺数据
 */
interface ProduceData {
  /** 工艺列表 */
  crafts: CraftData[];
  /** 轮廓数据 */
  profile: ProfileData[];
  /** 自定义编码 */
  customCode: string;
  /** 自定义参数 */
  customParam: string;
}

/**
 * 工艺数据
 */
interface CraftData {
  /** 模型ID */
  modelId: string;
  /** 起点连接类型 (0=默认, 1=横竖切换, 2=对角) */
  startConnectType: number;
  /** 终点连接类型 */
  endConnectType: number;
  /** 边线段 */
  edge?: Flatten.Segment;
}

/**
 * 轮廓数据
 */
interface ProfileData {
  /** 起点 */
  startPoint: { _x: number; _y: number };
  /** 终点 */
  endPoint: { _x: number; _y: number };
  /** 模型ID */
  modelId: string;
  /** 是否虚拟边 */
  isVirtual: boolean;
}

/**
 * 滑动扇类型
 */
interface SlideSashData {
  /** X位置 */
  x: number;
  /** Y位置 */
  y: number;
  /** 滑动扇类型 */
  slideSashType: ShapeType;
}

/**
 * 格栅位置
 */
interface CellPosition {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 创建窗户结果
 */
interface CreateWindowResult {
  /** 窗框对象 */
  frame: unknown;
  /** 自定义参数 */
  custom: CustomParams;
  /** 玻璃编码列表 */
  glassInfos: string[];
}

/**
 * 快捷门窗加载器
 * 负责从CAD数据加载门窗模型并转换为内部绘图对象
 */
export declare class LoadKJL {
  /** 形状管理器 */
  private readonly shapeManager: unknown;
  
  /** 视图对象 */
  private readonly view: unknown;

  /** 开启模式映射 (CAD开启模式 -> 内部开启方向) */
  private readonly openModeMap: Map<number, OpenDirection>;

  /** 拼接工艺映射 (CAD工艺代码 -> 内部接缝方式) */
  private readonly PJGYMap: EdgeJointWay[];

  /** 开启方向映射 */
  private readonly kjlOpenDirectionMap: Map<number, OpenDirection>;

  /** 推拉方式映射 (0=内开, 1=外开) */
  private readonly kjlPushOrPullMap: OpenToward[];

  /** 外框类别代码数组 */
  private readonly kjlOutlineCategoryArr: number[];

  /** 边框类别代码数组 */
  private readonly kjlFrameCategoryArr: number[];

  /** 中挺类别代码数组 */
  private readonly kjlMullionCategoryArr: number[];

  /** 双扇类别代码数组 */
  private readonly kjlDoublesashArr: number[];

  /** 扇类别代码数组 */
  private readonly kjlSashCategoryArr: number[];

  /** 纱窗类别代码数组 */
  private readonly kjlScreenCategoryArr: number[];

  /** 推拉窗类别代码数组 */
  private readonly kjlSlideCategoryArr: number[];

  /** 推拉扇类别代码数组 */
  private readonly kjlSlideSashCategoryArr: number[];

  /** 推拉纱窗类别代码数组 */
  private readonly kjlSlideScreenCategoryArr: number[];

  /** 转换框类别代码数组 */
  private readonly kjlZhkCategoryArr: number[];

  /** 转角料类别代码数组 */
  private readonly kjlZjlCategoryArr: number[];

  /** 连接件类别代码数组 */
  private readonly kjlLjjCategoryArr: number[];

  /** 玻璃类别代码数组 */
  private readonly kjlGlassCategoryArr: number[];

  /**
   * 构造函数
   * @param shapeManager - 形状管理器实例
   * @param view - 视图对象实例
   */
  constructor(shapeManager: unknown, view: unknown);

  /**
   * 批量加载门窗数据
   * @param data - 包含门窗数组的数据对象
   * @returns 加载结果数组
   */
  load(data: { doorWindows: DoorWindow[] }): LoadResult[];

  /**
   * 创建单个窗户
   * @param doorWindow - 门窗数据
   * @param offset - 坐标偏移向量
   * @returns 创建结果包含框架、自定义参数和玻璃信息
   */
  private createWindow(
    doorWindow: DoorWindow,
    offset?: Flatten.Vector
  ): CreateWindowResult;

  /**
   * 设置窗扇参数
   * @param parts - 零件列表
   * @param parameters - 参数列表
   * @param sash - 窗扇对象
   * @param withTurningFrame - 是否带转换框
   */
  private PushSash_set(
    parts: Part[],
    parameters: Parameter[],
    sash: unknown,
    withTurningFrame?: boolean
  ): void;

  /**
   * 排序中挺线
   * 确保中挺线与外框正确对接
   * @param mullionLines - 中挺线数据数组
   * @param frameEdges - 外框边数组
   * @param extendLength - 延伸长度用于检测对接
   * @returns 排序后的中挺线段数组
   */
  private sortKjlMullionLines(
    mullionLines: MullionLineData[],
    frameEdges: (Flatten.Segment | Flatten.Arc)[],
    extendLength: number
  ): Flatten.Segment[];

  /**
   * 检查两条边的水平垂直关系
   * @param edge1 - 第一条边
   * @param edge2 - 第二条边
   * @returns 关系描述对象 {fst: "h"|"v", scd: "h"|"v"}
   */
  private checkHv(
    edge1: Flatten.Segment | Flatten.Arc,
    edge2: Flatten.Segment | Flatten.Arc
  ): { fst: 'h' | 'v'; scd: 'h' | 'v' };

  /**
   * 推拉窗选项映射
   * 根据列数、轨道数和扇类型查找匹配的推拉窗选项
   * @param columnsCount - 列数
   * @param tracksCount - 轨道数
   * @param sashData - 扇数据数组
   * @returns 选项索引，未找到返回undefined
   */
  private kjlSlideMapping(
    columnsCount: number,
    tracksCount: number,
    sashData: SlideSashData[]
  ): number | undefined;

  /**
   * 设置玻璃编码
   * 遍历所有玻璃对象，根据位置匹配并设置编码
   * @param glassInfos - 玻璃信息数组
   * @param frame - 窗框对象
   */
  private kjlGlassSet(glassInfos: GlassInfo[], frame: unknown): void;
}