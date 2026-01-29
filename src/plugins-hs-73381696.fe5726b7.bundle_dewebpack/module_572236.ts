interface LogCollectorSignal {
  signalAddLog?: unknown;
}

interface AppContext {
  logCollector?: LogCollectorSignal;
}

interface ListenEventData {
  message?: string | Record<string, unknown>;
  category?: string;
  options?: CustomErrorOptions;
}

interface ListenEvent {
  data?: ListenEventData;
}

interface CustomErrorOptions {
  description?: string;
  errorInfo?: unknown;
  errorStack?: string;
}

interface ParsedMessage {
  category?: string;
  info?: string;
}

interface ErrorInfo {
  actionType: string;
  errorStack: string;
}

interface LogParams {
  description?: string;
  errorInfo?: unknown;
  errorStack?: string;
  group: string;
  type?: string;
}

interface LogEntry {
  name: string;
  params: LogParams;
}

interface LogListener {
  getListenSignal(context: AppContext): unknown;
  listen(event: ListenEvent): LogEntry[];
}

const EXCLUDED_CATEGORIES = ['DModel-Save', 'Performance'];
const CRASH_PREFIX = 'Application crash at:';
const MAX_DESCRIPTION_LENGTH = 200;
const ERROR_GROUP = 'customizeError';

function parseErrorMessage(message: string | Record<string, unknown>): ErrorInfo | null {
  let errorInfo: string;

  if (typeof message === 'string') {
    if (message.startsWith(CRASH_PREFIX)) {
      return null;
    }

    try {
      const parsed: ParsedMessage = JSON.parse(message);
      
      if (parsed.category && EXCLUDED_CATEGORIES.includes(parsed.category)) {
        return null;
      }

      errorInfo = parsed.info ?? message;
    } catch {
      errorInfo = message;
    }
  } else {
    errorInfo = (message as { info?: string }).info ?? JSON.stringify(message);
  }

  return {
    actionType: errorInfo.substring(0, MAX_DESCRIPTION_LENGTH),
    errorStack: errorInfo
  };
}

function createLogEntry(
  name: string,
  description: string | undefined,
  errorInfo: unknown,
  errorStack: string | undefined,
  category: string | undefined
): LogEntry {
  return {
    name,
    params: {
      description,
      errorInfo,
      errorStack,
      group: ERROR_GROUP,
      type: category
    }
  };
}

const logListener: LogListener = {
  getListenSignal(context: AppContext): unknown {
    return context?.logCollector?.signalAddLog;
  },

  listen(event: ListenEvent): LogEntry[] {
    const data = event.data ?? {};
    const { message, category, options } = data;

    if (options) {
      const name = options.description?.substring(0, MAX_DESCRIPTION_LENGTH) ?? '';
      return [
        createLogEntry(
          name,
          options.description,
          options.errorInfo,
          options.errorStack,
          category
        )
      ];
    }

    const parsedError = parseErrorMessage(message ?? '');
    const actionType = parsedError?.actionType ?? '';
    const errorStack = parsedError?.errorStack;

    return [
      createLogEntry(
        actionType,
        actionType,
        { category, message },
        errorStack,
        category
      )
    ];
  }
};

export default [logListener];