/**
 * SVG图标定义模块
 * 
 * 该模块导出一个搜索图标的配置对象，包含SVG路径数据和元数据。
 * 用于Ant Design图标库或类似的图标系统。
 */

/**
 * SVG元素属性接口
 * 定义SVG元素可接受的属性
 */
interface SvgAttributes {
  /** SVG视图盒坐标和尺寸 */
  viewBox?: string;
  /** 是否可通过键盘获得焦点 */
  focusable?: string | boolean;
  /** SVG路径数据 */
  d?: string;
}

/**
 * SVG子元素节点接口
 * 描述SVG内部的path、circle等子元素结构
 */
interface SvgChildNode {
  /** HTML/SVG标签名 */
  tag: string;
  /** 元素属性集合 */
  attrs: SvgAttributes;
}

/**
 * SVG图标根节点接口
 * 定义完整的SVG图标结构
 */
interface SvgIconNode {
  /** HTML/SVG标签名 */
  tag: string;
  /** 元素属性集合 */
  attrs: SvgAttributes;
  /** 子元素数组 */
  children?: SvgChildNode[];
}

/**
 * 图标定义接口
 * 完整描述一个图标对象的所有必需属性
 */
interface IconDefinition {
  /** SVG图标的根节点配置 */
  icon: SvgIconNode;
  /** 图标的语义化名称 */
  name: string;
  /** 图标主题类型：outlined(线框)、filled(填充)、twotone(双色) */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 搜索图标定义
 * 
 * 导出一个线框风格的搜索(放大镜)图标配置
 * 图标尺寸：896x896 (viewBox中的有效绘制区域)
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;