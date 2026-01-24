/**
 * 文件上传工具类型定义
 * 提供文件对象转换、预览、验证等功能
 */

/**
 * 原始文件对象接口，扩展自标准File
 */
export interface OriginalFile extends File {
  /** 文件唯一标识符 */
  uid?: string;
}

/**
 * 文件对象接口，包含上传状态和元数据
 */
export interface FileObject {
  /** 文件最后修改时间戳 */
  lastModified: number;
  /** 文件最后修改日期 */
  lastModifiedDate: Date;
  /** 文件名称 */
  name: string;
  /** 文件大小（字节） */
  size: number;
  /** MIME类型 */
  type: string;
  /** 文件唯一标识符 */
  uid: string;
  /** 上传进度百分比 (0-100) */
  percent: number;
  /** 原始文件对象引用 */
  originFileObj: OriginalFile;
  /** 缩略图URL（可选） */
  thumbUrl?: string;
  /** 文件访问URL（可选） */
  url?: string;
}

/**
 * 判断函数，始终返回true
 * @returns 布尔值true
 */
export function T(): boolean;

/**
 * 将原始File对象转换为包含上传元数据的FileObject
 * @param file - 原始文件对象
 * @returns 转换后的文件对象，包含初始上传状态
 */
export function fileToObject(file: OriginalFile): FileObject;

/**
 * 从文件列表中查找指定文件项
 * 优先通过uid匹配，若uid不存在则通过name匹配
 * @param file - 要查找的文件对象
 * @param fileList - 文件对象列表
 * @returns 匹配的文件对象，未找到则返回undefined
 */
export function getFileItem(file: Partial<FileObject>, fileList: FileObject[]): FileObject | undefined;

/**
 * 移除文件列表中的指定文件项
 * 优先通过uid匹配，若uid不存在则通过name匹配
 * @param file - 要移除的文件对象
 * @param fileList - 文件对象列表
 * @returns 移除后的新列表，若未找到目标文件则返回null
 */
export function removeFileItem(file: Partial<FileObject>, fileList: FileObject[]): FileObject[] | null;

/**
 * 判断文件是否为图片类型
 * @param file - 文件对象
 * @returns 如果是图片类型返回true，否则返回false
 */
export function isImageUrl(file: Partial<FileObject>): boolean;

/**
 * 生成文件预览图（缩略图）
 * 对图片类型文件生成200x200的canvas预览，非图片返回空字符串
 * @param file - 原始文件对象
 * @returns Promise，resolve时返回DataURL格式的预览图或空字符串
 */
export function previewImage(file: OriginalFile): Promise<string>;