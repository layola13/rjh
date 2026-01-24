/**
 * 双色调汽车图标定义
 * @module CarIconTwoTone
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttrs {
  /** SVG 视图框坐标 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** 路径数据 */
  d?: string;
  /** 填充颜色 */
  fill?: string;
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
 * SVG 图标结构接口
 */
interface IconSvg {
  /** 根元素标签 */
  tag: string;
  /** 根元素属性 */
  attrs: SvgAttrs;
  /** 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /**
   * 生成图标 SVG 结构
   * @param primaryColor - 主要颜色（用于图标主体）
   * @param secondaryColor - 次要颜色（用于图标装饰部分）
   * @returns SVG 图标对象
   */
  icon(primaryColor: string, secondaryColor: string): IconSvg;
  
  /** 图标名称 */
  name: string;
  
  /** 图标主题类型 */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * 双色调汽车图标
 * 包含完整的 SVG 路径定义，支持自定义主色和辅色
 */
declare const carIconTwoTone: IconDefinition;

export default carIconTwoTone;