enum PaintCmdMessageEnum {
  material = 'material',
  rotation = 'rotation',
  offset = 'offset',
  backgroundMaterial = 'backgroundMaterial',
  editMaterial = 'editMaterial',
  resetPavingPoint = 'resetPavingPoint',
  clearMaterial = 'clearMaterial'
}

enum EditDoorStoneMessageEnum {
  resetDoorStone = 'resetDoorStone'
}

enum RoomSurfaceTypeEnum {
  ceiling = 'ceiling',
  floor = 'floor',
  wall = 'wall'
}

enum RequestType {
  ApplyAutoFaceGroupMixPaint = 'ApplyAutoFaceGroupMixPaint',
  EditMaterial = 'EditMaterial'
}

enum LogGroupTypes {
  FaceOperation = 'FaceOperation'
}

interface MaterialData {
  [key: string]: unknown;
}

interface EditMaterialRequestData {
  msg: string;
  data: unknown;
  contextualToolPlugin?: unknown;
  signalTextureLoadSuccess?: unknown;
}

interface CeilingHeightData {
  entity: unknown;
  ceilingHeight: number;
}

interface Entity {
  [key: string]: unknown;
}

interface Face extends Entity {
  [key: string]: unknown;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionRequest {
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(type: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface App {
  transManager: TransactionManager;
}

interface Command {
  [key: string]: unknown;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new (...args: unknown[]) => Command;
  };
  PaintPluginHelper: {
    Enum: {
      PaintCmdMessageEnum: typeof PaintCmdMessageEnum;
    };
  };
};

declare const HSFPConstants: {
  RequestType: typeof RequestType;
  LogGroupTypes: typeof LogGroupTypes;
};

declare const HSCore: {
  Material: {
    Util: {
      getFaceType(entity: Entity): string;
      getEntityMaterial(entity: Entity, faceType: string): MaterialData;
    };
  };
  Model: {
    RoomSurfaceTypeEnum: typeof RoomSurfaceTypeEnum;
    Face: new (...args: unknown[]) => Face;
  };
  Util: {
    Room: {
      computeCeilingHeight(entity: Entity, data: unknown): number;
    };
    FaceGroup: {
      isFaceGroup(entity: Entity): boolean;
    };
  };
};

export class CmdEditMaterial extends HSApp.Cmd.Command {
  private entity: Entity;
  private faceType: string;
  private _app: App;
  private contextualToolPlugin?: unknown;
  private signalTextureLoadSuccess?: unknown;
  private PaintCmdMessageEnum: typeof PaintCmdMessageEnum;

  constructor(
    entity: Entity,
    faceType?: string,
    contextualToolPlugin?: unknown,
    signalTextureLoadSuccess?: unknown
  ) {
    super();
    this.entity = entity;
    this.faceType = faceType ?? HSCore.Material.Util.getFaceType(entity);
    this._app = HSApp.App.getApp();
    this.contextualToolPlugin = contextualToolPlugin;
    this.signalTextureLoadSuccess = signalTextureLoadSuccess;
    this.PaintCmdMessageEnum = HSApp.PaintPluginHelper.Enum.PaintCmdMessageEnum;
  }

  getSelectedPicutureMaterialData(): MaterialData {
    const material = HSCore.Material.Util.getEntityMaterial(this.entity, this.faceType);
    return material ?? {};
  }

  onExecute(): void {}

  onReceive(message: string, data: unknown): [string, Partial<CeilingHeightData>] {
    let result: Partial<CeilingHeightData> = {};
    let messageType = message;

    switch (message) {
      case this.PaintCmdMessageEnum.material:
        this.createRequest(message, data);
        if (this.faceType === HSCore.Model.RoomSurfaceTypeEnum.ceiling) {
          result.entity = this.entity;
          result.ceilingHeight = HSCore.Util.Room.computeCeilingHeight(this.entity, data);
          messageType = 'ceilingHeight';
        }
        break;
      case this.PaintCmdMessageEnum.rotation:
      case this.PaintCmdMessageEnum.offset:
      case this.PaintCmdMessageEnum.backgroundMaterial:
      case this.PaintCmdMessageEnum.editMaterial:
      case this.PaintCmdMessageEnum.resetPavingPoint:
      case this.PaintCmdMessageEnum.clearMaterial:
      case EditDoorStoneMessageEnum.resetDoorStone:
        this.createRequest(message, data);
        break;
    }

    return [messageType, result];
  }

  createRequest(message: string, data: unknown): void {
    if (!this.entity) {
      return;
    }

    const requestData: EditMaterialRequestData = {
      msg: message,
      data: data,
      contextualToolPlugin: this.contextualToolPlugin,
      signalTextureLoadSuccess: this.signalTextureLoadSuccess
    };

    const requestArgs = [this.entity, this.faceType, requestData];
    const session = this._app.transManager.startSession();

    if (
      message === this.PaintCmdMessageEnum.material &&
      this.entity instanceof HSCore.Model.Face &&
      !HSCore.Util.FaceGroup.isFaceGroup(this.entity)
    ) {
      const faces = [this.entity];
      const faceGroupRequest = this._app.transManager.createRequest(
        HSFPConstants.RequestType.ApplyAutoFaceGroupMixPaint,
        [faces]
      );
      this._app.transManager.commit(faceGroupRequest);
    }

    const editMaterialRequest = this._app.transManager.createRequest(
      HSFPConstants.RequestType.EditMaterial,
      requestArgs
    );
    this._app.transManager.commit(editMaterialRequest);
    session.commit();
  }

  getDescription(): string {
    return '编辑材质';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}