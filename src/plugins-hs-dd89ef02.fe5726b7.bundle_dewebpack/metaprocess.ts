interface MiniMetaProduct {
  id: string;
  isUserUpload: boolean;
  productType: number;
  aliModelId: string;
  contextmenu?: {
    name: string;
    items: ContextMenuItem[];
  };
}

interface ContextMenuItem {
  id: string;
  name: string;
  icon: string;
  onclick: (product?: MiniMetaProduct) => void;
}

interface DeleteCheckResult {
  result: boolean;
}

interface CatalogPlugin {
  checkModelDelete(aliModelId: string, productType: number): Promise<DeleteCheckResult>;
  deleteProduct(productId: string): Promise<void>;
}

interface PluginManager {
  getPlugin(pluginType: string): any;
}

interface HSAppInstance {
  pluginManager: PluginManager;
}

interface HSAppStatic {
  App: {
    getApp(): HSAppInstance;
  };
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const adskUser: {
  isLogin(): boolean;
};

declare const LiveHint: {
  show(message: string, duration?: number, position?: any, options?: { status: string }): void;
};

declare const HSFPConstants: {
  PluginType: {
    MyGroup: string;
    Catalog: string;
  };
};

declare const Modal: {
  basic(options: {
    title: string;
    content: string;
    enableCheckbox: boolean;
    okButtonContent: string;
    cancelButtonContent: string;
    onOk: () => void;
  }): void;
};

declare const HSApp: HSAppStatic;

const PRODUCT_TYPE_WALL_FACE_ASSEMBLY = 1;
const DELETE_SUCCESS_DURATION = 6000;
const DELETE_ERROR_DURATION = 6000;

export class MetaProcess {
  /**
   * Processes mini metadata for user-uploaded products
   * @param product - The product metadata to process
   */
  public processMiniMeta(product: MiniMetaProduct): void {
    if (!product?.isUserUpload || product.productType !== PRODUCT_TYPE_WALL_FACE_ASSEMBLY) {
      return;
    }

    const editLabel = ResourceManager.getString("catalog_menu_edit");
    const deleteLabel = ResourceManager.getString("catalog_menu_delete");

    product.contextmenu = {
      name: editLabel,
      items: [
        {
          id: "rename",
          name: editLabel,
          icon: "hs_mian_bianji",
          onclick: () => {
            if (adskUser.isLogin()) {
              const myGroupPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.MyGroup);
              myGroupPlugin.showProductRename(product);
            }
          }
        },
        {
          id: "delete",
          name: deleteLabel,
          icon: "hs_mian_shanchu",
          onclick: (contextProduct?: MiniMetaProduct) => {
            if (!adskUser.isLogin()) {
              return;
            }

            const catalogPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Catalog) as CatalogPlugin | null;
            if (!catalogPlugin) {
              return;
            }

            const targetProduct = contextProduct ?? product;
            this.handleProductDelete(catalogPlugin, targetProduct);
          }
        }
      ]
    };
  }

  private handleProductDelete(catalogPlugin: CatalogPlugin, product: MiniMetaProduct): void {
    const { productType, aliModelId } = product;

    catalogPlugin.checkModelDelete(aliModelId, productType).then((result) => {
      if (result?.result === true) {
        this.showDeleteConfirmation(() => {
          this.executeProductDelete(catalogPlugin, product.id);
        });
      } else {
        this.executeProductDelete(catalogPlugin, product.id);
      }
    });
  }

  private showDeleteConfirmation(onConfirm: () => void): void {
    const title = ResourceManager.getString("plugin_catalog_mygroups_delete");
    const content = ResourceManager.getString("plugin_catalog_mygroups_delete_desc");
    const okButton = ResourceManager.getString("plugin_catalog_mygroups_delete_ok");
    const cancelButton = ResourceManager.getString("plugin_catalog_mygroups_delete_cancel");

    Modal.basic({
      title,
      content,
      enableCheckbox: false,
      okButtonContent: okButton,
      cancelButtonContent: cancelButton,
      onOk: onConfirm
    });
  }

  private executeProductDelete(catalogPlugin: CatalogPlugin, productId: string): void {
    LiveHint.show(
      ResourceManager.getString("plugin_customtails_delete"),
      undefined,
      undefined,
      { status: "loading" }
    );

    catalogPlugin.deleteProduct(productId)
      .then(() => {
        LiveHint.show(
          ResourceManager.getString("plugin_customtails_delete_success"),
          DELETE_SUCCESS_DURATION,
          undefined,
          { status: "completed" }
        );
      })
      .catch(() => {
        LiveHint.show(
          ResourceManager.getString("plugin_customtails_delete_error"),
          DELETE_ERROR_DURATION,
          undefined,
          { status: "warning" }
        );
      });
  }
}