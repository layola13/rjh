/**
 * SVG 图标配置接口
 * 定义 SVG 元素的标签、属性和子元素结构
 */
interface SVGElement {
  /** SVG 标签名 */
  tag: string;
  /** SVG 元素的属性集合 */
  attrs: Record<string, string>;
  /** 子元素数组（可选） */
  children?: SVGElement[];
}

/**
 * 图标定义接口
 * 描述完整的图标配置，包括 SVG 结构、名称和主题
 */
interface IconDefinition {
  /** SVG 图标配置 */
  icon: SVGElement;
  /** 图标名称 */
  name: string;
  /** 图标主题样式 */
  theme: string;
}

/**
 * AppStore 填充主题图标
 * 
 * 一个 4x4 网格布局的应用商店图标，采用填充样式
 * viewBox: "64 64 896 896" - 定义 SVG 视图框坐标系
 * 
 * @remarks
 * 该图标包含四个方形元素，排列成 2x2 网格
 * - 左上角: (160, 160) 304x304
 * - 右上角: (560, 160) 304x304
 * - 左下角: (160, 560) 304x304
 * - 右下角: (560, 560) 304x304
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;