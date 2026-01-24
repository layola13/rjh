/**
 * Bilibili 图标配置对象
 * 定义了哔哩哔哩品牌图标的SVG结构和元数据
 */
declare module 'module_705522' {
  /**
   * SVG 路径元素属性接口
   */
  interface PathAttrs {
    /** SVG 路径数据字符串 */
    d: string;
  }

  /**
   * SVG 路径元素接口
   */
  interface PathElement {
    /** 元素标签名 */
    tag: 'path';
    /** 路径属性 */
    attrs: PathAttrs;
  }

  /**
   * SVG 根元素属性接口
   */
  interface SvgAttrs {
    /** SVG 填充规则 */
    'fill-rule': 'evenodd';
    /** SVG 视图盒子定义 */
    viewBox: string;
    /** 是否可聚焦 */
    focusable: 'false' | 'true';
  }

  /**
   * 图标配置接口
   */
  interface IconConfig {
    /** 元素标签名 */
    tag: 'svg';
    /** SVG 属性 */
    attrs: SvgAttrs;
    /** 子元素数组（路径集合） */
    children: PathElement[];
  }

  /**
   * 图标主题类型
   */
  type IconTheme = 'filled' | 'outlined' | 'twoTone';

  /**
   * Bilibili 图标定义接口
   */
  interface BilibiliIconDefinition {
    /** 图标 SVG 配置 */
    icon: IconConfig;
    /** 图标名称 */
    name: 'bilibili';
    /** 图标主题 */
    theme: IconTheme;
  }

  /**
   * 模块默认导出
   * Bilibili 品牌图标的完整定义，包含 SVG 路径、名称和主题
   */
  const bilibiliIcon: BilibiliIconDefinition;
  
  export default bilibiliIcon;
}