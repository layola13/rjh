/**
 * SVG图标属性接口
 * 定义SVG元素的基本属性
 */
interface SvgAttrs {
  /** SVG视图盒子坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG路径数据 */
  d?: string;
}

/**
 * SVG子元素节点接口
 * 描述SVG树形结构中的单个节点
 */
interface SvgChild {
  /** HTML/SVG标签名 */
  tag: string;
  /** 标签属性对象 */
  attrs: SvgAttrs;
  /** 嵌套的子元素数组（可选） */
  children?: SvgChild[];
}

/**
 * 图标配置对象接口
 * 完整描述Ant Design图标的结构
 */
interface IconDefinition {
  /** 图标的SVG配置 */
  icon: {
    /** 根SVG标签 */
    tag: 'svg';
    /** SVG根元素属性 */
    attrs: {
      /** 视图盒子：定义SVG坐标系统和可见区域 */
      viewBox: string;
      /** 是否可通过键盘聚焦 */
      focusable: string;
    };
    /** SVG子元素列表 */
    children: SvgChild[];
  };
  /** 图标语义化名称 */
  name: string;
  /** 图标主题类型：outlined(线框) | filled(填充) | twotone(双色) */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 时间字段图标定义
 * 导出field-time图标的完整配置对象
 * 
 * @remarks
 * 这是一个Ant Design风格的时钟图标，包含：
 * - 时钟表盘和指针
 * - 右侧的横线装饰（表示时间字段）
 * 
 * @example
 *