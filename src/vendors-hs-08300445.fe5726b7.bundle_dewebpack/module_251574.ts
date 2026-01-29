import React, { Component, ReactElement } from 'react';
import AjaxUploader from './AjaxUploader';

interface UploadFile {
  uid: string;
  name: string;
  size?: number;
  type?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
}

interface UploadProgressEvent {
  percent: number;
  loaded: number;
  total: number;
}

interface CustomRequestOptions {
  onProgress: (event: UploadProgressEvent) => void;
  onError: (error: Error) => void;
  onSuccess: (response: any, file: UploadFile) => void;
  data: Record<string, any>;
  filename: string;
  file: UploadFile;
  withCredentials: boolean;
  action: string;
  headers: Record<string, string>;
}

interface BeforeUploadResult {
  file?: File;
  fileList?: File[];
}

interface UploadProps {
  component?: string;
  prefixCls?: string;
  data?: Record<string, any> | ((file: UploadFile) => Record<string, any>);
  headers?: Record<string, string>;
  name?: string;
  multipart?: boolean;
  onStart?: (file: UploadFile) => void;
  onError?: (error: Error, response: any, file: UploadFile) => void;
  onSuccess?: (response: any, file: UploadFile) => void;
  onProgress?: (event: UploadProgressEvent, file: UploadFile) => void;
  multiple?: boolean;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<BeforeUploadResult> | null;
  customRequest?: (options: CustomRequestOptions) => void | null;
  withCredentials?: boolean;
  openFileDialogOnClick?: boolean;
  action?: string;
  accept?: string;
  directory?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

function noop(): void {}

class Upload extends Component<UploadProps> {
  static defaultProps: UploadProps = {
    component: 'span',
    prefixCls: 'rc-upload',
    data: {},
    headers: {},
    name: 'file',
    multipart: false,
    onStart: noop,
    onError: noop,
    onSuccess: noop,
    multiple: false,
    beforeUpload: null,
    customRequest: null,
    withCredentials: false,
    openFileDialogOnClick: true,
  };

  private uploader?: AjaxUploader;

  saveUploader = (uploaderInstance: AjaxUploader): void => {
    this.uploader = uploaderInstance;
  };

  abort(file: UploadFile): void {
    this.uploader?.abort(file);
  }

  render(): ReactElement {
    return React.createElement(AjaxUploader, {
      ...this.props,
      ref: this.saveUploader,
    });
  }
}

export default Upload;