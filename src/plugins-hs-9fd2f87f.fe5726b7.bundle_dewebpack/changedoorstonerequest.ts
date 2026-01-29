interface MaterialData {
  seekId: string;
  isSame(other: MaterialData): boolean;
  [key: string]: unknown;
}

interface Opening {
  getBottomFaceMaterial(): MaterialData | null;
  setBottomFaceMaterial(material: MaterialData): void;
  bottomFaceMaterial?: MaterialData;
}

interface TransactionRequest {
  onCommit(): void;
  onUndo(): void;
  onRedo(): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface StatusBarControl {
  update(options: { isActive: boolean }): void;
}

interface StatusBar {
  getStatusBarControlById(id: string): StatusBarControl | null;
}

interface Plugin {
  refresh(target: undefined, options: { refreshStatusBar: boolean }): void;
  update(): void;
  generateAlignRectPattern(material: MaterialData, opening: Opening): Promise<MaterialData>;
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin | null;
}

interface App {
  pluginManager: PluginManager;
}

interface FilterOption {
  categoryType: string;
  filters: Record<string, string>;
  sceneType: string;
}

interface CatalogOptions {
  types: string;
  customerCategories: string[];
  seekId?: string;
  optionFilters?: FilterOption[];
}

interface ProductSelectedEvent {
  seekId: string;
  [key: string]: unknown;
}

interface PanelHandlers {
  productSelectedHandler(event: ProductSelectedEvent, context: { transManager: TransactionManager }): void;
  panelShownHandler(): void;
  panelHiddenHandler(): void;
}

export class ChangeDoorStoneRequest implements TransactionRequest {
  private readonly _opening: Opening;
  private readonly _materialData: MaterialData;
  private _savedMaterial?: MaterialData | null;

  constructor(opening: Opening, materialData: MaterialData) {
    this._opening = opening;
    this._materialData = materialData;
  }

  onCommit(): void {
    this._changeDoorStone(this._materialData);
  }

  onUndo(): void {
    if (this._savedMaterial) {
      this._changeDoorStone(this._savedMaterial);
    }
  }

  onRedo(): void {
    if (this._savedMaterial) {
      this._changeDoorStone(this._savedMaterial);
    }
  }

  private _changeDoorStone(material: MaterialData): void {
    const opening = this._opening;
    this._savedMaterial = opening.getBottomFaceMaterial();
    opening.setBottomFaceMaterial(material);
  }
}

export default function createDoorStoneHandler(
  statusBar: StatusBar,
  context: {
    PanelId: { Recent: string; UploadModel: string };
    transManager: TransactionManager;
  }
): (openings: Opening[]) => [CatalogOptions, PanelHandlers] {
  return (openings: Opening[]): [CatalogOptions, PanelHandlers] => {
    const [opening] = openings;

    const catalogOptions: CatalogOptions = {
      types: HSCatalog.CategoryTypeEnum.ext_doorThreshold,
      customerCategories: [context.PanelId.Recent, context.PanelId.UploadModel]
    };

    if (HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID) {
      const optionFilters: FilterOption[] = [
        {
          categoryType: HSCatalog.CategoryTypeEnum.Filter2D,
          filters: {},
          sceneType: HSApp.Catalog.DataConfig.SceneType.Material
        }
      ];

      optionFilters[0].filters[HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_ID] =
        HSApp.PartnerConfig.PRODUCTS_IS_2D_MODEL_ATTR_VALUE;

      catalogOptions.optionFilters = optionFilters;
    }

    const handlers: PanelHandlers = {
      productSelectedHandler: async (event: ProductSelectedEvent, transContext: { transManager: TransactionManager }): Promise<void> => {
        const materialManager = HSCore.Material.Manager.instance();
        
        if (!materialManager.getMetaData(event.seekId)) {
          materialManager.setMetaData(event);
        }

        const currentMaterial = opening.bottomFaceMaterial;

        if (!currentMaterial || !currentMaterial.isSame(event as unknown as MaterialData)) {
          const materialData = HSCore.Material.Util.getMaterialData(event);

          const applyMaterial = async (material: MaterialData): Promise<void> => {
            const doorStonePlugin = HSApp.App.getApp().pluginManager.getPlugin(
              HSFPConstants.PluginType.DoorStone
            );

            const alignedPattern = await doorStonePlugin?.generateAlignRectPattern(material, opening);

            if (alignedPattern) {
              const request = transContext.transManager.createRequest(
                HSFPConstants.RequestType.ChangeDoorStone,
                [opening, alignedPattern]
              );

              transContext.transManager.commit(request);

              const contextualToolsPlugin = HSApp.App.getApp().pluginManager.getPlugin(
                HSFPConstants.PluginType.ContextualTools
              );
              contextualToolsPlugin?.refresh(undefined, { refreshStatusBar: false });

              const propertyBarPlugin = HSApp.App.getApp().pluginManager.getPlugin(
                HSFPConstants.PluginType.PropertyBar
              );
              propertyBarPlugin?.update();
            }
          };

          await applyMaterial(materialData);
        }
      },

      panelShownHandler: (): void => {
        const wallPaperButton = statusBar.getStatusBarControlById('wallPaperButton');
        wallPaperButton?.update({ isActive: true });
      },

      panelHiddenHandler: (): void => {
        const wallPaperButton = statusBar.getStatusBarControlById('wallPaperButton');
        wallPaperButton?.update({ isActive: false });
      }
    };

    const bottomFaceMaterial = opening.getBottomFaceMaterial();
    if (bottomFaceMaterial) {
      catalogOptions.seekId = bottomFaceMaterial.seekId;
    }

    return [catalogOptions, handlers];
  };
}