/**
 * 角度标注模块
 * 提供多边形顶点角度的测量和可视化功能
 */

import { Point, Vector, Segment, Line, Circle, Utils as FlattenUtils } from '@flatten-js/core';
import { ToolType } from './ToolType';
import { ShapeColor, Utils as GeometryUtils } from './GeometryUtils';
import { Artisan } from './Artisan';
import { ArcUtils, Frametify } from './MathUtils';
import {
  ExtraDim,
  ExtraDimTypeEnum,
  Text,
  TextAlign,
  WinPolygon,
  FrameRelationEnum,
  FrameRelation,
  DescriptivePolygonPoints,
  PolygonCreator
} from './DimensionTypes';

/**
 * 角度标注类
 * 用于在多边形顶点处创建、显示和编辑角度标注
 */
export declare class ExtraDimAngle extends ExtraDim {
  /**
   * 标注起始点（顶点位置）
   */
  sPt: Point;

  /**
   * 宿主多边形对象
   */
  host: PolygonHost;

  /**
   * 偏移向量
   */
  offVec: Vector;

  /**
   * 构成标注的图形数组（文本和弧形多边形）
   */
  shapes: Array<Text | WinPolygon>;

  /**
   * 虚拟图形数组（用于渲染）
   */
  vshapes: VShape[];

  /**
   * 角度值（度数）
   */
  value: number;

  /**
   * 参数配置
   */
  params: ExtraDimParams;

  /**
   * 框架关系数组（描述标注与多边形顶点的关联）
   */
  frameRelation: FrameRelation[];

  /**
   * 构造函数
   * @param startPoint - 标注起始点（多边形顶点）
   * @param hostPolygon - 宿主多边形对象
   * @param offsetVector - 偏移向量，默认为零向量
   */
  constructor(startPoint: Point, hostPolygon: PolygonHost, offsetVector?: Vector);

  /**
   * 标注类型（只读属性）
   * @returns 返回角度标注类型枚举值
   */
  get extraDimType(): ExtraDimTypeEnum.Angle;

  /**
   * 绘制标注到视图
   * @param view - 目标视图对象
   */
  draw(view: View): void;

  /**
   * 创建标注图形
   * 计算角度值并生成文本和弧形可视化元素
   */
  create(): void;

  /**
   * 根据框架关系更新标注点位置
   */
  updatePtFromRelation(): void;

  /**
   * 创建或设置框架关系
   * @param relation - 可选的预定义框架关系数组
   */
  createFrameRelation(relation?: FrameRelation[]): void;

  /**
   * 构建角度字符串
   * @param angleRadians - 弧度制角度值
   * @returns 格式化的角度字符串（如 "90.5°"）
   */
  static buildAngleString(angleRadians: number): string;

  /**
   * 获取文本显示的数值（只读属性）
   * @returns 角度数值（不含单位）
   */
  get textNumber(): number;

  /**
   * 获取关联的顶点索引（只读属性）
   * @returns 顶点在多边形中的索引，若无关联则为 undefined
   */
  get vertexIndex(): number | undefined;

  /**
   * 应用角度差异修改多边形
   * @param newAngle - 新的角度值（度数）
   */
  applyDiff(newAngle: number): void;

  /**
   * 获取标注的碰撞检测多边形
   * @returns 用于交互的碰撞检测区域多边形
   */
  hitPolygon(): WinPolygon;

  /**
   * 添加图形到组
   * @param shapes - 待添加的图形数组
   */
  addToGroup(shapes: VShape[]): void;
}

/**
 * 标注参数配置接口
 */
interface ExtraDimParams {
  /** 角度标注弧线长度 */
  angleLength: number;
  /** 框架线宽度 */
  frame: number;
}

/**
 * 多边形宿主接口
 */
interface PolygonHost {
  /** 多边形对象 */
  polygon: WinPolygon;
  /** 视图对象 */
  view: View;
  
  /**
   * 获取点在多边形中的位置关系
   * @param point - 待检测的点
   * @param strict - 是否严格模式
   */
  getPointPosition(point: Point, strict: boolean): FrameRelation | undefined;
  
  /**
   * 更新框架
   * @param immediate - 是否立即更新
   */
  updateFrame(immediate: boolean): void;
  
  /**
   * 绘制到视图
   * @param view - 目标视图
   */
  draw(view: View): void;
}

/**
 * 虚拟图形接口（用于渲染层）
 */
interface VShape {
  /**
   * 移动到指定图层
   * @param layer - 目标图层
   */
  moveTo(layer: Layer): void;
  
  /** 隐藏图形 */
  hide(): void;
  
  /** 移动到顶层 */
  moveToTop(): void;
  
  /**
   * 设置属性
   * @param key - 属性键
   * @param value - 属性值
   */
  setAttr(key: string, value: unknown): void;
  
  /**
   * 获取所属图层
   */
  getLayer(): Layer;
}

/**
 * 视图接口
 */
interface View {
  /** 视图特定属性 */
  [key: string]: unknown;
}

/**
 * 图层接口
 */
interface Layer {
  /** 图层特定属性 */
  [key: string]: unknown;
}