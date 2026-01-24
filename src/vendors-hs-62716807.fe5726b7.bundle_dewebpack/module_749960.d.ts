/**
 * Upload List Item Component
 * 上传列表项组件 - 用于渲染上传文件列表中的单个文件项
 */

import React from 'react';
import { ProgressProps } from 'rc-progress';

/**
 * 上传文件状态
 */
export type UploadFileStatus = 'uploading' | 'done' | 'error' | 'removed' | 'success';

/**
 * 上传列表类型
 */
export type UploadListType = 'text' | 'picture' | 'picture-card';

/**
 * 上传文件对象
 */
export interface UploadFile<T = any> {
  /** 文件唯一标识 */
  uid: string;
  /** 文件大小 */
  size?: number;
  /** 文件名 */
  name: string;
  /** 文件名（不含扩展名） */
  fileName?: string;
  /** 最后修改时间 */
  lastModified?: number;
  /** 最后修改日期 */
  lastModifiedDate?: Date;
  /** 文件下载/访问URL */
  url?: string;
  /** 上传状态 */
  status?: UploadFileStatus;
  /** 上传进度百分比 */
  percent?: number;
  /** 缩略图URL */
  thumbUrl?: string;
  /** 原始文件对象 */
  originFileObj?: File;
  /** 服务器响应内容 */
  response?: T;
  /** 错误信息 */
  error?: any;
  /** 链接属性 */
  linkProps?: string | Record<string, any>;
  /** 上传类型 */
  type?: string;
  /** 跨域设置 */
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
  /** 预览地址 */
  preview?: string;
}

/**
 * 国际化文本
 */
export interface UploadLocale {
  /** 上传中文本 */
  uploading?: string;
  /** 移除文件文本 */
  removeFile?: string;
  /** 下载文件文本 */
  downloadFile?: string;
  /** 上传错误文本 */
  uploadError?: string;
  /** 预览文件文本 */
  previewFile?: string;
}

/**
 * 图标渲染函数类型
 */
export type IconRenderFunction = (file: UploadFile) => React.ReactNode;

/**
 * 操作图标渲染函数类型
 * @param customIcon - 自定义图标
 * @param callback - 点击回调函数
 * @param prefixCls - 样式前缀
 * @param title - 图标标题
 */
export type ActionIconRenderFunction = (
  customIcon: React.ReactNode,
  callback: () => void,
  prefixCls: string,
  title?: string
) => React.ReactNode;

/**
 * 列表项自定义渲染函数类型
 * @param originNode - 原始节点
 * @param file - 文件对象
 * @param fileList - 文件列表
 */
export type ItemRenderFunction = (
  originNode: React.ReactElement,
  file: UploadFile,
  fileList: UploadFile[]
) => React.ReactNode;

/**
 * 判断是否为图片URL的函数类型
 */
export type IsImageUrlFunction = (file: UploadFile) => boolean;

/**
 * 预览处理函数类型
 */
export type PreviewFileHandler = (file: UploadFile, event: React.MouseEvent<HTMLElement>) => void;

/**
 * 下载处理函数类型
 */
export type DownloadFileHandler = (file: UploadFile) => void;

/**
 * 移除处理函数类型
 */
export type RemoveFileHandler = (file: UploadFile) => void;

/**
 * 上传列表项组件属性
 */
export interface UploadListItemProps {
  /** 样式类名前缀 */
  prefixCls?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 国际化配置 */
  locale: UploadLocale;
  /** 列表类型 */
  listType?: UploadListType;
  /** 当前文件对象 */
  file: UploadFile;
  /** 文件列表 */
  items: UploadFile[];
  /** 进度条配置 */
  progress?: ProgressProps;
  /** 自定义图标渲染函数 */
  iconRender?: IconRenderFunction;
  /** 自定义操作图标渲染函数 */
  actionIconRender?: ActionIconRenderFunction;
  /** 自定义列表项渲染函数 */
  itemRender?: ItemRenderFunction;
  /** 判断是否为图片URL */
  isImgUrl?: IsImageUrlFunction;
  /** 是否显示预览图标 */
  showPreviewIcon?: boolean;
  /** 是否显示移除图标 */
  showRemoveIcon?: boolean;
  /** 是否显示下载图标 */
  showDownloadIcon?: boolean;
  /** 自定义移除图标 */
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  /** 自定义下载图标 */
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  /** 预览回调 */
  onPreview?: PreviewFileHandler;
  /** 下载回调 */
  onDownload?: DownloadFileHandler;
  /** 移除回调 */
  onClose?: RemoveFileHandler;
}

/**
 * 上传列表项组件
 * 用于渲染上传文件列表中的单个文件项，支持不同的展示类型（文本、图片、卡片）
 * 
 * @example
 *