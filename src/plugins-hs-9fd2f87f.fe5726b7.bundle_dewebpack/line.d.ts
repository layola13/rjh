/**
 * 线段和几何工具模块
 * 提供线段投影、边界计算、多边形清理等功能
 */

import { HSCore } from './hscore';
import { HSMath } from './hsmath';
import { HSApp } from './hsapp';
import { ClipperLib } from './clipper';

/** 二维向量接口 */
interface Vector2D {
  x: number;
  y: number;
}

/** 线段源数据类型 */
type LineSource = 
  | [Vector2D, Vector2D] 
  | { from: Vector2D; to: Vector2D } 
  | { v0: Vector2D; v1: Vector2D };

/** 路径数据接口 */
interface PathData {
  outer: Vector2D[];
  holes: Vector2D[][];
}

/** 开洞过滤配置 */
interface OpeningFilter {
  window?: boolean;
  door?: boolean;
  hole?: boolean;
  opening?: boolean;
}

/** 开洞几何扩展配置 */
interface OpeningGeometryOptions {
  width?: number;
  length?: number;
}

/** 墙体边界线计算配置 */
interface WallBorderOptions {
  discretized?: boolean;
  segments?: number;
}

/** 碰撞检测配置 */
interface CollisionOptions {
  operation: typeof HSCore.Util.Collision.ClipType.diff;
}

/** 材质纹理数据 */
interface MaterialTextures {
  materials: any[];
  seams: any[];
}

/** 内容边界信息 */
interface ContentBound {
  center: Vector2D;
  width: number;
  height: number;
  rotation: number;
}

/** 转角窗路径集合 */
interface CornerWindowPaths {
  innerPath: Vector2D[];
  midPath1: Vector2D[];
  midPath2: Vector2D[];
  outPath: Vector2D[];
  wallA: Vector2D[];
  wallB: Vector2D[];
}

/**
 * 内部线段类
 * 用于线段投影和方向判断
 */
declare class InternalLine {
  private _src: LineSource;
  private _leftCount: number;
  private _rightCount: number;
  
  /** 线段起点 */
  v0: Vector2D;
  /** 线段终点 */
  v1: Vector2D;

  constructor(source: LineSource);

  /** 获取原始源数据 */
  get src(): LineSource;

  /** 左侧线段计数 */
  get leftCount(): number;
  set leftCount(value: number);

  /** 右侧线段计数 */
  get rightCount(): number;
  set rightCount(value: number);

  /**
   * 判断线段相对于另一线段的方向
   * @param line 目标线段
   * @returns 1=右侧, -1=左侧, 0=共线
   */
  whichSide(line: InternalLine): 0 | 1 | -1;

  /**
   * 投影到目标线段
   * @param line 目标线段
   * @returns 投影后的新线段
   */
  projectTo(line: InternalLine): InternalLine;
}

/**
 * 线段类
 * 提供线段方向、长度、投影等计算
 */
export declare class Line {
  /** 线段起点 */
  v0: Vector2D;
  /** 线段终点 */
  v1: Vector2D;

  constructor(v0: Vector2D, v1: Vector2D);

  /**
   * 获取线段方向向量
   * @returns 从v0指向v1的方向向量
   */
  direction(): Vector2D;

  /**
   * 反转线段方向
   * @returns 当前实例（链式调用）
   */
  invert(): this;

  /**
   * 计算线段长度
   * @returns 线段长度
   */
  segmentLength(): number;

  /**
   * 投影到目标线段（限制在线段范围内）
   * @param target 目标线段
   * @returns 投影后的新线段，如果投影结果为点则返回null
   */
  projectToSegment(target: Line): Line | null;

  /**
   * 投影到目标直线（不限制范围）
   * @param target 目标线段
   * @returns 投影后的新线段
   */
  projectTo(target: Line): Line;

  /**
   * 获取点在线段上的线性插值系数
   * @param point 目标点
   * @returns 插值系数t（0表示v0，1表示v1）
   */
  getClosestLinearInterpolation(point: Vector2D): number;

  /**
   * 平移线段
   * @param offset 平移向量
   * @returns 当前实例（链式调用）
   */
  translate(offset: Vector2D): this;
}

/**
 * 几何工具集
 * 提供墙体边界、开洞处理、多边形清理等功能
 */
export declare namespace Util {
  /** 日志记录器 */
  const logger: ReturnType<typeof log.logger>;

  /** 常量配置 */
  const Constants: {
    /** 数值精度位数 */
    NUM_OF_DIGITS: 6;
    /** 几何计算容差 */
    TOLERANCE: 0.001;
    /** 标签命名空间 */
    TagNamespace: 'hsw.plugin.contenttag';
  };

  /**
   * 对共线点进行排序
   * @param points 点集合
   * @param skipDuplicateRemoval 是否跳过去重（默认false）
   * @returns 排序后的点集合
   */
  function sortColinearPoints(
    points: Vector2D[], 
    skipDuplicateRemoval?: boolean
  ): Vector2D[];

  /**
   * DWG长度单位转换为模型长度单位（米）
   * @param dwgLength DWG长度值
   * @returns 转换后的米值
   */
  function DWGLengthToModelLength(dwgLength: number): number;

  /**
   * 计算墙体结构边界线
   * @param document 文档对象（默认为活动文档）
   * @returns 边界线路径集合
   */
  function computeWallStructureBorderLines(
    document?: typeof HSCore.Doc.DocumentManager.prototype.activeDocument
  ): Vector2D[][];

  /**
   * 计算墙体边界线
   * @param layer 图层对象
   * @param openingFilter 开洞过滤配置
   * @param options 墙体边界计算配置
   * @returns 边界线路径集合
   */
  function computeWallBorderLines(
    layer: any,
    openingFilter?: OpeningFilter,
    options?: WallBorderOptions
  ): Vector2D[][];

  /**
   * 根据路径计算墙体边界
   * @param paths 输入路径集合
   * @param layer 图层对象
   * @param openingFilter 开洞过滤配置
   * @param enableCleanup 是否启用清理（默认true）
   * @returns 处理后的边界路径集合
   */
  function computeWallByPaths(
    paths: Vector2D[][],
    layer: any,
    openingFilter?: OpeningFilter,
    enableCleanup?: boolean
  ): Vector2D[][];

  /**
   * 判断房间是否为普通房间（含开洞）
   * @param room 房间或楼板对象
   * @returns 是否为普通房间
   */
  function isRoomNormalRoom(room: any): boolean;

  /**
   * 获取楼板材质纹理URL
   * @param document 文档对象
   * @returns 材质和接缝纹理数据
   */
  function getFloorMaterialTextureUrls(document: any): MaterialTextures;

  /**
   * 清理多边形（去除冗余点、自相交等）
   * @param polygons 多边形路径集合
   * @param tolerance 清理容差（默认1e-5）
   * @returns 清理后的多边形集合
   */
  function cleanPolygons(
    polygons: Vector2D[][], 
    tolerance?: number
  ): Vector2D[][];

  /**
   * 查找多边形轮廓（外轮廓和孔洞）
   * @param polygons 多边形路径集合
   * @returns 带孔洞的多边形数据
   */
  function findContours(polygons: Vector2D[][]): PathData[];

  /**
   * 获取内容实体的边界框
   * @param entity 实体对象
   * @param useHostWidth 是否使用宿主墙体宽度
   * @returns 边界框信息
   */
  function getContentBound(entity: any, useHostWidth?: boolean): ContentBound;

  /**
   * 计算矩形轮廓点
   * @param center 中心点
   * @param width 宽度
   * @param height 高度
   * @param rotation 旋转角度（弧度）
   * @returns 四个角点数组
   */
  function computeOutline(
    center: Vector2D,
    width: number,
    height: number,
    rotation?: number
  ): [Vector2D, Vector2D, Vector2D, Vector2D];

  /**
   * 查找最外层线段（剔除被包围的线段）
   * @param lines 线段集合
   * @returns 最外层线段集合
   */
  function findOutmostLines(lines: LineSource[]): LineSource[];

  /**
   * 获取转角窗的各层路径
   * @param cornerWindow 转角窗对象
   * @returns 各层路径数据，如果无投影则返回undefined
   */
  function getCornerWindowPaths(cornerWindow: any): CornerWindowPaths | undefined;

  /**
   * 计算开洞实体的几何轮廓
   * @param opening 开洞对象（门、窗、洞口等）
   * @param options 扩展配置
   * @returns 轮廓四边形顶点数组
   */
  function computeOpeningGeometry(
    opening: any,
    options?: OpeningGeometryOptions
  ): [Vector2D, Vector2D, Vector2D, Vector2D];

  /**
   * 深度合并对象
   * @param target 目标对象
   * @param source 源对象
   * @returns 合并后的目标对象
   */
  function deepAssign<T extends Record<string, any>>(
    target: T,
    source: Partial<T>
  ): T;

  /**
   * 将闭合曲线环转换为SVG路径
   * @param loop 曲线环（Line2d或Arc2d对象数组）
   * @param scale 缩放系数
   * @returns SVG路径字符串
   */
  function loop2SVG(loop: any[], scale: number): string;

  /**
   * 将单条曲线转换为SVG路径片段
   * @param curve 曲线对象（Line2d或Arc2d）
   * @param isFirst 是否为起始曲线
   * @param scale 缩放系数
   * @returns SVG路径片段字符串
   */
  function curve2SVG(curve: any, isFirst: boolean, scale: number): string;
}