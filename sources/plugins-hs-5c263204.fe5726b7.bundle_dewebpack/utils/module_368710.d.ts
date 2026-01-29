/**
 * 反馈和文件上传工具模块
 * 提供用户反馈提交、文件URL获取、S3上传、URL解析和提示显示等功能
 */

/**
 * 反馈提交的响应数据结构
 */
interface FeedbackResponse {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data?: Record<string, unknown>;
}

/**
 * 反馈数据结构
 */
interface FeedbackData {
  /** 反馈内容或其他相关属性 */
  [key: string]: unknown;
}

/**
 * 提交用户反馈
 * @param feedbackData - 要提交的反馈数据对象
 * @returns 成功时返回反馈响应数据的Promise，失败时reject
 */
export function sendFeedback(feedbackData: FeedbackData): Promise<Record<string, unknown>>;

/**
 * 获取文件的Data URL
 * 使用FileReader将文件转换为base64编码的data URL
 * @param file - 要读取的文件对象
 * @returns 成功时返回文件的data URL，失败时reject空值
 */
export function getFileUrl(file: File): Promise<string>;

/**
 * 上传文件到S3存储服务
 * @param file - 要上传的文件对象
 * @returns 上传结果的Promise
 */
export function uploadFileToS3(file: File): Promise<unknown>;

/**
 * 解析并构建图片资源URL路径
 * 仅支持常见图片格式（gif, jpg, jpeg, png, svg）
 * @param fileName - 图片文件名（包含扩展名）
 * @returns 如果是支持的图片格式返回完整路径，否则返回空字符串
 */
export function parseURL(fileName: string): string;

/**
 * LiveHint状态类型
 * - "completed canops": 默认完成状态
 * - 其他自定义状态字符串
 */
type LiveHintStatus = "completed canops" | string;

/**
 * 显示实时提示消息
 * @param message - 提示消息内容
 * @param type - 提示类型或级别
 * @param status - 提示状态，默认为"completed canops"
 */
export function showLiveHint(
  message: string,
  type: string,
  status?: LiveHintStatus
): void;