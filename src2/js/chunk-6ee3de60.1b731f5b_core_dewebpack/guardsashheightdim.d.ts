import type { Point } from './Point';
import type { Polygon } from './Polygon';
import type { BoundingBox } from './BoundingBox';
import type { View } from './View';
import { Dimension } from './Dimension';

/**
 * 防护窗扇高度标注类
 * 用于标注和编辑防护窗扇的高度尺寸
 */
export class GuardSashHeightDim extends Dimension {
  /**
   * 关联的窗扇对象
   */
  private readonly sash: Sash;

  /**
   * 标注起点坐标
   */
  from?: Point;

  /**
   * 标注终点坐标
   */
  to?: Point;

  /**
   * 创建防护窗扇高度标注实例
   * @param sash - 要标注的窗扇对象
   */
  constructor(sash: Sash) {
    super(sash);
    this.sash = sash;
  }

  /**
   * 定位标注线的起点和终点
   * 仅当窗扇多边形为矩形时生效
   */
  locate(): void {
    if (!this.sash.polygon.isRectangle()) {
      return;
    }

    const boundingBox: BoundingBox = this.sash.polygon.box;
    const centerX = boundingBox.center.x;
    const maxY = boundingBox.ymax;

    this.from = {
      x: centerX,
      y: maxY
    };

    this.to = {
      x: centerX,
      y: maxY - this.sash.height
    };
  }

  /**
   * 编辑标注时触发的回调
   * 更新窗扇高度并刷新视图
   * @param newHeight - 新的高度值
   * @param context - 编辑上下文（未使用）
   */
  onEdit(newHeight: number, context?: unknown): void {
    const view: View = this.sash.topFrame.view;

    this.sash.height = newHeight;
    this.sash.updatePoly();
    this.sash.draw(view);
    view.refresh();
  }
}

/**
 * 窗扇接口
 * 定义窗扇对象的基本结构
 */
interface Sash {
  /**
   * 窗扇的多边形形状
   */
  polygon: Polygon;

  /**
   * 窗扇高度
   */
  height: number;

  /**
   * 顶部框架对象
   */
  topFrame: TopFrame;

  /**
   * 更新多边形形状
   */
  updatePoly(): void;

  /**
   * 绘制窗扇
   * @param view - 视图对象
   */
  draw(view: View): void;
}

/**
 * 顶部框架接口
 */
interface TopFrame {
  /**
   * 关联的视图对象
   */
  view: View;
}