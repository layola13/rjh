interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface ReplaceOptions {
  position: Position;
  rotation: Rotation;
  isSmartReplace: boolean;
}

interface ContentInfo {
  [key: string]: unknown;
}

interface TransactionRequest {
  newEntity: unknown;
  getRemovedSoftCloth(): unknown[];
}

interface TransactionManager {
  createRequest(
    requestType: string,
    params: [unknown, ContentInfo, ReplaceOptions]
  ): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

abstract class Command {
  protected context!: Context;
  protected mgr!: CommandManager;

  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

/**
 * Command for replacing products/entities in the scene
 */
class ReplaceProductCommand extends Command {
  private _toBeReplaced: unknown;
  private _contentInfo: ContentInfo;
  private _position: Position;
  private _rotation: Rotation;
  private _removedSoftCloth: unknown[];
  public newEntity?: unknown;

  constructor(
    toBeReplaced: unknown,
    contentInfo: ContentInfo,
    position: Position,
    rotation: Rotation
  ) {
    super();
    this._toBeReplaced = toBeReplaced;
    this._contentInfo = contentInfo;
    this._position = position;
    this._rotation = rotation;
    this._removedSoftCloth = [];
  }

  onExecute(): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.ReplaceProduct,
      [
        this._toBeReplaced,
        this._contentInfo,
        {
          position: this._position,
          rotation: this._rotation,
          isSmartReplace: true
        }
      ]
    );

    this.context.transManager.commit(request);
    this.mgr.complete(this);
    this.newEntity = request.newEntity;
    this._removedSoftCloth = request.getRemovedSoftCloth();
  }

  getRemovedSoftCloth(): unknown[] {
    return this._removedSoftCloth;
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "替换物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export default ReplaceProductCommand;