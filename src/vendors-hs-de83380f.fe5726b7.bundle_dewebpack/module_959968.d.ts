/**
 * SVG图标属性接口
 */
interface SvgAttrs {
  /** SVG视图框 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
}

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
 * SVG子元素接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * SVG图标结构接口
 */
interface IconSvg {
  /** 根标签名 */
  tag: string;
  /** 根元素属性 */
  attrs: SvgAttrs;
  /** 子元素数组 */
  children: SvgChild[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /**
   * 生成图标SVG结构
   * @param primaryColor - 主要颜色
   * @param secondaryColor - 次要颜色
   * @returns SVG图标对象
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** 图标名称 */
  name: string;
  
  /** 图标主题类型 */
  theme: string;
}

/**
 * 减号圆圈图标（双色主题）
 * Ant Design图标库中的minus-circle图标定义
 */
declare const MinusCircleIcon: IconDefinition;

export default MinusCircleIcon;