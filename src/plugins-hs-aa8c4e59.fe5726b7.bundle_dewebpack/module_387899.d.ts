/**
 * 网络请求工具模块
 * 提供数据查询和导入功能
 */

/**
 * 查询参数接口
 */
export interface QueryImportDataParams {
  /** 资源URL地址 */
  url: string;
  /** 替换的JSON文件名 */
  replaceJsonName: string;
}

/**
 * 通用的fetch请求函数
 * 发起HTTP请求并返回JSON解析后的数据
 * 
 * @param url - 请求的URL地址
 * @returns Promise包装的JSON数据
 * @template T - 返回数据的类型
 */
export declare function query<T = unknown>(url: string): Promise<T>;

/**
 * 查询导入数据
 * 根据提供的URL和替换文件名构建新URL并发起请求
 * 
 * @param params - 查询参数对象
 * @param params.url - 原始URL地址
 * @param params.replaceJsonName - 用于替换的JSON文件名
 * @returns Promise包装的数据对象，请求失败时返回空对象
 * @template T - 返回数据的类型
 * 
 * @example
 *