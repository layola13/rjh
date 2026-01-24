/**
 * SVG 图标属性接口
 */
interface SvgAttrs {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** HTML 标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** HTML 标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * 二维码图标定义接口
 */
interface QrcodeIconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 二维码图标 - Outlined 主题
 * 
 * @description 包含二维码图标的 SVG 路径数据和配置
 * @module QrcodeOutlined
 */
declare const QrcodeOutlined: QrcodeIconDefinition;

export default QrcodeOutlined;