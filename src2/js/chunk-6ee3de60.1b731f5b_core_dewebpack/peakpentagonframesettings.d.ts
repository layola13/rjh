/**
 * 峰值五边形框架设置模块
 * 用于管理和配置峰值五边形形状的属性
 */

import { FrameSettings } from './FrameSettings';
import { PeakPentagonPoly } from './PeakPentagonPoly';

/**
 * 峰值五边形框架设置类
 * 继承自FrameSettings，提供对五边形多边形的高度和三角形高度的配置能力
 */
export declare class PeakPentagonFrameSettings extends FrameSettings {
  /**
   * 获取当前框架的多边形对象
   * @returns 返回PeakPentagonPoly实例
   */
  get poly(): PeakPentagonPoly;

  /**
   * 获取多边形的高度
   * @returns 当前多边形高度值
   */
  get height(): number;

  /**
   * 设置多边形的高度
   * 更新高度后会重新创建多边形、隐藏辅助线、刷新总高度并重绘图层
   * @param value - 新的高度值
   */
  set height(value: number);

  /**
   * 获取三角形的高度（峰值部分的高度）
   * @returns 当前三角形高度值
   */
  get triangleHeight(): number;

  /**
   * 设置三角形的高度（峰值部分的高度）
   * 更新三角形高度后会重新创建多边形、隐藏辅助线并重绘图层
   * @param value - 新的三角形高度值
   */
  set triangleHeight(value: number);
}