import React from 'react';
import LoaderProgress from './LoaderProgress';
import FileUploader from './FileUploader';
import ErrorDisplay from './ErrorDisplay';
import { Button } from './Button';
import UploadIcon from './UploadIcon';

type JobState = 
  | "DwgUploading"
  | "Translating"
  | "SvgDownloading"
  | "StartEdit"
  | "GotError"
  | "Cancel";

const JOB_STATE = {
  DWG_UPLOADING: "DwgUploading" as const,
  TRANSLATING: "Translating" as const,
  SVG_DOWNLOADING: "SvgDownloading" as const,
  START_EDIT: "StartEdit" as const,
  GOT_ERROR: "GotError" as const,
  CANCEL: "Cancel" as const,
};

interface TilesUploaderProps {
  onLoad: () => void;
  needGuide: () => void;
}

interface TilesUploaderState {
  progress: number;
  jobState: JobState;
  errMsg: string;
}

interface UploadOptions {
  contentType: string;
  processData: boolean;
  uploadProgress: (progress: number) => void;
}

interface JobData {
  id: string;
  uploadFileName: string;
}

interface ImportJobResponse {
  ret: string[];
  data: {
    id: string;
    status?: string;
    url?: string;
  };
  status?: string;
}

interface SvgVerificationResult {
  status: boolean;
  msg?: string;
}

export default class TilesUploader extends React.Component<TilesUploaderProps, TilesUploaderState> {
  private jobId?: string;
  private fileName?: string;
  private error?: unknown;
  private svg?: string;

  constructor(props: TilesUploaderProps) {
    super(props);
    this.state = {
      progress: 0,
      jobState: JOB_STATE.DWG_UPLOADING,
      errMsg: "",
    };
  }

  componentDidUpdate(prevProps: TilesUploaderProps, prevState: TilesUploaderState): void {
    if (prevState.jobState !== this.state.jobState) {
      switch (this.state.jobState) {
        case JOB_STATE.DWG_UPLOADING:
          break;
        case JOB_STATE.TRANSLATING:
          this.translateDwgToSvg();
          break;
        case JOB_STATE.SVG_DOWNLOADING:
          this.downloadSvg();
          break;
        case JOB_STATE.START_EDIT:
          this.startEdit();
          break;
      }
    }
  }

  onHandleFile = (
    file: File,
    onProgress: (progress: number) => void,
    onSuccess: (data: JobData) => void,
    onFailure: (error: unknown) => void,
    extraOptions?: Partial<UploadOptions>
  ): void => {
    const options: UploadOptions = {
      contentType: "application/octet-stream",
      processData: false,
      uploadProgress: onProgress,
    };

    if (extraOptions) {
      Object.assign(options, extraOptions);
    }

    const originalFileName = file.name;

    HSApp.Io.Request.Design.uploadFile(file, options)
      .then((uploadUrl: string) => {
        this._createJob(uploadUrl)
          .then((jobData: JobData) => {
            jobData.uploadFileName = originalFileName;
            onSuccess(jobData);
          })
          .catch((error: unknown) => {
            onFailure(error);
          });
      })
      .catch((error: unknown) => {
        onFailure(error);
      });
  };

  onLoadSuccess = (data: JobData): void => {
    this.jobId = data.id;
    this.fileName = data.uploadFileName;

    if (this.fileName.length > 4) {
      this.fileName = this.fileName.slice(0, this.fileName.length - 4);
    }

    this.setState({
      jobState: JOB_STATE.TRANSLATING,
      progress: 10,
    });
  };

  onLoadFail = (error: unknown): void => {
    this.error = error;
    this.setState({
      jobState: JOB_STATE.GOT_ERROR,
    });
  };

  onCancel = (): void => {
    this.setState({
      jobState: JOB_STATE.CANCEL,
    });
  };

  loadAgain = (): void => {
    this.setState({
      jobState: JOB_STATE.DWG_UPLOADING,
    });
  };

  needGuide = (): void => {
    this.setState({
      jobState: JOB_STATE.DWG_UPLOADING,
    });
    this.props.needGuide();
  };

  private _createJob(uploadUrl: string): Promise<JobData> {
    const params = {
      url: uploadUrl,
    };

    return NWTK.mtop.DwgImport.createImportJob({ data: params }).then(
      (response: ImportJobResponse) => {
        if (response && response.ret[0].includes("SUCCESS")) {
          return response.data as JobData;
        }
        throw new Error("createImportJob not expected return value!");
      }
    );
  }

  private startEdit(): void {
    this.props.onLoad();
    HSApp.PaintPluginHelper.Kernel.CustomizedTilesPluginHandler.onStart(
      this.svg,
      this.fileName,
      "fromDwg"
    );
  }

  private catchError(error: unknown, message: string, functionName: string): void {
    this.error = error;
    HSApp.App.getApp().errorLogger.push(message, {
      errorStack: new Error(message),
      description: message,
      errorInfo: {
        info: error,
        path: {
          file: "homestyler-tools-web/web/plugin/catalogpopup/pinhuaupload/tilesuploader.tsx",
          functionName: functionName,
        },
      },
    });

    this.setState({
      jobState: JOB_STATE.GOT_ERROR,
      errMsg: "",
    });
  }

  private downloadSvg(): Promise<void> {
    const params = {
      jobId: this.jobId,
      data: "svg",
    };

    return NWTK.mtop.DwgImport.getImportData({ data: params })
      .then((response: ImportJobResponse) => {
        if (response && response.ret[0].includes("SUCCESS") && response.data.url) {
          NWTK.ajax.get(response.data.url)
            .then((svgContent: string) => {
              this.svg = svgContent;
              const verification: SvgVerificationResult =
                HSApp.PaintPluginHelper.Kernel.CustomizedTilesPluginHandler.verifySvgObject(svgContent);

              if (verification.status) {
                this.setState({
                  jobState: JOB_STATE.START_EDIT,
                  progress: 100,
                });
              } else {
                const errorMessage = verification.msg ?? "";
                this.setState({
                  jobState: JOB_STATE.GOT_ERROR,
                  errMsg: errorMessage,
                });
              }
            })
            .catch((error: unknown) => {
              this.catchError(error, "Catalog plugin: get svg by url failed", "downloadSvg()");
            });
        } else {
          this.catchError(
            "getImportData not expected return value!",
            "Catalog plugin: getImportData not expected return value!",
            "downloadSvg()"
          );
        }
      })
      .catch((error: unknown) => {
        this.catchError(error, "Catalog plugin: download svg failed", "downloadSvg()");
      });
  }

  private translateDwgToSvg(): void {
    const pollJobStatus = (): Promise<void> => {
      const params = {
        jobId: this.jobId,
      };

      return NWTK.mtop.DwgImport.getImportJobStatus({ data: params })
        .then((response: ImportJobResponse) => {
          if (response && response.ret[0].includes("SUCCESS")) {
            if (this.state.jobState === JOB_STATE.CANCEL) {
              return;
            }

            if (response.data.status === "finish") {
              this.setState({
                jobState: JOB_STATE.SVG_DOWNLOADING,
                progress: 70,
              });
            } else if (response && response.status === "fail") {
              this.setState({
                jobState: JOB_STATE.GOT_ERROR,
                errMsg: "",
              });
            } else {
              if (this.state.progress < 70) {
                this.setState({
                  progress: this.state.progress + 10,
                });
              }
              setTimeout(pollJobStatus, 1000);
            }
          } else {
            this.catchError(
              "getImportJobStatus not expected return value!",
              "Catalog plugin: getImportJobStatus not expected return value!",
              "translateDwgToSvg()"
            );
          }
        })
        .catch((error: unknown) => {
          this.catchError(
            error,
            "Catalog plugin: getImportJobStatus return error!",
            "translateDwgToSvg()"
          );
        });
    };

    pollJobStatus();
  }

  private isProcessing(): boolean {
    return (
      this.state.jobState === JOB_STATE.TRANSLATING ||
      this.state.jobState === JOB_STATE.SVG_DOWNLOADING ||
      this.state.jobState === JOB_STATE.START_EDIT
    );
  }

  render(): JSX.Element {
    const showUploader =
      this.state.jobState === JOB_STATE.DWG_UPLOADING ||
      this.state.jobState === JOB_STATE.CANCEL;
    const showError = this.state.jobState === JOB_STATE.GOT_ERROR;
    const errorMessage = this.state.jobState === JOB_STATE.GOT_ERROR ? this.state.errMsg : "";
    const isProcessing = this.isProcessing();

    return (
      <div className="tilesUploaderContainer">
        <div className={`fileProcesser ${isProcessing ? "" : "hidden"}`}>
          <LoaderProgress
            className="loaderProgress"
            show={isProcessing}
            hint={ResourceManager.getString("processing_file")}
            progress={`${this.state.progress}%`}
          />
          <Button
            type="default"
            onClick={this.onCancel}
            className="file-processer-action-btn"
          >
            {ResourceManager.getString("cancel")}
          </Button>
        </div>
        <FileUploader
          show={showUploader}
          onHandleFile={this.onHandleFile}
          onLoadSuccess={this.onLoadSuccess}
          onLoadFail={this.onLoadFail}
          accept=".dwg"
          className="upload-cloud"
          icon={UploadIcon}
          text={ResourceManager.getString("choose_a_file")}
          desc={ResourceManager.getString("upload_dwg_des")}
        />
        <ErrorDisplay
          show={showError}
          loadAgain={this.loadAgain}
          question={this.needGuide}
          errMsg={errorMessage}
        />
      </div>
    );
  }
}