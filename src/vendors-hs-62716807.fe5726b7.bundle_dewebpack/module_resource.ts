interface ResourceData {
  begin?: number;
  dom?: string;
  load?: string;
  res?: unknown[];
  dl?: string;
}

interface LogOptions {
  [key: string]: unknown;
}

class ResourceModule {
  private _lg(type: string, data: Record<string, string | number>, options?: LogOptions): this {
    // Implementation placeholder
    return this;
  }

  public logResource(data: unknown, options?: LogOptions): this {
    const logger = {
      warn: (message: string): void => {
        console.warn(message);
      },
      isPlainObject: (value: unknown): value is Record<string, unknown> => {
        return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;
      },
      isArray: (value: unknown): value is unknown[] => {
        return Array.isArray(value);
      }
    };

    if (!data || !logger.isPlainObject(data)) {
      logger.warn(`[arms] invalid param data: ${data}`);
      return this;
    }

    const dataKeys = Object.keys(data);
    const requiredFields: ReadonlyArray<keyof ResourceData> = ['begin', 'dom', 'load', 'res', 'dl'];
    
    let hasRequiredFields = true;
    for (const field of requiredFields) {
      if (dataKeys.indexOf(field) < 0) {
        hasRequiredFields = false;
        break;
      }
    }

    if (!hasRequiredFields) {
      logger.warn(`[arms] lack param data: ${data}`);
      return this;
    }

    const resourceData = data as ResourceData;
    const logData: Record<string, string | number> = {
      begin: resourceData.begin ?? Date.now(),
      dom: resourceData.dom ?? '',
      load: resourceData.load ?? '',
      res: logger.isArray(resourceData.res) ? JSON.stringify(resourceData.res) : JSON.stringify([]),
      dl: resourceData.dl ?? ''
    };

    return this._lg('res', logData, options);
  }
}