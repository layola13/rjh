/**
 * ShareAlt图标配置
 * 分享图标的SVG定义，包含三个连接的节点表示分享功能
 */
interface IconDefinition {
  /** 图标配置 */
  icon: {
    /** SVG标签名 */
    tag: 'svg';
    /** SVG根元素属性 */
    attrs: {
      /** SVG视图框坐标和尺寸 */
      viewBox: string;
      /** 是否可聚焦 */
      focusable: string;
    };
    /** SVG子元素列表 */
    children: Array<{
      /** 子元素标签名 */
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
  /** 图标主题风格 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * ShareAlt图标定义
 * 用于表示分享功能的图标，包含三个互相连接的圆形节点
 */
declare const shareAltIcon: IconDefinition;

export default shareAltIcon;