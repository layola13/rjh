/**
 * 图片处理工具模块
 * 提供图片URL处理、尺寸获取和适配容器等功能
 */

/**
 * 图片信息接口 - OSS返回的图片元数据
 */
interface ImageInfo {
  /** 图片宽度信息 */
  ImageWidth: {
    /** 宽度值（字符串格式） */
    value: string;
  };
  /** 图片高度信息 */
  ImageHeight: {
    /** 高度值（字符串格式） */
    value: string;
  };
}

/**
 * 获取图片原始信息的URL
 * @param imageUrl - 图片的原始URL
 * @returns 附加OSS图片信息查询参数的URL
 * @example
 * getOriginImgUrl('https://example.com/image.jpg')
 * // 返回: 'https://example.com/image.jpg?x-oss-process=image/info'
 */
export function getOriginImgUrl(imageUrl: string): string;

/**
 * 获取调整尺寸后的图片URL
 * @param imageUrl - 图片的原始URL
 * @param width - 目标宽度（像素）
 * @param height - 目标高度（像素）
 * @returns 附加OSS图片处理参数的URL，使用填充模式和100%质量
 * @example
 * getResizeImgUrl('https://example.com/image.jpg', 800, 600)
 * // 返回: 'https://example.com/image.jpg?x-oss-process=image/resize,limit_0,m_fill,w_800,h_600/quality,Q_100'
 */
export function getResizeImgUrl(
  imageUrl: string,
  width: number,
  height: number
): string;

/**
 * 获取图片的原始尺寸
 * @param infoUrl - 图片信息URL（通常由getOriginImgUrl生成）
 * @returns Promise，解析为[宽度, 高度]的数组
 * @throws 当fetch失败或JSON解析失败时抛出错误
 * @example
 * const [width, height] = await getOriginImgSize(infoUrl);
 * console.log(`图片尺寸: ${width}x${height}`);
 */
export function getOriginImgSize(infoUrl: string): Promise<[number, number]>;

/**
 * 将图片尺寸适配到容器中，保持宽高比
 * @param containerWidth - 容器宽度（像素）
 * @param containerHeight - 容器高度（像素）
 * @param imageWidth - 图片原始宽度（像素）
 * @param imageHeight - 图片原始高度（像素）
 * @returns 适配后的[宽度, 高度]数组，向下取整
 * @throws 当图片宽度或高度为0时抛出错误
 * @example
 * const [fitWidth, fitHeight] = fitImg2Container(1000, 800, 1920, 1080);
 * // 图片按比例缩放以适应容器
 */
export function fitImg2Container(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number
): [number, number];