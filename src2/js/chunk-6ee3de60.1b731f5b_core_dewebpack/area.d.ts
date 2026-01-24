/**
 * 玻璃区域模块
 * 提供窗体中玻璃区域的管理、渲染和交互功能
 */

import { Point, Segment, Line, Vector } from 'paper';
import { DrawParams } from './DrawParams';
import { DisplayUtils, ShapeColor, HitResult, Utils } from './DisplayUtils';
import { 
  Filler, 
  GuardSash, 
  Frame, 
  Sash, 
  WinPolygon, 
  Bead, 
  Label, 
  Shade,
  ShapeType,
  TextAlign 
} from './Shapes';

/**
 * 玻璃规格信息接口
 */
export interface GlassSpecification {
  /** 玻璃规格型号 */
  spec?: string;
  /** 玻璃厚度 */
  thickness?: number;
  /** 工艺列表 [工艺代码, 工艺名称] */
  technics: Array<[string, string]>;
  /** 自定义文本 */
  customText?: string;
  /** 克隆规格 */
  clone(): GlassSpecification;
  /** 序列化 */
  toJSON(): unknown;
  /** 反序列化 */
  deserialize(data: unknown): void;
}

/**
 * 宿主形状类型（Frame、Sash或GuardSash）
 */
export type HostShape = Frame | Sash | GuardSash;

/**
 * 序列化数据接口
 */
export interface AreaSerializedData {
  /** 形状类型 */
  type: ShapeType;
  /** 多边形ID */
  pid: unknown;
  /** 压条数据 */
  bd?: unknown;
  /** 序号标签数据 */
  ser?: unknown;
  /** 玻璃规格数据 */
  spet?: unknown;
  /** 玻璃厚度（旧版兼容） */
  tkn?: number;
  /** 是否带转向框 */
  wtf?: boolean;
}

/**
 * 序号配置接口
 */
export interface SerialConfig {
  /** 开扇玻璃序号前缀 */
  sashGlass: string;
  /** 纱窗序号前缀 */
  screenNet: string;
  /** 固定玻璃序号前缀 */
  fixedGlass: string;
}

/**
 * 玻璃区域类
 * 负责管理窗体中的玻璃填充区域，包括玻璃规格、压条、序号标签等
 * 继承自Filler基类
 */
export declare class Area extends Filler {
  /** 宿主形状（所属的框或扇） */
  readonly host: HostShape;
  
  /** 渲染用多边形 */
  readonly renderPolygon: WinPolygon;
  
  /** 玻璃压条 */
  readonly bead?: Bead;
  
  /** 序号标签 */
  readonly serial?: Label;
  
  /** 规格标签（动态） */
  readonly spec?: Label;
  
  /** 固定规格标签 */
  readonly fixedSpec?: Label;
  
  /** 转向框标签 */
  readonly withTurningFrameLabel?: Label;
  
  /** 玻璃规格信息 */
  glassSpec: GlassSpecification;
  
  /** 是否带转向框 */
  withTurningFrame: boolean;

  /**
   * 构造函数
   * @param host - 宿主形状
   * @param polygon - 玻璃区域多边形
   */
  constructor(host: HostShape, polygon: WinPolygon);

  /**
   * 判断是否在护栏扇中
   */
  get inGuardSash(): boolean;

  /**
   * 判断是否使用脚本指定的玻璃规格
   */
  get scriptBasedSpec(): boolean;

  /**
   * 判断压条是否隐藏
   * - 固定框且未显示固定压条时隐藏
   * - 开扇且未显示开扇压条时隐藏
   */
  get beadHidden(): boolean;

  /**
   * 获取固定规格描述文本
   * 格式: "规格型号/工艺1/工艺2"
   */
  get fixedSpecDesc(): string;

  /**
   * 判断当前区域是否高亮显示
   */
  get highlighted(): boolean;

  /**
   * 判断是否需要窄式样式（纱窗特殊处理）
   */
  get narrowStyleRequired(): boolean;

  /**
   * 更新多边形和标签
   * 刷新规格标签文本和可见性
   * @param event - 更新事件参数
   */
  updatePoly(event?: unknown): void;

  /**
   * 更新转向框标签
   * 根据显示设置和转向框状态更新标签位置和文本
   */
  updateTurningFrameLabel(): void;

  /**
   * 绘制玻璃区域
   * @param context - 绘图上下文（Paper.js视图）
   */
  draw(context: unknown): void;

  /**
   * 高亮显示玻璃区域
   * @param context - 绘图上下文
   */
  highlight(context: unknown): void;

  /**
   * 碰撞检测（条形）
   * @param point - 检测点坐标
   * @param tolerance - 容差值
   * @returns 碰撞结果
   */
  hitBar(point: Point, tolerance: number): HitResult;

  /**
   * 碰撞检测（区域）
   * @param point - 检测点坐标
   * @param tolerance - 容差值
   * @returns 碰撞结果（Glass或None）
   */
  hitArea(point: Point, tolerance: number): HitResult;

  /**
   * 删除玻璃区域
   * （当前为空实现，保留接口）
   */
  delete(): void;

  /**
   * 隐藏辅助元素（压条辅助线等）
   */
  hideAssist(): void;

  /**
   * 平移玻璃区域
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;

  /**
   * 序列化为JSON
   * @returns 序列化数据对象
   */
  toJSON(): AreaSerializedData;

  /**
   * 从序列化数据恢复
   * @param data - 序列化数据
   */
  deserialize(data: AreaSerializedData): void;

  /**
   * 生成渲染用多边形
   * 根据是否有压条和是否需要窄式样式生成不同的多边形
   * @returns 渲染多边形
   */
  makeRenderPolygon(): WinPolygon;

  /**
   * 生成窄式样式多边形（用于纱窗内嵌显示）
   * @param polygon - 原始多边形
   * @returns 切割后的窄式多边形
   */
  makeNarrowPolygon(polygon: WinPolygon): WinPolygon;

  /**
   * 计算窄式样式的切割线
   * @param polygon - 多边形
   * @returns 切割线
   */
  narrowLine(polygon: WinPolygon): Line;

  /**
   * 窄式样式排序比较函数
   * 按左上到右下对角线投影排序
   * @param a - 比较对象A（点或多边形）
   * @param b - 比较对象B（点或多边形）
   * @returns 排序结果
   */
  sortForNarrow(a: Point | WinPolygon, b: Point | WinPolygon): number;

  /**
   * 静态方法：批量计算玻璃序号
   * 根据类型（开扇玻璃、纱窗、固定玻璃）分别编号
   * @param frames - 框架数组
   * @param skipDraw - 是否跳过绘制
   */
  static calcSerial(frames: Frame[], skipDraw?: boolean): void;
}