/**
 * 向上方向的正方形图标组件配置
 * 用于 Ant Design 图标库的 SVG 图标定义
 */

/**
 * SVG 路径属性接口
 */
interface PathAttributes {
  /** SVG 路径数据，定义图形的绘制指令 */
  d: string;
}

/**
 * SVG 路径元素接口
 */
interface PathElement {
  /** 元素标签名 */
  tag: 'path';
  /** 路径元素的属性 */
  attrs: PathAttributes;
}

/**
 * SVG 根元素属性接口
 */
interface SvgAttributes {
  /** SVG 视口坐标系和尺寸 */
  viewBox: string;
  /** 是否可通过键盘聚焦 */
  focusable: string;
}

/**
 * SVG 图标配置接口
 */
interface IconSvg {
  /** 根元素标签名 */
  tag: 'svg';
  /** SVG 根元素属性 */
  attrs: SvgAttributes;
  /** SVG 子元素集合（路径元素） */
  children: PathElement[];
}

/**
 * 图标定义完整配置接口
 */
interface IconDefinition {
  /** 图标的 SVG 结构定义 */
  icon: IconSvg;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * UpSquare 图标配置
 * 表示一个带有向上箭头的正方形轮廓图标
 */
declare const upSquareOutlined: IconDefinition;

export default upSquareOutlined;