import { warn, ext, uu, T, checkAutoError, on, off } from './utils';
import { getResourceTiming } from './resource-timing';
import { getPerformanceTiming } from './performance-timing';

interface ConnectionInfo {
  effectiveType?: string;
  type?: string;
}

interface Navigator {
  connection?: ConnectionInfo;
}

interface CommonInfo {
  sr: string;
  vp: string;
  ct: string;
  uid?: string | null;
  sid?: string | null;
}

interface PerformanceData {
  load?: number;
  page?: string;
  autoSend?: boolean;
  [key: string]: unknown;
}

interface ResourceData {
  load?: number;
  page?: string;
  dl?: string;
  [key: string]: unknown;
}

interface PVData {
  uid: string | null;
  dt: string;
  dl: string;
  dr: string;
  dpr: string;
  de: string;
  ul: string;
  begin: number;
}

interface ErrorEvent {
  type: string;
  target?: HTMLElement;
  srcElement?: HTMLElement;
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: Error;
  reason?: unknown;
}

interface Config {
  uid?: string;
  enableSPA?: boolean;
  behavior?: boolean;
  sample?: number;
  pvSample?: number;
  parseHash: (hash: string) => string | null;
}

interface RetcodeInstance {
  _conf: Config;
  session?: string;
  hasInitHandler?: boolean;
  hashChangeHandler?: ((skipReport: boolean) => void) | null;
  stateChangeHandler?: ((event: CustomEvent) => void) | null;
  speedCache?: unknown;
  speedTimmer?: number;
  _lastUnload: number;
  activeErrHandler(force: boolean): this;
  errorHandler(event: ErrorEvent | null): this;
  resourceErrorHandler(event: ErrorEvent): this;
  getSrc(element: HTMLElement): string;
  getXPath(element: HTMLElement, depth: number): string;
  sendPerformance(extra?: Record<string, unknown>): void;
  sendResources(extra?: Record<string, unknown>): void;
  sendPV(): void;
  commonInfo(): CommonInfo;
  handleUnload(code: number): this;
  bindHashChange(enable: boolean): this;
  initHandler(): this;
  onReady(callback: () => void): void;
  getPage(fullPath: boolean): string;
  performance(data: PerformanceData): void;
  _lg(type: string, data: unknown, sample?: number): void;
  setPage(page: string, shouldReport?: boolean): void;
  getConfig(key: string): unknown;
  reportBehavior?(): void;
  sendHealth(code: number): void;
  clear(force: boolean): void;
  hackHistoryState(): void;
}

const cookieCache: Record<string, string> = {};
let activeInstance: RetcodeInstance | null = null;

const documentElement = document.documentElement;
const viewportWidth = window.innerWidth || documentElement.clientWidth || document.body.clientWidth;
const viewportHeight = window.innerHeight || documentElement.clientHeight || document.body.clientHeight;
const connection = (window.navigator as Navigator).connection;

const commonInfo: CommonInfo = {
  sr: `${screen.width}x${screen.height}`,
  vp: `${viewportWidth}x${viewportHeight}`,
  ct: connection ? (connection.effectiveType || connection.type || '') : ''
};

function getCookie(name: string): string | null;
function getCookie(name: string, value: string, maxAge?: number, domain?: string, path?: string): boolean;
function getCookie(
  name: string,
  value?: string,
  maxAge?: number,
  domain?: string,
  path?: string
): string | null | boolean {
  if (value === undefined) {
    if (!cookieCache[name]) {
      const regex = new RegExp(`${name}=([^;]+)`);
      try {
        const match = regex.exec(document.cookie);
        if (match) {
          cookieCache[name] = match[1];
        }
      } catch (error) {
        warn('[retcode] can not get cookie:', error);
        return null;
      }
    }
    return cookieCache[name] || null;
  }

  let cookieString = `${name}=${value}`;
  if (domain) {
    cookieString += `;domain=${domain}`;
  }
  cookieString += `;path=${path || '/'}`;
  if (maxAge) {
    cookieString += `;max-age=${maxAge}`;
  }

  try {
    document.cookie = cookieString;
    return !!document.cookie;
  } catch (error) {
    warn('[retcode] can not set cookie: ', error);
    return false;
  }
}

function getUserId(instance: RetcodeInstance): string | null {
  const UID_COOKIE_NAME = '_bl_uid';
  const NK_COOKIE_NAME = '_nk_';
  const MAX_AGE_SECONDS = 15552000; // 180 days

  let userId = instance._conf.uid || getCookie(NK_COOKIE_NAME) || getCookie(UID_COOKIE_NAME);

  if (!userId) {
    userId = uu();
    getCookie(UID_COOKIE_NAME, userId, MAX_AGE_SECONDS);
  }

  return userId || null;
}

function getSessionId(instance: RetcodeInstance): string | null {
  if (instance.session) {
    return instance.session;
  }

  let sessionId: string;

  try {
    if (
      typeof window === 'object' &&
      typeof sessionStorage === 'object' &&
      typeof sessionStorage.getItem === 'function'
    ) {
      const storedSessionId = sessionStorage.getItem('_bl_sid');
      if (typeof storedSessionId === 'string') {
        instance.session = storedSessionId;
        return storedSessionId;
      }

      sessionId = uu();
      instance.session = sessionId;
      if (typeof sessionStorage.setItem === 'function') {
        sessionStorage.setItem('_bl_sid', sessionId);
      }
      return sessionId;
    }
  } catch (error) {
    warn('[ARMS] getSid error :', error);
  }

  sessionId = uu();
  instance.session = sessionId;
  return sessionId;
}

export function createRetcodeHandler(
  RetcodeConstructor: new () => RetcodeInstance,
  window: Window,
  document: Document
): new () => RetcodeInstance {
  ext(RetcodeConstructor.prototype, {
    activeErrHandler(force: boolean): RetcodeInstance {
      if (!activeInstance || force) {
        activeInstance = this;
      }
      return this;
    },

    errorHandler(event: ErrorEvent | null): RetcodeInstance {
      if (!event) return this;

      const eventType = event.type;
      if (eventType === 'error') {
        const target = event.target || event.srcElement;
        if (
          !target ||
          !target.tagName ||
          event.message ||
          event.filename ||
          event.lineno ||
          event.colno
        ) {
          this.error(event.error || { message: event.message }, event);
        } else {
          this.resourceErrorHandler(event);
        }
      } else if (eventType === 'unhandledrejection' && T(event.reason, 'Error') && checkAutoError(event.reason)) {
        this.error(event.reason);
      }

      try {
        if (this.getConfig('behavior') && this.reportBehavior) {
          this.reportBehavior();
        }
      } catch (error) {
        // Ignore errors
      }

      return this;
    },

    resourceErrorHandler(event: ErrorEvent): RetcodeInstance {
      try {
        const target = event.target || event.srcElement;
        if (!target) return this;

        const src = this.getSrc(target);
        const nodeName = typeof target.tagName === 'string' ? target.tagName.toLowerCase() : '';
        const xpath = this.getXPath(target, 5);

        this._lg('resourceError', {
          src: src?.substring(0, 1000),
          node_name: nodeName,
          xpath
        });

        return this;
      } catch (error) {
        warn('[ARMS] resourceErrorHandler error :', error);
        return this;
      }
    },

    getSrc(element: HTMLElement): string {
      let src = (element as HTMLScriptElement).src || (element as HTMLLinkElement).href;

      try {
        if (!src) {
          const isObjectTag = typeof element.tagName === 'string' && element.tagName.toLowerCase() === 'object';
          const isFlash =
            (element.getAttribute('classid')?.toLowerCase() === 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000') ||
            (element.getAttribute('type') === 'application/x-shockwave-flash');

          if (isObjectTag && isFlash) {
            src = element.getAttribute('data') || element.getAttribute('codebase') || '';
          }

          if (!src) {
            src = element.outerHTML || element.innerHTML;
          }
        }
      } catch (error) {
        src = '';
      }

      return src;
    },

    getXPath(element: HTMLElement, depth: number): string {
      const id = element.id ? `#${element.id}` : '';
      const className = typeof element.className === 'string' ? `.${element.className.split(' ').join('.')}` : '';
      const tagName = typeof element.tagName === 'string' ? element.tagName.toLowerCase() : '';
      const path = tagName + id + className;

      if (element.parentNode && (element.parentNode as HTMLElement).tagName && depth - 1 !== 0) {
        return `${this.getXPath(element.parentNode as HTMLElement, depth - 1)} > ${path}`;
      }

      return path;
    },

    sendPerformance(extra?: Record<string, unknown>): void {
      this.onReady(() => {
        let performanceData = getPerformanceTiming();
        if (performanceData && performanceData.load && performanceData.load > 0) {
          performanceData.page = this.getPage(true);
          if (extra) {
            performanceData = ext(performanceData, extra);
          }
          performanceData.autoSend = true;
          this.performance(performanceData);
        }
      });
    },

    sendResources(extra?: Record<string, unknown>): void {
      this.onReady(() => {
        let resourceData = getResourceTiming();
        if (resourceData && resourceData.load && resourceData.load > 0) {
          if (resourceData.load <= 2000 || (resourceData.load <= 8000 && Math.random() > 0.05)) {
            return;
          }

          resourceData.page = this.getPage(true);
          resourceData.dl = location.href;
          if (extra) {
            resourceData = ext(resourceData, extra);
          }
          this._lg('res', resourceData, this.getConfig('sample') as number);
        }
      });
    },

    sendPV(): void {
      this.onReady(() => {
        const pvData = this.createPVData();
        if (pvData?.uid) {
          this._lg('pv', pvData, this.getConfig('pvSample') as number);
        }
      });
    },

    createPVData(): PVData | null {
      const userId = getUserId(this);
      const devicePixelRatio = window.devicePixelRatio || 1;

      return {
        uid: userId,
        dt: document.title,
        dl: location.href,
        dr: document.referrer,
        dpr: devicePixelRatio.toFixed(2),
        de: (document.characterSet || (document as any).defaultCharset || '').toLowerCase(),
        ul: documentElement.lang,
        begin: Date.now()
      };
    },

    commonInfo(): CommonInfo {
      commonInfo.uid = getUserId(this);
      commonInfo.sid = getSessionId(this);
      return commonInfo;
    },

    handleUnload(code: number): RetcodeInstance {
      const now = Date.now();
      const UNLOAD_THROTTLE_MS = 200;

      if (now - this._lastUnload < UNLOAD_THROTTLE_MS) {
        return this;
      }

      this._lastUnload = now;
      this.sendHealth(code);

      if (this.speedCache) {
        this._lg('speed', this.speedCache);
        this.speedCache = null;
        if (this.speedTimmer) {
          clearTimeout(this.speedTimmer);
        }
      }

      this.clear(true);
      return this;
    },

    bindHashChange(enable: boolean): RetcodeInstance {
      if (!enable === !this.hashChangeHandler) {
        return this;
      }

      if (enable) {
        this.hackHistoryState();

        this.hashChangeHandler = (skipReport: boolean) => {
          const page = this._conf.parseHash(location.hash);
          if (page) {
            this.setPage(page, skipReport !== false);
          }
        };

        this.stateChangeHandler = (event: CustomEvent) => {
          const page = this._conf.parseHash(event.detail);
          if (page) {
            this.setPage(page);
          }
        };

        on(window, 'hashchange', this.hashChangeHandler);
        on(window, 'historystatechange', this.stateChangeHandler);
        this.hashChangeHandler(false);
      } else {
        if (this.hashChangeHandler) {
          off(window, 'hashchange', this.hashChangeHandler);
        }
        if (this.stateChangeHandler) {
          off(window, 'historystatechange', this.stateChangeHandler);
        }
        this.hashChangeHandler = null;
        this.stateChangeHandler = null;
      }

      return this;
    },

    initHandler(): RetcodeInstance {
      if (this.hasInitHandler) {
        return this;
      }

      const config = this._conf;

      on(window, 'beforeunload', () => {
        this.handleUnload(0);
      });

      this.bindHashChange(config.enableSPA ?? false);
      this.activeErrHandler(false);
      this.hasInitHandler = true;

      return this;
    }
  });

  on(window, 'error', (event: ErrorEvent) => {
    if (activeInstance) {
      activeInstance.errorHandler(event);
    }
  }, false, true);

  on(window, 'unhandledrejection', (event: ErrorEvent) => {
    if (activeInstance) {
      activeInstance.errorHandler(event);
    }
  });

  return RetcodeConstructor;
}