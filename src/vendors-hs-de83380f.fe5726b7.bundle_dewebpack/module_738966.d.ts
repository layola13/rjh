/**
 * Ant Design 图标组件类型定义
 * 问号圆圈填充图标
 */

/**
 * SVG 元素属性接口
 */
interface SVGAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * Path 元素属性接口
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素接口
 */
interface SVGChild {
  /** HTML 标签名 */
  tag: 'path';
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标配置接口
 */
interface IconConfig {
  /** HTML 标签名 */
  tag: 'svg';
  /** SVG 元素属性 */
  attrs: SVGAttributes;
  /** 子元素列表 */
  children: SVGChild[];
}

/**
 * 图标定义接口
 * 包含图标的完整配置信息
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: IconConfig;
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * 问号圆圈填充图标
 * 用于表示帮助、疑问或需要说明的内容
 */
declare const QuestionCircleFilled: IconDefinition;

export default QuestionCircleFilled;