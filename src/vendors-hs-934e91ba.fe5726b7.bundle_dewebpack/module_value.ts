interface LoggerOptions {
  prefix?: string;
  debug?: boolean;
}

class ModuleValue {
  prefix: string;
  logger: unknown;
  options: LoggerOptions;
  debug: boolean | undefined;

  constructor(logger: unknown, options: LoggerOptions = {}) {
    this.prefix = options.prefix || "i18next:";
    this.logger = logger;
    this.options = options;
    this.debug = options.debug;
  }
}