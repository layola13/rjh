/**
 * SVG图标属性接口
 */
interface IconAttributes {
  /** SVG viewBox属性，定义可视区域 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG路径元素属性接口
 */
interface PathAttributes {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素接口
 */
interface IconChild {
  /** 元素标签名 */
  tag: 'path';
  /** 路径元素属性 */
  attrs: PathAttributes;
}

/**
 * SVG图标配置接口
 */
interface Icon {
  /** 元素标签名 */
  tag: 'svg';
  /** SVG根元素属性 */
  attrs: IconAttributes;
  /** SVG子元素数组 */
  children: IconChild[];
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
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * AppStore应用商店图标（outlined主题）
 * 
 * 该图标展示了一个2x2网格布局，代表应用商店的典型视觉呈现
 */
declare const appstoreOutlined: IconDefinition;

export default appstoreOutlined;