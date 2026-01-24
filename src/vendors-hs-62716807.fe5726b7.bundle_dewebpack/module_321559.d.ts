/**
 * Upload List Component Type Definitions
 * 上传列表组件类型定义
 */

import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { ProgressProps } from 'antd/lib/progress';

/**
 * Upload file status
 * 上传文件状态
 */
export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

/**
 * Upload list type
 * 上传列表展示类型
 */
export type UploadListType = 'text' | 'picture' | 'picture-card';

/**
 * Upload file item
 * 上传文件项
 */
export interface UploadFile<T = any> {
  /** Unique file ID */
  uid: string;
  /** File size in bytes */
  size?: number;
  /** File name */
  name: string;
  /** File name without extension */
  fileName?: string;
  /** Last modified timestamp */
  lastModified?: number;
  /** Last modified date */
  lastModifiedDate?: Date;
  /** Download URL */
  url?: string;
  /** Upload status */
  status?: UploadFileStatus;
  /** Upload progress percent (0-100) */
  percent?: number;
  /** Thumbnail URL */
  thumbUrl?: string;
  /** Original file object */
  originFileObj?: File | Blob;
  /** Server response */
  response?: T;
  /** Upload error */
  error?: any;
  /** Link properties */
  linkProps?: any;
  /** File type */
  type?: string;
  /** Cross origin setting */
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  /** Additional data */
  [key: string]: any;
}

/**
 * Upload list locale text
 * 上传列表国际化文本
 */
export interface UploadLocale {
  /** Uploading text */
  uploading?: string;
  /** Remove file text */
  removeFile?: string;
  /** Download file text */
  downloadFile?: string;
  /** Upload error text */
  uploadError?: string;
  /** Preview file text */
  previewFile?: string;
}

/**
 * Icon render function
 * 图标渲染函数
 */
export type IconRenderFunction = (
  file: UploadFile,
  listType?: UploadListType
) => ReactNode;

/**
 * Action icon render function
 * 操作图标渲染函数
 */
export type ActionIconRenderFunction = (
  icon: ReactNode,
  action: () => void,
  prefixCls: string,
  title?: string
) => ReactNode;

/**
 * Item render function
 * 列表项渲染函数
 */
export type ItemRenderFunction = (
  originNode: ReactElement,
  file: UploadFile,
  fileList: UploadFile[],
  actions: {
    download: () => void;
    preview: () => void;
    remove: () => void;
  }
) => ReactNode;

/**
 * Preview file function
 * 文件预览函数 - 返回预览图片URL或Promise
 */
export type PreviewFileFunction = (
  file: File | Blob
) => Promise<string> | string;

/**
 * Image URL validation function
 * 图片URL验证函数
 */
export type IsImageUrlFunction = (file: UploadFile) => boolean;

/**
 * Upload List Props
 * 上传列表组件属性
 */
export interface UploadListProps {
  /** List type - determines the display style */
  listType?: UploadListType;
  /** File list */
  items?: UploadFile[];
  /** Progress bar configuration */
  progress?: ProgressProps;
  /** CSS class prefix */
  prefixCls?: string;
  /** Show preview icon */
  showPreviewIcon?: boolean;
  /** Show remove icon */
  showRemoveIcon?: boolean;
  /** Show download icon */
  showDownloadIcon?: boolean;
  /** Custom remove icon */
  removeIcon?: ReactNode | ((file: UploadFile) => ReactNode);
  /** Custom download icon */
  downloadIcon?: ReactNode | ((file: UploadFile) => ReactNode);
  /** Custom preview icon */
  previewIcon?: ReactNode | ((file: UploadFile) => ReactNode);
  /** Locale text configuration */
  locale?: UploadLocale;
  /** Custom icon render function */
  iconRender?: IconRenderFunction;
  /** Check if file is image URL */
  isImageUrl?: IsImageUrlFunction;
  /** Preview file handler - generate preview image */
  previewFile?: PreviewFileFunction;
  /** Custom item render function */
  itemRender?: ItemRenderFunction;
  /** Custom action icon render function */
  actionIconRender?: ActionIconRenderFunction;
  /** Append action element (usually upload button for picture-card) */
  appendAction?: ReactNode;
  /** Preview callback */
  onPreview?: (file: UploadFile) => void;
  /** Download callback */
  onDownload?: (file: UploadFile) => void;
  /** Remove callback */
  onRemove?: (file: UploadFile) => void | boolean | Promise<void | boolean>;
}

/**
 * Upload List Ref Methods
 * 上传列表组件引用方法
 */
export interface UploadListRef {
  /** Handle preview action */
  handlePreview: (file: UploadFile, event: React.MouseEvent) => void;
  /** Handle download action */
  handleDownload: (file: UploadFile) => void;
}

/**
 * Upload List Component
 * 上传列表组件
 */
declare const UploadList: React.ForwardRefExoticComponent<
  UploadListProps & React.RefAttributes<UploadListRef>
>;

export default UploadList;