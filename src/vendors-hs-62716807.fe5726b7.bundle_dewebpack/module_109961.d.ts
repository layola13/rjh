/**
 * 预定义的状态颜色类型
 * @description 用于表示组件状态的颜色选项
 */
export type PresetStatusColorType = 'success' | 'processing' | 'error' | 'default' | 'warning';

/**
 * 预定义的通用颜色类型
 * @description 用于主题和UI组件的标准颜色选项
 */
export type PresetColorType = 
  | 'pink' 
  | 'red' 
  | 'yellow' 
  | 'orange' 
  | 'cyan' 
  | 'green' 
  | 'blue' 
  | 'purple' 
  | 'geekblue' 
  | 'magenta' 
  | 'volcano' 
  | 'gold' 
  | 'lime';

/**
 * 预定义状态颜色值的只读元组
 * @description 包含所有可用状态颜色的常量数组
 */
export declare const PresetStatusColorTypes: readonly ['success', 'processing', 'error', 'default', 'warning'];

/**
 * 预定义通用颜色值的只读元组
 * @description 包含所有可用通用颜色的常量数组
 */
export declare const PresetColorTypes: readonly ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'];