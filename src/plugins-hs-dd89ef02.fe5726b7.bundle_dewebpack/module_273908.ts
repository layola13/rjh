import { HSCore } from './HSCore';
import { TransactionManager, TransactionSession, TransactionRequest } from './TransactionManager';
import { CompositeCommand } from './CompositeCommand';
import { NCustomizedBeam } from './NCustomizedBeam';
import { HSFPConstants } from './HSFPConstants';

interface SpaceInfo {
  structureFaces: StructureFace[];
}

interface StructureFace {
  id: string;
  spaceInfos?: SpaceInfo[];
  getMaster(): unknown;
  material: {
    mixpaint: unknown;
  };
}

type FaceType = string;
type MoldingType = 'wallpaper' | 'cornice' | string | null | undefined;

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: CmdApplyToAllFace): void;
}

export class CmdApplyToAllFace extends CompositeCommand {
  private entity: StructureFace;
  private faceType: FaceType;
  private moldingType: MoldingType;
  private _applyFaceMolding: boolean = false;
  private _applyFacePaper: boolean = false;

  protected context!: Context;
  protected mgr!: CommandManager;

  constructor(entity: StructureFace, faceType: FaceType, moldingType: MoldingType) {
    super();
    this.entity = entity;
    this.faceType = faceType;
    this.moldingType = moldingType;
  }

  /**
   * Get all room faces excluding the current entity
   */
  private _getRoomFaces(entity: StructureFace): StructureFace[] {
    const spaceInfos = entity.spaceInfos ?? [];
    const allFaces: StructureFace[] = [];

    spaceInfos.forEach((spaceInfo) => {
      allFaces.push(...spaceInfo.structureFaces);
    });

    return Array.from(new Set(allFaces)).filter((face) => face.id !== entity.id);
  }

  onExecute(): void {
    const session: TransactionSession = this.context.transManager.startSession();
    const faceType = this.faceType;
    const moldingType = this.moldingType;

    if (!moldingType || moldingType === 'wallpaper') {
      if (this.entity.getMaster() instanceof NCustomizedBeam) {
        const request: TransactionRequest = this.context.transManager.createRequest(
          HSFPConstants.RequestType.ApplyToAllBeamFacePaper,
          [this.entity, faceType]
        );
        this.context.transManager.commit(request, true);
      } else {
        const roomFaces = this._getRoomFaces(this.entity);
        const request: TransactionRequest = this.context.transManager.createRequest(
          HSFPConstants.RequestType.ApplyMixPaintToFaces,
          [this.entity.material.mixpaint, roomFaces]
        );
        this.context.transManager.commit(request, true);
      }
      this._applyFacePaper = true;
    }

    if (!moldingType || moldingType !== 'wallpaper') {
      const request: TransactionRequest = this.context.transManager.createRequest(
        HSFPConstants.RequestType.ApplyToAllWallFaceMolding,
        [this.entity, moldingType]
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
    let propertyName = '线条';

    if (this._applyFacePaper && this._applyFaceMolding) {
      propertyName = '墙面属性';
    } else if (this._applyFaceMolding) {
      propertyName = this.moldingType === 'cornice' ? '石膏线' : '踢脚线';
    } else if (this._applyFacePaper) {
      propertyName = '材质';
    }

    let targetDescription = '所有墙面';
    if (this.entity.getMaster() instanceof NCustomizedBeam) {
      targetDescription = '所有梁面';
    }

    return `应用${propertyName}到当前房间${targetDescription}`;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}