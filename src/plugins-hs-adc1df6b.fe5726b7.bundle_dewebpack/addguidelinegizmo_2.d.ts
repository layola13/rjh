/**
 * AddGuideLineGizmo 模块
 * 
 * 提供在 2D 草图编辑模式下添加辅助线的 Gizmo 功能
 * 继承自 HSApp.ExtraordinarySketch2d.Gizmo.AddExGuideLineGizmo
 * 
 * @module AddGuideLineGizmo
 * @moduleId 355117
 */

declare namespace HSApp.ExtraordinarySketch2d.Gizmo {
  /**
   * 基础辅助线 Gizmo 类
   * 提供添加扩展辅助线的基础功能
   */
  export class AddExGuideLineGizmo {
    constructor();
  }
}

/**
 * 添加辅助线 Gizmo 类
 * 
 * 用于在平板编辑草图模式下添加辅助线的交互工具
 * 扩展了基础的 AddExGuideLineGizmo 功能，提供自定义的提示信息
 * 
 * @example
 *