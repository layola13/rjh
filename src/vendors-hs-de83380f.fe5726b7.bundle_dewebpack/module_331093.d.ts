/**
 * 文件添加图标（填充主题）
 * @module FileAddFilled
 */

/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /** SVG 视图盒子坐标和尺寸 */
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
interface SVGChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SVGAttributes;
  /** 子元素列表 */
  children: SVGChild[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 文件添加图标定义（填充样式）
 * 用于表示添加文件操作的图标组件
 */
declare const fileAddFilledIcon: IconDefinition;

export default fileAddFilledIcon;