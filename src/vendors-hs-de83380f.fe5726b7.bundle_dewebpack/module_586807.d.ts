/**
 * SVG 图标属性接口
 * 定义 SVG 元素的属性结构
 */
interface SvgAttrs {
  /** SVG 视图盒子坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性接口
 * 定义路径元素的属性
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 * 定义 SVG 内部子元素的结构
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 * 定义图标的完整结构
 */
interface IconConfig {
  /** 根 SVG 元素标签名 */
  tag: string;
  /** SVG 元素属性 */
  attrs: SvgAttrs;
  /** SVG 子元素列表 */
  children: SvgChild[];
}

/**
 * 菜单图标模块接口
 * 导出的图标对象结构定义
 */
export interface MenuIcon {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题风格 */
  theme: string;
}

/**
 * 菜单图标（横线菜单图标）
 * 包含三条横线的标准菜单图标，使用 outlined 主题
 */
declare const menuIcon: MenuIcon;

export default menuIcon;