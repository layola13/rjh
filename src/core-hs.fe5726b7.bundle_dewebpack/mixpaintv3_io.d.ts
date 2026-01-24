/**
 * MixPaintV3 模块类型定义
 * 提供混合绘制功能的核心类型和接口
 * @module MixPaintV3_IO
 */

import type { Entity, Entity_IO } from './Entity';
import type { MixHost } from './MixHost';
import type { FaceGroup } from './FaceGroup';
import type { MixSketch2d } from './MixSketch2d';
import type { MixPave } from './MixPave';
import type { Curve2d } from './Curve2d';
import type { Material } from './Material';
import type { PavingOption } from './PavingOption';
import type { Matrix } from './Matrix';
import type { Path } from './Path';
import type { Region } from './Region';
import type { Pattern } from './Pattern';

/**
 * 序列化上下文选项
 */
export interface SerializationOptions {
  [key: string]: unknown;
}

/**
 * 序列化后的MixPaintV3数据结构
 */
export interface SerializedMixPaintV3 {
  /** 宿主对象数据 */
  host: unknown;
  /** 面组数据 */
  faceGroup: unknown;
  [key: string]: unknown;
}

/**
 * 背景路径数据结构
 */
export interface BackgroundPathData {
  /** 外轮廓曲线数组 */
  outer?: Curve2d[];
  [key: string]: unknown;
}

/**
 * 清除选项
 */
export interface ClearOptions {
  /** 查找ID */
  seekId?: string;
}

/**
 * 绘制数据中的单个绘制项
 */
export interface PaintItem {
  /** 绘制项ID */
  id?: string;
  /** 路径数据 */
  path: unknown[];
  /** 内部路径 */
  innerPath: unknown[];
  /** 铺设选项 */
  pavingOption: PavingOption;
  /** 孔洞数组 */
  holes: unknown[];
  /** 材质数据 */
  material: unknown;
  /** 网格数据 */
  grid?: unknown;
  /** 图案数据 */
  pattern?: unknown;
  /** 左上角坐标 */
  leftTop: {
    x: number;
    y: number;
  };
}

/**
 * 完整的绘制数据结构
 */
export interface PaintData {
  /** 背景材质 */
  backgroundMaterial?: unknown;
  /** 绘制项数组 */
  paints: PaintItem[];
  /** 边界数组 */
  boundaries: unknown[];
  /** 背景数据 */
  background?: unknown[];
}

/**
 * 更新背景多边形返回的区域数据
 */
export interface UpdateRegionsResult {
  /** 区域列表 */
  regions: Region[];
  /** 独立区域列表 */
  independentRegions: Region[];
}

/**
 * MixPaintV3 IO处理类
 * 负责MixPaintV3实体的序列化和反序列化
 */
export declare class MixPaintV3_IO extends Entity_IO {
  private static _MixPaintV3_IO_instance?: MixPaintV3_IO;

  /**
   * 获取单例实例
   * @returns MixPaintV3_IO单例
   */
  static instance(): MixPaintV3_IO;

  /**
   * 将MixPaintV3实体序列化为JSON数据
   * @param entity - 要序列化的实体
   * @param callback - 序列化后的回调函数
   * @param includeMetadata - 是否包含元数据
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: MixPaintV3,
    callback?: (data: unknown[], entity: MixPaintV3) => void,
    includeMetadata?: boolean,
    options?: SerializationOptions
  ): unknown[];

  /**
   * 从JSON数据加载到MixPaintV3实体
   * @param entity - 目标实体
   * @param data - 序列化的数据
   * @param options - 加载选项
   */
  load(
    entity: MixPaintV3,
    data: SerializedMixPaintV3,
    options?: SerializationOptions
  ): void;
}

/**
 * MixPaintV3 核心实体类
 * 表示混合绘制的第三版本，管理2D草图、材质和面组
 */
export declare class MixPaintV3 extends Entity {
  private _host: MixHost;
  private _faceGroup: FaceGroup;
  private _dataVersion: number;
  private _sketch2d?: MixSketch2d;

  /**
   * 构造函数
   * @param id - 实体ID，默认为空字符串
   * @param parent - 父实体
   */
  constructor(id?: string, parent?: Entity);

  /**
   * 销毁实体，释放资源
   */
  destroy(): void;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): MixPaintV3_IO;

  /**
   * 判断是否为根实体
   * @returns 始终返回true
   */
  isRoot(): boolean;

  /**
   * 从另一个MixPaintV3实例复制数据
   * @param source - 源实例
   */
  copyFrom(source: MixPaintV3): void;

  /**
   * 获取宿主对象
   */
  get host(): MixHost;

  /**
   * 获取或设置面实体
   */
  get faceEntity(): unknown;
  set faceEntity(value: unknown);

  /**
   * 获取或设置面ID
   */
  get faceId(): string | number;
  set faceId(value: string | number);

  /**
   * 获取数据版本号（每次子元素变化时递增）
   */
  get dataVersion(): number;

  /**
   * 获取或设置背景材质
   */
  get backgroundMaterial(): Material;
  set backgroundMaterial(value: Material);

  /**
   * 获取2D草图对象（懒加载）
   */
  get sketch2d(): MixSketch2d;

  /**
   * 获取或设置混合铺设对象
   */
  get mixPave(): MixPave;
  set mixPave(value: MixPave);

  /**
   * 获取多边形数组（当前实现返回空数组）
   */
  get polygons(): unknown[];

  /**
   * 获取面组对象
   */
  get faceGroup(): FaceGroup;

  /**
   * 设置面组ID
   */
  set faceGroupId(value: string | number);

  /**
   * 获取面组ID
   */
  get faceGroupId(): string | number;

  /**
   * 获取所有面ID列表
   * @returns 面ID数组
   */
  getFaceIds(): (string | number)[];

  /**
   * 设置面组边界映射
   */
  set faceGroupBoundMap(value: unknown);

  /**
   * 获取面组边界映射
   */
  get faceGroupBoundMap(): unknown;

  /**
   * 清除面组数据
   */
  clearFaceGroup(): void;

  /**
   * 对实体应用变换矩阵
   * @param matrix - 变换矩阵
   */
  transform(matrix: Matrix): void;

  /**
   * 将背景与其他混合铺设合并
   * @param otherMixPaves - 其他混合铺设数组
   */
  mergeBackgroundWithOtherMixPaves(otherMixPaves: MixPave[]): void;

  /**
   * 更新背景多边形
   * @param target - 目标对象
   * @param param - 参数
   */
  updateBackgroundPolygon(target: unknown, param: unknown): void;

  /**
   * 设置背景数据
   * @param data - 背景路径数据
   * @param param - 额外参数
   */
  setBackgroundData(data: BackgroundPathData, param: unknown): void;

  /**
   * 获取背景路径
   * @returns 合并后的背景路径，如果有多个区域则返回联合结果
   */
  getBackgroundPath(): Path | undefined;

  /**
   * 获取背景外轮廓
   * @returns 外轮廓数据
   */
  getBackgroundOuter(): unknown;

  /**
   * 清除绘制数据，重置为默认背景
   * @param options - 清除选项
   */
  clear(options?: ClearOptions): void;

  /**
   * 验证子实体类型是否有效
   * @param child - 子实体
   * @returns 是否有效（仅接受MixSketch2d类型）
   */
  isValidChild(child: Entity): boolean;

  /**
   * 子实体添加时的回调
   * @param child - 被添加的子实体
   */
  protected onChildAdded(child: Entity): void;

  /**
   * 子实体移除时的回调
   * @param child - 被移除的子实体
   * @param cleanup - 是否清理
   */
  protected onChildRemoved(child: Entity, cleanup?: boolean): void;

  /**
   * 子实体脏标记时的回调
   * @param child - 脏标记的子实体
   * @param dirtyInfo - 脏标记信息
   */
  protected onChildDirty(child: Entity, dirtyInfo: { type: string }): void;

  /**
   * 获取绘制数据
   * @param useFGIFormat - 是否使用FGI格式
   * @returns 完整的绘制数据结构
   */
  getPaintData(useFGIFormat?: boolean): PaintData;

  /**
   * 加载迁移数据
   * @param data - 迁移数据
   * @param param - 额外参数
   */
  loadMigrationData(data: unknown, param: unknown): void;

  /**
   * 获取水刀瓷砖数组（当前实现返回空数组）
   */
  get waterJetTiles(): unknown[];
}