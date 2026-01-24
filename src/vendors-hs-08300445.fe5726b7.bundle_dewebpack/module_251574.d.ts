/**
 * React Upload Component
 * A file upload component with support for drag-and-drop, custom request handling, and upload progress tracking
 */

import React from 'react';

/**
 * Represents a file with additional metadata for upload tracking
 */
export interface UploadFile {
  /** Unique identifier for the file */
  uid: string;
  /** File size in bytes */
  size: number;
  /** File name */
  name: string;
  /** File MIME type */
  type: string;
  /** Last modified timestamp */
  lastModified: number;
  /** Last modified date */
  lastModifiedDate: Date;
  /** Native File object */
  originFileObj?: File;
  /** Upload progress percentage (0-100) */
  percent?: number;
  /** Upload status */
  status?: 'uploading' | 'done' | 'error' | 'removed';
  /** Server response */
  response?: unknown;
  /** Error information */
  error?: unknown;
}

/**
 * Custom request options for implementing custom upload logic
 */
export interface UploadRequestOption {
  /** Callback when upload progress changes */
  onProgress?: (event: UploadProgressEvent) => void;
  /** Callback when upload fails */
  onError?: (error: Error) => void;
  /** Callback when upload succeeds */
  onSuccess?: (response: unknown, file: File) => void;
  /** Additional data to send with the request */
  data?: Record<string, unknown>;
  /** File to upload */
  file: File;
  /** File name */
  filename: string;
  /** Upload action URL */
  action: string;
  /** Custom headers */
  headers?: Record<string, string>;
  /** Whether to include credentials */
  withCredentials?: boolean;
}

/**
 * Upload progress event
 */
export interface UploadProgressEvent {
  /** Percentage of upload completed (0-100) */
  percent: number;
}

/**
 * Before upload hook return type
 */
export type BeforeUploadResult = boolean | File | Blob | Promise<boolean | File | Blob>;

/**
 * Component props for the Upload component
 */
export interface UploadProps {
  /** Component to render (default: 'span') */
  component?: React.ElementType;
  /** CSS class prefix (default: 'rc-upload') */
  prefixCls?: string;
  /** Upload action URL */
  action?: string;
  /** Additional data to send with upload request */
  data?: Record<string, unknown> | ((file: File) => Record<string, unknown>);
  /** Custom HTTP headers */
  headers?: Record<string, string>;
  /** File parameter name in upload request (default: 'file') */
  name?: string;
  /** Whether to use multipart/form-data (default: false) */
  multipart?: boolean;
  /** Whether to include credentials in CORS requests (default: false) */
  withCredentials?: boolean;
  /** Accepted file types (e.g., 'image/*', '.jpg,.png') */
  accept?: string;
  /** Whether to allow multiple file selection (default: false) */
  multiple?: boolean;
  /** Whether to open file dialog on click (default: true) */
  openFileDialogOnClick?: boolean;
  /** Callback when file upload starts */
  onStart?: (file: File) => void;
  /** Callback when upload fails */
  onError?: (error: Error, response: unknown, file: File) => void;
  /** Callback when upload succeeds */
  onSuccess?: (response: unknown, file: File) => void;
  /** Callback when upload progress changes */
  onProgress?: (event: UploadProgressEvent, file: File) => void;
  /** Hook before file upload, return false to cancel upload */
  beforeUpload?: (file: File, fileList: File[]) => BeforeUploadResult;
  /** Custom upload implementation */
  customRequest?: (options: UploadRequestOption) => void;
  /** Custom click handler for child elements */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Child elements */
  children?: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether component is disabled */
  disabled?: boolean;
}

/**
 * Internal uploader interface for imperative control
 */
interface UploaderRef {
  /** Abort an ongoing upload by file uid */
  abort: (file?: UploadFile) => void;
}

/**
 * Upload component class
 * Provides file upload functionality with customizable behavior and styling
 */
export default class Upload extends React.Component<UploadProps> {
  /**
   * Default prop values
   */
  static defaultProps: UploadProps;

  /**
   * Reference to the internal uploader component
   */
  private uploader?: UploaderRef;

  /**
   * Abort an ongoing file upload
   * @param file - File to abort (if not provided, aborts all uploads)
   */
  abort(file?: UploadFile): void;

  /**
   * Saves reference to the uploader component
   * @param uploader - Uploader component instance
   */
  private saveUploader(uploader: UploaderRef): void;

  /**
   * Renders the upload component
   */
  render(): React.ReactElement;
}