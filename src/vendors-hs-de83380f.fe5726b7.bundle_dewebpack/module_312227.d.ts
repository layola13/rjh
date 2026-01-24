/**
 * SVG 图标属性接口
 * 定义 SVG 元素的基本属性
 */
interface SvgAttrs {
  /** SVG 视图盒属性，定义坐标系统和宽高比 */
  viewBox: string;
  /** 是否可聚焦，用于无障碍访问 */
  focusable: string;
}

/**
 * Path 元素属性接口
 * 定义 SVG path 元素的属性
 */
interface PathAttrs {
  /** SVG 路径数据，定义图形的绘制指令 */
  d: string;
}

/**
 * SVG 子元素接口
 * 描述 SVG 内部的子元素结构
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 * 定义完整的图标配置对象结构
 */
interface IconConfig {
  /** 根 SVG 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 * 完整的图标对象定义，包含图标配置、名称和主题
 */
interface IconDefinition {
  /** 图标的 SVG 配置对象 */
  icon: IconConfig;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 边框-左侧图标定义
 * 导出一个描述左边框样式的 SVG 图标对象
 */
declare const borderLeftIcon: IconDefinition;

export default borderLeftIcon;