import defaultCollecters from './defaultCollecters';

interface CollecterConfig {
  [key: string]: CollecterConstructor | CollecterFunction | false | CollecterOptions;
}

interface CollecterOptions {
  getter?: GetterFunction;
  [key: string]: unknown;
}

interface GetterFunction {
  (event: unknown, context: unknown, options: unknown): Record<string, unknown>;
}

interface CollecterFunction {
  (event: unknown, context: unknown, options: unknown): Record<string, unknown>;
}

interface CollecterConstructor {
  new (target: unknown, config: CollecterOptions): CollecterInstance;
  dataExtend?: boolean;
  prototype: {
    isCollecter?: boolean;
  };
}

interface CollecterInstance {
  getLogParams?: (event: unknown, context: unknown) => Record<string, unknown>;
  dataExtend?: boolean;
  constructor: {
    dataExtend?: boolean;
  };
}

interface LogParamsCollecterOptions {
  collecterConfig?: CollecterConfig;
}

export class LogParamsCollecter {
  private getterMap: Map<string, GetterFunction>;
  private collecterMap: Map<string, CollecterInstance | CollecterFunction>;

  constructor(target: unknown, options?: LogParamsCollecterOptions) {
    const config = options?.collecterConfig ?? {};
    this.getterMap = new Map();
    this.collecterMap = new Map();
    this.initGetter(config);
    this.initCollecter(target, config);
  }

  private initGetter(config: CollecterConfig): void {
    this.getterMap = new Map();
    for (const key in config) {
      const value = config[key];
      if (typeof value === 'object' && value && 'getter' in value && value.getter) {
        this.getterMap.set(key, value.getter);
      }
    }
  }

  private initCollecter(target: unknown, config: CollecterConfig): void {
    this.collecterMap = new Map();
    const collecters: Record<string, CollecterConstructor | CollecterFunction> = { ...defaultCollecters };

    for (const key in config) {
      const configValue = config[key];
      if (configValue === false) {
        delete collecters[key];
      } else if (typeof configValue === 'function') {
        collecters[key] = configValue;
      }
    }

    for (const key in collecters) {
      let collecter = collecters[key];
      if ('prototype' in collecter && collecter.prototype?.isCollecter) {
        collecter = new collecter(target, config[key] as CollecterOptions);
      }
      this.collecterMap.set(key, collecter as CollecterInstance | CollecterFunction);
    }
  }

  registerCollecter(name: string, collecter: CollecterInstance | CollecterFunction): void {
    this.collecterMap.set(name, collecter);
  }

  getLogParams(event: unknown, context: unknown, options: unknown): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    this.collecterMap.forEach((collecter, key) => {
      let logParams: Record<string, unknown>;
      
      if (typeof collecter === 'function') {
        logParams = collecter(event, context, options);
      } else {
        logParams = collecter.getLogParams 
          ? collecter.getLogParams(event, context) 
          : {};
      }

      let getterResult = this.getterMap.get(key);
      if (typeof getterResult === 'function') {
        getterResult = getterResult(event, context, options);
      }
      
      if (getterResult) {
        logParams = { ...logParams, ...getterResult };
      }

      const shouldExtend = typeof collecter === 'object' && 
        (collecter.dataExtend || collecter.constructor.dataExtend);

      if (shouldExtend) {
        Object.assign(result, logParams);
      } else {
        result[key] = logParams;
      }
    });

    return result;
  }
}

export function createLogParamsCollecter(
  target: unknown, 
  options?: LogParamsCollecterOptions
): LogParamsCollecter {
  return new LogParamsCollecter(target, options);
}