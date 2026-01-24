/**
 * SVG 图标属性接口
 */
interface SvgAttributes {
  /** SVG 视口坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径属性接口
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 标签名称 */
  tag: 'path';
  /** 路径属性 */
  attrs: PathAttributes;
}

/**
 * 图标结构接口
 */
interface IconStructure {
  /** 标签名称 */
  tag: 'svg';
  /** SVG 属性 */
  attrs: SvgAttributes;
  /** 子元素集合 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /**
   * 生成图标结构的函数
   * @param primaryColor - 主色调
   * @param secondaryColor - 次色调
   * @returns 图标的 SVG 结构
   */
  icon(primaryColor: string, secondaryColor: string): IconStructure;
  
  /** 图标名称 */
  name: 'profile';
  
  /** 图标主题类型 */
  theme: 'twotone';
}

/**
 * 默认导出：档案列表双色图标配置
 */
declare const profileIcon: IconConfig;

export default profileIcon;