/**
 * Chrome浏览器图标组件配置（Filled主题）
 * @module ChromeFilledIcon
 */

/**
 * SVG元素属性接口
 */
interface SvgAttrs {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path元素属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素配置接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: 'path';
  /** Path元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 元素标签名 */
  tag: 'svg';
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素列表 */
  children: SvgChild[];
}

/**
 * 图标组件完整配置接口
 */
interface IconComponent {
  /** 图标SVG配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: 'chrome';
  /** 图标主题类型 */
  theme: 'filled';
}

/**
 * Chrome浏览器填充样式图标配置
 * 包含完整的SVG路径数据，用于渲染Chrome浏览器标志性的多色圆形图标
 */
declare const ChromeFilledIcon: IconComponent;

export default ChromeFilledIcon;