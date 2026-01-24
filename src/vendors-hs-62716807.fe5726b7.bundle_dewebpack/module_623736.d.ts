/**
 * 树形组件拖放指示器的偏移量常量
 * 用于调整拖放指示线的位置
 */
export const offset: number;

/**
 * 拖放位置枚举值
 * -1: 放置在目标节点之前
 *  0: 放置在目标节点内部
 *  1: 放置在目标节点之后
 */
type DropPosition = -1 | 0 | 1;

/**
 * 文本方向类型
 */
type Direction = 'ltr' | 'rtl';

/**
 * 拖放指示器组件的属性接口
 */
export interface DropIndicatorProps {
  /**
   * 拖放位置：-1 表示上方，0 表示内部，1 表示下方
   */
  dropPosition: DropPosition;

  /**
   * 拖放层级偏移量，用于计算水平位置
   */
  dropLevelOffset: number;

  /**
   * CSS 类名前缀，用于生成完整的样式类名
   */
  prefixCls: string;

  /**
   * 缩进量，每一级的像素值
   */
  indent: number;

  /**
   * 文本方向，默认为 'ltr'（从左到右）
   * @default 'ltr'
   */
  direction?: Direction;
}

/**
 * 拖放指示器组件
 * 
 * 用于在树形组件中显示拖放操作的视觉反馈指示线。
 * 根据拖放位置和层级自动计算指示线的位置和样式。
 * 
 * @param props - 组件属性
 * @returns React 元素，渲染一个带有动态样式的 div 元素作为指示器
 * 
 * @example
 *