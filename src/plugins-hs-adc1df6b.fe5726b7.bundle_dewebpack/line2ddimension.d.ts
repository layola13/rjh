import { Loop, MathAlg, Vector2 } from './MathLibrary';
import { Line2dDimension as BaseLine2dDimension } from './GizmoBase';
import { outdoorTolerance } from './Constants';

/**
 * 2D线段标注类
 * 继承自基础的Line2dDimension，用于在2D草图中显示和管理线段的尺寸标注
 */
export declare class Line2dDimension extends BaseLine2dDimension {
  /**
   * 位置附近的查询结果
   * 包含标注点的目标位置信息
   */
  positionNearResult?: {
    /** 目标位置坐标 */
    to: { x: number; y: number };
  };

  /**
   * 草图构建器实例
   * 用于获取当前编辑的草图对象
   */
  sketchBuilder: {
    /**
     * 获取当前草图对象
     * @returns 包含背景区域的草图数据
     */
    getSketch(): {
      background: {
        /** 草图中的所有封闭区域 */
        regions: Array<{
          /** 区域的外轮廓点集 */
          outer: Array<Vector2>;
        }>;
      };
    };
  };

  /**
   * 位置标注对象
   * 负责标注的显示和绘制
   */
  positionDimension: {
    /** 隐藏标注 */
    hide(): void;
    /** 绘制标注 */
    draw(): void;
  };

  /**
   * 更新位置标注
   * 根据标注点相对于草图区域的位置关系，决定是否显示标注
   * 如果标注点在草图外轮廓外部，则隐藏并重新绘制标注
   * 
   * @param event - 触发更新的事件对象
   */
  protected _updatePositionDimension(event: unknown): void;
}