/**
 * 图标定义接口 - 描述SVG图标的完整结构
 */
interface IconDefinition {
  /** 图标的SVG结构 */
  icon: {
    /** SVG标签名称 */
    tag: 'svg';
    /** SVG根元素属性 */
    attrs: {
      /** SVG视图框坐标和尺寸 */
      viewBox: string;
      /** 是否可聚焦 */
      focusable: string;
    };
    /** SVG子元素数组 */
    children: Array<{
      /** 子元素标签名 */
      tag: string;
      /** 子元素属性 */
      attrs: {
        /** SVG路径数据 */
        d: string;
      };
    }>;
  };
  /** 图标名称标识 */
  name: string;
  /** 图标主题类型 */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * 快进/下一步图标定义
 * 
 * @description 表示媒体播放控制中的"快进"或"下一步"操作的填充风格图标
 * @example
 *