/**
 * 文件未知图标配置
 * Ant Design 图标库中的 file-unknown 图标定义
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性接口
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
 */
interface IconConfig {
  /** 根 SVG 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChild[];
}

/**
 * Ant Design 图标定义接口
 */
interface AntdIconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * 文件未知图标 - filled 主题
 * 用于表示未知类型的文件
 */
declare const FileUnknownFilled: AntdIconDefinition;

export default FileUnknownFilled;