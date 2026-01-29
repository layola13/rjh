interface StatData {
  key: string;
  group?: string;
  subkey?: string;
  val?: number;
  begin?: number;
}

interface ErrorConfig {
  filename?: string;
  lineno?: number;
  colno?: number;
  tag?: string;
  c1?: string;
  c2?: string;
  c3?: string;
}

interface ErrorData {
  begin: number;
  cate: string;
  msg: string;
  stack: string;
  file: string;
  line: number | string;
  col: number | string;
  err: {
    msg_raw: string;
    stack_raw: string;
  };
  dl: string;
  tag?: string;
  c1?: string;
  c2?: string;
  c3?: string;
}

interface ApiParams {
  api: string;
  success?: boolean | number;
  time?: number;
  code?: string | number;
  msg?: string;
  begin?: number;
  traceId?: string;
  pv_id?: string;
  apiSnapshot?: unknown;
  domain?: string;
  flag?: unknown;
  dl?: string;
  traceOrigin?: unknown;
}

interface PerformanceData {
  autoSend?: boolean;
  [key: string]: unknown;
}

interface ResourceData {
  begin?: number;
  dom?: string;
  load?: string;
  res?: unknown[];
  dl?: string;
}

interface EventData {
  key: string;
  success?: boolean | number;
  time?: number;
  c1?: string;
  c2?: string;
  c3?: string;
}

interface SpeedCache {
  [key: string]: number | null;
  begin?: number;
  page?: string;
}

interface IgnoreConfig {
  ignoreErrors?: RegExp[];
  ignoreApis?: RegExp[];
}

interface Config {
  startTime?: number | null;
  sample?: boolean;
  ignore?: IgnoreConfig;
  autoSendPerf?: boolean;
}

const API_FIELDS = [
  'api',
  'success',
  'time',
  'code',
  'msg',
  'trace',
  'traceId',
  'begin',
  'pv_id',
  'sid',
  'seq',
  'domain',
  'flag'
] as const;

const CUSTOM_FIELDS = ['tag', 'c1', 'c2', 'c3'] as const;

const EVENT_FIELDS = ['key', 'success', 'time', 'c1', 'c2', 'c3'] as const;

const RESOURCE_REQUIRED_FIELDS = ['begin', 'dom', 'load', 'res', 'dl'] as const;

function parseStatData(data: StatData): StatData {
  const keyParts = (data.key || 'default').split('::');
  
  if (keyParts.length > 1) {
    return {
      ...data,
      group: keyParts[0],
      key: keyParts[1]
    };
  }
  
  return {
    ...data,
    group: 'default_group',
    key: keyParts[0]
  };
}

class Reporter extends BaseReporter {
  private _startTime: number;
  private speedCache: SpeedCache | null = null;
  private speedTimmer?: NodeJS.Timeout;
  private hasSendPerf = false;
  private perfData?: PerformanceData;
  
  constructor(config: Config) {
    super(config);
    
    let startTime: number;
    try {
      startTime = typeof performance === 'object' 
        ? performance.timing.fetchStart 
        : Date.now();
    } catch (error) {
      startTime = Date.now();
    }
    
    this._startTime = startTime;
  }

  sum(key: string | StatData, value?: number, sample?: boolean): this {
    try {
      const statData = utils.dealParam(key, value, 1);
      return this._lg('sum', parseStatData(statData), sample);
    } catch (error) {
      utils.warn(`[retcode] can not get parseStatData: ${error}`);
      return this;
    }
  }

  avg(key: string | StatData, value?: number, sample?: boolean): this {
    try {
      const statData = utils.dealParam(key, value, 0);
      return this._lg('avg', parseStatData(statData), sample);
    } catch (error) {
      utils.warn(`[retcode] can not get parseStatData: ${error}`);
      return this;
    }
  }

  percent(key: string, subkey: string, value?: number, sample?: boolean): this {
    try {
      return this._lg('percent', parseStatData({
        key,
        subkey,
        val: value || 0,
        begin: Date.now()
      }), sample);
    } catch (error) {
      utils.warn(`[retcode] can not get parseStatData: ${error}`);
      return this;
    }
  }

  msg(message: string, sample?: boolean): this | undefined {
    if (message && message.length <= 180) {
      return this.custom({ msg: message }, sample);
    }
    return undefined;
  }

  error(error: string | Error | { error?: Error; message?: string; [key: string]: unknown }, config?: ErrorConfig): this {
    if (!error) {
      utils.warn(`[retcode] invalid param e: ${error}`);
      return this;
    }

    let errorObj: Error | { message?: string; name?: string; stack?: string; msg?: string };
    let errorConfig: ErrorConfig = {};

    if (arguments.length === 1) {
      if (typeof error === 'string') {
        errorObj = { message: error };
        errorConfig = {};
      } else if (typeof error === 'object') {
        errorConfig = error;
        errorObj = (error as { error?: Error }).error || error;
      }
    } else {
      if (typeof error === 'string') {
        errorObj = { message: error };
      } else {
        errorObj = error as Error;
      }
      if (typeof config === 'object') {
        errorConfig = config;
      } else {
        errorConfig = {};
      }
    }

    const errorName = errorObj.name || 'CustomError';
    const errorMessage = errorObj.message || '';
    const errorStack = errorObj.stack || '';
    const currentUrl = typeof location === 'object' && typeof location.href === 'string' 
      ? location.href.substring(0, 500) 
      : '';

    if (utils.checkSDKError(errorMessage, errorConfig.filename)) {
      const scriptErrorPattern = /^Script error\.?$/;
      const rawMessage = (errorObj as { msg?: string }).msg || errorObj.message;
      
      if (utils.ignoreByRule(rawMessage, scriptErrorPattern) || 
          utils.ignoreByRule(utils.decode(rawMessage), scriptErrorPattern)) {
        return this;
      }

      const selfErrorData = {
        msg: utils.selfErrKey,
        err: {
          msg_raw: utils.encode((errorObj as { msg?: string }).msg || errorObj.message)
        }
      };
      
      return this._self('error', selfErrorData, 1);
    }

    const errorData: ErrorData = {
      begin: Date.now(),
      cate: errorName,
      msg: errorMessage.substring(0, 1000),
      stack: errorStack.substring(0, 1000),
      file: utils.removeUrlSearch(errorConfig.filename || ''),
      line: errorConfig.lineno || '',
      col: errorConfig.colno || '',
      err: {
        msg_raw: utils.encode(errorMessage),
        stack_raw: utils.encode(errorStack)
      },
      dl: currentUrl
    };

    for (const field of CUSTOM_FIELDS) {
      if (errorConfig[field]) {
        errorData[field] = errorConfig[field];
      }
    }

    const ignoreErrors = (this.getConfig('ignore') || {}).ignoreErrors;
    if (utils.ignoreByRule(errorData.msg, ignoreErrors) || 
        utils.ignoreByRule(utils.decode(errorData.msg), ignoreErrors)) {
      return this;
    }

    if (this.beforeSend) {
      this.beforeSend('error', errorData);
    }

    return this._lg('error', errorData, 1);
  }

  behavior(behavior: string | { behavior?: string; [key: string]: unknown }): this | undefined {
    if (behavior) {
      const behaviorData = typeof behavior === 'object' && (behavior as { behavior?: string }).behavior
        ? behavior
        : { behavior };

      if (this.beforeSend) {
        this.beforeSend('behavior', behaviorData);
      }

      return this._lg('behavior', behaviorData, 1);
    }
    return undefined;
  }

  api(
    api: string | ApiParams,
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
    traceOrigin?: unknown
  ): this {
    if (!api) {
      utils.warn('[retcode] api is null');
      return this;
    }

    const apiData: ApiParams = typeof api === 'string'
      ? {
          api,
          success,
          time,
          code,
          msg,
          begin,
          traceId,
          pv_id: pvId,
          apiSnapshot,
          domain,
          flag
        }
      : utils.sub(api, API_FIELDS);

    if (!utils.checkAPI(apiData.api, true)) {
      return this;
    }

    apiData.code = apiData.code || '';
    
    let apiMsg = apiData.msg || '';
    if (typeof apiMsg === 'string') {
      apiMsg = apiMsg.substring(0, 1000);
    }
    apiData.msg = apiMsg;

    apiData.success = apiData.success ? 1 : 0;
    apiData.time = Number(apiData.time);
    apiData.begin = apiData.begin;
    apiData.traceId = apiData.traceId || '';
    apiData.pv_id = apiData.pv_id || '';
    apiData.domain = apiData.domain || '';
    apiData.flag = apiData.flag;
    apiData.dl = typeof location === 'object' && typeof location.href === 'string'
      ? location.href.substring(0, 500)
      : '';

    if (apiData.success) {
      if (apiData.apiSnapshot) {
        delete apiData.apiSnapshot;
      }
    } else {
      apiData.apiSnapshot = apiSnapshot;
    }

    if (traceOrigin) {
      apiData.traceOrigin = traceOrigin;
    }

    if (!apiData.api || isNaN(apiData.time)) {
      utils.warn('[retcode] invalid time or api');
      return this;
    }

    const ignoreApis = (this.getConfig('ignore') || {}).ignoreApis;
    if (utils.ignoreByRule(apiData.api, ignoreApis) || 
        utils.ignoreByRule(utils.decode(apiData.api), ignoreApis)) {
      return this;
    }

    if (this.beforeSend) {
      this.beforeSend('api', apiData);
    }

    return this._lg('api', apiData, apiData.success && this.getConfig('sample'), apiData.flag);
  }

  speed(point: string, time?: number, skipPageInfo?: boolean): this {
    const configStartTime = this.getConfig('startTime');
    const startTime = configStartTime || this._startTime;

    if (!/^s(\d|1[0])$/.test(point)) {
      utils.warn(`[retcode] invalid point: ${point}`);
      return this;
    }

    const calculatedTime = typeof time !== 'number'
      ? Date.now() - startTime
      : time >= startTime
        ? time - startTime
        : time;

    this.speedCache = this.speedCache || {};
    this.speedCache[point] = calculatedTime;
    this.speedCache.begin = startTime;

    clearTimeout(this.speedTimmer);
    
    this.speedTimmer = setTimeout(() => {
      if (!skipPageInfo) {
        this.speedCache!.page = this.getPage(true);
      }
      this._lg('speed', this.speedCache);
      this.speedCache = null;
    }, 5000);

    return this;
  }

  performance(data: PerformanceData): void {
    if (!data || typeof data !== 'object' || this.hasSendPerf) {
      return;
    }

    const perfData: PerformanceData = {};
    let mergedData: PerformanceData = {};
    const autoSendPerf = this.getConfig('autoSendPerf');

    if (data.autoSend && autoSendPerf) {
      mergedData = { ...(this.perfData || {}), ...data };
      this.hasSendPerf = true;
      this._lg('perf', mergedData, this.getConfig('sample'));
      return;
    }

    if (data.autoSend && !autoSendPerf) {
      delete data.autoSend;
      if (this.perfData) {
        mergedData = { ...(this.perfData || {}), ...data };
        this.hasSendPerf = true;
        this._lg('perf', mergedData, this.getConfig('sample'));
        return;
      } else {
        this.perfData = data;
        return;
      }
    }

    for (const key in data) {
      if (/^t([1-9]|1[0])$/.test(key) || key === 'ctti' || key === 'cfpt') {
        perfData[key] = data[key];
      }
    }

    if (data.autoSend === true || (!autoSendPerf && (autoSendPerf || this.perfData))) {
      if (data.autoSend !== true && autoSendPerf === false && this.perfData) {
        const finalData = { ...(this.perfData || {}), ...perfData };
        this.hasSendPerf = true;
        this._lg('perf', finalData, this.getConfig('sample'));
        return;
      }
      return;
    }

    this.perfData = { ...(this.perfData || {}), ...perfData };
  }

  resource(data: ResourceData, sample?: boolean): this | undefined {
    if (!data || !utils.isPlainObject(data)) {
      utils.warn(`[arms] invalid param data: ${data}`);
      return this;
    }

    const dataKeys = Object.keys(data);
    let missingField = false;

    for (const field of RESOURCE_REQUIRED_FIELDS) {
      if (dataKeys.indexOf(field) < 0) {
        missingField = true;
        break;
      }
    }

    if (missingField) {
      utils.warn(`[arms] lack param data: ${data}`);
      return this;
    }

    const resourceData = {
      begin: data.begin || Date.now(),
      dom: data.dom || '',
      load: data.load || '',
      res: utils.isArray(data.res) ? JSON.stringify(data.res) : JSON.stringify([]),
      dl: data.dl || ''
    };

    return this._lg('res', resourceData, sample);
  }

  event(data: EventData, sample?: boolean): void {
    if (typeof data === 'object' && data && data.key) {
      const eventData: Partial<EventData> = {};

      for (const field of EVENT_FIELDS) {
        if (field in data) {
          eventData[field] = data[field];
        }
      }

      eventData.success = data.success === false ? 0 : 1;

      this._lg('event', eventData, sample);
    }
  }
}

export default Reporter;