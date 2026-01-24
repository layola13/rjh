/**
 * 文件压缩包图标组件配置
 * @module FileZipIcon
 */

/**
 * SVG 元素属性接口
 */
interface SvgAttributes {
  /** 视图框坐标和尺寸 */
  viewBox?: string;
  /** 是否可聚焦 */
  focusable?: string;
  /** SVG 路径数据 */
  d?: string;
  /** 填充颜色 */
  fill?: string;
}

/**
 * SVG 子元素节点
 */
interface SvgChild {
  /** 标签名称 */
  tag: string;
  /** 元素属性 */
  attrs: SvgAttributes;
}

/**
 * 图标 SVG 结构
 */
interface IconSvg {
  /** 根标签名称 */
  tag: string;
  /** 根元素属性 */
  attrs: SvgAttributes;
  /** 子元素列表 */
  children: SvgChild[];
}

/**
 * 图标配置对象
 */
interface IconConfig {
  /**
   * 生成图标 SVG 结构
   * @param primaryColor - 主色调（用于图标主体）
   * @param secondaryColor - 次色调（用于图标细节）
   * @returns SVG 图标结构对象
   */
  icon(primaryColor: string, secondaryColor: string): IconSvg;
  
  /** 图标名称标识符 */
  name: string;
  
  /** 图标主题类型 */
  theme: string;
}

/**
 * 文件压缩包（ZIP）图标的双色主题配置
 * 
 * 该图标采用双色设计，展示一个带有拉链装饰的文件图标
 * 适用于表示压缩文件、ZIP 文档等场景
 */
declare const fileZipIcon: IconConfig;

export default fileZipIcon;