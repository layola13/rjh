interface MtopResponse<T = unknown> {
  data: T;
  ret?: string[];
}

interface MtopRequestOptions {
  data: unknown;
}

type MtopFunction<T = unknown> = (options: MtopRequestOptions) => Promise<MtopResponse<T>>;

declare const NWTK: {
  mtop: {
    SparkPic: {
      getImageByTask: MtopFunction;
      getAllImageList: MtopFunction;
      deleteImage: MtopFunction;
      markImage: MtopFunction;
      viewImage: MtopFunction;
      updateTaskInfo: MtopFunction;
      getTotal: MtopFunction;
      getPageInfo: MtopFunction;
      submitBySubTask: MtopFunction;
      reSubmit: MtopFunction;
      batchDownloadSubmit: MtopFunction;
      batchDownloadRequest: MtopFunction;
      upgradeResolution: MtopFunction;
      removeWatermark: MtopFunction;
    };
  };
};

export const handlePromise = <T = unknown>(
  mtopFunc: MtopFunction<T>,
  requestData: unknown
): Promise<T> => {
  return mtopFunc({ data: requestData }).then((response) => {
    const { data, ret } = response;
    const isSuccess = ret?.[0]?.includes("SUCCESS");
    
    if (isSuccess && data != null) {
      return data;
    }
    
    return Promise.reject(response);
  });
};

export const fetchImageByTask = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.getImageByTask, params);
};

export const fetchAllImage = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.getAllImageList, params);
};

export const deleteImage = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.deleteImage, params);
};

export const markImage = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.markImage, params);
};

export const viewImage = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.viewImage, params);
};

export const updateTaskInfo = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.updateTaskInfo, params);
};

export const getTotal = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.getTotal, params);
};

export const getCouponNum = (): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.getPageInfo, {});
};

export const submitBySubTask = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.submitBySubTask, params);
};

export const reSubmit = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.reSubmit, params);
};

export const batchDownloadSubmit = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.batchDownloadSubmit, params);
};

export const batchDownloadRequest = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.batchDownloadRequest, params);
};

export const upgradeResolution = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.upgradeResolution, params);
};

export const removeWatermark = (params: unknown): Promise<unknown> => {
  return handlePromise(NWTK.mtop.SparkPic.removeWatermark, params);
};