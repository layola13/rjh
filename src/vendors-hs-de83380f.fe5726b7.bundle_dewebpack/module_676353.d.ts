/**
 * SVG 元素属性接口
 * 定义 SVG 标签的属性集合
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
}

/**
 * SVG 节点定义
 * 描述 SVG 元素的标签、属性和子元素
 */
interface SvgNode {
  /** HTML/SVG 标签名 */
  tag: string;
  /** 标签属性集合 */
  attrs: SvgAttributes;
  /** 子节点数组（可选） */
  children?: SvgNode[];
}

/**
 * 图标定义接口
 * Ant Design 图标组件的标准结构
 */
interface IconDefinition {
  /** SVG 图标的根节点定义 */
  icon: SvgNode;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型：outlined(线框), filled(填充), twotone(双色) */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * BorderBottom 图标定义
 * 表示"下边框"的 Ant Design 线框风格图标
 * 
 * @remarks
 * 该图标通常用于富文本编辑器或表格编辑场景，用于添加/移除下边框样式
 */
declare const BorderBottomIcon: IconDefinition;

export default BorderBottomIcon;