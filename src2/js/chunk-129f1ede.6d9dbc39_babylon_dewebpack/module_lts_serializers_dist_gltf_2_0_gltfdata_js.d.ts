/**
 * glTF 2.0 序列化数据容器
 * 用于存储和下载 glTF 格式的相关文件
 */
export interface IGLTFFiles {
  [fileName: string]: Blob | ArrayBuffer | string;
}

/**
 * glTF 数据类
 * 管理 glTF 导出过程中生成的所有文件（.gltf, .bin, .glb, 纹理等）
 */
export class GLTFData {
  /**
   * 存储 glTF 相关文件的字典
   * 键为文件名，值为文件内容
   */
  public glTFFiles: IGLTFFiles;

  /**
   * 构造函数
   * 初始化空的文件存储容器
   */
  constructor() {
    this.glTFFiles = {};
  }

  /**
   * 下载所有已生成的 glTF 文件
   * 根据文件扩展名自动设置正确的 MIME 类型
   * 支持的文件类型：.glb, .gltf, .bin, .jpeg, .jpg, .png
   */
  public downloadFiles(): void {
    /**
     * 检查字符串是否以指定后缀结尾
     * @param fileName - 要检查的文件名
     * @param extension - 文件扩展名（如 ".glb"）
     * @returns 如果文件名以指定扩展名结尾则返回 true
     */
    function hasExtension(fileName: string, extension: string): boolean {
      return fileName.indexOf(extension, fileName.length - extension.length) !== -1;
    }

    for (const fileName in this.glTFFiles) {
      // 创建隐藏的下载链接
      const downloadLink = document.createElement("a");
      document.body.appendChild(downloadLink);
      downloadLink.setAttribute("type", "hidden");
      downloadLink.download = fileName;

      const fileContent = this.glTFFiles[fileName];
      let blobOptions: BlobPropertyBag | undefined;

      // 根据文件扩展名确定 MIME 类型
      if (hasExtension(fileName, ".glb")) {
        blobOptions = { type: "model/gltf-binary" };
      } else if (hasExtension(fileName, ".bin")) {
        blobOptions = { type: "application/octet-stream" };
      } else if (hasExtension(fileName, ".gltf")) {
        blobOptions = { type: "model/gltf+json" };
      } else if (hasExtension(fileName, ".jpeg") || hasExtension(fileName, ".jpg")) {
        blobOptions = { type: "image/jpeg" };
      } else if (hasExtension(fileName, ".png")) {
        blobOptions = { type: "image/png" };
      }

      // 创建 Blob URL 并触发下载
      downloadLink.href = window.URL.createObjectURL(new Blob([fileContent], blobOptions));
      downloadLink.click();
    }
  }
}