/**
 * 日历任务图标（Carry Out）的 SVG 定义
 * 这是一个 Ant Design 风格的外框日历图标，包含一个复选标记
 */

/**
 * SVG 元素的属性接口
 */
interface SvgAttrs {
  /** SVG 视图框坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
}

/**
 * SVG 元素节点定义
 */
interface SvgNode {
  /** HTML/SVG 标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttrs;
  /** 子元素（可选） */
  children?: SvgNode[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** SVG 图标结构 */
  icon: SvgNode;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Carry Out（执行任务）图标
 * 
 * 表示一个带有勾选标记的日历图标，通常用于任务完成、日程安排等场景
 * 
 * @remarks
 * - 主题：outlined（线框风格）
 * - 视图框：64x64 到 896x896
 * - 包含日历外框和内部复选标记路径
 */
declare const CarryOutOutlined: IconDefinition;

export default CarryOutOutlined;