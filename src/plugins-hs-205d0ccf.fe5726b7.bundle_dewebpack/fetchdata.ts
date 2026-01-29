export enum TMtopCode {
  SUCCESS = "SUCCESS",
  FAIL_BIZ_PARAM_INVALID = "FAIL_BIZ_PARAM_INVALID",
  FAIL_BIZ_NO_BENEFIT = "FAIL_BIZ_NO_BENEFIT",
  FAIL_BIZ_QUEUE_IS_FULL = "FAIL_BIZ_QUEUE_IS_FULL",
  FAIL_BIZ_GREATER_QUEUEABLE_QUANTITY = "FAIL_BIZ_GREATER_QUEUEABLE_QUANTITY",
  FAIL_SYS_HSF_INVOKE_ERROR = "FAIL_SYS_HSF_INVOKE_ERROR",
  FAIL_BIZ_SAVE_AIGC_TASK_FAIL = "FAIL_BIZ_SAVE_AIGC_TASK_FAIL"
}

interface MtopResponse<T = unknown> {
  data?: T;
  ret?: string[];
}

interface HouseDataResponse {
  data?: {
    data?: {
      exist: boolean;
      houseDataUrl: string;
    };
  };
}

interface UploadUrlResponse {
  url: string;
  objUrl: string;
}

interface ErrorResponse {
  code: string;
  msg: string;
}

interface MtopFunction<T = unknown, R = unknown> {
  (params: { data: T }): Promise<MtopResponse<R>>;
}

declare global {
  const NWTK: {
    mtop: {
      SparkPic: {
        submit: MtopFunction;
        getPageInfo: MtopFunction;
        getUploadUrl: MtopFunction<void, UploadUrlResponse>;
      };
      Render: {
        getHouseDataLink: MtopFunction<{ designId: string; designVersion: string }, HouseDataResponse>;
      };
    };
    ajax: {
      put: (url: string, data: unknown, options?: {
        dataType?: string;
        processData?: boolean;
        contentType?: string;
        headers?: Record<string, string>;
      }) => Promise<unknown>;
    };
    api: {
      design: {
        uploadImageFileToOssUrl: (url: string, blob: Blob) => Promise<unknown>;
        dataURItoBlob: (dataUri: string) => Blob;
      };
    };
  };
  const HSApp: {
    App: {
      getApp: () => {
        designMetadata: {
          get: (key: string) => string;
        };
      };
    };
    Config: {
      TENANT: string;
    };
  };
}

export class FetchData {
  /**
   * Render AI generated image
   */
  static renderAIImage<T = unknown>(params: T): Promise<unknown> {
    return FetchData.handlePromise(NWTK.mtop.SparkPic.submit, params);
  }

  /**
   * Upload house data to OSS storage
   */
  static putHouseDataToOss(houseData: unknown): Promise<string | undefined> {
    const app = HSApp.App.getApp();
    const designId = app.designMetadata.get("designId");
    const designVersion = app.designMetadata.get("designVersion");

    return NWTK.mtop.Render.getHouseDataLink({
      data: {
        designId,
        designVersion
      }
    }).then((response) => {
      const responseData = response?.data?.data;
      
      if (responseData) {
        const { exist, houseDataUrl } = responseData;
        
        if (!exist) {
          const secureUrl = houseDataUrl.replace("http://", "https://");
          return FetchData.putDataToOssWithAuthorizedUrl(secureUrl, JSON.stringify(houseData))
            .then(() => secureUrl);
        }
        
        return houseDataUrl;
      }
      
      return undefined;
    });
  }

  /**
   * Upload data to OSS using authorized URL
   */
  static putDataToOssWithAuthorizedUrl(url: string, data: string): Promise<unknown> {
    if (url.indexOf(".json.gzip") !== -1) {
      const pako = require('pako');
      const compressed = pako.gzip(data);
      const blob = new Blob([compressed], {
        type: "application/json"
      });

      return NWTK.ajax.put(url, blob, {
        dataType: undefined,
        processData: false,
        contentType: "application/octet-stream",
        headers: {
          "Content-Type": "application/octet-stream"
        }
      });
    }

    return NWTK.ajax.put(url, data, {
      dataType: "text"
    });
  }

  /**
   * Fetch and parse JSON from OSS
   */
  static getJSONFromOss<T = Record<string, unknown>>(url: string): Promise<T> {
    return fetch(url)
      .then((response) => Promise.resolve(response.json()))
      .catch(() => ({} as T));
  }

  /**
   * Get room type mapping URL based on tenant
   */
  static getRoomTypeMappingUrl(): string {
    const { roomTypeRelationFPUrl, roomTypeRelationUrl } = require('./constants');
    return HSApp.Config.TENANT === "fp" 
      ? roomTypeRelationFPUrl 
      : roomTypeRelationUrl;
  }

  /**
   * Generic promise handler for mtop calls
   */
  static handlePromise<T = unknown, R = unknown>(
    mtopFunction: MtopFunction<T, R>,
    params: T
  ): Promise<R | ErrorResponse> {
    return mtopFunction({ data: params })
      .then((response) => {
        const responseData = response.data ?? ({} as R);
        const returnCode = response.ret;
        const codeParts = String(returnCode?.[0] ?? "").split("::");

        if (codeParts[0] === "SUCCESS") {
          return responseData;
        }

        return Promise.reject({
          code: codeParts[0],
          msg: codeParts[1]
        });
      })
      .catch((error: unknown) => {
        const errorObj = error as Partial<ErrorResponse>;
        
        if (errorObj?.code && errorObj?.msg) {
          return errorObj as ErrorResponse;
        }

        return {
          code: "err",
          msg: String(error)
        };
      });
  }

  /**
   * Get page information
   */
  static getPageInfo<T = unknown>(params: T): Promise<unknown> {
    return FetchData.handlePromise(NWTK.mtop.SparkPic.getPageInfo, params);
  }

  /**
   * Upload image to URL
   */
  static uploadImgToUrl(dataUri: string): Promise<string> {
    return FetchData.handlePromise<void, UploadUrlResponse>(NWTK.mtop.SparkPic.getUploadUrl, undefined as void)
      .then((response) => {
        const uploadResponse = response as UploadUrlResponse;
        const blob = NWTK.api.design.dataURItoBlob(dataUri);
        
        return NWTK.api.design.uploadImageFileToOssUrl(uploadResponse.url, blob)
          .then(() => uploadResponse.objUrl);
      });
  }
}