import { HSApp } from './HSApp';

interface FaceMaterialMixPaint {
  faceGroup: {
    getFaceIds(): number[];
  };
}

interface FaceMaterial {
  mixpaint?: FaceMaterialMixPaint;
}

interface LightSlot {
  faceIds: number[];
  getFaceMaterial(faceId: number): FaceMaterial | null;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface TransactionSession {
  commit(): void;
}

interface Request {}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  complete(command: CmdFlipNCustomizedLightSlot): void;
}

interface FaceGroupEntity {
  entity: LightSlot;
  faceType: number;
}

const LIVE_HINT_DURATION = 5000;
const STORAGE_KEY_LIVEHINT = 'mixpaint_livehint_ncustomized_clear_facegroup';

export class CmdFlipNCustomizedLightSlot extends HSApp.Cmd.Command {
  private readonly _lightSlot: LightSlot;
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  constructor(lightSlot: LightSlot) {
    super();
    this._lightSlot = lightSlot;
  }

  getFaceGroupIds(): number[] {
    const faceIds = this._lightSlot.faceIds;
    const faceGroupIds: number[] = [];

    faceIds.map((faceId) => {
      const faceMaterial = this._lightSlot.getFaceMaterial(faceId);
      const groupFaceIds = faceMaterial?.mixpaint?.faceGroup.getFaceIds();

      if (groupFaceIds && groupFaceIds.length > 0 && !faceGroupIds.includes(groupFaceIds[0])) {
        faceGroupIds.push(...groupFaceIds);
      }
    });

    return faceGroupIds;
  }

  private _showUngroupFaceLiveHint(): void {
    const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.ContentManipulation);
    const hasShownHint = storage.get(STORAGE_KEY_LIVEHINT);

    if (hasShownHint !== true) {
      LiveHint.show(
        ResourceManager.getString('mixpaint_livehint_ncustomized_clear_facegroup'),
        LIVE_HINT_DURATION,
        () => {
          LiveHint.hide();
          storage.set(STORAGE_KEY_LIVEHINT, true);
        },
        {
          append: ResourceManager.getString('mixpaint_livehint_connect_faces_append'),
          canclose: true
        }
      );
    }
  }

  onExecute(): void {
    const faceGroupIds = this.getFaceGroupIds();

    if (faceGroupIds.length > 0) {
      this._showUngroupFaceLiveHint();
    }

    const transManager = this.context.transManager;
    const session = transManager.startSession();

    if (faceGroupIds.length > 0) {
      const faceGroupEntities: FaceGroupEntity[] = faceGroupIds.map((faceType) => ({
        entity: this._lightSlot,
        faceType
      }));

      const splitRequest = transManager.createRequest(
        HSFPConstants.RequestType.SplitNCustomizedFaceGroupMixPaint,
        [faceGroupEntities]
      );
      transManager.commit(splitRequest);
    }

    const flipRequest = transManager.createRequest(
      HSFPConstants.RequestType.FlipNCustomizedLightSlot,
      [this._lightSlot]
    );
    transManager.commit(flipRequest);

    session.commit();
    this.mgr.complete(this);
  }
}