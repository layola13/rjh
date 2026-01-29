import { ExportHandler } from './ExportHandler';
import { gzip } from './utils';

interface PermissionCheckData {
  permissionNames: string;
  appCode: string;
}

interface PermissionResult {
  permissionName: string;
  accessible: boolean;
}

interface PermissionResponse {
  data?: {
    result?: PermissionResult[];
  };
  ret?: string[];
}

interface DesignUploadUrlData {
  fileType: string;
  tenant: string;
}

interface UploadUrlResponse {
  data?: {
    url: string;
  };
  ret?: string[];
}

interface TaskExecuteResult {
  status: 'success';
}

interface DesignMetadata {
  get(key: string): string | undefined;
}

interface App {
  designMetadata: DesignMetadata;
  errorLogger: {
    push(errorType: string, errorDetails: ErrorDetails): void;
  };
}

interface ErrorDetails {
  description: string;
  errorStack: unknown;
  errorInfo: unknown;
}

interface UploadOptions {
  dataType?: undefined;
  processData?: boolean;
  contentType?: string;
  headers?: Record<string, string>;
}

interface HttpClient {
  put(url: string, data: Blob | string, options: UploadOptions): Promise<void>;
}

interface UrlUtils {
  clearParams(url: string): string;
}

interface LoginEventData {
  data?: {
    isLogin: boolean;
  };
}

interface MtopApi {
  User: {
    checkIhomePermission(params: { data: PermissionCheckData }): Promise<PermissionResponse>;
  };
  Design: {
    exportRoominfo(params: { data: { designId: string; fileType: string; url: string } }): Promise<void>;
    getDesignUploadUrl(params: { data: DesignUploadUrlData; options: { timeout: number } }): Promise<UploadUrlResponse>;
  };
}

declare const adskUser: {
  signalLoginCompleted: {
    listen(callback: (event: LoginEventData) => void): void;
  };
};

declare const NWTK: {
  mtop: MtopApi;
};

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const httpClient: HttpClient;
declare const urlUtils: UrlUtils;
declare const tenantConfig: { tenant: string };

const PERMISSION_NAMES = ['DistributionStore', 'CooperationChannel', 'VisualOrderFunction'] as const;
const APP_CODE = 'EA_VISUALIZATION_ORDER';
const FILE_TYPE_INVENTORY = 'inventoryData';
const FILE_TYPE_JSON = 'json';
const UPLOAD_TIMEOUT = 60000;
const SUCCESS_STATUS = 'SUCCESS';

/**
 * Task for exporting room information with permission checks and file upload
 */
export class ExportRoominfoTask {
  private static exportRoominfoTask?: ExportRoominfoTask;
  private hasPermission: boolean;

  constructor() {
    this.hasPermission = false;

    adskUser.signalLoginCompleted.listen((event: LoginEventData) => {
      if (event?.data?.isLogin) {
        this.checkPermissions();
      } else {
        this.hasPermission = false;
      }
    });
  }

  /**
   * Check user permissions for export functionality
   */
  private async checkPermissions(): Promise<void> {
    try {
      const response = await NWTK.mtop.User.checkIhomePermission({
        data: {
          permissionNames: PERMISSION_NAMES.join(', '),
          appCode: APP_CODE,
        },
      });

      if (response?.data?.result) {
        this.hasPermission = response.data.result.some(
          (permission) =>
            PERMISSION_NAMES.includes(permission.permissionName as typeof PERMISSION_NAMES[number]) &&
            permission.accessible
        );
      } else {
        this.hasPermission = false;
      }
    } catch (error) {
      this.hasPermission = false;
    }
  }

  /**
   * Execute the room info export task
   */
  async execute(taskContext: unknown, taskOptions: unknown): Promise<TaskExecuteResult> {
    if (!this.hasPermission) {
      return { status: 'success' };
    }

    try {
      const app = HSApp.App.getApp();
      const designId = app.designMetadata.get('designId');

      if (!designId) {
        return { status: 'success' };
      }

      const roomDetailInfo = ExportHandler.exportRoomDetailInfo();
      const jsonData = JSON.stringify(roomDetailInfo);

      this.uploadAsync(jsonData)
        .then((uploadedUrl) => {
          return NWTK.mtop.Design.exportRoominfo({
            data: {
              designId,
              fileType: FILE_TYPE_INVENTORY,
              url: uploadedUrl,
            },
          });
        })
        .catch((error) => {
          HSApp.App.getApp().errorLogger.push('export.Roominfo.error', {
            description: '保存导出房间信息出错',
            errorStack: error,
            errorInfo: error,
          });
        });
    } catch (error) {
      HSApp.App.getApp().errorLogger.push('export.Roominfo.error', {
        description: '保存导出房间信息出错',
        errorStack: error,
        errorInfo: error,
      });
    }

    return { status: 'success' };
  }

  /**
   * Upload JSON data to cloud storage
   */
  private async uploadAsync(jsonData: string): Promise<string> {
    const requestData: DesignUploadUrlData = {
      fileType: FILE_TYPE_JSON,
      tenant: tenantConfig.tenant,
    };

    const response = await NWTK.mtop.Design.getDesignUploadUrl({
      data: requestData,
      options: {
        timeout: UPLOAD_TIMEOUT,
      },
    });

    const uploadData = response.data;
    if (response?.ret?.[0]?.includes(SUCCESS_STATUS) && uploadData?.url) {
      return this.uploadJsonFileToOssUrl(uploadData.url, jsonData, {}, true);
    }

    return Promise.reject(response);
  }

  /**
   * Upload JSON file to OSS URL with optional gzip compression
   */
  private async uploadJsonFileToOssUrl(
    url: string,
    data: string,
    options: Record<string, unknown>,
    useGzip: boolean = false
  ): Promise<string> {
    let uploadData: Blob | string = data;

    if (useGzip) {
      const gzippedData = gzip(data);
      uploadData = new Blob([gzippedData], {
        type: 'application/json;charset=x-user-defined',
      });
    }

    const uploadOptions: UploadOptions = {
      ...options,
      ...(useGzip
        ? {
            dataType: undefined,
            processData: false,
            contentType: 'application/octet-stream',
            headers: {
              'x-oss-object-acl': 'public-read',
              'Content-Type': 'application/json;charset=UTF-8',
              'Content-Encoding': 'gzip',
            },
          }
        : {
            dataType: undefined,
            headers: {
              'x-oss-object-acl': 'public-read',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }),
    };

    await httpClient.put(url, uploadData, uploadOptions);
    return urlUtils.clearParams(url);
  }

  /**
   * Get singleton instance of ExportRoominfoTask
   */
  static getExportRoominfoTask(): ExportRoominfoTask {
    if (!ExportRoominfoTask.exportRoominfoTask) {
      ExportRoominfoTask.exportRoominfoTask = new ExportRoominfoTask();
    }
    return ExportRoominfoTask.exportRoominfoTask;
  }
}