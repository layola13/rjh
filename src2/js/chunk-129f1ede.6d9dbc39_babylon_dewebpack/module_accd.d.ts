/**
 * 图片资源模块映射表
 * 用于动态导入商业把手和通用把手的图片资源
 */

/**
 * 图片资源路径映射接口
 * 键为相对路径，值为webpack模块ID
 */
interface ImageModuleMap {
  './CommercialHandle.png': string;
  './CommercialHandle10.png': string;
  './CommercialHandle11.png': string;
  './CommercialHandle12.png': string;
  './CommercialHandle13.png': string;
  './CommercialHandle14.png': string;
  './CommercialHandle2.png': string;
  './CommercialHandle3.png': string;
  './CommercialHandle4.png': string;
  './CommercialHandle5.png': string;
  './CommercialHandle6.png': string;
  './CommercialHandle7.png': string;
  './CommercialHandle8.png': string;
  './CommercialHandle9.png': string;
  './CrossHandle.png': string;
  './Handle.png': string;
  './Handle2.png': string;
  './Handle3.png': string;
  './Handle4.png': string;
  './Handle5.png': string;
  './KfcHandle.png': string;
}

/**
 * 图片资源路径类型
 */
type ImagePath = keyof ImageModuleMap;

/**
 * 模块未找到错误接口
 */
interface ModuleNotFoundError extends Error {
  code: 'MODULE_NOT_FOUND';
}

/**
 * 图片资源加载器接口
 */
interface ImageResourceLoader {
  /**
   * 根据路径加载图片模块
   * @param path - 图片相对路径
   * @returns 图片模块内容
   * @throws {ModuleNotFoundError} 当模块路径不存在时抛出
   */
  (path: ImagePath): unknown;

  /**
   * 获取所有可用的图片路径键
   * @returns 所有图片路径的数组
   */
  keys(): ImagePath[];

  /**
   * 解析图片路径为模块ID
   * @param path - 图片相对路径
   * @returns 对应的webpack模块ID
   * @throws {ModuleNotFoundError} 当模块路径不存在时抛出
   */
  resolve(path: ImagePath): string;

  /**
   * 模块标识符
   */
  id: string;
}

/**
 * 导出图片资源加载器
 */
declare const imageResourceLoader: ImageResourceLoader;

export default imageResourceLoader;