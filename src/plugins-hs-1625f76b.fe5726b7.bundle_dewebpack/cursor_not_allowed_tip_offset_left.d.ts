/**
 * 查看器视图宽度（像素）
 */
export const VIEWER_WIDTH: 550;

/**
 * 查看器视图高度（像素）
 */
export const VIEWER_HEIGHT: 308;

/**
 * 禁止光标提示框的左侧偏移量（像素）
 */
export const CURSOR_NOT_ALLOWED_TIP_OFFSET_LEFT: 12;

/**
 * 禁止光标提示框的顶部偏移量（像素）
 */
export const CURSOR_NOT_ALLOWED_TIP_OFFSET_TOP: 18;

/**
 * 光标样式配置对象
 */
export const cursorStyles: {
  /**
   * 默认光标样式
   */
  default: "default";
  
  /**
   * 可单选时的光标样式
   */
  can_selected_single: "pointer";
  
  /**
   * 可多选时的光标样式
   */
  can_selected_multi: "default";
  
  /**
   * 不可选择时的光标样式
   */
  cannot_selected: "not-allowed";
  
  /**
   * VIP限制不可选择时的光标样式
   */
  cannot_selected_vip: "not-allowed";
};

/**
 * 光标样式类型
 */
export type CursorStyle = typeof cursorStyles[keyof typeof cursorStyles];