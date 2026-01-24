/**
 * 双色调文件夹图标配置
 * @module FolderTwoTone
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
 * SVG 元素子节点接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: 'path';
  /** 路径属性 */
  attrs: PathAttrs;
}

/**
 * SVG 根元素属性接口
 */
interface SvgAttrs {
  /** 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * 图标渲染结果接口
 */
interface IconRenderResult {
  /** 元素标签名 */
  tag: 'svg';
  /** SVG 属性 */
  attrs: SvgAttrs;
  /** 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /**
   * 图标渲染函数
   * @param primaryColor - 主色调（前景色）
   * @param secondaryColor - 次色调（背景色）
   * @returns SVG 图标结构
   */
  icon(primaryColor: string, secondaryColor: string): IconRenderResult;
  
  /** 图标名称 */
  name: 'folder';
  
  /** 图标主题类型 */
  theme: 'twotone';
}

/**
 * 文件夹双色调图标配置
 */
declare const iconConfig: IconConfig;

export default iconConfig;