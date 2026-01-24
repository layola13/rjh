/**
 * 图片压缩工具
 * @param imageDataUrl - 图片的Base64数据URL
 * @param quality - 压缩质量，范围0-1，默认0.6
 * @param mimeType - 输出图片MIME类型，默认'image/jpeg'
 * @returns Promise<string> 返回压缩后的Base64数据URL
 */
export declare function compressImage(
  imageDataUrl: string,
  quality?: number,
  mimeType?: string
): Promise<string>;

/**
 * 节流函数 - 限制函数在指定时间间隔内只执行一次
 * @param fn - 需要节流的函数
 * @param interval - 时间间隔（毫秒）
 * @returns 节流后的函数
 */
export declare function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void;

/**
 * 从URL查询参数中获取指定参数的值
 * @param paramName - 参数名称
 * @returns 参数值，不存在则返回null
 */
export declare function getUrlParam(paramName: string): string | null;

/**
 * 数字保留指定小数位（向下取整）
 * @param num - 需要处理的数字
 * @param decimalPlaces - 保留的小数位数，默认2位
 * @returns 处理后的数字
 */
export declare function floorToDecimal(num: number, decimalPlaces?: number): number;

/**
 * 元素相对文档的位置信息
 */
export interface ElementOffset {
  /** 距离文档顶部的距离 */
  top: number;
  /** 距离文档左侧的距离 */
  left: number;
}

/**
 * 获取元素相对于文档的绝对位置
 * @param element - DOM元素
 * @returns 元素的top和left偏移量
 */
export declare function getElementOffset(element: HTMLElement): ElementOffset;

/**
 * 剪贴板操作工具
 */
export interface ClipboardUtil {
  /**
   * 复制文本到剪贴板
   * @param text - 要复制的文本内容
   */
  copy(text: string): void;
}

/**
 * 创建剪贴板工具实例
 * @returns 剪贴板操作工具对象
 */
export declare function createClipboard(): ClipboardUtil;

/**
 * 判断指定时间戳是否已过期（是否小于等于当前时间）
 * @param timestamp - 时间戳（毫秒）或日期字符串
 * @returns true表示已过期，false表示未过期
 */
export declare function isExpired(timestamp: string | number): boolean;

/**
 * 下载Base64编码的文件
 * @param base64Data - Base64数据URL（格式: data:image/png;base64,xxx）
 * @param filename - 保存的文件名
 */
export declare function downloadBase64File(base64Data: string, filename: string): void;

/**
 * 检测当前设备是否为iOS系统（iPhone/iPad）
 * @returns true表示iOS设备，false表示其他设备
 */
export declare function isIOS(): boolean;

/**
 * 检测当前设备是否为Android系统
 * @returns true表示Android设备，false表示其他设备
 */
export declare function isAndroid(): boolean;