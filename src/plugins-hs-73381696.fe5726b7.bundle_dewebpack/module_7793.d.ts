/**
 * 模块聚合器
 * 
 * 该模块通过 webpack 的 require.context 动态导入多个模块，
 * 并将所有模块的默认导出合并为一个数组。
 * 
 * @module ModuleAggregator
 */

/**
 * 模块默认导出的数据类型
 * 根据实际业务场景，可能是配置项、路由定义、插件列表等
 */
type ModuleExport = unknown[];

/**
 * webpack require.context 返回的上下文函数类型
 */
interface RequireContext {
  /**
   * 获取匹配的所有模块路径
   */
  keys(): string[];
  
  /**
   * 根据路径加载模块
   * @param path - 模块路径
   */
  (path: string): { default?: ModuleExport };
}

/**
 * 动态导入的模块上下文
 * 通常来自 require.context() 调用，例如：
 * require.context('./components', true, /\.tsx?$/)
 */
declare const requireContext: RequireContext;

/**
 * 聚合后的模块数据数组
 * 
 * 遍历所有匹配的模块，提取每个模块的 default 导出，
 * 并将它们扁平化合并到一个统一的数组中。
 * 
 * @example
 * // 假设有以下模块：
 * // module1.ts: export default [{ id: 1 }]
 * // module2.ts: export default [{ id: 2 }]
 * // 则 aggregatedModules = [{ id: 1 }, { id: 2 }]
 */
declare const aggregatedModules: ModuleExport;

export default aggregatedModules;

/**
 * 类型定义说明：
 * 
 * 1. ModuleExport: 表示每个模块导出的数据类型，默认为 unknown[]
 *    建议根据实际业务替换为具体类型，例如：
 *    - type RouteConfig[] (路由配置)
 *    - type PluginDefinition[] (插件定义)
 *    - type ComponentMetadata[] (组件元数据)
 * 
 * 2. RequireContext: webpack 特有的模块上下文接口
 * 
 * 3. aggregatedModules: 最终导出的聚合数组
 */