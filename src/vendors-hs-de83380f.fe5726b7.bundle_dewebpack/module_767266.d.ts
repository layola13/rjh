/**
 * 云上传图标配置
 * 
 * Ant Design 图标库中的云上传图标定义，包含SVG路径和元数据
 * @module CloudUploadIcon
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
}

/**
 * SVG 子元素节点
 */
interface SvgNode {
  /** 标签名称 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttributes;
}

/**
 * 图标配置对象
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: {
    /** 根标签名 */
    tag: string;
    /** 根元素属性 */
    attrs: SvgAttributes;
    /** 子元素列表 */
    children: SvgNode[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 云上传图标定义
 * 
 * 包含一个向上箭头和云朵的组合图标，常用于文件上传操作
 */
declare const CloudUploadOutlined: IconDefinition;

export default CloudUploadOutlined;