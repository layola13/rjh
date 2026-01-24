/**
 * Region模块类型定义
 * 表示一个区域实体，包含边界、网格、布局等信息
 */

import { Shape, Shape_IO } from './Shape';
import { Entity } from './Entity';
import { Layout, Layout_IO } from './Layout';
import { MixGrid } from './MixGrid';
import { PatternGrid } from './PatternGrid';
import { Boundary } from './Boundary';
import { Pattern } from './Pattern';
import { Material } from './Material';
import { EntityEventType } from './EntityEvent';
import { FieldValueType } from './FieldValueType';

/**
 * 几何多边形定义
 * 包含外轮廓和内孔
 */
export interface GeomPolygon {
  /** 外轮廓点集 */
  outer: HSCore.Math.Point2d[];
  /** 内孔点集数组 */
  holes: HSCore.Math.Point2d[][];
}

/**
 * 克隆数据上下文
 */
export interface CloneContext {
  /** 实体数据映射 */
  data: Record<string, unknown>;
  /** 材质数据映射 */
  materialsData: Map<string, Material>;
  /** 状态数据 */
  states: Record<string, unknown>;
  /** 约束数据 */
  constraints: Record<string, unknown>;
  /** 实体集合 */
  entities: Record<string, Entity>;
  /** 材质映射 */
  materials: Map<string, Material>;
  /** 产品映射 */
  productsMap: Map<string, unknown>;
  /** ID生成器 */
  idGenerator: HSCore.Util.IDGenerator;
  /** 选项配置 */
  options: {
    /** 是否忽略图案 */
    ignorePattern: boolean;
  };
}

/**
 * 克隆转储数据结果
 */
export interface ClonedDumpData {
  /** 转储数据数组 */
  dumps: RegionDumpData[];
  /** 克隆上下文 */
  context: CloneContext;
}

/**
 * 区域转储数据结构
 */
export interface RegionDumpData {
  /** 实体ID */
  id: string;
  /** 几何多边形数据 */
  geomPolygons?: GeomPolygon[];
  /** 边界ID列表 */
  boundaries?: string[];
  /** 网格ID */
  grid?: string;
  /** 布局数据 */
  layout?: unknown;
  /** 图案ID */
  pattern?: string;
  /** 其他继承自Shape的属性 */
  [key: string]: unknown;
}

/**
 * 加载选项
 */
export interface LoadOptions {
  /** 数据映射 */
  data?: Record<string, unknown>;
  /** 无效ID列表 */
  invalidIds?: string[];
  /** 其他选项 */
  [key: string]: unknown;
}

/**
 * 转储选项
 */
export interface DumpOptions {
  /** 材质数据映射 */
  materialsData?: Map<string, Material>;
  /** 产品映射 */
  productsMap?: Map<string, unknown>;
  /** 其他选项 */
  [key: string]: unknown;
}

/**
 * 区域类
 * 继承自Shape，表示一个可包含边界、网格和子区域的区域实体
 */
export declare class Region extends Shape {
  /** 内部布局对象 */
  private __layout: Layout | null;
  
  /** 内部边界数组 */
  private __boundaries: Boundary[];
  
  /** 内部几何多边形数组 */
  private __geomPolygons: GeomPolygon[];
  
  /** 内部网格对象 */
  private __grid?: MixGrid | PatternGrid | null;

  /**
   * 构造函数
   * @param id - 实体ID，默认为空字符串
   * @param tag - 实体标签
   */
  constructor(id?: string, tag?: string);

  /**
   * 布局属性
   * 定义区域的子区域布局
   */
  layout: Layout | null;

  /**
   * 网格属性
   * 区域内的网格对象（可以是混合网格或图案网格）
   */
  grid: MixGrid | PatternGrid | null;

  /**
   * 边界数组
   * 区域的边界列表
   */
  boundaries: Boundary[];

  /**
   * 几何多边形数组
   * 定义区域的几何形状
   */
  geomPolygons: GeomPolygon[];

  /**
   * 创建区域静态方法
   * @param outer - 外轮廓点集
   * @param holes - 内孔点集数组
   * @returns 新创建的区域实例
   */
  static createRegion(outer?: HSCore.Math.Point2d[], holes?: HSCore.Math.Point2d[][]): Region;

  /**
   * 获取IO处理器实例
   * @returns Region_IO单例
   */
  getIO(): Region_IO;

  /**
   * 判断是否为背景区域
   * @returns 始终返回false
   */
  isBackground(): boolean;

  /**
   * 获取克隆的转储数据
   * @returns 包含转储数据和上下文的对象
   */
  getClonedDumpData(): ClonedDumpData;

  /**
   * 克隆当前区域
   * @returns 新的区域实例
   */
  clone(): Region;

  /**
   * 获取路径
   * @returns 离散点集数组
   */
  getPath(): HSCore.Math.Point2d[][];

  /**
   * 获取所有内孔
   * @returns 所有几何多边形的内孔集合
   */
  getAllHoles(): HSCore.Math.Point2d[][];

  /**
   * 获取离散路径
   * @returns 包含外轮廓和内孔的所有点集
   */
  getDiscretePath(): HSCore.Math.Point2d[][];

  /**
   * 获取几何多边形数组
   * @returns 几何多边形数组
   */
  getGeomPolygons(): GeomPolygon[];

  /**
   * 获取离散点集
   * @returns 所有外轮廓的点集
   */
  getDiscretePoints(): HSCore.Math.Point2d[];

  /**
   * 验证区域数据完整性
   * @returns 验证是否通过
   */
  verify(): boolean;

  /**
   * 内部获取几何多边形方法
   * @returns 几何多边形数组
   */
  protected _getGeomPolygons(): GeomPolygon[];

  /**
   * 内部设置几何多边形方法
   * @param polygons - 新的几何多边形数组
   */
  protected _setGeomPolygons(polygons: GeomPolygon[]): void;

  /**
   * 内部设置网格方法
   * @param grid - 新的网格对象
   */
  protected _setGrid(grid: MixGrid | PatternGrid | null): void;

  /**
   * 内部设置边界数组方法
   * @param boundaries - 新的边界数组
   */
  protected _setBoundaries(boundaries: Boundary[]): void;

  /**
   * 添加边界
   * @param boundary - 要添加的边界
   * @param index - 插入位置，默认添加到末尾
   */
  addBoundary(boundary: Boundary, index?: number): void;

  /**
   * 移除边界
   * @param boundary - 要移除的边界
   */
  removeBoundary(boundary: Boundary): void;

  /**
   * 获取边界总宽度
   * @returns 所有边界宽度之和
   */
  getBoundaryWidth(): number;

  /**
   * 获取内边界点集
   * 考虑边界宽度后的偏移点集
   * @returns 偏移后的点集
   */
  getInnerBoundaryPoints(): HSCore.Math.Point2d[];

  /**
   * 获取指定索引的内边界点集
   * @param index - 边界索引
   * @returns 偏移后的点集
   */
  getInnerBoundaryPointsIndex(index: number): HSCore.Math.Point2d[];

  /**
   * 转换为内多边形
   * @returns 内边界点集
   */
  toInnerPolygon(): HSCore.Math.Point2d[];

  /**
   * 更新所有边界
   * @param forceUpdate - 是否强制更新
   */
  updateBoundaries(forceUpdate?: boolean): void;

  /**
   * 是否包含网格
   * @returns 是否存在网格
   */
  containsGrid(): boolean;

  /**
   * 是否包含边界
   * @returns 是否存在边界
   */
  containsBoundary(): boolean;

  /**
   * 是否包含参数模板（图案）
   * @returns 是否存在图案
   */
  containsParamTemplate(): boolean;

  /**
   * 更新混合网格
   */
  updateMixGrid(): void;

  /**
   * 获取所有子区域
   * @returns 子区域数组
   */
  getAllChildRegions(): Region[];

  /**
   * 移除子区域
   * @param region - 要移除的子区域
   */
  removeChildRegion(region: Region): void;

  /**
   * 更新布局
   */
  updateLayout(): void;

  /**
   * 几何形状变化时的回调
   */
  onGeometryChanged(): void;

  /**
   * 清空区域内容
   * @param options - 清空选项
   */
  clear(options?: unknown): void;

  /**
   * 子实体脏数据回调
   * @param child - 脏数据的子实体
   * @param event - 事件对象
   */
  onChildDirty(child: Entity, event: unknown): void;

  /**
   * 图案脏数据回调
   * @param event - 事件对象
   */
  onPatternDirty(event: { data: { type: EntityEventType } }): void;

  /**
   * 图案重置回调
   * @param pattern - 图案对象
   */
  onPatternReset(pattern: Pattern): void;

  /**
   * 图案重置覆盖回调
   * @param pattern - 图案对象
   */
  onPatternResetOverride(pattern: Pattern): void;

  /**
   * 图案变化的内部处理
   */
  protected _onPatternChanged(): void;

  /**
   * 从其他区域复制样式
   * @param region - 源区域
   */
  copyStyleFromOtherRegion(region: Region): void;

  /**
   * 适配布局
   * @param polygons - 新的几何多边形数组
   */
  fitToLayout(polygons: GeomPolygon[]): void;

  /**
   * 更新区域
   * @param createPolygons - 是否创建多边形
   */
  updateRegion(createPolygons: boolean): void;

  /**
   * 检查克隆结果
   * @param context - 克隆上下文
   */
  checkClonedResult(context: CloneContext): void;

  /**
   * 销毁区域
   */
  destroy(): void;
}

/**
 * 区域IO处理类
 * 负责区域的序列化和反序列化
 */
export declare class Region_IO extends Shape_IO {
  /** 单例实例 */
  private static _Region_IO_instance?: Region_IO;

  /**
   * 获取单例实例
   * @returns Region_IO单例
   */
  static instance(): Region_IO;

  /**
   * 是否保存图案实体
   */
  get savePatternEntity(): boolean;

  /**
   * 转储区域数据
   * @param entity - 要转储的区域实例
   * @param callback - 转储后的回调函数
   * @param includeChildren - 是否包含子实体，默认true
   * @param options - 转储选项
   * @returns 转储数据数组
   */
  dump(
    entity: Region,
    callback?: (dumps: RegionDumpData[], entity: Region) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): RegionDumpData[];

  /**
   * 加载区域数据
   * @param entity - 目标区域实例
   * @param data - 要加载的数据
   * @param options - 加载选项
   */
  load(entity: Region, data: RegionDumpData, options?: LoadOptions): void;
}