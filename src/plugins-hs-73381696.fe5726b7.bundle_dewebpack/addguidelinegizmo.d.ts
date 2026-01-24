/**
 * 添加辅助线工具模块
 * @module AddGuideLineGizmo
 */

import { HSApp } from './path/to/HSApp';

/**
 * 添加辅助线工具类
 * 继承自 ExtraordinarySketch2d 的 AddExGuideLineGizmo，用于在 2D 草图中添加辅助线
 */
export declare class AddGuideLineGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.AddExGuideLineGizmo {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 获取普通提示文本的键名
   * @returns 返回辅助线编辑提示的本地化键
   * @protected
   */
  protected _getNormalTipKey(): string;
}