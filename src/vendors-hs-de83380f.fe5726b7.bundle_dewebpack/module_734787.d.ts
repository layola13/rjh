/**
 * Ant Design Icon: Copyright Circle Outlined
 * 
 * 版权圆圈图标 - 轮廓风格
 * SVG图标定义，用于在UI中显示版权符号
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标和尺寸 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG 路径元素属性接口
 */
interface PathAttributes {
  /** SVG 路径数据 */
  d: string;
}

/**
 * SVG 子元素节点接口
 */
interface SvgChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标 SVG 结构 */
  icon: {
    /** 根元素标签名 */
    tag: string;
    /** SVG 根元素属性 */
    attrs: SvgAttributes;
    /** SVG 子元素列表 */
    children: SvgChildNode[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 版权圆圈图标定义
 * 
 * 包含一个圆形边框内的版权符号(C)
 * 适用于版权声明、知识产权标识等场景
 */
declare const copyrightCircleOutlined: IconDefinition;

export default copyrightCircleOutlined;