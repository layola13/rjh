import { HSCore, HSApp, HSFPConstants, ResourceManager } from './types';
import { 
  getMoldingItemsV2, 
  getFaceMaterialPropertyBarItemsV2, 
  getFaceMoldingItemsV2, 
  getWalldecorationAdvancedItemsV2 
} from './utils';
import { BaseHelper } from './BaseHelper';

enum PropertyType {
  Molding = "Molding",
  Face = "Face"
}

interface PropertyConfig {
  key: PropertyType;
  handler: (context: PropertyContext) => boolean;
}

interface PropertyContext {
  data: PropertyBarItem[];
}

interface PropertyBarItem {
  type?: string;
  label?: string;
  enableDetailsInfo?: boolean;
  [key: string]: unknown;
}

interface Handler {
  entity: HSCore.Model.Entity;
  app: Application;
  contextualToolsPlugin: ContextualToolsPlugin;
  faceType?: string;
}

interface Application {
  selectionManager: SelectionManager;
  appSettings: AppSettings;
  environmentManager: EnvironmentManager;
  is3DViewActive(): boolean;
}

interface SelectionManager {
  selected(includeChildren: boolean): SelectedItem[];
}

interface SelectedItem {
  extOption?: unknown;
}

interface AppSettings {
  svgColorModel: number;
}

interface EnvironmentManager {
  isWallCeilingPlatformEnv(): boolean;
}

interface ContextualToolsPlugin {
  willShowPropertyBarItemsForWeb(): boolean;
}

export class RightPropertyHelper extends BaseHelper {
  private handler: Handler;
  private app: Application;

  constructor(handler: Handler) {
    super();
    this.handler = handler;
    this.app = handler.app;
    this._init();
  }

  private _init(): void {
    this._getConfigs().forEach((config) => {
      this.addConfig(config);
    });
  }

  private _getConfigs(): PropertyConfig[] {
    return [
      {
        key: PropertyType.Molding,
        handler: (context: PropertyContext): boolean => {
          const entity = this.handler.entity;
          const isCornice = entity instanceof HSCore.Model.Cornice;
          const isBaseboard = entity instanceof HSCore.Model.Baseboard;
          const isMitre = entity instanceof HSCore.Model.Mitre;

          if (isCornice || isBaseboard || isMitre) {
            const host = entity.host;
            const moldingItems = getMoldingItemsV2(
              host,
              {
                isBaseboard,
                isCornice,
                isMitre
              },
              this.handler
            );
            context.data.push(...moldingItems);
            return true;
          }
          return false;
        }
      },
      {
        key: PropertyType.Face,
        handler: (context: PropertyContext): boolean => {
          const entity = this.handler.entity;
          const selectedItems = this.app.selectionManager.selected(false);

          if (!this.app.is3DViewActive() && this.app.appSettings.svgColorModel !== 0) {
            return true;
          }

          if (this.handler.contextualToolsPlugin.willShowPropertyBarItemsForWeb()) {
            const isFace = entity instanceof HSCore.Model.Face;

            if (this.app.environmentManager.isWallCeilingPlatformEnv()) {
              return true;
            }

            if (isFace && !HSApp.Util.Face.isFaceGroup(entity)) {
              const faceType = HSCore.Material.Util.getFaceType(entity, selectedItems[0]?.extOption) 
                || this.handler.faceType;
              
              let label = ResourceManager.getString("plugin_right_propertybar_wall");
              
              let materialItems = getFaceMaterialPropertyBarItemsV2(entity, faceType, this.handler);
              const moldingItems = getFaceMoldingItemsV2(entity, this.handler);
              materialItems = materialItems.concat(moldingItems);

              if (faceType === "top") {
                label = HSApp.Util.Room.getRoomTypeDisplayName(entity);
              } else if (faceType === "bottom") {
                label = ResourceManager.getString("plugin_customizedModeling_type_ceiling");
              }

              context.data.push({
                type: HSFPConstants.PropertyBarType.PropertyBar,
                label,
                enableDetailsInfo: true
              });

              context.data.push(...materialItems);
            } else if (isFace) {
              const advancedItems = getWalldecorationAdvancedItemsV2();
              context.data.push(...advancedItems);
            }

            return true;
          }

          return false;
        }
      }
    ];
  }
}