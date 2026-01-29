import { HSCatalog } from './635589';

interface Content {
  contentType: ContentType;
  initCeiling(polygon: Polygon | Face2D): void;
  updateSmartCustomizedCeiling?(force: boolean, polygon: Polygon): boolean;
  host?: Content;
  customizedFeatureModel?: CustomizedFeatureModel;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface Polygon {
  // Define polygon properties as needed
}

interface Face2D {
  // Define Face2D properties as needed
}

interface CustomizedFeatureModel {
  sketch: {
    dirtyMaterial(): void;
  };
}

interface LiveHintOptions {
  canclose: boolean;
  status: number;
}

interface LiveHintStatic {
  show(message: string, duration: number, param?: unknown, options?: LiveHintOptions): void;
  statusEnum: {
    warning: number;
  };
}

interface ResourceManagerStatic {
  getString(key: string): string;
}

interface HSUtilStatic {
  CustomizedModel: {
    fitCeilingToRoom(content: Content, host: Content | undefined, polygon: Polygon): void;
  };
}

interface HSCoreUtilStatic {
  Content: {
    getCeilingContentIn(content: Content, layer: unknown): Content | undefined;
  };
}

interface FloorplanScene {
  activeLayer: unknown;
}

interface Floorplan {
  scene: FloorplanScene;
}

interface AppInstance {
  floorplan: Floorplan;
  activeEnvironmentId: string;
  getApp(): AppInstance;
}

interface HSAppStatic {
  App: {
    getApp(): AppInstance;
  };
  Util: HSUtilStatic;
}

interface HSFPConstantsStatic {
  CommandType: {
    PlaceProduct: string;
    DuplicateSequence: string;
  };
  Environment: {
    NCustomizedCeilingModel: string;
  };
}

declare const LiveHint: LiveHintStatic;
declare const ResourceManager: ResourceManagerStatic;
declare const HSApp: HSAppStatic;
declare const HSFPConstants: HSFPConstantsStatic;
declare const HSCore: { Util: HSCoreUtilStatic };

class BaseCommand {
  protected _content: Content;
  protected _canDoAutoFit: boolean;

  constructor(
    content: Content,
    param2: unknown,
    param3: unknown,
    canDoAutoFit: boolean = false,
    param5: boolean = true
  ) {
    this._content = content;
    this._canDoAutoFit = canDoAutoFit;
  }
}

export default class CustomizedCeilingMoveCommand extends BaseCommand {
  private _polygon?: Polygon;
  private _targetFace2d?: Face2D;
  private _cmdType?: string;

  constructor(
    content: Content,
    param2: unknown,
    param3: unknown,
    canDoAutoFit: boolean = false,
    param5: boolean = true,
    polygon?: Polygon,
    targetFace2d?: Face2D,
    cmdType?: string
  ) {
    super(content, param2, param3, canDoAutoFit, param5);
    this._polygon = polygon;
    this._targetFace2d = targetFace2d;
    this._cmdType = cmdType;
  }

  customizedMove(): void {
    if (
      this._content.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ceiling) &&
      this._canDoAutoFit
    ) {
      this.updateSmartCustomizedCeiling();
    }

    if (
      this._content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedPMCeiling) ||
      (this._content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPMCeiling) &&
        this._canDoAutoFit)
    ) {
      if (this._targetFace2d) {
        this._content.initCeiling(this._targetFace2d);
      } else if (this._polygon) {
        this._content.initCeiling(this._polygon);
      }
    }
  }

  updateSmartCustomizedCeiling(): void {
    if (
      this._content.updateSmartCustomizedCeiling &&
      this._content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling)
    ) {
      if (this._polygon && !this._content.updateSmartCustomizedCeiling(true, this._polygon)) {
        LiveHint.show(
          ResourceManager.getString('customized_ceiling_no_enough_space'),
          2500,
          undefined,
          {
            canclose: true,
            status: LiveHint.statusEnum.warning
          }
        );
      }
    } else if (
      this._content &&
      !this._content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedCeiling) &&
      this._cmdType &&
      (this._cmdType === HSFPConstants.CommandType.PlaceProduct ||
        this._cmdType === HSFPConstants.CommandType.DuplicateSequence)
    ) {
      const ceilingHost =
        HSCore.Util.Content.getCeilingContentIn(
          this._content,
          HSApp.App.getApp().floorplan.scene.activeLayer
        ) ?? this._content.host;

      if (this._polygon) {
        HSApp.Util.CustomizedModel.fitCeilingToRoom(this._content, ceilingHost, this._polygon);
      }

      if (
        HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.NCustomizedCeilingModel &&
        ceilingHost?.customizedFeatureModel
      ) {
        ceilingHost.customizedFeatureModel.sketch.dirtyMaterial();
      }
    }
  }
}