/**
 * SVG 资源模块映射表
 * 用于动态加载项目中的 SVG 图标资源
 */

/**
 * SVG 资源路径到模块 ID 的映射类型
 */
type SvgResourceMap = Record<string, number>;

/**
 * 资源加载器接口
 */
interface ResourceLoader {
  /**
   * 根据资源路径加载对应的模块
   * @param path - SVG 资源的相对路径
   * @returns 加载的模块内容
   * @throws {Error} 当资源路径不存在时抛出 MODULE_NOT_FOUND 错误
   */
  (path: string): unknown;

  /**
   * 获取所有可用的资源路径列表
   * @returns 所有 SVG 资源路径的数组
   */
  keys(): string[];

  /**
   * 解析资源路径为对应的模块 ID
   * @param path - SVG 资源的相对路径
   * @returns 资源对应的模块 ID
   * @throws {Error} 当资源路径不存在时抛出 MODULE_NOT_FOUND 错误
   */
  resolve(path: string): number;

  /**
   * 资源加载器的唯一标识符
   */
  id: number;
}

/**
 * SVG 资源路径到模块 ID 的完整映射表
 * 包含自动样式器、目录、内容操作、工具栏等各模块的 SVG 图标资源
 */
declare const svgResourceMap: SvgResourceMap;

/**
 * SVG 资源动态加载器
 * 用于在运行时根据路径动态加载 SVG 资源模块
 */
declare const svgResourceLoader: ResourceLoader;

export { svgResourceMap, svgResourceLoader, SvgResourceMap, ResourceLoader };