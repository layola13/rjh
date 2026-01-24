/**
 * SVG 图标配置接口
 * 定义 SVG 元素的属性结构
 */
interface SvgAttributes {
  /** SVG 视图框坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 * 描述完整的图标 SVG 结构
 */
interface IconConfig {
  /** SVG 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 淘宝圆形图标配置对象
 */
interface TaobaoCircleIcon {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 淘宝圆形填充图标
 * @description 包含淘宝 logo 的圆形填充风格图标配置
 */
declare const taobaoCircleIcon: TaobaoCircleIcon;

export default taobaoCircleIcon;