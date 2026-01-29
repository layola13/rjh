interface Content {
  isFlagOff(flag: number): boolean;
  setFlagOff(flag: number): void;
  setFlagOn(flag: number): void;
  group?: unknown;
}

interface CommandManager {
  cancel(command: Command): void;
  complete(command: Command): void;
}

abstract class Command {
  protected mgr!: CommandManager;
  
  abstract onExecute(...args: unknown[]): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class HideEntityCommand extends Command {
  private content: Content;
  private show?: boolean;

  constructor(content: Content) {
    super();
    this.content = content;
  }

  onExecute(shouldShow: boolean): void {
    const isCurrentlyVisible = this.content.isFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    
    if (isCurrentlyVisible === shouldShow) {
      this.mgr.cancel(this);
      return;
    }
    
    this.show = shouldShow;
    this._switchFlag(shouldShow);
    this.mgr.complete(this);
  }

  onUndo(): void {
    this._switchFlag(!this.show);
  }

  onRedo(): void {
    this._switchFlag(this.show!);
  }

  private _switchFlag(shouldShow: boolean): void {
    const content = this.content;
    
    if (shouldShow) {
      content.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
    } else {
      content.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
      
      if (!content.group) {
        HSApp.Selection.Manager.unselect(content);
      }
    }
  }

  getDescription(): string {
    return "隐藏物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }
}

export default HideEntityCommand;