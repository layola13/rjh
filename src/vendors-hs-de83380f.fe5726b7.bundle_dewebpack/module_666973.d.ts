/**
 * SVG 图标属性接口
 */
interface IconSvgAttrs {
  /** SVG 视图框属性，定义坐标系统和宽高比 */
  viewBox: string;
  /** 是否可聚焦，影响键盘导航行为 */
  focusable: string;
}

/**
 * SVG 路径元素属性接口
 */
interface PathAttrs {
  /** SVG 路径数据，定义图形的形状 */
  d: string;
}

/**
 * SVG 子元素接口
 */
interface IconChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性集合 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 元素标签名 */
  tag: string;
  /** SVG 根元素属性 */
  attrs: IconSvgAttrs;
  /** 子元素数组 */
  children: readonly IconChild[];
}

/**
 * 图标定义接口
 * 描述一个完整的 SVG 图标配置，包含图标元数据和渲染信息
 */
interface IconDefinition {
  /** 图标的 SVG 配置对象 */
  icon: IconConfig;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题样式 */
  theme: string;
}

/**
 * 邮件图标定义（填充主题）
 * 
 * 提供邮件/信封样式的 SVG 图标配置
 * - 主题：filled（填充样式）
 * - 视图框：64 64 896 896
 * - 包含矩形信封和三角形封口的路径数据
 */
declare const mailFilledIcon: IconDefinition;

export default mailFilledIcon;