/**
 * 表示SVG图标子元素的配置对象
 */
interface SvgIconChild {
  /** SVG元素标签名 */
  tag: string;
  /** SVG元素的属性集合 */
  attrs: Record<string, string>;
  /** 可选的子元素数组 */
  children?: SvgIconChild[];
}

/**
 * 表示SVG图标的配置结构
 */
interface SvgIcon {
  /** SVG根元素标签名 */
  tag: string;
  /** SVG根元素的属性集合 */
  attrs: {
    /** SVG视图框坐标和尺寸 */
    viewBox: string;
    /** 是否可聚焦 */
    focusable: string;
  };
  /** SVG的子元素数组 */
  children: SvgIconChild[];
}

/**
 * Ant Design 图标定义对象
 */
interface AntdIconDefinition {
  /** SVG图标配置 */
  icon: SvgIcon;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Node Index 图标 (outlined主题)
 * 用于表示节点索引或相关操作的图标组件定义
 */
declare const nodeIndexIcon: AntdIconDefinition;

export default nodeIndexIcon;