/**
 * CSS模块类型定义
 * 用于描述可拖拽容器的样式类
 */

/**
 * 可拖拽容器的CSS类名映射
 */
export interface DraggableContainerStyles {
  /**
   * 可拖拽容器的主要样式类
   * - 绝对定位
   * - 高度30px，行高30px
   * - 移动光标
   * - z-index: 1050
   */
  draggableContainer: string;
}

/**
 * 导出的CSS模块对象
 */
declare const styles: DraggableContainerStyles;

export default styles;