/**
 * 绘图汇总统计模块
 * 提供对绘图中各类构件数量的统计功能
 */

import { ShapeType, Glass, Connector, CornerJoiner } from './shapes';

/**
 * 统计项接口
 */
interface SummaryItem {
  /** 统计项名称 */
  name: string;
  /** 统计数值 */
  value: number;
}

/**
 * 窗扇接口
 */
interface Sash {
  /** 窗扇类型 */
  type: ShapeType;
}

/**
 * 填充物管理器接口
 */
interface FillerManager {
  /** 填充物列表 */
  fillers: unknown[];
}

/**
 * 分隔管理器接口
 */
interface MulManager {
  /** 填充物管理器 */
  fillerManager: FillerManager;
}

/**
 * 窗扇管理器接口
 */
interface SashManager {
  /** 普通窗扇列表 */
  sashes: Sash[];
  /** 双扇窗列表 */
  doubleSashes: Array<{ sashes: Sash[] }>;
  /** 推拉窗列表 */
  slides: Array<{ sashes: Sash[] }>;
  /** 折叠窗列表 */
  folds: Array<{ sashes: Sash[] }>;
  /** 防盗框列表 */
  thefts: unknown[];
}

/**
 * 框架接口
 */
interface Frame {
  /** 窗扇管理器 */
  sashManager: SashManager;
  /** 分隔管理器 */
  mulManager: MulManager;
}

/**
 * 连接构件接口（连接件或转角）
 */
interface Couple {
  // 基础连接构件属性
}

/**
 * 形状管理器接口
 */
interface ShapeManager {
  /** 框架列表 */
  shapem: Frame[];
  /** 连接构件列表 */
  couples: Couple[];
}

/**
 * 绘图汇总统计类
 * 用于统计和汇总绘图中各类构件的数量
 */
export declare class DrawingSummary {
  /**
   * 构造函数
   * @param shapeManager - 形状管理器实例
   */
  constructor(shapeManager: ShapeManager);

  /** 形状管理器 */
  private readonly shapeManager: ShapeManager;

  /**
   * 获取外框数量
   * @returns 外框总数
   */
  get framesCount(): number;

  /**
   * 获取玻扇数量
   * @returns 玻璃窗扇总数
   */
  get glassSashesCount(): number;

  /**
   * 获取纱扇数量
   * @returns 纱窗扇总数
   */
  get screenSashesCount(): number;

  /**
   * 获取防盗框数量
   * @returns 防盗框总数
   */
  get theftsCount(): number;

  /**
   * 获取固玻数量
   * @returns 固定玻璃总数
   */
  get fixedGlassesCount(): number;

  /**
   * 获取连接件数量
   * @returns 连接件总数
   */
  get connectorsCount(): number;

  /**
   * 获取转角数量
   * @returns 转角构件总数
   */
  get cornerJoinersCount(): number;

  /**
   * 获取所有统计项
   * @returns 包含所有统计数据的数组
   */
  get all(): SummaryItem[];

  /**
   * 获取所有框架
   * @returns 框架列表
   */
  private get frames(): Frame[];

  /**
   * 获取所有连接构件
   * @returns 连接构件列表
   */
  private get couples(): Couple[];

  /**
   * 获取所有窗扇（包括普通、双扇、推拉、折叠等）
   * @returns 窗扇列表
   */
  private get sashes(): Sash[];
}