/**
 * 双色调文件图标配置
 * @module FileTwoToneIcon
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttrs {
  /** SVG 视图盒子坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** 填充颜色 */
  fill?: string;
  /** 路径数据 */
  d?: string;
}

/**
 * SVG 子元素节点
 */
interface SvgNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttrs;
  /** 子元素节点（可选） */
  children?: SvgNode[];
}

/**
 * SVG 图标根节点
 */
interface SvgIcon {
  /** 根元素标签名 */
  tag: string;
  /** 根元素属性 */
  attrs: SvgAttrs;
  /** 子元素节点列表 */
  children: SvgNode[];
}

/**
 * 图标渲染函数类型
 * @param primaryColor 主要颜色（通常为前景色）
 * @param secondaryColor 次要颜色（通常为背景/填充色）
 * @returns SVG 图标配置对象
 */
type IconRenderFunction = (primaryColor: string, secondaryColor: string) => SvgIcon;

/**
 * 图标定义接口
 */
interface IconDefinition {
  /**
   * 图标渲染函数
   * @param primaryColor 主要颜色
   * @param secondaryColor 次要颜色
   * @returns SVG 图标配置
   */
  icon: IconRenderFunction;
  
  /** 图标名称 */
  name: string;
  
  /** 图标主题类型 */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * 双色调文件图标定义
 * 用于渲染文件图标的 SVG 配置
 */
declare const fileTwoToneIcon: IconDefinition;

export default fileTwoToneIcon;