import { UseDependOtherLogger } from './UseDependOtherLogger';
import { LoggerName } from './LoggerName';
import { copyObject } from './utils';

interface ErrorLoggerOptions {
  dependKey?: string;
  enable?: boolean;
  [key: string]: unknown;
}

interface ErrorInfo {
  message?: string;
  filename?: string;
  error?: Error;
  lineno?: number;
  colno?: number;
  domPath?: string;
  src?: string;
  [key: string]: unknown;
}

interface ErrorData {
  errorStack?: Error | string | { error: { name: string; message: string; stack?: string } };
  errorInfo?: ErrorInfo;
  group?: string;
  description?: string;
  type?: string;
}

interface PushOptions {
  sendNow?: boolean;
  [key: string]: unknown;
}

interface ResourceErrorInfo {
  id: string;
  errorInfo: ErrorInfo;
}

export class ErrorLogger extends UseDependOtherLogger {
  private unhandledrejection: (event: PromiseRejectionEvent) => void;
  private onerror: (event: ErrorEvent) => void;

  constructor(options: ErrorLoggerOptions) {
    options.dependKey = 'beforeUserTracks';
    super(LoggerName.ErrorLogger, options);

    this.unhandledrejection = this.withEnable(this.handleUnhandledRejection, this);
    this.onerror = this.withEnable(this.handleError, this);

    window.addEventListener('unhandledrejection', this.unhandledrejection);
    window.addEventListener('error', this.onerror, true);
  }

  private withEnable<T extends (...args: unknown[]) => unknown>(
    fn: T,
    context: this
  ): (...args: Parameters<T>) => ReturnType<T> | undefined {
    return (...args: Parameters<T>): ReturnType<T> | undefined => {
      const self = context || this;
      if (self.enable) {
        return fn.call(self, ...args) as ReturnType<T>;
      }
      return undefined;
    };
  }

  public unload(): void {
    window.removeEventListener('unhandledrejection', this.unhandledrejection);
    window.removeEventListener('error', this.onerror, true);
  }

  public push(errorId: string, data?: ErrorData, options?: PushOptions): unknown {
    const errorData = data || {};

    if (errorData.errorStack instanceof Error && !errorData.type) {
      errorData.type = errorData.errorStack.name;
    }

    if (!errorId && typeof errorData.errorStack === 'string') {
      errorId = this.getIDFromErrorMessage(errorData.errorStack) || '';
    }

    if (!errorId && errorData.errorStack instanceof Error) {
      errorId = this.getIDFromErrorMessage(errorData.errorStack.message) || '';
    }

    errorData.errorStack = this.handleErrorStack(errorData.errorStack);

    const pushOptions = options || {};
    pushOptions.sendNow = pushOptions.sendNow === undefined || pushOptions.sendNow;

    return super.push(errorId, errorData, pushOptions);
  }

  private handleError(event: ErrorEvent): void {
    if (!event || this.excludeError(event)) {
      return;
    }

    const errorInfo: ErrorInfo = copyObject(event, ['message', 'filename', 'error', 'lineno', 'colno']) || {};
    const errorMessage = event.error?.message || event.message;
    let errorId = this.getIDFromErrorMessage(errorMessage);

    if (!errorId) {
      const resourceErrorInfo = this.getResourcesErrorInfo(event);
      errorId = resourceErrorInfo?.id;
      Object.assign(errorInfo, resourceErrorInfo?.errorInfo);
    }

    if (errorId) {
      let errorStack: Error | undefined;
      if (event.error instanceof Error) {
        errorStack = event.error;
      }

      this.push(errorId, {
        errorStack,
        errorInfo,
        group: 'onError',
        description: '系统错误'
      }, {});
    }
  }

  private excludeError(event: ErrorEvent): boolean {
    return !!(event.filename?.includes?.('chrome-extension://'));
  }

  private getResourcesErrorInfo(event: ErrorEvent): ResourceErrorInfo | Record<string, never> {
    const target = event.target;

    if (
      target &&
      (target instanceof HTMLImageElement ||
        target instanceof HTMLScriptElement ||
        target instanceof HTMLIFrameElement) &&
      target.src &&
      target.src !== window?.location?.href
    ) {
      return {
        id: this.getIDFromErrorMessage('资源加载错误')!,
        errorInfo: {
          domPath: this.computerParentPath(target),
          ...copyObject(target, ['src'])
        }
      };
    }

    return {};
  }

  private computerParentPath(element: HTMLElement, maxDepth: number = 5): string {
    const getElementPath = (el: HTMLElement): string => {
      const className = el.className;
      const classStr = className
        ? className
            .split(' ')
            .filter(cls => !!cls)
            .map(cls => `.${cls}`)
            .join('')
        : '';
      const idStr = el.id ? `#${el.id}` : '';
      return `${el.tagName.toLocaleLowerCase()}${classStr}${idStr}`;
    };

    let path = getElementPath(element);
    let depth = 0;
    let currentElement = element;

    while (currentElement.parentElement && depth < maxDepth) {
      depth++;
      currentElement = currentElement.parentElement;
      path = `${path} < ${getElementPath(currentElement)}`;
    }

    return path;
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    let errorStack: Error | undefined;
    let errorInfo: ErrorInfo | undefined;
    let errorId: string | undefined;

    if (event.reason instanceof Error) {
      errorStack = event.reason;
      errorId = this.getIDFromErrorMessage(event.reason.message);
    } else if (event.reason instanceof Event) {
      errorInfo = {
        message: '未处理的事件reject',
        name: event.reason.type
      };
    } else {
      const reasonStr = event.reason ? JSON.stringify(event.reason) : 'reject未返回相关信息';
      errorInfo = {
        message: reasonStr
      };
      if (reasonStr !== '{}') {
        errorId = this.getIDFromErrorMessage(reasonStr);
      }
    }

    errorId = errorId || 'unhandledrejection';

    const data: ErrorData = {
      description: '未处理的reject',
      errorStack,
      errorInfo,
      group: 'unhandledrejection'
    };

    this.push(errorId, data, {});
  }

  private handleErrorStack(
    stack: Error | string | unknown
  ): { error: { name: string; message: string; stack?: string } } | unknown {
    if (!stack) {
      return stack;
    }

    if (stack instanceof Error) {
      return this.formatError(stack);
    }

    if (typeof stack === 'string') {
      const error = new Error();
      error.stack = stack;
      return this.formatError(error);
    }

    return stack;
  }

  private formatError(error: Error): { error: { name: string; message: string; stack?: string } } {
    return {
      error: {
        name: error.name,
        message: error.message || error.toString(),
        stack: error.stack
      }
    };
  }

  private getIDFromErrorMessage(message: string | undefined): string | undefined {
    if (!message) {
      return undefined;
    }

    const MAX_LENGTH = 200;
    let newlineIndex = message.indexOf('\n');

    if (newlineIndex === -1 || newlineIndex > MAX_LENGTH) {
      newlineIndex = MAX_LENGTH;
    }

    return message.substring(0, newlineIndex);
  }
}