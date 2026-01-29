interface Opening {
  assignTo(host: Wall): void;
}

interface Wall {
  instanceOf(modelClass: string): boolean;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
}

class AutoFitOpeningToWallCommand extends Command {
  private readonly opening: Opening | null;
  private readonly host: Wall | null;

  constructor(opening: Opening | null, host: Wall | null) {
    super();
    this.opening = opening;
    this.host = host;
  }

  onExecute(): void {
    const { opening, host } = this;
    
    if (opening && host) {
      host.instanceOf(HSConstants.ModelClass.NgWall);
      HSCore.Util.Content.autoFitToWall(host, opening);
      opening.assignTo(host);
    }
    
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }
}

export default AutoFitOpeningToWallCommand;