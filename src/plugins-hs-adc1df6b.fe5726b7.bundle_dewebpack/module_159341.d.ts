/**
 * CSS模块类型定义
 * 
 * 该模块导出属性栏下拉区域列表组件的样式定义。
 * 包含容器布局、选择器样式、区域值显示和弹出层样式等。
 */

/**
 * CSS类名映射接口
 * 定义所有可用的CSS类名及其对应的字符串值
 */
export interface PropertyBarDropdownAreaListStyles {
  /** 属性栏下拉区域列表容器 - 主容器样式，包含flex布局和基础间距 */
  'property-bar-dropdownarealist-container': string;
  
  /** 无边框选择器 - 宽度115px的透明边框选择器 */
  'tp-select-noborder': string;
  
  /** 选择器容器值 - 选择器内部显示值的样式 */
  'tp-select-container-value': string;
  
  /** 带图标的选择器容器 - 左侧填充为0的选择器变体 */
  'tp-select-container_hasicon': string;
  
  /** 下拉图标 - 选择器右侧的下拉箭头图标 */
  'tp-select-downicon': string;
  
  /** 图标背景悬停态 - 鼠标悬停时图标的背景样式 */
  'hover-icon-bg': string;
  
  /** 区域值显示 - 显示面积数值的文本样式 */
  'dropdownarealist-area-value': string;
  
  /** 区域单位显示 - 显示面积单位（如㎡）的文本样式 */
  'dropdownarealist-area-unit': string;
  
  /** 下拉列表弹出层 - 下拉选项列表的容器样式 */
  'dropdownarealist-popdom': string;
  
  /** Homestyler UI组件 - 第三方UI库的基础类名 */
  'homestyler-ui-components': string;
  
  /** 选择列表容器 - 选项列表的包裹容器 */
  'tp-select-list-container': string;
  
  /** 列表项 - 单个下拉选项的样式 */
  'tp-select-list-container-li': string;
  
  /** 单选项 - 单选模式下的选项样式 */
  'single': string;
}

/**
 * 导出CSS模块
 * 该对象包含所有CSS类名到实际生成的哈希类名的映射
 */
declare const styles: PropertyBarDropdownAreaListStyles;

export default styles;

/**
 * CSS模块元数据
 */
export const moduleId: number;

/**
 * 样式内容
 * 包含完整的CSS规则定义
 * 
 * @remarks
 * 主要样式规则：
 * - 容器使用flex布局，高度31px，顶部间距5px
 * - 选择器默认颜色#78787D，悬停和聚焦时变为#396EFE
 * - 区域值使用12px字体，颜色#343A40
 * - 区域单位使用12px字体，颜色#78787D，左边距3px
 * - 弹出层最大宽度208px，使用max-content自适应
 * - 列表项高度32px，水平内边距12px，悬停背景色#F5F5F5
 */
export const cssContent: string;