/**
 * 双色调身份证图标定义模块
 * @module IdCardTwoToneIcon
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** 填充颜色 */
  fill?: string;
  /** SVG 路径数据 */
  d?: string;
}

/**
 * SVG 子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttributes;
}

/**
 * SVG 图标树结构接口
 */
interface SvgIconTree {
  /** 根元素标签名 */
  tag: string;
  /** 根元素属性 */
  attrs: SvgAttributes;
  /** 子元素列表 */
  children: SvgChildNode[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /**
   * 图标渲染函数
   * @param primaryColor - 主要填充颜色
   * @param secondaryColor - 次要填充颜色（双色调）
   * @returns SVG 图标树结构
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgIconTree;
  
  /** 图标名称标识 */
  name: string;
  
  /** 图标主题类型 */
  theme: string;
}

/**
 * 身份证双色调图标定义
 * 
 * @description
 * 提供身份证图标的 SVG 路径和配置，支持双色调主题。
 * 图标包含卡片轮廓、用户头像和文本行等元素。
 * 
 * @example
 *