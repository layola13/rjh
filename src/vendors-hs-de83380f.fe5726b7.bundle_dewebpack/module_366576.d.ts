/**
 * SVG图标属性接口
 */
interface IconAttributes {
  /** SVG视图盒子坐标 */
  viewBox: string;
  /** 是否可聚焦 */
  focusable: string;
}

/**
 * SVG路径属性接口
 */
interface PathAttributes {
  /** SVG路径数据 */
  d: string;
}

/**
 * SVG子元素节点接口
 */
interface IconChildNode {
  /** 元素标签名 */
  tag: string;
  /** 元素属性 */
  attrs: PathAttributes;
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标SVG配置 */
  icon: {
    /** SVG根标签 */
    tag: string;
    /** SVG根元素属性 */
    attrs: IconAttributes;
    /** SVG子元素列表 */
    children: IconChildNode[];
  };
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme: string;
}

/**
 * 金钱收集图标（填充主题）
 * 
 * @description 表示货币收集、财务统计等场景的图标组件
 * @example
 * import MoneyCollectIcon from './module';
 * <Icon component={MoneyCollectIcon} />
 */
declare const MoneyCollectIcon: IconDefinition;

export default MoneyCollectIcon;