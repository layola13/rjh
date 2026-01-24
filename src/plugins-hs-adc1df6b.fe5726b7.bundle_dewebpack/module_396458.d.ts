/**
 * 图像处理工具类型声明
 * 提供模型截图、图片文件加载、数据URI转换等功能
 */

/**
 * 图片加载配置选项
 */
export interface PictureLoadOptions {
  /** 图片最大宽度，默认1000px */
  maxWidth?: number;
  /** 图片最大高度，默认1000px */
  maxHeight?: number;
  /** 发送到服务器前的回调函数 */
  beforeSendingToServerCallback?: () => void;
}

/**
 * 图像处理工具类
 * 提供静态方法处理图片截图、转换、上传等操作
 */
export default class ImageUtility {
  /**
   * 对指定模型进行截图
   * @param model - 需要截图的模型对象
   * @returns Promise，返回截图结果
   */
  static takeModelCapture(model: unknown): Promise<unknown>;

  /**
   * 将Data URI转换为Blob对象
   * @param dataURI - 格式为 "data:image/png;base64,..." 的Data URI字符串
   * @returns Blob对象，包含图片数据
   * @example
   *