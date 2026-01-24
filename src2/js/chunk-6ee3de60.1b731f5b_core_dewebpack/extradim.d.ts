/**
 * ExtraDim模块类型定义
 * 用于描述额外尺寸标注的形状类
 */

import { Shape, ShapeType, ExtraDimTypeEnum, WinPolygon } from './types';
import { Vector, Point } from './geometry';
import { Polygon } from './polygon';

/**
 * 帧关系接口
 * 描述尺寸标注与帧之间的关系
 */
export interface FrameRelation {
  /** 转换为JSON格式 */
  toJSON(): FrameRelationJSON;
}

/**
 * 帧关系JSON序列化格式
 */
export interface FrameRelationJSON {
  [key: string]: unknown;
}

/**
 * ExtraDim JSON序列化格式
 */
export interface ExtraDimJSON {
  /** 起始点 */
  st: Point;
  /** 结束点 */
  et: Point;
  /** 偏移向量 */
  ov: Vector;
  /** 额外尺寸类型 */
  dt: ExtraDimTypeEnum;
  /** 帧关系列表 */
  fr: FrameRelationJSON[];
  /** 名称 */
  name: string;
}

/**
 * 视图宿主接口
 * 表示包含ExtraDim的宿主对象
 */
export interface ExtraDimHost {
  /** 视图对象 */
  view: {
    /** 视图参数 */
    params: Record<string, unknown>;
  };
  
  /** 获取父级变换矩阵 */
  getParentMatrices(): unknown[];
  
  /** 删除额外尺寸标注 */
  deleteExtraDim(dim: ExtraDim): void;
}

/**
 * 可视化形状接口
 * 用于渲染的形状对象
 */
export interface VisualShape {
  /** 隐藏形状 */
  hide(): void;
  
  /** 移动到指定图层 */
  moveTo(layer: unknown): void;
  
  /** 获取所属图层 */
  getLayer(): unknown;
}

/**
 * ExtraDim类
 * 继承自Shape，用于表示额外的尺寸标注
 */
export declare class ExtraDim extends Shape {
  /** 起始点 */
  sPt: Point;
  
  /** 结束点 */
  ePt: Point;
  
  /** 宿主对象 */
  host: ExtraDimHost;
  
  /** 偏移向量 */
  offVec: Vector;
  
  /** 标注名称 */
  name: string;
  
  /** 标注数值 */
  value: number;
  
  /** 可视化形状列表 */
  vshapes: VisualShape[];
  
  /** 帧关系列表 */
  frameRelation: FrameRelation[];
  
  /**
   * 构造函数
   * @param startPoint 起始点
   * @param endPoint 结束点
   * @param host 宿主对象
   * @param offsetVector 偏移向量，默认为零向量
   */
  constructor(
    startPoint: Point,
    endPoint: Point,
    host: ExtraDimHost,
    offsetVector?: Vector
  );
  
  /** 获取视图参数 */
  readonly params: Record<string, unknown>;
  
  /** 获取额外尺寸类型 */
  readonly extraDimType: ExtraDimTypeEnum;
  
  /** 获取当前对象引用 */
  readonly obj: this;
  
  /** 是否显示尺寸标注 */
  readonly dimShow: boolean;
  
  /** 是否高亮显示 */
  readonly highlighted: boolean;
  
  /**
   * 应用差异更新
   * @param diff 差异数据
   */
  applyDiff(diff: unknown): void;
  
  /**
   * 创建帧关系
   * @param frame 帧数据
   */
  createFrameRelation(frame: unknown): void;
  
  /** 创建尺寸标注 */
  create(): void;
  
  /** 从关系更新点位 */
  updatePtFromRelation(): void;
  
  /**
   * 更新多边形
   * @param shouldUpdatePoints 是否更新点位
   */
  updatePoly(shouldUpdatePoints?: boolean): void;
  
  /**
   * 回收资源
   * @param permanent 是否永久删除，默认false
   */
  recycle(permanent?: boolean): void;
  
  /**
   * 平移变换
   * @param translation 平移向量
   */
  translate(translation: Vector): void;
  
  /**
   * 序列化为JSON
   * @returns JSON对象
   */
  toJSON(): ExtraDimJSON;
  
  /**
   * 获取碰撞检测多边形
   * @returns 窗口多边形
   */
  hitPolygon(): WinPolygon;
  
  /**
   * 点击检测
   * @param point 检测点
   * @param context 上下文参数
   * @returns 是否命中
   */
  hitBar(point: Point, context?: unknown): boolean;
  
  /**
   * 设置高亮状态
   * @param isHighlighted 是否高亮
   */
  highlight(isHighlighted: boolean): void;
  
  /**
   * 移除对象
   * @param context 上下文参数
   */
  remove(context?: unknown): void;
  
  /**
   * 删除对象
   * @param context 上下文参数
   * @returns 是否删除成功
   */
  delete(context?: unknown): boolean;
}