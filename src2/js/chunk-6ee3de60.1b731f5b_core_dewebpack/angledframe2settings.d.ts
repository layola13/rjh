/**
 * AngledFrame2Settings 模块
 * 提供倾斜框架2的设置管理功能
 */

import { FrameSettings } from './FrameSettings';
import { AngledHexagon2Poly } from './AngledHexagon2Poly';
import type { View } from './View';
import type { Frame } from './Frame';

/**
 * 倾斜框架2设置类
 * 继承自FrameSettings，管理倾斜六边形框架的各项属性
 */
export declare class AngledFrame2Settings extends FrameSettings {
  /**
   * 获取框架的多边形对象
   * @returns 框架关联的AngledHexagon2Poly实例
   */
  get poly(): AngledHexagon2Poly;

  /**
   * 获取多边形的高度
   * @returns 多边形当前高度值
   */
  get height(): number;

  /**
   * 设置多边形的高度
   * 会触发多边形重建、视图刷新和检查点记录
   * @param value - 新的高度值，必须大于等于(poly.height - poly.remainingHeight)
   */
  set height(value: number);

  /**
   * 获取是否为相切模式
   * @returns true表示相切模式，false表示非相切模式
   */
  get isTangency(): boolean;

  /**
   * 设置相切模式
   * 相切模式下会自动计算remainingWidth和左右弧高
   * 切换模式会显示/隐藏特定维度标注(dimType 3和5)
   * @param value - true启用相切模式，false禁用
   */
  set isTangency(value: boolean);

  /**
   * 获取左侧弧形高度
   * @returns 左侧弧形的高度值
   */
  get leftArcHeight(): number;

  /**
   * 设置左侧弧形高度
   * 仅在非相切模式下生效
   * 会触发多边形重建、视图刷新和检查点记录
   * @param value - 新的左侧弧形高度值
   */
  set leftArcHeight(value: number);

  /**
   * 获取右侧弧形高度
   * @returns 右侧弧形的高度值
   */
  get rightArcHeight(): number;

  /**
   * 设置右侧弧形高度
   * 仅在非相切模式下生效
   * 会触发多边形重建、视图刷新和检查点记录
   * @param value - 新的右侧弧形高度值
   */
  set rightArcHeight(value: number);
}