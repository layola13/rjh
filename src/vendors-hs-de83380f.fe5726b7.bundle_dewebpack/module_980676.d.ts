/**
 * Ant Design Icon Definition
 * Icon: file-unknown (双色主题)
 */

/**
 * SVG 路径属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG 元素属性接口
 */
interface SvgAttrs {
  /** SVG 视图盒子 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 标签名 */
  tag: 'path';
  /** 路径属性 */
  attrs: PathAttrs;
}

/**
 * SVG 图标结构接口
 */
interface IconNode {
  /** 标签名 */
  tag: 'svg';
  /** SVG 属性 */
  attrs: SvgAttrs;
  /** 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /**
   * 生成图标节点
   * @param primaryColor - 主要颜色（一般用于外层轮廓）
   * @param secondaryColor - 次要颜色（一般用于内部填充）
   * @returns SVG 图标节点对象
   */
  icon: (primaryColor: string, secondaryColor: string) => IconNode;
  
  /** 图标名称 */
  name: 'file-unknown';
  
  /** 图标主题 */
  theme: 'twotone';
}

/**
 * 文件未知图标（双色主题）
 * 表示未知类型的文件，带问号标识
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;