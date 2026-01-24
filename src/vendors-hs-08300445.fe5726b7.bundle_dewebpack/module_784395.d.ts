/**
 * 递归处理文件系统条目（File System Entry）的类型定义
 * 用于处理拖拽上传的文件和文件夹
 */

/**
 * 文件过滤函数类型
 * @param file - 待检查的文件对象
 * @returns 如果文件应该被包含则返回 true，否则返回 false
 */
type FileFilterFunction = (file: File) => boolean;

/**
 * 文件处理回调函数类型
 * @param files - 处理后的文件数组
 */
type FileHandlerCallback = (files: File[]) => void;

/**
 * 递归遍历文件系统条目并处理符合条件的文件
 * 
 * @param entries - DataTransferItemList 或包含 webkitGetAsEntry 方法的条目列表
 * @param callback - 当找到符合条件的文件时调用的回调函数
 * @param filter - 用于过滤文件的函数，返回 true 表示接受该文件
 * 
 * @example
 *