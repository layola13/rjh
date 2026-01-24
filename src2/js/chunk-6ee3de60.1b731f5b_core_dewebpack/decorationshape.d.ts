/**
 * 装饰形状模块
 * 用于处理多边形装饰条的可视化形状
 */

import Geometry from './geometry'; // 假设几何库路径
import { Shape } from './shape'; // 基础形状类
import { Bar, ShapeType } from './bar'; // 条形类和形状类型枚举
import { ShapeIdx } from './shape-idx'; // 形状索引工具
import { DecorationBarParser, DecorationBar } from './decoration-bar'; // 装饰条相关

/**
 * 多边形边缘类型（线段或圆弧）
 */
type PolygonEdge = Geometry.Segment | Geometry.Arc;

/**
 * 多边形接口
 */
interface Polygon {
  /** 多边形唯一标识 */
  polyId: string | number;
  /** 多边形的边缘集合（线段或圆弧） */
  edges: PolygonEdge[];
}

/**
 * 绘图上下文接口（Konva/Canvas兼容）
 */
interface DrawingContext {
  beginPath(): void;
  closePath(): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterClockwise: boolean
  ): void;
}

/**
 * 向量/点接口
 */
interface Vector2D {
  x: number;
  y: number;
}

/**
 * 图形组接口
 */
interface GraphicsShape {
  /** 将形状移动到顶层 */
  moveToTop(): void;
  /** 设置裁剪函数 */
  clipFunc(clipFunction: (ctx: DrawingContext) => void): void;
}

/**
 * 子形状接口
 */
interface ChildShape {
  /** 形状类型 */
  where: ShapeType;
  /** 是否高亮显示 */
  highlighted: boolean;
  /** 平移形状 */
  translate(offset: Vector2D): void;
}

/**
 * 装饰条序列化数据
 */
interface DecorationBarData {
  db?: unknown;
  [key: string]: unknown;
}

/**
 * 形状管理器接口
 */
interface ShapeManager {
  /**
   * 移除指定多边形的装饰条
   * @param polyId 多边形ID
   * @param refresh 是否刷新视图
   */
  removeBar(polyId: string | number, refresh: boolean): void;
}

/**
 * 装饰形状类
 * 继承自基础Shape类，用于渲染和管理多边形上的装饰条
 */
export declare class DecorationShape extends Shape {
  /** 装饰条数据对象 */
  decorationBar: DecorationBar;
  
  /** 关联的多边形对象 */
  polygon: Polygon;
  
  /** 形状的层级索引 */
  tapIdx: number;
  
  /** 图形组对象 */
  gshape: GraphicsShape;
  
  /** 子形状集合 */
  children: ChildShape[];

  /**
   * 构造函数
   * @param decorationBar 装饰条对象
   * @param options 形状配置参数
   */
  constructor(decorationBar: DecorationBar, options?: unknown);

  /**
   * 绘制形状到画布
   * @param context 绘图上下文
   */
  draw(context: unknown): void;

  /**
   * 更新关联的多边形并重新生成装饰条
   * @param polygon 新的多边形对象
   */
  updatePoly(polygon?: Polygon): void;

  /**
   * 平移整个装饰形状
   * @param offset 偏移向量
   */
  translate(offset: Vector2D): void;

  /**
   * 获取所有装饰条子形状
   */
  get bars(): Bar[];

  /**
   * 序列化为JSON对象
   * @returns 包含装饰条数据的对象
   */
  toJSON(): { db: unknown };

  /**
   * 从JSON数据反序列化
   * @param data 序列化的装饰条数据
   */
  deserialize(data: DecorationBarData): void;

  /**
   * 清除所有子装饰条
   */
  clearBar(): void;

  /**
   * 获取形状是否被选中
   */
  get isSelected(): boolean;

  /**
   * 删除装饰形状
   * @param manager 形状管理器，用于执行删除操作
   */
  delete(manager: ShapeManager): void;

  /**
   * 添加子形状
   * @param child 要添加的子形状
   */
  protected add(child: Bar): void;

  /**
   * 移除子形状
   * @param child 要移除的子形状
   */
  protected remove(child: Bar): void;

  /**
   * 回收资源
   */
  protected recycle(): void;
}