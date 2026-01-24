/**
 * 文件类型图标配置 - Word文档图标
 * @module FileWordFilledIcon
 */

/**
 * SVG路径属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

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
 * SVG子元素接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 元素标签名 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素列表 */
  children: SvgChild[];
}

/**
 * Word文档图标定义接口
 */
interface FileWordFilledIcon {
  /** 图标SVG配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * Word文档填充风格图标
 * 
 * 该图标用于表示Microsoft Word文档类型，采用填充风格设计。
 * 包含文档轮廓和内部"W"字母标识。
 */
declare const fileWordFilledIcon: FileWordFilledIcon;

export default fileWordFilledIcon;