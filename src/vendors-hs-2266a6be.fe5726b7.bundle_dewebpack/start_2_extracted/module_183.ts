import { createLogParamsCollecter } from './module_909';
import LogSender from './module_946';
import defaultConfig from './module_371';
import EventEmitter from './module_704';
import validator from './module_761';
import initializer from './module_285';

export enum LoggerEventEmitter {
  logBeforeCollect = 'log-before-collect',
  logCollected = 'log-collected',
  logValidated = 'log-validated',
  logBeforePushSend = 'log-before-push-send',
  logPushed = 'log-pushed'
}

interface LogParamsCollecterOptions {
  [key: string]: unknown;
}

interface LogSenderOptions {
  [key: string]: unknown;
}

interface ValidationRule {
  [key: string]: unknown;
}

interface LoggerOptions {
  logParamsCollecterOptions: LogParamsCollecterOptions;
  logSenderOptions: LogSenderOptions;
  validation?: ValidationRule[];
  customizedName?: string;
  enable?: boolean;
}

interface PushOptions {
  sendNow?: boolean;
  validation?: ValidationRule[];
  notSend?: boolean;
  [key: string]: unknown;
}

interface LogParams {
  [key: string]: unknown;
}

interface LogEventPayload {
  logger: Logger;
  id: string;
  params: LogParams;
  options: PushOptions;
}

interface LogParamsCollecter {
  getLogParams(id: string, params: LogParams, options: PushOptions): LogParams;
}

export class Logger extends EventEmitter {
  public name: string;
  public enable: boolean;
  private logParamsCollecter: LogParamsCollecter;
  private logSender: LogSender;
  private baseValidation: ValidationRule[];
  private customizedName: string;
  private lastTrackLog?: LogParams;

  constructor(name: string, options: LoggerOptions) {
    super();
    
    this.name = name;
    this.logParamsCollecter = createLogParamsCollecter(name, options.logParamsCollecterOptions);
    
    if (!options.logSenderOptions) {
      throw new Error('logSenderOptions cannot be empty');
    }
    
    this.baseValidation = options.validation ?? [];
    this.customizedName = options.customizedName ?? defaultConfig.customizedName;
    this.logSender = new LogSender(name, options.logSenderOptions);
    
    initializer.loggerInit({
      name,
      options,
      logger: this
    });
    
    this.enable = options.enable ?? true;
  }

  public push(id: string, params: LogParams = {}, options: PushOptions = {}): LogParams | undefined {
    if (!this.enable) {
      return undefined;
    }

    let sanitizedParams = params;
    try {
      sanitizedParams = JSON.parse(JSON.stringify(params));
    } catch (error) {
      sanitizedParams = {};
    }

    this.lastTrackLog = this.collectAndPushSend(id, sanitizedParams, options);
    return this.lastTrackLog;
  }

  private collectAndPushSend(id: string, params: LogParams, options: PushOptions): LogParams {
    const sendNow = options.sendNow ?? false;
    const validation = options.validation ?? [];

    this.emit(LoggerEventEmitter.logBeforeCollect, {
      logger: this,
      id,
      params,
      options
    } as LogEventPayload);

    let logParams: LogParams = {
      ...this.logParamsCollecter.getLogParams(id, params, options)
    };
    
    logParams[this.customizedName] = params;

    this.emit(LoggerEventEmitter.logCollected, {
      logger: this,
      id,
      params: logParams,
      options
    } as LogEventPayload);

    validator.validate([...validation, ...this.baseValidation], logParams);

    this.emit(LoggerEventEmitter.logValidated, {
      logger: this,
      id,
      params: logParams,
      options
    } as LogEventPayload);

    if (!options.notSend) {
      this.emit(LoggerEventEmitter.logBeforePushSend, {
        logger: this,
        id,
        params: logParams,
        options
      } as LogEventPayload);

      logParams = JSON.parse(JSON.stringify(logParams));
      this.logSender.push(logParams, sendNow);
    }

    this.emit(LoggerEventEmitter.logPushed, {
      logger: this,
      id,
      params: logParams,
      options
    } as LogEventPayload);

    return logParams;
  }

  public send(): void {
    this.logSender.send();
  }

  public pauseSend(): void {
    this.logSender.pause();
  }

  public startSend(): void {
    this.logSender.start();
  }

  public setEnableStatus(status: boolean): void {
    this.enable = status;
  }

  public getEnableStatus(): boolean {
    return this.enable;
  }

  public getLastTrackLog(): LogParams | undefined {
    return this.lastTrackLog;
  }
}