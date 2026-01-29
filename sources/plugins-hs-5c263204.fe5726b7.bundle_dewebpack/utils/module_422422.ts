interface MtopResponse<T> {
  ret: string[];
  data: T;
}

interface FeedbackData {
  [key: string]: unknown;
}

interface SelectionGroup {
  sort: number;
  [key: string]: unknown;
}

interface EnvironmentConfig {
  selectionGroups?: SelectionGroup[];
  [key: string]: unknown;
}

interface FeedbackReply {
  replyDate: number;
  [key: string]: unknown;
}

interface FeedbackReport {
  reply?: FeedbackReply[];
  [key: string]: unknown;
}

interface FeedbackItem {
  replyState: string;
  extraData: string;
  type: Array<{ name: string }>;
  [key: string]: unknown;
}

interface TransformedFeedbackItem extends Omit<FeedbackItem, 'type' | 'extraData'> {
  hasUnreadReply: boolean;
  extraData: unknown;
  type: string[];
}

interface FeedbackListResponse {
  items: FeedbackItem[];
  [key: string]: unknown;
}

interface TransformedFeedbackListResponse extends Omit<FeedbackListResponse, 'items'> {
  items: TransformedFeedbackItem[];
}

interface FeedbackReportCountResponse {
  count: number;
}

interface ListQueryParams {
  [key: string]: unknown;
}

interface ReportQueryParams {
  [key: string]: unknown;
}

interface UploadFileParams {
  [key: string]: unknown;
}

declare const NWTK: {
  mtop: {
    NewFeedback: {
      create(options: { data: FeedbackData }): Promise<MtopResponse<unknown>>;
      getEnvironmentConfig(options: { data: unknown }): Promise<MtopResponse<EnvironmentConfig>>;
      getFeedbackStatistics(): Promise<MtopResponse<unknown>>;
      getMyFeedbackList(options: { data: ListQueryParams }): Promise<MtopResponse<FeedbackListResponse>>;
      getMyFeedbackReportCount(): Promise<MtopResponse<FeedbackReportCountResponse>>;
      getWebsocketToken(): Promise<MtopResponse<unknown>>;
      readReport(options: { data: ReportQueryParams }): Promise<MtopResponse<FeedbackReport>>;
    };
  };
};

declare const HSApp: {
  Io: {
    Request: {
      Design: {
        uploadFile(params: UploadFileParams): Promise<unknown>;
      };
    };
  };
};

const REPLY_STATE_UNREAD = "UNREAD";
const REPLY_STATE_UNANSWERED = "UNANSWERED";
const SUCCESS_STATUS = "SUCCESS";

function unwrapMtopResponse<T>(promise: Promise<MtopResponse<T>>): Promise<T> {
  return promise.then((response) => {
    if (response?.ret?.[0]?.includes(SUCCESS_STATUS)) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response);
  });
}

export function createFeedback(data: FeedbackData): Promise<unknown> {
  return unwrapMtopResponse(NWTK.mtop.NewFeedback.create({ data }));
}

export function getEnvironmentConfig(data: unknown): Promise<EnvironmentConfig> {
  return unwrapMtopResponse(NWTK.mtop.NewFeedback.getEnvironmentConfig({ data }))
    .then((config) => {
      config.selectionGroups?.sort((a, b) => a.sort - b.sort);
      return config;
    });
}

export function getFeedbackStatistics(): Promise<unknown> {
  return unwrapMtopResponse(NWTK.mtop.NewFeedback.getFeedbackStatistics());
}

export function getMyFeedbackList(params: ListQueryParams): Promise<TransformedFeedbackListResponse> {
  return unwrapMtopResponse(NWTK.mtop.NewFeedback.getMyFeedbackList({ data: params }))
    .then((response) => ({
      ...response,
      items: response.items.map((item) => ({
        ...item,
        hasUnreadReply: item.replyState === REPLY_STATE_UNREAD || item.replyState === REPLY_STATE_UNANSWERED,
        extraData: JSON.parse(item.extraData),
        type: item.type.map((typeItem) => typeItem.name)
      }))
    }));
}

export function getMyFeedbackReportCount(): Promise<number> {
  return unwrapMtopResponse(NWTK.mtop.NewFeedback.getMyFeedbackReportCount())
    .then((response) => response.count);
}

export function getWebsocketToken(): Promise<unknown> {
  return unwrapMtopResponse(NWTK.mtop.NewFeedback.getWebsocketToken());
}

export function readReport(params: ReportQueryParams): Promise<FeedbackReport> {
  return unwrapMtopResponse(NWTK.mtop.NewFeedback.readReport({ data: params }))
    .then((report) => {
      report.reply?.sort((a, b) => b.replyDate - a.replyDate);
      return report;
    });
}

export function uploadFileToS3(params: UploadFileParams): Promise<unknown> {
  return HSApp.Io.Request.Design.uploadFile(params);
}