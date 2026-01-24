/**
 * Module: module_189926
 * Original ID: 189926
 */

import { ContentPropertyBarHandler } from './904171';
import { HSApp } from './518193';
import { environment } from './323949';
import { HSCore } from './635589';

/**
 * Property bar data structure
 */
interface PropertyBarData {
  /** Data array for property bar population */
  data?: unknown[];
  [key: string]: unknown;
}

/**
 * Content property bar manager
 * Handles property bar population and customization for content entities
 */
export default class ContentPropertyBarManager {
  /** Internal handler for content property bar operations */
  private _contentPropertyBarHandler: ContentPropertyBarHandler;

  constructor() {
    this._contentPropertyBarHandler = new ContentPropertyBarHandler();
  }

  /**
   * Populates the property bar based on current selection and environment
   * @param data - Property bar data to populate
   */
  onPopulatePropertyBar(data: PropertyBarData): void {
    const activeEnvId = HSApp.App.getApp().environmentManager.activeEnvironmentId;

    // Skip if in ContentPartMaterialReplace environment
    if (activeEnvId === environment.ContentPartMaterialReplace) {
      return;
    }

    const tpzzEnvironments = [environment.TPZZ, environment.TPZZCabinet];

    // Skip if in TPZZ environments with valid data array
    if (
      activeEnvId &&
      tpzzEnvironments.includes(activeEnvId) &&
      data &&
      Array.isArray(data.data) &&
      data.data.length > 0
    ) {
      return;
    }

    const selectedEntities = HSApp.App.getApp().selectionManager.selected(true);

    // Skip if in AddRoofEnv or selection contains customized parametric roof
    if (
      [HSFPConstants.Environment.AddRoofEnv].includes(activeEnvId) ||
      selectedEntities.some((entity) => entity instanceof HSCore.Model.NCustomizedParametricRoof)
    ) {
      return;
    }

    // Skip if first selection is a group containing customization content
    if (selectedEntities[0] instanceof HSCore.Model.Group) {
      if (selectedEntities[0].members.find(this._isCustomizationContent)) {
        return;
      }
    }

    // Delegate to parent and content handler
    super.onPopulatePropertyBar(data);
    this._contentPropertyBarHandler.onPopulatePropertyBar(data);
  }

  /**
   * Replaces NCustomized molding type
   * @param entity - Entity to replace molding type for
   */
  replaceNCustomizedMoldingType(entity: unknown): void {
    this._contentPropertyBarHandler.replaceNCustomizedMoldingType(entity);
  }

  /**
   * Replaces customized molding type with new type
   * @param entity - Entity to replace molding type for
   * @param newType - New molding type to apply
   */
  replaceCustomizedMoldingType(entity: unknown, newType: unknown): void {
    this._contentPropertyBarHandler.replaceCustomizedMoldingType(entity, newType);
  }

  /**
   * Checks if entity is a customization content
   * @param entity - Entity to check
   * @returns True if entity is customization content
   */
  private _isCustomizationContent(entity: unknown): boolean {
    return HSCore.Util.Content.isCustomizationEntity(entity);
  }
}