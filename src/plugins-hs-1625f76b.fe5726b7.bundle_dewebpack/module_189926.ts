import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { ContentPropertyBarHandler } from './ContentPropertyBarHandler';

enum Environment {
  ContentPartMaterialReplace = 'ContentPartMaterialReplace',
  TPZZ = 'TPZZ',
  TPZZCabinet = 'TPZZCabinet',
  AddRoofEnv = 'AddRoofEnv'
}

interface PropertyBarData {
  data?: unknown[];
}

class PropertyBarManager {
  private _contentPropertyBarHandler: ContentPropertyBarHandler;

  constructor() {
    this._contentPropertyBarHandler = new ContentPropertyBarHandler();
  }

  onPopulatePropertyBar(propertyBarData: PropertyBarData): void {
    const activeEnvId = HSApp.App.getApp().environmentManager.activeEnvironmentId;

    if (activeEnvId === Environment.ContentPartMaterialReplace) {
      return;
    }

    const specialEnvironments = [Environment.TPZZ, Environment.TPZZCabinet];

    if (
      activeEnvId &&
      specialEnvironments.includes(activeEnvId as Environment) &&
      propertyBarData &&
      Array.isArray(propertyBarData.data) &&
      propertyBarData.data.length > 0
    ) {
      return;
    }

    const selectedItems = HSApp.App.getApp().selectionManager.selected(true);

    if (
      [Environment.AddRoofEnv].includes(activeEnvId as Environment) ||
      selectedItems.some((item) => item instanceof HSCore.Model.NCustomizedParametricRoof)
    ) {
      return;
    }

    if (selectedItems[0] instanceof HSCore.Model.Group) {
      if (selectedItems[0].members.find(this._isCustomizationContent)) {
        return;
      }
    }

    this._contentPropertyBarHandler.onPopulatePropertyBar(propertyBarData);
  }

  replaceNCustomizedMoldingType(moldingType: unknown): void {
    this._contentPropertyBarHandler.replaceNCustomizedMoldingType(moldingType);
  }

  replaceCustomizedMoldingType(moldingType: unknown, parameter: unknown): void {
    this._contentPropertyBarHandler.replaceCustomizedMoldingType(moldingType, parameter);
  }

  private _isCustomizationContent(entity: unknown): boolean {
    return HSCore.Util.Content.isCustomizationEntity(entity);
  }
}

export default PropertyBarManager;