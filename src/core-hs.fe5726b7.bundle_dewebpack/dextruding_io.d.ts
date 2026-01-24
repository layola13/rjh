/**
 * 拉伸实体模块
 * 提供3D拉伸几何体的序列化/反序列化及核心功能
 * 
 * @module DExtruding_IO
 * @originalId 60787
 */

import type { Coordinate3 } from './Coordinate3';
import type { Content, Content_IO } from './Content';
import type { Entity } from './Entity';
import type { Material } from './Material';
import type { Segment2D, Segment3D } from './Geometry';
import type { EntityProxyTypeEnum } from './EntityProxy';

/**
 * 材质组件键常量
 */
declare const MATERIAL_COMPONENT_KEY: 'material';
declare const SIDE_MATERIAL_COMPONENT_KEY: 'sideMaterial';

/**
 * 3D点坐标
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D点坐标
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 孔洞路径信息
 */
export interface HoleInfo {
  /** 孔洞深度 */
  depth: number;
  /** 孔洞所在侧面 */
  side: string | number;
  /** 孔洞路径集合 */
  paths: Segment3D[];
}

/**
 * 带方向的孔洞路径信息
 */
export interface HolePathInfo {
  /** 2D路径段 */
  path: Segment2D[];
  /** 起始位置 */
  from: number;
  /** 结束位置 */
  to: number;
}

/**
 * 带坐标系的孔洞路径
 */
export interface HolePathsWithDirection {
  /** 路径信息数组 */
  pathsInfo: HolePathInfo[];
  /** 3D坐标系 */
  coordinate3: Coordinate3;
}

/**
 * 分段路径深度映射
 */
export interface SegmentPathsDepth {
  [key: string]: number;
}

/**
 * 序列化数据结构
 */
export interface DExtrudingDumpData {
  /** 拉伸轮廓点集 */
  points: Point3D[];
  /** 拉伸高度 */
  height: number;
  /** 是否被约束隐藏 */
  hiddenByConstrain: boolean;
  /** 定制内容类型 */
  customizationContentType: string[];
  /** 是否为功能组件 */
  isFunctionComponent: boolean;
  /** iModel父节点ID */
  imodelParentId?: string;
  /** 固定系数K */
  fixK?: number;
  /** 固定系数S */
  fixS?: number;
  /** 材质ID */
  materialId?: string;
  /** 本地ID */
  localId?: string;
  /** 拉伸方向向量 */
  direction?: [number, number, number];
  /** 分段路径 */
  segmentPaths?: Segment3D[][];
  /** 分段路径深度 */
  segmentPathsDepth?: SegmentPathsDepth;
  /** 孔洞信息 */
  holes?: HoleInfo[];
  /** 带方向的孔洞路径 */
  holePathsWithDirection?: {
    pathsInfo: Array<{
      path: Segment2D[];
      from: number;
      to: number;
    }>;
    coordinate3: Coordinate3;
  };
  /** 主模型ID */
  masterId?: string;
  /** 模型裁剪平面 */
  modelCutPlanes: Coordinate3[];
  /** 纹理类型 */
  textureType?: string;
  /** 侧面纹理类型 */
  sideTextureType?: string;
  /** 材质引用 */
  material?: string;
}

/**
 * 拉伸实体序列化/反序列化处理器
 * 负责DExtruding对象与JSON数据之间的转换
 */
export declare class DExtruding_IO extends Content_IO {
  /**
   * 将DExtruding实例序列化为JSON数据
   * 
   * @param entity - 要序列化的拉伸实体
   * @param callback - 序列化完成后的回调函数
   * @param includeChildren - 是否包含子对象
   * @param options - 额外选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: DExtruding,
    callback?: (data: any[], entity: DExtruding) => void,
    includeChildren?: boolean,
    options?: Record<string, any>
  ): DExtrudingDumpData[];

  /**
   * 从JSON数据反序列化为DExtruding实例
   * 
   * @param entity - 目标实体对象
   * @param data - 序列化数据
   * @param context - 加载上下文
   */
  load(
    entity: DExtruding,
    data: DExtrudingDumpData,
    context: any
  ): void;

  /**
   * 获取单例实例
   */
  static instance(): DExtruding_IO;
}

/**
 * 拉伸实体类
 * 表示通过2D轮廓沿指定方向拉伸生成的3D几何体
 * 支持孔洞、分段路径、裁剪平面等高级特性
 */
export declare class DExtruding extends Content {
  /**
   * 拉伸轮廓的3D点集
   * @private
   */
  private __points: Point3D[];

  /**
   * 拉伸高度（米）
   * @private
   */
  private __height: number;

  /**
   * 是否被约束隐藏
   * @private
   */
  private __hiddenByConstrain: boolean;

  /**
   * 定制内容类型标签数组
   * @private
   */
  private __customizationContentType: string[];

  /**
   * 是否为功能组件
   * @private
   */
  private __isFunctionComponent: boolean;

  /**
   * 本地唯一标识符
   * @private
   */
  private __localId: string;

  /**
   * 分段路径集合（3D）
   * @private
   */
  private __segmentPaths: Segment3D[][];

  /**
   * 分段路径深度映射表
   * @private
   */
  private __segmentPathsDepth: SegmentPathsDepth;

  /**
   * 模型裁剪平面数组
   * @private
   */
  private __modelCutPlanes: Coordinate3[];

  /**
   * 顶面纹理类型
   * @private
   */
  private __textureType?: string;

  /**
   * 侧面纹理类型
   * @private
   */
  private __sideTextureType?: string;

  /**
   * 拉伸方向单位向量（默认Z轴正向）
   * @private
   */
  private __direction: Point3D;

  /**
   * 孔洞信息数组
   * @private
   */
  private __holes?: HoleInfo[];

  /**
   * 带坐标系的孔洞路径
   * @private
   */
  private __holePathsWithDirection?: HolePathsWithDirection;

  /**
   * iModel父节点ID
   * @private
   */
  private __imodelParentId?: string;

  /**
   * 固定系数K
   * @private
   */
  private __fixK?: number;

  /**
   * 固定系数S
   * @private
   */
  private __fixS?: number;

  /**
   * 材质ID引用
   * @private
   */
  private __materialId?: string;

  /**
   * 主模型ID
   * @private
   */
  private __masterId?: string;

  /**
   * 按组件存储的材质映射
   * @private
   */
  private _materialByComponent: Map<string, Material>;

  /**
   * 创建拉伸实体实例
   * 
   * @param id - 实体唯一标识
   * @param metadata - 元数据
   */
  constructor(id?: string, metadata?: any);

  /**
   * 工厂方法：根据元数据创建实例
   * 
   * @param metadata - 包含contentType的元数据
   * @returns 新创建的实例或null
   */
  static create(metadata: any): DExtruding | null;

  /**
   * 获取拉伸轮廓点集
   */
  get points(): Point3D[];
  set points(value: Point3D[]);

  /**
   * 获取拉伸高度
   */
  get height(): number;
  set height(value: number);

  /**
   * 获取约束隐藏状态
   */
  get hiddenByConstrain(): boolean;
  set hiddenByConstrain(value: boolean);

  /**
   * 获取定制内容类型
   */
  get customizationContentType(): string[];
  set customizationContentType(value: string[]);

  /**
   * 获取功能组件标识
   */
  get isFunctionComponent(): boolean;
  set isFunctionComponent(value: boolean);

  /**
   * 获取iModel父节点ID
   */
  get imodelParentId(): string | undefined;
  set imodelParentId(value: string | undefined);

  /**
   * 获取固定系数K
   */
  get fixK(): number | undefined;
  set fixK(value: number | undefined);

  /**
   * 获取固定系数S
   */
  get fixS(): number | undefined;
  set fixS(value: number | undefined);

  /**
   * 获取材质ID
   */
  get materialId(): string | undefined;
  set materialId(value: string | undefined);

  /**
   * 获取本地ID
   */
  get localId(): string;
  set localId(value: string);

  /**
   * 获取拉伸方向
   */
  get direction(): Point3D;
  set direction(value: Point3D);

  /**
   * 获取主模型ID
   */
  get masterId(): string | undefined;
  set masterId(value: string | undefined);

  /**
   * 获取分段路径
   */
  get segmentPaths(): Segment3D[][];
  set segmentPaths(value: Segment3D[][]);

  /**
   * 获取分段路径深度
   */
  get segmentPathsDepth(): SegmentPathsDepth;
  set segmentPathsDepth(value: SegmentPathsDepth);

  /**
   * 获取孔洞信息
   */
  get holes(): HoleInfo[] | undefined;
  set holes(value: HoleInfo[] | undefined);

  /**
   * 获取带方向的孔洞路径
   */
  get holePathsWithDirection(): HolePathsWithDirection | undefined;
  set holePathsWithDirection(value: HolePathsWithDirection | undefined);

  /**
   * 获取裁剪平面
   */
  get modelCutPlanes(): Coordinate3[];
  set modelCutPlanes(value: Coordinate3[]);

  /**
   * 获取纹理类型
   */
  get textureType(): string | undefined;
  set textureType(value: string | undefined);

  /**
   * 获取侧面纹理类型
   */
  get sideTextureType(): string | undefined;
  set sideTextureType(value: string | undefined);

  /**
   * 判断是否需要裁剪
   */
  get needClip(): boolean;

  /**
   * 获取主材质（顶面/底面）
   */
  get material(): Material;
  set material(value: Material);

  /**
   * 获取侧面材质
   */
  get sideMaterial(): Material | undefined;
  set sideMaterial(value: Material | undefined);

  /**
   * 设置指定组件的材质
   * 
   * @param componentOrMaterial - 组件键或材质对象
   * @param material - 材质对象（当第一个参数为组件键时）
   */
  setMaterial(componentOrMaterial: string | Material, material?: Material): void;

  /**
   * 设置拉伸方向
   * 
   * @param direction - 方向向量（会自动归一化）
   */
  setDirection(direction: Point3D): void;

  /**
   * 获取所有路径（优先返回分段路径）
   * 
   * @returns 路径点集数组
   */
  getPaths(): Point3D[][];

  /**
   * 获取带方向的孔洞路径（转换为世界坐标）
   * 
   * @returns 包含路径和坐标系的对象
   */
  getHolePathsWithDirection(): {
    paths: Array<{
      points: Point2D[];
      from: number;
      to: number;
    }>;
    coordinate3: Coordinate3;
  } | undefined;

  /**
   * 获取顶面路径（2D投影）
   * 
   * @returns 2D点集数组
   */
  getTopPaths(): Point2D[][];

  /**
   * 获取顶面路径（内部使用，包含世界坐标转换）
   * @private
   */
  private _getTopPaths(): Point2D[][];

  /**
   * 获取全局坐标系下的3D包围盒顶点
   */
  getGlobalBound3dPoints(): Point3D[];

  /**
   * 获取全局坐标系下的3D包围盒
   */
  getGlobalBoundingBox3d(): any;

  /**
   * 获取局部坐标系下的3D包围盒
   */
  getBoundingBox3d(): any;

  /**
   * 获取3D包围盒顶点
   */
  getBound3dPoints(): Point3D[];

  /**
   * 获取局部坐标系下的3D包围盒顶点
   */
  getLocalBound3dPoints(): Point3D[];

  /**
   * 获取局部坐标系下的3D包围盒
   */
  getLocalBoundBox3d(): any;

  /**
   * 递归标记几何体为脏（需要重新计算）
   */
  dirtyRecursive(): void;

  /**
   * 标记几何体为脏
   */
  dirtyGeometry(): void;

  /**
   * 当被添加到父节点时触发
   * 
   * @param parent - 父节点实体
   */
  onAddedToParent(parent: Entity): void;

  /**
   * 判断内容是否在指定循环中
   * 
   * @param loop - 循环对象
   * @param recursive - 是否递归检查
   */
  isContentInLoop(loop: any, recursive?: boolean): boolean;

  /**
   * 判断内容是否在指定房间中
   * 
   * @param room - 房间对象
   */
  isContentInRoom(room: any): boolean;

  /**
   * 获取序列化处理器实例
   */
  getIO(): DExtruding_IO;

  /**
   * 是否可以事务化字段变更
   */
  canTransactField(): boolean;

  /**
   * 获取唯一父节点（处理多父节点异常情况）
   */
  getUniqueParent(): Entity | undefined;

  /**
   * 获取代理类型ID
   */
  getProxyId(): EntityProxyTypeEnum;

  /**
   * 获取代理对象实例
   */
  getProxyObject(): any;
}