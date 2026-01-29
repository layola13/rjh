import ApiService from './ApiService';

interface AigcIdentifyParams {
  [key: string]: unknown;
}

interface FetchAigcCountParams {
  [key: string]: unknown;
}

interface UpdateTaskStatusParams {
  [key: string]: unknown;
}

interface MtopResponse<T = unknown> {
  data: T;
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
}

/**
 * Upload texture for AIGC identification
 */
export function aigcIdentify(params: AigcIdentifyParams): Promise<MtopResponse> {
  return ApiService.sendMtop({
    url: 'mtop.homestyler.global.mobile.app.aigc.upload.texture',
    data: params,
    method: 'POST'
  });
}

/**
 * Fetch AIGC benefit count
 */
export function fetchAigcCount(params: FetchAigcCountParams): Promise<MtopResponse> {
  return ApiService.sendMtop({
    url: 'mtop.homestyler.3d.aries.aigc.benefit.count',
    data: params
  });
}

/**
 * Update task status
 */
export function updateTaskStatus(params: UpdateTaskStatusParams): Promise<MtopResponse> {
  return ApiService.sendMtop({
    url: 'mtop.homestyler.global.score.task.updatetaskstatus',
    data: params
  });
}