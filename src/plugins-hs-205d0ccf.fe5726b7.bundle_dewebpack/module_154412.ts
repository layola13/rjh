export interface PropertyBarItem {
  id: string;
  parentId?: string;
  type: string;
  label: string;
  order: number;
  items?: PropertyBarSubItem[];
}

export interface PropertyBarSubItem {
  id: string;
  order: number;
  type: string;
  data: ImageButtonData | DropdownListData;
}

export interface ImageButtonData {
  src: string;
  color?: number;
  seekId?: string;
  onClick: () => void;
}

export interface DropdownListData {
  prompt: string;
  options: DropdownOption[];
  defaultKey: string;
  className: string;
  title: string;
  onchange: (value: string) => void;
}

export interface DropdownOption {
  id: string;
  label: string;
  icon: unknown;
}

export interface RightMenuItem {
  id: string;
  type: string;
  order: number;
  src: string;
  label: string;
  onClick: (event: unknown) => void;
}

export interface Handler {
  getMaterialSeekId(): string | undefined;
  onObstacleMaterialClicked(): void;
  refreshPropertyBarV2(): void;
  refreshStatusBar(): void;
}

export interface CatalogPlugin {
  // Define catalog plugin interface methods as needed
}

export interface CatalogManager {
  // Define catalog manager interface methods as needed
}

export interface ContextualToolPlugin {
  // Define contextual tool plugin interface methods as needed
}

export interface ContentEntity {
  getMaterialData(): Map<unknown, HSCore.Material.Material>;
  alignToWallType: string;
}

export interface ViewContext {
  is3DView(): boolean;
}

export default class PropertyBarManager {
  private readonly _handler: Handler;
  private readonly _catalogPlugin: CatalogPlugin;
  private readonly _catalogManager: CatalogManager;
  private readonly _contextualToolPlugin: ContextualToolPlugin;

  constructor(
    handler: Handler,
    catalogManager: CatalogManager,
    catalogPlugin: CatalogPlugin,
    contextualToolPlugin: ContextualToolPlugin
  ) {
    this._handler = handler;
    this._catalogPlugin = catalogPlugin;
    this._catalogManager = catalogManager;
    this._contextualToolPlugin = contextualToolPlugin;
  }

  initPropertyBarItemsV2(entity: ContentEntity, viewContext: ViewContext): PropertyBarItem[] {
    const items: PropertyBarItem[] = [];
    const materialData = entity.getMaterialData().values().next().value ?? new HSCore.Material.Material();

    if (viewContext.is3DView()) {
      items.push({
        id: "beamMaterial",
        parentId: "content-base-property",
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        label: ResourceManager.getString("plugin_right_propertybar_material"),
        order: 100,
        items: [
          {
            id: "obstacleMaterialButton",
            order: 10,
            type: HSFPConstants.PropertyBarType.ImageButton,
            data: {
              src: materialData.iconSmallURI ? HSApp.Util.Url.getCNameURL(materialData.iconSmallURI) : "",
              color: materialData.color,
              seekId: this._handler.getMaterialSeekId(),
              onClick: () => {
                this._handler.onObstacleMaterialClicked();
                this._handler.refreshPropertyBarV2();
              }
            }
          }
        ]
      });
    } else {
      const alignIcons: Record<string, unknown> = {
        edge: edgeIcon,
        center: centerIcon
      };

      const alignOptions: DropdownOption[] = Object.keys(HSCore.Model.AlignToWallTypeEnum).map((alignType) => {
        const icon = alignIcons[alignType];
        const labelKey = `align_to_wall_type_${alignType}`;
        return {
          id: alignType,
          label: ResourceManager.getString(labelKey),
          icon
        };
      });

      items.push({
        id: "beamProperty",
        parentId: "content-base-property",
        type: HSFPConstants.PropertyBarType.ThirdLevelNode,
        label: ResourceManager.getString("common_attribute"),
        order: 100,
        items: [
          {
            id: "alignToWallTypeDropdown",
            order: 10,
            type: HSFPConstants.PropertyBarType.DropdownList,
            data: {
              prompt: "",
              options: alignOptions,
              defaultKey: entity.alignToWallType,
              className: "alignToWallTypeDropdown",
              title: ResourceManager.getString("plugin_right_propertybar_align_to_wall_type"),
              onchange: (selectedValue: string) => {
                entity.alignToWallType = selectedValue;
                HSApp.App.getApp().signalContextualtoolRefresh.dispatch();
              }
            }
          }
        ]
      });
    }

    return items;
  }

  initRightMenuItems(entity: unknown): RightMenuItem[] {
    const menuItems: RightMenuItem[] = [];
    const app = HSApp.App.getApp();

    if (app && app.is3DViewActive() && HSCore.Util.Content.isRoofObstacle(entity)) {
      if (entity instanceof HSCore.Model.NCustomizedStructure || entity instanceof HSCore.Model.NCustomizedBeam) {
        return menuItems;
      }

      menuItems.push({
        id: "replacematerial",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 101,
        src: "replace_material",
        label: ResourceManager.getString("mixpaint_replace_material"),
        onClick: () => {
          this._handler.onObstacleMaterialClicked();
          this._handler.refreshStatusBar();
        }
      });
    }

    return menuItems;
  }
}