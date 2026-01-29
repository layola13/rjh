import { win, safetyCall, isRobot, createObject, ext, cutUrlSearch, filterByRule, verifyConfig, serialize, T, each, warn } from './utils';
import { BaseMonitor } from './BaseMonitor';
import { sendImage } from './sendImage';
import { postRequest } from './postRequest';

const document = win.document;
const VALID_METHODS_REGEX = /^(error|api|speed|sum|avg|percent|custom|msg|setPage|setConfig|behavior|performance)$/;

interface HealthMetrics {
  errcount: number;
  apisucc: number;
  apifail: number;
  healthy?: number;
  begin?: number;
  stay?: number;
}

interface BrowserConfig {
  page?: string | (() => string);
  enableInstanceAutoSend?: boolean;
  behavior?: boolean;
  pid?: string;
  uid?: string | null;
  setUsername?: string | null;
  ignoreUrlPath?: RegExp[] | null;
  ignoreApiPath?: RegExp[] | null;
  urlHelper?: Array<{ rule: RegExp; target: string } | RegExp>;
  apiHelper?: { rule: RegExp; target: string };
  ignoreUrlCase?: boolean;
  imgUrl?: string;
  disableHook?: boolean;
  autoSendPv?: boolean;
  autoSendPerf?: boolean;
  enableSPA?: boolean;
  enableLinkTrace?: boolean;
  linkType?: string;
  enableApiCors?: boolean;
  sendResource?: boolean;
  enableConsole?: boolean;
  parseHash?: (hash: string) => string;
  parseResponse?: (response: unknown) => ParsedResponse;
}

interface ParsedResponse {
  msg?: string;
  code?: string | number;
  success?: boolean;
}

export class BrowserMonitor extends BaseMonitor {
  private _initialPage: string | null;
  private _isRobot: boolean;
  private _health: HealthMetrics;
  private hasReady?: boolean;
  private prevPage?: string;
  private sendPVTimmer?: number;
  private sBegin!: number;

  constructor(config: BrowserConfig) {
    super(config);

    this._initialPage = (config.page && safetyCall(config.page, [], String(config.page))) || null;
    this._isRobot = isRobot();
    this._health = {
      errcount: 0,
      apisucc: 0,
      apifail: 0
    };

    this.beforeSend = (eventType: string, data: { success?: boolean }): void => {
      if (eventType === 'error') {
        this._health.errcount++;
      } else if (eventType === 'api') {
        this._health[data.success ? 'apisucc' : 'apifail']++;
      }
    };

    if (config.enableInstanceAutoSend !== false) {
      this.initHandler();
      this.initHook();
      this.initFmpObserver(10000);
      
      if (this._conf?.behavior && typeof this.initBehavior === 'function') {
        this.initBehavior();
      }
    }

    if (Object.defineProperty && win.addEventListener) {
      Object.defineProperty(this, 'pipe', {
        set: this.sendPipe
      });
    }
  }

  public onReady(callback: () => void): void {
    if (this.hasReady) {
      return callback();
    }

    if (document.readyState === 'complete') {
      this.hasReady = true;
      callback();
    } else {
      win.addEventListener('load', () => {
        this.hasReady = true;
        callback();
      }, true);
    }
  }

  public getPage(useOriginal?: boolean): string {
    const config = this._conf;
    const pageConfig = config.page;
    const { host, pathname } = location;
    const fullPath = host + pathname;

    if (pageConfig && !useOriginal) {
      return safetyCall(pageConfig, [], String(pageConfig));
    }

    const pathToFilter = config.ignoreUrlCase ? fullPath.toLowerCase() : fullPath;
    const rules = config.ignoreUrlPath ?? config.urlHelper;
    
    return this._initialPage || filterByRule(pathToFilter, rules);
  }

  public setPage(page: string, shouldSend: boolean = true): this {
    const previousPage = this.prevPage;

    if (shouldSend !== false) {
      if (!page || page === previousPage) {
        return this;
      }

      this.prevPage = page;
      clearTimeout(this.sendPVTimmer);
      this.handleUnload(1);
      this.resetPageview();

      this.sendPVTimmer = setTimeout(() => {
        this.sendPV();
      }, 10);
    } else {
      this.prevPage = page;
    }

    this._conf.page = page;
    return this;
  }

  public setConfig(config: Partial<BrowserConfig>, skipHooks?: boolean): void {
    if (!config || typeof config !== 'object') {
      return;
    }

    verifyConfig(config);
    const configWithImgUrl = this.setImgUrl(config);
    const previousConfig = this._conf;

    this._conf = ext({}, previousConfig, configWithImgUrl);

    if (!skipHooks) {
      if ('disableHook' in configWithImgUrl && previousConfig.disableHook !== configWithImgUrl.disableHook) {
        configWithImgUrl.disableHook ? this.removeHook() : this.addHook();
      }

      if ('enableSPA' in configWithImgUrl && previousConfig.enableSPA !== configWithImgUrl.enableSPA) {
        this.bindHashChange(configWithImgUrl.enableSPA);
      }
    }
  }

  public sendRequest(data: Record<string, unknown>): void {
    sendImage(data, this.getConfig('imgUrl'));
  }

  public postData(data: Record<string, unknown>, key: string): void {
    const postPayload: Record<string, unknown> = {};
    postPayload[key] = data[key];
    delete data[key];

    let queryString = '';
    if (typeof data === 'object') {
      queryString = serialize(data);
    }

    postRequest(postPayload, `${this.getConfig('imgUrl')}${queryString}&post_res=`);
  }

  public sendPipe(pipe: unknown): this {
    if (!pipe || !Array.isArray(pipe) || pipe.length === 0) {
      return this;
    }

    try {
      if (T(pipe[0]) === 'Array') {
        each(pipe, (item: unknown) => this.sendPipe(item));
        return this;
      }

      if (T(pipe) !== 'Array') {
        return this;
      }

      const method = pipe.shift() as string;
      if (!VALID_METHODS_REGEX.test(method)) {
        return this;
      }

      (this as any)[method].apply(this, pipe);
    } catch (error) {
      warn('[retcode] error in sendPipe', error);
    }

    return this;
  }

  public sendHealth(): void {
    const healthData = ext({}, this._health) as HealthMetrics;
    healthData.healthy = healthData.errcount > 0 ? 0 : 1;
    healthData.begin = Date.now();
    
    const duration = healthData.begin - this.sBegin;
    healthData.stay = duration;

    this._lg('health', healthData, 1);

    this._health = {
      errcount: 0,
      apisucc: 0,
      apifail: 0
    };
  }

  public createInstance(config: Partial<BrowserConfig>): BrowserMonitor {
    const instanceConfig = ext({
      pid: this._conf.pid
    }, config);

    const instance = new BrowserMonitor(instanceConfig);

    if (config.page) {
      instance.sendPV();
    }

    return instance;
  }

  // Methods to be implemented by mixins
  protected initHandler(): void {}
  protected initHook(): void {}
  protected initFmpObserver(timeout: number): void {}
  protected initBehavior?(): void {}
  protected handleUnload(flag: number): void {}
  protected resetPageview(): void {}
  protected sendPV(): void {}
  protected removeHook(): void {}
  protected addHook(): void {}
  protected bindHashChange(enable?: boolean): void {}
  protected setImgUrl(config: Partial<BrowserConfig>): Partial<BrowserConfig> { return config; }
  protected getConfig(key: string): any {}
  protected _lg(type: string, data: unknown, flag: number): void {}
  protected beforeSend(eventType: string, data: any): void {}
}

// Default configuration extensions
ext(BaseMonitor._root.dftCon, {
  uid: null,
  setUsername: null,
  ignoreUrlPath: null,
  ignoreApiPath: null,
  urlHelper: [
    {
      rule: /\/([a-z\-_]+)?\d{2,20}/g,
      target: '/$1**'
    },
    /\/$/
  ],
  apiHelper: {
    rule: /\/([a-z\-_]+)?\d{2,20}/g,
    target: '/$1**'
  },
  ignoreUrlCase: true,
  imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
  disableHook: false,
  autoSendPv: true,
  autoSendPerf: true,
  enableSPA: false,
  enableLinkTrace: false,
  linkType: 'arms',
  enableApiCors: false,
  sendResource: true,
  behavior: true,
  enableConsole: false,
  parseHash: (hash: string): string => {
    return (hash ? cutUrlSearch(hash.replace(/^#\/?/, '')) : '') || '[index]';
  },
  parseResponse: (response: unknown): ParsedResponse => {
    if (!response || typeof response !== 'object') {
      return {};
    }

    const responseObj = response as Record<string, any>;
    let code = responseObj.code;
    let msg = responseObj.msg ?? responseObj.message ?? responseObj.subMsg ?? responseObj.errorMsg ?? responseObj.ret ?? responseObj.errorResponse ?? '';

    if (typeof msg === 'object' && msg !== null) {
      code = code ?? msg.code;
      msg = msg.msg ?? msg.message ?? msg.info ?? msg.ret ?? JSON.stringify(msg);
    }

    return {
      msg,
      code,
      success: true
    };
  }
});

BrowserMonitor._super = BaseMonitor;
BrowserMonitor._root = BaseMonitor._root;
BaseMonitor.Browser = BrowserMonitor;