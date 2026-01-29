interface BrowserLoggerConfig {
  autoSendPv?: boolean;
  useFmp?: boolean;
  sendResource?: boolean;
  enableInstanceAutoSend?: boolean;
}

interface BrowserLoggerInstance {
  _conf: BrowserLoggerConfig;
  sendPipe(pipe: unknown[]): void;
  sendPV(): void;
  sendPerformance(): void;
  sendResources(): void;
}

interface WindowWithLogger extends Window {
  [key: string]: unknown;
  __hasInitBlSdk?: boolean;
  BrowserLogger?: typeof BrowserLogger;
}

const STORAGE_KEY = '__bl_instance__';
const INIT_FLAG = '__hasInitBlSdk';

class BrowserLogger implements BrowserLoggerInstance {
  _conf: BrowserLoggerConfig;

  constructor(config: BrowserLoggerConfig) {
    this._conf = config;
  }

  sendPipe(pipe: unknown[]): void {
    // Implementation
  }

  sendPV(): void {
    // Implementation
  }

  sendPerformance(): void {
    // Implementation
  }

  sendResources(): void {
    // Implementation
  }

  /**
   * Creates or returns singleton instance
   */
  static singleton(config: BrowserLoggerConfig, pipe: unknown[]): BrowserLoggerInstance {
    const win = window as WindowWithLogger;
    return win[INIT_FLAG] ? (win[STORAGE_KEY] as BrowserLoggerInstance) : initializeBrowserLogger(config, pipe);
  }

  /**
   * Creates a new independent instance
   */
  static createExtraInstance(config?: BrowserLoggerConfig): BrowserLoggerInstance {
    const finalConfig = config && typeof config === 'object' ? { ...config } : {};
    
    if (finalConfig.enableInstanceAutoSend !== true) {
      finalConfig.enableInstanceAutoSend = false;
    }

    const instance = new BrowserLogger(finalConfig);
    const conf = instance._conf;

    if (conf.enableInstanceAutoSend) {
      if (conf.autoSendPv !== false) {
        instance.sendPV();
      }
      if (!conf.useFmp) {
        instance.sendPerformance();
      }
      if (conf.sendResource) {
        instance.sendResources();
      }
    }

    return instance;
  }

  /**
   * Browser environment initializer
   */
  static bl(): BrowserLoggerInstance | undefined {
    const win = window as WindowWithLogger;
    
    if (win[INIT_FLAG]) {
      return win[STORAGE_KEY] as BrowserLoggerInstance;
    }

    let config: BrowserLoggerConfig = {};
    let pipe: unknown[] = [];

    const existingInstance = win[STORAGE_KEY] as { config?: BrowserLoggerConfig; pipe?: unknown[] } | undefined;
    if (existingInstance) {
      config = existingInstance.config ?? {};
      pipe = existingInstance.pipe ?? [];
    }

    return initializeBrowserLogger(config, pipe);
  }
}

function initializeBrowserLogger(config: BrowserLoggerConfig, pipe: unknown[]): BrowserLoggerInstance {
  const win = window as WindowWithLogger;
  const instance = new BrowserLogger(config);
  
  win[STORAGE_KEY] = instance;
  instance.sendPipe(pipe);

  const conf = instance._conf;

  if (conf.autoSendPv !== false) {
    instance.sendPV();
  }

  if (!conf.useFmp) {
    instance.sendPerformance();
  }

  if (conf.sendResource) {
    instance.sendResources();
  }

  win[INIT_FLAG] = true;

  return instance;
}

if (typeof window === 'object' && window.navigator) {
  const win = window as WindowWithLogger;
  win.BrowserLogger = BrowserLogger;
  
  if (win[STORAGE_KEY] && !win[INIT_FLAG]) {
    BrowserLogger.bl();
  }
}

export default BrowserLogger;