/**
 * SVG 图标配置类型定义
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttrs {
  /** SVG 填充规则 */
  'fill-rule'?: string;
  /** SVG 视图框坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** 路径数据 */
  d?: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 图标 SVG 结构 */
  icon: {
    /** 根标签名 */
    tag: string;
    /** 根元素属性 */
    attrs: SvgAttrs;
    /** 子元素列表 */
    children: SvgChild[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 太阳图标配置
 * @description 包含太阳图标的完整 SVG 路径数据和配置信息
 */
declare const sunIcon: IconConfig;

export default sunIcon;