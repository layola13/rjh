declare module 'DrawRegularPolygonGizmo' {
  import { HSApp } from 'HSApp';

  /**
   * 绘制正多边形交互控制器
   * 
   * 继承自 DrawExRegularPolygonGizmo，用于在 2D 草图编辑器中绘制正多边形。
   * 提供正多边形绘制时的交互提示和操作行为。
   * 
   * @extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRegularPolygonGizmo
   */
  export class DrawRegularPolygonGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRegularPolygonGizmo {
    /**
     * 构造函数
     * 
     * 创建一个新的正多边形绘制交互控制器实例
     */
    constructor();

    /**
     * 获取普通提示文本的本地化键值
     * 
     * 返回用于显示绘制正多边形操作提示的国际化文本键。
     * 该键用于从语言资源文件中检索对应的提示文本。
     * 
     * @returns 本地化文本键 "slab_edit_sketch_draw_regular_polygon_tip"
     * @protected
     */
    protected _getNormalTipKey(): string;
  }
}

/**
 * HSApp 命名空间类型定义（如果尚未定义）
 */
declare namespace HSApp {
  namespace ExtraordinarySketch2d {
    namespace Gizmo {
      /**
       * 基础正多边形绘制交互控制器
       * 
       * 提供正多边形绘制的基础功能和交互行为
       */
      class DrawExRegularPolygonGizmo {
        constructor();
      }
    }
  }
}