/**
 * 文件上传组件声明
 * @module FileUploader
 */

import React from 'react';

/**
 * 加载状态枚举
 */
export type LoadingState = 'na' | 'start' | 'loading' | 'cancel' | 'Success' | 'fail';

/**
 * 上传类型
 */
export type UploadType = 'picture' | string;

/**
 * 进度事件接口
 */
export interface ProgressEvent {
  /** 已加载的字节数 */
  loaded: number;
  /** 总字节数 */
  total: number;
  /** 是否可计算长度 */
  lengthComputable: boolean;
}

/**
 * 上传成功响应接口
 */
export interface UploadSuccessResponse {
  /** 上传的文件名 */
  uploadFileName?: string;
  /** 其他响应属性 */
  [key: string]: any;
}

/**
 * 文件处理器类型
 * @param file - 要上传的文件
 * @param onProgress - 进度回调函数
 * @param onSuccess - 成功回调函数
 * @param onError - 错误回调函数
 */
export type FileHandler = (
  file: File,
  onProgress: (event: ProgressEvent) => void,
  onSuccess: (response: UploadSuccessResponse) => void,
  onError: (error: any) => void
) => void;

/**
 * 文件上传组件属性接口
 */
export interface FileUploaderProps {
  /** 上传成功回调 */
  onLoadSuccess?: (response: UploadSuccessResponse) => void;
  
  /** 更新表单状态回调 */
  updateForm?: (isUploading: boolean) => void;
  
  /** 上传失败回调 */
  onLoadFail?: (error: any) => void;
  
  /** 是否支持多文件上传 */
  multiple?: boolean;
  
  /** 接受的文件类型 (MIME类型) */
  accept?: string;
  
  /** 是否显示上传按钮 */
  show?: boolean;
  
  /** 自定义文件处理函数 */
  onHandleFile?: FileHandler;
  
  /** 上传接口URL (必需) */
  url: string;
  
  /** 上传类型 */
  uploadType?: UploadType;
}

/**
 * 文件上传组件状态接口
 */
export interface FileUploaderState {
  /** 上传进度百分比 */
  progress: string;
  
  /** 当前加载状态 */
  loadingState: LoadingState;
}

/**
 * 文件上传组件类
 * 提供文件选择、上传、进度跟踪和状态管理功能
 */
export interface FileUploaderComponent extends React.Component<FileUploaderProps, FileUploaderState> {
  /** 文件输入元素引用 */
  refs: {
    fileElem: HTMLInputElement;
    form: HTMLFormElement;
    fileSubmit: HTMLInputElement;
  };
  
  /** AJAX Promise对象 */
  promise?: any;
  
  /**
   * 处理上传错误
   * @param error - 错误对象
   */
  onLoadError(error: any): void;
  
  /**
   * 取消上传
   */
  onLoadCancel(): void;
  
  /**
   * 开始上传
   */
  onLoadStart(): void;
  
  /**
   * 更新上传进度
   * @param event - 进度事件
   */
  onProgress(event: ProgressEvent): void;
  
  /**
   * 上传成功处理
   * @param response - 响应数据
   */
  onLoadSuccess(response: UploadSuccessResponse): void;
  
  /**
   * 处理文件上传逻辑
   * @param file - 要上传的文件
   */
  onHandleFile(file: File): void;
  
  /**
   * 处理文件选择事件
   */
  handleFile(): void;
  
  /**
   * 重置文件输入框
   */
  resetInput(): void;
  
  /**
   * 打开文件选择对话框
   */
  chooseFile(): void;
  
  /**
   * 取消正在进行的上传
   */
  cancelLoading(): void;
  
  /**
   * 渲染进度条
   */
  renderProgressBar(): React.ReactElement;
  
  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

/**
 * 文件上传组件
 * @example
 *