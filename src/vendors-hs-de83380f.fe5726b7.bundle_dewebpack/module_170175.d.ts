/**
 * SVG 图标属性接口
 */
interface SvgAttrs {
  /** SVG 视图盒子坐标 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** 填充颜色 */
  fill?: string;
  /** SVG 路径数据 */
  d?: string;
}

/**
 * SVG 子元素节点
 */
interface SvgChildNode {
  /** 标签名称 */
  tag: string;
  /** 标签属性 */
  attrs: SvgAttrs;
}

/**
 * SVG 图标定义
 */
interface IconDefinition {
  /** 标签名称 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** SVG 子节点集合 */
  children: SvgChildNode[];
}

/**
 * 图标配置对象
 */
interface IconConfig {
  /**
   * 生成图标定义
   * @param primaryColor - 主要颜色
   * @param secondaryColor - 次要颜色
   * @returns SVG 图标定义对象
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** 图标名称 */
  name: string;
  
  /** 图标主题类型 */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * 双色调文件差异图标
 * 用于表示文件添加或比对功能的图标组件
 */
declare const diffIcon: IconConfig;

export default diffIcon;