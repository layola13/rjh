/**
 * SVG 图标定义：双右箭头图标
 * 主题：outlined（线性风格）
 * @module DoubleRightIcon
 */

/**
 * SVG 路径属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 路径元素接口
 */
interface PathElement {
  /** 元素标签名 */
  tag: 'path';
  /** 路径属性 */
  attrs: PathAttrs;
}

/**
 * SVG 根元素属性接口
 */
interface SvgAttrs {
  /** 视图盒子坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 图标结构接口
 */
interface IconStructure {
  /** 元素标签名 */
  tag: 'svg';
  /** SVG 属性 */
  attrs: SvgAttrs;
  /** 子元素列表 */
  children: PathElement[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /** SVG 图标结构 */
  icon: IconStructure;
  /** 图标名称 */
  name: string;
  /** 图标主题风格 */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * 双右箭头图标定义
 * 用于表示快进、向右导航等操作
 */
declare const doubleRightIcon: IconDefinition;

export default doubleRightIcon;