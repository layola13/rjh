/**
 * 双色调图片图标定义模块
 * 提供SVG格式的图片图标，支持主色和次色配置
 */

/**
 * SVG路径属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG元素属性接口
 */
interface SvgAttrs {
  /** 视图框坐标和尺寸 */
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
 * 图标SVG结构接口
 */
interface IconSvg {
  /** 根元素标签名 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素数组 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /**
   * 生成图标SVG结构
   * @param primaryColor - 主色调，用于图标主要轮廓
   * @param secondaryColor - 次色调，用于图标填充和装饰部分
   * @returns 完整的SVG图标结构
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** 图标名称标识 */
  name: string;
  
  /** 图标主题类型 */
  theme: string;
}

/**
 * 双色调图片图标
 * 
 * 图标元素说明：
 * - 外框矩形边框（主色）
 * - 山峰形状的图片内容（次色）
 * - 太阳/圆形装饰元素（次色）
 * - 底部阴影区域（次色）
 */
declare const pictureIcon: IconDefinition;

export default pictureIcon;