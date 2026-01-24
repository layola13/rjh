/**
 * SVG图标属性接口
 * 定义SVG元素的基本属性
 */
interface SvgAttrs {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG路径元素属性接口
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素接口
 * 描述SVG内部的path等元素
 */
interface SvgChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 * 定义完整的图标数据结构
 */
interface IconDefinition {
  /** 图标SVG配置 */
  icon: {
    /** 根元素标签 */
    tag: string;
    /** SVG根元素属性 */
    attrs: SvgAttrs;
    /** SVG子元素列表 */
    children: SvgChild[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题风格 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Alert警告图标定义（outlined主题）
 * 
 * 该图标展示一个警告铃铛的轮廓样式
 * 常用于提示、警告等场景
 */
declare const alertOutlined: IconDefinition;

export default alertOutlined;