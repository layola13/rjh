/**
 * DWindow模块 - 门窗洞口实体定义
 * @module DWindow_IO
 */

import { DHole, DHole_IO } from './DHole';
import { Wall } from './Wall';
import { WindowSill, WindowSillSideType } from './WindowSill';
import { ParametricModel } from './ParametricModel';
import { Vec2 } from './Vec2';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { Logger } from './Logger';
import { Manager } from './Manager';
import { EntityProxyFactory } from './EntityProxyFactory';

/**
 * 窗台默认参数配置
 */
interface WindowSillParameters {
  /** 组件名称 */
  name: string;
  /** 组件类型 */
  type: string;
  /** 部件名称 */
  partName: string;
  /** 高度(米) */
  height: number;
  /** 混凝土高度(米) */
  concretHeight: number;
  /** 混凝土宽度(米) */
  concretWidth: number;
  /** 边缘轮廓配置 */
  edgeProfile: {
    /** SVG路径定义 */
    profile: string;
    /** X方向尺寸(米) */
    XSize: number;
    /** Y方向尺寸(米) */
    YSize: number;
  };
  /** 单位 */
  unit: string;
  /** 安装侧面 */
  side: string;
  /** 材质数据 */
  materialData: MaterialData;
}

/**
 * 材质数据接口
 */
interface MaterialData {
  /** 材质唯一标识符 */
  seekId: string;
  /** 纹理图片URI */
  textureURI: string;
  /** X方向平铺尺寸(米) */
  tileSize_x: number;
  /** Y方向平铺尺寸(米) */
  tileSize_y: number;
  /** X偏移 */
  offsetX: number;
  /** Y偏移 */
  offsetY: number;
  /** 是否X翻转 */
  flipX: boolean;
  /** 是否Y翻转 */
  flipY: boolean;
  /** 旋转角度 */
  rotation: number;
  /** 包裹方式 */
  wrap: number;
  /** 颜色值(RGB) */
  color: number;
  /** 接缝颜色(Hex) */
  seamColor: string;
  /** 接缝宽度 */
  seamWidth: number;
  /** 是否自定义 */
  isCustomized: boolean;
  /** UV一致性信息 */
  uvConsistentInfo: Record<string, unknown>;
  /** 是否支持接缝填充 */
  seamFillerSupported: boolean;
  /** 用户自定义数据 */
  userDefined: unknown;
  /** 默认纹理URI */
  defaultTextureURI: string;
}

/**
 * 部件信息映射
 */
interface PartsInfoMap {
  [partName: string]: ParametricModel | WindowSillParameters;
}

/**
 * 窗台轮廓信息
 */
interface SillInfo {
  /** 轮廓点集 */
  points: THREE.Vector2[];
  /** 内侧窗台点集 */
  innerSillPoints: THREE.Vector2[];
  /** 外侧窗台点集 */
  outerSillPoints: THREE.Vector2[];
  /** 双侧窗台点集 */
  doubleSillPoints: THREE.Vector2[];
  /** 标高 */
  elevation: number;
  /** 线脚索引 */
  moldingIndices: number[];
  /** 第二线脚索引 */
  secondMoldingIndices: number[];
  /** 外侧线脚索引 */
  outerMoldingIndices: number[];
  /** 线脚是否翻转 */
  moldingFlip: boolean;
}

/**
 * 边界信息
 */
interface BoundingInfo {
  /** 外轮廓 */
  outline: THREE.Vector2[];
  /** 内边界 */
  innerBound: THREE.Vector2[];
  /** 内侧点 */
  innerPoints: THREE.Vector2[];
  /** 外侧点 */
  outerPoints: THREE.Vector2[];
}

/**
 * 部件几何信息
 */
interface PartsInfo {
  /** 窗台信息 */
  Sill?: SillInfo;
  /** 边界信息 */
  boundings?: BoundingInfo;
}

/**
 * 序列化选项
 */
interface DumpOptions {
  /** 是否预览脏标记 */
  previewDirty?: boolean;
}

/**
 * 序列化数据
 */
interface WindowSerializedData {
  /** 窗框厚度(米) */
  thickness: number;
  /** 嵌入深度(米) */
  indent: number;
  /** 开启方向 */
  swing: number;
}

/**
 * DWindow输入输出处理器
 * 负责门窗实体的序列化与反序列化
 */
export declare class DWindow_IO extends DHole_IO {
  private static _DWindow_IO_instance?: DWindow_IO;

  /**
   * 获取单例实例
   */
  static instance(): DWindow_IO;

  /**
   * 序列化门窗实体
   * @param entity - 待序列化的门窗实体
   * @param callback - 序列化后的回调函数
   * @param includeChildren - 是否包含子实体
   * @param options - 序列化选项
   * @returns 序列化数据数组
   */
  dump(
    entity: DWindow,
    callback?: (data: unknown[], entity: DWindow) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * 反序列化门窗实体
   * @param entity - 目标实体
   * @param data - 序列化数据
   * @param context - 加载上下文
   */
  load(entity: DWindow, data: WindowSerializedData, context: unknown): void;
}

/**
 * 门窗洞口实体
 * 表示墙体上的门窗开口及其附属构件(如窗台)
 */
export declare class DWindow extends DHole {
  /** 嵌入深度(米) - 窗框相对墙体的嵌入距离 */
  private __indent: number;

  /** 窗框厚度(米) */
  private __thickness: number;

  /** 开启方向 (0=无, 1=左, 2=右等) */
  private __swing: number;

  /** 部件几何信息缓存 */
  private partsInfo?: PartsInfo;

  /** 边界脏标记 */
  private _boundDirty: boolean;

  constructor();

  /**
   * 嵌入深度属性(米)
   * 控制窗框相对墙体中线的偏移距离
   */
  indent: number;

  /**
   * 窗框厚度属性(米)
   * 设置时会自动调整indent为thickness/2
   */
  thickness: number;

  /**
   * 开启方向属性
   * 1或2时会反转嵌入方向向量
   */
  swing: number;

  /**
   * 获取嵌入方向的单位向量
   * @returns 垂直于墙体方向的二维向量
   */
  getIndentDirection(): Vec2;

  /**
   * 获取所有窗台子实体
   * @returns 窗台实体数组
   */
  getWindowSills(): WindowSill[];

  /**
   * 获取主窗台(应唯一)
   * @returns 窗台实体或null
   */
  getWindowSill(): WindowSill | null;

  /**
   * 添加窗台
   * 若已存在则显示,否则创建新窗台
   */
  addSill(): void;

  /**
   * 移除所有窗台
   */
  removeSill(): void;

  /**
   * 是否可添加窗台
   */
  canAddSill(): boolean;

  /**
   * 窗台是否可见
   */
  isShowSill(): boolean;

  /**
   * 获取窗台高度
   * @returns 高度值(米),无窗台时返回0
   */
  getSillHeight(): number;

  /**
   * 创建默认窗台实体
   * @returns 新建的窗台实体或null
   */
  createWindowSill(): WindowSill | null;

  /**
   * 获取嵌入偏移向量
   * @returns 从墙体中线到窗框的偏移向量
   */
  getIndentVector(): Vec2;

  /**
   * 设置厚度(内部方法)
   * @param value - 新厚度值
   */
  private _setThickness(value: number): void;

  /**
   * 字段变更回调
   * @param fieldName - 字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * 宿主墙体变更回调
   */
  onHostChanged(): void;

  /**
   * 获取窗台安装侧面
   * @returns 侧面类型枚举值
   */
  getWindowSillSide(): WindowSillSideType;

  /**
   * 构建部件几何信息
   * 计算窗台轮廓、线脚位置等
   * @param parts - 外部提供的部件参数数组
   * @param options - 构建选项
   */
  buildPartsInfo(parts?: WindowSillParameters[], options?: DumpOptions): void;

  /**
   * 获取IO处理器实例
   */
  getIO(): DWindow_IO;

  /**
   * 是否可对字段进行事务处理
   */
  canTransactField(): boolean;

  /**
   * 获取代理对象
   * @returns 实体代理对象或undefined
   */
  getProxyObject(): unknown;
}