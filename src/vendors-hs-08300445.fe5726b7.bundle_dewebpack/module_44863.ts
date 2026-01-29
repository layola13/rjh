import React, { Component, ReactNode, CSSProperties, MouseEvent, KeyboardEvent, DragEvent, ChangeEvent } from 'react';
import classNames from 'classnames';
import pickAttrs from './utils/pickAttrs';
import attrAccept from './utils/attrAccept';
import traverseFileTree from './utils/traverseFileTree';
import getUid from './utils/getUid';
import defaultRequest from './request';

interface UploadFile extends File {
  uid: string;
}

interface UploadRequestOption {
  action: string;
  filename: string;
  data: Record<string, unknown>;
  file: File;
  headers: Record<string, string>;
  withCredentials: boolean;
  method: string;
  onProgress: ((event: ProgressEvent) => void) | null;
  onSuccess: (response: unknown, xhr: XMLHttpRequest) => void;
  onError: (error: Error, response: unknown) => void;
}

interface UploadRequestTask {
  abort?: () => void;
}

interface UploadProps {
  component?: string | React.ComponentType<unknown>;
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
  multiple?: boolean;
  accept?: string;
  children?: ReactNode;
  directory?: boolean;
  openFileDialogOnClick?: boolean;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onClick?: (event: MouseEvent) => void;
  action?: string | ((file: File) => string | Promise<string>);
  data?: Record<string, unknown> | ((file: File) => Record<string, unknown>);
  headers?: Record<string, string>;
  withCredentials?: boolean;
  method?: string;
  name?: string;
  customRequest?: (option: UploadRequestOption) => UploadRequestTask;
  transformFile?: (file: File) => File | Promise<File>;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<File | undefined> | void;
  onStart?: (file: File) => void;
  onProgress?: (event: ProgressEvent, file: File) => void;
  onSuccess?: (response: unknown, file: File, xhr: XMLHttpRequest) => void;
  onError?: (error: Error, response: unknown, file: File) => void;
}

interface UploadState {
  uid: string;
}

class Upload extends Component<UploadProps, UploadState> {
  private _isMounted: boolean = false;
  private fileInput: HTMLInputElement | null = null;
  private reqs: Record<string, UploadRequestTask> = {};

  state: UploadState = {
    uid: getUid(),
  };

  componentDidMount(): void {
    this._isMounted = true;
  }

  componentWillUnmount(): void {
    this._isMounted = false;
    this.abort();
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files) {
      this.uploadFiles(files);
      this.reset();
    }
  };

  onClick = (event: MouseEvent): void => {
    const fileInput = this.fileInput;
    if (fileInput) {
      const { children, onClick } = this.props;
      if (children && (children as any).type === 'button') {
        const parentNode = fileInput.parentNode as HTMLElement;
        parentNode.focus();
        parentNode.querySelector('button')?.blur();
      }
      fileInput.click();
      onClick?.(event);
    }
  };

  onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.onClick(event as unknown as MouseEvent);
    }
  };

  onFileDrop = (event: DragEvent): void => {
    const { multiple, directory, accept } = this.props;
    event.preventDefault();

    if (event.type === 'dragover') {
      return;
    }

    if (directory) {
      traverseFileTree(
        Array.prototype.slice.call(event.dataTransfer.items),
        this.uploadFiles,
        (file: File) => attrAccept(file, accept)
      );
    } else {
      let files = Array.prototype.slice.call(event.dataTransfer.files).filter((file: File) =>
        attrAccept(file, accept)
      );
      if (multiple === false) {
        files = files.slice(0, 1);
      }
      this.uploadFiles(files);
    }
  };

  uploadFiles = (files: FileList | File[]): void => {
    const fileList = Array.prototype.slice.call(files);
    const uploadFiles = fileList.map((file: File) => {
      (file as UploadFile).uid = getUid();
      return file;
    });
    uploadFiles.forEach((file: File) => {
      this.upload(file, fileList);
    });
  };

  upload(file: File, fileList: File[]): void {
    const { beforeUpload } = this.props;
    if (!beforeUpload) {
      Promise.resolve().then(() => {
        this.post(file);
      });
      return;
    }

    const result = beforeUpload(file, fileList);
    if (result && typeof result !== 'boolean' && result.then) {
      result
        .then((processedFile) => {
          const fileType = Object.prototype.toString.call(processedFile);
          if (fileType !== '[object File]' && fileType !== '[object Blob]') {
            this.post(file);
          } else {
            this.post(processedFile as File);
          }
        })
        .catch(() => {});
    } else if (result !== false) {
      Promise.resolve().then(() => {
        this.post(file);
      });
    }
  }

  post(file: File): void {
    if (!this._isMounted) {
      return;
    }

    const {
      onStart,
      onProgress,
      transformFile = (f: File) => f,
      action,
      data,
      headers,
      withCredentials,
      method,
      name,
      customRequest,
      onSuccess,
      onError,
    } = this.props;

    new Promise<string>((resolve) => {
      let resolvedAction = action;
      if (typeof action === 'function') {
        resolvedAction = action(file);
      }
      resolve(resolvedAction as string);
    }).then((resolvedAction) => {
      const uid = (file as UploadFile).uid;
      const requestMethod = customRequest || defaultRequest;

      Promise.resolve(transformFile(file))
        .then((transformedFile) => {
          let fileData = data;
          if (typeof data === 'function') {
            fileData = data(transformedFile);
          }
          return Promise.all([transformedFile, fileData]);
        })
        .catch((error) => {
          console.error(error);
        })
        .then((result) => {
          if (!result) return;

          const [transformedFile, fileData] = result;
          const requestOption: UploadRequestOption = {
            action: resolvedAction,
            filename: name ?? 'file',
            data: fileData as Record<string, unknown>,
            file: transformedFile,
            headers: headers ?? {},
            withCredentials: withCredentials ?? false,
            method: method || 'post',
            onProgress: onProgress
              ? (event: ProgressEvent) => {
                  onProgress(event, file);
                }
              : null,
            onSuccess: (response: unknown, xhr: XMLHttpRequest) => {
              delete this.reqs[uid];
              onSuccess?.(response, file, xhr);
            },
            onError: (error: Error, response: unknown) => {
              delete this.reqs[uid];
              onError?.(error, response, file);
            },
          };

          onStart?.(file);
          this.reqs[uid] = requestMethod(requestOption);
        });
    });
  }

  reset(): void {
    this.setState({
      uid: getUid(),
    });
  }

  abort(file?: File | string): void {
    const { reqs } = this;
    if (file) {
      const uid = typeof file === 'string' ? file : (file as UploadFile).uid;
      if (reqs[uid]?.abort) {
        reqs[uid].abort?.();
      }
      delete reqs[uid];
    } else {
      Object.keys(reqs).forEach((uid) => {
        if (reqs[uid]?.abort) {
          reqs[uid].abort?.();
        }
        delete reqs[uid];
      });
    }
  }

  saveFileInput = (element: HTMLInputElement | null): void => {
    this.fileInput = element;
  };

  render(): ReactNode {
    const {
      component: Tag = 'span',
      prefixCls,
      className,
      disabled,
      id,
      style,
      multiple,
      accept,
      children,
      directory,
      openFileDialogOnClick,
      onMouseEnter,
      onMouseLeave,
      ...restProps
    } = this.props;

    const classes = classNames({
      [prefixCls ?? '']: true,
      [`${prefixCls}-disabled`]: disabled,
      [className ?? '']: className,
    });

    const directorySupportProps = directory
      ? {
          directory: 'directory',
          webkitdirectory: 'webkitdirectory',
        }
      : {};

    const events = disabled
      ? {}
      : {
          onClick: openFileDialogOnClick ? this.onClick : () => {},
          onKeyDown: openFileDialogOnClick ? this.onKeyDown : () => {},
          onMouseEnter,
          onMouseLeave,
          onDrop: this.onFileDrop,
          onDragOver: this.onFileDrop,
          tabIndex: 0,
        };

    return (
      <Tag {...events} className={classes} role="button" style={style}>
        <input
          {...pickAttrs(restProps, { aria: true, data: true })}
          id={id}
          type="file"
          ref={this.saveFileInput}
          onClick={(e) => e.stopPropagation()}
          key={this.state.uid}
          style={{ display: 'none' }}
          accept={accept}
          {...directorySupportProps}
          multiple={multiple}
          onChange={this.onChange}
        />
        {children}
      </Tag>
    );
  }
}

export default Upload;