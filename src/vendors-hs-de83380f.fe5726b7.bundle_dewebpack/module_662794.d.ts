/**
 * SVG 图标属性接口
 */
export interface IconAttrs {
  /** SVG 视图框坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性
 */
export interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素节点
 */
export interface IconChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * SVG 图标配置
 */
export interface IconConfig {
  /** 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: IconAttrs;
  /** 子元素列表 */
  children: IconChild[];
}

/**
 * Ant Design 图标定义
 */
export interface AntdIconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 微博圆形图标（Outlined 主题）
 */
declare const weiboCircleOutlined: AntdIconDefinition;

export default weiboCircleOutlined;