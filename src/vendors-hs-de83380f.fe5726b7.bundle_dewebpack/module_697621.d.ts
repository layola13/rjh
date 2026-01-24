/**
 * 双色调数据库图标配置
 * @module DatabaseTwoTone
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttrs {
  /** SVG 视图盒子坐标 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
}

/**
 * SVG 路径属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标返回值接口
 */
interface IconDefinition {
  /** SVG 根标签 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /**
   * 图标渲染函数
   * @param primaryColor - 主要颜色
   * @param secondaryColor - 次要颜色
   * @returns SVG 图标定义对象
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** 图标名称 */
  name: string;
  
  /** 图标主题类型 */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * 数据库双色调图标配置
 * 用于渲染包含三个服务器层级的数据库图标
 */
declare const DatabaseTwoToneIcon: IconConfig;

export default DatabaseTwoToneIcon;