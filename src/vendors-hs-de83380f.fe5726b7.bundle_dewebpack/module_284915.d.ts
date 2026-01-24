/**
 * SVG图标属性接口
 * 定义SVG元素的基本属性
 */
interface IconSvgAttrs {
  /** SVG视图盒子坐标和尺寸 */
  viewBox: string;
  /** 是否可获取焦点 */
  focusable: string;
}

/**
 * SVG路径元素属性接口
 * 定义path元素的属性
 */
interface PathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素接口
 * 定义SVG内部的子元素结构
 */
interface IconChild {
  /** HTML/SVG标签名称 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttrs;
}

/**
 * 图标配置接口
 * 定义完整的图标结构，包括SVG元素和子元素
 */
interface IconDefinition {
  /** SVG图标配置 */
  icon: {
    /** SVG标签名 */
    tag: string;
    /** SVG根元素属性 */
    attrs: IconSvgAttrs;
    /** SVG子元素数组 */
    children: IconChild[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Home图标定义
 * 房屋形状的轮廓线图标，常用于导航到首页
 */
declare const homeOutlinedIcon: IconDefinition;

export default homeOutlinedIcon;