/**
 * PatternBlock模块类型定义
 * 提供图案块(PatternBlock)及其IO序列化功能
 */

import { MixBlock, MixBlock_IO } from './MixBlock';
import { Entity } from './Entity';
import { MaterialData } from './Material';

/**
 * 点坐标接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 键值接口，用于标识PatternBlock的位置
 */
interface BlockKey {
  x: number;
  y: number;
}

/**
 * 序列化选项接口
 */
interface SerializationOptions {
  /** 版本号 */
  version?: string;
  /** 其他序列化相关配置 */
  [key: string]: unknown;
}

/**
 * 转储数据接口
 */
interface DumpData {
  /** 块的键值 */
  key: string | BlockKey;
  /** 本地ID */
  localId: string;
  /** 原始材质ID */
  originalMaterial?: string;
  /** 其他转储字段 */
  [key: string]: unknown;
}

/**
 * PatternBlock的IO序列化类
 * 负责PatternBlock的保存和加载
 */
export declare class PatternBlock_IO extends MixBlock_IO {
  private static _PatternBlock_IO_instance?: PatternBlock_IO;

  /**
   * 获取PatternBlock_IO的单例实例
   */
  static instance(): PatternBlock_IO;

  /**
   * 将PatternBlock序列化为数据对象
   * @param entity - 要序列化的PatternBlock实例
   * @param callback - 序列化完成后的回调函数
   * @param includeMetadata - 是否包含元数据，默认为true
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: PatternBlock,
    callback?: (data: DumpData[], entity: PatternBlock) => void,
    includeMetadata?: boolean,
    options?: SerializationOptions
  ): DumpData[];

  /**
   * 从数据对象加载PatternBlock
   * @param entity - 要加载数据的PatternBlock实例
   * @param data - 序列化的数据对象
   * @param options - 加载选项
   */
  load(
    entity: PatternBlock,
    data: DumpData,
    options?: SerializationOptions
  ): void;
}

/**
 * 图案块类
 * 表示图案网格中的一个可铺设材质的块
 */
export declare class PatternBlock extends MixBlock {
  private _key: string | BlockKey;
  private _localId: string;
  private _originalMaterial: MaterialData | null;
  private _anchorPointIndex?: number;
  private _absoluteMass?: number;

  /**
   * 块的键值，用于唯一标识块在网格中的位置
   */
  key: string | BlockKey;

  /**
   * 本地ID，用于块的局部标识
   */
  localId: string;

  /**
   * 原始材质
   * getter返回原始材质或当前材质（如果原始材质不存在）
   */
  originalMaterial: MaterialData;

  /**
   * 锚点索引
   */
  anchorPointIndex?: number;

  /**
   * 绝对质量
   */
  absoluteMass?: number;

  /**
   * 构造函数
   * @param key - 块的键值，默认为空字符串
   * @param localId - 本地ID
   */
  constructor(key?: string | BlockKey, localId?: string);

  /**
   * 创建PatternBlock实例
   * @param points - 块的顶点坐标数组
   * @param holes - 可选的孔洞数据
   * @returns 新创建的PatternBlock实例
   */
  static create(points: Point[], holes?: unknown): PatternBlock;

  /**
   * 获取字符串形式的键值
   * 格式: "{localId}-{x}-{y}"
   */
  get keyInString(): string;

  /**
   * 设置原始材质（内部方法）
   * @param material - 要设置的材质
   */
  private _setOriginalMaterial(material: MaterialData): void;

  /**
   * 获取IO序列化实例
   */
  getIO(): PatternBlock_IO;

  /**
   * 判断块是否属于网格的一部分
   */
  partOfGrid(): boolean;

  /**
   * 判断是否属于外部涂装
   */
  isPartOfExtPaint(): boolean;

  /**
   * 获取外部轮廓点
   * @returns 外部轮廓点数组
   */
  getOuterPoints(): Point[];

  /**
   * 从另一个块复制属性
   * @param source - 源PatternBlock实例
   */
  assignFrom(source: PatternBlock): void;

  /**
   * 设置材质
   * @param material - 要设置的材质
   * @param skipOriginal - 是否跳过设置原始材质，默认为false
   */
  setMaterial(material: MaterialData, skipOriginal?: boolean): void;

  /**
   * 从另一个块复制所有数据
   * @param source - 源PatternBlock实例
   */
  copyFrom(source: PatternBlock): void;

  /**
   * 克隆当前块
   * @returns 克隆的新实例
   */
  clone(): PatternBlock;

  /**
   * 获取所属的图案对象
   */
  getPattern(): unknown | null;

  /**
   * 获取当前材质
   */
  getMaterial(): MaterialData;
}