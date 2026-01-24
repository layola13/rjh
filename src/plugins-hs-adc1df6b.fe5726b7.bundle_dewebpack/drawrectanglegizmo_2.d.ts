/**
 * 绘制矩形工具类型定义
 * @module DrawRectangleGizmo
 */

import { Vector2 } from './Vector2';
import { Sketch2dBuilder } from './Sketch2dBuilder';
import { Inference } from './Inference';

/**
 * 样式配置接口
 */
interface Styles {
  /** 预览路径样式 */
  previewPathStyle: Record<string, unknown>;
  /** 无效预览路径样式 */
  invalidPreviewPathStyle: Record<string, unknown>;
  /** 相交指示器样式 */
  intersectIndicatorStyle: Record<string, unknown>;
}

/**
 * 工具类接口
 */
interface Util {
  /**
   * 判断点是否在根板内部
   * @param pos - 二维坐标点
   * @returns 是否在板内
   */
  isPointInSideRootSlab(pos: Vector2): boolean;
  
  /**
   * 获取根板参考点集合
   * @returns 参考点数组
   */
  getRootSlabReferencePoints(): Vector2[];
}

/**
 * 草图2D相关工具接口
 */
interface ExtraordinarySketch2dUtil {
  /**
   * 获取草图的参考点
   * @param sketch - 草图对象
   * @returns 参考点数组
   */
  getReferencePoints(sketch: unknown): Vector2[];
}

/**
 * 命令对象接口
 */
interface Command {
  /** 草图2D构建器 */
  sketch2dBuilder: Sketch2dBuilder;
}

/**
 * 预览元素接口
 */
interface PreviewElement {
  /**
   * 设置元素属性
   * @param attrs - 属性对象
   */
  attr(attrs: Record<string, unknown>): void;
}

/**
 * 基础矩形绘制工具类
 */
declare class DrawExRectangleGizmo {
  /** 当前鼠标位置 */
  protected pos: Vector2;
  /** 预览元素 */
  protected previewElement?: PreviewElement;
  /** 推断辅助器 */
  protected inference: Inference;
  /** 命令对象 */
  protected cmd: Command;

  /**
   * 更新预览显示
   * @param args - 可选参数
   */
  protected updatePreview(args: unknown[]): void;

  /**
   * 获取笔指示器样式
   * @param args - 可选参数
   * @returns 样式对象
   */
  protected getPenIndicatorStyle(args: unknown[]): Record<string, unknown>;

  /**
   * 更新推断辅助线
   * @param args - 可选参数
   */
  protected updateInference(args: unknown[]): void;
}

/**
 * 绘制矩形工具类
 * 扩展自基础矩形绘制工具，用于在草图中绘制矩形
 */
export declare class DrawRectangleGizmo extends DrawExRectangleGizmo {
  /** 上次记录的鼠标位置 */
  private _lastPos?: Vector2;
  
  /** 当前位置是否有效的缓存标志 */
  private _isPosValid?: boolean;

  /**
   * 构造函数
   * @param args - 可变参数列表
   */
  constructor(...args: unknown[]);

  /**
   * 获取普通提示文本的国际化键名
   * @returns 提示文本键
   * @protected
   */
  protected _getNormalTipKey(): string;

  /**
   * 更新预览图形
   * 根据当前位置有效性设置不同的预览样式
   * @override
   */
  updatePreview(): void;

  /**
   * 获取笔指示器样式
   * 根据当前位置有效性返回不同的指示器样式
   * @returns 样式对象
   * @override
   */
  getPenIndicatorStyle(): Record<string, unknown>;

  /**
   * 检查当前位置是否有效
   * 判断当前鼠标位置是否在根板外部（外部为有效）
   * @returns 位置是否有效
   * @private
   */
  private _isCurrentPosValid(): boolean;

  /**
   * 更新推断辅助线
   * 根据草图和根板的参考点更新推断系统
   * @override
   */
  updateInference(): void;
}