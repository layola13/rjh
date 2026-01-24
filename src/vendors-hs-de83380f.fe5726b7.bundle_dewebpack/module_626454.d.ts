/**
 * Ant Design Icon: Undo (Outlined)
 * 
 * 撤销图标，用于表示撤销操作或返回上一步的交互元素。
 * 该图标采用outlined主题风格。
 */

/**
 * SVG路径属性接口
 * 定义SVG path元素的属性结构
 */
interface SvgPathAttrs {
  /** SVG路径数据，定义图形的绘制指令 */
  d: string;
}

/**
 * SVG元素接口
 * 描述SVG子元素的结构
 */
interface SvgChild {
  /** 元素标签名称 */
  tag: string;
  /** 元素属性 */
  attrs: SvgPathAttrs;
}

/**
 * SVG根元素属性接口
 * 定义SVG根节点的属性
 */
interface SvgAttrs {
  /** 
   * SVG视图框，定义坐标系统和宽高比
   * 格式: "min-x min-y width height"
   */
  viewBox: string;
  /** 
   * 是否可获得焦点
   * 设为"false"表示该SVG元素不参与键盘导航
   */
  focusable: string;
}

/**
 * 图标配置接口
 * 定义SVG图标的完整结构
 */
interface IconConfig {
  /** 元素标签名称 */
  tag: string;
  /** SVG根元素属性 */
  attrs: SvgAttrs;
  /** SVG子元素数组（通常为path元素） */
  children: SvgChild[];
}

/**
 * Ant Design 图标定义接口
 * 描述完整的图标元数据和SVG配置
 */
interface AntDesignIconDefinition {
  /** SVG图标配置对象 */
  icon: IconConfig;
  /** 
   * 图标名称
   * 用于标识和引用该图标
   */
  name: string;
  /** 
   * 图标主题类型
   * 可选值: "filled" | "outlined" | "twotone"
   */
  theme: string;
}

/**
 * 撤销图标定义
 * 
 * @remarks
 * 该图标显示一个逆时针的圆弧箭头，表示撤销或回退操作。
 * 常用于编辑器、表单和任何需要撤销功能的界面中。
 * 
 * @example
 *