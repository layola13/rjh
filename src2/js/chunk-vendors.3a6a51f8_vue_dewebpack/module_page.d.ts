/**
 * 页面配置模块
 * 
 * 提供页面相关的配置更新功能
 * @module module_page
 */

/**
 * 页面配置选项接口
 */
interface PageOptions {
  /** 页面配置参数 */
  page: unknown;
}

/**
 * 更新页面配置
 * 
 * 通过传入的页面参数更新当前实例的选项配置
 * 
 * @param pageConfig - 页面配置参数
 * @returns void
 * 
 * @example
 *