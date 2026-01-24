/**
 * SVG 图标属性接口
 * 描述 SVG 元素的属性
 */
interface SVGAttributes {
  /** SVG 视图框，定义坐标系统和宽高比 */
  viewBox: string;
  /** 是否可通过键盘聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性接口
 * 描述 path 元素的属性
 */
interface PathAttributes {
  /** SVG 路径数据，定义形状的绘制指令 */
  d: string;
}

/**
 * SVG 子元素接口
 * 描述 SVG 内部的子元素结构
 */
interface SVGChildElement {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 * 描述完整的图标数据结构
 */
interface IconConfig {
  /** 图标的 SVG 结构定义 */
  icon: {
    /** SVG 根元素标签 */
    tag: string;
    /** SVG 根元素属性 */
    attrs: SVGAttributes;
    /** SVG 子元素数组 */
    children: SVGChildElement[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 条形码图标配置
 * Ant Design 风格的条形码 outlined 图标
 */
declare const barcodeIcon: IconConfig;

export default barcodeIcon;