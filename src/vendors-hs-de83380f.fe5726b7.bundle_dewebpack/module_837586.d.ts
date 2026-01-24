/**
 * SVG 图标属性接口
 */
interface SvgAttributes {
  /** SVG 视图盒子坐标和尺寸 */
  viewBox?: string;
  /** 是否可获取焦点 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
  /** 填充颜色 */
  fill?: string;
}

/**
 * SVG 子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttributes;
}

/**
 * SVG 图标结构接口
 */
interface SvgIconStructure {
  /** SVG 根元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素数组 */
  children: SvgChildNode[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /**
   * 图标渲染函数
   * @param primaryColor - 主色调（用于外圈和暂停条）
   * @param secondaryColor - 次要色调（用于内圈填充）
   * @returns SVG 图标结构对象
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgIconStructure;
  
  /** 图标名称标识 */
  name: string;
  
  /** 图标主题类型（双色调） */
  theme: 'twotone';
}

/**
 * 暂停圆圈图标（双色调主题）
 * 包含外圈轮廓和两个暂停竖条
 */
declare const pauseCircleTwoTone: IconDefinition;

export default pauseCircleTwoTone;