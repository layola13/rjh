import React from 'react';

type LoadingState = 'na' | 'start' | 'loading' | 'cancel' | 'Success' | 'fail';

interface FileUploaderProps {
  onLoadSuccess: (response: UploadResponse) => void;
  updateForm?: (isLoading: boolean) => void;
  onLoadFail: (error: Error) => void;
  multiple?: boolean;
  accept?: string;
  show?: boolean;
  onHandleFile?: (
    file: File,
    onProgress: (event: ProgressEvent) => void,
    onSuccess: (response: UploadResponse) => void,
    onError: (error: Error) => void
  ) => void;
  url: string;
  uploadType?: string;
}

interface FileUploaderState {
  progress: string;
  loadingState: LoadingState;
}

interface UploadResponse {
  uploadFileName?: string;
  [key: string]: unknown;
}

interface AjaxPromise {
  then: (callback: (response: UploadResponse) => void) => AjaxPromise;
  catch: (callback: (error: Error) => void) => void;
  abort: () => void;
}

interface AjaxOptions {
  contentType: boolean;
  processData: boolean;
  uploadProgress: (event: ProgressEvent) => void;
}

declare const NWTK: {
  ajax: {
    post: (url: string, data: FormData, options: AjaxOptions) => AjaxPromise;
  };
};

declare const ResourceManager: {
  getString: (key: string) => string;
};

declare const $: (selector: HTMLElement | string) => {
  val: (value?: string) => string | void;
};

const LOADING_STATE_NA: LoadingState = 'na';
const LOADING_STATE_START: LoadingState = 'start';
const LOADING_STATE_LOADING: LoadingState = 'loading';
const LOADING_STATE_CANCEL: LoadingState = 'cancel';
const LOADING_STATE_SUCCESS: LoadingState = 'Success';
const LOADING_STATE_FAIL: LoadingState = 'fail';

class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {
  private promise: AjaxPromise | null = null;
  private fileElem: HTMLInputElement | null = null;

  static defaultProps: Partial<FileUploaderProps> = {
    multiple: false,
    accept: '*/*'
  };

  constructor(props: FileUploaderProps) {
    super(props);
    this.state = {
      progress: '0%',
      loadingState: LOADING_STATE_NA
    };
  }

  componentDidMount(): void {}

  onLoadError = (error: Error): void => {
    this.setState({
      loadingState: LOADING_STATE_FAIL
    });
    this.props.onLoadFail(error);
  };

  onLoadCancel = (): void => {
    this.setState({
      loadingState: LOADING_STATE_CANCEL
    });
  };

  onLoadStart = (): void => {
    this.setState({
      loadingState: LOADING_STATE_START
    });
    this.props.updateForm?.(true);
  };

  onProgress = (event: ProgressEvent): void => {
    if (event.lengthComputable) {
      const percentComplete = Math.round((event.loaded / event.total) * 100);
      this.setState({
        progress: `${percentComplete}%`
      });
    }
  };

  onLoadSuccess = (response: UploadResponse): void => {
    this.setState({
      loadingState: LOADING_STATE_SUCCESS
    });
    this.props.onLoadSuccess(response);
  };

  onHandleFile = (file: File): void => {
    if (this.props.onHandleFile) {
      this.onLoadStart();
      this.props.onHandleFile(file, this.onProgress, this.onLoadSuccess, this.onLoadError);
    } else {
      const formData = new FormData();
      const fileName = file.name;
      formData.append('upload', file);
      this.onLoadStart();
      this.resetInput();

      const options: AjaxOptions = {
        contentType: false,
        processData: false,
        uploadProgress: this.onProgress
      };

      this.promise = NWTK.ajax.post(this.props.url, formData, options);
      this.promise
        .then((response: UploadResponse) => {
          response.uploadFileName = fileName;
          this.onLoadSuccess(response);
        })
        .catch((error: Error) => {
          this.onLoadError(error);
        });
    }
  };

  handleFile = (): void => {
    if (this.fileElem && this.fileElem.files && this.fileElem.files.length > 0) {
      this.onHandleFile(this.fileElem.files[0]);
    }
  };

  resetInput = (): void => {
    if (this.fileElem) {
      $(this.fileElem).val('');
    }
  };

  chooseFile = (): void => {
    if (this.fileElem) {
      $(this.fileElem).val('');
    }
    this.setState({
      loadingState: LOADING_STATE_NA,
      progress: '0%'
    });
    this.fileElem?.click();
  };

  cancelLoading = (): void => {
    if (this.promise) {
      this.promise.abort();
      this.promise = null;
    }
  };

  renderProgressBar = (): React.ReactElement | null => {
    let showProgress = false;
    const hintText = ResourceManager.getString('uploading_file');

    switch (this.state.loadingState) {
      case LOADING_STATE_NA:
        showProgress = false;
        break;
      case LOADING_STATE_START:
      case LOADING_STATE_LOADING:
        showProgress = true;
        break;
      case LOADING_STATE_SUCCESS:
      case LOADING_STATE_FAIL:
        showProgress = false;
        break;
    }

    return React.createElement('div', {
      className: 'changeloaderProcess',
      style: { display: showProgress ? 'block' : 'none' }
    }, hintText, this.state.progress);
  };

  render(): React.ReactElement {
    let buttonTextKey: string;
    let buttonClickHandler: () => void;
    const buttonClasses: string[] = ['btn', 'btn-primary', 'uploadbtntext'];
    const containerClasses: string[] = ['diyFileUploader'];

    if (!this.props.show) {
      containerClasses.push('hidden');
    }

    if (
      this.state.loadingState === LOADING_STATE_LOADING ||
      this.state.loadingState === LOADING_STATE_START
    ) {
      buttonTextKey = 'cancel';
      buttonClickHandler = this.cancelLoading;
      if (this.props.uploadType === 'picture') {
        buttonClasses.push('hidden');
        containerClasses.push('fileUploaderPicture');
      }
    } else {
      buttonTextKey = 'choose_a_file';
      buttonClickHandler = this.chooseFile;
      buttonClasses.push('upload');
    }

    return React.createElement(
      'div',
      {
        className: containerClasses.join(' ')
      },
      React.createElement(
        'form',
        {
          method: 'post',
          encType: 'multipart/form-data'
        },
        React.createElement('input', {
          ref: (elem: HTMLInputElement) => {
            this.fileElem = elem;
          },
          type: 'file',
          name: 'upload',
          id: 'upload',
          style: {
            display: 'none'
          },
          accept: this.props.accept,
          multiple: this.props.multiple,
          onChange: this.handleFile
        }),
        React.createElement('input', {
          id: 'upload',
          type: 'submit',
          name: 'upload',
          value: 'Submit',
          style: {
            display: 'none'
          }
        })
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: buttonClickHandler,
          className: buttonClasses.join(' ')
        },
        ResourceManager.getString(buttonTextKey)
      )
    );
  }
}

export default FileUploader;