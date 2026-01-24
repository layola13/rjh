/**
 * SVG 图标属性接口
 */
interface SVGAttributes {
  /**
   * SVG 填充规则
   */
  'fill-rule'?: string;
  
  /**
   * SVG 视图框属性，定义可视区域
   */
  viewBox?: string;
  
  /**
   * 是否可聚焦
   */
  focusable?: string;
  
  /**
   * SVG 路径数据
   */
  d?: string;
}

/**
 * SVG 元素节点接口
 */
interface SVGElement {
  /**
   * 元素标签名
   */
  tag: string;
  
  /**
   * 元素属性集合
   */
  attrs: SVGAttributes;
  
  /**
   * 子元素数组（可选）
   */
  children?: SVGElement[];
}

/**
 * 图标配置接口
 */
interface IconDefinition {
  /**
   * 图标 SVG 结构
   */
  icon: SVGElement;
  
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题类型
   * @example 'outlined' | 'filled' | 'two-tone'
   */
  theme: string;
}

/**
 * 签名图标定义
 * 
 * 提供一个签名/手写笔的轮廓图标，常用于文档签署、编辑等场景
 * 
 * @remarks
 * - 使用 outlined 主题样式
 * - viewBox 范围: 64 64 896 896
 * - 包含笔和签名轨迹的路径数据
 */
declare const SignatureIcon: IconDefinition;

export default SignatureIcon;