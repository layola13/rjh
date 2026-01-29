import { UseDependOtherLogger } from './906';
import { LoggerName } from './914';
import { copyObject } from './63';

interface ErrorLoggerOptions {
  enable?: boolean;
  dependKey?: string;
  sendNow?: boolean;
}

interface ErrorInfo {
  message?: string;
  filename?: string;
  error?: Error;
  lineno?: number;
  colno?: number;
  domPath?: string;
  src?: string;
  name?: string;
}

interface ErrorData {
  errorStack?: Error | string | ErrorStackObject;
  errorInfo?: ErrorInfo;
  group?: string;
  description?: string;
  type?: string;
}

interface ErrorStackObject {
  error: {
    name: string;
    message: string;
    stack?: string;
  };
}

interface PushOptions {
  sendNow?: boolean;
}

interface ResourceErrorInfo {
  id?: string;
  errorInfo?: ErrorInfo;
}

export class ErrorLogger extends UseDependOtherLogger {
  private unhandledrejection: (event: PromiseRejectionEvent) => void;
  private onerror: (event: ErrorEvent) => void;

  constructor(options: ErrorLoggerOptions) {
    options.dependKey = "beforeUserTracks";
    super(LoggerName.ErrorLogger, options);

    this.unhandledrejection = this.withEnable(this.handleUnhandledRejection, this);
    this.onerror = this.withEnable(this.handleError, this);

    window.addEventListener("unhandledrejection", this.unhandledrejection);
    window.addEventListener("error", this.onerror, true);
  }

  private withEnable<T extends (...args: unknown[]) => unknown>(
    fn: T,
    context: this
  ): T {
    return ((...args: unknown[]) => {
      const ctx = context || this;
      if (ctx.enable) {
        return fn.call(ctx, ...args);
      }
    }) as T;
  }

  unload(): void {
    window.removeEventListener("unhandledrejection", this.unhandledrejection);
    window.removeEventListener("error", this.onerror, true);
  }

  push(eventId: string, data?: ErrorData, options?: PushOptions): unknown {
    const errorData = data || {};
    
    if (errorData.errorStack instanceof Error && !errorData.type) {
      errorData.type = errorData.errorStack.name;
    }

    let id = eventId;
    if (!id && typeof errorData.errorStack === "string") {
      id = this.getIDFromErrorMessage(errorData.errorStack) || "";
    }

    if (!id && errorData.errorStack instanceof Error) {
      id = this.getIDFromErrorMessage(errorData.errorStack.message) || "";
    }

    errorData.errorStack = this.handleErrorStack(errorData.errorStack);

    const pushOptions = options || {};
    pushOptions.sendNow = pushOptions.sendNow === undefined || pushOptions.sendNow;

    return super.push(id, errorData, pushOptions);
  }

  private handleError(event: ErrorEvent): void {
    if (!event || this.excludeError(event)) {
      return;
    }

    const errorInfo = copyObject(event, ["message", "filename", "error", "lineno", "colno"]) || {};
    const errorMessage = event.error?.message || event.message;
    let errorId = this.getIDFromErrorMessage(errorMessage);

    if (!errorId) {
      const resourceError = this.getResourcesErrorInfo(event);
      errorId = resourceError?.id;
      Object.assign(errorInfo, resourceError?.errorInfo);
    }

    if (errorId) {
      let errorStack: Error | undefined;
      if (event.error instanceof Error) {
        errorStack = event.error;
      }

      this.push(errorId, {
        errorStack,
        errorInfo,
        group: "onError",
        description: "系统错误"
      }, {});
    }
  }

  private excludeError(event: ErrorEvent): boolean {
    return !!(event.filename?.includes?.("chrome-extension://"));
  }

  private getResourcesErrorInfo(event: ErrorEvent): ResourceErrorInfo {
    const target = event.target as HTMLElement;
    
    if (
      target &&
      (target instanceof HTMLImageElement ||
        target instanceof HTMLScriptElement ||
        target instanceof HTMLIFrameElement) &&
      (target as HTMLImageElement | HTMLScriptElement | HTMLIFrameElement).src &&
      (target as HTMLImageElement | HTMLScriptElement | HTMLIFrameElement).src !== window.location?.href
    ) {
      return {
        id: this.getIDFromErrorMessage("资源加载错误"),
        errorInfo: {
          domPath: this.computeParentPath(target),
          ...copyObject(target, ["src"])
        }
      };
    }

    return {};
  }

  private computeParentPath(element: HTMLElement, maxDepth: number = 5): string {
    const buildSelector = (el: HTMLElement): string => {
      const className = el.className;
      const classSelector = className
        ? className.split(" ")
            .filter(c => !!c)
            .map(c => `.${c}`)
            .join("")
        : "";
      const idSelector = el.id ? `#${el.id}` : "";
      return `${el.tagName.toLocaleLowerCase()}${classSelector}${idSelector}`;
    };

    let path = buildSelector(element);
    let currentElement = element;
    let depth = 0;

    while (currentElement.parentElement && depth < maxDepth) {
      depth++;
      currentElement = currentElement.parentElement;
      path = `${path} < ${buildSelector(currentElement)}`;
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
        message: "未处理的事件reject",
        name: event.reason.type
      };
    } else {
      const reasonString = event.reason ? JSON.stringify(event.reason) : "reject未返回相关信息";
      errorInfo = { message: reasonString };
      
      if (reasonString !== "{}") {
        errorId = this.getIDFromErrorMessage(reasonString);
      }
    }

    errorId = errorId || "unhandledrejection";

    const data: ErrorData = {
      description: "未处理的reject",
      errorStack,
      errorInfo,
      group: "unhandledrejection"
    };

    this.push(errorId, data, {});
  }

  private handleErrorStack(stack: Error | string | ErrorStackObject | undefined): ErrorStackObject | Error | string | undefined {
    if (!stack) {
      return stack;
    }

    if (stack instanceof Error) {
      return this.convertErrorToObject(stack);
    }

    if (typeof stack === "string") {
      const error = new Error();
      error.stack = stack;
      return this.convertErrorToObject(error);
    }

    return stack;
  }

  private convertErrorToObject(error: Error): ErrorStackObject {
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

    const MAX_ID_LENGTH = 200;
    let newlineIndex = message.indexOf("\n");
    
    if (newlineIndex === -1 || newlineIndex > MAX_ID_LENGTH) {
      newlineIndex = MAX_ID_LENGTH;
    }

    return message.substring(0, newlineIndex);
  }
}