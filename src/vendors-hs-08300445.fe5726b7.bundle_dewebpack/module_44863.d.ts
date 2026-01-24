import * as React from 'react';

/**
 * 文件上传请求参数
 */
export interface UploadRequestOption<T = any> {
  /** 上传地址 */
  action: string;
  /** 文件字段名 */
  filename: string;
  /** 附加数据 */
  data?: Record<string, any>;
  /** 要上传的文件 */
  file: File;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 是否携带凭证 */
  withCredentials?: boolean;
  /** 请求方法 */
  method?: string;
  /** 上传进度回调 */
  onProgress?: ((event: UploadProgressEvent) => void) | null;
  /** 上传成功回调 */
  onSuccess: (response: T, xhr: XMLHttpRequest) => void;
  /** 上传失败回调 */
  onError: (error: Error, response: any) => void;
}

/**
 * 上传进度事件
 */
export interface UploadProgressEvent {
  /** 已上传百分比 */
  percent: number;
  /** 已上传字节数 */
  loaded?: number;
  /** 总字节数 */
  total?: number;
}

/**
 * 上传组件属性
 */
export interface UploadProps {
  /** 自定义上传请求实现 */
  customRequest?: (option: UploadRequestOption) => void | { abort: () => void };
  /** 上传地址，支持函数动态返回 */
  action?: string | ((file: File) => string | Promise<string>);
  /** 文件字段名，默认 'file' */
  name?: string;
  /** 附加数据，支持函数动态返回 */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /** 请求头 */
  headers?: Record<string, string>;
  /** 是否允许多选 */
  multiple?: boolean;
  /** 接受的文件类型 */
  accept?: string;
  /** 是否支持目录上传 */
  directory?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 组件ID */
  id?: string;
  /** 样式类名 */
  className?: string;
  /** 样式前缀，默认 'rc-upload' */
  prefixCls?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 是否携带凭证 */
  withCredentials?: boolean;
  /** 请求方法，默认 'post' */
  method?: string;
  /** 是否在点击时打开文件选择对话框，默认 true */
  openFileDialogOnClick?: boolean;
  
  /**
   * 上传前钩子，返回 false 或 Promise.reject 可阻止上传
   * @param file 当前文件
   * @param fileList 文件列表
   * @returns false 阻止上传；Promise<File|Blob> 可转换文件
   */
  beforeUpload?: (file: File, fileList: File[]) => boolean | File | Blob | Promise<File | Blob | boolean> | void;
  
  /**
   * 文件转换钩子，用于在上传前修改文件
   * @param file 原始文件
   * @returns 转换后的文件
   */
  transformFile?: (file: File) => File | Blob | Promise<File | Blob>;
  
  /**
   * 开始上传回调
   * @param file 文件对象
   */
  onStart?: (file: File) => void;
  
  /**
   * 上传进度回调
   * @param event 进度事件
   * @param file 文件对象
   */
  onProgress?: (event: UploadProgressEvent, file: File) => void;
  
  /**
   * 上传成功回调
   * @param response 服务器响应
   * @param file 文件对象
   * @param xhr XMLHttpRequest 对象
   */
  onSuccess?: (response: any, file: File, xhr: XMLHttpRequest) => void;
  
  /**
   * 上传失败回调
   * @param error 错误对象
   * @param response 响应数据
   * @param file 文件对象
   */
  onError?: (error: Error, response: any, file: File) => void;
  
  /**
   * 点击组件回调
   * @param event 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 鼠标进入回调
   * @param event 鼠标事件
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 鼠标离开回调
   * @param event 鼠标事件
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /** 子元素 */
  children?: React.ReactNode;
  
  /** 容器组件类型，默认 'div' */
  component?: string | React.ComponentType<any>;
}

/**
 * 上传组件状态
 */
export interface UploadState {
  /** 唯一标识符，用于重置 input */
  uid: string;
}

/**
 * 带 uid 的文件对象
 */
export interface FileWithUid extends File {
  /** 文件唯一标识 */
  uid: string;
}

/**
 * 上传组件类
 * 支持文件上传、拖拽上传、目录上传等功能
 */
export default class Upload extends React.Component<UploadProps, UploadState> {
  /** 组件是否已挂载 */
  private _isMounted: boolean;
  
  /** 文件输入元素引用 */
  private fileInput: HTMLInputElement | null;
  
  /** 上传请求映射表 */
  private reqs: Record<string, { abort: () => void }>;
  
  /**
   * 文件选择变化处理
   * @param event 变化事件
   */
  private onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * 点击处理
   * @param event 点击事件
   */
  private onClick: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 键盘按下处理
   * @param event 键盘事件
   */
  private onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  
  /**
   * 文件拖放处理
   * @param event 拖放事件
   */
  private onFileDrop: (event: React.DragEvent<HTMLElement>) => void;
  
  /**
   * 上传多个文件
   * @param files 文件列表
   */
  private uploadFiles: (files: FileList | File[]) => void;
  
  /**
   * 保存文件输入元素引用
   * @param input 输入元素
   */
  private saveFileInput: (input: HTMLInputElement | null) => void;
  
  /**
   * 上传单个文件
   * @param file 文件对象
   * @param fileList 文件列表
   */
  upload(file: File, fileList: File[]): void;
  
  /**
   * 发送上传请求
   * @param file 文件对象
   */
  post(file: FileWithUid): void;
  
  /**
   * 重置组件状态
   */
  reset(): void;
  
  /**
   * 中止上传
   * @param file 文件对象或文件 uid，不传则中止所有上传
   */
  abort(file?: File | FileWithUid | string): void;
}

/**
 * 验证文件是否符合 accept 规则
 * @param file 文件对象
 * @param accept accept 属性值
 * @returns 是否符合规则
 */
export function attrAccept(file: File, accept?: string): boolean;

/**
 * 遍历目录文件
 * @param items DataTransferItemList
 * @param callback 回调函数
 * @param filter 过滤函数
 */
export function traverseFileTree(
  items: DataTransferItemList | DataTransferItem[],
  callback: (files: File[]) => void,
  filter?: (file: File) => boolean
): void;

/**
 * 生成唯一ID
 * @returns 唯一标识符
 */
export function uid(): string;

/**
 * 默认上传请求实现
 * @param option 请求参数
 * @returns 包含 abort 方法的对象
 */
export function defaultRequest(option: UploadRequestOption): { abort: () => void };