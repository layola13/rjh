interface LockStateParams {
  data: unknown;
}

interface CollaborateEditDesignParams {
  designId: string;
}

interface MtopResponse<T = unknown> {
  ret?: string[];
  data?: T | { result: T };
  mockApi?: boolean;
}

interface CollaborateEditResult {
  designId: string;
  collaborate: boolean;
}

function processResponse<T>(promise: Promise<MtopResponse<T>>): Promise<T> {
  return promise.then((response) => {
    return normalizeResponse(response);
  });
}

function normalizeResponse<T>(response: MtopResponse<T>): Promise<T> {
  if (response?.ret?.[0].includes("SUCCESS")) {
    if (response?.data && "result" in (response.data as object)) {
      return Promise.resolve((response.data as { result: T }).result);
    }
    return Promise.resolve(response.data as T);
  }
  return Promise.reject(response);
}

export function clearLockState(params: unknown): Promise<unknown> {
  return processResponse(NWTK.mtop.CollaborateEdit.lockState({
    data: params
  }));
}

export function lockState(params: unknown): Promise<unknown> {
  return processResponse(NWTK.mtop.CollaborateEdit.lockState({
    data: params
  }));
}

export async function isCollaborateEditDesign(designId: string): Promise<CollaborateEditResult> {
  const response = await NWTK.mtop.CollaborateEdit.isCollaborateEditDesign({
    data: {
      designId
    }
  });

  if (response?.mockApi === true) {
    return {
      designId,
      collaborate: false
    };
  }

  return normalizeResponse<CollaborateEditResult>(response);
}