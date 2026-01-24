/**
 * 向上箭头图标配置
 * Caret-up icon definition for Ant Design icon system
 * @module CaretUpOutlined
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素配置
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 图标元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 * Icon definition structure for Ant Design components
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 向上箭头图标定义
 * Caret-up outlined icon configuration
 */
declare const caretUpOutlined: IconDefinition;

export default caretUpOutlined;