/**
 * 标签组件类型定义
 * 用于在画布上显示文本标签，支持单行或多行文本
 */

import type { Point, Vector } from './geometry';
import type { Shape, WinPolygon, Text, ShapeType, TextAlign } from './shapes';
import type { DrawParams } from './draw-params';

/**
 * 标签序列化数据接口
 */
interface LabelJSON {
  /** 标签文本内容 */
  text: string;
  /** 偏移向量的JSON表示 */
  offvec: {
    x: number;
    y: number;
  };
}

/**
 * 标签类
 * 继承自Shape，用于在图形上显示文本标注
 */
export declare class Label extends Shape {
  /** 宿主容器 */
  readonly host: any;
  
  /** 标签位置 */
  position: Point;
  
  /** 原始文本内容（字符串或字符串数组） */
  rawText: string | string[];
  
  /** 字体大小 */
  fontSize: number;
  
  /** 是否可拖拽 */
  draggable: boolean;
  
  /** 偏移向量 */
  offvec: Vector;
  
  /** 虚拟图形数组（用于渲染） */
  vshapes: any[];
  
  /** 文本图形数组 */
  shapes: Text[];
  
  /** 是否隐藏 */
  hidden: boolean;
  
  /** 文本对齐方式 */
  align: TextAlign;
  
  /** 编辑工具（可选） */
  editTool?: any;

  /**
   * 构造函数
   * @param host - 宿主容器对象
   * @param position - 标签位置坐标，默认为原点
   * @param text - 文本内容，可以是字符串或字符串数组（多行），默认为空字符串
   * @param fontSize - 字体大小，默认使用DrawParams中的labelFontSize
   * @param draggable - 是否可拖拽，默认为false
   */
  constructor(
    host: any,
    position?: Point,
    text?: string | string[],
    fontSize?: number,
    draggable?: boolean
  );

  /**
   * 文本内容
   * getter: 如果是数组则拼接为字符串返回
   * setter: 设置原始文本内容
   */
  get text(): string;
  set text(value: string | string[]);

  /**
   * 更新多边形
   * 根据文本内容创建或更新Text图形对象
   * @returns 返回当前实例以支持链式调用
   */
  updatePoly(): this;

  /**
   * 回收资源
   * 清理虚拟图形并从分组中移除
   * @param removeFromGroup - 是否从分组中移除，默认为false
   */
  recycle(removeFromGroup?: boolean): void;

  /**
   * 平移标签
   * @param offset - 偏移向量
   */
  translate(offset: Vector): void;

  /**
   * 绘制标签
   * 将标签的文本图形渲染到画布层
   * @param layer - 目标画布层
   */
  draw(layer: any): void;

  /**
   * 序列化为JSON对象
   * @returns 包含文本和偏移向量的JSON对象
   */
  toJSON(): LabelJSON;

  /**
   * 从JSON对象反序列化
   * @param data - 序列化的标签数据
   */
  deserialize(data: LabelJSON | null | undefined): void;
}