import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface ErrorData {
  errorName: string;
  errorStack?: string;
  description?: string;
  group?: string;
  params?: Record<string, unknown>;
}

interface SignalErrorEvent {
  data: ErrorData;
}

interface LogEntry {
  name: string;
  params?: Record<string, unknown>;
  sendNow?: boolean;
  currentTime?: number;
  performanceCurrentTime?: number;
}

class CustomErrorHandler extends HSCore.Component {
  public signalError: HSCore.Util.Signal<SignalErrorEvent>;

  constructor(element: HTMLElement) {
    super(element, {});
    
    this.signalError = new HSCore.Util.Signal<SignalErrorEvent>(this);
    this.signalError.listen(this.signalErrorListen, this);
  }

  private signalErrorListen(event: SignalErrorEvent): void {
    const errorData = event.data;
    
    if (!errorData) {
      return;
    }

    if (!errorData.group) {
      errorData.group = 'customizeError';
    }

    const logParams = {
      errorStack: errorData.errorStack,
      ...(errorData.params || {}),
      description: errorData.description
    };

    HSApp.Logger.errorLogger.push(errorData.errorName, logParams, {
      sendNow: true
    });
  }

  public pushLog(logEntries: LogEntry[] | undefined): void {
    if (!logEntries) {
      return;
    }

    logEntries.forEach((entry) => {
      if (!entry.params) {
        entry.params = {
          description: '需要添加描述'
        };
      }

      HSApp.Logger.errorLogger.push(
        entry.name,
        {
          group: 'customizeError',
          ...entry.params
        },
        {
          sendNow: entry.sendNow,
          currentTime: entry.currentTime,
          performanceCurrentTime: entry.performanceCurrentTime
        }
      );
    });
  }
}

export default CustomErrorHandler;