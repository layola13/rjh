interface App {
  // Define based on your HSApp structure
  [key: string]: unknown;
}

interface ActiveEvent {
  app: App;
}

class UserTrackLoggerEvent {
  constructor(app: App) {
    // Implementation
  }
}

class ErrorLoggerEvent {
  constructor(app: App) {
    // Implementation
  }

  signalError(error: unknown): void {
    // Implementation
  }
}

class PerformanceLoggerEvent {
  constructor(app: App) {
    // Implementation
  }
}

abstract class IPlugin {
  onActive?(event: ActiveEvent): void;
}

class LoggerPlugin extends IPlugin {
  private userTrackLoggerEvent?: UserTrackLoggerEvent;
  private ErrorLoggerEvent?: ErrorLoggerEvent;
  private signalError?: (error: unknown) => void;
  private PerformanceLoggerEvent?: PerformanceLoggerEvent;

  constructor(...args: unknown[]) {
    super();
    this.userTrackLoggerEvent = undefined;
    this.ErrorLoggerEvent = undefined;
    this.signalError = undefined;
    this.PerformanceLoggerEvent = undefined;
  }

  onActive(event: ActiveEvent): void {
    super.onActive?.(event);

    const { app } = event;

    this.userTrackLoggerEvent = new UserTrackLoggerEvent(app);
    this.ErrorLoggerEvent = new ErrorLoggerEvent(app);
    this.PerformanceLoggerEvent = new PerformanceLoggerEvent(app);
    this.signalError = this.ErrorLoggerEvent.signalError.bind(this.ErrorLoggerEvent);
  }
}

declare const HSApp: {
  Plugin: {
    IPlugin: typeof IPlugin;
    registerPlugin(name: string, plugin: typeof LoggerPlugin): void;
  };
};

HSApp.Plugin.registerPlugin("hsw.plugin.logger.Plugin", LoggerPlugin);