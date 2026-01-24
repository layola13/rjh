/**
 * Command for editing customized model light slot entities
 * Handles ceiling change events and parameter updates
 */

import { Command } from 'hsw/app/cmd';
import { TransactionManager, Request } from 'hsw/core/transaction';
import { CustomizedModelContent } from 'hsw/plugin/customizedmodeling/content';
import { LightSlotEntity } from 'hsw/core/model/customized-model-light-slot';
import { WebCADDocument } from 'hsw/core/cad/document';

/**
 * Light slot parameters defining its physical properties
 */
interface LightSlotParameters {
  /** Whether the light slot is flipped/inverted */
  flip: boolean;
  /** Whether the light slot has a light band */
  hasLightBand: boolean;
  /** Width of the light slot in units */
  width: number;
  /** Height of the light slot in units */
  height: number;
}

/**
 * Partial update data for light slot parameters
 */
type LightSlotParameterUpdate = Partial<LightSlotParameters>;

/**
 * Result of parameter retrieval operation
 */
interface ParametersResult {
  /** Error code, -1 indicates success */
  error: number;
  /** Current parameter values */
  parameters: LightSlotParameters;
  /** Path information for the light slot */
  path: unknown[];
}

/**
 * Event types for ceiling change operations
 */
type CeilingChangeEvent = 'ceilingchangebegin' | 'ceilingchanging' | 'ceilingchangeend';

/**
 * Tolerance value for floating point comparisons
 */
const FLOAT_COMPARISON_TOLERANCE = 0.05;

/**
 * Minimum width change threshold to trigger update
 */
const MIN_WIDTH_CHANGE_THRESHOLD = 1.4;

/**
 * Minimum height change threshold to trigger update
 */
const MIN_HEIGHT_CHANGE_THRESHOLD = 0.8;

/**
 * Success error code indicating no error
 */
const SUCCESS_ERROR_CODE = -1;

/**
 * Command for editing customized model light slot properties
 * Manages parameter updates during ceiling modification operations
 */
export class CmdEditCustomizedModelLightSlot extends Command {
  private readonly _content: CustomizedModelContent;
  private readonly _lightSlotId: string;
  private readonly _requestType: number;
  private _request?: Request;

  /**
   * Creates a new edit light slot command
   * @param content - The customized model content containing the light slot
   * @param lightSlotId - Unique identifier of the light slot to edit
   */
  constructor(content: CustomizedModelContent, lightSlotId: string) {
    super();
    this._content = content;
    this._lightSlotId = lightSlotId;
    this._requestType = HSFPConstants.RequestType.EditCustomizedModelLightSlot;
    this._request = undefined;
  }

  /**
   * Commits the pending transaction request to the transaction manager
   */
  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  /**
   * Execute implementation - currently empty
   */
  public onExecute(): void {
    // Implementation pending
  }

  /**
   * Updates light slot parameters based on provided data
   * @param updateData - Partial parameter updates to apply
   * @param eventType - Type of ceiling change event triggering the update
   */
  public changeProfileData(
    updateData: LightSlotParameterUpdate,
    eventType: CeilingChangeEvent
  ): void {
    if (!updateData || !eventType) {
      return;
    }

    const lightSlotEntity = this._content.getLightSlotEntityById(this._lightSlotId);
    const parametersResult = lightSlotEntity.getParameters();

    if (!parametersResult || parametersResult.error !== SUCCESS_ERROR_CODE) {
      return;
    }

    const currentParameters = _.cloneDeep(parametersResult.parameters);
    const currentPath = _.cloneDeep(parametersResult.path);
    const entityOptions = lightSlotEntity.options;
    let shouldUpdateMetadata = false;

    // Check flip parameter change
    if ('flip' in updateData && currentParameters.flip !== updateData.flip) {
      shouldUpdateMetadata = true;
      currentParameters.flip = updateData.flip;
    }

    // Check light band parameter change
    if ('hasLightBand' in updateData && currentParameters.hasLightBand !== updateData.hasLightBand) {
      shouldUpdateMetadata = true;
      currentParameters.hasLightBand = updateData.hasLightBand;
    }

    // Check width parameter change with threshold
    if ('width' in updateData) {
      const widthDifference = Math.abs(currentParameters.width - updateData.width);
      const isEndEvent = eventType === 'ceilingchangeend';
      const exceedsThreshold = GeLib.MathUtils.largerOrEqual(
        widthDifference,
        MIN_WIDTH_CHANGE_THRESHOLD,
        FLOAT_COMPARISON_TOLERANCE
      );

      if (isEndEvent || exceedsThreshold) {
        shouldUpdateMetadata = true;
      }
      currentParameters.width = updateData.width;
    }

    // Check height parameter change with threshold
    if ('height' in updateData) {
      const heightDifference = Math.abs(currentParameters.height - updateData.height);
      const isEndEvent = eventType === 'ceilingchangeend';
      const exceedsThreshold = GeLib.MathUtils.largerOrEqual(
        heightDifference,
        MIN_HEIGHT_CHANGE_THRESHOLD,
        FLOAT_COMPARISON_TOLERANCE
      );

      if (isEndEvent || exceedsThreshold) {
        shouldUpdateMetadata = true;
      }
      currentParameters.height = updateData.height;
    }

    // Apply metadata update if parameters changed
    if (shouldUpdateMetadata) {
      const newMetadata = HSCore.Model.CustomizedModelLightSlot.constructMetaData(
        currentPath,
        currentParameters,
        entityOptions
      );

      const parentEntity = lightSlotEntity.getUniqueParent();
      if (parentEntity) {
        const isFastComputation = eventType === 'ceilingchanging';
        parentEntity.webCADDocument.isDuringFastComputation = isFastComputation;
        lightSlotEntity.updateMetadata(newMetadata, true);

        if (eventType === 'ceilingchangeend') {
          HSCore.Util.CustomizedModel.syncChildrenByWebCADDocument(parentEntity);
        }
      }
    }
  }

  /**
   * Receives and processes ceiling change events
   * @param eventType - Type of ceiling change event
   * @param updateData - Parameter update data for the event
   * @returns Always returns true after processing
   */
  public onReceive(eventType: CeilingChangeEvent, updateData: LightSlotParameterUpdate): boolean {
    switch (eventType) {
      case 'ceilingchangebegin':
        this._request = this.context.transManager.createRequest(
          this._requestType,
          [this._content, this._lightSlotId]
        );
        break;

      case 'ceilingchanging':
        this.changeProfileData(updateData, eventType);
        break;

      case 'ceilingchangeend':
        this.changeProfileData(updateData, eventType);
        this._commitRequest();
        break;
    }

    // Call parent implementation
    super.onReceive?.(eventType, updateData);
    
    return true;
  }
}

// Register command in HSApp plugin system
const pluginNamespace = HSApp.Util.Core.define('hsw.plugin.customizedmodeling.cmd');
pluginNamespace.CmdEditCustomizedModelLightSlot = CmdEditCustomizedModelLightSlot;

export default CmdEditCustomizedModelLightSlot;