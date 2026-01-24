/**
 * SVG图标定义接口
 * 描述SVG元素的标签、属性和子元素结构
 */
interface SvgElement {
  /** SVG标签名称 */
  tag: string;
  /** SVG元素属性集合 */
  attrs: Record<string, string>;
  /** 子元素数组（可选） */
  children?: SvgElement[];
}

/**
 * 图标配置接口
 * 定义Ant Design图标的完整结构
 */
interface IconDefinition {
  /** SVG图标元素配置 */
  icon: SvgElement;
  /** 图标名称标识符 */
  name: string;
  /** 图标主题类型 */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * 扫描图标定义
 * 
 * Ant Design的outlined风格扫描图标，通常用于表示：
 * - 二维码/条形码扫描功能
 * - 全屏/聚焦视图
 * - 边框检测或框选操作
 * 
 * @remarks
 * 图标由四个角的框架和中间的水平线组成，
 * 视图框范围：64 64 896 896（标准1024x1024画布）
 */
declare const ScanOutlined: IconDefinition;

export default ScanOutlined;