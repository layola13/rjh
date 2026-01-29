interface CatalogPluginInterface {
  catalogPlugin: any;
  onClickEdit: () => void;
}

interface Product {
  productType: string;
  isUserUpload: boolean;
  attributes?: ProductAttribute[];
  postProcessingStatus?: string;
  id: string;
  aliModelId: string;
}

interface ProductAttribute {
  id: string;
  values: AttributeValue[];
}

interface AttributeValue {
  id: string;
}

interface ProcessedItem {
  postProcessingStatus?: string;
  thumbnail?: string;
  status: number;
  contextmenu?: ContextMenu;
  image?: string;
  imageResized?: string;
}

interface MiniProcessedItem {
  image?: string;
  imageResized?: string;
  status: number;
  contextmenu?: ContextMenu;
}

interface ContextMenu {
  name: string;
  items: ContextMenuItem[];
}

interface ContextMenuItem {
  id: string;
  name: string;
  icon: string;
  onclick: (product: any, context?: any) => void;
}

interface DeleteCheckResult {
  result?: boolean;
}

const ATTR_POST_PROCESSING_STATUS = "attr-postProcessingStatus";
const VALUE_POST_PROCESSING_SUCCESS = "value-postProcessingStatus-success";
const VALUE_POST_PROCESSING_FAILED = "value-postProcessingStatus-failed";
const DELETE_HINT_DURATION = 6000;

const processingImage = require('./322301');
const failedImage = require('./254073');

export default class ProductProcessor {
  private _catalogPlugin: any;
  private _onClickEdit: () => void;
  private _sessionKey: string | undefined;

  constructor(config: CatalogPluginInterface) {
    this._catalogPlugin = config.catalogPlugin;
    this._onClickEdit = config.onClickEdit;
  }

  process(item: ProcessedItem, product: Product): ProcessedItem {
    if (product.productType !== HSCatalog.ProductTypeEnum.Assembly) {
      return item;
    }

    if (!product.isUserUpload) {
      return item;
    }

    if (product.attributes) {
      for (let i = 0; i < product.attributes.length; i++) {
        if (product.attributes[i].id === ATTR_POST_PROCESSING_STATUS) {
          const statusValue = product.attributes[i].values[0].id;
          item.postProcessingStatus = statusValue;

          if (!item.thumbnail) {
            switch (statusValue) {
              case VALUE_POST_PROCESSING_SUCCESS:
                break;
              case VALUE_POST_PROCESSING_FAILED:
                item.thumbnail = failedImage;
                break;
              default:
                item.thumbnail = processingImage;
            }
          }
          break;
        }
      }
    }

    item.status = 1;
    this._updateContextMenu(item, product);
    return item;
  }

  miniProcess(item: MiniProcessedItem, product: Product): void {
    if (product.productType === HSCatalog.ProductTypeEnum.Assembly && product.isUserUpload) {
      switch (product.postProcessingStatus) {
        case VALUE_POST_PROCESSING_SUCCESS:
          break;
        case VALUE_POST_PROCESSING_FAILED:
          item.image = failedImage;
          item.imageResized = failedImage;
          break;
        default:
          item.image = processingImage;
          item.imageResized = processingImage;
      }

      item.status = 1;
      this._updateContextMenu(item, product);
    }
  }

  private _deleteModel(productId: string): void {
    LiveHint.show(
      ResourceManager.getString("plugin_customtails_delete"),
      undefined,
      null,
      { status: "loading" }
    );

    this._catalogPlugin
      .deleteProduct(productId)
      .then(() => {
        LiveHint.show(
          ResourceManager.getString("plugin_customtails_delete_success"),
          DELETE_HINT_DURATION,
          null,
          { status: "completed" }
        );
      })
      .catch(() => {
        LiveHint.show(
          ResourceManager.getString("plugin_customtails_delete_error"),
          DELETE_HINT_DURATION,
          null,
          { status: "warning" }
        );
      });
  }

  private _updateContextMenu(item: ProcessedItem | MiniProcessedItem, product: Product): void {
    this._sessionKey = adskUser.sid;

    const editLabel = ResourceManager.getString("catalog_menu_edit");
    const renameLabel = ResourceManager.getString("catalog_menu_rename");
    const deleteLabel = ResourceManager.getString("catalog_menu_delete");
    const deleteTitle = ResourceManager.getString("plugin_catalog_mygroups_delete");
    const deleteDescription = ResourceManager.getString("plugin_catalog_mygroups_delete_desc");
    const deleteOkButton = ResourceManager.getString("plugin_catalog_mygroups_delete_ok");
    const deleteCancelButton = ResourceManager.getString("plugin_catalog_mygroups_delete_cancel");
    const catalogPlugin = this._catalogPlugin;

    item.contextmenu = {
      name: editLabel,
      items: [
        {
          id: "rename",
          name: renameLabel,
          icon: "res/svgs/tiles_modify.svg",
          onclick: (productItem: any, context?: any) => {
            if (adskUser.isLogin()) {
              HSApp.App.getApp()
                .pluginManager.getPlugin(HSFPConstants.PluginType.MyGroup)
                .showProductRename(product);
            }
          }
        },
        {
          id: "delete",
          name: deleteLabel,
          icon: "res/svgs/tiles_delete.svg",
          onclick: (productItem: any) => {
            const productId = productItem.id;

            if (adskUser.isLogin()) {
              const productType = productItem.productType;
              const aliModelId = productItem.aliModelId;

              catalogPlugin.checkModelDelete(aliModelId, productType).then((result: DeleteCheckResult) => {
                if (result?.result === true) {
                  Modal.basic({
                    title: deleteTitle,
                    content: deleteDescription,
                    enableCheckbox: false,
                    okButtonContent: deleteOkButton,
                    cancelButtonContent: deleteCancelButton,
                    onOk: () => {
                      this._deleteModel(productId);
                    }
                  });
                } else {
                  this._deleteModel(productId);
                }
              });
            }
          }
        }
      ]
    };
  }
}