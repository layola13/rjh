/**
 * DWG 文件上传组件类型定义
 * 用于处理 DWG 文件上传、转换为 SVG 并启动编辑器
 */

/// <reference types="react" />

/**
 * 作业状态枚举
 */
export type JobState = 
  | 'DwgUploading'    // DWG 上传中
  | 'Translating'     // 转换中
  | 'SvgDownloading'  // SVG 下载中
  | 'StartEdit'       // 开始编辑
  | 'GotError'        // 发生错误
  | 'Cancel';         // 取消

/**
 * 组件状态接口
 */
export interface TilesUploaderState {
  /** 上传/转换进度（0-100） */
  progress: number;
  /** 当前作业状态 */
  jobState: JobState;
  /** 错误消息 */
  errMsg: string;
}

/**
 * 组件属性接口
 */
export interface TilesUploaderProps {
  /** 文件加载完成回调 */
  onLoad: () => void;
  /** 需要显示引导时的回调 */
  needGuide: () => void;
}

/**
 * 文件上传选项接口
 */
export interface UploadOptions {
  /** 内容类型 */
  contentType: string;
  /** 是否处理数据 */
  processData: boolean;
  /** 上传进度回调 */
  uploadProgress?: (progress: number) => void;
}

/**
 * 创建作业响应接口
 */
export interface CreateJobResponse {
  /** 作业 ID */
  id: string;
  /** 上传的文件名 */
  uploadFileName?: string;
}

/**
 * 作业状态响应接口
 */
export interface JobStatusResponse {
  /** 返回状态码 */
  ret: string[];
  /** 作业数据 */
  data: {
    /** 作业状态：finish | fail | processing */
    status: 'finish' | 'fail' | 'processing';
  };
}

/**
 * 导入数据响应接口
 */
export interface ImportDataResponse {
  /** 返回状态码 */
  ret: string[];
  /** 数据 */
  data: {
    /** SVG 文件 URL */
    url: string;
  };
}

/**
 * SVG 验证结果接口
 */
export interface SvgVerifyResult {
  /** 验证是否成功 */
  status: boolean;
  /** 错误消息（如果验证失败） */
  msg?: string;
}

/**
 * 错误信息接口
 */
export interface ErrorInfo {
  /** 错误详细信息 */
  info: unknown;
  /** 错误路径 */
  path: {
    /** 文件路径 */
    file: string;
    /** 函数名 */
    functionName: string;
  };
}

/**
 * DWG 文件上传器组件
 * 
 * @description
 * 该组件负责处理 DWG 文件的上传、转换和编辑流程：
 * 1. 用户上传 DWG 文件
 * 2. 文件上传到服务器
 * 3. 创建转换作业
 * 4. 轮询作业状态直到转换完成
 * 5. 下载转换后的 SVG 文件
 * 6. 验证 SVG 文件
 * 7. 启动编辑器
 * 
 * @example
 *