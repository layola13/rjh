import * as React from 'react';

/**
 * File object structure used throughout the Upload component
 */
export interface UploadFile<T = any> {
  /** Unique identifier for the file */
  uid: string;
  /** File size in bytes */
  size?: number;
  /** Original file name */
  name: string;
  /** Optional file name for display */
  fileName?: string;
  /** Last modified timestamp */
  lastModified?: number;
  /** Last modified date */
  lastModifiedDate?: Date;
  /** File URL for preview/download */
  url?: string;
  /** Upload status */
  status?: 'uploading' | 'done' | 'error' | 'removed';
  /** Upload progress percentage (0-100) */
  percent?: number;
  /** Thumbnail URL */
  thumbUrl?: string;
  /** Origin File object */
  originFileObj?: File;
  /** Server response */
  response?: T;
  /** Error information */
  error?: any;
  /** Link properties */
  linkProps?: any;
  /** File type */
  type?: string;
  /** XMLHttpRequest instance */
  xhr?: XMLHttpRequest;
  /** Preview data (base64 or blob URL) */
  preview?: string;
}

/**
 * Configuration for the upload list display
 */
export interface ShowUploadListInterface {
  /** Whether to show remove icon */
  showRemoveIcon?: boolean;
  /** Whether to show preview icon */
  showPreviewIcon?: boolean;
  /** Whether to show download icon */
  showDownloadIcon?: boolean;
  /** Custom remove icon */
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  /** Custom download icon */
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  /** Custom preview icon */
  previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
}

/**
 * Upload change event parameter
 */
export interface UploadChangeParam<T = UploadFile> {
  /** Current file being uploaded */
  file: T;
  /** Complete file list */
  fileList: T[];
  /** Upload event (for progress tracking) */
  event?: UploadProgressEvent;
}

/**
 * Upload progress event
 */
export interface UploadProgressEvent extends Partial<ProgressEvent> {
  /** Progress percentage */
  percent?: number;
}

/**
 * Locale text configuration
 */
export interface UploadLocale {
  /** Upload button text */
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
 * Upload component props
 */
export interface UploadProps<T = any> {
  /** Upload type */
  type?: 'drag' | 'select';
  /** File upload URL */
  action?: string | ((file: UploadFile) => string | Promise<string>);
  /** Upload request method */
  method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
  /** Directory upload (webkitdirectory attribute) */
  directory?: boolean;
  /** Additional data to send with upload */
  data?: Record<string, any> | ((file: UploadFile) => Record<string, any> | Promise<Record<string, any>>);
  /** Request headers */
  headers?: Record<string, string>;
  /** Accept file types (input accept attribute) */
  accept?: string;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Hook before uploading, return false to prevent upload */
  beforeUpload?: (file: File, fileList: File[]) => boolean | void | Promise<File | Blob | boolean | void>;
  /** Upload change callback */
  onChange?: (info: UploadChangeParam<UploadFile<T>>) => void;
  /** File list */
  fileList?: UploadFile<T>[];
  /** Default file list */
  defaultFileList?: UploadFile<T>[];
  /** Remove file callback */
  onRemove?: (file: UploadFile<T>) => boolean | void | Promise<boolean | void>;
  /** Preview file callback */
  onPreview?: (file: UploadFile<T>) => void;
  /** Download file callback */
  onDownload?: (file: UploadFile<T>) => void;
  /** Whether to show upload list */
  showUploadList?: boolean | ShowUploadListInterface;
  /** List display type */
  listType?: 'text' | 'picture' | 'picture-card';
  /** Component CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Disabled state */
  disabled?: boolean;
  /** Custom style prefix */
  prefixCls?: string;
  /** Custom file preview function */
  previewFile?: (file: File | Blob) => Promise<string>;
  /** Custom icon render */
  iconRender?: (file: UploadFile<T>, listType?: 'text' | 'picture' | 'picture-card') => React.ReactNode;
  /** Custom image URL detection */
  isImageUrl?: (file: UploadFile) => boolean;
  /** Progress bar configuration */
  progress?: {
    strokeColor?: string | { from: string; to: string };
    strokeWidth?: number;
    format?: (percent?: number) => React.ReactNode;
    showInfo?: boolean;
  };
  /** Custom list item render */
  itemRender?: (
    originNode: React.ReactElement,
    file: UploadFile,
    fileList: UploadFile[],
    actions: { download: () => void; preview: () => void; remove: () => void }
  ) => React.ReactNode;
  /** Maximum number of files allowed */
  maxCount?: number;
  /** Component ID */
  id?: string;
  /** Upload button/area content */
  children?: React.ReactNode;
  /** Enable server-side rendering support */
  supportServerRender?: boolean;
  /** Locale configuration */
  locale?: UploadLocale;
  /** Component name (for upload request) */
  name?: string;
  /** Send cookies with request */
  withCredentials?: boolean;
  /** Open file dialog on click */
  openFileDialogOnClick?: boolean;
}

/**
 * Upload component ref methods
 */
export interface UploadRef {
  /** Trigger file upload start */
  onStart: (file: File) => void;
  /** Trigger file upload success */
  onSuccess: (response: any, file: UploadFile, xhr: XMLHttpRequest) => void;
  /** Trigger file upload progress */
  onProgress: (event: UploadProgressEvent, file: UploadFile) => void;
  /** Trigger file upload error */
  onError: (error: Error, response: any, file: UploadFile) => void;
  /** Get current file list */
  fileList: UploadFile[];
  /** Upload instance reference */
  upload: any;
  /** Force component update */
  forceUpdate: () => void;
}

/**
 * Dragger component props (extends Upload props)
 */
export interface DraggerProps<T = any> extends UploadProps<T> {
  /** Custom dragger height */
  height?: number;
}

/**
 * Upload component interface
 */
export interface UploadComponent extends React.ForwardRefExoticComponent<UploadProps & React.RefAttributes<UploadRef>> {
  /** Drag and drop upload component */
  Dragger: React.FC<DraggerProps>;
}

declare const Upload: UploadComponent;

export default Upload;