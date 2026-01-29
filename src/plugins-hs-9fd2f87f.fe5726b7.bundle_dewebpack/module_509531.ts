namespace HSW.Plugin.CustomizedModeling {
  export class MetaProcess {
    public availableFeatureWallIndex: number = 1;
    public availablePlatformIndex: number = 1;
    public availableFixedFurnitureIndex: number = 1;
    public availableCeilingIndex: number = 1;
    public availableFloorIndex: number = 1;
    public availableFurnitureIndex: number = 1;
    public availablePersonalizedModelIndex: number = 1;

    private readonly customizedContentTypes: HSCatalog.ContentTypeEnum[] = [
      HSCatalog.ContentTypeEnum.CustomizedFeaturewall,
      HSCatalog.ContentTypeEnum.CustomizedPlatform,
      HSCatalog.ContentTypeEnum.CustomizedFixedFurniture,
      HSCatalog.ContentTypeEnum.CustomizedCeiling,
      HSCatalog.ContentTypeEnum.CustomizedFloor,
      HSCatalog.ContentTypeEnum.CustomizedFurniture,
      HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel,
      HSCatalog.ContentTypeEnum.SmartCustomizedCeiling,
      HSCatalog.ContentTypeEnum.Flue,
      HSCatalog.ContentTypeEnum.Riser,
      HSCatalog.ContentTypeEnum.Beam,
      HSCatalog.ContentTypeEnum.SewerPipeRound,
      HSCatalog.ContentTypeEnum.SewerPipeSquare,
      HSCatalog.ContentTypeEnum.ColumnDiyRound,
      HSCatalog.ContentTypeEnum.ColumnDiySquare,
      HSCatalog.ContentTypeEnum.CustomizedBackgroundModel,
      HSCatalog.ContentTypeEnum.CustomizedWainscot,
      HSCatalog.ContentTypeEnum.CustomizedPMInstanceModel
    ];

    public action = {
      edit: (item: CatalogItem): void => {
        if (adskUser.isLogin()) {
          HSApp.App.getApp()
            .pluginManager.getPlugin(HSFPConstants.PluginType.MyGroup)
            .showProductRename(item);
        }
      },

      delete: (item: CatalogItem, contentType: HSCatalog.ContentTypeEnum): void => {
        if (!adskUser.isLogin()) {
          return;
        }

        let categoryType: NWTK.api.catalog.UserDataCategoryType | undefined;

        if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedCeiling)) {
          categoryType = NWTK.api.catalog.UserDataCategoryType.Ceiling;
        } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel)) {
          categoryType = NWTK.api.catalog.UserDataCategoryType.PersonalizedModel;
        } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPlatform)) {
          categoryType = NWTK.api.catalog.UserDataCategoryType.Platform;
        } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFixedFurniture)) {
          categoryType = NWTK.api.catalog.UserDataCategoryType.FixedFurniture;
        } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFloor)) {
          categoryType = NWTK.api.catalog.UserDataCategoryType.Floor;
        } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFurniture)) {
          categoryType = NWTK.api.catalog.UserDataCategoryType.Furniture;
        }

        LiveHint.show(
          ResourceManager.getString("plugin_customtails_delete"),
          undefined,
          null,
          { status: "loading" }
        );

        const catalogPlugin = HSApp.App.getApp().pluginManager.getPlugin(
          HSFPConstants.PluginType.Catalog
        );

        if (catalogPlugin) {
          catalogPlugin.deleteProduct(item.id).then(
            (): void => {
              LiveHint.show(
                ResourceManager.getString("plugin_customtails_delete_success"),
                6000,
                null,
                { status: "completed" }
              );
            },
            (): void => {
              LiveHint.show(
                ResourceManager.getString("plugin_customtails_delete_error"),
                6000,
                null,
                { status: "warning" }
              );
            }
          );
        }
      }
    };

    /**
     * Process catalog item metadata and enrich it with customization information
     */
    public process(item: CatalogItem, attributes: CatalogAttributes): CatalogItem {
      if (
        !item.contentType.isTypeOf(this.customizedContentTypes) ||
        item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPMInstanceModel)
      ) {
        return item;
      }

      let extractedIndex: number = -1;
      let customPrefix: string = "";

      if (item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFeaturewall)) {
        customPrefix = ResourceManager.getString("plugin_catalog_diyfeaturewalls_mycustome");
        if (item.name.includes(customPrefix)) {
          extractedIndex = parseInt(item.name.substr(item.name.indexOf(customPrefix) + customPrefix.length));
        }
        if (extractedIndex >= this.availableFeatureWallIndex) {
          this.availableFeatureWallIndex = extractedIndex + 1;
        }
      } else if (item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPlatform)) {
        customPrefix = ResourceManager.getString("plugin_catalog_diyplatforms_mycustome");
        if (item.name.includes(customPrefix)) {
          extractedIndex = parseInt(item.name.substr(item.name.indexOf(customPrefix) + customPrefix.length));
        }
        if (extractedIndex >= this.availablePlatformIndex) {
          this.availablePlatformIndex = extractedIndex + 1;
        }
      } else if (item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFixedFurniture)) {
        customPrefix = ResourceManager.getString("plugin_catalog_diyfixedfurnitures_mycustome");
        if (item.name.includes(customPrefix)) {
          extractedIndex = parseInt(item.name.substr(item.name.indexOf(customPrefix) + customPrefix.length));
        }
        if (extractedIndex >= this.availableFixedFurnitureIndex) {
          this.availableFixedFurnitureIndex = extractedIndex + 1;
        }
      } else if (item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedCeiling)) {
        customPrefix = ResourceManager.getString("plugin_catalog_diyceilings_mycustome");
        if (item.name.includes(customPrefix)) {
          extractedIndex = parseInt(item.name.substr(item.name.indexOf(customPrefix) + customPrefix.length));
        }
        if (extractedIndex >= this.availableCeilingIndex) {
          this.availableCeilingIndex = extractedIndex + 1;
        }
      } else if (item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFloor)) {
        customPrefix = ResourceManager.getString("plugin_catalog_diyfloors_mycustome");
        if (item.name.includes(customPrefix)) {
          extractedIndex = parseInt(item.name.substr(item.name.indexOf(customPrefix) + customPrefix.length));
        }
        if (extractedIndex >= this.availableFloorIndex) {
          this.availableFloorIndex = extractedIndex + 1;
        }
      } else if (item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFurniture)) {
        customPrefix = ResourceManager.getString("plugin_catalog_diyfurnitures_mycustome");
        if (item.name.includes(customPrefix)) {
          extractedIndex = parseInt(item.name.substr(item.name.indexOf(customPrefix) + customPrefix.length));
        }
        if (extractedIndex >= this.availableFurnitureIndex) {
          this.availableFurnitureIndex = extractedIndex + 1;
        }
      } else if (item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel)) {
        customPrefix = ResourceManager.getString("plugin_catalog_diypersonalizedmodels_mycustome");
        if (item.name.includes(customPrefix)) {
          extractedIndex = parseInt(item.name.substr(item.name.indexOf(customPrefix) + customPrefix.length));
        }
        if (extractedIndex >= this.availablePersonalizedModelIndex) {
          this.availablePersonalizedModelIndex = extractedIndex + 1;
        }
      }

      const userFreeData = item.userFreeData;
      delete item.userFreeData;

      const customizedProductTagUrl = HSCatalog.Util.getAttribute(attributes, "CustomizedProductTagUrl");
      if (customizedProductTagUrl && customizedProductTagUrl.length === 1) {
        item.customizedProductUrl = customizedProductTagUrl[0];
      } else if (userFreeData?.modelInfo && userFreeData?.model3d) {
        const modelInfo = userFreeData.modelInfo;
        item.unit = modelInfo.unit || "m";

        const dimensions = {
          XLength: HSCore.Util.Unit.ConvertToMeter(item.unit, modelInfo.XLength),
          YLength: HSCore.Util.Unit.ConvertToMeter(item.unit, modelInfo.YLength),
          ZLength: HSCore.Util.Unit.ConvertToMeter(item.unit, modelInfo.ZLength)
        };

        Object.assign(item, dimensions);
        item.webCADDocument = userFreeData.model3d;

        if (userFreeData.materialMap) {
          item.materialMap = userFreeData.materialMap;
          HSCore.Model.CustomizedModel.migrateMetaMaterialMap(item);
        }
      } else if (userFreeData?.parameters) {
        item.parameters = userFreeData.parameters;
      }

      item.isScalable = true;

      const editLabel = ResourceManager.getString("catalog_menu_edit");
      const deleteLabel = ResourceManager.getString("catalog_menu_delete");

      if (attributes.isUserUpload) {
        item.contextmenu = {
          name: editLabel,
          items: [
            {
              id: "delete",
              name: deleteLabel,
              icon: "res/svgs/tiles_delete.svg",
              onclick: (itemToDelete: CatalogItem): void => {
                this.action.delete(itemToDelete, item.contentType);
              }
            }
          ]
        };
      }

      return item;
    }

    /**
     * Mini process for catalog item - adds context menu for user uploaded items
     */
    public miniProcess(item: CatalogItem, attributes: CatalogAttributes): void {
      if (!item.contentType.isTypeOf(this.customizedContentTypes) || !attributes.isUserUpload) {
        return;
      }

      const activeEnvironment = HSApp.App.getApp().activeEnvironmentId;
      if (
        activeEnvironment === HSFPConstants.Environment.CustomizedPM &&
        item.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedContent)
      ) {
        item.status = 5;
        item.statusDisableText = ResourceManager.getString("model_status_disable");
      }

      const editLabel = ResourceManager.getString("catalog_menu_edit");
      const renameLabel = ResourceManager.getString("catalog_menu_rename");
      const deleteLabel = ResourceManager.getString("catalog_menu_delete");

      item.contextmenu = {
        name: editLabel,
        items: [
          {
            id: "rename",
            name: renameLabel,
            icon: "res/svgs/tiles_modify.svg",
            onclick: (itemToEdit: CatalogItem): void => {
              this.action.edit(itemToEdit);
            }
          },
          {
            id: "delete",
            name: deleteLabel,
            icon: "res/svgs/tiles_delete.svg",
            onclick: (itemToDelete: CatalogItem): void => {
              this.action.delete(itemToDelete, item.contentType);
            }
          }
        ]
      };
    }

    /**
     * Get available item name for a given category type
     */
    public getAvailableItemName(categoryType: NWTK.api.catalog.UserDataCategoryType): Promise<string> {
      if (!adskUser.isLogin()) {
        return Promise.reject("");
      }

      return new Promise((resolve, reject): void => {
        let currentIndex: number = 0;
        let generatedName: string = "";
        let namePrefix: string = "";

        if (categoryType === NWTK.api.catalog.UserDataCategoryType.Ceiling) {
          currentIndex = this.availableCeilingIndex;
          namePrefix = ResourceManager.getString("plugin_catalog_diyceilings_mycustome");
        } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.Floor) {
          currentIndex = this.availableFloorIndex;
          namePrefix = ResourceManager.getString("plugin_catalog_diyfloors_mycustome");
        } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.Furniture) {
          currentIndex = this.availableFurnitureIndex;
          namePrefix = ResourceManager.getString("plugin_catalog_diyfurnitures_mycustome");
        } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.FeatureWall) {
          currentIndex = this.availableFeatureWallIndex;
          namePrefix = ResourceManager.getString("plugin_catalog_diyfeaturewalls_mycustome");
        } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.Platform) {
          currentIndex = this.availablePlatformIndex;
          namePrefix = ResourceManager.getString("plugin_catalog_diyplatforms_mycustome");
        } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.FixedFurniture) {
          currentIndex = this.availableFixedFurnitureIndex;
          namePrefix = ResourceManager.getString("plugin_catalog_diyfixedfurnitures_mycustome");
        } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.PersonalizedModel) {
          currentIndex = this.availablePersonalizedModelIndex;
          namePrefix = ResourceManager.getString("plugin_catalog_diypersonalizedmodels_mycustome");
        }

        const finalizeNameGeneration = (): void => {
          generatedName = namePrefix + currentIndex;

          if (categoryType === NWTK.api.catalog.UserDataCategoryType.Ceiling) {
            this.availableCeilingIndex = currentIndex;
            this.availableCeilingIndex++;
          } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.Floor) {
            this.availableFloorIndex = currentIndex;
            this.availableFloorIndex++;
          } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.Furniture) {
            this.availableFurnitureIndex = currentIndex;
            this.availableFurnitureIndex++;
          } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.FeatureWall) {
            this.availableFeatureWallIndex = currentIndex;
            this.availableFeatureWallIndex++;
          } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.PersonalizedModel) {
            this.availablePersonalizedModelIndex = currentIndex;
            this.availablePersonalizedModelIndex++;
          } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.Platform) {
            this.availablePlatformIndex = currentIndex;
            this.availablePlatformIndex++;
          } else if (categoryType === NWTK.api.catalog.UserDataCategoryType.FixedFurniture) {
            this.availableFixedFurnitureIndex = currentIndex;
            this.availableFixedFurnitureIndex++;
          }

          resolve(generatedName);
        };

        if (currentIndex <= 1) {
          NWTK.api.catalog.getCustomizedProducts(categoryType)
            .then((response): void => {
              if (response.items) {
                response.items.forEach((product): void => {
                  const extractedIndex = parseInt(
                    product.name.substr(product.name.indexOf(namePrefix) + namePrefix.length)
                  );
                  if (extractedIndex >= currentIndex) {
                    currentIndex = extractedIndex + 1;
                  }
                });
              }
              finalizeNameGeneration();
            })
            .catch((): void => {
              reject("");
            });
        } else {
          finalizeNameGeneration();
        }
      });
    }
  }
}

interface CatalogItem {
  contentType: HSCatalog.ContentTypeEnum;
  name: string;
  userFreeData?: UserFreeData;
  unit?: string;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  webCADDocument?: unknown;
  materialMap?: unknown;
  parameters?: unknown;
  isScalable?: boolean;
  customizedProductUrl?: string;
  contextmenu?: ContextMenu;
  id: string;
  status?: number;
  statusDisableText?: string;
}

interface UserFreeData {
  modelInfo?: ModelInfo;
  model3d?: unknown;
  materialMap?: unknown;
  parameters?: unknown;
}

interface ModelInfo {
  unit?: string;
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface CatalogAttributes {
  isUserUpload: boolean;
}

interface ContextMenu {
  name: string;
  items: ContextMenuItem[];
}

interface ContextMenuItem {
  id: string;
  name: string;
  icon: string;
  onclick: (item: CatalogItem, ...args: unknown[]) => void;
}