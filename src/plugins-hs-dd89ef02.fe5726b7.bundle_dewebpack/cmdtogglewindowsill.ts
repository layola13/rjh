interface TransactionManager {
  createRequest(type: string, params: unknown[]): unknown;
  commit(request: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
}

declare const HSFPConstants: {
  RequestType: {
    ToggleWindowSill: string;
  };
};

export class CmdToggleWindowSill extends Command {
  private window: unknown;
  private show: boolean;

  constructor(window: unknown, show: boolean) {
    super();
    this.window = window;
    this.show = show;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ToggleWindowSill,
      [this.window, this.show]
    );
    transManager.commit(request);
    this.mgr.complete(this);
  }
}