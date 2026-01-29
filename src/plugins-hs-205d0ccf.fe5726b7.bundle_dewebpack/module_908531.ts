interface ISelectable {
  Class: string;
  instanceOf(modelClass: string): boolean;
}

interface ICommandManager {
  createCommand(commandType: string, args: unknown[]): unknown;
  cancel(command: Command): void;
  complete(command: Command): void;
}

abstract class Command {
  protected subs: unknown[] = [];
  protected mgr!: ICommandManager;

  abstract onExecute(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class DuplicateSelectionCommand extends Command {
  public onExecute(): void {
    const selectedItems = HSApp.Selection.Manager.selected();

    if (!this._isValid(selectedItems)) {
      logger.warning(
        'Error: Duplicate operator must have one or several "content" or "room" type! Cancel this command.'
      );
      this.mgr.cancel(this);
      return;
    }

    const commandManager = this.mgr;
    const subCommands = this.subs;

    selectedItems.forEach((item: ISelectable) => {
      const commandType = HSFPConstants.CommandType.DuplicateContent;
      if (commandType) {
        subCommands.push(commandManager.createCommand(commandType, [item]));
      }
    });

    super.onExecute();
    commandManager.complete(this);
  }

  private _isValid(items: ISelectable[]): boolean {
    if (!items || items.length === 0) {
      return false;
    }

    const firstItemClass = items[0].Class;

    return items.every((item: ISelectable) => {
      return (
        item.Class === firstItemClass &&
        item.instanceOf(HSConstants.ModelClass.NgContent)
      );
    });
  }

  public getDescription(): string {
    return "复制操作";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

const logger = log.logger(HSFPConstants.CommandType.DuplicateSelection);

export default DuplicateSelectionCommand;