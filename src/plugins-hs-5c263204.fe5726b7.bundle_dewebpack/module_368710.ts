export interface FeedbackData {
  [key: string]: unknown;
}

export interface MtopResponse<T = unknown> {
  data: T;
  ret: string[];
}

export interface LiveHintOptions {
  status: string;
  canclose: boolean;
}

declare const NWTK: {
  mtop: {
    Feedback: {
      submitFeedback(params: { data: FeedbackData }): Promise<MtopResponse>;
    };
  };
};

declare const HSApp: {
  Io: {
    Request: {
      Design: {
        uploadFile(file: File): Promise<unknown>;
      };
    };
  };
};

declare const LiveHint: {
  show(
    message: string,
    type: string,
    duration: undefined,
    options: LiveHintOptions
  ): void;
};

const IMAGE_EXTENSION_REGEX = /\.(gif|jpg|jpeg|png|svg|SVG|GIF|JPG|PNG)$/;
const FEEDBACK_IMAGE_PATH_PREFIX = "./plugin/feedback/res/ImgFeedBack/";
const DEFAULT_LIVE_HINT_STATUS = "completed canops";

export async function sendFeedback(data: FeedbackData): Promise<unknown> {
  try {
    const response = await NWTK.mtop.Feedback.submitFeedback({ data });
    const responseData = response.data;

    if (response?.ret[0]?.includes("SUCCESS") && responseData) {
      return responseData ?? {};
    }

    return Promise.reject(responseData);
  } catch (error) {
    return Promise.reject(error);
  }
}

export function getFileUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result as string;
      resolve(result);
    };

    reader.onerror = () => {
      reject();
    };

    reader.readAsDataURL(file);
  });
}

export function uploadFileToS3(file: File): Promise<unknown> {
  return HSApp.Io.Request.Design.uploadFile(file);
}

export function parseURL(url: string): string {
  let parsedPath = "";

  if (IMAGE_EXTENSION_REGEX.test(url)) {
    parsedPath = FEEDBACK_IMAGE_PATH_PREFIX + url;
  }

  return parsedPath;
}

export function showLiveHint(
  message: string,
  type: string,
  status?: string
): void {
  const finalStatus = status !== undefined ? status : DEFAULT_LIVE_HINT_STATUS;

  LiveHint.show(message, type, undefined, {
    status: finalStatus,
    canclose: true
  });
}