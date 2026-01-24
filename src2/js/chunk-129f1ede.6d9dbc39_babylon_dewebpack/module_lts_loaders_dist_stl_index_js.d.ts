/**
 * STL 文件加载器模块
 * 提供STL格式3D模型文件的加载功能
 * @module STLLoader
 */

/**
 * STL文件加载器类
 * 用于加载和解析STL格式的3D模型文件
 */
export declare class STLFileLoader {
  /**
   * 创建STL文件加载器实例
   */
  constructor();

  /**
   * 加载STL文件
   * @param url - STL文件的URL路径
   * @param onSuccess - 加载成功的回调函数
   * @param onProgress - 加载进度的回调函数（可选）
   * @param onError - 加载失败的回调函数（可选）
   */
  load(
    url: string,
    onSuccess: (data: unknown) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (error: Error) => void
  ): void;

  /**
   * 解析STL文件数据
   * @param data - STL文件的原始数据（ArrayBuffer或字符串）
   * @returns 解析后的几何数据
   */
  parse(data: ArrayBuffer | string): unknown;
}

export { STLFileLoader };