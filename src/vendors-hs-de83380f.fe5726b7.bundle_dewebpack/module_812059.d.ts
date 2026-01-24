/**
 * SVG 图标配置接口
 * 定义了图标的基本属性和渲染结构
 */
interface IconDefinition {
  /**
   * 图标渲染函数
   * @param primaryColor - 主色调，用于图标的主要部分
   * @param secondaryColor - 次要色调，用于图标的辅助部分
   * @returns SVG 元素的虚拟 DOM 结构
   */
  icon: (primaryColor: string, secondaryColor: string) => IconNode;
  
  /**
   * 图标名称标识符
   */
  name: string;
  
  /**
   * 图标主题类型
   * - "filled": 填充风格
   * - "outlined": 线框风格
   * - "twotone": 双色风格
   */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * SVG 节点接口
 * 描述 SVG 元素的结构
 */
interface IconNode {
  /**
   * HTML/SVG 标签名
   */
  tag: string;
  
  /**
   * 元素属性集合
   */
  attrs: Record<string, string | number | boolean>;
  
  /**
   * 子节点数组（可选）
   */
  children?: IconNode[];
}

/**
 * Like（点赞）图标定义
 * 双色主题的点赞图标，常用于表示喜欢、赞同等交互
 */
declare const likeIcon: IconDefinition;

export default likeIcon;