import { createLogParamsCollecter } from './909';
import LogSender from './946';
import defaultConfig from './371';
import EventEmitter from './704';
import validator from './761';
import hooks from './285';

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
  logParamsCollecterOptions?: LogParamsCollecterOptions;
  logSenderOptions: LogSenderOptions;
  validation?: ValidationRule[];
  customizedName?: string;
  enable?: boolean;
}

interface LogParams {
  [key: string]: unknown;
}

interface PushOptions {
  sendNow?: boolean;
  validation?: ValidationRule[];
  notSend?: boolean;
  [key: string]: unknown;
}

interface LogEvent {
  logger: Logger;
  id: string;
  params: LogParams;
  options: PushOptions;
}

export class Logger extends EventEmitter {
  private name: string;
  private logParamsCollecter: ReturnType<typeof createLogParamsCollecter>;
  private baseValidation: ValidationRule[];
  private customizedName: string;
  private logSender: LogSender;
  private enable: boolean;
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
    
    hooks.loggerInit({
      name,
      options,
      logger: this
    });
    
    this.enable = options.enable ?? true;
  }

  push(id: string, params: LogParams = {}, options: PushOptions = {}): LogParams {
    if (!this.enable) {
      return {};
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
    } as LogEvent);

    let collectedParams: LogParams = {
      ...this.logParamsCollecter.getLogParams(id, params, options)
    };
    
    collectedParams[this.customizedName] = params;

    this.emit(LoggerEventEmitter.logCollected, {
      logger: this,
      id,
      params: collectedParams,
      options
    } as LogEvent);

    validator.validate([...validation, ...this.baseValidation], collectedParams);

    this.emit(LoggerEventEmitter.logValidated, {
      logger: this,
      id,
      params: collectedParams,
      options
    } as LogEvent);

    if (!options.notSend) {
      this.emit(LoggerEventEmitter.logBeforePushSend, {
        logger: this,
        id,
        params: collectedParams,
        options
      } as LogEvent);

      collectedParams = JSON.parse(JSON.stringify(collectedParams));
      this.logSender.push(collectedParams, sendNow);
    }

    this.emit(LoggerEventEmitter.logPushed, {
      logger: this,
      id,
      params: collectedParams,
      options
    } as LogEvent);

    return collectedParams;
  }

  send(): void {
    this.logSender.send();
  }

  pauseSend(): void {
    this.logSender.pause();
  }

  startSend(): void {
    this.logSender.start();
  }

  setEnableStatus(enabled: boolean): void {
    this.enable = enabled;
  }

  getEnableStatus(): boolean {
    return this.enable;
  }

  getLastTrackLog(): LogParams | undefined {
    return this.lastTrackLog;
  }
}