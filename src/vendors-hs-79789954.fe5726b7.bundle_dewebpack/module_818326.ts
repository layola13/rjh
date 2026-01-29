interface MtopError {
  code: string;
  message: string;
}

interface MtopResponse<T = unknown> {
  ret: string[];
  data?: T;
}

interface ResultWrapper<T> {
  result?: T;
}

interface AIReplaceContentsRequest {
  data: unknown;
}

declare const NWTK: {
  mtop: {
    ConstraintLayout: {
      submitAIReplaceContents(params: AIReplaceContentsRequest): Promise<MtopResponse>;
      queryAIReplaceContents(params: AIReplaceContentsRequest): Promise<MtopResponse>;
    };
  };
};

export function handleMtopError(response: MtopResponse): MtopError[] | undefined {
  const { ret } = response;
  
  if (ret?.length > 0) {
    return ret.map((item) => {
      const parts = item.split("::");
      return {
        code: parts[0],
        message: parts[1]
      };
    });
  }
  
  return undefined;
}

function hasResult<T>(data: T | ResultWrapper<T>): data is ResultWrapper<T> {
  return !!(data as ResultWrapper<T>).result;
}

export function handleMtopResult<T>(response: MtopResponse<T | ResultWrapper<T>>): T {
  const { ret, data } = response;
  
  if (!data || !ret.some((item) => item.includes("SUCCESS"))) {
    throw handleMtopError(response);
  }
  
  return hasResult(data) ? data.result : data;
}

export async function submitAIReplaceContents<T>(requestData: unknown): Promise<T> {
  const response = await NWTK.mtop.ConstraintLayout.submitAIReplaceContents({
    data: requestData
  });
  
  return handleMtopResult<T>(response);
}

export async function queryAIReplaceContents<T>(requestData: unknown): Promise<T> {
  const response = await NWTK.mtop.ConstraintLayout.queryAIReplaceContents({
    data: requestData
  });
  
  return handleMtopResult<T>(response);
}