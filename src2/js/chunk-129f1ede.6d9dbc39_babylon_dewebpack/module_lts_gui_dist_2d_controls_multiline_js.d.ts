/**
 * 多线段控件模块
 * 用于在2D GUI中绘制连接多个点的线段
 */

import { AbstractMesh } from "core/Misc/observable";
import { serialize, RegisterClass } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control.js";
import { MultiLinePoint } from "../../../lts/gui/dist/2D/multiLinePoint.js";

/**
 * 表示可以作为多线段点的坐标对象
 */
export interface IPointCoordinates {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 多线段点的输入类型
 * 可以是网格、控件或坐标对象
 */
export type MultiLinePointInput = AbstractMesh | Control | IPointCoordinates;

/**
 * 多线段控件类
 * 用于在2D GUI中绘制连接多个点（网格、控件或坐标）的线段
 * @extends Control
 */
export declare class MultiLine extends Control {
  /** 控件名称 */
  name: string;

  /** 线宽（像素） */
  private _lineWidth: number;

  /** 虚线样式数组，例如 [5, 10] 表示5像素实线，10像素空白 */
  private _dash: number[];

  /** 存储所有多线段点的数组 */
  private _points: MultiLinePoint[];

  /** 所有点中的最小X坐标 */
  private _minX: number | null;

  /** 所有点中的最小Y坐标 */
  private _minY: number | null;

  /** 所有点中的最大X坐标 */
  private _maxX: number | null;

  /** 所有点中的最大Y坐标 */
  private _maxY: number | null;

  /**
   * 当点更新时触发的回调函数
   * 标记控件为脏状态以触发重绘
   */
  onPointUpdate: () => void;

  /**
   * 构造函数
   * @param name - 控件名称
   */
  constructor(name: string);

  /**
   * 获取或设置虚线样式
   * @remarks
   * 数组中的数字交替表示实线和空白的长度（像素）
   * 例如：[5, 10] 表示5像素实线，10像素空白
   */
  @serialize()
  get dash(): number[];
  set dash(value: number[]);

  /**
   * 获取指定索引位置的多线段点
   * 如果该位置尚未创建点，则自动创建
   * @param index - 点的索引位置
   * @returns 指定索引的多线段点对象
   */
  getAt(index: number): MultiLinePoint;

  /**
   * 批量添加多个点到多线段
   * @param points - 要添加的点数组（网格、控件或坐标对象）
   * @returns 添加的MultiLinePoint对象数组
   */
  add(...points: MultiLinePointInput[]): MultiLinePoint[];

  /**
   * 向多线段末尾追加一个点
   * @param point - 要追加的点（网格、控件或坐标对象）
   * @returns 新创建的MultiLinePoint对象
   */
  push(point: MultiLinePointInput | null | undefined): MultiLinePoint;

  /**
   * 移除指定的点
   * @param indexOrPoint - 点的索引或MultiLinePoint对象
   */
  remove(indexOrPoint: number | MultiLinePoint): void;

  /**
   * 清空所有点
   */
  reset(): void;

  /**
   * 重置所有点的链接关系
   * 清除点与网格或控件的关联
   */
  resetLinks(): void;

  /**
   * 获取或设置线宽
   * @remarks
   * 单位为像素，影响线段的粗细
   */
  get lineWidth(): number;
  set lineWidth(value: number);

  /**
   * 设置水平对齐方式
   * @remarks
   * 多线段控件不支持水平对齐，此setter为空实现
   */
  set horizontalAlignment(value: number);

  /**
   * 设置垂直对齐方式
   * @remarks
   * 多线段控件不支持垂直对齐，此setter为空实现
   */
  set verticalAlignment(value: number);

  /**
   * 获取控件类型名称
   * @returns 返回 "MultiLine"
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * 绘制多线段到画布
   * @param context - 2D渲染上下文
   * @internal
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * 额外的处理逻辑
   * 计算所有点的边界框（最小/最大X、Y坐标）
   * @internal
   */
  protected _additionalProcessing(): void;

  /**
   * 测量控件尺寸
   * 根据点的边界框和线宽计算控件的宽度和高度
   * @internal
   */
  protected _measure(): void;

  /**
   * 计算控件对齐位置
   * 根据最小X、Y坐标和线宽设置控件的左上角位置
   * @internal
   */
  protected _computeAlignment(): void;

  /**
   * 释放控件资源
   * 清空所有点并调用父类的dispose方法
   */
  dispose(): void;
}

/**
 * 注册MultiLine类到Babylon.js类型系统
 * @internal
 */
RegisterClass("BABYLON.GUI.MultiLine", MultiLine);