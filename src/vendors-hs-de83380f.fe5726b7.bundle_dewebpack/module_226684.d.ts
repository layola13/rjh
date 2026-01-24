/**
 * 编辑图标（outlined主题）
 * 提供Ant Design风格的编辑图标配置
 */

/**
 * SVG路径属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG元素子节点接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * SVG根元素属性接口
 */
interface SvgAttrs {
  /** SVG视图盒子坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** SVG图标元素标签名 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素数组 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 * 描述Ant Design图标的完整结构
 */
interface IconDefinition {
  /** SVG图标配置对象 */
  icon: IconConfig;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 编辑图标定义
 * Ant Design的outlined主题编辑图标
 */
declare const editOutlined: IconDefinition;

export default editOutlined;