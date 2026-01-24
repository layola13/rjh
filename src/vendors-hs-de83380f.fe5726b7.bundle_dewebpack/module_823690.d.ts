/**
 * Ant Design Icon: Folder (Filled)
 * 
 * 文件夹图标的SVG定义，采用填充主题风格
 * @module FolderFilledIcon
 */

/**
 * SVG路径属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG元素属性接口
 */
interface SvgAttrs {
  /** SVG视图盒子坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
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
 * 图标配置接口
 */
interface Icon {
  /** SVG标签名 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素数组 */
  children: SvgChild[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标SVG配置 */
  icon: Icon;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 文件夹填充图标定义
 * 
 * 包含完整的SVG路径数据和元数据，用于渲染文件夹图标
 */
declare const folderFilledIcon: IconDefinition;

export default folderFilledIcon;