interface MtopResponse<T = unknown> {
  ret: string[];
  data?: {
    result?: T;
  };
}

interface ArticleQueryParams {
  keyword?: string;
  label?: string;
  period?: string;
  [key: string]: unknown;
}

interface ArticleTag {
  name?: string;
  [key: string]: unknown;
}

interface ArticleItem {
  tag?: string | ArticleTag | null;
  [key: string]: unknown;
}

interface ArticleListResult {
  items?: ArticleItem[];
  [key: string]: unknown;
}

interface RemindParams {
  [key: string]: unknown;
}

interface FunctionConfigParams {
  [key: string]: unknown;
}

interface RemindFunctionListParams {
  [key: string]: unknown;
}

declare const NWTK: {
  mtop: {
    TeachingAbility: {
      noRemind: (config: { data: RemindParams }) => Promise<MtopResponse>;
      queryArticleByKeyword: (config: { data: ArticleQueryParams }) => Promise<MtopResponse>;
      queryArticleByLabel: (config: { data: ArticleQueryParams }) => Promise<MtopResponse>;
      queryArticleByPeriod: (config: { data: ArticleQueryParams }) => Promise<MtopResponse<ArticleListResult>>;
      queryFunctionConfig: (config: { data: FunctionConfigParams }) => Promise<MtopResponse>;
      queryLabelList: (config: { data: Record<string, unknown> }) => Promise<MtopResponse>;
      queryRemindFunctionList: (config: { data: RemindFunctionListParams }) => Promise<MtopResponse>;
      queryRemindNewUser: () => Promise<MtopResponse>;
    };
  };
};

function getMagic(): string {
  // Implementation from module 495844
  return '';
}

function getDomain(): string {
  // Implementation from module 495844
  return '';
}

function getVersion(): string {
  // Implementation from module 495844
  return '';
}

function handleMtopResponse<T>(promise: Promise<MtopResponse<T>>): Promise<T | null> {
  return promise.then((response) => {
    if (response?.ret?.[0]?.includes('SUCCESS')) {
      return Promise.resolve(response.data?.result ?? response.data ?? null);
    }
    return Promise.reject(response);
  });
}

function enrichRequestData<T extends Record<string, unknown>>(data: T): T & { magic: string; domain: string; version: string } {
  return {
    ...data,
    magic: getMagic(),
    domain: getDomain(),
    version: getVersion()
  };
}

export function noRemind(params: RemindParams): Promise<unknown> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.noRemind({
      data: params
    })
  );
}

export function queryArticleByKeyword(params: ArticleQueryParams): Promise<unknown> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.queryArticleByKeyword({
      data: enrichRequestData(params)
    })
  );
}

export function queryArticleByLabel(params: ArticleQueryParams): Promise<unknown> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.queryArticleByLabel({
      data: enrichRequestData(params)
    })
  );
}

export function queryArticleByPeriod(params: ArticleQueryParams): Promise<ArticleListResult | null> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.queryArticleByPeriod({
      data: enrichRequestData(params)
    })
  ).then((result) => {
    result?.items?.forEach((item) => {
      let parsedTag: ArticleTag | null | undefined = undefined;
      
      if (typeof item.tag === 'string') {
        try {
          parsedTag = JSON.parse(item.tag);
        } catch (error) {
          // Parsing failed, keep undefined
        }
      }
      
      if (parsedTag?.name === 'NEW') {
        parsedTag = null;
      }
      
      if (item) {
        item.tag = parsedTag;
      }
    });
    
    return result;
  });
}

export function queryFunctionConfig(params: FunctionConfigParams): Promise<unknown> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.queryFunctionConfig({
      data: enrichRequestData(params)
    })
  );
}

export function queryLabelList(): Promise<unknown> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.queryLabelList({
      data: {
        magic: getMagic(),
        domain: getDomain(),
        version: getVersion()
      }
    })
  );
}

export function queryRemindFunctionList(params: RemindFunctionListParams): Promise<unknown> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.queryRemindFunctionList({
      data: enrichRequestData(params)
    })
  );
}

export function queryRemindNewUser(): Promise<unknown> {
  return handleMtopResponse(
    NWTK.mtop.TeachingAbility.queryRemindNewUser()
  );
}