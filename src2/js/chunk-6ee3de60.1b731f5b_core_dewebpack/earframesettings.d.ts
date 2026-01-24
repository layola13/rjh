/**
 * 耳朵框架设置类型定义
 * @module EarFrameSettings
 */

import { FrameSettings } from './FrameSettings';
import { Direction } from './Direction';

/**
 * 多边形接口，定义耳朵框架的几何形状
 */
export interface IPolygon {
  /** 水平翻转状态 */
  xFlip: boolean;
  /** 垂直翻转状态 */
  yFlip: boolean;
  /** 是否有底座 */
  hasBase: boolean;
  /** 拉伸高度数组 [起始高度, 当前高度] */
  pullingHeight: [number, number];
  /** 是否为垂直方向 */
  isVertical: boolean;
  
  /**
   * 执行水平翻转操作
   * @returns 翻转后的多边形实例
   */
  flipX(): IPolygon;
  
  /**
   * 执行垂直翻转操作
   * @returns 翻转后的多边形实例
   */
  flipY(): IPolygon;
}

/**
 * 框架对象接口
 */
export interface IFrame {
  /** 框架的多边形几何数据 */
  polygon: IPolygon;
  /** 框架管理器 */
  frameManager: IFrameManager;
  
  /**
   * 隐藏辅助视图
   */
  hideAssist(): void;
}

/**
 * 框架管理器接口
 */
export interface IFrameManager {
  /**
   * 重新创建框架
   * @param polygon - 新的多边形数据
   * @param view - 视图实例
   */
  recreated(polygon: IPolygon, view: IView): void;
}

/**
 * 图层接口
 */
export interface ILayer {
  /**
   * 批量重绘图层
   */
  batchDraw(): void;
}

/**
 * 历史记录管理器接口
 */
export interface IMomentoManager {
  /**
   * 记录当前状态检查点
   */
  checkPoint(): void;
}

/**
 * 视图接口
 */
export interface IView {
  /** 当前活动图层 */
  activeLayer: ILayer;
  /** 历史记录管理器 */
  mometoManager: IMomentoManager;
}

/**
 * 耳朵框架设置类
 * 继承自FrameSettings，提供耳朵形状的专属配置选项
 */
export declare class EarFrameSettings extends FrameSettings {
  /** 当前框架对象 */
  protected frame: IFrame;
  /** 当前视图对象 */
  protected view: IView;

  /**
   * 获取框架的多边形对象
   * @readonly
   */
  get poly(): IPolygon;

  /**
   * 获取或设置水平翻转状态
   * 设置时会触发框架重建、隐藏辅助视图、重绘图层并记录检查点
   */
  get xFlip(): boolean;
  set xFlip(value: boolean);

  /**
   * 获取或设置垂直翻转状态
   * 设置时会触发框架重建、隐藏辅助视图、重绘图层并记录检查点
   */
  get yFlip(): boolean;
  set yFlip(value: boolean);

  /**
   * 获取或设置是否有底座
   * 仅在非垂直翻转状态下可设置
   * 设置时会重置拉伸高度为0，并触发框架重建
   */
  get hasBase(): boolean;
  set hasBase(value: boolean);

  /**
   * 获取或设置拉伸高度
   * 仅在有底座且非垂直翻转状态下可设置
   * 值必须大于等于0且不同于当前值
   */
  get pullingHeight(): number;
  set pullingHeight(value: number);

  /**
   * 获取耳朵的位置方向
   * 根据垂直/水平状态和翻转状态计算：
   * - 垂直且垂直翻转: 向下
   * - 垂直且非垂直翻转: 向上
   * - 水平且水平翻转: 向左
   * - 水平且非水平翻转: 向右
   * @readonly
   */
  get earPosition(): Direction;
}