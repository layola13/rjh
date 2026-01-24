/**
 * SVG 图标属性接口
 */
interface SvgAttrs {
  /** SVG 视图盒子坐标 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
  /** 填充颜色 */
  fill?: string;
}

/**
 * SVG 子元素节点
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttrs;
}

/**
 * 图标渲染结果
 */
interface IconRenderResult {
  /** SVG 根标签 */
  tag: 'svg';
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** SVG 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /**
   * 图标渲染函数
   * @param primaryColor - 主色调（用于主要路径填充）
   * @param secondaryColor - 次色调（用于装饰路径填充）
   * @returns SVG 渲染结构
   */
  icon(primaryColor: string, secondaryColor: string): IconRenderResult;

  /** 图标名称 */
  name: string;

  /** 图标主题类型 */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * 文件夹添加图标（双色调主题）
 * 用于表示新建文件夹或向文件夹添加内容的操作
 */
declare const FolderAddTwoTone: IconDefinition;

export default FolderAddTwoTone;