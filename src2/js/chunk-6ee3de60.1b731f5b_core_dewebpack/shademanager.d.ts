/**
 * 百叶窗管理器类型定义
 * 负责管理窗口中百叶窗条的生成、布局和更新
 */

import { Point, Line, Vector } from './geometry';
import { Polygon, Box } from './shapes';
import { Bar, ShapeType } from './components';
import { SplitterObj, PolyId } from './splitter';
import { FillerSplitterAgent } from './filler';
import { DrawParams } from './draw-params';

/**
 * 百叶窗序列化数据结构
 */
export interface ShadeSerializedData {
  /** 百叶窗条宽度 */
  wd?: number;
  /** 百叶窗条间距 */
  gp?: number;
  /** 内边距 */
  pd?: number;
}

/**
 * 宿主对象接口，包含百叶窗所需的上下文信息
 */
export interface ShadeHost {
  /** 子元素集合 */
  children: Array<Bar | unknown>;
  /** 多边形区域 */
  polygon: Polygon;
  /** 顶部框架 */
  topFrame: {
    /** 型材尺寸管理器 */
    profileSizeManager: {
      /** 获取指定形状类型的尺寸 */
      get(shapeType: ShapeType): number;
    };
  };
  /** 是否包含装饰边 */
  withBead: boolean;
  /** 添加子元素 */
  add(child: Bar): void;
}

/**
 * 百叶窗管理器
 * 用于在窗口多边形区域内自动计算并生成均匀分布的百叶窗条
 */
export declare class ShadeManager {
  /** 宿主对象 */
  readonly host: ShadeHost;
  
  /** 百叶窗条之间的间距 */
  gap: number;
  
  /** 距离边界的内边距 */
  padding: number;
  
  /** 计算后的实际间距（根据可用空间自动调整） */
  computedGap: number;
  
  /** 形状类型标识 */
  readonly where: ShapeType;
  
  /** 分割代理，用于生成分割线 */
  readonly splitter: FillerSplitterAgent;
  
  /** 百叶窗条的型材尺寸（宽度） */
  profileSize: number;

  /**
   * 构造函数
   * @param host - 宿主对象，提供多边形区域和配置信息
   */
  constructor(host: ShadeHost);

  /**
   * 百叶窗条宽度
   * @remarks 等同于 profileSize 的别名属性
   */
  get width(): number;
  set width(value: number);

  /**
   * 获取当前管理的所有百叶窗条
   * @returns 属于此管理器的百叶窗条数组
   */
  get bars(): Bar[];

  /**
   * 清除所有百叶窗条和分割线
   */
  clear(): void;

  /**
   * 平移所有百叶窗条和分割线
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;

  /**
   * 根据宿主多边形更新百叶窗条布局
   * @remarks 清除现有百叶窗，重新计算并生成新的百叶窗条
   */
  updatePoly(): void;

  /**
   * 序列化为JSON对象
   * @returns 包含宽度、间距和内边距的配置对象
   */
  toJSON(): ShadeSerializedData;

  /**
   * 从序列化数据恢复百叶窗配置
   * @param data - 序列化的配置数据
   */
  deserialize(data: ShadeSerializedData | null | undefined): void;

  /**
   * 为指定多边形创建分割线
   * @param polygon - 目标多边形区域
   * @returns 生成的分割对象数组
   */
  private makeSplittersForPolygon(polygon: Polygon): SplitterObj[];

  /**
   * 计算百叶窗条的分割点位置
   * @param polygon - 目标多边形区域
   * @returns 分割点坐标数组
   * @remarks 根据可用空间、百叶窗宽度和间距自动计算均匀分布的位置
   */
  private computeSplitPoints(polygon: Polygon): Point[];

  /**
   * 获取装饰边的尺寸
   * @returns 如果启用装饰边返回其尺寸，否则返回0
   */
  private beadSize(): number;
}