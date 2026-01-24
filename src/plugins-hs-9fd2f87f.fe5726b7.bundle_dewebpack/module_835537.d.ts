import { Command } from 'HSApp/Cmd/Command';
import { Transaction } from 'HSCore/Util/Transaction';
import { CustomizedModel } from 'HSCore/Model/CustomizedModel';
import { RequestType } from 'HSFPConstants';

/**
 * Parameters for parametric ceiling modifications
 */
interface CeilingParameters {
  moldingProfileData?: ProfileData;
  flippedMoldingProfileData?: ProfileData;
  needUpdateMaterial?: boolean;
  [key: string]: unknown;
}

/**
 * Profile data structure for ceiling moldings
 */
interface ProfileData {
  profileSizeX: number;
  profileSizeY: number;
}

/**
 * Message data structure for ceiling change events
 */
interface CeilingChangeMessage {
  parameters: CeilingParameters;
}

/**
 * Message data for delete operations
 */
interface DeleteMessage {
  [key: string]: unknown;
}

/**
 * Saved entity data before modifications
 */
interface BeforeData {
  [entityId: string]: unknown;
}

/**
 * DIY face material dump data
 */
type DiyMaterialDump = unknown;

/**
 * Profile type identifier for ceiling modifications
 */
type ProfileType = 'moldingProfileData' | 'flippedMoldingProfileData' | undefined;

/**
 * Command for editing parametric ceilings in the customized modeling plugin.
 * Handles ceiling parameter modifications, molding profile updates, and deletion operations.
 */
export class CmdEditParametricCeiling extends Command {
  private readonly _content: CustomizedModel;
  private readonly _requestType: RequestType;
  private readonly _profileType: ProfileType;
  private readonly _beforeData: BeforeData;
  
  private _request: unknown;
  private _diyBefores: DiyMaterialDump;

  /**
   * Creates a new parametric ceiling edit command
   * @param content - The customized model content to edit
   * @param profileType - Type of profile being modified (moldingProfileData or flippedMoldingProfileData)
   */
  constructor(content: CustomizedModel, profileType: ProfileType) {
    super();
    this._content = content;
    this._requestType = HSFPConstants.RequestType.EditParametricCeiling;
    this._request = undefined;
    this._profileType = profileType;
    this._beforeData = {};
    this._diyBefores = undefined;
  }

  /**
   * Commits the current request to the transaction manager
   */
  private _commitRequest(): void {
    this.context.transManager.commit(this._request);
  }

  /**
   * Executes the command
   */
  onExecute(): void {
    // Implementation placeholder
  }

  /**
   * Updates corner rectangle ceiling parameters by swapping X and Y dimensions
   * between molding and flipped molding profiles
   * @param parameters - The ceiling parameters to update
   * @param profileType - The profile type that triggered the update
   */
  private _updateCornerRectCeilingParameters(
    parameters: CeilingParameters,
    profileType: ProfileType
  ): void {
    if (
      profileType &&
      parameters.moldingProfileData &&
      parameters.flippedMoldingProfileData
    ) {
      const oppositeProfile: keyof CeilingParameters =
        profileType === 'flippedMoldingProfileData'
          ? 'moldingProfileData'
          : 'flippedMoldingProfileData';

      const sourceProfile = parameters[profileType] as ProfileData;
      const targetProfile = parameters[oppositeProfile] as ProfileData;

      targetProfile.profileSizeY = sourceProfile.profileSizeX;
      targetProfile.profileSizeX = sourceProfile.profileSizeY;
    }
  }

  /**
   * Handles incoming messages for ceiling operations
   * @param eventType - Type of ceiling event (ceilingchangebegin, ceilingchanging, ceilingchangeend, etc.)
   * @param data - Event-specific data payload
   * @returns True if the event was handled successfully
   */
  onReceive(
    eventType: string,
    data: CeilingChangeMessage | DeleteMessage
  ): boolean {
    const transactionManager = this.context.transManager;

    switch (eventType) {
      case 'ceilingchangebegin': {
        const lights = this._lightsfilter();
        const hosts = this._content.getHost();
        const entitiesToSave = [this._content, ...lights, ...hosts];

        Transaction.saveEntityToData(entitiesToSave, this._beforeData);

        const materialBrushUtil = HSApp.PaintPluginHelper.Util.MaterialBrushUtil;
        if (this._content instanceof CustomizedModel) {
          this._diyBefores = materialBrushUtil.getDiyFaceMaterialDump(
            this._content
          );
        }
        break;
      }

      case 'ceilingchanging': {
        const changeData = data as CeilingChangeMessage;
        this._updateCornerRectCeilingParameters(
          changeData.parameters,
          this._profileType
        );
        this._content.metadata.parameters = changeData.parameters;

        changeData.parameters.needUpdateMaterial = false;
        this._content.updateSmartCustomizedCeiling(
          true,
          this._content._hostPolygon
        );
        return true;
      }

      case 'ceilingchangeend': {
        const changeData = data as CeilingChangeMessage;
        this._request = transactionManager.createRequest(
          this._requestType,
          [
            this._content,
            eventType,
            changeData.parameters,
            this._profileType,
            this._beforeData,
            this._diyBefores,
          ]
        );
        this._commitRequest();
        return true;
      }

      case 'deletesmartmolding':
      case 'deletesmartlightslot': {
        this._request = transactionManager.createRequest(this._requestType, [
          this._content,
          eventType,
          data,
        ]);
        this._commitRequest();
        break;
      }
    }

    // Call parent class onReceive if available
    return super.onReceive?.(eventType, data) ?? false;
  }

  /**
   * Filters and retrieves all lighting entities from the active 2D view
   * @returns Array of lighting entities (Lighting, CeilingLight, PendantLight)
   */
  private _lightsfilter(): unknown[] {
    const displayList = HSApp.App.getApp().getActive2DView().displayList;
    const lightEntities: unknown[] = [];

    if (!displayList) {
      return lightEntities;
    }

    for (const key in displayList) {
      const displayItem = displayList[key];
      const entity = displayItem?.entity;

      if (!entity) continue;

      const metadata = entity.metadata;
      if (!metadata) continue;

      const contentType = metadata.contentType;
      if (!contentType) continue;

      const isLighting =
        contentType.isTypeOf(HSCatalog.ContentTypeEnum.Lighting) ||
        contentType.isTypeOf(HSCatalog.ContentTypeEnum.CeilingLight) ||
        contentType.isTypeOf(HSCatalog.ContentTypeEnum.PendantLight);

      if (isLighting) {
        lightEntities.push(entity);
      }
    }

    return lightEntities;
  }
}

// Register command in the HSApp plugin namespace
const pluginNamespace = HSApp.Util.Core.define('hsw.plugin.customizedmodeling.cmd');
pluginNamespace.CmdEditParametricCeiling = CmdEditParametricCeiling;

export default CmdEditParametricCeiling;