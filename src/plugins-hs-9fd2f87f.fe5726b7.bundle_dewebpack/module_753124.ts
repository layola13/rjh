import { getSelectedInJSON } from './utils';

interface CopyCommandOptions {
  selections: unknown;
  userinputPlugin: UserinputPlugin;
  floorplan: unknown;
  app: unknown;
}

interface UserinputPlugin {
  setJSON(key: string, value: unknown): void;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract onReceive(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class CopyCommand extends Command {
  private readonly _selections: unknown;
  private readonly _userinputPlugin: UserinputPlugin;
  private readonly _floorplan: unknown;
  private readonly _app: unknown;

  constructor(options: CopyCommandOptions) {
    super();
    this._selections = options.selections;
    this._userinputPlugin = options.userinputPlugin;
    this._floorplan = options.floorplan;
    this._app = options.app;
  }

  onExecute(): void {
    const selectedJSON = getSelectedInJSON(this._selections);
    this._userinputPlugin.setJSON('editor', selectedJSON);
    this.mgr.complete(this);
  }

  onReceive(): void {
    // No implementation needed
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return '复制操作';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default CopyCommand;