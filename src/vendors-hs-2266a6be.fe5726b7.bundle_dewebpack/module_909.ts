import defaultCollecters from './defaultCollecters';

interface CollecterConfig {
  [key: string]: CollecterConstructor | CollecterFunction | false | CollecterConfigItem;
}

interface CollecterConfigItem {
  getter?: GetterFunction;
  [key: string]: unknown;
}

type GetterFunction = (target: unknown, event: unknown, context?: unknown) => Record<string, unknown>;

type CollecterFunction = (target: unknown, event: unknown, context?: unknown) => Record<string, unknown>;

interface CollecterConstructor {
  new (target: unknown, config?: unknown): CollecterInstance;
  dataExtend?: boolean;
}

interface CollecterInstance {
  isCollecter?: boolean;
  dataExtend?: boolean;
  getLogParams?: (target: unknown, event: unknown) => Record<string, unknown>;
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
      const configItem = config[key];
      
      if (typeof configItem === 'object' && configItem && 'getter' in configItem) {
        const getter = configItem.getter;
        if (getter) {
          this.getterMap.set(key, getter);
        }
      }
    }
  }

  private initCollecter(target: unknown, config: CollecterConfig): void {
    this.collecterMap = new Map();
    
    const mergedCollecters: Record<string, CollecterConstructor | CollecterFunction> = {
      ...defaultCollecters
    };

    for (const key in config) {
      const configItem = config[key];
      
      if (configItem === false) {
        delete mergedCollecters[key];
      } else if (configItem instanceof Function) {
        mergedCollecters[key] = configItem;
      }
    }

    for (const key in mergedCollecters) {
      let collecter = mergedCollecters[key];
      
      if ('prototype' in collecter && collecter.prototype?.isCollecter) {
        const CollecterClass = collecter as CollecterConstructor;
        collecter = new CollecterClass(target, config[key]);
      }
      
      this.collecterMap.set(key, collecter);
    }
  }

  registerCollecter(name: string, collecter: CollecterInstance | CollecterFunction): void {
    this.collecterMap.set(name, collecter);
  }

  getLogParams(target: unknown, event: unknown, context?: unknown): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    this.collecterMap.forEach((collecter, key) => {
      let logParams: Record<string, unknown>;
      
      if (typeof collecter === 'function') {
        logParams = collecter(target, event, context);
      } else {
        logParams = collecter.getLogParams 
          ? collecter.getLogParams(target, event)
          : {};
      }

      let getter = this.getterMap.get(key);
      
      if (getter instanceof Function) {
        getter = getter(target, event, context);
      }
      
      if (getter) {
        logParams = {
          ...logParams,
          ...getter
        };
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

export function createLogParamsCollecter(target: unknown, options?: LogParamsCollecterOptions): LogParamsCollecter {
  return new LogParamsCollecter(target, options);
}