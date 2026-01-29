interface LightSlotParameters {
  flip?: boolean;
  hasLightBand?: boolean;
  width?: number;
  height?: number;
  error?: number;
  parameters?: Record<string, unknown>;
  path?: unknown[];
}

interface LightSlotEntity {
  getParameters(): LightSlotParameters;
  updateMetadata(metadata: unknown, sync: boolean): void;
  getUniqueParent(): WebCADDocument | null;
  options?: Record<string, unknown>;
}

interface WebCADDocument {
  isDuringFastComputation: boolean;
}

interface Content {
  getLightSlotEntityById(id: string): LightSlotEntity;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface Request {
  // Request structure placeholder
}

interface CommandContext {
  transManager: TransactionManager;
}

type ChangeEventType = 'ceilingchangebegin' | 'ceilingchanging' | 'ceilingchangeend';

interface ProfileDataChanges {
  flip?: boolean;
  hasLightBand?: boolean;
  width?: number;
  height?: number;
}

class CmdEditCustomizedModelLightSlot extends HSApp.Cmd.Command {
  private readonly _content: Content;
  private readonly _lightSlotId: string;
  private readonly _requestType: string;
  private _request?: Request;
  protected context!: CommandContext;

  constructor(content: Content, lightSlotId: string) {
    super();
    this._content = content;
    this._lightSlotId = lightSlotId;
    this._requestType = HSFPConstants.RequestType.EditCustomizedModelLightSlot;
    this._request = undefined;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  public onExecute(): void {
    // Empty implementation
  }

  /**
   * Updates profile data for the light slot entity
   * @param changes - Object containing the profile data changes
   * @param eventType - Type of ceiling change event
   */
  public changeProfileData(changes: ProfileDataChanges, eventType: string): void {
    if (!changes || !eventType) {
      return;
    }

    const lightSlotEntity = this._content.getLightSlotEntityById(this._lightSlotId);
    const parameters = lightSlotEntity.getParameters();

    if (!parameters || parameters.error === -1) {
      return;
    }

    const clonedParameters = _.cloneDeep(parameters.parameters);
    const clonedPath = _.cloneDeep(parameters.path);
    const options = lightSlotEntity.options;
    let hasChanges = false;

    const WIDTH_THRESHOLD = 1.4;
    const HEIGHT_THRESHOLD = 0.8;
    const TOLERANCE = 0.05;

    if ('flip' in changes) {
      if (clonedParameters.flip !== changes.flip) {
        hasChanges = true;
      }
      clonedParameters.flip = changes.flip;
    }

    if ('hasLightBand' in changes) {
      if (clonedParameters.hasLightBand !== changes.hasLightBand) {
        hasChanges = true;
      }
      clonedParameters.hasLightBand = changes.hasLightBand;
    }

    if ('width' in changes) {
      const widthDifference = Math.abs(clonedParameters.width - changes.width);
      if (
        eventType === 'ceilingchangeend' ||
        GeLib.MathUtils.largerOrEqual(widthDifference, WIDTH_THRESHOLD, TOLERANCE)
      ) {
        hasChanges = true;
      }
      clonedParameters.width = changes.width;
    }

    if ('height' in changes) {
      const heightDifference = Math.abs(clonedParameters.height - changes.height);
      if (
        eventType === 'ceilingchangeend' ||
        GeLib.MathUtils.largerOrEqual(heightDifference, HEIGHT_THRESHOLD, TOLERANCE)
      ) {
        hasChanges = true;
      }
      clonedParameters.height = changes.height;
    }

    if (hasChanges) {
      const metadata = HSCore.Model.CustomizedModelLightSlot.constructMetaData(
        clonedPath,
        clonedParameters,
        options
      );
      const parentDocument = lightSlotEntity.getUniqueParent();

      if (parentDocument) {
        parentDocument.isDuringFastComputation = eventType === 'ceilingchanging';
        lightSlotEntity.updateMetadata(metadata, true);

        if (eventType === 'ceilingchangeend') {
          HSCore.Util.CustomizedModel.syncChildrenByWebCADDocument(parentDocument);
        }
      }
    }
  }

  public onReceive(eventType: ChangeEventType, data?: ProfileDataChanges): boolean {
    if (eventType === 'ceilingchangebegin') {
      const transactionManager = this.context.transManager;
      this._request = transactionManager.createRequest(this._requestType, [
        this._content,
        this._lightSlotId
      ]);
    } else if (eventType === 'ceilingchanging') {
      this.changeProfileData(data!, 'ceilingchanging');
    } else if (eventType === 'ceilingchangeend') {
      this.changeProfileData(data!, 'ceilingchangeend');
      this._commitRequest();
    }

    return super.onReceive?.(eventType, data) ?? true;
  }
}

const pluginNamespace = HSApp.Util.Core.define('hsw.plugin.customizedmodeling.cmd');
pluginNamespace.CmdEditCustomizedModelLightSlot = CmdEditCustomizedModelLightSlot;

export default CmdEditCustomizedModelLightSlot;