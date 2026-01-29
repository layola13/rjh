/**
 * Module: WaterJetTile_IO
 * 水刀拼花瓷砖模块，用于处理自定义形状的瓷砖对象
 */

import { Content_IO, Content } from './Content';
import { EntityUtil } from './EntityUtil';
import { SVGUtil, Math as MathUtil, PaintMaterial } from '../utils/Util';
import { EntityField } from './EntityField';
import { Logger } from './Logger';

/**
 * 位置信息接口
 */
export interface Position {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 材质信息接口
 */
export interface MaterialInfo {
  /** 瓷砖 X 方向尺寸（米） */
  tileSize_x: number;
  /** 瓷砖 Y 方向尺寸（米） */
  tileSize_y: number;
  /** 纹理资源 URI */
  textureURI: string;
  /** X 方向是否翻转 */
  flipX: boolean;
  /** Y 方向是否翻转 */
  flipY: boolean;
  /** 材质检索 ID */
  seekId: string;
}

/**
 * 不透明度遮罩图像信息接口
 */
export interface OpacityMaskImage {
  /** 纹理 ID */
  textureId?: string;
  /** 纹理 URL */
  textureUrl?: string;
}

/**
 * 接缝信息接口
 */
export interface SeamInfo {
  /** 接缝颜色（十六进制） */
  seamColor: number;
  /** 接缝宽度（米） */
  seamWidth: number;
}

/**
 * 模板参数接口
 */
export interface TemplateParams {
  /** X 方向是否翻转 */
  flipX?: boolean;
  /** Y 方向是否翻转 */
  flipY?: boolean;
}

/**
 * 面数据接口
 */
export interface FaceData {
  /** 面 ID */
  id: string;
  /** SVG 路径数据 */
  path: string;
}

/**
 * 内部面数据接口（带材质）
 */
export interface InnerFaceData extends FaceData {
  /** 面的材质信息 */
  material: MaterialInfo;
}

/**
 * 模板结构接口
 */
export interface Template {
  /** 外部轮廓面数组 */
  outterFaces: FaceData[];
  /** 内部装饰面数组 */
  innerFaces: FaceData[];
}

/**
 * 模板数据接口
 */
export interface TemplateData {
  /** 模板结构定义 */
  template: Template;
  /** 材质映射表（key 为面 ID） */
  materials: Record<string, MaterialInfo>;
  /** 模板参数 */
  params?: TemplateParams;
  /** 接缝信息 */
  seamInfo?: SeamInfo;
}

/**
 * 覆盖的模板信息接口（用于序列化差异数据）
 */
export interface OverriddenTemplateInfo {
  /** 覆盖的材质映射 */
  materials?: Record<string, MaterialInfo>;
  /** 覆盖的参数 */
  params?: TemplateParams;
  /** 覆盖的接缝信息 */
  seamInfo?: SeamInfo;
}

/**
 * 铺贴选项接口
 */
export interface PavingOption {
  /** 起始点坐标 */
  point: Position;
  /** 旋转角度（度） */
  rotation: number;
  /** X 方向瓷砖尺寸 */
  tileSize_x: number;
  /** Y 方向瓷砖尺寸 */
  tileSize_y: number;
  /** X 方向缩放比例 */
  XScale: number;
  /** Y 方向缩放比例 */
  YScale: number;
  /** 中心点位置 */
  center: Position;
}

/**
 * 序列化上下文接口
 */
export interface DumpContext {
  /** 实体数据映射 */
  data?: Record<string, unknown>;
  /** 状态数据 */
  states?: Record<string, unknown>;
  /** 实体映射 */
  entities?: Record<string, unknown>;
  /** 约束映射 */
  constraints?: Record<string, unknown>;
  /** 产品映射 */
  productsMap?: Map<string, unknown>;
  /** ID 生成器 */
  idGenerator?: unknown;
  /** 材质数据映射 */
  materialsData?: Map<string, unknown>;
  /** 版本号 */
  version?: string;
}

/**
 * 序列化数据接口
 */
export interface WaterJetTileDumpData {
  /** 实体 ID */
  id: string;
  /** 位置信息 */
  position: Position;
  /** 材质信息 */
  material: MaterialInfo;
  /** 模板覆盖信息 */
  templateInfo: OverriddenTemplateInfo;
  /** 不透明度遮罩图像 */
  opacityMaskImage?: OpacityMaskImage;
  /** 接缝颜色（已废弃，用于向后兼容） */
  seamColor?: number;
  /** 接缝宽度（已废弃，用于向后兼容） */
  seamWidth?: number;
}

/**
 * 水刀拼花瓷砖序列化/反序列化处理器
 * 负责 WaterJetTile 对象的持久化和恢复
 */
export declare class WaterJetTile_IO extends Content_IO {
  /** 单例实例 */
  private static _WaterJetTile_IO_instance?: WaterJetTile_IO;

  /**
   * 获取单例实例
   */
  static instance(): WaterJetTile_IO;

  /**
   * 序列化水刀拼花瓷砖对象
   * @param entity - 待序列化的瓷砖实体
   * @param callback - 序列化后的回调函数
   * @param includeMetadata - 是否包含元数据
   * @param context - 序列化上下文
   * @returns 序列化后的数据数组
   */
  dump(
    entity: WaterJetTile,
    callback?: (data: unknown[], entity: WaterJetTile) => void,
    includeMetadata?: boolean,
    context?: DumpContext
  ): WaterJetTileDumpData[];

  /**
   * 反序列化水刀拼花瓷砖对象
   * @param entity - 目标实体对象
   * @param data - 序列化数据
   * @param context - 反序列化上下文
   */
  load(
    entity: WaterJetTile,
    data: WaterJetTileDumpData,
    context?: DumpContext
  ): void;
}

/**
 * 水刀拼花瓷砖实体类
 * 表示具有自定义形状和多材质区域的瓷砖对象
 */
export declare class WaterJetTile extends Content {
  /** 瓷砖位置（世界坐标） */
  private __position: Position;
  
  /** Z 方向厚度 */
  private __ZLength: number;
  
  /** 模板数据 */
  private __templateData?: TemplateData;
  
  /** 不透明度遮罩图像 */
  private __opacityMaskImage?: OpacityMaskImage;
  
  /** 外部轮廓路径缓存 */
  private __outerFaces: string[];
  
  /** 内部面数据缓存 */
  private __innerFaces: InnerFaceData[];
  
  /** 内部面数据是否需要重新计算 */
  private __innerFacesDirty: boolean;
  
  /** 外部轮廓点集缓存 */
  private __outerPoints: Position[][];
  
  /** 外部轮廓点集是否需要重新计算 */
  private __outerPointsDirty: boolean;
  
  /** 内部包围盒缓存 [minX, minY, maxX, maxY] */
  private __internalBound?: [number, number, number, number];
  
  /** 材质信息 */
  private __material: MaterialInfo;

  /**
   * 构造函数
   * @param tag - 实体标签
   * @param host - 宿主对象
   */
  constructor(tag?: string, host?: unknown);

  /**
   * 创建水刀拼花瓷砖实例（工厂方法）
   * @param metadata - 元数据对象
   * @param templateData - 模板数据（可选）
   * @param position - 初始位置
   * @returns 新创建的瓷砖实例
   */
  static create_(
    metadata: unknown,
    templateData: TemplateData | undefined,
    position: Position
  ): WaterJetTile;

  /**
   * 静态工厂方法（外部调用入口）
   */
  static create: typeof WaterJetTile.create_;

  /**
   * 设置默认尺寸（缩放比例重置为 1）
   */
  setDefaultSize(): void;

  /**
   * 获取瓷砖 X 方向实际尺寸（考虑缩放）
   */
  get tileSizeX(): number;

  /**
   * 设置瓷砖 X 方向实际尺寸
   */
  set tileSizeX(value: number);

  /**
   * 获取瓷砖 Y 方向实际尺寸（考虑缩放）
   */
  get tileSizeY(): number;

  /**
   * 设置瓷砖 Y 方向实际尺寸
   */
  set tileSizeY(value: number);

  /**
   * 获取旋转角度（度）
   */
  get rotation(): number;

  /**
   * 设置旋转角度（度）
   */
  set rotation(value: number);

  /**
   * 获取纹理 URI
   */
  get textureURI(): string;

  /**
   * 设置纹理 URI
   */
  set textureURI(value: string);

  /**
   * 获取不透明度遮罩图像
   */
  get opacityMaskImage(): OpacityMaskImage | undefined;

  /**
   * 设置不透明度遮罩图像
   */
  set opacityMaskImage(value: OpacityMaskImage | undefined);

  /**
   * 检查是否存在有效的不透明度遮罩图像
   */
  hasOpacityMaskImage(): boolean;

  /**
   * 获取被覆盖的模板信息（仅包含修改过的部分）
   * @returns 差异化的模板信息
   */
  getOverriddenTemplateInfo(): OverriddenTemplateInfo;

  /**
   * 从覆盖信息恢复完整的模板数据
   * @param overriddenInfo - 覆盖的模板信息
   * @returns 完整的模板数据
   */
  restoreTemplateData(overriddenInfo?: OverriddenTemplateInfo): TemplateData;

  /**
   * 获取序列化处理器
   */
  getIO(): WaterJetTile_IO;

  /**
   * 迁移内容元数据（更新元数据时保留自定义修改）
   * @param newMetadata - 新的元数据
   */
  migrateContentMetaData(newMetadata: unknown): void;

  /**
   * 获取元数据过滤键集合（序列化时需要排除的字段）
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * 克隆当前瓷砖对象
   */
  clone(): WaterJetTile;

  /**
   * 获取克隆所需的序列化数据
   */
  getClonedDumpData(): {
    dumps: WaterJetTileDumpData[];
    context: DumpContext;
  };

  /**
   * 克隆属性（深拷贝处理）
   * @param data - 序列化数据
   */
  protected _getClonedProperties(data: WaterJetTileDumpData): void;

  /**
   * 更新模板数据和纹理
   * @param templateData - 新的模板数据
   * @param textureURI - 新的纹理 URI
   */
  updateTemplateData(templateData: TemplateData, textureURI: string): void;

  /**
   * 模板数据变更时的内部处理
   */
  protected _onTemplateDataChanged(): void;

  /**
   * 解析外部轮廓路径
   */
  protected _parseOuterFaces(): void;

  /**
   * 获取内部装饰面数据
   */
  getInnerFaces(): InnerFaceData[];

  /**
   * 解析内部装饰面数据
   */
  protected _parseInnerFaces(): void;

  /**
   * 获取外部轮廓 SVG 路径数组
   */
  getOuterPaths(): string[];

  /**
   * 获取外部轮廓点集（世界坐标）
   */
  getOuterPoints(): Position[][];

  /**
   * 计算外部轮廓点集
   */
  protected _calculateOuterPoints(): void;

  /**
   * 获取内部包围盒（局部坐标系）
   */
  getInternalBound(): [number, number, number, number];

  /**
   * 计算内部包围盒
   */
  protected _calculateInternalBound(): void;

  /**
   * 获取局部坐标变换矩阵（包含位置、旋转、缩放）
   */
  getLocalMatrix(): THREE.Matrix3;

  /**
   * 获取铺贴选项（用于瓷砖铺设算法）
   */
  getPavingOption(): PavingOption;

  /**
   * 调整尺寸
   * @param scaleX - X 方向缩放因子
   * @param scaleY - Y 方向缩放因子
   * @param scaleZ - Z 方向缩放因子
   */
  resize(scaleX: number, scaleY: number, scaleZ: number): void;

  /**
   * 字段变更回调
   * @param fieldName - 字段名称
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * 更新材质信息
   */
  private __updateMaterial(): void;

  /**
   * 销毁对象并释放资源
   */
  destroy(): void;

  /**
   * 瓷砖位置属性（带装饰器）
   */
  position: Position;

  /**
   * 材质信息属性（带装饰器）
   */
  material: MaterialInfo;

  /**
   * 模板数据属性（带装饰器）
   */
  templateData: TemplateData;

  /**
   * 注册类到模型系统
   */
  static registerClass(modelClass: string, constructor: typeof WaterJetTile): void;
}