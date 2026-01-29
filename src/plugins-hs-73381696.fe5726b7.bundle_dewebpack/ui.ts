enum MoldingTypeEnum {
  Baseboard = "Baseboard",
  Cornice = "Cornice"
}

enum PropertyBarType {
  FirstLevelNode = "FirstLevelNode",
  SecondLevelNode = "SecondLevelNode",
  ThirdLevelNode = "ThirdLevelNode",
  ImageButton = "ImageButton",
  LengthInput = "LengthInput"
}

enum PropertyBarControlTypeEnum {
  imageButton = "imageButton"
}

enum LogGroupTypes {
  CatalogOperation = "CatalogOperation"
}

interface MoldingMaterial {
  seekId: string;
  color: string;
  metadata?: unknown;
}

interface Molding {
  thickness: number;
  height: number;
  material?: MoldingMaterial;
  metadata?: unknown;
}

interface MoldingSizeParams {
  height?: number;
  thickness?: number;
}

interface MoldingParams {
  disabled: boolean;
  baseboardType: string | Promise<{ imgSrc: string }>;
  baseboardTexture: string | Promise<{ imgSrc: string }>;
  baseboardColor: string;
  baseboardThickness: number;
  baseboardHeight: number;
  gypsum: string | Promise<{ imgSrc: string }>;
  corniceTexture: string | Promise<{ imgSrc: string }>;
  corniceColor: string;
  corniceThickness: number;
  corniceHeight: number;
}

interface PropertyBarItem {
  id: string;
  parentId?: string;
  label?: string;
  type: PropertyBarType | PropertyBarControlTypeEnum;
  order: number;
  status?: boolean;
  items?: PropertyBarItem[];
  className?: string;
  data?: unknown;
  onStatusChange?: (enabled: boolean) => void;
}

interface RightMenuItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  src: string;
  label: string;
  onClick: () => void;
}

interface Product {
  thumbnail: string;
}

interface CatalogManager {
  getProductBySeekId(seekId: string): Promise<Product>;
}

interface Handler {
  onAddMolding(enabled: boolean, moldingType: MoldingTypeEnum): void;
  onBaseboardTypeHandler(): void;
  onBaseboardTextureHandler(): void;
  onCorniceTypeHandler(): void;
  onCorniceTextureHandler(): void;
  onMoldingSizeHandler(params: MoldingSizeParams, moldingType: MoldingTypeEnum): void;
}

interface ModelEntity {
  getMolding(moldingType: MoldingTypeEnum): Molding | null;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

interface Constants {
  DEFAULT_MOLDING_PARAM: {
    MIN_HEIGHT: number;
    MAX_HEIGHT: number;
  };
}

interface UserTrackLogger {
  push(eventName: string, options: { description: string; group: LogGroupTypes }): void;
}

interface App {
  signalPropertyBarRefresh: {
    dispatch(): void;
  };
  userTrackLogger: UserTrackLogger;
  is3DViewActive(): boolean;
  pluginManager: {
    getPlugin(pluginType: string): {
      onUIAddMaterialBtnClk(entity: unknown): void;
    };
  };
}

interface CatalogPlugin {
  // Add catalog plugin specific methods if needed
}

interface ContextualToolPlugin {
  // Add contextual tool plugin specific methods if needed
}

const IMAGE_TYPES = {
  baseboardType: "baseboardType",
  baseboardTexture: "baseboardTexture",
  corniceType: "corniceType",
  color: "color"
} as const;

type ImageType = typeof IMAGE_TYPES[keyof typeof IMAGE_TYPES];

export class UI {
  private readonly _handler: Handler;
  private readonly _moldingTypes: MoldingTypeEnum[];
  private readonly _imgTypes: typeof IMAGE_TYPES;
  private readonly _catalogPlugin: CatalogPlugin;
  private readonly _catalogManager: CatalogManager;
  private readonly _contextualToolPlugin: ContextualToolPlugin;

  public baseboardEnabled: boolean;
  public corniceEnabled: boolean;
  public disableMolding: boolean;
  public sliderOffsetX: number;
  public sliderOffsetY: number;
  public sliderRangeX: number;
  public sliderRangeY: number;

  constructor(
    handler: Handler,
    catalogManager: CatalogManager,
    catalogPlugin: CatalogPlugin,
    contextualToolPlugin: ContextualToolPlugin
  ) {
    this._handler = handler;
    this._moldingTypes = [MoldingTypeEnum.Baseboard, MoldingTypeEnum.Cornice];
    this._imgTypes = IMAGE_TYPES;
    this._catalogPlugin = catalogPlugin;
    this._catalogManager = catalogManager;
    this._contextualToolPlugin = contextualToolPlugin;
    this.baseboardEnabled = false;
    this.corniceEnabled = false;
    this.disableMolding = false;
    this.sliderOffsetX = 0;
    this.sliderOffsetY = 0;
    this.sliderRangeX = 1;
    this.sliderRangeY = 1;
  }

  public getMoldingParam(entity: ModelEntity): MoldingParams {
    const getImageOrTexture = (
      entity: ModelEntity,
      moldingType: MoldingTypeEnum,
      imageType: ImageType
    ): string | Promise<{ imgSrc: string }> => {
      const molding = entity.getMolding(moldingType);
      if (!molding) return "";

      switch (imageType) {
        case this._imgTypes.baseboardType:
          return molding.metadata?.thumbnail ?? "";
        case this._imgTypes.baseboardTexture:
          const material = molding.material;
          return material
            ? this._catalogManager.getProductBySeekId(material.seekId).then((product) => ({
                imgSrc: product.thumbnail
              }))
            : "";
        case this._imgTypes.color:
          const mat = molding.material;
          return mat ? mat.color : "";
        default:
          return "";
      }
    };

    const getSize = (
      entity: ModelEntity,
      moldingType: MoldingTypeEnum,
      sizeType: "thickness" | "height"
    ): number => {
      const molding = entity.getMolding(moldingType);
      if (!molding) return 0;

      switch (sizeType) {
        case "thickness":
          return molding.thickness;
        case "height":
          return molding.height;
        default:
          return 0;
      }
    };

    const params: MoldingParams = {
      disabled: this.disableMolding,
      baseboardType: getImageOrTexture(entity, MoldingTypeEnum.Baseboard, this._imgTypes.baseboardType),
      baseboardTexture: getImageOrTexture(entity, MoldingTypeEnum.Baseboard, this._imgTypes.baseboardTexture),
      baseboardColor: getImageOrTexture(entity, MoldingTypeEnum.Baseboard, this._imgTypes.color) as string,
      baseboardThickness: getSize(entity, MoldingTypeEnum.Baseboard, "thickness"),
      baseboardHeight: getSize(entity, MoldingTypeEnum.Baseboard, "height"),
      gypsum: getImageOrTexture(entity, MoldingTypeEnum.Cornice, this._imgTypes.baseboardType),
      corniceTexture: getImageOrTexture(entity, MoldingTypeEnum.Cornice, this._imgTypes.baseboardTexture),
      corniceColor: getImageOrTexture(entity, MoldingTypeEnum.Cornice, this._imgTypes.color) as string,
      corniceThickness: getSize(entity, MoldingTypeEnum.Cornice, "thickness"),
      corniceHeight: getSize(entity, MoldingTypeEnum.Cornice, "height")
    };

    return params;
  }

  public updateMoldingEnableStatus(entity: ModelEntity | null): void {
    if (entity) {
      const baseboardMolding = entity.getMolding(MoldingTypeEnum.Baseboard);
      this.baseboardEnabled = baseboardMolding !== null;

      const corniceMolding = entity.getMolding(MoldingTypeEnum.Cornice);
      this.corniceEnabled = corniceMolding !== null;
    }
  }

  public initPropertyBarItemsV2(entity: ModelEntity): PropertyBarItem[] {
    const propertyBarItems: PropertyBarItem[] = [];
    const app = (globalThis as any).HSApp?.App?.getApp() as App;

    this.updateMoldingEnableStatus(entity);

    const moldingParams = this.getMoldingParam(entity);
    if (moldingParams.disabled) {
      return [];
    }

    propertyBarItems.push({
      id: "style-setting-first-level",
      label: (globalThis as any).ResourceManager?.getString("plugin_propertybar_style_setting") ?? "Style Setting",
      type: PropertyBarType.FirstLevelNode,
      items: [],
      order: 20,
      className: "style-setting-first-level"
    });

    const baseboardNode: PropertyBarItem = {
      id: "enableMoldingBaseboard",
      parentId: "style-setting-first-level",
      label: (globalThis as any).ResourceManager?.getString("plugin_walldecoration_molding_baseboard_title") ?? "Baseboard",
      type: PropertyBarType.SecondLevelNode,
      order: 10,
      status: this.baseboardEnabled,
      onStatusChange: (enabled: boolean) => {
        this._handler.onAddMolding(enabled, MoldingTypeEnum.Baseboard);
        this.baseboardEnabled = enabled;
        app?.signalPropertyBarRefresh?.dispatch();
      },
      items: []
    };
    propertyBarItems.push(baseboardNode);

    if (this.baseboardEnabled) {
      const baseboard = entity.getMolding(MoldingTypeEnum.Baseboard);
      const baseboardMetadata = baseboard?.metadata;

      const baseboardStyleNode: PropertyBarItem = {
        id: "baseboardStyle",
        parentId: "enableMoldingBaseboard",
        label: (globalThis as any).ResourceManager?.getString("plugin_customizedcabinet_style") ?? "Style",
        type: PropertyBarType.ThirdLevelNode,
        order: 10,
        items: [
          {
            id: "baseboardStyleImageButton",
            type: PropertyBarType.ImageButton,
            order: 10,
            data: {
              src: moldingParams.baseboardType,
              meta: baseboardMetadata,
              onClick: () => {
                this._handler.onBaseboardTypeHandler();
                app?.userTrackLogger?.push("replaceColumnBaseboardType", {
                  description: "替换柱子踢脚线样式",
                  group: LogGroupTypes.CatalogOperation
                });
              }
            }
          }
        ]
      };
      propertyBarItems.push(baseboardStyleNode);

      const baseboardMaterialMetadata = baseboard?.material?.metadata;
      const baseboardMaterialNode: PropertyBarItem = {
        id: "baseboardMaterial",
        parentId: "enableMoldingBaseboard",
        label: (globalThis as any).ResourceManager?.getString("plugin_right_propertybar_curtain_material") ?? "Material",
        type: PropertyBarType.ThirdLevelNode,
        order: 20,
        items: [
          {
            id: "baseboardMaterialButton",
            type: PropertyBarType.ImageButton,
            order: 10,
            data: {
              asyncParam: moldingParams.baseboardTexture,
              color: moldingParams.baseboardColor,
              meta: baseboardMaterialMetadata,
              onClick: () => {
                this._handler.onBaseboardTextureHandler();
                app?.userTrackLogger?.push("replaceColumnBaseboardTexture", {
                  description: "替换柱子踢脚线材质",
                  group: LogGroupTypes.CatalogOperation
                });
              }
            }
          }
        ]
      };
      propertyBarItems.push(baseboardMaterialNode);

      const constants = (globalThis as any).HSConstants?.Constants as Constants;
      const baseboardSizeNode: PropertyBarItem = {
        id: "baseboardSize",
        parentId: "enableMoldingBaseboard",
        label: (globalThis as any).ResourceManager?.getString("plugin_propertybar_size") ?? "Size",
        type: PropertyBarType.ThirdLevelNode,
        order: 30,
        items: [
          {
            id: "baseboardHeightInput",
            type: PropertyBarType.LengthInput,
            order: 10,
            data: {
              label: (globalThis as any).ResourceManager?.getString("plugin_right_propertybar_walldecoration_molding_height") ?? "Height",
              options: {
                showTunningButtons: false,
                rules: {
                  range: {
                    min: constants?.DEFAULT_MOLDING_PARAM?.MIN_HEIGHT ?? 0,
                    max: constants?.DEFAULT_MOLDING_PARAM?.MAX_HEIGHT ?? 1000
                  },
                  positiveOnly: true
                },
                includeUnit: true
              },
              value: moldingParams.baseboardHeight,
              onValueChange: (event: ValueChangeEvent) => {
                this._handler.onMoldingSizeHandler(
                  { height: event.detail.value },
                  MoldingTypeEnum.Baseboard
                );
              }
            }
          },
          {
            id: "baseboardWidthInput",
            type: PropertyBarType.LengthInput,
            order: 20,
            data: {
              label: (globalThis as any).ResourceManager?.getString("plugin_right_propertybar_walldecoration_molding_width") ?? "Width",
              labelPosition: "left",
              options: {
                showTunningButtons: false,
                rules: {
                  range: {
                    min: constants?.DEFAULT_MOLDING_PARAM?.MIN_HEIGHT ?? 0,
                    max: constants?.DEFAULT_MOLDING_PARAM?.MAX_HEIGHT ?? 1000
                  },
                  positiveOnly: true
                },
                includeUnit: true
              },
              value: moldingParams.baseboardThickness,
              onValueChange: (event: ValueChangeEvent) => {
                this._handler.onMoldingSizeHandler(
                  { thickness: event.detail.value },
                  MoldingTypeEnum.Baseboard
                );
              }
            }
          }
        ]
      };
      propertyBarItems.push(baseboardSizeNode);
    }

    const corniceNode: PropertyBarItem = {
      id: "enableMoldingCornice",
      parentId: "style-setting-first-level",
      label: (globalThis as any).ResourceManager?.getString("plugin_walldecoration_molding_gypsum_title") ?? "Cornice",
      type: PropertyBarType.SecondLevelNode,
      order: 10,
      status: this.corniceEnabled,
      onStatusChange: (enabled: boolean) => {
        this._handler.onAddMolding(enabled, MoldingTypeEnum.Cornice);
        this.corniceEnabled = enabled;
        app?.signalPropertyBarRefresh?.dispatch();
      },
      items: []
    };
    propertyBarItems.push(corniceNode);

    if (this.corniceEnabled) {
      const cornice = entity.getMolding(MoldingTypeEnum.Cornice);
      const corniceMetadata = cornice?.metadata;

      const corniceStyleNode: PropertyBarItem = {
        id: "corniceStyle",
        parentId: "enableMoldingCornice",
        label: (globalThis as any).ResourceManager?.getString("plugin_customizedcabinet_style") ?? "Style",
        type: PropertyBarType.ThirdLevelNode,
        order: 10,
        items: [
          {
            id: "corniceStyleImageButton",
            type: PropertyBarType.ImageButton,
            order: 10,
            data: {
              src: moldingParams.gypsum,
              meta: corniceMetadata,
              onClick: () => {
                this._handler.onCorniceTypeHandler();
                app?.userTrackLogger?.push("replaceColumnCorniceType", {
                  description: "替换柱子石膏线样式",
                  group: LogGroupTypes.CatalogOperation
                });
              }
            }
          }
        ]
      };
      propertyBarItems.push(corniceStyleNode);

      const corniceMaterialMetadata = cornice?.material?.metadata;
      const corniceMaterialNode: PropertyBarItem = {
        id: "corniceMaterial",
        parentId: "enableMoldingCornice",
        label: (globalThis as any).ResourceManager?.getString("plugin_right_propertybar_curtain_material") ?? "Material",
        type: PropertyBarType.ThirdLevelNode,
        order: 20,
        items: [
          {
            id: "corniceMaterialButton",
            type: PropertyBarType.ImageButton,
            order: 10,
            data: {
              asyncParam: moldingParams.corniceTexture,
              color: moldingParams.corniceColor,
              meta: corniceMaterialMetadata,
              onClick: () => {
                this._handler.onCorniceTextureHandler();
                app?.userTrackLogger?.push("replaceColumnCorniceTexture", {
                  description: "替换柱子石膏线材质",
                  group: LogGroupTypes.CatalogOperation
                });
              }
            }
          }
        ]
      };
      propertyBarItems.push(corniceMaterialNode);

      const constants = (globalThis as any).HSConstants?.Constants as Constants;
      const corniceSizeNode: PropertyBarItem = {
        id: "corniceSize",
        parentId: "enableMoldingCornice",
        label: (globalThis as any).ResourceManager?.getString("plugin_propertybar_size") ?? "Size",
        type: PropertyBarType.ThirdLevelNode,
        order: 30,
        items: [
          {
            id: "corniceHeightInput",
            type: PropertyBarType.LengthInput,
            order: 10,
            data: {
              label: (globalThis as any).ResourceManager?.getString("plugin_right_propertybar_walldecoration_molding_height") ?? "Height",
              options: {
                showTunningButtons: false,
                rules: {
                  range: {
                    min: constants?.DEFAULT_MOLDING_PARAM?.MIN_HEIGHT ?? 0,
                    max: constants?.DEFAULT_MOLDING_PARAM?.MAX_HEIGHT ?? 1000
                  },
                  positiveOnly: true
                },
                includeUnit: true
              },
              value: moldingParams.corniceHeight,
              onValueChange: (event: ValueChangeEvent) => {
                this._handler.onMoldingSizeHandler(
                  { height: event.detail.value },
                  MoldingTypeEnum.Cornice
                );
              }
            }
          },
          {
            id: "corniceWidthInput",
            type: PropertyBarType.LengthInput,
            order: 20,
            data: {
              label: (globalThis as any).ResourceManager?.getString("plugin_right_propertybar_walldecoration_molding_width") ?? "Width",
              labelPosition: "left",
              options: {
                showTunningButtons: false,
                rules: {
                  range: {
                    min: constants?.DEFAULT_MOLDING_PARAM?.MIN_HEIGHT ?? 0,
                    max: constants?.DEFAULT_MOLDING_PARAM?.MAX_HEIGHT ?? 1000
                  },
                  positiveOnly: true
                },
                includeUnit: true
              },
              value: moldingParams.corniceThickness,
              onValueChange: (event: ValueChangeEvent) => {
                this._handler.onMoldingSizeHandler(
                  { thickness: event.detail.value },
                  MoldingTypeEnum.Cornice
                );
              }
            }
          }
        ]
      };
      propertyBarItems.push(corniceSizeNode);
    }

    return propertyBarItems;
  }

  public initRightMenuItems(entity: unknown): RightMenuItem[] {
    const menuItems: RightMenuItem[] = [];
    const app = (globalThis as any).HSApp?.App?.getApp() as App;

    if (app?.is3DViewActive() && entity instanceof (globalThis as any).HSCore?.Model?.Obstacle) {
      menuItems.push({
        id: "replacematerial",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 101,
        src: "replace_material",
        label: (globalThis as any).ResourceManager?.getString("mixpaint_replace_material") ?? "Replace Material",
        onClick: () => {
          app.pluginManager
            .getPlugin((globalThis as any).HSFPConstants?.PluginType?.CustomizedModeling)
            .onUIAddMaterialBtnClk(entity);
        }
      });
    }

    return menuItems;
  }
}