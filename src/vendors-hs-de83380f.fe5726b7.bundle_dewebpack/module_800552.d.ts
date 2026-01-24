/**
 * 文件Word图标组件的类型定义
 * Ant Design Icons - 双色主题文件Word图标
 */

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
  tag: 'path';
  /** 路径属性 */
  attrs: PathAttrs;
}

/**
 * SVG根元素属性接口
 */
interface SvgAttrs {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * 图标渲染结果接口
 */
interface IconRenderResult {
  /** 根元素标签名 */
  tag: 'svg';
  /** SVG属性 */
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
   * @param primaryColor - 主色调（用于图标主体部分）
   * @param secondaryColor - 次色调（用于图标细节装饰部分）
   * @returns SVG图标的虚拟DOM结构
   */
  icon: (primaryColor: string, secondaryColor: string) => IconRenderResult;
  
  /** 图标名称标识 */
  name: 'file-word';
  
  /** 图标主题类型 */
  theme: 'twotone';
}

/**
 * 导出文件Word图标定义
 * 双色主题的Word文档图标，包含文档轮廓和字母"W"标识
 */
declare const fileWordIcon: IconDefinition;

export default fileWordIcon;