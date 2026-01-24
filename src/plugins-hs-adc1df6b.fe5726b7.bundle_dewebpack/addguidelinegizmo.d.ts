/**
 * AddGuideLineGizmo - 草图辅助线添加工具
 * 
 * 用于在 2D 草图编辑模式下添加辅助线的 Gizmo 控制器。
 * 继承自 HSApp.ExtraordinarySketch2d.Gizmo.AddExGuideLineGizmo 基类。
 * 
 * @module AddGuideLineGizmo
 */

import type { HSApp } from './HSApp';

/**
 * 辅助线添加 Gizmo 类
 * 
 * 提供在板材编辑草图中添加辅助线的交互功能。
 * 重写了父类的提示信息键值，以显示特定于板材编辑场景的操作提示。
 * 
 * @extends {HSApp.ExtraordinarySketch2d.Gizmo.AddExGuideLineGizmo}
 */
export declare class AddGuideLineGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.AddExGuideLineGizmo {
  /**
   * 构造函数
   * 
   * 创建一个新的辅助线添加 Gizmo 实例。
   * 参数通过父类构造函数处理。
   */
  constructor(...args: any[]);

  /**
   * 获取普通提示的国际化键值
   * 
   * 返回用于显示操作提示的 i18n 键，该键对应的文本
   * 会在用户使用辅助线工具时显示在界面上。
   * 
   * @returns {string} 国际化键值 "slab_edit_sketch_add_guideline_tip"
   * @protected
   */
  protected _getNormalTipKey(): string;
}