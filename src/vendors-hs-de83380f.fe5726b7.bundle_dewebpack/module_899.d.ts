/**
 * SVG图标路径属性接口
 */
interface IconPathAttrs {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG元素属性接口
 */
interface IconSvgAttrs {
  /** SVG视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG子元素接口
 */
interface IconChild {
  /** 标签名称 */
  tag: string;
  /** 元素属性 */
  attrs: IconPathAttrs;
}

/**
 * SVG图标配置接口
 */
interface IconSvgConfig {
  /** 标签名称 */
  tag: string;
  /** SVG根元素属性 */
  attrs: IconSvgAttrs;
  /** SVG子元素数组 */
  children: IconChild[];
}

/**
 * 图标定义接口
 * 描述一个完整的图标配置，包含SVG结构、名称和主题
 */
interface IconDefinition {
  /** SVG图标配置对象 */
  icon: IconSvgConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 播放按钮(正方形)填充主题图标
 * @description 一个填充样式的正方形播放按钮图标，常用于视频播放控件
 */
declare const playSquareFilledIcon: IconDefinition;

export default playSquareFilledIcon;