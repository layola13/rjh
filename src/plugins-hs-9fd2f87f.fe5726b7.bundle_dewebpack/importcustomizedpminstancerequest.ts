import { HSCore } from './HSCore';
import { DIYUtils } from './DIYUtils';

interface CustomizedPMModelCreateOptions {
  creator: string;
  unit: string;
  webCADDocument: any;
}

interface AddCustomizedPMInstanceOptions {
  insModel: any;
  rootModel: any;
}

interface ContentType {
  getTypeString(): string;
}

interface Floorplan {
  scene: {
    getCustomizedPms(): any[];
    addChild(model: any): void;
  };
}

export class ImportCustomizedPMInstanceRequest extends HSCore.Transaction.Request {
  private _floorplan: Floorplan;
  private _importDocStr: string;
  private _contentType: ContentType;
  private _originPos: any;
  private _xLength: number;
  private _yLength: number;
  private _zLength: number;
  private _scale: number;
  private _rotation: number;
  private _rootModel?: any;
  private _webcadDocBefore?: any;
  private _webcadDocAfter?: any;
  private _newEntity?: any;

  public isAyncUpdate: boolean = true;

  constructor(
    floorplan: Floorplan,
    importDocStr: string,
    contentType: ContentType,
    originPos: any,
    xLength: number,
    yLength: number,
    zLength: number,
    scale: number,
    rotation: number
  ) {
    super();
    this._floorplan = floorplan;
    this._importDocStr = importDocStr;
    this._contentType = contentType;
    this._originPos = originPos;
    this._xLength = xLength;
    this._yLength = yLength;
    this._zLength = zLength;
    this._scale = scale;
    this._rotation = rotation;
  }

  async onCommitAsync(): Promise<any> {
    const customizedPms = this._floorplan.scene.getCustomizedPms();
    this._rootModel = customizedPms.length ? customizedPms[0] : undefined;

    if (!this._rootModel) {
      this._rootModel = HSApp.Util.CustomizedPMModel.createCustomizedPMModel({
        creator: adskUser.uid,
        unit: 'mm',
        webCADDocument: DiySdk.DmDiyApi.createDocument()
      });
      this._rootModel.setFlagOn(HSCore.Model.EntityFlagEnum.freezed);
      this._floorplan.scene.addChild(this._rootModel);
      await this._rootModel.openDiyDocument(false);
    }

    this._webcadDocBefore = this._rootModel.webCADDocument;

    this._newEntity = await DIYUtils.importCustomizedPMInstance(
      this._rootModel,
      this._importDocStr,
      this._contentType.getTypeString(),
      this._originPos,
      this._xLength,
      this._yLength,
      this._zLength,
      this._scale,
      this._rotation
    );

    this._webcadDocAfter = this._rootModel.webCADDocument;

    return this._newEntity;
  }

  async onUndo(): Promise<void> {
    this._rootModel.webCADDocument = this._webcadDocBefore;
    await this._rootModel.openDiyDocument(false);

    if (this._newEntity) {
      HSApp.Util.CustomizedPMModel.removeCustomizedPMInstance(this._newEntity);
    }
  }

  async onRedo(): Promise<void> {
    this._rootModel.webCADDocument = this._webcadDocAfter;
    await this._rootModel.openDiyDocument(false);

    HSApp.Util.CustomizedPMModel.addCustomizedPMInstance({
      insModel: this._newEntity,
      rootModel: this._rootModel
    });
  }
}