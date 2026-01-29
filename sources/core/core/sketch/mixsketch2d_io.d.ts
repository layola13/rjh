/**
 * MixSketch2d 模块类型定义
 * 提供混合草图 2D 绘制和铺装功能
 * @module MixSketch2d_IO
 */

import type { Entity_IO, Entity } from './Entity';
import type { Sketch2d } from './Sketch2d';
import type { Background } from './Background';
import type { MixpaintBuilder } from './MixpaintBuilder';
import type { Face2d } from './Face2d';
import type { Wire } from './Wire';
import type { Point2d } from './Point2d';
import type { Curve2d, Line2d, Circle2d } from './Curve2d';
import type { MaterialData } from '../rendering/MaterialData';
import type { MixHost } from './MixHost';
import type { GuideLine2d } from './GuideLine2d';

/**
 * 序列化上下文选项
 */
export interface DumpContext {
  /** 产品元数据映射表 */
  productsMap?: Map<string, any>;
  /** 是否浅层保存元数据 */
  shallowSaveMeta?: boolean;
  /** 数据版本号 */
  version?: string;
}

/**
 * 区域数据结构
 */
export interface Region {
  /** 区域唯一标识 */
  id: string;
  /** 几何路径 */
  path: Path;
  /** 材质对象 */
  material: MaterialObject;
  /** 几何图形已变更标志 */
  dirtyGeometry(): void;
}

/**
 * 混合铺装数据结构
 */
export interface MixPave {
  /** 所有区域列表 */
  regions: Region[];
  /** 独立区域列表（不与其他区域连接） */
  independentRegions: Region[];
  /** 背景材质 */
  backgroundMaterial: MaterialObject;
}

/**
 * 路径数据结构
 */
export interface Path {
  /** 外部轮廓点集 */
  outer: Point2d[];
  /** 内部孔洞点集数组 */
  holes: Point2d[][];
}

/**
 * 材质对象接口
 */
export interface MaterialObject {
  /** 材质唯一标识 */
  id: string;
  /** 查找标识 */
  seekId: string;
  [key: string]: unknown;
}

/**
 * 几何多边形数据
 */
export interface GeomPolygon {
  /** 外部轮廓点集 */
  outer: Point2d[];
  /** 内部孔洞点集数组 */
  holes: Point2d[][];
}

/**
 * 背景多边形更新选项
 */
export interface BackgroundUpdateOptions {
  /** 是否更新几何体 */
  updateGeometry?: boolean;
  /** 是否刷新状态栏 */
  statusBarRefresh?: boolean;
}

/**
 * 创建背景配置项
 */
export interface CreateBackgroundConfig {
  /** 背景路径数据 */
  background?: Path | Background;
  /** 背景材质 */
  backgroundMaterial?: MaterialData;
  /** 铺装路径数组 */
  paints?: Array<{ path?: Path }>;
}

/**
 * MixSketch2d 序列化/反序列化处理器
 * 负责混合草图的数据持久化
 */
export declare class MixSketch2d_IO extends Entity_IO {
  /** 单例实例 */
  private static _MixSketch2d_IO_instance?: MixSketch2d_IO;

  /**
   * 获取单例实例
   * @returns MixSketch2d_IO 实例
   */
  static instance(): MixSketch2d_IO;

  /**
   * 序列化实体为可持久化数据
   * @param entity - 要序列化的 MixSketch2d 实例
   * @param callback - 序列化后的回调函数
   * @param isRoot - 是否为根实体
   * @param context - 序列化上下文
   * @returns 序列化后的数据数组
   */
  dump(
    entity: MixSketch2d,
    callback?: (data: any[], entity: MixSketch2d) => void,
    isRoot?: boolean,
    context?: DumpContext
  ): any[];

  /**
   * 从序列化数据加载实体
   * @param entity - 要填充数据的 MixSketch2d 实例
   * @param data - 序列化数据
   * @param context - 加载上下文
   */
  load(entity: MixSketch2d, data: any, context?: DumpContext): void;
}

/**
 * 混合草图 2D 实体
 * 支持多区域铺装、材质编辑和背景设置
 */
export declare class MixSketch2d extends Sketch2d {
  /** 内部混合铺装数据 */
  private _mixPave: MixPave;
  /** 宿主对象 */
  private _host: MixHost;
  /** 背景对象 */
  private _background: Background;

  /**
   * 草图 ID 到区域 ID 的映射表
   * @decorator EntityField
   */
  idMap: Map<string, string>;

  /**
   * 所有铺装区域
   * @decorator EntityField
   */
  regions: Region[];

  /**
   * 独立铺装区域（不与其他区域相连）
   * @decorator EntityField
   */
  independentRegions: Region[];

  /**
   * 构造函数
   * @param id - 实体唯一标识
   * @param parent - 父实体
   */
  constructor(id?: string, parent?: Entity);

  /**
   * 获取序列化处理器
   * @returns MixSketch2d_IO 实例
   */
  getIO(): MixSketch2d_IO;

  /**
   * 获取混合铺装数据
   */
  get mixPave(): MixPave;

  /**
   * 设置混合铺装数据
   */
  set mixPave(value: MixPave);

  /**
   * 设置宿主对象
   */
  set host(value: MixHost);

  /**
   * 获取背景材质
   */
  get backgroundMaterial(): MaterialData;

  /**
   * 设置背景材质
   */
  set backgroundMaterial(value: MaterialData);

  /**
   * 清空草图所有内容
   */
  clearSketch(): void;

  /**
   * 根据草图 ID 获取区域 ID
   * @param sketchId - 草图元素 ID
   * @returns 对应的区域 ID
   */
  getRegionIdBySketchId(sketchId: string): string | undefined;

  /**
   * 根据区域 ID 获取草图 ID
   * @param regionId - 区域 ID
   * @returns 对应的草图元素 ID
   */
  getSketchIdByRegionId(regionId: string): string | undefined;

  /**
   * 根据 MixPave 数据刷新草图
   * @param mixPave - 混合铺装数据
   * @param keepMapping - 是否保持 ID 映射关系
   */
  refreshSketchByMixPave(mixPave: MixPave, keepMapping?: boolean): void;

  /**
   * 根据 MixPave 数据刷新背景
   * @param mixPave - 混合铺装数据
   * @param keepMapping - 是否保持 ID 映射关系
   */
  refreshBackgroundByMixPave(mixPave: MixPave, keepMapping?: boolean): void;

  /**
   * 刷新辅助线
   * @param guideLinesDump - 辅助线序列化数据
   * @param context - 加载上下文
   */
  refreshGuideLines(guideLinesDump: any[], context: DumpContext): void;

  /**
   * 克隆草图实例
   * @returns 新的 MixSketch2d 实例
   */
  clone(): MixSketch2d;

  /**
   * 创建草图构建器
   * @returns MixpaintBuilder 实例
   */
  createBuilder(): MixpaintBuilder;

  /**
   * 设置背景数据
   * @param backgroundData - 背景路径数据或背景对象
   * @param material - 背景材质
   * @param useBuilder - 是否使用构建器模式
   */
  setBackgroundData(
    backgroundData: Path | Background,
    material?: MaterialData,
    useBuilder?: boolean
  ): void;

  /**
   * 更新背景标志位
   */
  updateBackgroundFlag(): void;

  /**
   * 判断点是否在背景区域内
   * @param point - 待检测点
   * @returns true 表示在背景内
   */
  isPointInBackground(point: Point2d): boolean;

  /**
   * 从裁剪点获取现有圆形曲线
   * @param clipPoints - 裁剪点集合
   * @returns 圆形曲线数组
   */
  getExistingCirclesFromClipPoints(clipPoints: Point2d[]): Circle2d[];

  /**
   * 与另一个 Sketch2d 合并
   * @param otherSketch - 要合并的草图
   */
  mergeWithOtherSketch2d(otherSketch: Sketch2d): void;

  /**
   * 添加路径集合
   * @param paths - 路径数组
   * @param material - 材质数据
   */
  addPaths(paths: Path[], material?: MaterialData): void;

  /**
   * 添加圆形路径
   * @param circlePath - 圆形路径数据
   * @param material - 材质数据
   */
  addCirclePath(circlePath: Path, material?: MaterialData): void;

  /**
   * 添加曲线路径
   * @param curves - 曲线数组
   * @param material - 材质数据
   */
  addCurvesPath(curves: Curve2d[], material?: MaterialData): void;

  /**
   * 点变更后更新混合铺装
   * @param points - 变更的点集合
   */
  updateMixpaintAfterChangePoints(points: Set<Point2d>): void;

  /**
   * 多边形变更后更新混合铺装
   * @param polygon - 变更的多边形
   */
  updateMixpaintAfterChangePolygon(polygon: Face2d): void;

  /**
   * 移除曲线
   * @param curves - 要移除的曲线数组
   * @param material - 填充材质
   */
  removeCurves(curves: Curve2d[], material?: MaterialData): void;

  /**
   * 判断是否与指定背景相同
   * @param background - 背景数据或背景对象
   * @returns true 表示相同
   */
  isSameBackground(background: Path | Background): boolean;

  /**
   * 更新背景多边形
   * @param background - 新的背景数据
   * @param options - 更新选项
   */
  updateBackgroundPolygon(
    background: Path | Background,
    options?: BackgroundUpdateOptions
  ): void;

  /**
   * 变更后更新
   * @param curves - 变更的曲线集合
   * @param points - 变更的点集合
   */
  updateAfterChanges(curves: Curve2d[], points: Point2d[]): void;

  /**
   * 创建背景
   * @param config - 背景配置
   * @returns true 表示创建成功
   */
  createBackground(config: CreateBackgroundConfig): boolean;

  /**
   * 获取几何多边形数据
   * @param face - 面对象
   * @returns 几何多边形数据
   */
  getGeomPolygons(face: Face2d): GeomPolygon;

  /**
   * 几何变更后更新
   * @param material - 默认材质对象
   */
  updateGeometryChanged(material?: MaterialObject): void;

  /**
   * 标记几何体为脏数据
   */
  dirtyGeometry(): void;

  /**
   * 根据 ID 获取 Face2d
   * @param id - Face ID
   * @returns Face2d 实例或 undefined
   */
  getFace2dById(id: string): Face2d | undefined;

  /**
   * 创建多边形
   * @param outerPoints - 外部轮廓点数组
   * @param holePoints - 内部孔洞点数组
   * @returns 新创建的 Face2d
   */
  createPolygon(outerPoints: Point2d[], holePoints?: Point2d[][]): Face2d;

  /**
   * 获取所有曲线
   * @returns 曲线数组
   */
  getAllCurves(): Curve2d[];

  /**
   * 获取所有点
   * @returns 点数组
   */
  getAllPoints(): Point2d[];
}