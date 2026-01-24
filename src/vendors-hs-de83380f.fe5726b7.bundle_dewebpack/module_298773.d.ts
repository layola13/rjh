/**
 * SVG 属性接口
 */
interface SvgAttrs {
  /** SVG 视图框 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttrs {
  /** SVG 路径数据 */
  d: string;
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG 子元素接口
 */
interface SvgChild {
  /** 元素标签名 */
  tag: 'path';
  /** Path 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标渲染结果接口
 */
interface IconRenderResult {
  /** 根元素标签名 */
  tag: 'svg';
  /** SVG 根元素属性 */
  attrs: SvgAttrs;
  /** 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /**
   * 图标渲染函数
   * @param primaryColor - 主色调
   * @param secondaryColor - 次要色调
   * @returns SVG 渲染结果对象
   */
  icon: (primaryColor: string, secondaryColor: string) => IconRenderResult;
  
  /** 图标名称 */
  name: 'contacts';
  
  /** 图标主题 */
  theme: 'twotone';
}

/**
 * 联系人图标定义（双色主题）
 * 包含用户头像和日历的组合图标
 */
declare const contactsIcon: IconDefinition;

export default contactsIcon;