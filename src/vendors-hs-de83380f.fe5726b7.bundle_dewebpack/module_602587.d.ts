/**
 * Ant Design Icon: Notification Outlined
 * 
 * 通知图标定义模块，提供SVG路径和元数据配置
 */

/**
 * SVG元素属性接口
 */
interface SvgAttributes {
  /** SVG视图框坐标和尺寸 */
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
 * SVG子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: 'path';
  /** 路径元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标SVG配置接口
 */
interface IconSvgConfig {
  /** 根元素标签名 */
  tag: 'svg';
  /** SVG根元素属性 */
  attrs: SvgAttributes;
  /** SVG子元素数组 */
  children: SvgChildNode[];
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** SVG图标配置 */
  icon: IconSvgConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 通知图标定义
 * 
 * 描述一个扬声器/喇叭形状的通知图标，常用于消息提醒场景
 */
declare const notificationOutlined: IconDefinition;

export default notificationOutlined;

export { IconDefinition, IconSvgConfig, SvgAttributes, PathAttributes, SvgChildNode };