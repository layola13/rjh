/**
 * 向自定义工具集的第一个工具添加内容项
 * @param item - 要添加到工具内容数组中的项
 */
declare function add<T = unknown>(item: T): void;

export { add };

/**
 * 如果这是类的方法，则类型声明应该是：
 */
declare interface CustomTool<T = unknown> {
  content: T[];
}

declare class ModuleAdd<T = unknown> {
  customTools: CustomTool<T>[];
  
  /**
   * 向第一个自定义工具的内容数组添加项
   * @param item - 要添加的内容项
   */
  add(item: T): void;
}

export default ModuleAdd;