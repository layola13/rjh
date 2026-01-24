/**
 * Ear2FrameSettings模块
 * 用于管理耳片框架(Ear2Frame)的设置属性，包括翻转、基础设置和拉伸高度
 */

import { FrameSettings } from './FrameSettings';

/**
 * 多边形接口
 * 描述框架的多边形属性
 */
interface IPolygon {
  /** X轴翻转状态 */
  xFlip: boolean;
  /** Y轴翻转状态 */
  yFlip: boolean;
  /** 是否有基础 */
  hasBase: boolean;
  /** 是否为垂直方向 */
  isVertical: boolean;
  /** 拉伸高度数组 [底部, 顶部] */
  pullingHeight: [number, number];
  /** 执行X轴翻转操作 */
  flipX(): IPolygon;
  /** 执行Y轴翻转操作 */
  flipY(): IPolygon;
}

/**
 * 框架管理器接口
 */
interface IFrameManager {
  /** 重新创建框架 */
  recreated(polygon: IPolygon, view: IView): void;
}

/**
 * 图层接口
 */
interface ILayer {
  /** 批量绘制 */
  batchDraw(): void;
}

/**
 * Memento管理器接口（用于撤销/重做）
 */
interface IMomentoManager {
  /** 创建检查点 */
  checkPoint(): void;
}

/**
 * 视图接口
 */
interface IView {
  /** 当前活动图层 */
  activeLayer: ILayer;
  /** Memento管理器 */
  mometoManager: IMomentoManager;
}

/**
 * 框架接口
 */
interface IFrame {
  /** 框架的多边形对象 */
  polygon: IPolygon;
  /** 框架管理器 */
  frameManager: IFrameManager;
  /** 隐藏辅助元素 */
  hideAssist(): void;
}

/**
 * Ear2框架设置类
 * 扩展自FrameSettings，提供耳片框架特定的设置功能
 */
export class Ear2FrameSettings extends FrameSettings {
  /** 框架对象 */
  protected frame!: IFrame;
  /** 视图对象 */
  protected view!: IView;

  /**
   * 获取框架的多边形对象
   */
  protected get poly(): IPolygon {
    return this.frame.polygon;
  }

  /**
   * X轴翻转状态
   * @description 获取或设置多边形在X轴上的翻转状态
   */
  get xFlip(): boolean {
    return this.poly.xFlip;
  }

  set xFlip(value: boolean) {
    if (this.poly.xFlip !== value) {
      const flippedPoly = this.poly.flipX();
      this.frame.frameManager.recreated(flippedPoly, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Y轴翻转状态
   * @description 获取或设置多边形在Y轴上的翻转状态
   */
  get yFlip(): boolean {
    return this.poly.yFlip;
  }

  set yFlip(value: boolean) {
    if (this.poly.yFlip !== value) {
      const flippedPoly = this.poly.flipY();
      this.frame.frameManager.recreated(flippedPoly, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 基础状态
   * @description 获取或设置多边形是否有基础（仅在垂直方向时有效）
   */
  get hasBase(): boolean {
    return this.poly.hasBase;
  }

  set hasBase(value: boolean) {
    if (this.poly.isVertical) {
      this.poly.hasBase = value;
      this.poly.pullingHeight[1] = 0;
      this.frame.frameManager.recreated(this.poly, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 拉伸高度
   * @description 获取或设置多边形的拉伸高度（顶部）
   * 仅在没有基础且为垂直方向时可设置
   */
  get pullingHeight(): number {
    return this.poly.pullingHeight[1];
  }

  set pullingHeight(value: number) {
    if (!this.hasBase && this.poly.isVertical && value >= 0 && value !== this.pullingHeight) {
      this.poly.pullingHeight[1] = value;
      this.frame.frameManager.recreated(this.poly, this.view);
      this.frame.hideAssist();
      this.view.activeLayer.batchDraw();
      this.view.mometoManager.checkPoint();
    }
  }
}