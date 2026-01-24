/**
 * Webpack动态模块上下文的类型定义
 * 用于处理运行时模块加载和解析
 */

/**
 * 模块路径映射表接口
 * 将模块路径字符串映射到对应的模块ID
 */
interface ModuleMapping {
  './livehint.inject.ts': 866752;
  './logger.inject.ts': 593513;
}

/**
 * Webpack上下文模块函数接口
 * 提供动态模块加载能力
 */
interface WebpackContextModule {
  /**
   * 动态加载指定路径的模块
   * @param modulePath - 模块的相对路径
   * @returns 加载的模块对象
   * @throws {Error} 当模块不存在时抛出MODULE_NOT_FOUND错误
   */
  (modulePath: keyof ModuleMapping): unknown;

  /**
   * 获取所有可用的模块路径列表
   * @returns 包含所有模块路径的字符串数组
   */
  keys(): Array<keyof ModuleMapping>;

  /**
   * 解析模块路径为模块ID
   * @param modulePath - 模块的相对路径
   * @returns 对应的模块ID（数字）
   * @throws {Error} 当模块路径不存在时抛出错误
   */
  resolve(modulePath: keyof ModuleMapping): number;

  /**
   * 当前上下文模块的唯一标识符
   */
  id: 719039;
}

/**
 * 导出的上下文模块实例
 * 用于动态加载livehint和logger注入模块
 */
declare const contextModule: WebpackContextModule;

export = contextModule;