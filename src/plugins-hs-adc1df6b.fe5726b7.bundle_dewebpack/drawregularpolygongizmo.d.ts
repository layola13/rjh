/**
 * DrawRegularPolygonGizmo - 绘制正多边形的操作控制器
 * 
 * 该模块提供了在2D草图中绘制正多边形的交互功能，
 * 继承自 DrawExRegularPolygonGizmo 基类，添加了位置验证和预览样式控制。
 */

import { Vector2 } from './Vector2';
import { Styles } from './Styles';
import { Util } from './Utils';
import type { HSApp } from './HSApp';

/**
 * 2D位置坐标接口
 */
interface Position2D {
  x: number;
  y: number;
}

/**
 * 草图元素接口
 */
interface Sketch2D {
  /** 获取草图的参考点集合 */
  getReferencePoints(): Vector2[];
}

/**
 * 草图构建器接口
 */
interface Sketch2DBuilder {
  /** 获取当前草图实例 */
  getSketch(): Sketch2D | null;
}

/**
 * 绘图命令接口
 */
interface DrawCommand {
  /** 2D草图构建器 */
  sketch2dBuilder: Sketch2DBuilder;
}

/**
 * 推理引擎接口 - 用于智能捕捉和参考点提示
 */
interface InferenceEngine {
  /** 设置角点集合用于推理计算 */
  setCornerPoints(points: Vector2[]): void;
}

/**
 * 预览元素接口
 */
interface PreviewElement {
  /** 设置元素样式属性 */
  attr(style: Record<string, unknown>): void;
}

/**
 * 笔触指示器样式类型
 */
type PenIndicatorStyle = Record<string, unknown>;

/**
 * 绘制正多边形的Gizmo控制器
 * 
 * 功能特性：
 * - 实时预览正多边形绘制
 * - 智能位置验证（避免在根板坯内部绘制）
 * - 参考点推理和智能捕捉
 * - 动态笔触指示器样式
 */
export class DrawRegularPolygonGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRegularPolygonGizmo {
  /**
   * 上一次记录的位置坐标
   * @private
   */
  private _lastPos?: Vector2;

  /**
   * 当前位置是否有效的缓存标记
   * @private
   */
  private _isPosValid?: boolean;

  /**
   * 当前鼠标/笔触位置
   */
  protected pos: Position2D;

  /**
   * 预览元素实例
   */
  protected previewElement?: PreviewElement;

  /**
   * 绘图命令对象
   */
  protected cmd: DrawCommand;

  /**
   * 推理引擎实例
   */
  protected inference: InferenceEngine;

  /**
   * 获取普通提示文本的本地化键名
   * @returns 本地化键值
   * @protected
   */
  protected _getNormalTipKey(): string {
    return 'slab_edit_sketch_draw_regular_polygon_tip';
  }

  /**
   * 更新预览显示
   * 
   * 根据当前位置的有效性应用不同的预览样式：
   * - 有效位置：使用标准预览样式
   * - 无效位置：使用无效预览样式（如红色警告）
   */
  public updatePreview(): void {
    super.updatePreview();

    if (this._isCurrentPosValid()) {
      this.previewElement?.attr(Styles.previewPathStyle);
    } else {
      this.previewElement?.attr(Styles.invalidPreviewPathStyle);
    }
  }

  /**
   * 获取笔触指示器的样式配置
   * 
   * @returns 根据位置有效性返回对应的指示器样式
   */
  public getPenIndicatorStyle(): PenIndicatorStyle {
    if (this._isCurrentPosValid()) {
      return super.getPenIndicatorStyle();
    }
    return Styles.intersectIndicatorStyle;
  }

  /**
   * 检查当前位置是否有效
   * 
   * 验证规则：
   * - 位置不能在根板坯（root slab）内部
   * - 使用缓存机制避免重复计算
   * 
   * @returns true 表示位置有效，false 表示位置无效
   * @private
   */
  private _isCurrentPosValid(): boolean {
    const currentPos = new Vector2(this.pos);

    // 位置未变化时使用缓存结果
    if (this._lastPos && currentPos.equals(this._lastPos)) {
      return this._isPosValid!;
    }

    // 更新缓存并重新验证
    this._lastPos = currentPos;
    this._isPosValid = !Util.isPointInSideRootSlab(this.pos);

    return this._isPosValid;
  }

  /**
   * 更新推理引擎的参考点集合
   * 
   * 收集以下参考点用于智能捕捉：
   * - 当前草图中的所有参考点
   * - 根板坯的参考点
   */
  public updateInference(): void {
    super.updateInference();

    const sketch = this.cmd.sketch2dBuilder.getSketch();
    if (!sketch) {
      return;
    }

    // 收集草图参考点
    const referencePoints = HSCore.Util.ExtraordinarySketch2d.getReferencePoints(sketch);

    // 添加根板坯参考点
    const rootSlabPoints = Util.getRootSlabReferencePoints();
    referencePoints.push(...rootSlabPoints);

    // 更新推理引擎
    this.inference.setCornerPoints(referencePoints);
  }
}