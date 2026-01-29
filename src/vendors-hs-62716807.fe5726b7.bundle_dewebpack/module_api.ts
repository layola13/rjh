interface ApiLogParams {
  api: string;
  success?: boolean;
  time?: number;
  code?: string | number;
  msg?: string;
  begin?: number;
  traceId?: string;
  pv_id?: string;
  apiSnapshot?: unknown;
  domain?: string;
  flag?: string | number;
  dl?: string;
  traceOrigin?: string;
}

interface IgnoreConfig {
  ignoreApis?: string[];
}

interface RetcodeContext {
  getConfig(key: string): unknown;
  beforeSend?: (type: string, data: ApiLogParams) => void;
  _lg(type: string, data: ApiLogParams, shouldSample: boolean, flag?: string | number): RetcodeContext;
}

const MAX_MESSAGE_LENGTH = 1000;
const MAX_URL_LENGTH = 500;

function logApi(
  this: RetcodeContext,
  apiOrParams: string | ApiLogParams,
  success?: boolean,
  time?: number,
  code?: string | number,
  msg?: string,
  begin?: number,
  traceId?: string,
  pvId?: string,
  apiSnapshot?: unknown,
  domain?: string,
  flag?: unknown,
  traceOrigin?: unknown,
  unusedParam?: unknown
): RetcodeContext {
  if (!apiOrParams) {
    r.warn("[retcode] api is null");
    return this;
  }

  let params: ApiLogParams;

  if (typeof apiOrParams === "string") {
    params = {
      api: apiOrParams,
      success,
      time,
      code,
      msg,
      begin,
      traceId,
      pv_id: pvId,
      apiSnapshot,
      domain,
      flag: flag as string | number | undefined
    };
  } else {
    params = r.sub(apiOrParams, o);
  }

  if (!r.checkAPI(params.api, true)) {
    return this;
  }

  params.code = params.code ?? "";

  let message = params.msg ?? "";
  if (typeof message === "string") {
    message = message.substring(0, MAX_MESSAGE_LENGTH);
  }
  params.msg = message;

  params.success = params.success ? 1 : 0;
  params.time = Number(params.time);
  params.begin = params.begin;
  params.traceId = params.traceId ?? "";
  params.pv_id = params.pv_id ?? "";
  params.domain = params.domain ?? "";
  params.flag = params.flag;

  const currentUrl =
    typeof location === "object" && typeof location.href === "string"
      ? location.href.substring(0, MAX_URL_LENGTH)
      : "";
  params.dl = currentUrl;

  if (params.success) {
    if (params.apiSnapshot) {
      delete params.apiSnapshot;
    }
  } else {
    params.apiSnapshot = apiSnapshot;
  }

  if (traceOrigin) {
    params.traceOrigin = traceOrigin as string;
  }

  if (!params.api || isNaN(params.time)) {
    r.warn("[retcode] invalid time or api");
    return this;
  }

  const ignoreConfig = (this.getConfig("ignore") ?? {}) as IgnoreConfig;
  const ignoreApis = ignoreConfig.ignoreApis;

  if (
    r.ignoreByRule(params.api, ignoreApis) ||
    r.ignoreByRule(r.decode(params.api), ignoreApis)
  ) {
    return this;
  }

  if (this.beforeSend) {
    this.beforeSend("api", params);
  }

  return this._lg("api", params, params.success && this.getConfig("sample"), params.flag);
}