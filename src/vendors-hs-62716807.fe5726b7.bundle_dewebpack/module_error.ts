interface ErrorOptions {
  message?: string;
  error?: Error | ErrorObject;
  name?: string;
  stack?: string;
  msg?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  tag?: string;
  c1?: string;
  c2?: string;
  c3?: string;
}

interface ErrorObject {
  name?: string;
  message?: string;
  stack?: string;
  msg?: string;
}

interface ErrorPayload {
  begin: number;
  cate: string;
  msg: string;
  stack: string;
  file: string;
  line: number | string;
  col: number | string;
  err: {
    msg_raw: string;
    stack_raw: string;
  };
  dl: string;
  tag?: string;
  c1?: string;
  c2?: string;
  c3?: string;
}

interface SelfErrorPayload {
  msg: string;
  err: {
    msg_raw: string;
  };
}

interface IgnoreConfig {
  ignoreErrors?: RegExp[];
}

interface RetcodeUtils {
  warn(message: string): void;
  checkSDKError(message: string, filename?: string): boolean;
  ignoreByRule(value: string, rule: RegExp | RegExp[]): boolean;
  decode(value: string): string;
  encode(value: string): string;
  removeUrlSearch(url: string): string;
  selfErrKey: string;
}

interface RetcodeInstance {
  getConfig(key: string): unknown;
  beforeSend?: (type: string, payload: ErrorPayload | SelfErrorPayload) => void;
  _self(type: string, payload: SelfErrorPayload, level: number): RetcodeInstance;
  _lg(type: string, payload: ErrorPayload, level: number): RetcodeInstance;
}

const MAX_MESSAGE_LENGTH = 1000;
const MAX_URL_LENGTH = 500;

function reportError(
  this: RetcodeInstance,
  errorInput: string | ErrorOptions | Error,
  options?: ErrorOptions
): RetcodeInstance {
  const r: RetcodeUtils = (globalThis as any).retcodeUtils;

  if (!errorInput) {
    r.warn(`[retcode] invalid param e: ${errorInput}`);
    return this;
  }

  let errorData: ErrorObject | Error;
  let errorOptions: ErrorOptions;

  if (arguments.length === 1) {
    if (typeof errorInput === 'string') {
      errorData = { message: errorInput };
      errorOptions = {};
    } else if (typeof errorInput === 'object') {
      errorOptions = errorInput;
      errorData = (errorInput as ErrorOptions).error ?? errorInput;
    } else {
      errorData = {};
      errorOptions = {};
    }
  } else {
    if (typeof errorInput === 'string') {
      errorData = { message: errorInput };
    } else {
      errorData = errorInput as ErrorObject;
    }
    errorOptions = typeof options === 'object' ? options : {};
  }

  const errorName = (errorData as ErrorObject).name ?? 'CustomError';
  const errorMessage = (errorData as ErrorObject).message ?? '';
  const errorStack = (errorData as ErrorObject).stack ?? '';
  const finalOptions = errorOptions ?? {};

  const currentUrl =
    typeof location === 'object' &&
    typeof location.href === 'string'
      ? location.href.substring(0, MAX_URL_LENGTH)
      : '';

  if (r.checkSDKError(errorMessage, finalOptions.filename)) {
    const scriptErrorPattern = /^Script error\.?$/;
    const rawMessage = (errorData as ErrorObject).msg ?? (errorData as ErrorObject).message ?? '';

    if (
      r.ignoreByRule(rawMessage, scriptErrorPattern) ||
      r.ignoreByRule(r.decode(rawMessage), scriptErrorPattern)
    ) {
      return this;
    }

    const selfErrorPayload: SelfErrorPayload = {
      msg: r.selfErrKey,
      err: {
        msg_raw: r.encode((errorData as ErrorObject).msg ?? (errorData as ErrorObject).message ?? '')
      }
    };

    return this._self('error', selfErrorPayload, 1);
  }

  const payload: ErrorPayload = {
    begin: Date.now(),
    cate: errorName,
    msg: errorMessage.substring(0, MAX_MESSAGE_LENGTH),
    stack: errorStack.substring(0, MAX_MESSAGE_LENGTH),
    file: r.removeUrlSearch(finalOptions.filename ?? ''),
    line: finalOptions.lineno ?? '',
    col: finalOptions.colno ?? '',
    err: {
      msg_raw: r.encode(errorMessage),
      stack_raw: r.encode(errorStack)
    },
    dl: currentUrl
  };

  const optionalFields: Array<keyof Pick<ErrorOptions, 'tag' | 'c1' | 'c2' | 'c3'>> = [
    'tag',
    'c1',
    'c2',
    'c3'
  ];

  for (const field of optionalFields) {
    if (finalOptions[field]) {
      payload[field] = finalOptions[field];
    }
  }

  const ignoreConfig = this.getConfig('ignore') as IgnoreConfig | undefined;
  const ignoreErrors = ignoreConfig?.ignoreErrors;

  if (
    r.ignoreByRule(payload.msg, ignoreErrors) ||
    r.ignoreByRule(r.decode(payload.msg), ignoreErrors)
  ) {
    return this;
  }

  this.beforeSend?.('error', payload);

  return this._lg('error', payload, 1);
}

export { reportError };