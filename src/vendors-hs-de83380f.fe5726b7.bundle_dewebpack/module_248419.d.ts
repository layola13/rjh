/**
 * 图标配置接口 - 定义SVG图标的完整结构
 */
interface IconConfig {
  /** 图标的SVG元素配置 */
  icon: {
    /** SVG标签类型 */
    tag: 'svg';
    /** SVG根元素属性 */
    attrs: {
      /** SVG视图盒子坐标和尺寸 */
      viewBox: string;
      /** 是否可聚焦（无障碍属性） */
      focusable: string;
    };
    /** SVG子元素集合 */
    children: Array<{
      /** 子元素标签类型 */
      tag: string;
      /** 子元素属性 */
      attrs: {
        /** SVG路径数据 */
        d: string;
      };
    }>;
  };
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twoTone';
}

/**
 * Check图标配置
 * 
 * 导出一个对勾（✓）图标的配置对象，使用outlined主题风格
 * 常用于表示完成、确认、选中等状态
 */
declare const checkIconConfig: IconConfig;

export default checkIconConfig;