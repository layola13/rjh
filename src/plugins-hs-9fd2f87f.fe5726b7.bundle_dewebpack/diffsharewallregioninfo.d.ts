/**
 * 墙体区域差异类型枚举
 * 用于标识墙体区域的变更程度
 */
export enum WallRegionDiffType {
  /** 无变更 */
  none = 0,
  /** 部分变更 */
  part = 1,
  /** 全部变更 */
  all = 2
}

/**
 * 墙体差异信息接口
 * 描述单个墙体的变更信息
 */
export interface WallDiffInfo {
  /** 墙体ID */
  wallId: string;
  /** 差异类型 */
  diffType: WallRegionDiffType;
}

/**
 * 墙体区域接口
 * 描述墙体区域的基本属性
 */
export interface WallRegion {
  /** 区域唯一标识符 */
  id: string;
}

/**
 * 差异共享墙体区域信息类
 * 用于管理和追踪墙体区域的变更信息
 */
export declare class DiffShareWallRegionInfo {
  private readonly _wallRegion: WallRegion;
  private _diffInfo: WallDiffInfo[];

  /**
   * 构造函数
   * @param wallRegion - 墙体区域对象
   */
  constructor(wallRegion: WallRegion);

  /**
   * 获取差异区域ID
   * @returns 区域唯一标识符
   */
  getDiffRegionId(): string;

  /**
   * 添加差异信息
   * @param wallId - 墙体ID
   * @param diffType - 差异类型
   */
  addDiffInfo(wallId: string, diffType: WallRegionDiffType): void;

  /**
   * 对差异信息进行排序
   * 排序规则：优先按差异类型升序，类型相同则按墙体ID数值升序
   */
  sortDiffInfo(): void;

  /**
   * 获取第一个墙体差异信息
   * @returns 第一个墙体差异信息，如果列表为空则返回undefined
   */
  getFirstWallInfo(): WallDiffInfo | undefined;
}