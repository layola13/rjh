interface ConfigOptions {
  sample?: number;
  pvSample?: number;
  tag?: string;
  imgUrl?: string;
  region?: string | null;
  ignore?: {
    ignoreUrls?: Array<string | RegExp>;
    ignoreApis?: Array<string | RegExp>;
    ignoreErrors?: Array<string | RegExp>;
    ignoreResErrors?: Array<string | RegExp>;
  };
  release?: string;
  environment?: string;
  page?: string | (() => string);
  debug?: boolean;
  pid?: string;
  disabled?: boolean;
  c1?: string;
  c2?: string;
  c3?: string;
  setUsername?: () => string;
  sendRequest?: (data: RequestData) => void;
}

interface RequestData {
  t: 'error' | 'behavior' | 'res' | 'api' | 'health' | 'custom';
  times: number;
  page: string;
  tag: string;
  release: string;
  environment: string;
  begin: number;
  c1?: string;
  c2?: string;
  c3?: string;
  pid: string;
  _v: string;
  pv_id: string;
  username?: string;
  sampling: number;
  dl?: string;
  z: number;
  msg?: string;
  behavior?: unknown[];
  src?: string;
  api?: string;
  err?: {
    msg_raw?: string;
  };
  [key: string]: unknown;
}

interface TraceIdResult {
  'EagleEye-TraceID': string;
}

interface UberTraceIdResult {
  'uber-trace-id': string;
  traceId: string;
}

interface PageviewIdResult {
  'EagleEye-SessionID': string;
}

interface Utils {
  ext<T>(...args: Array<Partial<T>>): T;
  verifyConfig(config: ConfigOptions): void;
  regionMap: Record<string, string>;
  defaultImgUrl: string;
  warn(message: string, error?: Error): void;
  uu(): string;
  seq(): number;
  getRandIP(): string;
  getSortNum(record: number): number;
  getRandNum(seed: string): number;
  getNum(length: number): string;
  pick(sample: number): boolean;
  ignoreByRule(value: string, rules: Array<string | RegExp>): boolean;
  decode(value: string): string;
  safetyCall<T>(fn: T, args: unknown[], defaultValue: string): string;
  each<T>(obj: Record<string, T>, callback: (value: T, key: string) => boolean): void;
  delay(callback: () => void, delay: number): number;
  selfErrPage: string;
}

declare const utils: Utils;
declare function sendBeacon(data: RequestData, url: string): void;

const SDK_INTERNAL_PID = 'aokcdqn3ly@e629dabd48a9933';

const DEFAULT_CONFIG: ConfigOptions = {
  sample: 1,
  pvSample: 1,
  tag: '',
  imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
  region: null,
  ignore: {
    ignoreUrls: [],
    ignoreApis: [],
    ignoreErrors: [/^Script error\.?$/],
    ignoreResErrors: []
  },
  release: undefined,
  environment: 'prod'
};

function addToQueue(instance: RetcodeSDK, data: RequestData): boolean {
  const firstInQueue = instance.requestQueue[0];
  
  if (
    data.t !== 'error' ||
    !firstInQueue ||
    firstInQueue.t !== 'error' ||
    data.msg !== firstInQueue.msg
  ) {
    if (data.t === 'behavior') {
      const queueLength = instance.requestQueue?.length ?? 0;
      if (queueLength > 0 && instance.requestQueue[queueLength - 1].t === 'behavior') {
        const behaviors = data.behavior ?? [];
        instance.requestQueue[queueLength - 1].behavior.concat(behaviors);
      } else {
        instance.requestQueue.push(data);
      }
    } else {
      instance.requestQueue.unshift(data);
    }
    
    instance.onReady(() => {
      const firstItem = instance.requestQueue[0];
      const delay = firstItem?.t === 'error' ? 3000 : -1;
      instance.requestTimmer = utils.delay(() => {
        instance.clear();
      }, delay);
    });
    
    return true;
  }
  
  data.times++;
  return false;
}

class RetcodeSDK {
  readonly ver: string = '1.8.30';
  private _conf: ConfigOptions;
  private sampleCache: Record<number, boolean>;
  requestQueue: RequestData[];
  private selfQueue: RequestData[];
  private sdkFlag: boolean;
  private hash: number;
  pageview: string;
  private sBegin: number;
  private rip: string;
  private record: number;
  private 'EagleEye-TraceID': string;
  private _common: Record<string, unknown>;
  private username?: string;
  requestTimmer: number | null;
  private Timmer: number | null;
  private _isRobot?: boolean;

  constructor(config?: ConfigOptions) {
    this._conf = utils.ext({}, DEFAULT_CONFIG);
    this.sampleCache = {};
    this.requestQueue = [];
    this.selfQueue = [];
    this.sdkFlag = true;
    this.hash = utils.seq();
    this.resetPageview();
    this.setConfig(config);
    this.rip = utils.getRandIP();
    this.record = 999;
    this['EagleEye-TraceID'] = this.getTraceId()['EagleEye-TraceID'];
    this._common = {};
    this.requestTimmer = null;
    this.Timmer = null;
    this.sBegin = Date.now();
  }

  onReady(callback: () => void): void {
    callback();
  }

  getPage(): string {
    const page = this._conf.page;
    return utils.safetyCall(page, [], String(page));
  }

  setPage(): void {}

  setConfig(config?: ConfigOptions): void {
    if (config && typeof config === 'object') {
      utils.verifyConfig(config);
      const updatedConfig = this.setImgUrl(config);
      this._conf = utils.ext({}, this._conf, updatedConfig);
    }
  }

  setImgUrl(config: ConfigOptions): ConfigOptions {
    const { region, imgUrl } = config;
    if (region) {
      const mappedUrl = utils.regionMap[region];
      config.imgUrl = mappedUrl ?? utils.defaultImgUrl;
      return config;
    }
    if (imgUrl) {
      config.imgUrl = imgUrl;
    }
    return config;
  }

  checkImgUrl(url: string): boolean {
    if (this.getConfig('debug')) {
      return true;
    }
    const regionMap = utils.regionMap;
    let isValid = false;
    for (const key in regionMap) {
      if (regionMap[key] === url) {
        isValid = true;
        break;
      }
    }
    if (!isValid) {
      utils.warn('[retcode] invalid url: ' + url);
    }
    return isValid;
  }

  sendRequest(): void {}

  sendBeacon(data: RequestData): void {
    sendBeacon(data, this.getConfig('imgUrl') as string);
  }

  postData(): void {}

  commonInfo(): Record<string, unknown> {
    return {};
  }

  setCommonInfo(info?: Record<string, unknown>): void {
    if (info && typeof info === 'object') {
      this._common = utils.ext({}, this._common, info);
    }
  }

  resetPageview(): void {
    this.pageview = utils.uu();
    this.sBegin = Date.now();
  }

  getUsername(): string | undefined {
    if (this.username) {
      return this.username;
    }
    const setUsernameFunc = this._conf?.setUsername;
    if (typeof setUsernameFunc === 'function') {
      try {
        const username = setUsernameFunc();
        if (typeof username === 'string') {
          this.username = username.substr(0, 40);
        }
      } catch (error) {
        utils.warn('[arms] setUsername fail', error as Error);
      }
    }
    return this.username;
  }

  getTraceId(): TraceIdResult {
    const timestamp = Date.now();
    const sortNum = utils.getSortNum(this.record);
    const randNum = utils.getRandNum(this._conf.pid!);
    const traceId = this.rip + timestamp + sortNum + randNum;
    this['EagleEye-TraceID'] = traceId;
    this.record = sortNum;
    return { 'EagleEye-TraceID': traceId };
  }

  getUberTraceId(sampled?: boolean): UberTraceIdResult {
    const timestamp = Date.now();
    const sortNum = utils.getSortNum(this.record);
    const randNum = utils.getRandNum(this._conf.pid!);
    const traceId = this.rip + timestamp + sortNum + utils.getNum(2) + randNum;
    const spanId = traceId.substring(0, 16);
    const sampledFlag = sampled ? '1' : '0';
    return {
      'uber-trace-id': `${traceId}:${spanId}:0:${sampledFlag}`,
      traceId
    };
  }

  getPageviewId(): PageviewIdResult {
    return { 'EagleEye-SessionID': this.pageview };
  }

  getConfig<K extends keyof ConfigOptions>(key: K): ConfigOptions[K];
  getConfig(): ConfigOptions;
  getConfig(key?: keyof ConfigOptions): unknown {
    return key ? this._conf[key] : utils.ext({}, this._conf);
  }

  sampling(rate: number): boolean {
    if (rate === 1) {
      return true;
    }
    if (typeof this.sampleCache[rate] !== 'boolean') {
      this.sampleCache[rate] = utils.pick(rate);
    }
    return this.sampleCache[rate];
  }

  clear(clearSelf?: boolean): this {
    clearTimeout(this.requestTimmer!);
    this.requestTimmer = null;
    
    const hasSendRequest = this._conf && typeof this._conf.sendRequest === 'function';
    let item: RequestData | undefined;
    
    while ((item = this.requestQueue.pop())) {
      if (item.t === 'res') {
        this.postData(item, 'res');
      } else if (item.t === 'error') {
        this.postData(item, 'err');
      } else if (item.t === 'api') {
        this.postData(item, 'apiSnapshot');
      } else if (item.t === 'behavior') {
        this.postData(item, 'behavior');
      } else if (item.t === 'health' && !hasSendRequest && window?.navigator?.sendBeacon) {
        this.sendBeacon(item);
      } else {
        this.sendRequest(item);
      }
    }
    
    if (clearSelf) {
      this.clearSelf();
    }
    return this;
  }

  clearSelf(): this {
    clearTimeout(this.Timmer!);
    this.Timmer = null;
    let item: RequestData | undefined;
    while ((item = this.selfQueue.pop())) {
      this.postData(item, 'err');
    }
    return this;
  }

  _lg(
    type: string,
    data: Partial<RequestData>,
    samplingRate?: number,
    shouldLog?: number
  ): this {
    const config = this._conf;
    const page = this.getPage();
    const ignore = config.ignore ?? {};
    const { ignoreErrors = [], ignoreResErrors = [], ignoreUrls = [], ignoreApis = [] } = ignore;
    
    if (this._isRobot) {
      return this;
    }
    
    if (utils.ignoreByRule(page, ignoreUrls) || utils.ignoreByRule(utils.decode(page), ignoreUrls)) {
      return this;
    }
    
    if (type === 'error' && (utils.ignoreByRule(data.msg!, ignoreErrors) || utils.ignoreByRule(utils.decode(data.msg!), ignoreErrors))) {
      return this;
    }
    
    if (type === 'resourceError' && (utils.ignoreByRule(data.src!, ignoreResErrors) || utils.ignoreByRule(utils.decode(data.src!), ignoreResErrors))) {
      return this;
    }
    
    if (type === 'api' && (utils.ignoreByRule(data.api!, ignoreApis) || utils.ignoreByRule(utils.decode(data.api!), ignoreApis))) {
      return this;
    }
    
    if (!this.checkImgUrl(config.imgUrl!)) {
      return this;
    }
    
    if (!data || config.disabled || !config.pid) {
      return this;
    }
    
    if (shouldLog === 0) {
      return this;
    }
    
    const downloadUrl = data.dl;
    delete data.dl;
    
    const requestData: RequestData = utils.ext(
      {
        t: type as RequestData['t'],
        times: 1,
        page,
        tag: config.tag ?? '',
        release: config.release ?? '',
        environment: config.environment!,
        begin: Date.now(),
        c1: config.c1,
        c2: config.c2,
        c3: config.c3
      },
      data,
      this.commonInfo(),
      this._common,
      {
        pid: config.pid,
        _v: this.ver,
        pv_id: this.pageview,
        username: this.getUsername(),
        sampling: samplingRate ?? 1,
        dl: downloadUrl,
        z: utils.seq()
      }
    );
    
    if (shouldLog === 1) {
      return addToQueue(this, requestData) ? this : this;
    }
    
    if (samplingRate && !this.sampling(samplingRate)) {
      return this;
    }
    
    return addToQueue(this, requestData) ? this : this;
  }

  _self(type: string, data: Partial<RequestData>, samplingRate?: number): this {
    if (type !== 'error') {
      return this;
    }
    
    if (!this.checkImgUrl(this._conf.imgUrl!)) {
      return this;
    }
    
    if (!data || this._conf.disabled || !this._conf.pid) {
      return this;
    }
    
    if (samplingRate && !this.sampling(samplingRate)) {
      return this;
    }
    
    const requestData: RequestData = utils.ext(
      {
        t: type as RequestData['t'],
        times: 1,
        page: utils.selfErrPage,
        tag: this._conf.pid,
        begin: Date.now()
      },
      data,
      {
        pid: SDK_INTERNAL_PID,
        _v: this.ver,
        sampling: samplingRate ?? 1,
        z: utils.seq()
      }
    );
    
    const firstItem = this.selfQueue[0];
    if (firstItem) {
      firstItem.times++;
      try {
        const firstErr = firstItem.err;
        const newErr = requestData.err;
        if (firstErr?.msg_raw && newErr?.msg_raw) {
          const existingMessages = firstErr.msg_raw.split('&');
          if (existingMessages.indexOf(newErr.msg_raw) < 0 && firstErr.msg_raw.length < 1000) {
            firstErr.msg_raw += '&' + newErr.msg_raw;
          }
        }
      } catch (error) {}
    } else {
      this.selfQueue.unshift(requestData);
      this.onReady(() => {
        if (this.sdkFlag) {
          this.sdkFlag = false;
          this.Timmer = utils.delay(() => {
            this.clearSelf();
          }, 10000);
        }
      });
    }
    
    return this;
  }

  custom(data: Record<string, unknown>, samplingRate?: number): this {
    if (!data || typeof data !== 'object') {
      return this;
    }
    
    let isValid = false;
    const customData: Partial<RequestData> = { begin: Date.now() };
    
    utils.each(data, (value, key) => {
      isValid = key && key.length <= 20;
      if (!isValid) {
        utils.warn('[retcode] invalid key: ' + key);
      }
      customData['x-' + key] = value;
      return isValid;
    });
    
    return isValid ? this._lg('custom', customData, samplingRate ?? 1) : this;
  }
}

export default RetcodeSDK;