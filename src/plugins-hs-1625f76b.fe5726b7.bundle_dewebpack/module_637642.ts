import React, { FormEvent, ChangeEvent } from 'react';
import { Button } from './Button';
import ProgressLoader from './ProgressLoader';

enum LoadingState {
  NA = 'na',
  START = 'start',
  LOADING = 'loading',
  CANCEL = 'cancel',
  SUCCESS = 'Success',
  FAIL = 'fail'
}

interface FileUploaderProps {
  url?: string;
  icon: string;
  text: string;
  desc: string;
  show?: boolean;
  uploadType?: string;
  accept?: string;
  multiple?: boolean;
  onLoadSuccess: (response: UploadResponse) => void;
  onLoadFail: (error: unknown) => void;
  updateForm?: (isUploading: boolean) => void;
  onHandleFile?: (
    file: File,
    onProgress: (event: ProgressEvent) => void,
    onSuccess: (response: UploadResponse) => void,
    onError: (error: unknown) => void,
    options?: UploadOptions
  ) => void;
}

interface FileUploaderState {
  progress: string;
  loadingState: LoadingState;
}

interface UploadResponse {
  uploadFileName?: string;
  [key: string]: unknown;
}

interface UploadOptions {
  resType?: string;
}

interface UploadPromise {
  then: (callback: (response: UploadResponse) => void) => UploadPromise;
  catch: (callback: (error: unknown) => void) => void;
  abort: () => void;
}

declare const HSApp: {
  Config: {
    TENANT: string;
  };
};

declare const NWTK: {
  ajax: {
    post: (url: string, data: FormData, options: AjaxOptions) => UploadPromise;
  };
};

declare const ResourceManager: {
  getString: (key: string) => string;
};

interface AjaxOptions {
  contentType: boolean;
  processData: boolean;
  uploadProgress: (event: ProgressEvent) => void;
}

export default class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {
  private fileElemRef: HTMLInputElement | null = null;
  private fileSubmitRef: HTMLInputElement | null = null;
  private promise: UploadPromise | null = null;

  constructor(props: FileUploaderProps) {
    super(props);
    this.state = {
      progress: '0%',
      loadingState: LoadingState.NA
    };
  }

  private onLoadError = (error: unknown): void => {
    this.setState({
      loadingState: LoadingState.FAIL
    });
    this.props.onLoadFail(error);
  };

  private onLoadCancel = (): void => {
    this.setState({
      loadingState: LoadingState.CANCEL
    });
  };

  private onLoadStart = (): void => {
    this.setState({
      loadingState: LoadingState.START
    });
    this.props.updateForm?.(true);
  };

  private onProgress = (event: ProgressEvent): void => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      this.setState({
        progress: `${percentComplete}%`
      });
    }
  };

  private onLoadSuccess = (response: UploadResponse): void => {
    this.setState({
      loadingState: LoadingState.SUCCESS
    });
    this.props.onLoadSuccess(response);
  };

  private handleFile = (): void => {
    if (!this.fileElemRef || this.fileElemRef.files.length < 1) {
      return;
    }

    const options: UploadOptions = HSApp.Config.TENANT === 'fp' 
      ? { resType: 'model' } 
      : {};
    
    this.onHandleFile(this.fileElemRef.files[0], options);
  };

  private chooseFile = (): void => {
    if (this.fileElemRef) {
      $(this.fileElemRef).val('');
    }
    this.setState({
      loadingState: LoadingState.NA,
      progress: '0%'
    });
    this.fileElemRef?.click();
  };

  private cancelLoading = (): void => {
    if (this.promise) {
      this.promise.abort();
      this.promise = null;
    }
  };

  private onHandleFile(file: File, options?: UploadOptions): void {
    if (this.props.onHandleFile) {
      this.onLoadStart();
      this.props.onHandleFile(
        file,
        this.onProgress,
        this.onLoadSuccess,
        this.onLoadError,
        options
      );
    } else {
      const formData = new FormData();
      const fileName = file.name;
      formData.append('upload', file);
      
      this.onLoadStart();
      this.resetInput();

      const ajaxOptions: AjaxOptions = {
        contentType: false,
        processData: false,
        uploadProgress: this.onProgress
      };

      this.promise = NWTK.ajax.post(this.props.url!, formData, ajaxOptions);
      this.promise
        .then((response: UploadResponse) => {
          response.uploadFileName = fileName;
          this.onLoadSuccess(response);
        })
        .catch((error: unknown) => {
          this.onLoadError(error);
        });
    }
  }

  private resetInput(): void {
    if (this.fileElemRef) {
      $(this.fileElemRef).val('');
    }
  }

  private showProgressBar(): boolean {
    const { loadingState } = this.state;
    
    switch (loadingState) {
      case LoadingState.NA:
      case LoadingState.SUCCESS:
      case LoadingState.FAIL:
        return false;
      case LoadingState.START:
      case LoadingState.LOADING:
        return true;
      default:
        return false;
    }
  }

  private renderProgressBar(): React.ReactNode {
    const shouldShow = this.showProgressBar();
    const hint = ResourceManager.getString('uploading_file');

    return [
      <ProgressLoader
        key="loader"
        className="changeloaderProcess"
        show={shouldShow}
        hint={hint}
        progress={this.state.progress}
      />,
      shouldShow && (
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

  render(): React.ReactNode {
    const { icon, text, desc, show, uploadType } = this.props;
    const { loadingState } = this.state;

    const backgroundStyle: React.CSSProperties = {
      backgroundImage: `url(${icon})`
    };

    const buttonClasses = ['btn', 'btn-primary', 'uploadbtntext'];
    const containerClasses = ['fileUploader'];

    if (!show) {
      containerClasses.push('hidden');
    }

    let actionHandler: () => void;

    if (loadingState === LoadingState.LOADING || loadingState === LoadingState.START) {
      actionHandler = this.cancelLoading;
      if (uploadType === 'picture') {
        buttonClasses.push('hidden');
        containerClasses.push('fileUploaderPicture');
      }
    } else {
      actionHandler = this.chooseFile;
      buttonClasses.push('upload');
    }

    return (
      <div className={containerClasses.join(' ')}>
        {this.renderProgressBar()}
        <form ref="form" method="post" encType="multipart/form-data">
          <input
            ref={(elem) => (this.fileElemRef = elem)}
            type="file"
            name="upload"
            id="upload"
            style={{ display: 'none' }}
            accept={this.props.accept}
            multiple={this.props.multiple}
            onChange={this.handleFile}
          />
          <input
            ref={(elem) => (this.fileSubmitRef = elem)}
            id="upload"
            type="submit"
            name="upload"
            value="Submit"
            style={{ display: 'none' }}
          />
        </form>
        {!this.showProgressBar() && (
          <div className="upload-cloud" onClick={actionHandler}>
            <div style={backgroundStyle} className="icon" />
            <span className="upload-file-type">{text}</span>
            <span className="upload-file-desc">{desc}</span>
          </div>
        )}
      </div>
    );
  }
}