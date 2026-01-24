/**
 * 自定义工具项的内容类型
 */
type CustomToolContent = unknown;

/**
 * 自定义工具配置接口
 */
interface CustomTool {
  /** 工具内容列表 */
  content: CustomToolContent[];
}

/**
 * 模块添加功能的上下文接口
 * @module module_add
 * @originalId add
 */
interface ModuleAddContext {
  /** 自定义工具配置数组 */
  customTools: CustomTool[];
}

/**
 * 向第一个自定义工具的内容列表中添加项
 * @param this - 模块上下文
 * @param item - 要添加的内容项
 */
declare function add(this: ModuleAddContext, item: CustomToolContent): void;

export { ModuleAddContext, CustomTool, CustomToolContent, add };