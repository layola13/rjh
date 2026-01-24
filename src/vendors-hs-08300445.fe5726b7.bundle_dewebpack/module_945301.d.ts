/**
 * TreeSelect 组件属性验证工具
 * 用于在开发环境中验证 TreeSelect 组件的 props 配置是否正确
 * @module TreeSelectPropsValidator
 */

/**
 * TreeSelect 组件的属性接口
 */
export interface TreeSelectProps {
  /** 搜索框占位符文本（已废弃） */
  searchPlaceholder?: string;
  
  /** 父子节点选中状态不再关联 */
  treeCheckStrictly?: boolean;
  
  /** 显示复选框 */
  treeCheckable?: boolean;
  
  /** 是否把每个选项的 label 包装到 value 中 */
  labelInValue?: boolean;
  
  /** 选中的值 */
  value?: TreeSelectValue | TreeSelectValue[];
  
  /** 支持多选 */
  multiple?: boolean;
}

/**
 * TreeSelect 选项值类型
 */
export interface TreeSelectValue {
  /** 选项的显示文本 */
  label: string;
  
  /** 选项的实际值 */
  value: string | number;
}

/**
 * 验证 TreeSelect 组件的 props 配置
 * 
 * @param props - TreeSelect 组件的属性对象
 * 
 * @remarks
 * 该函数会进行以下验证：
 * 1. 检查是否使用了已废弃的 `searchPlaceholder` 属性
 * 2. 当 `treeCheckStrictly` 为 true 时，强制要求 `labelInValue` 也为 true
 * 3. 当 `labelInValue` 或 `treeCheckStrictly` 为 true 时，验证 value 的格式是否为 {label, value} 结构
 * 4. 当组件为可选择或多选模式时，验证 value 是否为数组
 * 5. 当组件为单选模式时，验证 value 不应为数组
 * 
 * @example
 *