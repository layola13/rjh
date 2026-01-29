interface Parameters {
  profileSizeX?: number;
  profileSizeY?: number;
  needUpdateMaterial?: boolean;
  moldingProfileData?: ProfileData;
  flippedMoldingProfileData?: ProfileData;
}

interface ProfileData {
  profileSizeX: number;
  profileSizeY: number;
}

interface BeforeData {
  [key: string]: any;
}

interface ReceiveEventData {
  parameters?: Parameters;
}

interface Entity {
  metadata?: {
    contentType?: any;
  };
}

interface DisplayListItem {
  entity?: Entity;
}

interface DisplayList {
  [key: string]: DisplayListItem;
}

interface View2D {
  displayList?: DisplayList;
}

interface TransactionManager {
  commit(request: any): void;
  createRequest(requestType: string, args: any[]): any;
}

interface Context {
  transManager: TransactionManager;
}

interface CustomizedModel {
  metadata: {
    parameters: Parameters;
  };
  _hostPolygon?: any;
  getHost(): any[];
  updateSmartCustomizedCeiling(flag: boolean, polygon: any): void;
}

const pluginNamespace = HSApp.Util.Core.define("hsw.plugin.customizedmodeling.cmd");

class CmdEditParametricCeiling extends HSApp.Cmd.Command {
  private _content: CustomizedModel;
  private _requestType: string;
  private _request: any;
  private _profileType?: string;
  private _beforeData: BeforeData;
  private _diyBefores: any;
  
  protected context!: Context;

  constructor(content: CustomizedModel, profileType?: string) {
    super();
    this._content = content;
    this._requestType = HSFPConstants.RequestType.EditParametricCeiling;
    this._request = undefined;
    this._profileType = profileType;
    this._beforeData = {};
    this._diyBefores = undefined;
  }

  private _commitRequest(): void {
    this.context.transManager.commit(this._request);
  }

  public onExecute(): void {
    // Implementation placeholder
  }

  private _updateCornerRectCeilingParameters(
    parameters: Parameters,
    profileType?: string
  ): void {
    if (
      profileType &&
      parameters.moldingProfileData &&
      parameters.flippedMoldingProfileData
    ) {
      const oppositeKey =
        profileType === "flippedMoldingProfileData"
          ? "moldingProfileData"
          : "flippedMoldingProfileData";
      
      parameters[oppositeKey].profileSizeY = parameters[profileType].profileSizeX;
      parameters[oppositeKey].profileSizeX = parameters[profileType].profileSizeY;
    }
  }

  public onReceive(event: string, data: ReceiveEventData): boolean {
    const transManager = this.context.transManager;

    switch (event) {
      case "ceilingchangebegin": {
        const lights = this._lightsfilter();
        const host = this._content.getHost();
        const entities = [this._content].concat(lights).concat(host);
        HSCore.Util.Transaction.saveEntityToData(entities, this._beforeData);

        const MaterialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
        if (this._content instanceof HSCore.Model.CustomizedModel) {
          this._diyBefores = MaterialBrushUtil.getDiyFaceMaterialDump(this._content);
        }
        break;
      }

      case "ceilingchanging": {
        if (data.parameters) {
          this._updateCornerRectCeilingParameters(data.parameters, this._profileType);
          this._content.metadata.parameters = data.parameters;
          data.parameters.needUpdateMaterial = false;
          this._content.updateSmartCustomizedCeiling(true, this._content._hostPolygon);
        }
        return true;
      }

      case "ceilingchangeend": {
        this._request = transManager.createRequest(this._requestType, [
          this._content,
          event,
          data.parameters,
          this._profileType,
          this._beforeData,
          this._diyBefores
        ]);
        this._commitRequest();
        return true;
      }

      case "deletesmartmolding":
      case "deletesmartlightslot": {
        this._request = transManager.createRequest(this._requestType, [
          this._content,
          event,
          data
        ]);
        this._commitRequest();
        break;
      }
    }

    return super.onReceive?.(event, data) ?? false;
  }

  private _lightsfilter(): Entity[] {
    const view = HSApp.App.getApp().getActive2DView() as View2D;
    const displayList = view.displayList;
    const lights: Entity[] = [];

    if (!displayList) {
      return lights;
    }

    for (const key in displayList) {
      const displayItem = displayList[key];
      const entity = displayItem?.entity;

      if (entity?.metadata?.contentType) {
        const contentType = entity.metadata.contentType;
        if (
          contentType.isTypeOf(HSCatalog.ContentTypeEnum.Lighting) ||
          contentType.isTypeOf(HSCatalog.ContentTypeEnum.CeilingLight) ||
          contentType.isTypeOf(HSCatalog.ContentTypeEnum.PendantLight)
        ) {
          lights.push(entity);
        }
      }
    }

    return lights;
  }
}

pluginNamespace.CmdEditParametricCeiling = CmdEditParametricCeiling;

export default CmdEditParametricCeiling;