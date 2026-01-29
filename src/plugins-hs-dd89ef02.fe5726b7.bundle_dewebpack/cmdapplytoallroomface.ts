import { CompositeCommand } from 'HSApp/Cmd/CompositeCommand';

type MoldingType = 'cornice' | 'baseboard' | 'wallpaper' | string;

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request, immediate: boolean): void;
}

interface TransactionSession {
  commit(): void;
}

interface Request {}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: CmdApplyToAllRoomFace): void;
}

export class CmdApplyToAllRoomFace extends CompositeCommand {
  private entity: unknown;
  private faceType: unknown;
  private moldingType: MoldingType;
  private _applyFaceMolding: boolean = false;
  private _applyFacePaper: boolean = false;
  private isApply: boolean;
  
  protected context!: Context;
  protected mgr!: CommandManager;

  constructor(
    entity: unknown,
    faceType: unknown,
    moldingType: MoldingType,
    isApply: boolean = true
  ) {
    super();
    this.entity = entity;
    this.faceType = faceType;
    this.moldingType = moldingType;
    this.isApply = isApply;
  }

  onExecute(): void {
    const session = this.context.transManager.startSession();
    const moldingType = this.moldingType;

    if (!moldingType || moldingType !== 'wallpaper') {
      const request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.ApplyToAllRoomWallFaceMolding,
        [this.entity, moldingType, this.isApply]
      );
      this.context.transManager.commit(request, true);
      this._applyFaceMolding = true;
    }

    session.commit();
    super.onExecute();
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    let attributeName = '线条';

    if (this._applyFacePaper && this._applyFaceMolding) {
      attributeName = '墙面属性';
    } else if (this._applyFaceMolding) {
      attributeName = this.moldingType === 'cornice' ? '石膏线' : '踢脚线';
    } else if (this._applyFacePaper) {
      attributeName = '材质';
    }

    const action = this.isApply ? '应用' : '清空';
    return `${action}${attributeName}到所有房间墙面`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}