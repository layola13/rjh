/**
 * USB图标组件配置
 * 
 * 该模块导出一个USB图标的SVG配置对象，用于在Ant Design图标系统中渲染USB接口图标。
 * 图标采用outlined（线框）主题风格。
 */

/**
 * SVG元素属性接口
 */
interface SVGAttributes {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path元素属性接口
 */
interface PathAttributes {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素接口
 */
interface SVGChild {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** 图标SVG结构 */
  icon: {
    /** 根元素标签名 */
    tag: string;
    /** SVG根元素属性 */
    attrs: SVGAttributes;
    /** SVG子元素数组 */
    children: SVGChild[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * USB图标配置对象
 * 
 * @description 定义了USB接口图标的完整SVG结构和元数据
 * @property {Object} icon - SVG图标结构配置
 * @property {string} name - 图标标识名称 "usb"
 * @property {string} theme - 图标主题样式 "outlined"（线框风格）
 */
declare const usbIcon: IconConfig;

export default usbIcon;