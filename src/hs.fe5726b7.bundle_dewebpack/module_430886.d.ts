/**
 * 位置坐标接口
 */
interface Position {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 工具提示配置选项
 */
interface TooltipOptions {
  /** 图标 URL 或 Data URL */
  icon?: string;
  /** 工具提示标题(支持 HTML) */
  title?: string;
  /** 背景颜色 */
  color?: string;
  /** 是否启用混合模式(darken) */
  blend?: boolean;
}

/**
 * 工具提示组件属性接口
 */
interface TooltipComponentProps {
  /** 显示位置 */
  position: Position;
  /** 图标 URL */
  icon?: string;
  /** 标题文本(HTML) */
  title?: string;
  /** 背景颜色 */
  color?: string;
  /** 是否使用混合模式 */
  blend?: boolean;
}

/**
 * 浮动工具提示类
 * 用于在鼠标位置附近显示图标、颜色或标题的浮动提示框
 * 
 * @example
 *