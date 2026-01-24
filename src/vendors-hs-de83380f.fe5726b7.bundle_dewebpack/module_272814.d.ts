/**
 * SVG 属性接口
 */
interface SvgAttrs {
  /** SVG 视图盒子坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: 'path';
  /** Path 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 根元素标签名 */
  tag: 'svg';
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** SVG 子元素集合 */
  children: SvgChildNode[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标配置对象 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 垂直边框图标定义
 * 
 * 该图标用于表示垂直边框样式，包含多个矩形元素组成的垂直分隔线图案
 */
declare const BorderVerticleOutlined: IconDefinition;

export default BorderVerticleOutlined;