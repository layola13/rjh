/**
 * 将嵌套的类名数组扁平化为单一的类名数组
 * 支持处理字符串、数组和对象形式的类名定义
 * 
 * @example
 * flattenNames(['btn', ['primary', 'large']]) // ['btn', 'primary', 'large']
 * flattenNames([{ active: true, disabled: false }]) // ['active', 'active-true']
 * flattenNames(['btn', { size: 'lg' }]) // ['btn', 'size-lg']
 */
export declare function flattenNames(names?: ClassNameInput[]): string[];

export default flattenNames;

/**
 * 类名输入类型
 * 可以是字符串、嵌套数组或条件对象
 */
export type ClassNameInput = 
  | string 
  | ClassNameInput[] 
  | ClassNameObject;

/**
 * 类名对象类型
 * 键为类名，值为布尔值或字符串/数字（用于生成修饰符）
 * 
 * @example
 * { active: true } // 输出 'active'
 * { size: 'lg' } // 输出 'size-lg'
 */
export interface ClassNameObject {
  [className: string]: boolean | string | number;
}