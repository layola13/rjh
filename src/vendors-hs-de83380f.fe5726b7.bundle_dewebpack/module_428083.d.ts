/**
 * 评论图标组件配置
 * Comment icon component configuration for Ant Design Icons
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** SVG 视图框坐标 */
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
 * SVG 子元素节点接口
 */
interface SvgChildNode {
  /** HTML/SVG 标签名 */
  tag: string;
  /** 元素属性 */
  attrs: Record<string, unknown>;
  /** 子元素节点（可选） */
  children?: SvgChildNode[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /** 图标 SVG 配置 */
  icon: {
    /** SVG 标签名 */
    tag: "svg";
    /** SVG 根元素属性 */
    attrs: SvgAttributes;
    /** SVG 子元素列表 */
    children: SvgChildNode[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * 评论图标定义
 * Comment icon with outlined theme
 * 包含三个圆形（表示用户头像）和对话气泡的SVG路径
 */
declare const CommentOutlined: IconDefinition;

export default CommentOutlined;

export {
  IconDefinition,
  SvgAttributes,
  PathAttributes,
  SvgChildNode
};