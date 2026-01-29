interface Wall {
  isValid(): boolean;
  isArcWall(): boolean;
  length: number;
  forEachContent(callback: (content: any) => void): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: any[]): any;
  commit(request: any): void;
}

interface SelectionManager {
  unselectAll(): void;
  select(entity: any): void;
}

interface CommandContext {
  selectionManager: SelectionManager;
}

interface CommandManager {
  complete(command: Command): void;
  cancel(): void;
}

abstract class Command {
  protected mgr!: CommandManager;
  protected context!: CommandContext;

  constructor(entity: any, options: any) {}

  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract isInteractive(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

class ChangeWallTypeCommand extends Command {
  private entity: Wall;
  private wall: Wall;
  private innerSagitta: number;
  private description: string;

  constructor(wall: Wall, innerSagitta?: number) {
    super(wall, innerSagitta);

    if (!wall) {
      throw new Error('Wall entity is required');
    }

    this.entity = wall;
    this.wall = wall;

    if (innerSagitta === undefined) {
      this.innerSagitta = wall.isArcWall() ? 0 : wall.length / 3;
    } else {
      this.innerSagitta = innerSagitta;
    }

    this.description = `转为${HSCore.Util.Wall.isArcWall(wall) ? '直墙' : '弧墙'}`;
  }

  onExecute(): void {
    if (!this.entity.isValid()) {
      this.mgr.cancel();
      return;
    }

    const transactionManager = HSApp.App.getApp().transManager;
    const isCurrentlyArcWall = HSCore.Util.Wall.isArcWall(this.wall);

    const executeConversion = (productsToDelete: any[] = []): void => {
      const requests: any[] = [];

      if (!isCurrentlyArcWall) {
        productsToDelete.forEach((product) => {
          const deleteRequest = transactionManager.createRequest(
            HSFPConstants.RequestType.DeleteProduct,
            [product]
          );
          requests.push(deleteRequest);
        });
      }

      const changeWallRequest = transactionManager.createRequest(
        HSFPConstants.RequestType.ChangeToArcWall,
        [this.wall, { sagitta: this.innerSagitta }]
      );
      requests.push(changeWallRequest);

      const compositeRequest = transactionManager.createRequest(
        HSConstants.RequestType.Composite,
        [requests]
      );

      transactionManager.commit(compositeRequest);
      this.mgr.complete(this);

      const selectionManager = this.context.selectionManager;
      selectionManager.unselectAll();
      selectionManager.select(this.wall);
    };

    if (isCurrentlyArcWall) {
      executeConversion();
    } else {
      const customizedBackgroundWalls: any[] = [];

      this.wall.forEachContent((content) => {
        if (content instanceof HSCore.Model.CustomizedBackgroundWall) {
          customizedBackgroundWalls.push(content);
        }
      });

      if (customizedBackgroundWalls.length > 0) {
        const messageContent = ResourceManager.getString('popup_to_arc_wall_cofirm_content');
        const confirmButtonText = ResourceManager.getString('popup_to_arc_wall_confirm');
        const cancelButtonText = ResourceManager.getString('cancel');
        const titleText = ResourceManager.getString('popup_to_arc_wall_confirm_title');

        MessageBox.create(
          messageContent,
          [confirmButtonText, cancelButtonText],
          1,
          { title: titleText },
          false,
          false
        ).show((buttonIndex: number) => {
          if (buttonIndex === 0) {
            this.mgr.cancel();
          } else if (buttonIndex === 1) {
            executeConversion(customizedBackgroundWalls);
          }
        });
      } else {
        executeConversion();
      }
    }

    this.description = `转为${HSCore.Util.Wall.isArcWall(this.wall) ? '直墙' : '弧墙'}`;
  }

  canUndoRedo(): boolean {
    return false;
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return this.description;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}

export default ChangeWallTypeCommand;