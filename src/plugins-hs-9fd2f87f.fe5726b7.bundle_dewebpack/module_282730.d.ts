/**
 * DWG 文件上传和转换组件类型定义
 * 负责处理 DWG 文件上传、转换为 SVG 以及下载的完整流程
 */

/**
 * 任务状态枚举
 */
export type JobState =
  | 'DwgUploading'      // DWG 文件上传中
  | 'Translating'       // 转换中（DWG -> SVG）
  | 'SvgDownloading'    // SVG 下载中
  | 'GotError'          // 发生错误
  | 'Cancel'            // 已取消
  | 'DownloadSvgFinished'; // SVG 下载完成

/**
 * 导入任务创建请求参数
 */
export interface CreateJobRequest {
  /** DWG 文件的 URL 地址 */
  url: string;
}

/**
 * 导入任务信息
 */
export interface ImportJob {
  /** 任务唯一标识符 */
  id: string;
  /** 上传的文件名 */
  uploadFileName: string;
  /** 任务状态 */
  status?: 'processing' | 'finish' | 'fail';
}

/**
 * 导入数据请求参数
 */
export interface GetImportDataRequest {
  /** 任务 ID */
  jobId: string;
  /** 数据类型（通常为 'svg'） */
  data: 'svg';
}

/**
 * 导入任务状态请求参数
 */
export interface GetJobStatusRequest {
  /** 任务 ID */
  jobId: string;
}

/**
 * 文件上传配置选项
 */
export interface UploadOptions {
  /** 内容类型 */
  contentType: string;
  /** 是否处理数据 */
  processData: boolean;
  /** 上传进度回调函数 */
  uploadProgress: ProgressCallback;
  /** 资源类型（仅用于 'fp' 租户） */
  resType?: 'model';
}

/**
 * SVG 验证结果
 */
export interface SvgVerificationResult {
  /** 验证状态 */
  status: boolean;
  /** 错误消息（验证失败时） */
  msg?: string;
}

/**
 * CAD 命令数据
 */
export interface CadCommandData {
  /** 命令名称 */
  name: 'command.cad';
  /** 命令动作 */
  action: 'start';
  /** 实例模型数据 */
  data: unknown;
}

/**
 * 上传进度回调函数
 * @param progress - 进度对象或百分比
 */
export type ProgressCallback = (progress: ProgressEvent | number) => void;

/**
 * 加载成功回调函数
 * @param job - 导入任务信息
 */
export type LoadSuccessCallback = (job: ImportJob) => void;

/**
 * 加载失败回调函数
 * @param error - 错误对象
 */
export type LoadFailCallback = (error: Error) => void;

/**
 * 命令回调函数
 * @param data - CAD 命令数据
 */
export type CommandCallback = (data: CadCommandData) => void;

/**
 * 组件属性接口
 */
export interface DwgUploaderProps {
  /** 加载完成回调 */
  onLoad?: () => void;
  /** 需要引导回调 */
  needGuide?: () => void;
  /** 命令执行回调 */
  callback?: CommandCallback;
}

/**
 * 组件状态接口
 */
export interface DwgUploaderState {
  /** 当前进度（0-100） */
  progress: number;
  /** 当前任务状态 */
  jobState: JobState;
  /** 命令回调函数 */
  callback?: CommandCallback;
  /** 错误消息 */
  errMsg?: string;
}

/**
 * DWG 上传器组件类
 * 处理 DWG 文件的上传、转换和下载流程
 */
export interface DwgUploaderComponent extends React.Component<DwgUploaderProps, DwgUploaderState> {
  /** 任务 ID */
  jobId: string;
  /** 文件名（不含扩展名） */
  fileName: string;
  /** SVG 内容 */
  svg: string;
  /** 错误对象 */
  error: Error | string;

  /**
   * 创建导入任务
   * @param url - 文件 URL
   * @returns 导入任务信息的 Promise
   */
  _createJob(url: string): Promise<ImportJob>;

  /**
   * 处理文件上传
   * @param file - 要上传的文件
   * @param progressCallback - 进度回调
   * @param successCallback - 成功回调
   * @param failCallback - 失败回调
   */
  onHandleFile(
    file: File,
    progressCallback: ProgressCallback,
    successCallback: LoadSuccessCallback,
    failCallback: LoadFailCallback
  ): void;

  /**
   * 加载成功处理
   * @param job - 导入任务信息
   */
  onLoadSuccess(job: ImportJob): void;

  /**
   * 加载失败处理
   * @param error - 错误对象
   */
  onLoadFail(error: Error): void;

  /**
   * 取消操作
   */
  onCancel(): void;

  /**
   * SVG 下载完成处理
   */
  downloadSvgFinished(): void;

  /**
   * 错误处理
   */
  gotError(): void;

  /**
   * 下载 SVG 文件
   * @returns Promise
   */
  downloadSvg(): Promise<void>;

  /**
   * 将 DWG 转换为 SVG
   */
  translateDwgToSvg(): void;

  /**
   * 重新加载
   */
  loadAgain(): void;

  /**
   * 触发引导
   */
  needGuide(): void;

  /**
   * 检查是否正在处理
   * @returns 是否正在处理中
   */
  isProcessing(): boolean;
}

/**
 * DWG 上传器组件（默认导出）
 */
declare const DwgUploader: React.ComponentClass<DwgUploaderProps, DwgUploaderState>;

export default DwgUploader;