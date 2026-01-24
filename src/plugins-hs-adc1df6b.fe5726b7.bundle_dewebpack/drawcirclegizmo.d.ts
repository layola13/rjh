/**
 * 绘制圆形Gizmo模块
 * 提供在草图编辑模式下绘制圆形的交互功能
 */

import { Vector2 } from './Vector2';
import { Styles } from './Styles';
import { Util } from './Util';
import { DrawExCircleGizmo } from './DrawExCircleGizmo';

/**
 * 圆形绘制Gizmo类
 * 继承自DrawExCircleGizmo，提供圆形绘制的预览、推断和验证功能
 */
export declare class DrawCircleGizmo extends DrawExCircleGizmo {
  /**
   * 上一次记录的鼠标位置
   * @private
   */
  private _lastPos?: Vector2;

  /**
   * 当前位置是否有效的缓存标志
   * @private
   */
  private _isPosValid?: boolean;

  /**
   * 当前路径点集合
   * 数组长度为2时表示圆心和边界点
   */
  path?: Vector2[];

  /**
   * 当前鼠标位置
   */
  pos: Vector2;

  /**
   * 是否处于预览模式
   */
  isPreview: boolean;

  /**
   * 预览元素（SVG圆形元素）
   */
  previewElement: PreviewCircleElement;

  /**
   * 画布实例
   */
  canvas: Canvas;

  /**
   * 关联的绘制命令
   */
  cmd: DrawCommand;

  /**
   * 推断引擎实例
   */
  inference: InferenceEngine;

  /**
   * 获取普通提示的国际化键名
   * @returns 提示文本的国际化key
   * @protected
   */
  protected _getNormalTipKey(): string;

  /**
   * 更新预览显示
   * 根据当前路径点和鼠标位置实时渲染圆形预览
   * 当位置无效时显示为错误样式
   */
  updatePreview(): void;

  /**
   * 获取笔形指示器样式
   * @returns 根据当前位置有效性返回对应的样式配置
   */
  getPenIndicatorStyle(): IndicatorStyle;

  /**
   * 检查当前鼠标位置是否有效
   * 使用缓存机制避免重复计算，无效条件为点在根板坯内部
   * @returns 位置有效性标志
   * @private
   */
  private _isCurrentPosValid(): boolean;

  /**
   * 更新推断引擎
   * 收集草图参考点和根板坯参考点用于智能捕捉
   */
  updateInference(): void;
}

/**
 * 预览圆形元素接口
 * 封装SVG圆形元素的操作方法
 */
interface PreviewCircleElement {
  /**
   * 设置圆心位置
   * @param x - 圆心X坐标
   * @param y - 圆心Y坐标
   */
  center(x: number, y: number): this;

  /**
   * 设置圆半径
   * @param radius - 半径值
   */
  radius(radius: number): this;

  /**
   * 应用样式属性
   * @param style - 样式对象
   */
  attr(style: Record<string, unknown>): this;

  /**
   * 显示元素
   */
  show(): this;

  /**
   * 隐藏元素
   */
  hide(): this;
}

/**
 * 画布接口
 * 提供坐标转换功能
 */
interface Canvas {
  /**
   * 将模型坐标转换为画布坐标
   * @param point - 模型坐标点
   * @returns 画布坐标点
   */
  modelPointToCanvas(point: Vector2): Vector2;
}

/**
 * 绘制命令接口
 */
interface DrawCommand {
  /**
   * 2D草图构建器
   */
  sketch2dBuilder: Sketch2dBuilder;
}

/**
 * 2D草图构建器接口
 */
interface Sketch2dBuilder {
  /**
   * 获取当前草图对象
   * @returns 草图实例或undefined
   */
  getSketch(): Sketch2d | undefined;
}

/**
 * 2D草图接口
 */
interface Sketch2d {
  // 草图数据结构
}

/**
 * 推断引擎接口
 * 用于智能捕捉和对齐
 */
interface InferenceEngine {
  /**
   * 设置角点参考点集合
   * @param points - 参考点数组
   */
  setCornerPoints(points: Vector2[]): void;
}

/**
 * 指示器样式配置
 */
interface IndicatorStyle {
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  [key: string]: unknown;
}