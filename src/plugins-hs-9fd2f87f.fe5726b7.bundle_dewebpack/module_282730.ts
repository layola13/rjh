import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

enum JobState {
  DwgUploading = 'DwgUploading',
  Translating = 'Translating',
  SvgDownloading = 'SvgDownloading',
  GotError = 'GotError',
  Cancel = 'Cancel',
  DownloadSvgFinished = 'DownloadSvgFinished'
}

interface ComponentProps {
  onLoad?: () => void;
  needGuide?: () => void;
  callback: (data: CommandData) => void;
}

interface ComponentState {
  progress: number;
  jobState: JobState;
  callback: (data: CommandData) => void;
  errMsg?: string;
}

interface CreateJobParams {
  url: string;
}

interface JobData {
  id: string;
  uploadFileName: string;
}

interface UploadOptions {
  contentType: string;
  processData: boolean;
  uploadProgress: (progress: number) => void;
  resType?: string;
}

interface ImportJobStatusData {
  status: string;
}

interface ImportDataParams {
  jobId: string;
  data: string;
}

interface ImportDataResponse {
  url: string;
}

interface SvgVerificationResult {
  status: boolean;
  msg?: string;
}

interface CommandData {
  name: string;
  action: string;
  data: unknown;
}

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

declare global {
  const NWTK: {
    mtop: {
      DwgImport: {
        createImportJob(params: { data: CreateJobParams }): Promise<{ ret: string[]; data: JobData }>;
        getImportJobStatus(params: { data: { jobId: string } }): Promise<{ ret: string[]; data: ImportJobStatusData; status?: string }>;
        getImportData(params: { data: ImportDataParams }): Promise<{ ret: string[]; data: ImportDataResponse }>;
      };
    };
    ajax: {
      get(url: string): Promise<string>;
    };
  };
  const HSApp: {
    Config: {
      TENANT: string;
    };
    Io: {
      Request: {
        Design: {
          uploadFile(file: File, options: UploadOptions): Promise<string>;
        };
      };
    };
    Util: {
      EventTrack: {
        instance(): { track(group: string, event: string): void };
      };
      EventGroupEnum: {
        Toolbar: string;
      };
    };
    PaintPluginHelper: {
      Kernel: {
        CustomizedTilesPluginHandler: {
          verifySvgObject(svg: string): SvgVerificationResult;
        };
      };
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
  const MessageBox: {
    create(message: string, buttons: string[], defaultIndex: number, options: { title: string }): {
      show(callback: (result: number) => void): void;
    };
  };
}

const SvgUtils = {
  getBoundingBox(svg: string): BoundingBox {
    throw new Error('Not implemented');
  },
  getInstanceModel(svg: string, box: BoundingBox): unknown {
    throw new Error('Not implemented');
  }
};

const POLL_INTERVAL_MS = 1000;
const INITIAL_PROGRESS = 0;
const UPLOAD_COMPLETE_PROGRESS = 10;
const TRANSLATION_PROGRESS = 70;
const DOWNLOAD_COMPLETE_PROGRESS = 100;
const PROGRESS_INCREMENT = 10;
const POPUP_CONTAINER_Z_INDEX = 1001;

class DwgUploader extends React.Component<ComponentProps, ComponentState> {
  static propTypes = {
    onLoad: PropTypes.func,
    needGuide: PropTypes.func,
    callback: PropTypes.func.isRequired
  };

  private jobId?: string;
  private fileName?: string;
  private svg?: string;
  private error?: Error | string;

  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      progress: INITIAL_PROGRESS,
      jobState: JobState.DwgUploading,
      callback: props.callback
    };
  }

  componentDidUpdate(_prevProps: ComponentProps, prevState: ComponentState): void {
    if (prevState.jobState !== this.state.jobState) {
      switch (this.state.jobState) {
        case JobState.DwgUploading:
          break;
        case JobState.Translating:
          this.translateDwgToSvg();
          break;
        case JobState.SvgDownloading:
          this.downloadSvg();
          break;
        case JobState.DownloadSvgFinished:
          this.downloadSvgFinished();
          break;
        case JobState.GotError:
          this.gotError();
          break;
      }
    }
  }

  private async createJob(url: string): Promise<JobData> {
    const params: CreateJobParams = { url };
    const response = await NWTK.mtop.DwgImport.createImportJob({ data: params });
    
    if (response?.ret[0]?.includes('SUCCESS')) {
      return response.data;
    }
    throw new Error('createImportJob not expected return value!');
  }

  onHandleFile = (
    file: File,
    onProgress: (progress: number) => void,
    onSuccess: (data: JobData) => void,
    onError: (error: Error) => void
  ): void => {
    const options: UploadOptions = {
      contentType: 'application/octet-stream',
      processData: false,
      uploadProgress: onProgress
    };

    if (HSApp.Config.TENANT === 'fp') {
      Object.assign(options, { resType: 'model' });
    }

    const fileName = file.name;

    HSApp.Io.Request.Design.uploadFile(file, options)
      .then((url: string) => {
        this.createJob(url)
          .then((jobData: JobData) => {
            jobData.uploadFileName = fileName;
            onSuccess(jobData);
          })
          .catch(onError);
      })
      .catch(onError);
  };

  onLoadSuccess = (data: JobData): void => {
    this.jobId = data.id;
    this.fileName = data.uploadFileName;
    
    if (this.fileName.length > 4) {
      this.fileName = this.fileName.slice(0, this.fileName.length - 4);
    }

    this.setState({
      jobState: JobState.Translating,
      progress: UPLOAD_COMPLETE_PROGRESS
    });
  };

  onLoadFail = (error: Error): void => {
    this.error = error;
    this.setState({ jobState: JobState.GotError });
  };

  onCancel = (): void => {
    this.setState({ jobState: JobState.Cancel });
  };

  private downloadSvgFinished(): void {
    const maskElements = document.getElementsByClassName('diy-files-uploader-container-mask');
    
    if (maskElements?.[0]) {
      (maskElements[0] as HTMLElement).style.zIndex = String(POPUP_CONTAINER_Z_INDEX);
    }

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Toolbar,
      'customized_cad_event'
    );
  }

  private gotError(): void {
    const popupContainer = document.querySelector('.popupcontainer');
    if (popupContainer) {
      ReactDOM.unmountComponentAtNode(popupContainer);
    }

    const title = ResourceManager.getString('plugin_customizedModeling_cad_import_faild');
    const errorMessage = this.state.errMsg && this.state.errMsg !== ''
      ? this.state.errMsg
      : ResourceManager.getString('plugin_customizedModeling_cad_import_faild_msg');
    
    const message = `${errorMessage}\n <br>${ResourceManager.getString('plugin_customizedModeling_cad_import_faild_try_again')}`;
    const tipText = ResourceManager.getString('plugin_customizedModeling_cad_import_faild_tip');
    const buttons = [ResourceManager.getString('plugin_customizedModeling_cad_import_faild_known')];

    if (HSApp.Config.TENANT === 'ezhome') {
      buttons.unshift(tipText);
    }

    MessageBox.create(message, buttons, buttons.length - 1, { title }).show((result: number) => {
      if (result === 1) {
        window.open('https://bbs.homestyler.com/cn/post/view/1534', '_blank', 'noopener=yes, noreferrer=yes');
      }
    });
  }

  private async downloadSvg(): Promise<void> {
    if (!this.jobId) return;

    const params: ImportDataParams = {
      jobId: this.jobId,
      data: 'svg'
    };

    try {
      const response = await NWTK.mtop.DwgImport.getImportData({ data: params });

      if (response?.ret[0]?.includes('SUCCESS') && response.data.url) {
        const svgContent = await NWTK.ajax.get(response.data.url);
        this.svg = svgContent;

        const verification = HSApp.PaintPluginHelper.Kernel.CustomizedTilesPluginHandler.verifySvgObject(svgContent);

        if (verification.status) {
          const boundingBox = SvgUtils.getBoundingBox(svgContent);
          const instanceModel = SvgUtils.getInstanceModel(svgContent, boundingBox);

          this.setState({
            jobState: JobState.DownloadSvgFinished,
            progress: DOWNLOAD_COMPLETE_PROGRESS
          });

          this.state.callback({
            name: 'command.cad',
            action: 'start',
            data: instanceModel
          });
        } else {
          const errorMsg = verification.msg ?? '';
          this.setState({
            jobState: JobState.GotError,
            errMsg: errorMsg
          });
        }
      } else {
        this.error = 'getImportData not expected return value!';
        this.setState({
          jobState: JobState.GotError,
          errMsg: ''
        });
      }
    } catch (error) {
      this.error = error as Error;
      this.setState({
        jobState: JobState.GotError,
        errMsg: ''
      });
    }
  }

  private translateDwgToSvg(): void {
    const pollStatus = async (): Promise<void> => {
      if (!this.jobId) return;

      const params = { jobId: this.jobId };

      try {
        const response = await NWTK.mtop.DwgImport.getImportJobStatus({ data: params });

        if (response?.ret[0]?.includes('SUCCESS')) {
          if (this.state.jobState === JobState.Cancel) {
            return;
          }

          if (response.data.status === 'finish') {
            this.setState({
              jobState: JobState.SvgDownloading,
              progress: TRANSLATION_PROGRESS
            });
          } else if (response?.status === 'fail') {
            this.setState({
              jobState: JobState.GotError,
              errMsg: ''
            });
          } else {
            if (this.state.progress < TRANSLATION_PROGRESS) {
              this.setState({
                progress: this.state.progress + PROGRESS_INCREMENT
              });
            }
            setTimeout(pollStatus, POLL_INTERVAL_MS);
          }
        } else {
          this.error = 'getImportJobStatus not expected return value!';
          this.setState({
            jobState: JobState.GotError,
            errMsg: ''
          });
        }
      } catch (error) {
        this.error = error as Error;
        this.setState({
          jobState: JobState.GotError,
          errMsg: ''
        });
      }
    };

    pollStatus();
  }

  loadAgain = (): void => {
    this.setState({ jobState: JobState.DwgUploading });
  };

  needGuide = (): void => {
    this.setState({ jobState: JobState.DwgUploading });
    this.props.needGuide?.();
  };

  private isProcessing(): boolean {
    return (
      this.state.jobState === JobState.Translating ||
      this.state.jobState === JobState.SvgDownloading ||
      this.state.jobState === JobState.DownloadSvgFinished
    );
  }

  render(): JSX.Element {
    const isUploading = this.state.jobState === JobState.DwgUploading || this.state.jobState === JobState.Cancel;
    const cancelButtonClass = this.state.jobState === JobState.DownloadSvgFinished ? 'msg-dialog-cancel-btn' : '';

    return (
      <div className="diyFilesUploaderContainer">
        <div className={`fileProcesser ${this.isProcessing() ? '' : 'hidden'}`}>
          <div
            className="loaderProgress"
            style={{ display: this.isProcessing() ? 'block' : 'none' }}
          >
            <div>{ResourceManager.getString('processing_file')}</div>
            <div>{this.state.progress}%</div>
          </div>
          <button
            type="button"
            onClick={this.onCancel}
            id={cancelButtonClass}
            className="btn btn-primary actionButton"
          >
            {ResourceManager.getString('cancel')}
          </button>
        </div>
        <div className={`diyUserguideWrap ${this.isProcessing() ? 'hidden' : ''}`}>
          <div>{/* User guide component placeholder */}</div>
        </div>
        <div
          style={{ display: isUploading ? 'block' : 'none' }}
          className="fileUploader"
        >
          {/* File uploader component with accept=".dwg" */}
        </div>
      </div>
    );
  }
}

export default DwgUploader;