/**
 * 自定义构件装饰器类型定义
 * 用于在SVG图层上渲染自定义构件（方柱、圆柱、烟道、立管等）的装饰图形
 */

import type { Matrix } from '@svgdotjs/svg.js';

/**
 * 实体类别常量
 */
declare enum ModelClass {
  /** 自定义方柱 */
  NCustomizedSquareColumn = 'NCustomizedSquareColumn',
  /** 自定义圆柱 */
  NCustomizedCircleColumn = 'NCustomizedCircleColumn',
  /** 自定义烟道 */
  NCustomizedFlue = 'NCustomizedFlue',
  /** 自定义立管 */
  NCustomizedRiser = 'NCustomizedRiser',
}

/**
 * 二维向量
 */
interface Vector2 {
  x: number;
  y: number;
}

/**
 * 尺寸信息
 */
interface Size {
  width: number;
  height: number;
}

/**
 * 全局边界信息
 */
interface GlobalBound {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * 实体基础属性
 */
interface Entity {
  /** 实体类别 */
  _Class: ModelClass;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** 旋转角度（度） */
  rotation: number;
  /** 翻转状态（0=正常, 1=翻转） */
  flip: 0 | 1;
}

/**
 * 显示对象
 */
interface DisplayObject {
  /** 关联的实体对象 */
  entity: Entity;
}

/**
 * 颜色配置
 */
interface ColorConfig {
  /** 描边颜色 */
  strokeColor: string;
  /** 填充颜色 */
  fillColor: string;
  /** 填充透明度（0-1） */
  fillOpacity?: number;
  /** 描边虚线样式 */
  strokeDashArray?: string;
}

/**
 * SVG元素属性
 */
interface SVGElementAttributes {
  /** 描边颜色 */
  stroke?: string;
  /** 描边宽度 */
  'stroke-width'?: number;
  /** 描边连接样式 */
  'stroke-linejoin'?: string;
  /** 填充颜色 */
  fill?: string;
  /** 填充透明度 */
  'fill-opacity'?: number;
  /** 描边透明度 */
  'stroke-opacity'?: number;
  /** 整体透明度 */
  opacity?: number;
  /** 描边虚线数组 */
  'stroke-dasharray'?: string;
  /** 指针事件 */
  'pointer-events'?: string;
  /** 变换矩阵 */
  transform?: Matrix;
  /** X坐标 */
  x?: number;
  /** Y坐标 */
  y?: number;
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
}

/**
 * SVG元素接口
 */
interface SVGElement {
  /** 设置属性 */
  attr(attributes: SVGElementAttributes): this;
  /** 设置填充 */
  fill(config: { color: string; opacity: number } | SVGElementAttributes): this;
  /** 显示元素 */
  show(): this;
  /** 隐藏元素 */
  hide(): this;
  /** 设置圆心位置 */
  center?(x: number, y: number): this;
}

/**
 * SVG容器组
 */
interface SVGGroup extends SVGElement {
  /** 添加子元素 */
  appendChild(child: SVGElement, zIndex?: number): void;
  /** 移除所有子元素 */
  removeAllChildren(): void;
  /** 获取所有子元素 */
  children(): SVGElement[];
}

/**
 * SVG图层
 */
interface SVGLayer {
  /** 添加子元素 */
  appendChild(child: SVGElement | SVGGroup, zIndex?: number): void;
  /** 移除子元素 */
  removeChild(child: SVGElement | SVGGroup): void;
}

/**
 * SVG上下文（绘图工厂）
 */
interface SVGContext {
  /** 创建矩形 */
  rect(width: number, height: number): SVGElement;
  /** 创建圆形 */
  circle(diameter: number): SVGElement;
  /** 创建路径 */
  path(pathData: string): SVGElement;
  /** 创建折线 */
  polyline(points: string): SVGElement;
  /** 创建容器组 */
  group(): SVGGroup;
}

/**
 * 基础Gizmo类
 */
declare class BaseGizmo {
  /** SVG上下文 */
  protected context: SVGContext;
  /** 图层 */
  protected layer: SVGLayer;
  
  constructor(context: SVGContext, layer: SVGLayer, entity: Entity);
  
  /** 显示装饰器 */
  show(): void;
  /** 隐藏装饰器 */
  hide(): void;
}

/**
 * 自定义构件装饰器
 * 根据构件类型渲染不同的SVG图形（方柱、圆柱、烟道、立管等）
 */
export default class CustomizedComponentGizmo extends BaseGizmo {
  /** 显示对象 */
  private readonly displayObj: DisplayObject;
  
  /** 颜色配置 */
  private readonly color: ColorConfig;
  
  /** 边框元素集合 */
  private _borderElements: SVGElement[];
  
  /** 填充元素集合 */
  private _borderFillElements: SVGElement[];
  
  /** 基础尺寸（未缩放前的标准尺寸） */
  private _baseSize: Size;
  
  /** 根节点容器 */
  private _node: SVGGroup;

  /**
   * 构造函数
   * @param context - SVG绘图上下文
   * @param layer - SVG图层
   * @param displayObj - 显示对象
   * @param colorConfig - 颜色配置
   */
  constructor(
    context: SVGContext,
    layer: SVGLayer,
    displayObj: DisplayObject,
    colorConfig: ColorConfig
  );

  /**
   * 清理资源
   * 移除所有已创建的SVG元素并重置状态
   */
  onCleanup(): void;

  /**
   * 绘制装饰器
   * 根据构件类型添加对应的SVG图标
   */
  draw(): void;

  /**
   * 显示装饰器
   */
  show(): void;

  /**
   * 隐藏装饰器
   */
  hide(): void;

  /**
   * 根据实体类型添加对应的SVG图标
   * 支持方柱、圆柱、烟道、立管和通用内容
   */
  private addSVGIcon(): void;

  /**
   * 绘制方柱
   * @param strokeAttrs - 描边属性
   * @param fillAttrs - 填充属性
   */
  private squareColumn(
    strokeAttrs: SVGElementAttributes,
    fillAttrs: SVGElementAttributes
  ): void;

  /**
   * 绘制圆柱
   * @param strokeAttrs - 描边属性
   * @param fillAttrs - 填充属性
   */
  private circleColumn(
    strokeAttrs: SVGElementAttributes,
    fillAttrs: SVGElementAttributes
  ): void;

  /**
   * 绘制烟道
   * 包含外框、内框和装饰线
   * @param strokeAttrs - 描边属性
   * @param fillAttrs - 填充属性
   */
  private flue(
    strokeAttrs: SVGElementAttributes,
    fillAttrs: SVGElementAttributes
  ): void;

  /**
   * 绘制立管
   * 包含外框和内框
   * @param strokeAttrs - 描边属性
   * @param fillAttrs - 填充属性
   */
  private riser(
    strokeAttrs: SVGElementAttributes,
    fillAttrs: SVGElementAttributes
  ): void;

  /**
   * 绘制通用内容
   * 使用实体的全局边界创建矩形
   * @param strokeAttrs - 描边属性
   * @param fillAttrs - 填充属性
   */
  private content(
    strokeAttrs: SVGElementAttributes,
    fillAttrs: SVGElementAttributes
  ): void;

  /**
   * 应用变换到SVG元素
   * 处理位置、尺寸、旋转和翻转
   * @param element - 要变换的SVG元素
   * @param bound - 全局边界信息
   */
  private _applyTransform(element: SVGElement, bound: GlobalBound): void;

  /**
   * 计算世界变换矩阵
   * 综合考虑平移、旋转和缩放
   * @returns 变换矩阵
   */
  private _worldMatrix(): Matrix;
}