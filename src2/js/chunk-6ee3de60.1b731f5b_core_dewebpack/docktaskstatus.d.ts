/**
 * 停靠任务状态枚举
 * 用于控制停靠任务的执行流程
 */
export enum DockTaskStatus {
  /** 继续执行下一个任务 */
  Continue = 0,
  /** 提前返回，中止后续任务 */
  Return = 1,
  /** 任务完成 */
  OK = 2
}

/**
 * 多边形标识符接口
 */
export interface PolyId {
  /** 多边形索引 */
  idx: number;
  /** 位置索引，-1表示边缘数据 */
  pos: number;
  
  /** 序列化为JSON对象 */
  toJSON(): object;
  /** 从JSON对象反序列化 */
  deserialize(json: object): PolyId;
  /** 判断是否相等 */
  equalTo(other: PolyId): boolean;
}

/**
 * 停靠点数据接口
 */
export interface DockData {
  /** 停靠点坐标 */
  pt: Point;
  /** 关联的多边形标识符 */
  idx: PolyId;
}

/**
 * 点坐标接口
 */
export interface Point {
  /** 判断是否与另一个点相等 */
  equalTo(other: Point): boolean;
  /** 平移点坐标 */
  translate(offset: Point): Point;
}

/**
 * 边缘接口
 */
export interface Edge {
  // Edge相关属性和方法
}

/**
 * 多边形接口
 */
export interface Polygon {
  /** 多边形的边集合 */
  edges: Edge[];
}

/**
 * 多重形状接口
 */
export interface MulShape {
  // MulShape相关属性和方法
}

/**
 * 条形对象接口
 */
export interface Bar {
  /** 条形的多边形 */
  polygon: {
    mulShape: MulShape;
  };
}

/**
 * 多重管理器接口
 */
export interface MulManager {
  /** 条形对象集合 */
  bars: Bar[];
}

/**
 * 查找结果接口
 */
export interface FindResult {
  /** 多边形标识符 */
  pid: PolyId;
  /** 停靠数据 */
  dd: DockData;
}

/**
 * 上下文对象接口
 */
export interface Context {
  /** 多边形对象 */
  polygon: Polygon;
  /** 多重管理器 */
  mulManager: MulManager;
  /** 根据PolyId查找Bar */
  findBarByPolyId(polyId: PolyId): Bar | undefined;
}

/**
 * 停靠管理器
 * 管理多边形之间的停靠点数据，支持边缘停靠和多重停靠
 */
export class DockManager {
  /**
   * 停靠数据映射表
   * key: PolyId的JSON字符串
   * value: 停靠数据数组
   */
  private dockData: Map<string, DockData[]>;

  constructor();

  /**
   * 遍历所有停靠数据并执行回调函数
   * @param callback - 回调函数，接收PolyId和停靠数据，返回任务状态
   */
  forDoTask(callback: (polyId: PolyId, dockData: DockData[]) => DockTaskStatus): void;

  /**
   * 根据点坐标查找停靠数据
   * @param point - 要查找的点坐标
   * @returns 查找结果，包含PolyId和停靠数据，未找到则返回undefined
   */
  findPt(point: Point): FindResult | undefined;

  /**
   * 添加停靠数据
   * @param key - PolyId的JSON字符串
   * @param data - 停靠数据
   */
  push(key: string, data: DockData): void;

  /**
   * 检查是否存在指定索引的边缘停靠数据
   * @param index - 多边形索引
   * @returns 是否存在边缘数据
   */
  hasEdgeData(index: number): boolean;

  /**
   * 获取指定索引的边缘停靠数据
   * @param index - 多边形索引
   * @returns 停靠数据数组，未找到则返回undefined
   */
  getEdgeData(index: number): DockData[] | undefined;

  /**
   * 获取停靠数据
   * @param key - PolyId对象或其JSON字符串
   * @returns 停靠数据数组，未找到则返回undefined
   */
  getData(key: PolyId | string): DockData[] | undefined;

  /**
   * 清空所有停靠数据
   */
  clear(): void;

  /**
   * 移除所有多重停靠数据（pos >= 0的数据）
   * 保留边缘停靠数据（pos = -1的数据）
   */
  removeMulData(): void;

  /**
   * 平移所有停靠点坐标
   * @param offset - 平移偏移量
   */
  translate(offset: Point): void;

  /**
   * 获取停靠边缘
   * @param targetId - 目标PolyId
   * @param context - 上下文对象
   * @returns 边缘或多重形状，未找到则返回undefined
   */
  getDockEdge(targetId: PolyId, context: Context): Edge | MulShape | undefined;

  /**
   * 获取停靠的两个条形对象
   * @param targetId - 目标PolyId
   * @param context - 上下文对象
   * @returns 两个条形对象的元组，未找到则返回[undefined, undefined]
   */
  getDockBars(targetId: PolyId, context: Context): [Bar | undefined, Bar | undefined];
}