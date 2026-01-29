/**
 * 普通窗户模块类型定义
 * @module PordinaryWindow
 */

import { Entity, EntityField } from './Entity';
import { ParametricWindow, ParametricWindow_IO } from './ParametricWindow';
import { CornerWindow } from './CornerWindow';
import { Wall } from './Wall';
import { WindowSillSideType } from './WindowSill';
import { PocketSideType } from './WindowPocket';
import { EntityFlagEnum } from './EntityFlag';
import { ModelClass } from './Constants';

/**
 * 窗户边数据结构
 */
interface WindowSideData {
  /** 内侧起点 */
  from: THREE.Vector2;
  /** 内侧终点 */
  to: THREE.Vector2;
  /** 框架宽度 */
  width: number;
  /** 是否翻转 */
  flipped: boolean;
  /** 旋转角度 */
  rotation: number;
  /** 框架数据 */
  frame?: {
    width: number;
    thickness: number;
  };
}

/**
 * 窗台部分信息
 */
interface WindowSillPartInfo {
  /** 主要点集 */
  points: THREE.Vector2[];
  /** 内侧窗台点集 */
  innerSillPoints: THREE.Vector2[];
  /** 外侧窗台点集 */
  outerSillPoints: THREE.Vector2[];
  /** 双侧窗台点集 */
  doubleSillPoints: THREE.Vector2[];
  /** 抬升高度 */
  elevation: number;
  /** 造型索引 */
  moldingIndices: number[];
  /** 第二造型索引 */
  secondMoldingIndices: number[];
  /** 外侧造型索引 */
  outerMoldingIndices: number[];
  /** 造型是否翻转 */
  moldingFlip: boolean;
  /** 窗台高度 */
  height?: number;
}

/**
 * 窗户口袋部分信息
 */
interface WindowPocketPartInfo {
  /** 造型路径 */
  moldingPaths: THREE.Vector3[][];
  /** 内侧造型路径 */
  innerMoldingPaths: THREE.Vector3[][];
  /** 外侧造型路径 */
  outerMoldingPaths: THREE.Vector3[][];
  /** 带相邻元素的造型路径 */
  moldingPathsWithNeighbours: THREE.Vector3[][];
  /** 内部路径 */
  insidePaths: THREE.Vector3[][];
  /** 内侧主体路径 */
  innerBodyPaths: THREE.Vector3[][];
  /** 外侧主体路径 */
  outerBodyPaths: THREE.Vector3[][];
  /** 轮廓数据 */
  profileData?: {
    profileSizeX: number;
    profileSizeY: number;
  };
}

/**
 * 窗户开口信息
 */
interface WindowOpeningInfo {
  /** 内侧起点 */
  innerFrom: THREE.Vector2;
  /** 内侧终点 */
  innerTo: THREE.Vector2;
  /** 外侧起点 */
  outerFrom: THREE.Vector2;
  /** 外侧终点 */
  outerTo: THREE.Vector2;
  /** 侧面是否需要填充 */
  toSideNeedFill: boolean;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** 抬升高度 */
  elevation: number;
  /** 高度 */
  height: number;
}

/**
 * 边界信息
 */
interface BoundingInfo {
  /** 外轮廓 */
  outline: THREE.Vector2[];
  /** 内边界 */
  innerBound: THREE.Vector2[];
  /** 内侧点集 */
  innerPoints: THREE.Vector2[];
  /** 外侧点集 */
  outerPoints: THREE.Vector2[];
}

/**
 * 窗户各部分信息集合
 */
interface WindowPartsInfo {
  /** B边数据 */
  B?: WindowSideData;
  /** 窗台信息 */
  Sill?: WindowSillPartInfo;
  /** 天花板信息 */
  Ceiling?: unknown;
  /** 口袋信息 */
  Pocket?: WindowPocketPartInfo;
  /** B边开口信息 */
  openingB?: WindowOpeningInfo;
  /** 边界信息 */
  boundings?: BoundingInfo;
}

/**
 * 窗户参数配置
 */
interface WindowParameters {
  /** 厚度 */
  thickness?: number;
  /** 缩进距离 */
  indent?: number;
  /** 是否显示窗台 */
  showSill?: boolean;
  /** 是否显示口袋 */
  showPocket?: boolean;
  /** 抬升高度 */
  elevation?: number;
  /** 高度 */
  height?: number;
  /** B边长度 */
  sideB?: number;
  /** 部件名称 */
  partName?: string;
}

/**
 * 顶部投影数据
 */
interface TopProjectionData {
  /** 外轮廓路径 */
  outPath?: THREE.Vector2[];
  /** 中间路径1 */
  middle1Path?: THREE.Vector2[];
  /** 中间路径2 */
  middle2Path?: THREE.Vector2[];
}

/**
 * 边长度范围数据
 */
interface SideRangeData {
  /** B边范围 */
  sideBRange: {
    /** 最小值 */
    min: number;
    /** 最大值 */
    max: number;
  };
}

/**
 * 子模型创建配置
 */
interface ChildModelConfig {
  /** 模型类型 */
  type: string;
  /** 部件名称 */
  partName: string;
}

/**
 * 版本信息
 */
interface VersionInfo {
  /** 版本号 */
  version: string;
}

/**
 * 构建选项
 */
interface BuildOptions {
  /** 预览脏标记 */
  previewDirty?: boolean;
}

/**
 * 普通窗户IO处理类
 * 负责窗户数据的加载和版本兼容性处理
 */
export declare class PordinaryWindow_IO extends ParametricWindow_IO {
  /**
   * 加载后处理
   * 处理版本升级时的参数迁移
   * @param entity - 窗户实体
   * @param versionInfo - 版本信息
   */
  postLoad(entity: PordinaryWindow, versionInfo: VersionInfo): void;

  /**
   * 获取单例实例
   */
  static instance(): PordinaryWindow_IO;
}

/**
 * 普通窗户类
 * 继承自转角窗户，提供标准窗户的完整功能
 */
export declare class PordinaryWindow extends CornerWindow {
  /** 窗户参数配置 */
  @EntityField()
  private __parameters: WindowParameters;

  /** 窗户各部分信息 */
  partsInfo: WindowPartsInfo;

  /** Z轴长度缓存 */
  private __ZLength: number;

  /** X轴长度缓存 */
  private __XLength: number;

  /** Y轴长度缓存 */
  private __YLength: number;

  /** Z轴旋转角度 */
  private __ZRotation: number;

  /** 边界脏标记 */
  private _boundDirty: boolean;

  /**
   * 构造函数
   * @param tag - 实体标签
   * @param parameters - 初始参数
   */
  constructor(tag?: string, parameters?: WindowParameters);

  /**
   * 创建窗户实例
   * @param meta - 元数据配置
   * @returns 新创建的窗户实例
   */
  static create(meta?: unknown): PordinaryWindow;

  /**
   * 是否显示窗台
   */
  get showSill(): boolean;

  /**
   * 窗户厚度
   * 设置时会自动调整缩进距离
   */
  @EntityField()
  thickness: number;

  /**
   * 获取窗框厚度
   * @returns 第一个窗框的厚度，无窗框时返回0
   */
  getFrameThickness(): number;

  /**
   * 获取窗台侧面类型
   * @returns 窗台侧面类型（内侧/外侧/双侧）
   */
  getWindowSillSide(): WindowSillSideType;

  /**
   * 获取窗户口袋侧面类型
   * @returns 口袋侧面类型（内侧/外侧/双侧）
   */
  getWindowPocketSide(): PocketSideType;

  /**
   * 构建窗户各部分信息
   * 计算窗框、窗台、口袋等所有部件的几何数据
   * @param previousPartsInfo - 之前的部件信息（用于对比）
   * @param options - 构建选项
   */
  buildPartsInfo(previousPartsInfo?: WindowPartsInfo, options?: BuildOptions): void;

  /**
   * 调整附加内容
   * 根据部件信息变化调整附加元素的位置和旋转
   * @param oldPartsInfo - 旧的部件信息
   * @param newPartsInfo - 新的部件信息
   */
  private _adjustAttachedContents(
    oldPartsInfo: WindowPartsInfo,
    newPartsInfo: WindowPartsInfo
  ): void;

  /**
   * 验证宿主是否有效
   * @param host - 宿主实体
   * @returns 是否为有效的飘窗宿主
   */
  isValidHost(host: Entity): boolean;

  /**
   * 添加开口到宿主墙体
   * 将窗户的开口信息应用到墙体上
   */
  addOpenings(): void;

  /**
   * 字段变化回调
   * @param fieldName - 变化的字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * 获取顶部投影数据
   * 用于2D平面图显示
   * @returns 投影数据包含外轮廓和中间线
   */
  getTopProjection(): TopProjectionData;

  /**
   * 获取边长度范围数据
   * @returns B边的最小最大长度限制
   */
  getSideRangeData(): SideRangeData;

  /**
   * 创建子模型
   * @param configs - 子模型配置数组
   * @returns 创建的子模型数组
   */
  createChildModels(configs: ChildModelConfig[]): Entity[];

  /**
   * 验证窗户数据有效性
   * @returns 数据是否有效
   */
  verify(): boolean;

  /**
   * 轮廓是否使用宿主的绝对位置
   * @returns 始终返回false
   */
  protected _isOutlineWithHostAbsolutePosition(): boolean;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): PordinaryWindow_IO;

  /**
   * 初始化部件信息
   * @param previousPartsInfo - 之前的部件信息
   * @returns 初始化后的部件信息
   */
  protected _initPartsInfo(previousPartsInfo?: WindowPartsInfo): WindowPartsInfo;

  /**
   * 构造边数据
   * @param innerFrom - 内侧起点
   * @param innerTo - 内侧终点
   * @param outerFrom - 外侧起点
   * @param outerTo - 外侧终点
   * @param frameWidth - 框架宽度
   * @param flipped - 是否翻转
   * @param rotation - 旋转角度
   * @returns 边数据结构
   */
  protected _constructSideData(
    innerFrom: THREE.Vector2,
    innerTo: THREE.Vector2,
    outerFrom: THREE.Vector2,
    outerTo: THREE.Vector2,
    frameWidth: number,
    flipped: boolean,
    rotation: number
  ): WindowSideData;

  /**
   * 创建子模型（内部实现）
   * @param entity - 父实体
   * @param configs - 配置数组
   * @returns 子模型数组
   */
  protected _createChildModels(
    entity: Entity,
    configs: ChildModelConfig[]
  ): Entity[];

  /**
   * 获取中间点（静态工具方法）
   * @param innerPoints - 内侧点集
   * @param outerPoints - 外侧点集
   * @returns 中间点数据
   */
  protected static _getMiddlePoints(
    innerPoints: THREE.Vector2[],
    outerPoints: THREE.Vector2[]
  ): {
    point1: THREE.Vector2[];
    point2: THREE.Vector2[];
  };
}