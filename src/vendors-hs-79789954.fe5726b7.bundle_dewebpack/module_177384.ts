type ConsoleMethod = 'log' | 'info' | 'warn' | 'error' | 'table' | 'group' | 'groupEnd' | 'time' | 'timeEnd';

interface HSAppConfig {
  ENV?: string;
}

interface HSApp {
  Config?: HSAppConfig;
}

interface GlobalWithHSApp {
  HSApp?: HSApp;
}

export default class Logger {
  static canOutput(): boolean {
    const env = (globalThis as GlobalWithHSApp).HSApp?.Config?.ENV;
    const isNodeEnvironment = 
      typeof process !== 'undefined' && 
      process.versions != null && 
      process.versions.node != null;
    
    return env != null && env !== 'prod' && !isNodeEnvironment;
  }

  private static _log(method: ConsoleMethod, args: unknown[]): void {
    const consoleMethod = console[method];
    
    if (consoleMethod && Logger.canOutput()) {
      consoleMethod(...args);
    }
  }

  static log(...args: unknown[]): void {
    this._log('log', args);
  }

  static info(...args: unknown[]): void {
    this._log('info', args);
  }

  static warn(...args: unknown[]): void {
    this._log('warn', args);
  }

  static error(...args: unknown[]): void {
    this._log('error', args);
  }

  static table(...args: unknown[]): void {
    this._log('table', args);
  }

  static group(...args: unknown[]): void {
    this._log('group', args);
  }

  static groupEnd(...args: unknown[]): void {
    this._log('groupEnd', args);
  }

  static time(...args: unknown[]): void {
    this._log('time', args);
  }

  static timeEnd(...args: unknown[]): void {
    this._log('timeEnd', args);
  }
}