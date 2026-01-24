import { Point } from './geometry';
import { Segment } from './geometry';
import { WinPolygon } from './WinPolygon';
import { Shape, ShapeType } from './Shape';

/**
 * 文字标注类型 - 用于在图形上显示尺寸标注
 * 继承自 Shape，提供尺寸线的绘制、更新和管理功能
 */
export declare class TextDim extends Shape {
  /**
   * 标注起点
   */
  sPt: Point;

  /**
   * 标注终点
   */
  ePt: Point;

  /**
   * 宿主对象 - 标注所属的容器
   */
  host: any;

  /**
   * 是否显示标注
   * @default true
   */
  dimShow: boolean;

  /**
   * 标注名称
   * @default ""
   */
  name: string;

  /**
   * 标注显示的数值
   * @default 100
   */
  value: number;

  /**
   * 标注的几何形状数组（线段集合）
   */
  shapes: Segment[];

  /**
   * 可视化形状数组 - 实际渲染在画布上的形状对象
   */
  vshapes: any[];

  /**
   * 构造函数
   * @param sPt - 标注起点
   * @param ePt - 标注终点
   * @param host - 宿主容器对象
   */
  constructor(sPt: Point, ePt: Point, host: any);

  /**
   * 绘制标注到画布
   * @param canvas - 画布上下文对象
   */
  draw(canvas: any): void;

  /**
   * 获取对象自身引用
   */
  get obj(): this;

  /**
   * 应用差异更新
   * @param diff - 差异数据
   */
  applyDiff(diff: any): void;

  /**
   * 创建标注的几何形状
   * 生成标注线和两端的延伸线
   */
  create(): void;

  /**
   * 更新多边形关联
   * @param polygon - 多边形对象
   */
  updatePoly(polygon: any): void;

  /**
   * 回收资源，清理可视化形状
   * @param fullRecycle - 是否完全回收，默认 false
   */
  recycle(fullRecycle?: boolean): void;

  /**
   * 平移标注
   * @param vector - 平移向量
   */
  translate(vector: Point): void;

  /**
   * 序列化为JSON对象
   * @returns 包含起点、终点和数值的JSON对象
   */
  toJSON(): {
    /** 起点 */
    st: any;
    /** 终点 */
    et: any;
    /** 显示数值 */
    dv: number;
  };

  /**
   * 从JSON对象反序列化
   * @param json - 包含起点、终点和数值的JSON对象
   */
  deserialize(json: { st: Point; et: Point; dv: number }): void;

  /**
   * 移除标注
   * @param context - 移除上下文
   */
  remove(context?: any): void;

  /**
   * 删除标注
   * @param context - 删除上下文
   * @returns 始终返回 true 表示删除成功
   */
  delete(context?: any): boolean;
}