/**
 * 半圆形框架设置模块
 * 提供半圆形框架的配置和属性管理功能
 */

import { FrameSettings } from './FrameSettings';
import type { Polygon } from './Polygon';
import type { View } from './View';

/**
 * 半圆形框架设置类
 * 继承自基础框架设置，提供半圆形特有的配置选项
 */
export class HalfCircleFrameSettings extends FrameSettings {
  /**
   * 获取框架的多边形对象
   * @returns 框架关联的多边形实例
   */
  get poly(): Polygon {
    return this.frame.polygon;
  }

  /**
   * 获取底部是否隐藏的状态
   * @returns true表示底部已隐藏，false表示底部可见
   */
  get bottomHidden(): boolean {
    return this.poly.bottomHidden;
  }

  /**
   * 设置底部的隐藏状态
   * 更改此属性会触发框架重建、隐藏辅助线、重绘图层并创建检查点
   * @param value - true隐藏底部，false显示底部
   */
  set bottomHidden(value: boolean) {
    this.poly.bottomHidden = value;
    this.frame.frameManager.recreated(this.poly, this.view);
    this.frame.hideAssist();
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }
}

/**
 * 类型定义补充
 */

/**
 * 多边形接口
 */
interface Polygon {
  /** 底部是否隐藏 */
  bottomHidden: boolean;
}

/**
 * 视图接口
 */
interface View {
  /** 当前活动图层 */
  activeLayer: {
    /** 批量绘制方法 */
    batchDraw(): void;
  };
  /** 备忘录管理器 */
  mometoManager: {
    /** 创建检查点 */
    checkPoint(): void;
  };
}

/**
 * 框架接口扩展
 */
declare module './FrameSettings' {
  interface FrameSettings {
    /** 关联的框架实例 */
    frame: {
      /** 框架的多边形 */
      polygon: Polygon;
      /** 框架管理器 */
      frameManager: {
        /** 重新创建框架 */
        recreated(polygon: Polygon, view: View): void;
      };
      /** 隐藏辅助元素 */
      hideAssist(): void;
    };
    /** 关联的视图实例 */
    view: View;
  }
}