/**
 * WFASelectBound - 选中边界框绘制组件
 * 
 * 用于在 SVG 画布上绘制实体的选中边界框，支持旋转和动态更新。
 * 当字段变化时自动标记为脏状态并重绘。
 */

import { Vector2 } from './Vector2';
import { HSApp } from './HSApp';

/**
 * 边界框信息
 */
interface BoundInfo {
  /** 左边距（模型坐标） */
  left: number;
  /** 顶部距离（模型坐标） */
  top: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 旋转角度（度） */
  rotation: number;
}

/**
 * 屏幕坐标边界框
 */
interface ScreenBound {
  /** 左边距（屏幕坐标） */
  left: number;
  /** 顶部距离（屏幕坐标） */
  top: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 实体接口 - 包含位置、尺寸和墙面信息
 */
interface Entity {
  /** X 轴尺寸 */
  xSize: number;
  /** Y 轴尺寸 */
  ySize: number;
  /** X 坐标（中心点） */
  x: number;
  /** Y 坐标（中心点） */
  y: number;
  /** 墙面信息（可选） */
  wallFace?: {
    surfaceObj: {
      /** 获取表面法向量 */
      getNormal(): Vector2;
    };
  };
}

/**
 * 信号钩子接口
 */
interface SignalHook {
  /** 监听信号 */
  listen(signal: unknown, callback: () => void): void;
}

/**
 * SVG 上下文接口
 */
interface SVGContext {
  /** 创建矩形元素 */
  rect(width: number, height: number): SVGElement;
}

/**
 * SVG 图层接口
 */
interface SVGLayer {
  /** 添加子元素 */
  appendChild(element: SVGElement): void;
  /** 移除子元素 */
  removeChild(element: SVGElement): void;
}

/**
 * SVG 元素接口
 */
interface SVGElement {
  /** 移动到指定位置 */
  move(x: number, y: number): this;
  /** 设置属性 */
  attr(attributes: Record<string, string | number>): this;
  /** 移除元素 */
  remove(): void;
}

/**
 * SVG 矩阵接口
 */
interface SVGMatrix {
  /** 旋转变换 */
  rotate(angle: number, cx: number, cy: number): this;
}

/**
 * Gizmo 配置对象
 */
interface GizmoConfig {
  /** 字段变化信号 */
  signalFieldChanged: unknown;
}

/**
 * Gizmo 基类
 */
declare class GizmoBase {
  /** 实体对象 */
  protected entity: Entity;
  /** SVG 上下文 */
  protected context: SVGContext;
  /** SVG 图层 */
  protected layer: SVGLayer;
  /** 信号钩子 */
  protected signalHook: SignalHook;
  /** 脏标记 */
  protected dirty: boolean;

  constructor(entity: Entity, context: SVGContext, config: GizmoConfig);

  /** 绘制方法（由子类实现） */
  draw(args: unknown[]): void;

  /** 清理方法（由子类实现） */
  onCleanup(args: unknown[]): void;
}

/**
 * WFA 选中边界框 Gizmo
 * 
 * 继承自 HSApp.View.Base.Gizmo，负责绘制和更新实体的选中边界框。
 * 边界框会根据实体的位置、尺寸和旋转角度自动调整。
 */
export declare class WFASelectBound extends GizmoBase {
  /** SVG 矩形元素 */
  private element?: SVGElement;

  /**
   * 构造函数
   * @param entity - 实体对象
   * @param context - SVG 上下文
   * @param config - Gizmo 配置
   */
  constructor(entity: Entity, context: SVGContext, config: GizmoConfig);

  /**
   * 绘制边界框
   * 
   * 计算实体的边界框并在 SVG 画布上绘制。
   * 如果元素不存在则创建，否则更新现有元素的位置和变换。
   */
  draw(): void;

  /**
   * 清理资源
   * 
   * 移除 SVG 元素并清理引用。
   */
  onCleanup(): void;

  /**
   * 获取模型坐标系中的边界框
   * 
   * @returns 包含位置、尺寸和旋转信息的边界框对象
   * @private
   */
  private _getBound(): BoundInfo;

  /**
   * 将模型坐标边界框转换为屏幕坐标
   * 
   * @param bound - 模型坐标边界框
   * @returns 屏幕坐标边界框
   * @private
   */
  private _boundToScreen(bound: BoundInfo): ScreenBound;
}