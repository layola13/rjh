/**
 * Ant Design 双色调饼图图标组件类型定义
 * 提供SVG图标的配置结构和主题支持
 */

/**
 * SVG路径属性接口
 */
interface SvgPathAttributes {
  /** SVG路径数据 */
  d: string;
  /** 填充颜色 */
  fill: string;
}

/**
 * SVG根属性接口
 */
interface SvgRootAttributes {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG子元素接口
 */
interface SvgChildElement {
  /** 元素标签名 */
  tag: 'path';
  /** 路径元素属性 */
  attrs: SvgPathAttributes;
}

/**
 * 图标渲染结果接口
 */
interface IconRenderResult {
  /** 根元素标签名 */
  tag: 'svg';
  /** SVG根元素属性 */
  attrs: SvgRootAttributes;
  /** 子元素数组（路径集合） */
  children: SvgChildElement[];
}

/**
 * 图标配置对象接口
 */
interface IconConfig {
  /**
   * 图标渲染函数
   * @param primaryColor - 主色调（用于主要图形部分）
   * @param secondaryColor - 次要色调（用于装饰/阴影部分）
   * @returns SVG图标的完整结构
   */
  icon: (primaryColor: string, secondaryColor: string) => IconRenderResult;
  
  /** 图标名称标识符 */
  name: 'pie-chart';
  
  /** 图标主题类型 */
  theme: 'twotone';
}

/**
 * 饼图图标模块默认导出
 * 符合Ant Design图标系统规范的双色调饼图图标
 */
declare const PieChartTwoTone: IconConfig;

export default PieChartTwoTone;