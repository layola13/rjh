import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Button } from './Button';
import LoadingProgress from './LoadingProgress';

/**
 * 文件加载状态枚举
 */
enum LoadingState {
  /** 未开始 */
  NotStarted = 'na',
  /** 开始加载 */
  Start = 'start',
  /** 加载中 */
  Loading = 'loading',
  /** 已取消 */
  Cancel = 'cancel',
  /** 成功 */
  Success = 'Success',
  /** 失败 */
  Fail = 'fail'
}

/**
 * 上传类型
 */
type UploadType = 'picture' | 'file';

/**
 * AJAX Promise 接口（支持 abort）
 */
interface AbortablePromise<T> extends Promise<T> {
  abort: () => void;
}

/**
 * 上传响应接口
 */
interface UploadResponse {
  uploadFileName?: string;
  [key: string]: unknown;
}

/**
 * 文件上传器组件属性
 */
interface FileUploaderProps {
  /** 上传接口 URL */
  url: string;
  /** 图标 URL */
  icon: string;
  /** 上传按钮文本 */
  text: string;
  /** 上传描述文本 */
  desc: string;
  /** 是否显示组件 */
  show?: boolean;
  /** 上传类型 */
  uploadType?: UploadType;
  /** 接受的文件类型 */
  accept?: string;
  /** 是否允许多文件上传 */
  multiple?: boolean;
  /** 加载成功回调 */
  onLoadSuccess: (response: UploadResponse) => void;
  /** 加载失败回调 */
  onLoadFail: (error: Error) => void;
  /** 更新表单状态回调（可选） */
  updateForm?: (isUploading: boolean) => void;
  /** 自定义文件处理函数（可选） */
  onHandleFile?: (
    file: File,
    onProgress: (event: ProgressEvent) => void,
    onSuccess: (response: UploadResponse) => void,
    onError: (error: Error) => void,
    options?: Record<string, unknown>
  ) => void;
}

/**
 * 文件上传器组件状态
 */
interface FileUploaderState {
  /** 上传进度 */
  progress: string;
  /** 加载状态 */
  loadingState: LoadingState;
}

/**
 * 文件上传器组件
 * 支持文件上传、进度显示、取消上传等功能
 */
export default class FileUploader extends Component<FileUploaderProps, FileUploaderState> {
  private fileElemRef: HTMLInputElement | null = null;
  private fileSubmitRef: HTMLInputElement | null = null;
  private promise: AbortablePromise<UploadResponse> | null = null;

  constructor(props: FileUploaderProps) {
    super(props);
    this.state = {
      progress: '0%',
      loadingState: LoadingState.NotStarted
    };
  }

  /**
   * 加载错误处理
   */
  private onLoadError = (error: Error): void => {
    this.setState({ loadingState: LoadingState.Fail });
    this.props.onLoadFail(error);
  };

  /**
   * 取消加载处理
   */
  private onLoadCancel = (): void => {
    this.setState({ loadingState: LoadingState.Cancel });
  };

  /**
   * 开始加载处理
   */
  private onLoadStart = (): void => {
    this.setState({ loadingState: LoadingState.Start });
    this.props.updateForm?.(true);
  };

  /**
   * 上传进度处理
   */
  private onProgress = (event: ProgressEvent): void => {
    if (event.lengthComputable) {
      const percentage = Math.round((event.loaded / event.total) * 100);
      this.setState({ progress: `${percentage}%` });
    }
  };

  /**
   * 加载成功处理
   */
  private onLoadSuccess = (response: UploadResponse): void => {
    this.setState({ loadingState: LoadingState.Success });
    this.props.onLoadSuccess(response);
  };

  /**
   * 文件选择处理
   */
  private handleFile = (): void => {
    if (!this.fileElemRef || this.fileElemRef.files.length < 1) {
      return;
    }

    const options = HSApp.Config.TENANT === 'fp' ? { resType: 'model' } : {};
    this.onHandleFile(this.fileElemRef.files[0], options);
  };

  /**
   * 打开文件选择对话框
   */
  private chooseFile = (): void => {
    if (!this.fileElemRef) return;

    $(this.fileElemRef).val('');
    this.setState({
      loadingState: LoadingState.NotStarted,
      progress: '0%'
    });
    this.fileElemRef.click();
  };

  /**
   * 取消上传
   */
  private cancelLoading = (): void => {
    if (this.promise) {
      this.promise.abort();
      this.promise = null;
    }
  };

  /**
   * 处理文件上传
   */
  private onHandleFile(file: File, options?: Record<string, unknown>): void {
    if (this.props.onHandleFile) {
      this.onLoadStart();
      this.props.onHandleFile(
        file,
        this.onProgress,
        this.onLoadSuccess,
        this.onLoadError,
        options
      );
      return;
    }

    const formData = new FormData();
    const fileName = file.name;
    formData.append('upload', file);

    this.onLoadStart();
    this.resetInput();

    const ajaxOptions = {
      contentType: false,
      processData: false,
      uploadProgress: this.onProgress
    };

    this.promise = NWTK.ajax.post(this.props.url, formData, ajaxOptions);
    this.promise
      .then((response: UploadResponse) => {
        response.uploadFileName = fileName;
        this.onLoadSuccess(response);
      })
      .catch((error: Error) => {
        this.onLoadError(error);
      });
  }

  /**
   * 重置文件输入框
   */
  private resetInput(): void {
    if (this.fileElemRef) {
      $(this.fileElemRef).val('');
    }
  }

  /**
   * 判断是否显示进度条
   */
  private shouldShowProgressBar(): boolean {
    const { loadingState } = this.state;
    return (
      loadingState === LoadingState.Start ||
      loadingState === LoadingState.Loading
    );
  }

  /**
   * 渲染进度条
   */
  private renderProgressBar(): JSX.Element[] | null {
    const showProgress = this.shouldShowProgressBar();
    const uploadingText = ResourceManager.getString('uploading_file');

    return [
      <LoadingProgress
        key="progress"
        className="changeloaderProcess"
        show={showProgress}
        hint={uploadingText}
        progress={this.state.progress}
      />,
      showProgress && (
        <Button
          key="cancel-btn"
          type="default"
          onClick={this.cancelLoading}
          className="file-processer-action-btn"
        >
          {ResourceManager.getString('cancel')}
        </Button>
      )
    ];
  }

  render(): JSX.Element {
    const { icon, text, desc, show = true, uploadType, accept, multiple } = this.props;
    const { loadingState } = this.state;

    const iconStyle: React.CSSProperties = {
      backgroundImage: `url(${icon})`
    };

    const buttonClasses = ['btn', 'btn-primary', 'uploadbtntext'];
    const containerClasses = ['fileUploader'];

    if (!show) {
      containerClasses.push('hidden');
    }

    const isUploading =
      loadingState === LoadingState.Loading ||
      loadingState === LoadingState.Start;

    let actionHandler = this.chooseFile;

    if (isUploading) {
      actionHandler = this.cancelLoading;
      if (uploadType === 'picture') {
        buttonClasses.push('hidden');
        containerClasses.push('fileUploaderPicture');
      }
    } else {
      buttonClasses.push('upload');
    }

    return (
      <div className={containerClasses.join(' ')}>
        {this.renderProgressBar()}
        <form ref="form" method="post" encType="multipart/form-data">
          <input
            ref={(el) => (this.fileElemRef = el)}
            type="file"
            name="upload"
            id="upload"
            style={{ display: 'none' }}
            accept={accept}
            multiple={multiple}
            onChange={this.handleFile}
          />
          <input
            ref={(el) => (this.fileSubmitRef = el)}
            id="upload"
            type="submit"
            name="upload"
            value="Submit"
            style={{ display: 'none' }}
          />
        </form>
        {!this.shouldShowProgressBar() && (
          <div className="upload-cloud" onClick={actionHandler}>
            <div style={iconStyle} className="icon" />
            <span className="upload-file-type">{text}</span>
            <span className="upload-file-desc">{desc}</span>
          </div>
        )}
      </div>
    );
  }
}