import Flatten from '@flatten-js/core';
import { ToolType } from './ToolType';
import { ShapeColor } from './ShapeColor';
import { WinPolygon } from './WinPolygon';
import { DrawParams } from './DrawParams';
import { Shape, ShapeType } from './Shape';
import { Artisan } from './Artisan';

/**
 * 标注尺寸维度的基础类
 * 用于在图形中显示测量标注，包括长度、距离等信息
 */
export declare class Dimension extends Shape {
  /** 承载该标注的宿主对象 */
  host?: any;

  /** 标注的起点坐标 */
  from: Flatten.Point;

  /** 标注的终点坐标 */
  to: Flatten.Point;

  /** 关联的工具类型，默认为编辑标注工具 */
  tool: ToolType;

  /** 标注的名称标识 */
  name: string;

  /** 标注线相对于测量线的偏移向量 */
  offset: Flatten.Vector;

  /** 是否隐藏该标注 */
  hidden: boolean;

  /** 标注图形的线段集合，每个元素是一组线段数组 */
  shapes: Flatten.Segment[][];

  /** 可视化图形对象数组，用于在画布上渲染 */
  vshapes: any[];

  /** 标注两端延伸线的长度（像素） */
  sideLength: number;

  /** 显示的长度值（可能经过格式化） */
  displayLength?: number;

  /**
   * 构造函数
   * @param host - 宿主对象
   * @param from - 起点坐标，默认为原点
   * @param to - 终点坐标，默认为原点
   */
  constructor(host?: any, from?: Flatten.Point, to?: Flatten.Point);

  /**
   * 标注是否显示
   * @returns 与 hidden 属性相反的值
   */
  get dimShow(): boolean;

  /**
   * 获取标注的包围盒
   * @returns 包含所有标注图形的边界盒
   */
  get box(): Flatten.Box;

  /**
   * 获取标注的数值（即长度）
   * @returns 测量长度
   */
  get value(): number;

  /**
   * 设置标注的数值（空实现，用于接口兼容）
   * @param value - 要设置的值
   */
  set value(value: number);

  /**
   * 计算起点到终点的实际长度
   * @returns 长度值，保留两位小数
   */
  get length(): number;

  /**
   * 应用长度差值，触发编辑回调
   * @param newValue - 新的长度值
   */
  applyDiff(newValue: number): void;

  /**
   * 编辑标注时的回调钩子
   * @param newValue - 新值
   * @param oldValue - 旧值
   */
  onEdit(newValue: number, oldValue: number): void;

  /**
   * 更新标注的多边形表示
   * @returns 当前实例，支持链式调用
   */
  updatePoly(): this;

  /**
   * 判断是否忽略创建标注图形
   * @returns 如果全局禁用标注或当前标注被隐藏则返回 true
   */
  ignoreCreating(): boolean;

  /**
   * 重置标注状态，清空图形数组并重新添加到宿主
   */
  reset(): void;

  /**
   * 回收标注资源，清理可视化对象
   * @param force - 是否强制回收，默认 false
   */
  recycle(force?: boolean): void;

  /**
   * 平移标注
   * @param vector - 平移向量
   */
  translate(vector: Flatten.Vector): void;

  /**
   * 序列化为 JSON 对象
   * @returns 包含标注所有属性的 JSON 对象
   */
  toJSON(): DimensionJSON;

  /**
   * 从 JSON 对象反序列化
   * @param json - 序列化的标注数据
   * @param context - 反序列化上下文（可选）
   */
  deserialize(json: DimensionJSON, context?: any): void;

  /**
   * 从另一个标注对象克隆属性
   * @param source - 源标注对象
   * @returns 当前实例
   */
  cloneFrom(source: Dimension): this;

  /**
   * 在画布上绘制标注
   * @param layer - 目标图层
   * @param forceUpdate - 是否强制更新显示长度，默认 false
   */
  draw(layer: any, forceUpdate?: boolean): void;

  /**
   * 定位标注位置的抽象方法
   * 子类应重写此方法实现具体的定位逻辑
   */
  locate(): void;

  /**
   * 创建标注的图形表示
   * 默认创建一条带两端延伸线的标注线
   * @returns 当前实例
   */
  createShapes(): this;
}

/**
 * 标注序列化后的 JSON 结构
 */
export interface DimensionJSON {
  /** 标注名称 */
  name: string;
  
  /** 起点坐标 */
  from: {
    x: number;
    y: number;
  };
  
  /** 终点坐标 */
  to: {
    x: number;
    y: number;
  };
  
  /** 是否隐藏 */
  hidden: boolean;
  
  /** 偏移向量 */
  offset: {
    x: number;
    y: number;
  };
}