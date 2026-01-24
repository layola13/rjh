/**
 * GLTFData 类用于管理和下载 glTF 相关文件
 * 支持多种文件格式：.glb, .bin, .gltf, .jpeg, .jpg, .png
 */
export declare class GLTFData {
  /**
   * 存储 glTF 相关文件的键值对
   * key: 文件名（包含扩展名）
   * value: 文件内容（ArrayBuffer 或 Blob 数据）
   */
  glTFFiles: Record<string, ArrayBuffer | Blob | Uint8Array>;

  /**
   * 构造函数
   * 初始化一个空的文件存储对象
   */
  constructor();

  /**
   * 下载所有已添加的 glTF 文件
   * 根据文件扩展名自动设置正确的 MIME 类型：
   * - .glb: model/gltf-binary
   * - .bin: application/octet-stream
   * - .gltf: model/gltf+json
   * - .jpeg/.jpg: image/jpeg
   * - .png: image/png
   * 
   * 通过创建隐藏的 <a> 标签并触发点击事件来下载文件
   */
  downloadFiles(): void;
}