interface Command {
  type: string;
}

interface CommandStartedEventData {
  cmd?: Command;
}

interface CommandStartedEvent {
  data: CommandStartedEventData;
}

interface CommandManager {
  signalCommandStarted: unknown;
}

interface App {
  cmdManager: CommandManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSCore {
  Util: {
    SignalHook: new (context: unknown) => SignalHook;
  };
}

interface SignalHook {
  listen(signal: unknown, callback: (event: CommandStartedEvent) => void): void;
  unlistenAll(): void;
}

interface Logger {
  logCommand(commandMap: Map<string, number>): void;
}

declare const HSApp: HSApp;
declare const HSCore: HSCore;

const COMMAND_LOG_INTERVAL = 10000;

class CommandLogger {
  private _commandMap: Map<string, number>;
  private _signalHook: SignalHook;
  private _logger: Logger;
  private _timer?: NodeJS.Timeout;

  constructor(loggerConfig: unknown) {
    this._commandMap = new Map<string, number>();
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._logger = new Logger(loggerConfig);
  }

  public init(): void {
    const commandManager = HSApp.App.getApp().cmdManager;
    this._signalHook.listen(
      commandManager.signalCommandStarted,
      this._onCommandStarted.bind(this)
    );

    this._timer = setInterval(() => {
      if (this._commandMap.size) {
        this._logger.logCommand(this._commandMap);
        this.reset();
      }
    }, COMMAND_LOG_INTERVAL);
  }

  public clear(): void {
    this.reset();
    this._signalHook.unlistenAll();
    if (this._timer) {
      clearInterval(this._timer);
    }
  }

  public reset(): void {
    this._commandMap.clear();
  }

  private _onCommandStarted(event: CommandStartedEvent): void {
    const command = event.data.cmd;
    if (!command) {
      return;
    }

    const commandType = command.type;
    const currentCount = this._commandMap.get(commandType);

    if (currentCount !== undefined) {
      this._commandMap.set(commandType, currentCount + 1);
    } else {
      this._commandMap.set(commandType, 1);
    }
  }
}

export default CommandLogger;