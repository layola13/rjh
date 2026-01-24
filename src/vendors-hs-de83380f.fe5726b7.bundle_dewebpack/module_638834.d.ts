/**
 * SVG图标配置对象 - 滑块（Sliders）图标
 * 主题：填充样式（filled）
 * 用途：表示调节、设置或过滤功能的图标
 */
interface IconDefinition {
  /** 图标配置 */
  icon: {
    /** SVG标签名 */
    tag: 'svg';
    /** SVG根元素属性 */
    attrs: {
      /** SVG视图盒子坐标和尺寸 */
      viewBox: string;
      /** 是否可聚焦 */
      focusable: string;
    };
    /** SVG子元素集合 */
    children: Array<{
      /** 路径标签名 */
      tag: 'path';
      /** 路径元素属性 */
      attrs: {
        /** SVG路径数据 */
        d: string;
      };
    }>;
  };
  /** 图标名称 */
  name: string;
  /** 图标主题样式 */
  theme: string;
}

/**
 * 滑块图标定义
 * 包含三个垂直滑块的图标，常用于表示设置、调整或过滤功能
 */
declare const slidersFilledIcon: IconDefinition;

export default slidersFilledIcon;